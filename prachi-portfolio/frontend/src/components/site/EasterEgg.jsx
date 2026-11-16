import { useEffect, useState } from "react";
import { toast } from "sonner";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

export const EasterEgg = () => {
  const [beans, setBeans] = useState([]);

  useEffect(() => {
    let buf = [];
    let typed = "";
    const fire = () => {
      setBeans(Array.from({ length: 36 }, (_, i) => ({ id: `${Date.now()}-${i}`, left: Math.random() * 100, dur: 2.4 + Math.random() * 2.2, delay: Math.random() * 0.8, size: 14 + Math.random() * 16 })));
      toast("you found the secret blend.", { description: "a double espresso, on the house. now go hire her.", duration: 4000 });
    };
    const key = (e) => {
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
      buf = [...buf, e.key].slice(-KONAMI.length);
      typed = (typed + e.key).slice(-5).toLowerCase();
      if (buf.join() === KONAMI.join() || typed === "brew!" || typed.endsWith("brew")) { buf = []; typed = ""; fire(); }
    };
    window.addEventListener("keydown", key);
    window.addEventListener("espresso", fire);
    return () => { window.removeEventListener("keydown", key); window.removeEventListener("espresso", fire); };
  }, []);

  useEffect(() => {
    if (!beans.length) return undefined;
    const t = setTimeout(() => setBeans([]), 5200);
    return () => clearTimeout(t);
  }, [beans]);

  if (!beans.length) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[90] overflow-hidden" aria-hidden data-testid="easter-egg-beans">
      {beans.map((b) => (
        <svg key={b.id} viewBox="0 0 20 28" className="bean-fall absolute top-0" style={{ left: `${b.left}%`, width: b.size, animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s` }}>
          <ellipse cx="10" cy="14" rx="9" ry="13" fill="#38251F" />
          <path d="M7 3c5 4 5 8 3 11s-1 8 3 11" stroke="#C47B57" strokeWidth="2" fill="none" />
        </svg>
      ))}
    </div>
  );
};
