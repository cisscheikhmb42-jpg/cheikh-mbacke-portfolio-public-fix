"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download, Linkedin, Mail, Menu, X } from "lucide-react";
import { useLang } from "./providers";
import { Magnetic, Reveal, SectionHead, WhatsAppIcon, btnGhost, btnPrimary } from "./ui";
import { CountUp, CrossMarquee, Preloader, ScrollWords, SplitText } from "./motion";
import { logoPaths } from "./logo-paths";
import {
  about, contact, credentials, experience, hero, media, method, nav, profile, services,
  toolGroups, ui, waLink,
} from "@/data/content";

/* ---------------- Header ---------------- */
export function Header() {
  const { t, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled || open ? "border-b border-line bg-bg/85 backdrop-blur-md" : ""}`}>
      <a href="#contenu" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-bg">{t(ui.skip)}</a>
      <div className="shell flex h-16 items-center justify-between gap-4">
        <a href="#top" className="font-serif text-2xl" aria-label={`${profile.initials}. — ${profile.name}`}>
          {profile.initials}<span className="text-accent">.</span>
        </a>
        <nav aria-label="Navigation principale" className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="text-sm text-muted transition-colors hover:text-text">{t(n.label)}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LangSwitch lang={lang} setLang={setLang} />
          <a href={waLink()} target="_blank" rel="noreferrer" className="hidden min-h-10 items-center gap-2 rounded-full bg-accent px-4 text-sm font-semibold text-bg sm:inline-flex">
            <WhatsAppIcon size={16} /> WhatsApp
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={t(ui.menu)}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Navigation mobile" className="shell flex flex-col pb-6 lg:hidden">
          {nav.map((n, i) => (
            <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} className="flex items-baseline gap-4 border-b border-line py-4 font-serif text-3xl">
              <span className="mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>{t(n.label)}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function LangSwitch({ lang, setLang }: { lang: string; setLang: (l: "fr" | "en") => void }) {
  return (
    <div role="group" aria-label="Langue / Language" className="mono flex rounded-full border border-line p-1 text-[11px]">
      {(["fr", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`min-h-8 min-w-9 rounded-full px-2 transition-colors ${lang === l ? "bg-text text-bg" : "text-muted hover:text-text"}`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

/* ---------------- 00. Hero ---------------- */
export function Hero() {
  const { t, lang } = useLang();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const words = lang === "fr" ? hero.marquee : hero.marqueeEn;
  return (
    <>
      <Preloader label={`${profile.name} — Portfolio`} />
      <section ref={ref} id="top" aria-labelledby="hero-title" className="relative overflow-hidden pt-24 md:pt-32">
        <span aria-hidden className="display text-outline pointer-events-none absolute -right-[4vw] top-10 hidden select-none whitespace-nowrap text-[22vw] leading-none opacity-60 md:block">
          CMC
        </span>
        <div className="shell relative grid items-end gap-10 pb-12 md:grid-cols-12 md:pb-20">
          <div className="md:col-span-7 lg:col-span-8">
            <p className="mono mb-6 flex items-center gap-3 text-xs text-muted">
              <span className="text-accent">00</span>
              <span className="h-px w-8 bg-line" />
              {t(hero.kicker)}
            </p>
            <SplitText as="h1" id="hero-title" waitIntro text={t(hero.title)} className="display text-[clamp(3.25rem,9.5vw,9rem)]" />
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg">{t(hero.subtitle)}</p>
            </Reveal>
            <Reveal delay={0.2} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Magnetic><a href="#projets" className={btnPrimary}>{t(hero.ctaProjects)} <ArrowDown size={16} /></a></Magnetic>
              <Magnetic><a href={waLink("Bonjour Cheikh, j'ai vu votre portfolio.")} target="_blank" rel="noreferrer" className={btnGhost}><WhatsAppIcon size={16} /> {t(hero.ctaWhatsapp)}</a></Magnetic>
            </Reveal>
          </div>
          <div className="md:col-span-5 lg:col-span-4">
            <figure className="relative mx-auto aspect-[4/5] w-full max-w-[340px] overflow-hidden rounded-[22px] border border-line bg-bg-soft md:ml-auto">
              <motion.div className="absolute inset-0" style={reduce ? undefined : { y: imgY, scale: imgScale }}>
                <Image src={profile.photo} alt={t(hero.portraitAlt)} fill priority quality={70} sizes="(max-width: 768px) 80vw, 340px" className="object-cover object-top" />
              </motion.div>
              <span aria-hidden className="absolute left-3 top-3 h-5 w-5 border-l border-t border-accent" />
              <span aria-hidden className="absolute right-3 top-3 h-5 w-5 border-r border-t border-accent" />
              <span aria-hidden className="absolute bottom-3 left-3 h-5 w-5 border-b border-l border-accent" />
              <span aria-hidden className="absolute bottom-3 right-3 h-5 w-5 border-b border-r border-accent" />
              <figcaption className="mono absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/90 to-transparent p-5 pt-12 text-[10px] text-text">
                <span className="text-accent">●</span> {profile.name}<br />
                <span className="text-muted">{t(profile.role)} · {t(profile.location)}</span>
              </figcaption>
            </figure>
          </div>
        </div>
        <p className="sr-only">{words.join(", ")}</p>
        <CrossMarquee words={words} />
      </section>
    </>
  );
}

/* ---------------- 01. À propos ---------------- */
export function About() {
  const { t } = useLang();
  const stats = [...about.stats.map((s) => ({ value: Number(s.value), label: t(s.label) })), { value: media.length, label: t(about.projectsLabel) }];
  return (
    <section id="a-propos" className="shell scroll-mt-20 py-24 md:py-36">
      <SectionHead index="01" label={t(ui.sections.about)} title={t(about.title)} />
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-3">
          <p className="mono text-[11px] text-muted">{profile.name}</p>
          <p className="mono mt-1 text-[11px] text-accent">{t(profile.role)}</p>
          <a href={profile.cv} download className="mt-6 inline-flex items-center gap-2 text-sm text-muted underline-offset-4 hover:text-accent hover:underline">
            <Download size={15} /> {t(ui.downloadCv)} (PDF)
          </a>
        </div>
        <div className="md:col-span-9">
          <ScrollWords text={t(about.statement)} className="font-serif text-[clamp(1.9rem,4.2vw,3.6rem)] leading-[1.08]" />
          <ol className="mt-16 divide-y divide-line border-y border-line">
            {about.lines.map((l, i) => (
              <Reveal as="li" key={i} delay={i * 0.05} className="grid grid-cols-[2.5rem_1fr] gap-3 py-4 text-base leading-snug text-muted md:text-lg">
                <span className="mono pt-1 text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span>{t(l)}</span>
              </Reveal>
            ))}
          </ol>
          <dl className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {stats.map((s, i) => (
              <Reveal key={i} delay={i * 0.08} className="bg-bg p-6 md:p-8">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="display block text-7xl text-accent md:text-8xl"><CountUp value={s.value} /></span>
                  <span className="mt-4 block text-sm leading-relaxed text-muted">{s.label}</span>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 02. Services ---------------- */
export function Services() {
  const { t } = useLang();
  return (
    <section id="services" className="scroll-mt-20 bg-bg-soft py-24 md:py-36">
      <div className="shell">
        <SectionHead index="02" label={t(ui.sections.services)} title={t(ui.servicesTitle)} />
        <ul className="border-t border-line">
          {services.map((s, i) => (
            <Reveal as="li" key={i} className="group grid gap-4 border-b border-line py-8 md:grid-cols-12 md:items-center">
              <span className="mono text-xs text-muted transition-colors group-hover:text-accent md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-serif text-4xl md:col-span-4 md:text-5xl">{t(s.title)}</h3>
              <p className="max-w-md text-muted md:col-span-4">{t(s.text)}</p>
              <div className="md:col-span-3 md:text-right">
                <a href={waLink(s.message)} target="_blank" rel="noreferrer" className={btnGhost}>
                  {t(s.cta)} <ArrowUpRight size={16} />
                </a>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- 04. Méthode (épinglée) ---------------- */
export function Method() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  useEffect(() => scrollYProgress.on("change", (v) => setActive(Math.min(method.length - 1, Math.floor(v * method.length)))), [scrollYProgress]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const head = <SectionHead index="04" label={t(ui.sections.method)} title={t(ui.methodTitle)} />;
  if (reduce) {
    return (
      <section id="methode" className="shell scroll-mt-20 py-24 md:py-36">
        {head}
        <ol className="grid gap-6 md:grid-cols-4">
          {method.map((m, i) => (
            <li key={i} className="border-t border-line pt-5">
              <span className="mono text-xs text-accent">{String(i + 1).padStart(2, "0")} / 04</span>
              <h3 className="mt-3 font-serif text-4xl">{t(m.title)}</h3>
              <p className="mt-2 text-sm text-muted">{t(m.text)}</p>
            </li>
          ))}
        </ol>
      </section>
    );
  }
  return (
    <section id="methode" className="scroll-mt-20 pt-24 md:pt-36">
      <div className="shell">{head}</div>
      <div ref={ref} style={{ height: `${method.length * 70}vh` }} className="relative">
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
          <div className="shell grid w-full items-center gap-8 md:grid-cols-12">
            <div className="relative h-[34vh] md:col-span-6 md:h-[60vh]">
              {method.map((_, i) => (
                <span
                  key={i}
                  aria-hidden
                  className="display text-outline-accent absolute inset-0 flex items-center text-[clamp(10rem,38vw,30rem)] leading-none transition-all duration-700"
                  style={{ opacity: active === i ? 1 : 0, transform: `translateY(${(i - active) * 18}%)` }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              ))}
            </div>
            <ol className="md:col-span-6">
              {method.map((m, i) => (
                <li key={i} className="border-t border-line py-5">
                  <div className="flex items-baseline gap-4">
                    <span className={`mono text-xs transition-colors duration-500 ${active === i ? "text-accent" : "text-muted"}`}>{String(i + 1).padStart(2, "0")}</span>
                    <h3 className={`font-serif text-4xl transition-colors duration-500 md:text-6xl ${active === i ? "text-text" : "text-muted"}`}>{t(m.title)}</h3>
                  </div>
                  <p className={`ml-9 overflow-hidden text-muted transition-all duration-500 ${active === i ? "mt-2 max-h-24" : "max-h-0"}`}>{t(m.text)}</p>
                </li>
              ))}
              <li aria-hidden className="relative h-px bg-line"><motion.span className="absolute inset-y-0 left-0 bg-accent" style={{ width: bar }} /></li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 05. Outils ---------------- */
export function Tools() {
  const { t } = useLang();
  return (
    <section id="outils" className="scroll-mt-20 bg-bg-soft py-24 md:py-32">
      <div className="shell">
        <SectionHead index="05" label={t(ui.sections.tools)} title={t(ui.toolsTitle)} />
        <div className="space-y-12">
          {toolGroups.map((g, gi) => (
            <div key={g.title.fr} className="grid gap-6 md:grid-cols-12">
              <h3 className="mono pt-2 text-xs text-muted md:col-span-3">
                <span className="text-accent">{String(gi + 1).padStart(2, "0")}</span> — {t(g.title)}
              </h3>
              <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:col-span-9 lg:grid-cols-6">
                {g.tools.map((tool, i) => (
                  <Reveal as="li" key={tool.name} delay={i * 0.04} className="group flex aspect-square flex-col items-center justify-center gap-3 rounded-xl border border-line bg-bg p-3 text-center text-muted transition-colors hover:border-accent hover:text-text">
                    {tool.logo ? (
                      <svg role="img" aria-label={`Logo ${tool.name}`} viewBox="0 0 24 24" className="h-8 w-8 fill-current transition-colors group-hover:fill-accent">
                        <path d={logoPaths[tool.logo]} />
                      </svg>
                    ) : (
                      <span aria-hidden className="font-serif text-3xl italic leading-8 transition-colors group-hover:text-accent">{tool.name}</span>
                    )}
                    <span className="mono text-[10px] leading-tight">{tool.name}</span>
                  </Reveal>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 06. Parcours & certificats ---------------- */
export function Background() {
  const { t } = useLang();
  return (
    <section id="parcours" className="shell scroll-mt-20 py-24 md:py-36">
      <SectionHead index="06" label={t(ui.sections.background)} title={t(ui.backgroundTitle)} />
      <div className="grid gap-16 lg:grid-cols-2">
        <div>
          <h3 className="mono mb-6 text-xs text-muted">{t(ui.experience)}</h3>
          <ol className="border-t border-line">
            {experience.map((e) => (
              <Reveal as="li" key={e.company + t(e.date)} className="grid gap-2 border-b border-line py-6 sm:grid-cols-[11rem_1fr]">
                <span className="mono text-[11px] text-muted">{t(e.date)}</span>
                <span>
                  <span className="block text-lg">{t(e.role)}</span>
                  <span className="mt-1 block text-sm text-muted">{e.company}</span>
                </span>
              </Reveal>
            ))}
          </ol>
        </div>
        <div>
          <h3 className="mono mb-6 text-xs text-muted">{t(ui.diplomas)}</h3>
          <div className="space-y-10">
            {credentials.map((g) => (
              <div key={g.domain.fr}>
                <h4 className="mb-3 font-serif text-3xl">{t(g.domain)}</h4>
                <ul className="border-t border-line">
                  {g.items.map((c) => (
                    <Reveal as="li" key={c.title.fr} className="grid grid-cols-[1fr_auto] gap-4 border-b border-line py-4">
                      <span>
                        <span className="block">{t(c.title)}</span>
                        <span className="mt-1 block text-sm text-muted">{c.org}{c.year !== "—" ? ` · ${c.year}` : ""}</span>
                      </span>
                      <span className={`mono self-start rounded-full border px-2.5 py-1 text-[10px] ${c.type === "diploma" ? "border-accent text-accent" : "border-line text-muted"}`}>
                        {t(c.type === "diploma" ? ui.diploma : ui.certificate)}
                      </span>
                    </Reveal>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 07. Contact ---------------- */
export function Contact() {
  const { t } = useLang();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [msg, setMsg] = useState("");
  const body = () => `${msg}\n\n— ${name}${company ? ` (${company})` : ""}`;
  const sendWa = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(waLink(body()), "_blank", "noopener");
  };
  const mailHref = `mailto:${profile.email}?subject=${encodeURIComponent(`Portfolio — ${name || "Contact"}`)}&body=${encodeURIComponent(body())}`;
  const field = "w-full rounded-xl border border-line bg-bg px-4 py-3 text-text placeholder:text-muted focus:border-accent focus:outline-none";
  const socials = [
    { label: "LinkedIn", href: profile.socials.linkedin, icon: <Linkedin size={16} /> },
    { label: "Instagram", href: profile.socials.instagram },
    { label: "Facebook", href: profile.socials.facebook },
  ];
  return (
    <section id="contact" className="shell scroll-mt-20 py-24 md:py-36">
      <p className="mono mb-8 border-t border-line pt-6 text-xs text-muted"><span className="text-accent">07</span> — {t(ui.sections.contact)}</p>
      <SplitText text={t(contact.title)} className="display text-[clamp(3.5rem,14vw,12rem)]" />
      <p className="mt-6 max-w-xl text-lg text-muted">{t(contact.text)}</p>

      <Reveal className="mt-12">
        <Magnetic strength={0.15} className="w-full">
          <a
            href={waLink("Bonjour Cheikh, j'ai vu votre portfolio et j'aimerais échanger.")}
            target="_blank"
            rel="noreferrer"
            className="group flex w-full items-center justify-between gap-6 rounded-[28px] bg-accent px-6 py-8 text-bg md:px-12 md:py-12"
          >
            <span className="flex items-center gap-4 font-serif text-[clamp(2rem,6vw,5rem)] leading-none">
              <WhatsAppIcon size={44} /> {t(contact.whatsappCta)}
            </span>
            <ArrowUpRight className="shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={44} />
          </a>
        </Magnetic>
      </Reveal>

      <div className="mt-16 grid gap-12 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5">
          <a href={`mailto:${profile.email}`} className="group flex items-center gap-3 break-all text-xl hover:text-accent md:text-2xl">
            <Mail size={20} className="shrink-0" /> {profile.email}
          </a>
          <a href={waLink()} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-xl hover:text-accent md:text-2xl">
            <WhatsAppIcon size={20} /> {profile.phoneDisplay}
          </a>
          <ul className="flex flex-wrap gap-2 pt-4">
            {socials.map((s) =>
              s.href ? (
                <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer" className={btnGhost}>{s.icon}{s.label}</a></li>
              ) : (
                <li key={s.label}><span className={`${btnGhost} cursor-not-allowed border-dashed text-muted`} title="[À COMPLÉTER]">{s.label} [À COMPLÉTER]</span></li>
              ),
            )}
          </ul>
        </div>
        <form onSubmit={sendWa} className="grid gap-4 rounded-2xl border border-line bg-bg-soft p-5 md:p-8 lg:col-span-7">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm text-muted">{t(contact.form.name)}
              <input required value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={field} />
            </label>
            <label className="grid gap-2 text-sm text-muted">{t(contact.form.company)}
              <input value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="organization" className={field} />
            </label>
          </div>
          <label className="grid gap-2 text-sm text-muted">{t(contact.form.message)}
            <textarea required rows={5} value={msg} onChange={(e) => setMsg(e.target.value)} className={field} />
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button type="submit" className={btnPrimary}><WhatsAppIcon size={16} /> {t(contact.form.sendWhatsapp)}</button>
            <a href={mailHref} className={btnGhost}><Mail size={16} /> {t(contact.form.sendEmail)}</a>
          </div>
          <p className="text-xs text-muted">{t(contact.form.note)}</p>
        </form>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
export function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-line">
      <div className="shell mono flex flex-col gap-4 py-8 text-[11px] text-muted md:flex-row md:items-center md:justify-between">
        <span>© 2026 {profile.name}. {t(ui.rights)}</span>
        <span className="flex gap-6">
          <a href="/mentions-legales" className="hover:text-accent">{t(ui.legal)}</a>
          <a href="#top" className="hover:text-accent">{t(ui.backTop)} ↑</a>
        </span>
      </div>
    </footer>
  );
}
