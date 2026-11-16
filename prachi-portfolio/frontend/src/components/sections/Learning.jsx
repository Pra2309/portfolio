import { motion } from "framer-motion";
import { GraduationCap, Award, Trophy } from "lucide-react";
import { education as ed, certifications, achievements } from "@/data/content";
import { Reveal, SectionHead } from "@/components/site/Reveal";

const tilt = [-2, 1.5, -1, 2, -1.5];

export const Learning = () => (
  <section id="learning" className="relative bg-espresso py-28 text-cream lg:py-40" data-testid="learning-section">
    <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
      <Reveal className="mb-14 max-w-4xl">
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-caramel">chapter 07 · education & credentials</p>
        <h2 className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl" data-testid="learning-heading">proof that i <em className="text-terra">don't stop learning.</em></h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="relative h-full rounded-[28px] bg-cream p-8 text-espresso sm:p-10" data-testid="education-card">
            <GraduationCap className="h-8 w-8 text-terra" />
            <p className="eyebrow mt-8">{ed.period} · {ed.location}</p>
            <h3 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">{ed.school}</h3>
            <p className="mt-3 text-base text-espresso/80">{ed.degree}</p>
            <div className="mt-10 flex items-end justify-between border-t border-dashed border-espresso/25 pt-6">
              <span className="font-mono text-[12px] text-ash">cgpa</span>
              <span className="font-serif text-6xl leading-none" data-testid="education-cgpa">{ed.cgpa}</span>
            </div>
            <p className="absolute right-6 top-8 rotate-6 font-hand text-2xl text-terra">class of '24</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
          {certifications.map((c, i) => (
            <motion.div key={c.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} whileHover={{ rotate: tilt[i], y: -4 }} transition={{ duration: 0.6, delay: i * 0.06 }}
              className={`flex flex-col justify-between rounded-[22px] border border-cream/15 p-6 ${i === 0 ? "sm:col-span-2 bg-terra text-paper" : "bg-[#2D1E19]"}`} data-testid={`cert-card-${i}`}>
              <div className="flex items-center justify-between">
                <Award className={`h-5 w-5 ${i === 0 ? "text-paper" : "text-caramel"}`} />
                <span className={`font-mono text-[11px] uppercase tracking-[0.16em] ${i === 0 ? "text-paper/90" : "text-caramel"}`}>{c.issuer}</span>
              </div>
              <p className="mt-8 font-serif text-2xl leading-tight">{c.name}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <p className="mb-6 font-hand text-2xl text-caramel">and a few shiny things along the way</p>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {achievements.map((a, i) => (
            <Reveal key={a.name} delay={i * 0.08} as="li">
              <div className="flex items-start gap-4 rounded-[22px] border border-cream/15 p-6" data-testid={`achievement-${i}`}>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream text-espresso"><Trophy className="h-4 w-4" /></span>
                <div>
                  <p className="font-serif text-2xl">{a.name}</p>
                  <p className="mt-1 text-sm text-beige">{a.note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
