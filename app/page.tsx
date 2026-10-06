"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronRight,
  Download,
  ExternalLink,
  Linkedin,
  Mail,
  Menu,
  Phone,
  Play,
  Sparkles,
  X,
} from "lucide-react";

type Filter = "Tous" | "Social Media" | "Design" | "AI Content" | "Marketing";
type MediaItem = {
  id: string;
  kind: "image" | "video";
  src: string;
  poster?: string;
  title: string;
  category: Exclude<Filter, "Tous">;
  project: string;
  description: string;
};

const filters: Filter[] = ["Tous", "Social Media", "Design", "AI Content", "Marketing"];

const mediaItems: MediaItem[] = [
  {
    id: "arrow-home",
    kind: "image",
    src: "/images/arrow-home/arrow-home.webp",
    title: "Arrow Home Group",
    category: "Marketing",
    project: "Arrow Home Group",
    description: "Communication digitale et création de contenu pour un acteur du BTP, de la construction et de l'immobilier.",
  },
  {
    id: "forza-luxury",
    kind: "image",
    src: "/images/forza/forza-luxury.webp",
    title: "Forza Luxury",
    category: "Design",
    project: "Forza Luxury",
    description: "Direction artistique premium, communication de marque et création de visuels social media.",
  },
  ...Array.from({ length: 8 }, (_, index) => ({
    id: `tornadoes-${String(index + 1).padStart(2, "0")}`,
    kind: "video" as const,
    src: `/videos/tornadoes/tornadoes-${String(index + 1).padStart(2, "0")}.mp4`,
    poster: `/videos/tornadoes/tornadoes-${String(index + 1).padStart(2, "0")}.jpg`,
    title: `Tornadoes Job Afrique — vidéo ${index + 1}`,
    category: "AI Content" as const,
    project: "Tornadoes Job Afrique",
    description: "Vidéo et contenu social media produits dans le cadre de la création de contenu, dont des vidéos réalisées avec l'IA.",
  })),
];

const tools = [
  "Canva",
  "CapCut",
  "Meta Business Suite",
  "Google Ads",
  "Google Analytics",
  "TikTok Studio",
  "WordPress",
  "Shopify",
  "Notion",
  "Airtable",
  "n8n",
  "Make",
  "ChatGPT",
  "Gemini",
  "Claude",
  "Runway",
  "ElevenLabs",
];

const experiences = [
  ["Août 2026 — Aujourd’hui", "Arrow Home Group / Forza Luxury", "Community Manager & Social Media Manager"],
  ["Janvier 2026 — Mai 2026", "Tornadoes Job Afrique", "Community Manager / Créateur de Contenu Digital & Social Media"],
  ["2025 — 2026", "Freelance", "Community Manager"],
  ["Décembre 2021 — Mars 2022", "Prévoyance Assurance Sénégal", "Assistant Assurance & Relation Client"],
  ["Septembre 2021 — Décembre 2021", "Banque de l’Habitat du Sénégal", "Assistant Conseiller Commercial & Accueil"],
] as const;

