const palettes = [
  ["#38251F", "#C47B57", "#F4EBDD"],
  ["#241713", "#B58A63", "#E7D9C6"],
];

// Generative node-diagram thumbnail; shape varies by project.
export const ProjectArt = ({ project, idx = 0 }) => {
  const [bg, a, c] = palettes[idx % 2];
  const enterprise = project.kind === "enterprise";
  const n = 4 + (idx % 3);
  const nodes = Array.from({ length: n }, (_, i) => ({ x: 40 + (i * 220) / (n - 1), y: 70 + Math.sin(i * 1.7 + idx) * 38 }));
  return (
    <svg viewBox="0 0 300 160" className="h-full w-full" role="img" aria-label={`${project.title} illustration`}>
      <rect width="300" height="160" rx="14" fill={bg} />
      {Array.from({ length: 10 }, (_, i) => <line key={i} x1={i * 32} y1="0" x2={i * 32} y2="160" stroke={c} strokeOpacity=".05" />)}
      <circle cx="150" cy="80" r="46" fill={a} fillOpacity=".12" />
      {nodes.map((p, i) => i < n - 1 && (
        <path key={`l${i}`} d={`M${p.x} ${p.y} C ${p.x + 40} ${p.y - 30}, ${nodes[i + 1].x - 40} ${nodes[i + 1].y + 30}, ${nodes[i + 1].x} ${nodes[i + 1].y}`} stroke={a} strokeWidth="1.5" fill="none" strokeDasharray={enterprise ? "0" : "4 4"} />
      ))}
      {nodes.map((p, i) => (
        enterprise
          ? <rect key={i} x={p.x - 11} y={p.y - 11} width="22" height="22" rx="5" fill={i === 1 ? a : c} />
          : <circle key={i} cx={p.x} cy={p.y} r={i === 1 ? 12 : 8} fill={i === 1 ? a : c} />
      ))}
      <text x="16" y="146" fontFamily="JetBrains Mono" fontSize="10" fill={c} fillOpacity=".75">{project.file}.{enterprise ? "java" : "py"}</text>
      <text x="284" y="24" textAnchor="end" fontFamily="Instrument Serif" fontSize="30" fill={c} fillOpacity=".9">{project.num}</text>
    </svg>
  );
};
