import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { experience } from "@/data/content";
import { Reveal, SectionHead } from "@/components/site/Reveal";

const Item = ({ e }) => {
  const [open, setOpen] = useState(false);
  return (
    <li className="border-b border-dashed border-espresso/25 py-5" data-testid={`exp-item-${e.id}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-sm font-semibold text-espresso sm:text-base">1x {e.role}</p>
          <p className="font-mono text-[13px] text-espresso/80">{e.company}{e.client ? ` · client: ${e.client}` : ""}</p>
        </div>
        <p className="shrink-0 text-right font-mono text-[12px] text-ash">{e.period}</p>
      </div>
      <p className="mt-2 font-mono text-[12px] leading-relaxed text-ash">{e.location ? `${e.location} — ` : ""}{e.summary}</p>
      <ul className="mt-2 space-y-0.5">
        {e.highlights.map((h) => <li key={h} className="font-mono text-[12px] text-espresso/85">  + {h}</li>)}
      </ul>
      <button onClick={() => setOpen(!open)} className="mt-3 inline-flex items-center gap-1.5 font-mono text-[12px] text-terra underline-offset-4 hover:underline" aria-expanded={open} data-testid={`exp-toggle-${e.id}`}>
        {open ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />} {open ? "hide details" : "itemized details"}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ol initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4 }} className="overflow-hidden">
            {e.details.map((d, i) => (
              <li key={i} className="mt-3 flex gap-3 font-mono text-[12px] leading-relaxed text-espresso/85">
                <span className="text-terra">{String(i + 1).padStart(2, "0")}</span><span>{d}</span>
              </li>
            ))}
          </motion.ol>
        )}
      </AnimatePresence>
    </li>
  );
};

export const Experience = () => {
  const full = experience.filter((e) => e.type === "full-time");
  const interns = experience.filter((e) => e.type === "internship");
  return (
    <section id="experience" className="relative mx-auto max-w-[1400px] px-5 py-28 sm:px-8 lg:py-40" data-testid="experience-section">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <SectionHead id="experience" eyebrow="chapter 03 · the work history" title={<>itemized<em className="text-terra">.</em></>} note="one main course, three sides. no tip required (but appreciated)." />
          <Reveal>
            <p className="max-w-md text-base leading-relaxed text-espresso/80">Full-time engineering at Xoriant for Citi, built on three internships that taught me Python, data and full-stack product work — in that order.</p>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-7" y={50}>
          <div className="mx-auto max-w-2xl rotate-[0.6deg] drop-shadow-[0_30px_40px_rgba(36,23,19,0.22)] transition-transform duration-700 hover:rotate-0">
            <div className="receipt-edge bg-receipt px-6 py-10 sm:px-10" data-testid="experience-receipt">
              <div className="text-center font-mono">
                <p className="text-lg font-semibold tracking-[0.25em] text-espresso">CAFÉ PRACHI · PUNE</p>
                <p className="mt-1 text-[12px] text-ash">order #2024 · table: backend + applied AI</p>
                <p className="mt-4 text-[12px] text-ash">================================</p>
              </div>
              <p className="mt-6 font-mono text-[12px] font-semibold tracking-[0.2em] text-terra">MAIN COURSE · FULL-TIME</p>
              <ul>{full.map((e) => <Item key={e.id} e={e} />)}</ul>
              <p className="mt-8 font-mono text-[12px] font-semibold tracking-[0.2em] text-terra">SIDES · INTERNSHIPS</p>
              <ul>{interns.map((e) => <Item key={e.id} e={e} />)}</ul>
              <div className="mt-8 space-y-1 font-mono text-[13px] text-espresso">
                <div className="flex justify-between"><span>extras</span><span className="text-right">python, java, sql, genai</span></div>
                <div className="flex justify-between"><span>subtotal</span><span>1 role + 3 internships</span></div>
                <div className="flex justify-between font-semibold"><span>tip</span><span className="text-terra">hire her</span></div>
              </div>
              <p className="mt-8 text-center font-mono text-[12px] text-ash">thank you, come again</p>
              <div className="mx-auto mt-4 flex h-10 max-w-[220px] gap-[3px]" aria-hidden>
                {Array.from({ length: 42 }, (_, i) => <span key={i} className="h-full bg-espresso" style={{ width: (i * 7) % 3 + 1 }} />)}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
