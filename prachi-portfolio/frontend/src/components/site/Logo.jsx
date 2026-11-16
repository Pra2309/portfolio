export const Logo = ({ className = "h-8 w-8" }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <ellipse cx="32" cy="32" rx="17" ry="22" transform="rotate(28 32 32)" fill="#38251F" />
    <path d="M24 15c8 6 9 12 6 18s-2 12 6 17" fill="none" stroke="#C47B57" strokeWidth="4" strokeLinecap="round" />
    <circle cx="46" cy="16" r="4" fill="#C47B57" />
  </svg>
);

export const Wordmark = () => (
  <span className="flex items-center gap-2">
    <Logo className="h-8 w-8 transition-transform duration-500 group-hover:rotate-[24deg]" />
    <span className="font-serif text-2xl leading-none text-espresso">
      prachi<span className="text-terra">.</span>brew
    </span>
  </span>
);
