import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { impact, aiImpact } from "@/data/content";
import { Reveal, SectionHead } from "@/components/site/Reveal";

const Counter = ({ value, prefix = "", suffix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return undefined;
    const c = animate(0, value, { duration: 1.8, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value]);
  return <span ref={ref}>{prefix}{n}{suffix}</span>;
};

const spans = ["sm:col-span-3 sm:row-span-2", "sm:col-span-3", "sm:col-span-3", "sm:col-span-3", "sm:col-span-3"];

export const Impact = () => (
  <section id="impact" className="relative bg-beige/60 py-28 lg:py-40" data-testid="impact-section">
    <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
      <SectionHead id="impact" eyebrow="chapter 02 · the receipts before the receipt" title={<>less talk. <em className="text-terra">more shipped.</em></>} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-6 sm:grid-rows-[auto_auto_auto]">
        {impact.map((m, i) => {
          const dark = i === 0;
          return (
            <Reveal key={m.label} delay={i * 0.06} className={`${spans[i]}`}>
              <article
                className={`group flex h-full flex-col justify-between rounded-[28px] border p-7 transition-transform duration-500 hover:-translate-y-1 sm:p-9 ${dark ? "border-transparent bg-espresso text-cream" : "border-espresso/10 bg-paper"}`}
                data-testid={`impact-card-${i}`}
              >
                <p className={`font-mono text-[11px] uppercase tracking-[0.18em] ${dark ? "text-caramel" : "text-terra"}`}>↳ {m.source}</p>
                <div className="mt-10">
                  <p className={`font-serif leading-none tracking-tight ${dark ? "text-[clamp(6rem,14vw,12rem)]" : "text-7xl sm:text-8xl"}`} data-testid={`impact-value-${i}`}>
                    <Counter value={m.value} prefix={m.prefix} suffix={m.suffix} />
                  </p>
                  <p className={`mt-3 font-serif text-2xl italic sm:text-3xl ${dark ? "text-cream" : "text-espresso"}`}>{m.label}</p>
                  <p className={`mt-3 max-w-md text-sm leading-relaxed ${dark ? "text-beige" : "text-ash"}`}>{m.desc}</p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
      <Reveal className="mt-16">
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-t border-espresso/15 pt-8">
          <h3 className="font-serif text-3xl sm:text-4xl">and on the <em className="text-terra">AI side</em>.</h3>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ash">things shipped, counted honestly</p>
        </div>
        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4" data-testid="ai-impact-list">
          {aiImpact.map((a, i) => (
            <li key={a.label} className="rounded-[22px] border border-espresso/10 bg-paper p-6 transition-transform duration-500 hover:-translate-y-1" data-testid={`ai-impact-${i}`}>
              <p className="font-serif text-5xl leading-none text-terra">{a.value}</p>
              <p className="mt-3 text-[15px] font-semibold leading-snug text-espresso">{a.label}</p>
              <p className="mt-2 font-mono text-[11px] text-ash">↳ {a.source}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
);
