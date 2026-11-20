"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play, X } from "lucide-react";
import { useLang } from "./providers";
import { Reveal, SectionHead } from "./ui";
import { brands, caseStudies, domains, media, ui, type CaseStudy, type Domain, type MediaItem } from "@/data/content";

type Filter = "all" | Domain;
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
  const [filter, setFilter] = useState<Filter>("all");
  const [openCase, setOpenCase] = useState<CaseStudy | null>(null);
  const [lightbox, setLightbox] = useState<{ items: MediaItem[]; index: number } | null>(null);

  const cases = useMemo(() => (filter === "all" ? caseStudies : caseStudies.filter((c) => c.domains.includes(filter))), [filter]);
  const gallery = useMemo(() => (filter === "all" ? media : media.filter((m) => m.domain === filter)), [filter]);
  const count = (f: Filter) => (f === "all" ? media.length : media.filter((m) => m.domain === f).length);

  const filters: { id: Filter; label: string }[] = [{ id: "all", label: t(ui.all) }, ...domains.map((d) => ({ id: d.id, label: t(d.label) }))];

  // Disposition bento : les études documentées occupent plus de place.
  const bigSpans = ["lg:col-span-4 lg:row-span-2", "lg:col-span-2 lg:row-span-2", "lg:col-span-6", "lg:col-span-3", "lg:col-span-3"];
  const todoCount = cases.filter((c) => c.todo).length;
  // Remplit toujours la dernière rangée (grille de 6 colonnes).
  const fullRows = Math.floor(todoCount / 3) * 3;
  const rest = todoCount - fullRows;
  const todoSpanAt = (k: number) => (k < fullRows ? "lg:col-span-2" : rest === 1 ? "lg:col-span-6" : "lg:col-span-3");
  let todoIdx = 0;
  let big = 0;

  return (
    <section id="projets" className="scroll-mt-20 py-24 md:py-36">
      <div className="shell">
        <SectionHead index="03" label={t(ui.sections.projects)} title={t(ui.projectsTitle)} />

        <div role="group" aria-label="Filtrer par domaine" className="-mx-4 mb-12 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`min-h-11 shrink-0 rounded-full border px-4 text-sm transition-colors ${filter === f.id ? "border-accent bg-accent text-bg" : "border-line text-muted hover:border-text hover:text-text"}`}
            >
              {f.label} <span className="mono ml-1 text-[10px]">{pad(count(f.id))}</span>
            </button>
          ))}
        </div>

        <h3 className="mono mb-5 text-xs text-muted">{t(ui.caseStudies)}</h3>
        <ul className="grid auto-rows-[minmax(260px,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {cases.map((c, i) => {
            const span = c.todo ? todoSpanAt(todoIdx++) : bigSpans[big++ % bigSpans.length];
            return (
              <Reveal as="li" key={c.id} delay={(i % 3) * 0.06} className={`${span} ${!c.todo && big === 3 ? "sm:col-span-2" : ""}`}>
                <CaseCard c={c} n={i + 1} total={cases.length} onOpen={() => setOpenCase(c)} />
              </Reveal>
            );
          })}
        </ul>

        <div className="mb-5 mt-20 flex items-baseline justify-between gap-4">
          <h3 className="mono text-xs text-muted">{t(ui.gallery)}</h3>
          <p className="mono text-xs text-muted"><span className="text-accent">{pad(gallery.length)}</span> {t(ui.items)}</p>
        </div>
        {gallery.length === 0 ? (
          <p className="todo-box rounded-2xl border border-dashed border-line p-10 text-center text-muted">{t(ui.noItems)}</p>
        ) : (
          <ul className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
            {gallery.map((m, i) => (
              <li key={m.id} className="mb-3 break-inside-avoid md:mb-4">
                <button
                  type="button"
                  onClick={() => setLightbox({ items: gallery, index: i })}
                  className="group relative block w-full overflow-hidden rounded-xl border border-line bg-bg-soft text-left"
                >
                  <Image
                    src={m.kind === "video" ? m.poster! : m.src}
                    alt={t(m.alt)}
                    width={m.width}
                    height={m.height}
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  {m.kind === "video" && (
                    <span className="mono absolute right-2 top-2 flex items-center gap-1 rounded-full bg-bg/80 px-2 py-1 text-[10px] backdrop-blur">
                      <Play size={10} fill="currentColor" /> {t(ui.video)}
                    </span>
                  )}
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/95 to-transparent p-3 pt-10 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
                    <span className="mono block text-[10px] text-accent">{brands[m.brand]}</span>
                    <span className="mt-1 block text-xs leading-snug">{t(m.title)}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
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

function CaseCard({ c, n, total, onOpen }: { c: CaseStudy; n: number; total: number; onOpen: () => void }) {
  const { t } = useLang();
  const cover = c.cover ? byId[c.cover] : undefined;
  const img = cover ? (cover.kind === "video" ? cover.poster! : cover.src) : undefined;
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative flex h-full min-h-[260px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-line bg-bg-soft p-5 text-left transition-colors hover:border-accent md:p-6"
      aria-label={`${t(ui.open)} : ${brands[c.brand]}`}
    >
      {img ? (
        <>
          <Image src={img} alt={t(cover!.alt)} fill sizes="(max-width: 1024px) 100vw, 66vw" className={`object-cover opacity-60 transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-80 ${cover!.domain === "web" ? "object-top" : ""}`} />
          <span className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-bg/10" aria-hidden />
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
      <span className="relative mt-16 block">
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
