"use client";

import { motion, useInView, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------
 * Intro : compteur 0 → 100 puis rideau qui se lève.
 * Rendu côté serveur avec une animation CSS de secours (le rideau se
 * lève même sans JavaScript) ; masqué si prefers-reduced-motion.
 * ------------------------------------------------------------------ */
export const INTRO_EVENT = "intro:done";
let introDone = false;
export const isIntroDone = () => introDone;
function finishIntro() {
  if (introDone) return;
  introDone = true;
  window.dispatchEvent(new Event(INTRO_EVENT));
}

export function Preloader({ label }: { label: string }) {
  const [n, setN] = useState(0);
  const [gone, setGone] = useState(false);
  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("intro") === "1"; sessionStorage.setItem("intro", "1"); } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setGone(true);
      finishIntro();
      return;
    }
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 1300);
      setN(Math.round(100 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const lift = setTimeout(finishIntro, 1500);
    const hide = setTimeout(() => setGone(true), 2400);
    return () => { cancelAnimationFrame(raf); clearTimeout(lift); clearTimeout(hide); };
  }, []);
  if (gone) return null;
  return (
    <div className="preloader fixed inset-0 z-[100] flex flex-col justify-between bg-bg-soft p-5 md:p-10" aria-hidden>
      <p className="mono flex justify-between text-[11px] text-muted">
        <span>{label}</span>
        <span className="text-accent">Dakar — 2026</span>
      </p>
      <div className="flex items-end justify-between">
        <span className="display tabular-nums text-[clamp(6rem,26vw,22rem)] leading-[0.8]">{n}</span>
        <span className="mono mb-4 text-xs text-muted">%</span>
      </div>
      <span className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent" style={{ transform: `scaleX(${n / 100})` }} />
    </div>
  );
}

/** Vrai quand l'intro est terminée (ou absente). */
export function useIntroDone() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (isIntroDone()) { setDone(true); return; }
    const on = () => setDone(true);
    window.addEventListener(INTRO_EVENT, on);
    return () => window.removeEventListener(INTRO_EVENT, on);
  }, []);
  return done;
}

/* ------------------------------------------------------------------
 * Titre révélé mot par mot (chaque mot monte depuis un masque).
 * Visible côté serveur ; seuls les titres hors écran sont masqués au
 * montage, puis révélés à l'entrée dans l'écran.
 * ------------------------------------------------------------------ */
export function SplitText({ text, className, as = "h2", id, waitIntro = false, delay = 0 }: { text: string; className?: string; as?: "h1" | "h2" | "p"; id?: string; waitIntro?: boolean; delay?: number }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [state, setState] = useState<"idle" | "hidden" | "shown">("idle");
  const intro = useIntroDone();

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (waitIntro) {
      if (!isIntroDone()) setState("hidden");
      return;
    }
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    setState("hidden");
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setState("shown"); io.disconnect(); } }, { rootMargin: "0px 0px -12% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [waitIntro]);

  useEffect(() => { if (waitIntro && intro) setState((s) => (s === "hidden" ? "shown" : s)); }, [waitIntro, intro]);

  const Tag = as;
  const words = text.split(" ");
  return (
    <Tag ref={ref} id={id} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-top">
          <span
            className="inline-block"
            style={state === "idle" ? undefined : {
              transform: state === "shown" ? "none" : "translateY(105%)",
              transition: `transform 1s cubic-bezier(.22,1,.36,1) ${delay + i * 0.06}s`,
            }}
          >
            {w}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

/* ------------------------------------------------------------------
 * Texte qui « s'allume » mot par mot au fil du scroll.
 * ------------------------------------------------------------------ */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");
  if (reduce) return <p className={className}>{text}</p>;
  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </Word>
      ))}
    </p>
  );
}
function Word({ children, progress, range }: { children: React.ReactNode; progress: MotionValue<number>; range: [number, number] }) {
  // Du gris (#8A8A85, contraste AA) à l'ivoire (#F4F1EA)
  const color = useTransform(progress, range, ["rgb(138,138,133)", "rgb(244,241,234)"]);
  return <motion.span aria-hidden style={{ color }}>{children}</motion.span>;
}

/* ------------------------------------------------------------------
 * Chiffre qui défile jusqu'à sa valeur à l'entrée dans l'écran.
 * ------------------------------------------------------------------ */
export function CountUp({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const [n, setN] = useState(value);
  const started = useRef(false);
  useEffect(() => {
    if (!inView || started.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    started.current = true;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 1400);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    setN(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return <span ref={ref} className={`tabular-nums ${className ?? ""}`}>{n}</span>;
}

/* ------------------------------------------------------------------
 * Deux bandeaux inclinés qui se croisent et défilent en sens inverse.
 * ------------------------------------------------------------------ */
export function CrossMarquee({ words }: { words: string[] }) {
  const row = (k: string, outline: boolean) => (
    <div key={k} className="flex shrink-0 items-center">
      {words.map((w) => (
        <span key={w} className={`flex items-center gap-6 pr-6 font-serif text-3xl italic md:text-5xl ${outline ? "text-outline" : ""}`}>
          {w}<span className="text-base not-italic text-accent">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="relative h-[170px] overflow-hidden md:h-[230px]" aria-hidden>
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[3deg] border-y border-line bg-bg py-4">
        <div className="marquee marquee-reverse">{row("a", true)}{row("b", true)}</div>
      </div>
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 -rotate-[2.5deg] border-y border-line bg-bg-soft py-4 shadow-[0_20px_60px_rgba(0,0,0,.5)]">
        <div className="marquee">{row("c", false)}{row("d", false)}</div>
      </div>
    </div>
  );
}
