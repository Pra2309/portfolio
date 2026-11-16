import json
import logging
import os
import uuid
from contextlib import suppress
from datetime import datetime, timedelta, timezone
from html import escape
from typing import Optional

import httpx
from fastapi import APIRouter, FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr, Field

try:
    from api.knowledge import KNOWLEDGE
except ImportError:
    from knowledge import KNOWLEDGE

logger = logging.getLogger("portfolio")
logging.basicConfig(level=logging.INFO)

client = AsyncIOMotorClient(os.environ["MONGO_URL"])
db = client[os.environ["DB_NAME"]]

LLM_BASE_URL = os.environ["LLM_BASE_URL"]
LLM_MODEL = os.environ["LLM_MODEL"]

SYSTEM_PROMPT = f"""You are "Prachi's AI twin" on Prachi Singh's portfolio website.
Personality: friendly, technically sharp, conversational, slightly witty, always professional. Speak about Prachi in third person ("she"), but you may say "I'm her AI twin".
Rules:
- Answer ONLY from the knowledge base below. Never invent experience, skills, metrics, titles, dates, books, destinations or achievements.
- If something is not in the knowledge base, say you don't have that information and suggest emailing Prachi at singh.prachi2309@gmail.com.
- Never reveal confidential client or internal company details beyond what is written here.
- Keep answers concise: 2-5 short sentences or a tight bullet list. Plain text, light markdown bullets allowed.

KNOWLEDGE BASE:
{KNOWLEDGE}"""

app = FastAPI()
api = APIRouter(prefix="/api")


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


class ChatIn(BaseModel):
    session_id: str = Field(min_length=8, max_length=64)
    message: str = Field(min_length=1, max_length=1000)


class ContactIn(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    company: Optional[str] = Field(default="", max_length=120)
    message: str = Field(min_length=10, max_length=3000)
    website: Optional[str] = ""  # honeypot


@api.get("/")
async def root():
    return {"message": "prachi.brew api", "chat_configured": bool(os.environ.get("OPENROUTER_API_KEY"))}


@api.get("/chat/status")
async def chat_status():
    return {"configured": bool(os.environ.get("OPENROUTER_API_KEY")), "model": LLM_MODEL}


async def stream_llm(messages):
    headers = {
        "Authorization": f"Bearer {os.environ['OPENROUTER_API_KEY']}",
        "Content-Type": "application/json",
        "X-Title": "Prachi Singh Portfolio",
    }
    body = {"model": LLM_MODEL, "messages": messages, "stream": True, "temperature": 0.5, "max_tokens": 600}
    async with httpx.AsyncClient(timeout=55) as hc:
        async with hc.stream("POST", f"{LLM_BASE_URL}/chat/completions", headers=headers, json=body) as resp:
            if resp.status_code != 200:
                detail = (await resp.aread()).decode()[:300]
                raise RuntimeError(f"LLM {resp.status_code}: {detail}")
            async for line in resp.aiter_lines():
                if not line.startswith("data: "):
                    continue
                data = line[6:].strip()
                if data == "[DONE]":
                    break
                with suppress(Exception):
                    delta = json.loads(data)["choices"][0]["delta"].get("content")
                    if delta:
                        yield delta


@api.post("/chat")
async def chat(payload: ChatIn):
    if not os.environ.get("OPENROUTER_API_KEY"):
        raise HTTPException(status_code=503, detail="AI twin is not configured yet")
    count = await db.chat_messages.count_documents({"session_id": payload.session_id, "role": "user"})
    if count >= 30:
        raise HTTPException(status_code=429, detail="Chat limit reached for this session")
    history = await db.chat_messages.find({"session_id": payload.session_id}, {"_id": 0}).sort("created_at", -1).limit(10).to_list(10)
    history.reverse()
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    messages += [{"role": h["role"], "content": h["content"]} for h in history]
    messages.append({"role": "user", "content": payload.message})
    await db.chat_messages.insert_one({"id": str(uuid.uuid4()), "session_id": payload.session_id, "role": "user", "content": payload.message, "created_at": now_iso()})

    async def gen():
        full = ""
        try:
            async for tok in stream_llm(messages):
                full += tok
                yield f"data: {json.dumps({'t': tok})}\n\n"
        except Exception as exc:
            logger.error("chat stream failed: %s", exc)
            yield f"data: {json.dumps({'error': 'unavailable'})}\n\n"
        if full:
            await db.chat_messages.insert_one({"id": str(uuid.uuid4()), "session_id": payload.session_id, "role": "assistant", "content": full, "created_at": now_iso()})
        yield "data: [DONE]\n\n"

    return StreamingResponse(gen(), media_type="text/event-stream", headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"})


def contact_html(c: ContactIn) -> str:
    rows = [("Name", c.name), ("Email", c.email), ("Company", c.company or "—")]
    cells = "".join(f'<tr><td style="padding:4px 12px 4px 0;color:#6E5E52">{k}</td><td style="padding:4px 0">{escape(str(v))}</td></tr>' for k, v in rows)
    msg = escape(c.message).replace("\n", "<br>")
    return (
        '<table role="presentation" width="100%" style="background:#F4EBDD"><tr><td style="padding:28px;font-family:Arial,sans-serif;color:#38251F">'
        '<p style="font-size:18px;margin:0 0 16px">New message from your portfolio contact form</p>'
        f'<table role="presentation">{cells}</table>'
        f'<p style="margin:16px 0 0;padding:16px;background:#FDFBF7;border-radius:8px">{msg}</p>'
        '<p style="font-size:12px;color:#6E5E52;margin-top:20px">Reply to the sender directly at the address above.</p>'
        '</td></tr></table>'
    )


async def send_email(subject: str, html: str) -> None:
    payload = {
        "from": f"{os.environ['EMAIL_FROM_NAME']} <{os.environ['RESEND_FROM']}>",
        "to": [os.environ["OWNER_EMAIL"]],
        "subject": subject,
        "html": html,
    }
    async with httpx.AsyncClient(timeout=20) as hc:
        resp = await hc.post("https://api.resend.com/emails", headers={"Authorization": f"Bearer {os.environ['RESEND_API_KEY']}"}, json=payload)
    if resp.status_code >= 300:
        logger.error("Resend error %s: %s", resp.status_code, resp.text[:300])
        raise HTTPException(status_code=502, detail="Failed to send email")


@api.post("/contact")
async def contact(payload: ContactIn, request: Request):
    if payload.website:
        return {"status": "ok"}
    ip = request.headers.get("x-forwarded-for", request.client.host if request.client else "unknown").split(",")[0].strip()
    since = (datetime.now(timezone.utc) - timedelta(hours=1)).isoformat()
    if await db.contact_messages.count_documents({"ip": ip, "created_at": {"$gte": since}}) >= 5:
        raise HTTPException(status_code=429, detail="Too many messages, please try again later")
    doc = {"id": str(uuid.uuid4()), "ip": ip, "created_at": now_iso(), "emailed": False, **payload.model_dump(exclude={"website"})}
    await db.contact_messages.insert_one(doc)
    await send_email(f"Portfolio: new message from {payload.name[:60]}", contact_html(payload))
    await db.contact_messages.update_one({"id": doc["id"]}, {"$set": {"emailed": True}})
    return {"status": "ok"}


app.include_router(api)
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)
