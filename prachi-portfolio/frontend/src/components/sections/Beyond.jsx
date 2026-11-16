import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Expand } from "lucide-react";
import { interests } from "@/data/photos";
import { personal } from "@/data/content";
import { Reveal } from "@/components/site/Reveal";
import { PhotoFrame } from "@/components/beyond/PhotoFrame";
import { Lightbox } from "@/components/beyond/Lightbox";

const layout = {
  travel: { wrap: "lg:sticky lg:top-24", frame: "aspect-[4/5] lg:aspect-auto lg:h-[600px]", rot: -1.5, tape: "left-10 -top-3 -rotate-6" },
  content: { wrap: "", frame: "aspect-[4/3]", rot: 2, tape: "right-8 -top-3 rotate-6" },
  reading: { wrap: "", frame: "aspect-[4/3]", rot: -2, tape: "left-1/2 -top-3 -translate-x-1/2 rotate-2" },
  fitness: { wrap: "lg:col-span-6 lg:col-start-4", frame: "aspect-[4/3]", rot: 1, tape: "right-16 -top-3 -rotate-3" },
};

const byId = Object.fromEntries(interests.map((it) => [it.id, it]));

const Card = ({ item, onOpen, i }) => {
  const l = layout[item.id];
  return (
    <motion.figure
      initial={{ opacity: 0, y: 60, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: l.rot }}
      whileHover={{ rotate: 0, y: -8 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`relative ${l.wrap}`}
      data-testid={`interest-card-${item.id}`}
    >
      <div className="relative rounded-[6px] bg-paper p-3 pb-5 shadow-[0_30px_50px_-30px_rgba(36,23,19,0.55)] sm:p-4 sm:pb-6">
        <span className={`tape ${l.tape}`} aria-hidden />
        <button onClick={() => onOpen(item)} className={`group relative block w-full overflow-hidden rounded-[3px] bg-beige ${l.frame}`} aria-label={`Open ${item.title}`} data-testid={`interest-open-${item.id}`}>
          <div className="h-full w-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]">
            <PhotoFrame src={item.photo} alt={item.alt} position={item.position} />
          </div>
          <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-paper/90 opacity-0 transition-opacity group-hover:opacity-100"><Expand className="h-4 w-4 text-espresso" /></span>
        </button>
        <figcaption className="px-1 pt-5">
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ash">{item.num} · {item.tag}</p>
            <p className="hidden -rotate-3 font-hand text-xl text-terra sm:block">{item.note}</p>
          </div>
          <h3 className="mt-2 font-serif text-3xl leading-tight text-espresso sm:text-4xl">{item.title}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-espresso/80">{item.desc}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <button onClick={() => onOpen(item)} className="font-mono text-[12px] text-terra underline-offset-4 hover:underline" data-testid={`interest-more-${item.id}`}>open the diary page →</button>
            {item.link && (
              <a href={personal[item.link.key]} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-mono text-[12px] text-espresso/80 hover:text-terra" data-testid={`interest-link-${item.id}`}>
                <Instagram className="h-3.5 w-3.5" /> {item.link.label}
              </a>
            )}
          </div>
        </figcaption>
      </div>
    </motion.figure>
  );
};

export const Beyond = () => {
  const [open, setOpen] = useState(null);
  return (
    <section id="beyond" className="relative overflow-x-clip py-28 lg:py-40" data-testid="beyond-section">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal className="mb-20 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-5">chapter 08 · the personal diary</p>
            <h2 className="font-serif text-[clamp(3.5rem,10vw,9rem)] leading-[0.88] tracking-tight" data-testid="beyond-heading">beyond <em className="text-terra">the code.</em></h2>
          </div>
          <div className="lg:col-span-4">
            <p className="font-serif text-2xl leading-snug text-espresso">Because there's more to me than the things I build.</p>
            <p className="mt-3 text-sm leading-relaxed text-ash">Somewhere between writing code, capturing moments, exploring new places and finding time for myself.</p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-x-10 gap-y-16 lg:grid-cols-12">
          <div className="lg:col-span-7"><Card item={byId.travel} i={0} onOpen={setOpen} /></div>
          <div className="flex flex-col gap-16 lg:col-span-5">
            <Card item={byId.content} i={1} onOpen={setOpen} />
            <Card item={byId.reading} i={2} onOpen={setOpen} />
          </div>
          <Card item={byId.fitness} i={3} onOpen={setOpen} />
        </div>
        <Reveal className="mt-24 text-center">
          <p className="font-serif text-3xl italic text-espresso sm:text-5xl" data-testid="beyond-closing-line">Different interests, different experiences, one curious mind.</p>
          <p className="mt-4 font-hand text-2xl text-terra">— p.</p>
        </Reveal>
      </div>
      <Lightbox item={open} onClose={() => setOpen(null)} />
    </section>
  );
};
