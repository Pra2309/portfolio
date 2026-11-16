import { triggerEspresso, scrollToId } from "@/lib/site";
import { Logo } from "@/components/site/Logo";

export const Footer = () => (
  <footer className="relative overflow-hidden bg-coffee pb-10 pt-20 text-cream" data-testid="site-footer">
    <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
      <p className="font-serif text-[clamp(3rem,10vw,9rem)] leading-[0.9] tracking-tight text-cream/95" data-testid="footer-tagline">more to grow, <em className="text-terra">more to be.</em></p>
      <div className="mt-14 flex flex-col gap-6 border-t border-cream/10 pt-8 md:flex-row md:items-center md:justify-between md:pr-20">
        <div className="flex items-center gap-3">
          <Logo className="h-7 w-7 shrink-0" />
          <p className="font-hand text-xl leading-tight text-caramel">p.s. psst — there's a hidden blend somewhere. try typing "brew".</p>
        </div>
        <div className="flex items-center gap-5">
          <button onClick={triggerEspresso} className="rounded-full border border-terra px-4 py-2 font-mono text-[12px] text-terra transition-colors hover:bg-terra hover:text-paper" data-testid="footer-do-not-click">do not click</button>
          <button onClick={() => scrollToId("top")} className="font-mono text-[12px] text-beige hover:text-cream" data-testid="footer-back-top">back to the top ↑</button>
        </div>
      </div>
    </div>
  </footer>
);
