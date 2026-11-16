import { motion } from "framer-motion";

const CHIPS = [
  { t: "{ rag }", c: "left-[4%] top-[22%]" },
  { t: "POST /api/agents", c: "right-[4%] top-[12%]" },
  { t: "a2a://handoff", c: "left-[2%] top-[58%]" },
  { t: "def embed(doc):", c: "right-[2%] top-[48%]", desk: true },
  { t: "$ gcloud run deploy", c: "left-[24%] top-[4%]", desk: true },
  { t: "mcp.tools()", c: "right-[18%] bottom-[16%]", desk: true },
];

export const FloatingChips = () => (
  <div className="pointer-events-none absolute inset-0" aria-hidden>
    {CHIPS.map((ch, i) => (
      <motion.span
        key={ch.t}
        className={`absolute ${ch.c} ${ch.desk ? "hidden sm:block" : ""} whitespace-nowrap rounded-md border border-espresso/15 bg-paper/90 px-2 py-1 font-mono text-[11px] text-espresso shadow-sm backdrop-blur`}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
      >
        {ch.t}
      </motion.span>
    ))}
  </div>
);
