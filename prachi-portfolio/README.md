# prachi.brew — Prachi Singh's portfolio (free Vercel edition)

One Vercel project hosts everything:
- `frontend/` — React site (3D hero, recruiter mode, scrapbook, cafe tune, easter eggs)
- `api/index.py` — Python serverless API: AI twin (`/api/chat`, OpenRouter) + contact form (`/api/contact`, Resend)
- Data: MongoDB Atlas free cluster (chat history + contact messages)

## 1. Free accounts you need
1. **GitHub** — create a new repo and upload this folder (drag-and-drop works on github.com → "Add file → Upload files").
2. **MongoDB Atlas** (free M0) — https://www.mongodb.com/cloud/atlas/register
   - Create a free cluster → Database Access: add a user + password → Network Access: add `0.0.0.0/0`.
   - Connect → Drivers → copy the connection string into `MONGO_URL` (put your password in it).
3. **Resend** (free, 100 emails/day) — https://resend.com → API Keys → create key → `RESEND_API_KEY`.
   - Sign up with **singh.prachi2309@gmail.com**. With the free sender `onboarding@resend.dev`, Resend only delivers to your own sign-up email — which is exactly where contact messages should go. (Later you can verify your own domain and change `RESEND_FROM`.)
4. **OpenRouter** — your existing key → `OPENROUTER_API_KEY`.

## 2. Deploy on Vercel (free Hobby plan)
1. https://vercel.com → Add New → Project → import your GitHub repo.
2. Leave **Root Directory** as the repo root (the folder containing `vercel.json`). Framework preset: **Other**. Build settings come from `vercel.json`.
3. Add every variable from `.env.example` under Environment Variables (do NOT set `REACT_APP_BACKEND_URL`).
4. Deploy. Your site will be at `https://<project>.vercel.app`.

## 3. Check it works
- `https://<project>.vercel.app/api/` → shows `"chat_configured": true`
- Ask the AI twin a question; send yourself a contact-form message.

## Edit content later
- `frontend/src/data/content.js` — all text, projects, skills, links, resume path
- `frontend/src/data/photos.js` + `frontend/public/images/interests/` — personal photos
- `frontend/public/Prachi_Singh_Resume.pdf` — replace with same name to update
- `api/knowledge.py` — the AI twin's facts (keep in sync with content.js)

## Run locally (optional)
```
cd frontend && yarn install && yarn start          # site on :3000
pip install -r requirements.txt uvicorn
export $(grep -v '^#' .env | xargs) && uvicorn api.index:app --port 8001
# then in frontend/.env: REACT_APP_BACKEND_URL=http://localhost:8001
```
