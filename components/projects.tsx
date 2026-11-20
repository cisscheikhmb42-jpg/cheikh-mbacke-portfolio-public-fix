"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play, X } from "lucide-react";
import { useLang } from "./providers";
import { SectionHead, btnGhost as btnGhostCls, btnPrimary as btnPrimaryCls } from "./ui";
import { brands, caseStudies, domains, formatOf, formats, media, ui, type CaseStudy, type Format, type MediaItem } from "@/data/content";

// Vidéo mise en avant dans le showreel (vidéo originale Arrow Home)
const SHOWREEL_ID = "arrow-video-avant-apres";
const byId = Object.fromEntries(media.map((m) => [m.id, m]));
const pad = (n: number) => String(n).padStart(2, "0");

function lenis(action: "stop" | "start") {
  (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis?.[action]();
}

// Compteur global : plusieurs calques peuvent se superposer (modal + lightbox).
let locks = 0;
function lockScroll() {
  if (locks++ === 0) { document.body.style.overflow = "hidden"; lenis("stop"); }
}
function unlockScroll() {
  if (--locks === 0) { document.body.style.overflow = ""; lenis("start"); }
}

/** Verrouille le scroll, gère Échap et le focus pour un calque modal. */
function useModal(open: boolean, onClose: () => void, extraKeys?: (e: KeyboardEvent) => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    lockScroll();
    ref.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.stopPropagation(); onClose(); return; }
      extraKeys?.(e);
      if (e.key === "Tab" && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex='-1'])");
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => {
      window.removeEventListener("keydown", onKey, true);
      unlockScroll();
      prevFocus?.focus?.();
    };
  }, [open, onClose, extraKeys]);
  return ref;
}

