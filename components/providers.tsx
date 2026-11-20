"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import type { Lang, T } from "@/data/content";

type LangCtx = { lang: Lang; setLang: (l: Lang) => void; t: (x: T) => string };
const Ctx = createContext<LangCtx>({ lang: "fr", setLang: () => {}, t: (x) => x.fr });
export const useLang = () => useContext(Ctx);

export function Providers({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang");
      if (saved === "en" || saved === "fr") setLangState(saved);
    } catch {}
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("lang", l); } catch {}
  }, []);

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  const t = useCallback((x: T) => x[lang], [lang]);

  return (
    <Ctx.Provider value={{ lang, setLang, t }}>
      <SmoothScroll />
      <Cursor />
      {children}
    </Ctx.Provider>
  );
}

/** Défilement fluide (Lenis) — désactivé si l'utilisateur préfère moins d'animations. */
function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.1, anchors: { offset: -64 } });
    let raf = 0;
    const loop = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);
  return null;
}

/** Curseur personnalisé — uniquement souris (pointer: fine) et sans reduced-motion. */
function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setOn(true);
    document.documentElement.classList.add("has-cursor");
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, raf = 0, hover = false;
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      const el = e.target as Element | null;
      hover = !!el?.closest?.("a, button, [role=button], input, textarea, select, label");
    };
    const loop = () => {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${hover ? 1.8 : 1})`;
        ring.current.style.borderColor = hover ? "var(--accent)" : "rgba(244,241,234,0.4)";
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  if (!on) return null;
  return (
    <>
      <div ref={dot} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[90] h-1.5 w-1.5 rounded-full bg-accent" />
      <div ref={ring} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[90] h-9 w-9 rounded-full border transition-[border-color,scale] duration-200" />
    </>
  );
}
