import { Suspense, lazy, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, MapPin, Globe2, Plane, Sparkles } from "lucide-react";
import { personal } from "@/data/content";
import { scrollToId, hasWebGL, prefersReducedMotion, useIsMobile, useIST } from "@/lib/site";
import { CupFallback } from "@/components/hero/CupFallback";
import { FloatingChips } from "@/components/hero/FloatingChips";
import { HeroCursor } from "@/components/site/HeroCursor";

const HeroScene = lazy(() => import("@/components/hero/HeroScene"));
const ease = [0.22, 1, 0.36, 1];

const Line = ({ children, delay, className = "" }) => (
  <span className="block overflow-hidden pb-[0.08em]">
    <motion.span className={`block ${className}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1.1, delay, ease }}>
      {children}
    </motion.span>
  </span>
);

const Fade = ({ children, delay, className = "" }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay, ease }}>
    {children}
  </motion.div>
);

export const Hero = () => {
  const ref = useRef(null);
  const mobile = useIsMobile();
  const time = useIST();
  const [use3D, setUse3D] = useState(false);
  useEffect(() => { setUse3D(hasWebGL() && !prefersReducedMotion()); }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const typeY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section id="top" ref={ref} className="hero-cursor-zone relative min-h-[100svh] overflow-hidden pt-24" data-testid="hero-section">
      <HeroCursor zoneRef={ref} />
      <div className="pointer-events-none absolute -right-40 top-10 h-[560px] w-[560px] rounded-full bg-beige blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-terra/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-6 px-5 sm:px-8 lg:grid-cols-12 lg:gap-4">
        <motion.div style={{ y: typeY }} className="relative z-10 lg:col-span-7 lg:pt-10">
          <Fade delay={0.1}>
            <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1" data-testid="hero-status-line">
              <span className="inline-flex h-2 w-2 rounded-full bg-terra" /> pune · {time} ist · status: brewing agents
            </p>
          </Fade>
          <h1 className="mt-6 font-serif text-[clamp(3.6rem,11vw,9.5rem)] leading-[0.88] tracking-[-0.02em] text-espresso" data-testid="hero-heading">
            <Line delay={0.2}>hey, i'm</Line>
            <Line delay={0.35} className="italic text-terra">Prachi.</Line>
          </h1>
          <div className="mt-6 font-serif text-2xl leading-snug text-espresso sm:text-3xl" data-testid="hero-subheading">
            {personal.heroSub.map((s, i) => (
              <Line key={s} delay={0.6 + i * 0.12} className={i === 2 ? "italic" : ""}>{s}</Line>
            ))}
          </div>
          <Fade delay={1.0}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-espresso/80 sm:text-lg">{personal.heroIntro}</p>
          </Fade>
          <Fade delay={1.1} className="mt-6 flex flex-wrap gap-2">
            <span className="chip"><MapPin className="h-3.5 w-3.5 text-terra" />Pune, India</span>
            <span className="chip"><Globe2 className="h-3.5 w-3.5 text-terra" />open to opportunities worldwide</span>
            <span className="chip"><Plane className="h-3.5 w-3.5 text-terra" />available for relocation</span>
            <span className="chip"><Sparkles className="h-3.5 w-3.5 text-terra" />AI Engineer / Software Engineer</span>
          </Fade>
          <Fade delay={1.25} className="mt-9 flex flex-wrap items-center gap-3">
            <button onClick={() => scrollToId("projects")} className="btn-primary" data-testid="hero-cta-explore">
              Explore my work <ArrowDownRight className="h-4 w-4" />
            </button>
            <Link to="/recruiter" className="btn-terra" data-testid="hero-cta-recruiter">Recruiter? Start here</Link>
            <button onClick={() => scrollToId("contact")} className="btn-ghost" data-testid="hero-cta-connect">Let's connect</button>
          </Fade>
        </motion.div>

        <motion.div style={{ y: sceneY, scale: sceneScale }} className="relative h-[380px] sm:h-[480px] lg:col-span-5 lg:h-[680px]">
          <motion.div className="h-full w-full" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4, delay: 0.3, ease }}>
            {use3D ? (
              <Suspense fallback={<CupFallback />}>
                <HeroScene mobile={mobile} />
              </Suspense>
            ) : (
              <CupFallback />
            )}
            {use3D && <FloatingChips />}
          </motion.div>
          <p className="pointer-events-none absolute -bottom-2 left-2 rotate-[-4deg] font-hand text-xl text-terra sm:text-2xl lg:bottom-4">
            {mobile ? "tap the cup. double-tap for a surprise." : "move your mouse around. double-click for a surprise."}
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 font-mono text-[11px] text-ash lg:block">scroll · the coffee's getting cold ↓</div>
    </section>
  );
};
