import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Zap } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Wordmark } from "@/components/site/Logo";
import { scrollToId } from "@/lib/site";

export const NAV = [
  ["about", "about"], ["impact", "impact"], ["experience", "experience"], ["projects", "projects"],
  ["research", "research"], ["toolbox", "toolbox"], ["beyond", "beyond the code"], ["twin", "ai twin"],
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const go = (id) => { setOpen(false); setTimeout(() => scrollToId(id), 50); };
  return (
    <header className="no-print fixed inset-x-0 top-0 z-50 border-b border-espresso/10 bg-cream/75 backdrop-blur-xl" data-testid="site-header">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-5 sm:px-8">
        <button onClick={() => scrollToId("top")} className="group" aria-label="Back to top" data-testid="header-logo">
          <Wordmark />
        </button>
        <nav className="hidden items-center gap-6 xl:flex" aria-label="Primary">
          {NAV.map(([id, label]) => (
            <button key={id} onClick={() => go(id)} className="group relative font-mono text-[12px] lowercase text-espresso/80 transition-colors hover:text-espresso" data-testid={`nav-${id}`}>
              {label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-terra transition-[width] duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/recruiter" className="inline-flex items-center gap-1.5 rounded-full bg-espresso px-3.5 py-2 font-mono text-[11px] text-cream transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-terra sm:px-4 sm:text-[12px]" data-testid="recruiter-mode-toggle">
            <Zap className="h-3.5 w-3.5" /> <span className="hidden sm:inline">recruiter mode — 30 seconds</span><span className="sm:hidden">recruiter · 30s</span>
          </Link>
          <button onClick={() => go("contact")} className="hidden rounded-full border border-espresso/25 px-4 py-2 font-mono text-[12px] transition-colors hover:bg-espresso hover:text-cream md:inline-flex" data-testid="header-connect-btn">
            let's connect
          </button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="rounded-full border border-espresso/20 p-2 xl:hidden" aria-label="Open menu" data-testid="mobile-menu-btn"><Menu className="h-4 w-4" /></button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm border-espresso/10 bg-cream" data-lenis-prevent>
              <SheetTitle className="font-serif text-3xl font-normal">where to?</SheetTitle>
              <div className="mt-8 flex flex-col gap-1">
                {[...NAV, ["contact", "contact"]].map(([id, label], i) => (
                  <button key={id} onClick={() => go(id)} className="flex items-baseline gap-3 border-b border-espresso/10 py-3 text-left font-serif text-3xl" data-testid={`mobile-nav-${id}`}>
                    <span className="font-mono text-xs text-terra">0{i + 1}</span>{label}
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