export default function Home() {
  const [filter, setFilter] = useState<Filter>("Tous");
  const [selected, setSelected] = useState<MediaItem | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const visibleMedia = useMemo(
    () => (filter === "Tous" ? mediaItems : mediaItems.filter((item) => item.category === filter)),
    [filter],
  );

  useEffect(() => {
    if (!selected) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected]);

  return (
    <main className="site-shell">
      <header className="nav-wrap">
        <div className="nav max-shell">
          <a className="logo" href="#top" aria-label="Cheikh Mbacke Cissé — accueil">
            CMC<span>.</span>
          </a>
          <nav className={`desktop-nav ${menuOpen ? "open" : ""}`}>
            <a href="#expertises" onClick={() => setMenuOpen(false)}>Expertises</a>
            <a href="#projets" onClick={() => setMenuOpen(false)}>Projets</a>
            <a href="#experience" onClick={() => setMenuOpen(false)}>Expérience</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          </nav>
          <div className="nav-actions">
            <a className="nav-pill" href="#contact">Disponible</a>
            <button className="menu-toggle" aria-label="Ouvrir le menu" onClick={() => setMenuOpen((v) => !v)}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <section id="top" className="hero max-shell">
        <div className="hero-copy">
          <div className="availability"><span /> AVAILABLE FOR FREELANCE & REMOTE OPPORTUNITIES</div>
          <h1>
            Digital Marketing
            <br />
            <span>& Social Media</span>
            <br />
            Specialist.
          </h1>
          <p className="hero-lede">
            J’aide les marques à développer leur présence digitale grâce au marketing, à la création de contenu et aux outils d’intelligence artificielle.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#projets">Voir mes projets <ArrowUpRight size={17} /></a>
            <a className="btn secondary" href="/cv/CV_Cheikh_Mbacke_Cisse.pdf" download>
              <Download size={16} /> Télécharger mon CV
            </a>
            <a className="btn text-btn" href="#contact">Me contacter</a>
          </div>
          <div className="hero-metrics">
            <div><strong>Master 2</strong><span>Marketing Digital · ISM</span></div>
            <div><strong>5</strong><span>expériences professionnelles</span></div>
            <div><strong>AI</strong><span>création & workflows</span></div>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-gridline grid-a" />
          <div className="hero-gridline grid-b" />
          <div className="orb-shell">
            <div className="orb-ring ring-1" />
            <div className="orb-ring ring-2" />
            <div className="orb-ring ring-3" />
            <div className="orb-core">
              <Sparkles size={22} />
              <b>AI</b>
              <small>CONTENT LAB</small>
            </div>
          </div>
          <div className="floating-card card-left"><small>01</small><b>STRATEGY</b><span>Digital Marketing</span></div>
          <div className="floating-card card-right"><small>02</small><b>CONTENT</b><span>Social + AI</span></div>
        </div>
      </section>

      <div className="signal-strip">
        {['MARKETING DIGITAL', 'SOCIAL MEDIA', 'CREATION DE CONTENU', 'AI CONTENT', 'CREATIVE STRATEGY'].map((label) => <span key={label}>{label}</span>)}
      </div>

      <section className="section max-shell" id="expertises">
        <SectionTitle index="01" title={<>Ce que je peux apporter<br /><span>à une marque.</span></>} text="Un profil transversal pour relier stratégie, création et technologie dans un même workflow." />
        <div className="expertise-grid">
          {[
            ["01", "Marketing Digital", "Stratégie digitale, campagnes, publicité en ligne, acquisition et analyse."],
            ["02", "Social Media", "Community management, stratégie éditoriale, création et planification de contenu."],
            ["03", "Création de contenu", "Création de visuels, vidéos, campagnes publicitaires et contenus social media."],
            ["04", "AI Content Creation", "Utilisation de l’intelligence artificielle pour accélérer la conception de visuels, vidéos, scripts et concepts créatifs."],
          ].map(([number, title, text]) => (
            <article className="expertise-card" key={title}>
              <span className="eyebrow">{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <div className="card-line" />
            </article>
          ))}
        </div>
      </section>

      <section className="project-section" id="projets">
        <div className="max-shell section">
          <SectionTitle index="02" title={<>Des projets pensés<br /><span>pour être vus.</span></>} text="Les images et vidéos ci-dessous proviennent directement des fichiers que tu as fournis. Clique sur un média pour l’ouvrir dans une expérience portfolio premium." />
          <div className="filter-row" role="tablist" aria-label="Filtrer le portfolio">
            {filters.map((item) => (
              <button key={item} className={filter === item ? "filter active" : "filter"} onClick={() => setFilter(item)}>{item}</button>
            ))}
          </div>

          <div className="portfolio-grid">
            {visibleMedia.map((item) => (
              <button className="portfolio-card" key={item.id} onClick={() => setSelected(item)} aria-label={`Ouvrir ${item.title}`}>
                <div className="portfolio-preview">
                  {item.kind === "image" ? (
                    <Image src={item.src} alt={item.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                  ) : (
                    <>
                      <Image src={item.poster!} alt="" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                      <div className="video-badge"><Play size={15} fill="currentColor" /> Vidéo</div>
                    </>
                  )}
                  <span className="preview-overlay"><span>{item.kind === "video" ? "Lire la vidéo" : "Agrandir l’image"}</span><ArrowUpRight size={18} /></span>
                </div>
                <div className="portfolio-meta">
                  <div>
                    <span className="eyebrow">{item.project}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <ChevronRight size={18} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark-section">
        <div className="max-shell ai-lab-grid">
          <div>
            <span className="eyebrow muted">03 — AI CONTENT LAB</span>
            <h2>Créer avec l’IA,<br /><span>sans perdre la créativité.</span></h2>
            <p>AI Video, AI Image, concepts créatifs, marketing assisté par IA et prompt engineering pour accélérer les workflows de contenu.</p>
          </div>
          <div className="ai-list">
            {['AI Video', 'AI Image', 'Creative Concepts', 'AI-assisted Marketing', 'Prompt Engineering'].map((item, i) => (
              <div key={item}><span>0{i + 1}</span><strong>{item}</strong><ArrowUpRight size={18} /></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section max-shell">
        <SectionTitle index="04" title={<>Ma méthode pour<br /><span>passer à l’action.</span></>} text="Une démarche simple pour comprendre, concevoir, produire et améliorer les contenus." />
        <div className="process-grid">
          {[['01', 'Comprendre', 'Comprendre la marque, son audience et ses objectifs.'], ['02', 'Concevoir', 'Développer le concept créatif et la stratégie de contenu.'], ['03', 'Produire', 'Créer les visuels, vidéos et contenus adaptés aux plateformes.'], ['04', 'Optimiser', 'Analyser les performances et améliorer continuellement les contenus.']].map(([num, title, text]) => <article key={num}><span>{num}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="tools-section">
        <div className="max-shell">
          <div className="section-heading-inline"><span className="eyebrow">05 — OUTILS</span><p>Un environnement de travail orienté création, diffusion, mesure et automatisation.</p></div>
          <div className="tool-cloud">{tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
        </div>
      </section>

      <section className="section max-shell" id="experience">
        <SectionTitle index="06" title={<>Un parcours en<br /><span>mouvement.</span></>} text="Expériences professionnelles basées sur le CV fourni." />
        <div className="timeline">
          {experiences.map(([date, company, role]) => <div className="timeline-row" key={`${date}-${company}`}><div className="timeline-date">{date}</div><div><h3>{role}</h3><strong>{company}</strong></div></div>)}
        </div>
      </section>

      <section className="education-section">
        <div className="max-shell education-grid">
          <div><span className="eyebrow">07 — FORMATION & CERTIFICATIONS</span><h2>Une base solide<br /><span>pour le digital.</span></h2></div>
          <div className="education-list">
            <EduItem year="2024" title="Master 2 Marketing Digital" org="Institut Supérieur de Management — ISM" />
            <EduItem year="2021" title="Licence Gestion des Entreprises" org="Institut Supérieur de Management — ISM" />
            <EduItem year="CERTIFICATION" title="Marketing Numérique" org="Google Atelier Numérique" />
            <EduItem year="CERTIFICATION" title="Commerce Digital" org="Force N / Université Virtuelle du Sénégal (UVS)" />
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="max-shell">
          <span className="eyebrow white">08 — CONTACT</span>
          <h2>Un projet ? Une collaboration ?<br /><span>Une opportunité ?</span></h2>
          <p>Je suis disponible pour des missions freelance, des collaborations et des opportunités professionnelles en marketing digital, social media et création de contenu.</p>
          <div className="contact-grid">
            <ContactCard href="mailto:cisscheikhmbacke41@gmail.com" icon={<Mail size={19} />} title="Email" detail="cisscheikhmbacke41@gmail.com" />
            <ContactCard href="https://wa.me/221784558401" icon={<Phone size={19} />} title="WhatsApp" detail="+221 78 455 84 01" />
            <ContactCard href="tel:+221784558401" icon={<Phone size={19} />} title="Téléphone" detail="+221 78 455 84 01" />
            <ContactCard href="https://www.linkedin.com/in/cheikh-mbacke-cisse" external icon={<Linkedin size={19} />} title="LinkedIn" detail="linkedin.com/in/cheikh-mbacke-cisse" />
            <a className="contact-download" href="/cv/CV_Cheikh_Mbacke_Cisse.pdf" download><Download size={19} /><span><strong>Télécharger mon CV</strong><small>PDF · disponible</small></span><ArrowUpRight size={17} /></a>
          </div>
        </div>
      </section>

      <footer className="footer"><div className="max-shell footer-inner"><span>© 2026 Cheikh Mbacke Cissé</span><span>Digital Marketing · Social Media · AI Content</span></div></footer>

      {selected && (
        <div className="media-modal" role="dialog" aria-modal="true" aria-label={selected.title} onClick={() => setSelected(null)}>
          <button className="modal-close" onClick={() => setSelected(null)} aria-label="Fermer"><X /></button>
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header"><div><span className="eyebrow">{selected.project}</span><strong>{selected.title}</strong></div><span>{selected.kind === "video" ? "VIDEO" : "IMAGE"}</span></div>
            {selected.kind === "video" ? (
              <video className="modal-media" src={selected.src} poster={selected.poster} controls autoPlay playsInline preload="metadata" />
            ) : (
              <div className="modal-image-wrap"><Image src={selected.src} alt={selected.title} fill sizes="94vw" className="modal-image" /></div>
            )}
            <p>{selected.description}</p>
          </div>
        </div>
      )}
    </main>
  );
}

function SectionTitle({ index, title, text }: { index: string; title: React.ReactNode; text: string }) {
  return <div className="section-title"><div><span className="eyebrow">{index} —</span><h2>{title}</h2></div><p>{text}</p></div>;
}

function EduItem({ year, title, org }: { year: string; title: string; org: string }) {
  return <div className="edu-item"><span>{year}</span><div><strong>{title}</strong><small>{org}</small></div></div>;
}

function ContactCard({ href, icon, title, detail, external }: { href: string; icon: React.ReactNode; title: string; detail: string; external?: boolean }) {
  return <a className="contact-card" href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>{icon}<span><strong>{title}</strong><small>{detail}</small></span><ExternalLink size={16} /></a>;
}
