import { useEffect, useRef, useState } from "react";

export const HeroCursor = ({ zoneRef }) => {
  const dot = useRef(null);
  const ring = useRef(null);
  const [on, setOn] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const zone = zoneRef.current;
    if (!zone || !window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const pos = { x: 0, y: 0 }, lag = { x: 0, y: 0 };
    let id;
    const move = (e) => { pos.x = e.clientX; pos.y = e.clientY; setHover(!!e.target.closest("a,button")); };
    const enter = () => setOn(true);
    const leave = () => setOn(false);
    const loop = () => {
      lag.x += (pos.x - lag.x) * 0.18; lag.y += (pos.y - lag.y) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${lag.x}px, ${lag.y}px, 0)`;
      id = requestAnimationFrame(loop);
    };
    zone.addEventListener("pointermove", move);
    zone.addEventListener("pointerenter", enter);
    zone.addEventListener("pointerleave", leave);
    id = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(id);
      zone.removeEventListener("pointermove", move);
      zone.removeEventListener("pointerenter", enter);
      zone.removeEventListener("pointerleave", leave);
    };
  }, [zoneRef]);

  return (
    <div aria-hidden className={`pointer-events-none fixed left-0 top-0 z-[80] transition-opacity duration-300 ${on ? "opacity-100" : "opacity-0"}`}>
      <div ref={dot} className="absolute -ml-1.5 -mt-1.5 h-3 w-3 rounded-full bg-terra" />
      <div ref={ring} className="absolute">
        <div className={`-ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-espresso/50 transition-transform duration-300 ${hover ? "scale-[1.8] bg-terra/10" : ""}`}>
          <span className={`font-mono text-[8px] text-espresso transition-opacity ${hover ? "opacity-100" : "opacity-0"}`}>sip</span>
        </div>
      </div>
    </div>
  );
};
