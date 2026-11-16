import { useEffect, useRef, useState } from "react";
import { projects, personal } from "@/data/content";
import { triggerEspresso } from "@/lib/site";

const HELP = ["commands: help · ls · whoami · open <01-07> · cat secret.txt · sudo hire prachi · coffee · clear"];

export const TerminalPrompt = ({ onOpen }) => {
  const [lines, setLines] = useState(["welcome to ~/prachi/projects — type `help` to look around."]);
  const [val, setVal] = useState("");
  const box = useRef(null);
  useEffect(() => { if (box.current) box.current.scrollTop = box.current.scrollHeight; }, [lines]);

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase();
    let out = [];
    if (!cmd) return;
    if (cmd === "help") out = HELP;
    else if (cmd === "ls") out = projects.map((p) => `${p.num}  ${p.file}/  ${p.kind === "enterprise" ? "[xoriant]" : "[personal]"}`);
    else if (cmd === "whoami") out = [`${personal.name} — ${personal.titles.join(" | ")}. ${personal.city}, open to relocation.`];
    else if (cmd.startsWith("open")) {
      const p = projects.find((x) => x.num === cmd.split(" ")[1]?.padStart(2, "0"));
      if (p) { onOpen(p.id); out = [`opening ${p.file}/ ...`]; } else out = ["usage: open 01"];
    } else if (cmd === "cat secret.txt") out = ["the secret ingredient is curiosity. also: try typing 'brew' anywhere on the page."];
    else if (cmd === "sudo hire prachi") out = ["[sudo] permission granted. redirecting you to the contact form is left as an exercise. (scroll down.)"];
    else if (cmd === "coffee") { triggerEspresso(); out = ["brewing... ☕"]; }
    else if (cmd === "clear") { setLines([]); return; }
    else out = [`command not found: ${cmd}. try \`help\``];
    setLines((l) => [...l, `$ ${raw}`, ...out].slice(-40));
  };

  return (
    <div className="border-t border-cream/10 bg-coffee px-5 py-4 font-mono text-[12px]" data-testid="projects-terminal">
      <div ref={box} className="max-h-32 overflow-y-auto pr-2 text-beige" data-lenis-prevent>
        {lines.map((l, i) => <p key={i} className={l.startsWith("$") ? "text-cream" : "text-[#C9B8A6]"}>{l}</p>)}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); run(val); setVal(""); }} className="mt-2 flex items-center gap-2">
        <span className="text-terra">prachi@brew:~/projects$</span>
        <input value={val} onChange={(e) => setVal(e.target.value)} className="min-w-0 flex-1 bg-transparent text-cream caret-terra outline-none placeholder:text-[#9C8B7C]" placeholder="type help" aria-label="Terminal command" data-testid="projects-terminal-input" />
      </form>
    </div>
  );
};
