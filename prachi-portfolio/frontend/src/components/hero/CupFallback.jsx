export const CupFallback = () => (
  <div className="flex h-full w-full items-center justify-center" data-testid="hero-static-fallback">
    <svg viewBox="0 0 320 320" className="h-[78%] w-[78%]" aria-label="Illustrated coffee cup surrounded by AI nodes">
      <g stroke="#B58A63" strokeOpacity=".5" strokeWidth="1">
        <line x1="40" y1="90" x2="110" y2="50" /><line x1="110" y1="50" x2="220" y2="40" /><line x1="220" y1="40" x2="285" y2="110" />
        <line x1="40" y1="90" x2="30" y2="190" /><line x1="285" y1="110" x2="290" y2="210" />
      </g>
      {[[40, 90], [110, 50], [220, 40], [285, 110], [30, 190], [290, 210]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 2 ? 4 : 6} fill={i % 2 ? "#38251F" : "#C47B57"} />
      ))}
      {[0, 1, 2].map((i) => (
        <path key={i} className="steam-line" style={{ animationDelay: `${i * 0.6}s` }} d={`M${140 + i * 20} 120c-8-14 8-22 0-38`} stroke="#B58A63" strokeWidth="4" fill="none" strokeLinecap="round" />
      ))}
      <ellipse cx="160" cy="262" rx="110" ry="16" fill="#E7D9C6" />
      <path d="M88 140h144l-14 110a12 12 0 0 1-12 10H114a12 12 0 0 1-12-10z" fill="#FDFBF7" stroke="#38251F" strokeOpacity=".15" />
      <ellipse cx="160" cy="140" rx="72" ry="12" fill="#38251F" />
      <path d="M230 165c34 0 34 52 0 52" stroke="#FDFBF7" strokeWidth="14" fill="none" strokeLinecap="round" />
      <rect x="18" y="230" width="98" height="24" rx="6" fill="#FDFBF7" stroke="#38251F" strokeOpacity=".15" />
      <text x="28" y="246" fontFamily="JetBrains Mono" fontSize="11" fill="#38251F">{"{ rag }"}</text>
      <rect x="208" y="62" width="104" height="24" rx="6" fill="#FDFBF7" stroke="#38251F" strokeOpacity=".15" />
      <text x="216" y="78" fontFamily="JetBrains Mono" fontSize="11" fill="#38251F">POST /agents</text>
    </svg>
  </div>
);
