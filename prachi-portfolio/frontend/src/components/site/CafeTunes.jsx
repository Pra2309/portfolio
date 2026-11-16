import { useEffect } from "react";

// One site-wide, royalty-free cafe tune: bright electric-piano pop on a happy I–V–vi–IV (104 bpm).
const BPM = 104;
const CHORDS = [
  { root: 48, notes: [60, 64, 67, 74] }, // Cadd9
  { root: 43, notes: [59, 62, 67, 69] }, // G(add9)
  { root: 45, notes: [57, 60, 64, 71] }, // Am(add9)
  { root: 41, notes: [57, 60, 65, 67] }, // Fadd9
];
const MELODY = [76, 79, 81, 84, 86, 88];
const COMP = [0, 2, 3, 6];
const VOL = 0.16;
const hz = (m) => 440 * 2 ** ((m - 69) / 12);

function createEngine() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const master = ctx.createGain();
  master.gain.value = 0;
  const tone = ctx.createBiquadFilter();
  tone.type = "lowpass";
  tone.frequency.value = 3400;
  const delay = ctx.createDelay();
  delay.delayTime.value = (60 / BPM) * 0.75;
  const fb = ctx.createGain();
  fb.gain.value = 0.22;
  const wet = ctx.createGain();
  wet.gain.value = 0.18;
  tone.connect(master);
  tone.connect(delay);
  delay.connect(fb).connect(delay);
  delay.connect(wet).connect(master);
  master.connect(ctx.destination);

  const noise = ctx.createBuffer(1, ctx.sampleRate * 0.2, ctx.sampleRate);
  const d = noise.getChannelData(0);
  for (let i = 0; i < d.length; i += 1) d[i] = Math.random() * 2 - 1;

  const keys = (m, t, dur, vel) => {
    [[1, "sine", 1], [2, "triangle", 0.22], [4, "sine", 0.06]].forEach(([mult, type, amt]) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = type;
      o.frequency.value = hz(m) * mult;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(vel * amt, t + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0008, t + dur);
      o.connect(g).connect(tone);
      o.start(t);
      o.stop(t + dur + 0.05);
    });
  };
  const bass = (m, t, dur) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = hz(m);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.32, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g).connect(master);
    o.start(t);
    o.stop(t + dur + 0.05);
  };
  const shaker = (t, vel) => {
    const s = ctx.createBufferSource();
    s.buffer = noise;
    const f = ctx.createBiquadFilter();
    f.type = "highpass";
    f.frequency.value = 7000;
    const g = ctx.createGain();
    g.gain.setValueAtTime(vel, t);
    g.gain.exponentialRampToValueAtTime(0.0005, t + 0.06);
    s.connect(f).connect(g).connect(master);
    s.start(t);
    s.stop(t + 0.08);
  };

  const eighth = 60 / BPM / 2;
  let step = 0;
  let next = ctx.currentTime + 0.1;
  const timer = setInterval(() => {
    if (ctx.state !== "running") { next = ctx.currentTime + 0.1; return; }
    while (next < ctx.currentTime + 0.15) {
      const bar = Math.floor(step / 8) % CHORDS.length;
      const pos = step % 8;
      const ch = CHORDS[bar];
      const t = next + (pos % 2 ? eighth * 0.12 : 0);
      if (COMP.includes(pos)) ch.notes.forEach((n) => keys(n, t, pos === 0 ? 1.2 : 0.35, pos === 0 ? 0.065 : 0.045));
      if (pos === 0) bass(ch.root, t, 0.9);
      if (pos === 4) bass(ch.root + 7, t, 0.6);
      if (pos === 7) bass(ch.root + 5, t, 0.25);
      shaker(t, pos % 2 ? 0.035 : 0.06);
      if (Math.random() < (pos % 2 ? 0.25 : 0.45)) keys(MELODY[Math.floor(Math.random() * MELODY.length)], t, 0.6, 0.045);
      next += eighth;
      step += 1;
    }
  }, 25);
  const fade = (to, s) => {
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(to, ctx.currentTime + s);
  };
  return { ctx, fade, stop: () => { clearInterval(timer); ctx.close(); } };
}

// Single global instance so only one tune can ever play (survives re-mounts and hot reloads).
const getEngine = () => {
  if (window.__cafeEngine && window.__cafeEngine.ctx.state === "closed") window.__cafeEngine = null;
  if (!window.__cafeEngine) window.__cafeEngine = createEngine();
  return window.__cafeEngine;
};

// No button: fades in on the first tap/click/key (browsers require a gesture), then plays across the whole site.
// Press "m" to mute/unmute. Pauses while the tab is hidden.
export const CafeTunes = () => {
  useEffect(() => {
    let muted = false;
    const events = ["pointerdown", "keydown", "touchend"];
    const start = () => {
      if (muted) return;
      const eng = getEngine();
      if (eng.ctx.state === "running") return;
      eng.ctx.resume().then(() => {
        if (eng.ctx.state === "running") {
          eng.fade(VOL, 2.5);
          events.forEach((ev) => window.removeEventListener(ev, start));
        }
      }).catch(() => {});
    };
    const onKey = (e) => {
      if (e.key !== "m" || ["INPUT", "TEXTAREA"].includes(e.target.tagName) || !window.__cafeEngine) return;
      muted = !muted;
      window.__cafeEngine.fade(muted ? 0 : VOL, 0.6);
    };
    const onVis = () => {
      const eng = window.__cafeEngine;
      if (!eng) return;
      if (document.hidden) eng.ctx.suspend();
      else if (!muted) eng.ctx.resume();
    };
    events.forEach((ev) => window.addEventListener(ev, start, { passive: true }));
    window.addEventListener("keydown", onKey);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      events.forEach((ev) => window.removeEventListener(ev, start));
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);
  return null;
};
