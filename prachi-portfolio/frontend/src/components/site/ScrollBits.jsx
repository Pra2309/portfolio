import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp, Coffee } from "lucide-react";
import { scrollToId } from "@/lib/site";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div style={{ scaleX }} className="no-print fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-terra" data-testid="scroll-progress" />;
};

export const BackToTop = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 900);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <button
      onClick={() => scrollToId("top")}
      aria-label="Back to top"
      data-testid="back-to-top-btn"
      className={`no-print group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-espresso text-cream shadow-[0_12px_30px_-10px_rgba(36,23,19,0.6)] transition-[opacity,transform] duration-500 ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}
    >
      <Coffee className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-6 group-hover:opacity-0" />
      <ArrowUp className="absolute h-5 w-5 translate-y-6 opacity-0 transition-transform duration-300 group-hover:translate-y-0 group-hover:opacity-100" />
    </button>
  );
};
