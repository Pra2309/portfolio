import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, y = 28, className = "", as = "div" }) => {
  const C = motion[as];
  return (
    <C
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </C>
  );
};

export const SectionHead = ({ eyebrow, title, id }) => (
  <Reveal className="mb-14 max-w-4xl">
    <p className="eyebrow mb-5" data-testid={`${id}-eyebrow`}>{eyebrow}</p>
    <h2 className="h2" data-testid={`${id}-heading`}>{title}</h2>
  </Reveal>
);
