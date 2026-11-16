import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Mail, Linkedin, Github, Instagram, Download, Loader2, Send, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { personal } from "@/data/content";
import { API } from "@/lib/site";
import { Reveal } from "@/components/site/Reveal";
import { ResumeButton } from "@/components/site/ResumeButton";

const empty = { name: "", email: "", company: "", message: "", website: "" };
const field = "h-12 rounded-xl border-espresso/20 bg-paper text-base text-espresso placeholder:text-ash/70 focus-visible:ring-terra";

const validate = (f) => {
  if (!f.name.trim()) return "Please add your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) return "That email doesn't look right.";
  if (f.message.trim().length < 10) return "Message needs at least 10 characters.";
  return null;
};

export const Contact = () => {
  const [f, setF] = useState(empty);
  const [state, setState] = useState("idle");
  const [err, setErr] = useState("");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    const v = validate(f);
    if (v) { setErr(v); return; }
    setErr("");
    setState("sending");
    try {
      if (!API) throw new Error("no api");
      await axios.post(`${API}/contact`, f);
      setState("sent");
      setF(empty);
      toast.success("Message sent. Prachi will get back to you soon.");
    } catch (ex) {
      setState("idle");
      const msg = ex?.response?.data?.detail;
      setErr(typeof msg === "string" ? msg : `Couldn't send right now. Email ${personal.email} directly.`);
    }
  };

  const links = [
    { href: `mailto:${personal.email}`, icon: Mail, label: personal.email, id: "email" },
    { href: personal.linkedin, icon: Linkedin, label: "linkedin / prachi-singh23", id: "linkedin" },
    { href: personal.github, icon: Github, label: "github / Pra2309", id: "github" },
    { href: personal.instagram, icon: Instagram, label: "instagram", id: "instagram" },
  ];

  return (
    <section id="contact" className="relative mx-auto max-w-[1400px] px-5 py-28 sm:px-8 lg:py-40" data-testid="contact-section">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <p className="eyebrow mb-5">chapter 10 · pune · always one more cup</p>
          <h2 className="font-serif text-[clamp(3.2rem,8vw,7rem)] leading-[0.9] tracking-tight" data-testid="contact-heading">let's build something <em className="text-terra">interesting.</em></h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-espresso/80">Have an interesting AI problem, engineering opportunity or collaboration in mind? I'd love to hear about it.</p>
          <ul className="mt-10 space-y-3">
            {links.map(({ href, icon: Icon, label, id }) => (
              <li key={id}>
                <a href={href} target={id === "email" ? undefined : "_blank"} rel="noreferrer" className="group inline-flex items-center gap-3 font-serif text-2xl text-espresso sm:text-3xl" data-testid={`contact-link-${id}`}>
                  <Icon className="h-5 w-5 text-terra transition-transform group-hover:-rotate-12" />
                  <span className="bg-[linear-gradient(#C47B57,#C47B57)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">{label}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={personal.linkedin} target="_blank" rel="noreferrer" className="btn-primary" data-testid="contact-connect-cta">Let's connect</a>
            <ResumeButton className="btn-ghost" testId="contact-resume-btn"><Download className="h-4 w-4" /> Download resume</ResumeButton>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-6" y={40}>
          <form onSubmit={submit} noValidate className="rounded-[28px] border border-espresso/10 bg-beige/70 p-6 sm:p-10" data-testid="contact-form">
            {state === "sent" ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center" data-testid="contact-success">
                <CheckCircle2 className="h-12 w-12 text-terra" />
                <p className="mt-6 font-serif text-4xl">order received.</p>
                <p className="mt-3 text-ash">Your message is on its way to Prachi's inbox.</p>
                <button type="button" onClick={() => setState("idle")} className="btn-ghost mt-8" data-testid="contact-send-another">send another</button>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <label className="block"><span className="eyebrow mb-2 block">name *</span><Input value={f.name} onChange={set("name")} maxLength={100} className={field} placeholder="Your name" data-testid="contact-name-input" /></label>
                  <label className="block"><span className="eyebrow mb-2 block">email *</span><Input type="email" value={f.email} onChange={set("email")} className={field} placeholder="you@company.com" data-testid="contact-email-input" /></label>
                </div>
                <label className="block"><span className="eyebrow mb-2 block">company / organisation</span><Input value={f.company} onChange={set("company")} maxLength={120} className={field} placeholder="Optional" data-testid="contact-company-input" /></label>
                <label className="block"><span className="eyebrow mb-2 block">message *</span><Textarea value={f.message} onChange={set("message")} maxLength={3000} rows={6} className={`${field} h-auto py-3`} placeholder="Tell me about the problem, role or idea…" data-testid="contact-message-input" /></label>
                <input type="text" tabIndex={-1} autoComplete="off" value={f.website} onChange={set("website")} className="hidden" aria-hidden />
                {err && <p className="rounded-xl bg-terra/15 px-4 py-3 text-sm text-[#8A3E1E]" role="alert" data-testid="contact-error">{err}</p>}
                <button type="submit" disabled={state === "sending"} className="btn-primary w-full justify-center py-4 disabled:opacity-60" data-testid="contact-submit-btn">
                  {state === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" /> sending…</> : <><Send className="h-4 w-4" /> Send message</>}
                </button>
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
};
