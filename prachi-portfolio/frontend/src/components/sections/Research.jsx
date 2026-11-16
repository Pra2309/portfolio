import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Download, ChevronDown } from "lucide-react";
import { publication as pub } from "@/data/content";
import { Reveal, SectionHead } from "@/components/site/Reveal";

export const Research = () => {
  const [open, setOpen] = useState(false);
  return (
    <section id="research" className="relative bg-beige/60 py-28 lg:py-40" data-testid="research-section">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHead id="research" eyebrow="chapter 05 · research & publications" title={<>curious enough to go <em className="text-terra">beyond the code.</em></>} />
        <Reveal y={40}>
          <article className="relative grid grid-cols-1 overflow-hidden rounded-[28px] border border-espresso/10 bg-paper lg:grid-cols-12" data-testid="publication-card">
            <div className="relative flex flex-col justify-between bg-espresso p-8 text-cream lg:col-span-4 sm:p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-caramel">peer-reviewed · {pub.date}</p>
              <div className="my-10">
                <p className="font-serif text-[7rem] leading-none text-terra">“</p>
                <p className="-mt-10 font-serif text-3xl italic leading-tight">can a sketch find a face?</p>
              </div>
              <dl className="grid grid-cols-2 gap-4 font-mono text-[12px]">
                <div><dt className="text-caramel">volume</dt><dd>{pub.volume}</dd></div>
                <div><dt className="text-caramel">pages</dt><dd>{pub.pages}</dd></div>
                <div className="col-span-2"><dt className="text-caramel">paper id</dt><dd>{pub.paperId}</dd></div>
              </dl>
            </div>
            <div className="p-8 sm:p-12 lg:col-span-8">
              <p className="eyebrow">{pub.journal}</p>
              <h3 className="mt-4 font-serif text-3xl leading-tight text-espresso sm:text-5xl" data-testid="publication-title">{pub.title}</h3>
              <button onClick={() => setOpen(!open)} className="mt-8 flex w-full items-center justify-between border-y border-espresso/15 py-4 text-left font-mono text-[13px] text-espresso" aria-expanded={open} data-testid="publication-abstract-toggle">
                read the summary <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pt-4 font-serif text-xl leading-relaxed text-espresso/90" data-testid="publication-abstract">
                    {pub.summary} <span className="block pt-3 font-sans text-sm text-ash">The full abstract and methodology are available in the published paper.</span>
                  </motion.p>
                )}
              </AnimatePresence>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={pub.readUrl} target="_blank" rel="noreferrer" className="btn-primary" data-testid="publication-read-btn"><BookOpen className="h-4 w-4" /> Read publication</a>
                <a href={pub.pdfUrl} target="_blank" rel="noreferrer" className="btn-ghost" data-testid="publication-download-btn"><Download className="h-4 w-4" /> Download paper</a>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
};
