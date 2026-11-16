import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { skills } from "@/data/content";
import { Reveal, SectionHead } from "@/components/site/Reveal";

const spans = ["lg:col-span-3", "lg:col-span-6", "lg:col-span-3", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4", "lg:col-span-8"];

export const Toolbox = () => {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  return (
    <section id="toolbox" className="relative mx-auto max-w-[1400px] px-5 py-28 sm:px-8 lg:py-40" data-testid="toolbox-section">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHead id="toolbox" eyebrow="chapter 06 · the stack" title={<>my <em className="text-terra">toolbox.</em></>} note="no fake percentages. just things i actually use." />
        <Reveal className="mb-14 w-full max-w-sm">
          <label className="flex items-center gap-3 rounded-full border border-espresso/20 bg-paper px-5 py-3 font-mono text-[13px] focus-within:border-terra">
            <Search className="h-4 w-4 text-terra" />
            <span className="text-ash">grep</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="rag, fastapi, mcp…" className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-ash/70" aria-label="Search skills" data-testid="toolbox-search-input" />
          </label>
        </Reveal>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
        {skills.map((g, gi) => {
          const hits = g.items.filter((s) => query && s.toLowerCase().includes(query)).length;
          const dim = query && !hits;
          return (
            <Reveal key={g.id} delay={gi * 0.04} className={spans[gi]}>
              <div className={`group h-full rounded-[24px] border p-6 transition-[opacity,background-color,border-color] duration-300 ${dim ? "opacity-35" : "opacity-100"} ${gi === 1 ? "border-transparent bg-espresso text-cream" : "border-espresso/10 bg-paper hover:border-terra/50"}`} data-testid={`skill-cluster-${g.id}`}>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-serif text-2xl">{g.label}</h3>
                  <span className={`font-mono text-[11px] ${gi === 1 ? "text-caramel" : "text-terra"}`}>{String(g.items.length).padStart(2, "0")}</span>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((s, i) => {
                    const hit = query && s.toLowerCase().includes(query);
                    return (
                      <motion.li key={s} whileHover={{ y: -3, rotate: i % 2 ? 2 : -2 }}
                        className={`cursor-default rounded-full border px-3 py-1.5 font-mono text-[12px] transition-colors ${hit ? "border-terra bg-terra text-paper" : gi === 1 ? "border-cream/20 text-cream" : "border-espresso/15 text-espresso"}`}>
                        {s}
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};
