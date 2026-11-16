import { motion } from "framer-motion";
import { Plane } from "lucide-react";
import { about } from "@/data/content";
import { Reveal, SectionHead } from "@/components/site/Reveal";

const rot = [-3, 2, -1.5, 3, -2, 1.5];

export const About = () => (
  <section id="about" className="relative mx-auto max-w-[1400px] px-5 py-28 sm:px-8 lg:py-40" data-testid="about-section">
    <SectionHead id="about" eyebrow="chapter 01 · the person" title={<>so, who is <em className="text-terra">Prachi</em>?</>} />
    <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
      <div className="lg:col-span-6">
        {about.paragraphs.map((p, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <p className={`mb-6 leading-relaxed text-espresso/85 ${i === 0 ? "font-serif text-2xl leading-snug text-espresso sm:text-3xl" : "text-base sm:text-lg"}`}>{p}</p>
          </Reveal>
        ))}
        <Reveal delay={0.2}>
          <div className="mt-10 inline-flex max-w-lg items-start gap-4 rounded-2xl border border-espresso/15 bg-paper/70 p-5" data-testid="about-availability">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-terra/15"><Plane className="h-4 w-4 text-terra" /></span>
            <div>
              <p className="eyebrow mb-1">availability</p>
              <p className="text-sm leading-relaxed text-espresso">{about.availability}</p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="relative lg:col-span-6">
        <p className="mb-6 font-hand text-2xl text-terra">the journey so far →</p>
        <ol className="relative grid grid-cols-1 gap-5 sm:grid-cols-2">
          {about.journey.map((j, i) => (
            <motion.li
              key={j.label}
              initial={{ opacity: 0, y: 40, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: rot[i] }}
              whileHover={{ rotate: 0, y: -6 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className={`rounded-2xl border border-espresso/10 p-5 shadow-[0_18px_40px_-24px_rgba(36,23,19,0.45)] ${i === about.journey.length - 1 ? "bg-espresso text-cream" : "bg-paper"} ${i % 2 ? "sm:mt-10" : ""}`}
              data-testid={`journey-card-${i}`}
            >
              <p className={`font-mono text-xs ${i === about.journey.length - 1 ? "text-caramel" : "text-terra"}`}>{j.year}</p>
              <p className="mt-2 font-serif text-2xl leading-tight">{j.label}</p>
              <p className={`mt-3 font-mono text-[12px] ${i === about.journey.length - 1 ? "text-beige" : "text-ash"}`}>@ {j.place}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);
