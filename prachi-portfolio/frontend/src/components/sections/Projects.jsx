import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Folder, FileCode2, Github, Lock, ChevronDown } from "lucide-react";
import { projects, projectTabs, personal } from "@/data/content";
import { Reveal, SectionHead } from "@/components/site/Reveal";
import { ProjectArt } from "@/components/projects/ProjectArt";
import { TerminalPrompt } from "@/components/projects/TerminalPrompt";

const Detail = ({ p, idx }) => {
  const [more, setMore] = useState(false);
  return (
    <motion.article key={p.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="p-5 sm:p-8" data-testid={`project-detail-${p.id}`}>
      <div className="aspect-[15/8] overflow-hidden rounded-2xl"><ProjectArt project={p} idx={idx} /></div>
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-terra/20 px-3 py-1 font-mono text-[11px] text-[#F0B79A]">{p.category}</span>
        {p.kind === "enterprise" && <span className="inline-flex items-center gap-1 rounded-full border border-cream/20 px-3 py-1 font-mono text-[11px] text-beige"><Lock className="h-3 w-3" />professional enterprise work · Xoriant</span>}
      </div>
      <h3 className="mt-4 font-serif text-4xl leading-tight text-cream sm:text-5xl">{p.title}</h3>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-beige">{p.desc}</p>
      <ul className="mt-5 flex flex-wrap gap-1.5">
        {p.stack.map((s) => <li key={s} className="rounded-md border border-cream/15 px-2 py-1 font-mono text-[11px] text-cream/90">{s}</li>)}
      </ul>
      <button onClick={() => setMore(!more)} className="mt-6 inline-flex items-center gap-1.5 font-mono text-[12px] text-[#F0B79A] hover:underline" aria-expanded={more} data-testid={`project-expand-${p.id}`}>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${more ? "rotate-180" : ""}`} /> {more ? "collapse" : "cat README.md"}
      </button>
      <AnimatePresence initial={false}>
        {(more) && (
          <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            {p.points.map((pt) => <li key={pt} className="mt-3 flex gap-3 text-[14px] leading-relaxed text-beige"><span className="font-mono text-terra">→</span>{pt}</li>)}
          </motion.ul>
        )}
      </AnimatePresence>
      <div className="mt-7 flex flex-wrap gap-3">
        {p.kind === "personal" ? (
          <a href={personal.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 font-mono text-[12px] text-espresso transition-transform hover:-translate-y-0.5" data-testid={`project-github-${p.id}`}>
            <Github className="h-3.5 w-3.5" /> browse on github
          </a>
        ) : (
          <span className="font-mono text-[12px] text-[#C9B8A6]">code is proprietary · no public repo or demo</span>
        )}
      </div>
    </motion.article>
  );
};

export const Projects = () => {
  const [tab, setTab] = useState("featured");
  const list = useMemo(() => projects.filter((p) => p.tabs.includes(tab)), [tab]);
  const [sel, setSel] = useState(projects[0].id);
  const current = list.find((p) => p.id === sel) || list[0];
  const openById = (id) => { const p = projects.find((x) => x.id === id); setTab(p.tabs[0]); setSel(id); };

  return (
    <section id="projects" className="relative mx-auto max-w-[1400px] px-5 py-28 sm:px-8 lg:py-40" data-testid="projects-section">
      <SectionHead id="projects" eyebrow="chapter 04 · ~/prachi/projects (sorted by coffee consumed)" title={<>things i've built. <em className="text-terra">some for work, some for fun.</em></>} />
      <Reveal y={40}>
        <div className="overflow-hidden rounded-[24px] border border-espresso/20 bg-espresso shadow-[0_40px_80px_-40px_rgba(36,23,19,0.7)]" data-testid="projects-window">
          <div className="flex items-center gap-3 border-b border-cream/10 px-5 py-3">
            <span className="flex gap-1.5"><i className="h-3 w-3 rounded-full bg-terra" /><i className="h-3 w-3 rounded-full bg-caramel" /><i className="h-3 w-3 rounded-full bg-beige" /></span>
            <span className="truncate font-mono text-[12px] text-beige">~/prachi/projects/{current?.file}</span>
          </div>
          <div role="tablist" className="flex gap-1 overflow-x-auto border-b border-cream/10 px-3 py-2" data-lenis-prevent>
            {projectTabs.map((t) => (
              <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => { setTab(t.id); setSel(projects.find((p) => p.tabs.includes(t.id)).id); }}
                className={`shrink-0 rounded-full px-4 py-1.5 font-mono text-[12px] transition-colors ${tab === t.id ? "bg-cream text-espresso" : "text-beige hover:bg-cream/10"}`} data-testid={`projects-tab-${t.id}`}>
                {t.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12">
            <ul className="border-b border-cream/10 p-3 md:col-span-4 md:border-b-0 md:border-r" aria-label="Project files">
              <li className="flex items-center gap-2 px-3 py-2 font-mono text-[12px] text-caramel"><Folder className="h-3.5 w-3.5" /> {tab}/ ({list.length})</li>
              {list.map((p) => (
                <li key={p.id}>
                  <button onClick={() => setSel(p.id)} className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${current?.id === p.id ? "bg-cream/10" : "hover:bg-cream/5"}`} data-testid={`project-file-${p.id}`}>
                    <span className="font-mono text-[11px] text-terra">{p.num}</span>
                    <FileCode2 className="h-4 w-4 shrink-0 text-beige transition-transform group-hover:-rotate-12" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[15px] font-semibold text-cream">{p.title}</span>
                      <span className="block truncate font-mono text-[11px] text-[#C9B8A6]">{p.category}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="md:col-span-8">
              <AnimatePresence initial={false}>{current && <Detail p={current} idx={projects.indexOf(current)} />}</AnimatePresence>
            </div>
          </div>
          <TerminalPrompt onOpen={openById} />
        </div>
      </Reveal>
    </section>
  );
};