export function Projects() {
  const { t } = useLang();
  const [openCase, setOpenCase] = useState<CaseStudy | null>(null);
  const [lightbox, setLightbox] = useState<{ items: MediaItem[]; index: number } | null>(null);
  const [tab, setTab] = useState<Format>("posters");
  const groups = useMemo(() => Object.fromEntries(formats.map((f) => [f.id, media.filter((m) => formatOf(m) === f.id)])) as Record<Format, MediaItem[]>, []);
  const reel = byId[SHOWREEL_ID];

  const seeAllVideos = () => {
    setTab("videos");
    document.getElementById("bibliotheque")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="projets" className="scroll-mt-20 py-24 md:py-36">
      <div className="shell">
        <SectionHead index="03" label={t(ui.sections.projects)} title={t(ui.projectsTitle)} />
      </div>

      <CaseRail onOpen={setOpenCase} />

      {reel && (
        <Showreel
          item={reel}
          onPlay={() => setLightbox({ items: groups.videos, index: Math.max(0, groups.videos.indexOf(reel)) })}
          onSeeAll={seeAllVideos}
        />
      )}

      <div id="bibliotheque" className="shell scroll-mt-24 pt-24 md:pt-32">
        <Library groups={groups} tab={tab} setTab={setTab} onOpen={(items, index) => setLightbox({ items, index })} />
      </div>

      <AnimatePresence>
        {openCase && (
          <CaseModal
            key="case"
            c={openCase}
            onClose={() => setOpenCase(null)}
            onMedia={(items, index) => setLightbox({ items, index })}
            suspended={!!lightbox}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {lightbox && <Lightbox key="lb" {...lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </section>
  );
}

/* ---------- Études de cas : défilement horizontal épinglé (desktop) ---------- */
function useMedia(query: string) {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const f = () => setOk(mq.matches);
    f();
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, [query]);
  return ok;
}

function CaseRail({ onOpen }: { onOpen: (c: CaseStudy) => void }) {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const desktop = useMedia("(min-width: 1024px)");
  const total = caseStudies.length;
  const cards = caseStudies.map((c, i) => (
    <li key={c.id} className="h-[460px] w-[82vw] shrink-0 snap-start sm:w-[420px] lg:h-[66vh] lg:w-[min(560px,42vw)]">
      <CaseCard c={c} n={i + 1} total={total} onOpen={() => onOpen(c)} />
    </li>
  ));
  if (desktop && !reduce) return <PinnedRail total={total}>{cards}</PinnedRail>;
  return (
    <div className="shell">
      <h3 className="mono mb-5 text-xs text-muted">{t(ui.caseStudies)} — {pad(total)}</h3>
      <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] md:-mx-8 md:px-8">{cards}</ul>
    </div>
  );
}

/** Monté seulement sur desktop : la hauteur du bloc = la distance horizontale à parcourir. */
function PinnedRail({ total, children }: { total: number; children: React.ReactNode }) {
  const { t } = useLang();
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [dist, setDist] = useState(0);
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => setDist(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, []);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (v) => -v * dist);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <div ref={wrap} className="relative" style={{ height: `calc(100vh + ${dist}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.ul ref={track} style={{ x }} className="flex h-[66vh] w-max gap-6 pl-[max(32px,calc((100vw-1280px)/2))] pr-[8vw]">
          <li className="flex w-[300px] shrink-0 flex-col justify-between rounded-2xl border border-line p-6">
            <p className="mono text-[11px] text-muted">{t(ui.caseStudies)}</p>
            <p className="display text-8xl text-accent">{pad(total)}</p>
            <p className="mono flex items-center gap-2 text-[11px] text-muted">{t(ui.scrollHint)} <ArrowRight size={14} /></p>
          </li>
          {children}
        </motion.ul>
        <div className="shell mt-8 flex items-center gap-6">
          <span className="mono text-[11px] text-muted">{t(ui.caseStudies)}</span>
          <span className="relative h-px flex-1 bg-line"><motion.span className="absolute inset-y-0 left-0 bg-accent" style={{ width: bar }} /></span>
          <span className="mono text-[11px] text-muted">{pad(total)}</span>
        </div>
      </div>
    </div>
  );
}

function CaseCard({ c, n, total, onOpen }: { c: CaseStudy; n: number; total: number; onOpen: () => void }) {
  const { t } = useLang();
  const cover = c.cover ? byId[c.cover] : undefined;
  const img = cover ? (cover.kind === "video" ? cover.poster! : cover.src) : undefined;
  return (
    <button
      type="button"
      onClick={onOpen}
      data-cursor={t(ui.cursorView)}
      className="group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-line bg-bg-soft p-5 text-left transition-colors hover:border-accent md:p-6"
    >
      {img ? (
        <>
          <Image src={img} alt={t(cover!.alt)} fill sizes="(max-width: 1024px) 85vw, 560px" className={`object-cover opacity-70 transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-90 ${cover!.domain === "web" ? "object-top" : ""}`} />
          <span className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" aria-hidden />
        </>
      ) : (
        <span className="todo-box absolute inset-0" aria-hidden />
      )}
      <span className="relative flex items-start justify-between gap-4">
        <span className="mono rounded-full bg-bg/80 px-2.5 py-1 text-[11px] text-muted backdrop-blur"><span className="text-accent">{pad(n)}</span> / {pad(total)}</span>
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-bg/60 transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-bg">
          <ArrowUpRight size={16} />
        </span>
      </span>
      <span className="relative block">
        {!img && <span className="mono mb-3 block text-[10px] text-muted">{t(ui.noVisual)}</span>}
        <span className="mono block text-[11px] text-accent">{t(c.kind)}</span>
        <span className="mt-2 block font-serif text-4xl leading-none md:text-5xl">{brands[c.brand]}</span>
        {c.domains.length > 0 && (
          <span className="mt-3 flex flex-wrap gap-1.5">
            {c.domains.map((d) => (
              <span key={d} className="mono rounded-full border border-line bg-bg/60 px-2 py-0.5 text-[9px] text-muted">
                {t(domains.find((x) => x.id === d)!.label)}
              </span>
            ))}
          </span>
        )}
        {c.mediaIds.length > 0 && <span className="mono mt-3 block text-[10px] text-muted">{pad(c.mediaIds.length)} {t(ui.items)}</span>}
      </span>
    </button>
  );
}

/* ---------- Showreel : la vidéo grandit jusqu'au plein écran au scroll ---------- */
function Showreel({ item, onPlay, onSeeAll }: { item: MediaItem; onPlay: () => void; onSeeAll: () => void }) {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const vref = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 0.65], [0.34, 1]);
  const radius = useTransform(scrollYProgress, [0, 0.65], [28, 0]);
  const wordScale = useTransform(scrollYProgress, [0, 0.65], [1, 1.35]);
  const wordOpacity = useTransform(scrollYProgress, [0.3, 0.6], [1, 0]);
  const captionOpacity = useTransform(scrollYProgress, [0.68, 0.85], [0, 1]);
  const captionY = useTransform(scrollYProgress, [0.68, 0.85], [30, 0]);

  useEffect(() => {
    const v = vref.current;
    if (!v || reduce) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.15 });
    io.observe(v);
    return () => io.disconnect();
  }, [reduce]);

  const caption = (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="mono text-[11px] text-accent">{t(ui.showreelKicker)} · {brands[item.brand]}</p>
        <p className="mt-2 max-w-xl font-serif text-3xl md:text-5xl">{t(item.title)}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={onPlay} className={btnPrimaryCls}><Play size={14} fill="currentColor" /> {t(ui.cursorPlay)}</button>
        <button type="button" onClick={onSeeAll} className={btnGhostCls}>{t(formats[1].label)} <ArrowRight size={14} /></button>
      </div>
    </div>
  );

  if (reduce) {
    return (
      <div className="shell pt-24">
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-line">
          <video src={item.src} poster={item.poster} controls playsInline preload="none" className="h-full w-full object-cover" aria-label={t(item.alt)} />
        </div>
        <div className="mt-6">{caption}</div>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative mt-16 h-[260vh]">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <motion.span aria-hidden style={{ scale: wordScale, opacity: wordOpacity }} className="display text-outline pointer-events-none absolute whitespace-nowrap text-[19vw] leading-none">
          {t(ui.showreelWord)}
        </motion.span>
        <motion.button
          type="button"
          onClick={onPlay}
          data-cursor={t(ui.cursorPlay)}
          style={{ scale, borderRadius: radius }}
          className="relative h-full w-full overflow-hidden bg-bg-soft"
        >
          <span className="sr-only">{t(ui.cursorPlay)} : {t(item.title)}</span>
          <video ref={vref} src={item.src} poster={item.poster} muted loop playsInline preload="none" className="h-full w-full object-cover" aria-hidden />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-bg/30" />
          <span aria-hidden className="mono absolute left-5 top-5 flex items-center gap-2 text-[11px] text-text"><span className="h-2 w-2 animate-pulse rounded-full bg-red-500" /> REC</span>
          {(["left-4 top-4 border-l border-t", "right-4 top-4 border-r border-t", "bottom-4 left-4 border-b border-l", "bottom-4 right-4 border-b border-r"] as const).map((c) => (
            <span key={c} aria-hidden className={`absolute h-8 w-8 border-accent ${c}`} />
          ))}
        </motion.button>
        <motion.div style={{ opacity: captionOpacity, y: captionY }} className="shell absolute inset-x-0 bottom-10">
          {caption}
        </motion.div>
      </div>
    </div>
  );
}

/* ---------- Bibliothèque : tout classé par format ---------- */
function Library({ groups, tab, setTab, onOpen }: { groups: Record<Format, MediaItem[]>; tab: Format; setTab: (f: Format) => void; onOpen: (items: MediaItem[], i: number) => void }) {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const tabsRef = useRef<HTMLDivElement>(null);
  const items = groups[tab];
  const current = formats.find((f) => f.id === tab)!;

  const onKey = (e: React.KeyboardEvent) => {
    const i = formats.findIndex((f) => f.id === tab);
    let n = -1;
    if (e.key === "ArrowRight") n = (i + 1) % formats.length;
    if (e.key === "ArrowLeft") n = (i - 1 + formats.length) % formats.length;
    if (n < 0) return;
    e.preventDefault();
    setTab(formats[n].id);
    tabsRef.current?.querySelectorAll<HTMLButtonElement>("[role=tab]")[n]?.focus();
  };

  return (
    <div>
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <h3 className="mono text-xs text-muted">{t(ui.gallery)}</h3>
        <p className="mono text-xs text-muted"><span className="text-accent">{pad(media.length)}</span> {t(ui.items)}</p>
      </div>
      <div ref={tabsRef} role="tablist" aria-label={t(ui.gallery)} onKeyDown={onKey} className="sticky top-16 z-20 -mx-4 mb-10 flex gap-2 overflow-x-auto border-y border-line bg-bg/90 px-4 py-3 backdrop-blur [scrollbar-width:none] md:mx-0 md:rounded-full md:border md:px-2 md:py-2">
        {formats.map((f) => (
          <button
            key={f.id}
            id={`tab-${f.id}`}
            role="tab"
            type="button"
            aria-selected={tab === f.id}
            aria-controls="panel-format"
            tabIndex={tab === f.id ? 0 : -1}
            onClick={() => setTab(f.id)}
            className={`relative min-h-11 shrink-0 rounded-full px-4 text-sm transition-colors ${tab === f.id ? "text-bg" : "text-muted hover:text-text"}`}
          >
            {tab === f.id && <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
            <span className="relative">{t(f.label)} <span className="mono ml-1 text-[10px]">{pad(groups[f.id].length)}</span></span>
          </button>
        ))}
      </div>

      <div id="panel-format" role="tabpanel" aria-labelledby={`tab-${tab}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-8 max-w-xl text-muted">{t(current.text)}</p>
            {items.length === 0 ? (
              <p className="todo-box rounded-2xl border border-dashed border-line p-10 text-center text-muted">{t(ui.noItems)}</p>
            ) : tab === "posters" ? (
              <ul className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
                {items.map((m, i) => (
                  <li key={m.id} className="mb-3 break-inside-avoid md:mb-4">
                    <Tile m={m} onClick={() => onOpen(items, i)}>
                      <Image src={m.src} alt={t(m.alt)} width={m.width} height={m.height} sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.04]" />
                    </Tile>
                  </li>
                ))}
              </ul>
            ) : tab === "sites" ? (
              <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.map((m, i) => (
                  <li key={m.id}><SiteTile m={m} onClick={() => onOpen(items, i)} /></li>
                ))}
              </ul>
            ) : (
              <ul className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
                {items.map((m, i) => (
                  <li key={m.id} className="mb-3 break-inside-avoid md:mb-4">
                    <VideoTile m={m} onClick={() => onOpen(items, i)} />
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Tile({ m, onClick, children }: { m: MediaItem; onClick: () => void; children: React.ReactNode }) {
  const { t } = useLang();
  return (
    <button type="button" onClick={onClick} data-cursor={t(m.kind === "video" ? ui.cursorPlay : ui.cursorView)} className="group relative block w-full overflow-hidden rounded-xl border border-line bg-bg-soft text-left">
      {children}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/95 to-transparent p-3 pt-10 transition-opacity md:opacity-0 md:group-hover:opacity-100">
        <span className="mono block text-[10px] text-accent">{brands[m.brand]}</span>
        <span className="mt-1 block text-xs leading-snug">{t(m.title)}</span>
      </span>
    </button>
  );
}

/** Vignette vidéo : affiche, aperçu muet au survol (souris), lecture complète au clic. */
function VideoTile({ m, onClick }: { m: MediaItem; onClick: () => void }) {
  const { t } = useLang();
  const v = useRef<HTMLVideoElement>(null);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    const el = v.current;
    if (!el) return;
    if (hover) el.play().catch(() => {});
    else { el.pause(); el.currentTime = 0; }
  }, [hover]);
  return (
    <button
      type="button"
      onClick={onClick}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={() => setHover(false)}
      data-cursor={t(ui.cursorPlay)}
      className={`group relative block w-full overflow-hidden rounded-xl border border-line bg-bg-soft text-left ${m.width > m.height ? "aspect-video" : "aspect-[9/16]"}`}
    >
      <Image src={m.poster!} alt={t(m.alt)} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
      {hover && <video ref={v} src={m.src} muted loop playsInline preload="auto" className="absolute inset-0 h-full w-full object-cover" aria-hidden />}
      <span className="mono absolute right-2 top-2 flex items-center gap-1 rounded-full bg-bg/80 px-2 py-1 text-[10px] backdrop-blur">
        <Play size={10} fill="currentColor" /> {t(ui.video)}
      </span>
      <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/95 via-bg/50 to-transparent p-3 pt-12">
        <span className="mono block text-[10px] text-accent">{brands[m.brand]}</span>
        <span className="mt-1 block text-xs leading-snug md:text-sm">{t(m.title)}</span>
      </span>
    </button>
  );
}

/** Vignette site : cadre de navigateur (ou de téléphone pour une app mobile). */
function SiteTile({ m, onClick }: { m: MediaItem; onClick: () => void }) {
  const { t } = useLang();
  const phone = m.height > m.width;
  const host = m.href ? new URL(m.href).host : "";
  return (
    <div className="group">
      <button type="button" onClick={onClick} data-cursor={t(ui.cursorView)} className="block w-full overflow-hidden rounded-xl border border-line bg-bg-soft text-left transition-colors hover:border-accent">
        <span className="flex items-center gap-1.5 border-b border-line px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-line" /><span className="h-2 w-2 rounded-full bg-line" /><span className="h-2 w-2 rounded-full bg-line" />
          <span className="mono ml-2 truncate text-[10px] text-muted">{host}</span>
        </span>
        <span className={`relative block overflow-hidden ${phone ? "aspect-[16/10] bg-bg" : "aspect-[16/10]"}`}>
          {phone ? (
            <span className="absolute inset-y-4 left-1/2 w-[34%] -translate-x-1/2 overflow-hidden rounded-[18px] border-4 border-bg-soft shadow-2xl">
              <Image src={m.src} alt={t(m.alt)} fill sizes="200px" className="object-cover object-top" />
            </span>
          ) : (
            <Image src={m.src} alt={t(m.alt)} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
          )}
        </span>
      </button>
      <div className="mt-3 flex items-start justify-between gap-4">
        <div>
          <p className="mono text-[10px] text-accent">{brands[m.brand]}</p>
          <p className="mt-1 text-sm">{t(m.title)}</p>
        </div>
        {m.href && (
          <a href={m.href} target="_blank" rel="noreferrer" className="mono inline-flex shrink-0 items-center gap-1 text-[11px] text-muted hover:text-accent">
            {t(ui.visitSite)} <ArrowUpRight size={12} />
          </a>
        )}
      </div>
    </div>
  );
}

function CaseModal({ c, onClose, onMedia, suspended }: { c: CaseStudy; onClose: () => void; onMedia: (items: MediaItem[], i: number) => void; suspended: boolean }) {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const items = c.mediaIds.map((id) => byId[id]);
  const ref = useModal(!suspended, onClose);
  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-title"
      className="fixed inset-0 z-[70] overflow-y-auto bg-bg/90 backdrop-blur-md"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? undefined : { opacity: 0 }}
      onClick={onClose}
      data-lenis-prevent
    >
      <motion.div
        className="mx-auto my-4 w-[calc(100%-24px)] max-w-5xl rounded-2xl border border-line bg-bg-soft p-5 md:my-12 md:p-10"
        initial={reduce ? false : { y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={reduce ? undefined : { y: 20, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="mono text-[11px] text-accent">{t(c.kind)}</p>
            <h3 id="case-title" className="display mt-3 text-[clamp(2.5rem,7vw,5rem)]">{brands[c.brand]}</h3>
          </div>
          <button data-autofocus type="button" onClick={onClose} aria-label={t(ui.close)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line hover:border-accent hover:text-accent">
            <X size={18} />
          </button>
        </div>
        <p className="mt-6 max-w-2xl text-lg text-muted">{t(c.summary)}</p>
        {c.link && (
          <a href={c.link} target="_blank" rel="noreferrer" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-bg">
            {t(ui.visitSite)} <ArrowUpRight size={16} />
          </a>
        )}
        <dl className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
          {[
            [t(ui.role), t(c.role)],
            [t(ui.toolsLabel), c.tools.length ? c.tools.join(" · ") : "[À COMPLÉTER]"],
            [t(ui.result), t(c.result)],
          ].map(([k, val]) => (
            <div key={k} className="bg-bg p-5">
              <dt className="mono text-[10px] text-muted">{k}</dt>
              <dd className="mt-3 text-sm leading-relaxed">{val}</dd>
            </div>
          ))}
        </dl>
        {items.length > 0 ? (
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {items.map((m, i) => (
              <li key={m.id}>
                <button type="button" onClick={() => onMedia(items, i)} className="group relative block aspect-square w-full overflow-hidden rounded-lg border border-line" aria-label={t(m.title)}>
                  <Image src={m.kind === "video" ? m.poster! : m.src} alt={t(m.alt)} fill sizes="(max-width: 768px) 50vw, 240px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  {m.kind === "video" && <Play size={18} fill="currentColor" className="absolute right-2 top-2" aria-hidden />}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="todo-box mt-10 flex aspect-[16/7] items-center justify-center rounded-xl border border-dashed border-line">
            <span className="mono text-xs text-muted">{t(ui.noVisual)}</span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function Lightbox({ items, index, onClose }: { items: MediaItem[]; index: number; onClose: () => void }) {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [i, setI] = useState(index);
  const go = useCallback((d: number) => setI((x) => (x + d + items.length) % items.length), [items.length]);
  const keys = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  }, [go]);
  const ref = useModal(true, onClose, keys);
  const m = items[i];
  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={t(m.title)}
      className="fixed inset-0 z-[80] flex flex-col bg-bg/95 backdrop-blur-md"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? undefined : { opacity: 0 }}
      data-lenis-prevent
    >
      <div className="shell flex h-16 shrink-0 items-center justify-between gap-4">
        <p className="mono truncate text-[11px] text-muted"><span className="text-accent">{pad(i + 1)}</span> / {pad(items.length)} — {brands[m.brand]}</p>
        <button data-autofocus type="button" onClick={onClose} aria-label={t(ui.close)} className="flex h-11 w-11 items-center justify-center rounded-full border border-line hover:border-accent hover:text-accent">
          <X size={18} />
        </button>
      </div>
      <div className="relative min-h-0 flex-1 px-3 md:px-20" onClick={onClose}>
        <div className="relative h-full w-full" onClick={(e) => e.stopPropagation()}>
          {m.kind === "video" ? (
            <video key={m.id} src={m.src} poster={m.poster} controls autoPlay playsInline preload="metadata" className="mx-auto h-full max-h-full w-auto max-w-full rounded-lg object-contain" aria-label={t(m.alt)} />
          ) : (
            <Image key={m.id} src={m.src} alt={t(m.alt)} fill sizes="100vw" className="object-contain" />
          )}
        </div>
        {items.length > 1 && (
          <>
            <button type="button" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label={t(ui.prev)} className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-bg/70 hover:border-accent hover:text-accent md:left-6">
              <ArrowLeft size={18} />
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label={t(ui.next)} className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-bg/70 hover:border-accent hover:text-accent md:right-6">
              <ArrowRight size={18} />
            </button>
          </>
        )}
      </div>
      <div className="shell shrink-0 py-4 md:py-6">
        <p className="font-serif text-2xl md:text-3xl">{t(m.title)}</p>
        <p className="mt-1 text-sm text-muted">{t(m.description)}</p>
        {m.href && (
          <a href={m.href} target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-bg">
            {t(ui.visitSite)} <ArrowUpRight size={16} />
          </a>
        )}
      </div>
    </motion.div>
  );
}
