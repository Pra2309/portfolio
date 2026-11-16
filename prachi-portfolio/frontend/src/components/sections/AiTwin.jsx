import { useEffect, useRef, useState } from "react";
import { ArrowUp, Bot } from "lucide-react";
import { twinPrompts, personal } from "@/data/content";
import { API } from "@/lib/site";
import { Reveal, SectionHead } from "@/components/site/Reveal";

const OPENING = "Hey! I'm Prachi's AI twin. Ask me about her engineering experience, AI projects, skills, certifications or what she's building.";
const FALLBACK = `My circuits are taking a coffee break right now. You can still reach the real Prachi at ${personal.email} — she replies better than I do anyway.`;

const fmt = (s) => s.replace(/\*\*(.+?)\*\*/g, "$1").replace(/^\s*[*-]\s+/gm, "• ");

const sessionId = () => {
  let id = localStorage.getItem("twin_session");
  if (!id) { id = (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`).replace(/[^a-z0-9-]/gi, ""); localStorage.setItem("twin_session", id); }
  return id;
};

async function streamChat(message, onToken) {
  if (!API) throw new Error("no api");
  const res = await fetch(`${API}/chat`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ session_id: sessionId(), message }) });
  if (!res.ok || !res.body) throw new Error(String(res.status));
  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let buf = "", got = false;
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    const parts = buf.split("\n\n");
    buf = parts.pop();
    for (const p of parts) {
      const d = p.replace(/^data: /, "");
      if (d === "[DONE]") return got;
      try { const j = JSON.parse(d); if (j.error) throw new Error(j.error); if (j.t) { got = true; onToken(j.t); } } catch (e) { if (e.message === "unavailable") throw e; }
    }
  }
  return got;
}

export const AiTwin = () => {
  const [msgs, setMsgs] = useState([{ role: "assistant", content: OPENING }]);
  const [val, setVal] = useState("");
  const [busy, setBusy] = useState(false);
  const box = useRef(null);
  useEffect(() => { if (box.current) box.current.scrollTop = box.current.scrollHeight; }, [msgs]);

  const ask = async (q) => {
    const text = q.trim();
    if (!text || busy) return;
    setBusy(true);
    setVal("");
    setMsgs((m) => [...m, { role: "user", content: text }, { role: "assistant", content: "" }]);
    const push = (t) => setMsgs((m) => { const c = [...m]; c[c.length - 1] = { ...c[c.length - 1], content: c[c.length - 1].content + t }; return c; });
    try {
      const ok = await streamChat(text, push);
      if (!ok) push(FALLBACK);
    } catch (e) {
      setMsgs((m) => { const c = [...m]; c[c.length - 1] = { role: "assistant", content: FALLBACK, error: true }; return c; });
    }
    setBusy(false);
  };

  return (
    <section id="twin" className="relative bg-beige/60 py-28 lg:py-40" data-testid="ai-twin-section">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHead id="twin" eyebrow="chapter 09 · an AI version of me" title={<>talk to my <em className="text-terra">AI twin.</em></>} note="it's grounded in my real profile. it'll say so when it doesn't know." />
          <Reveal>
            <p className="eyebrow mb-4">try asking</p>
            <div className="flex flex-wrap gap-2">
              {twinPrompts.map((p, i) => (
                <button key={p} onClick={() => ask(p)} disabled={busy} className="rounded-full border border-espresso/20 bg-paper px-4 py-2 text-left text-sm transition-[transform,background-color,color] hover:-translate-y-0.5 hover:bg-espresso hover:text-cream disabled:opacity-50" data-testid={`twin-prompt-${i}`}>
                  {p}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-7" y={40}>
          <div className="flex h-[560px] flex-col overflow-hidden rounded-[24px] bg-coffee shadow-[0_40px_80px_-40px_rgba(36,23,19,0.8)]" data-testid="ai-twin-window">
            <div className="flex items-center justify-between border-b border-cream/10 px-5 py-3">
              <span className="flex items-center gap-2 font-mono text-[12px] text-beige"><Bot className="h-4 w-4 text-terra" /> twin@prachi.brew</span>
              <span className="flex items-center gap-2 font-mono text-[11px] text-[#C9B8A6]"><i className={`h-2 w-2 rounded-full ${busy ? "bg-caramel" : "bg-[#7FB77E]"}`} />{busy ? "thinking…" : "online"}</span>
            </div>
            <div ref={box} className="flex-1 space-y-4 overflow-y-auto px-5 py-5" data-lenis-prevent data-testid="ai-twin-messages">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <p className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-[14px] leading-relaxed ${m.role === "user" ? "rounded-br-md bg-terra text-paper" : "rounded-bl-md bg-[#38251F] text-cream"}`} data-testid={m.role === "user" ? "twin-user-msg" : "twin-bot-msg"}>
                    {m.role === "assistant" && <span className="mr-2 font-mono text-[11px] text-caramel">twin&gt;</span>}
                    {fmt(m.content) || <span className="blink font-mono">▍</span>}
                  </p>
                </div>
              ))}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); ask(val); }} className="flex items-center gap-3 border-t border-cream/10 p-3">
              <span className="pl-2 font-mono text-[13px] text-terra">&gt;</span>
              <input value={val} onChange={(e) => setVal(e.target.value)} maxLength={1000} placeholder="message the AI twin" className="min-w-0 flex-1 bg-transparent py-2 text-[14px] text-cream outline-none placeholder:text-[#9C8B7C]" aria-label="Message the AI twin" data-testid="ai-twin-input" />
              <button type="submit" disabled={busy || !val.trim()} className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-espresso transition-transform hover:-translate-y-0.5 disabled:opacity-40" aria-label="Send" data-testid="ai-twin-send-btn"><ArrowUp className="h-4 w-4" /></button>
            </form>
            <p className="px-5 pb-3 font-mono text-[11px] text-[#9C8B7C]">AI twin. it can be wrong. the real one is better (debatable).</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
