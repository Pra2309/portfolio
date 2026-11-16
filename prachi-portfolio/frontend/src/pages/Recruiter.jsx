import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Download, Mail, Linkedin, Github, MapPin, Plane, BookOpen } from "lucide-react";
import { personal, impact, experience, projects, skills, education, certifications, achievements, publication } from "@/data/content";
import { interests } from "@/data/photos";
import { ResumeButton } from "@/components/site/ResumeButton";
import { PhotoFrame } from "@/components/beyond/PhotoFrame";
import { Logo } from "@/components/site/Logo";

const H = ({ children }) => <h2 className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-terra">{children}</h2>;
const Block = ({ children, className = "", testId }) => <section className={`print-break border-t border-espresso/10 py-8 ${className}`} data-testid={testId}>{children}</section>;
const featured = ["creative-studio", "text-to-sql", "sdk-bot", "analytics-framework", "clickhouse-monitoring"];

export default function Recruiter() {
  const [params] = useSearchParams();
  useEffect(() => {
    document.title = "Prachi Singh · Recruiter summary";
    window.scrollTo(0, 0);
    if (params.get("print") !== "1") return undefined;
    const t = setTimeout(() => window.print(), 700);
    return () => clearTimeout(t);
  }, [params]);

  return (
    <div className="recruiter-calm min-h-screen bg-paper text-espresso" data-testid="recruiter-page">
      <div className="no-print sticky top-0 z-40 border-b border-espresso/10 bg-paper/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-5">
          <Link to="/" className="inline-flex items-center gap-2 font-mono text-[12px] hover:text-terra" data-testid="recruiter-back-btn"><ArrowLeft className="h-4 w-4" /> back to the immersive version</Link>
          <span className="hidden items-center gap-2 font-mono text-[11px] text-ash sm:flex"><Logo className="h-5 w-5" /> recruiter mode · 30 seconds</span>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-5 pb-20 pt-10">
        <header className="pb-8" data-testid="recruiter-summary">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">{personal.titles.join(" · ")}</p>
          <h1 className="mt-3 font-serif text-5xl leading-none sm:text-6xl">{personal.name}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-espresso/85">{personal.positioning} Currently Software Engineer at Xoriant (client: Citi), working across backend engineering and applied GenAI.</p>
          <div className="mt-5 flex flex-wrap gap-2 text-sm">
            <span className="chip"><MapPin className="h-3.5 w-3.5 text-terra" />{personal.location}</span>
            <span className="chip border-terra/50 bg-terra/10" data-testid="recruiter-relocation"><Plane className="h-3.5 w-3.5 text-terra" />open to global roles · willing to relocate</span>
          </div>
          <div className="no-print mt-6 flex flex-wrap gap-3">
            <ResumeButton className="btn-primary" testId="recruiter-download-resume"><Download className="h-4 w-4" /> Download resume</ResumeButton>
            <a href={`mailto:${personal.email}`} className="btn-ghost" data-testid="recruiter-email-btn"><Mail className="h-4 w-4" /> Email Prachi</a>
            <a href={personal.linkedin} target="_blank" rel="noreferrer" className="btn-ghost" data-testid="recruiter-linkedin-btn"><Linkedin className="h-4 w-4" /> LinkedIn</a>
          </div>
        </header>

        <Block testId="recruiter-impact">
          <H>measured impact · Xoriant</H>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            {impact.map((m) => (
              <div key={m.label} className="rounded-xl border border-espresso/10 bg-cream/60 p-4">
                <p className="font-serif text-4xl leading-none">{m.prefix}{m.value}{m.suffix}</p>
                <p className="mt-2 text-[13px] leading-snug text-espresso/80">{m.label}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block testId="recruiter-experience">
          <H>experience</H>
          <div className="space-y-6">
            {experience.map((e) => (
              <div key={e.id} className="print-break">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-lg font-semibold">{e.role} · {e.company}{e.type === "internship" ? <span className="ml-2 rounded-full bg-beige px-2 py-0.5 font-mono text-[10px] uppercase text-ash">internship</span> : null}</p>
                  <p className="font-mono text-[12px] text-ash">{e.period}{e.location ? ` · ${e.location}` : ""}</p>
                </div>
                {e.client && <p className="font-mono text-[12px] text-ash">client: {e.client}</p>}
                <ul className="mt-2 list-disc space-y-1 pl-5 text-[14px] leading-relaxed text-espresso/85">
                  {(e.id === "xoriant" ? e.details.slice(0, 7) : e.details).map((d) => <li key={d}>{d}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </Block>

        <Block testId="recruiter-projects">
          <H>featured AI & backend projects</H>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {featured.map((id) => projects.find((p) => p.id === id)).map((p) => (
              <div key={p.id} className="rounded-xl border border-espresso/10 p-4">
                <p className="font-semibold">{p.title} <span className="font-mono text-[11px] font-normal text-ash">· {p.kind === "enterprise" ? "enterprise · Xoriant" : "personal"}</span></p>
                <p className="mt-1 text-[14px] leading-relaxed text-espresso/80">{p.desc}</p>
                <p className="mt-2 font-mono text-[11px] text-terra">{p.stack.join(" · ")}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block testId="recruiter-skills">
          <H>skills</H>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            {skills.map((g) => (
              <div key={g.id}><dt className="text-[13px] font-semibold">{g.label}</dt><dd className="text-[14px] text-espresso/80">{g.items.join(", ")}</dd></div>
            ))}
          </dl>
        </Block>

        <Block className="grid grid-cols-1 gap-8 sm:grid-cols-2" testId="recruiter-education">
          <div>
            <H>education</H>
            <p className="font-semibold">{education.degree}</p>
            <p className="text-[14px] text-espresso/80">{education.school}, {education.location}</p>
            <p className="font-mono text-[12px] text-ash">{education.period} · CGPA {education.cgpa}</p>
            <H><span className="mt-6 block">research</span></H>
            <a href={publication.readUrl} target="_blank" rel="noreferrer" className="inline-flex items-start gap-2 text-[14px] hover:text-terra"><BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-terra" />{publication.title} — IJCRT, {publication.date}</a>
          </div>
          <div>
            <H>certifications</H>
            <ul className="space-y-1 text-[14px]">{certifications.map((c) => <li key={c.name}>{c.name}</li>)}</ul>
            <H><span className="mt-6 block">achievements</span></H>
            <ul className="space-y-1 text-[14px]">{achievements.map((a) => <li key={a.name}>{a.name} — {a.note}</li>)}</ul>
          </div>
        </Block>

        <Block className="no-print" testId="recruiter-beyond">
          <H>beyond the code · a quick peek</H>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {interests.map((it) => (
              <Link to="/#beyond" key={it.id} className="group block">
                <div className="aspect-square overflow-hidden rounded-lg bg-beige"><PhotoFrame src={it.photo} alt={it.alt} label=" " /></div>
                <p className="mt-2 text-[13px] text-espresso/80">{it.tag}</p>
              </Link>
            ))}
          </div>
        </Block>

        <Block testId="recruiter-contact">
          <H>contact</H>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-[15px]">
            <a href={`mailto:${personal.email}`} className="inline-flex items-center gap-2 hover:text-terra"><Mail className="h-4 w-4 text-terra" />{personal.email}</a>
            <a href={personal.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-terra"><Linkedin className="h-4 w-4 text-terra" />linkedin.com/in/prachi-singh23</a>
            <a href={personal.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-terra"><Github className="h-4 w-4 text-terra" />github.com/Pra2309</a>
          </div>
        </Block>
      </main>
    </div>
  );
}
