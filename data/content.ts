/**
 * ============================================================
 *  CONTENU DU PORTFOLIO — modifiez les textes ici uniquement.
 *  Chaque texte existe en français (fr) et en anglais (en).
 *  « [À COMPLÉTER] » = contenu manquant à fournir.
 * ============================================================
 */

export type Lang = "fr" | "en";
export type T = { fr: string; en: string };
export const TODO: T = { fr: "[À COMPLÉTER]", en: "[TO BE COMPLETED]" };

/* ---------- Identité & contact ---------- */
export const profile = {
  name: "Cheikh Mbacke Cisse",
  initials: "CMC",
  location: { fr: "Dakar, Sénégal", en: "Dakar, Senegal" },
  role: { fr: "Responsable Marketing Digital", en: "Head of Digital Marketing" },
  company: "Arrow Home Group Sénégal",
  photo: "/images/profile-cheikh-800.webp",
  cv: "/cv/CV_Cheikh_Mbacke_Cisse.pdf",
  email: "cisscheikhmbacke41@gmail.com",
  phoneDisplay: "+221 78 455 84 01",
  whatsapp: "221784558401",
  socials: {
    linkedin: "https://www.linkedin.com/in/cheikh-mbacke-cisse",
    instagram: "", // [À COMPLÉTER] — collez l'URL de votre Instagram
    facebook: "", // [À COMPLÉTER] — collez l'URL de votre page Facebook
  },
  siteUrl: "https://cheikh-mbacke-portfolio.vercel.app", // [À COMPLÉTER] si vous avez un domaine
};

export const waLink = (text?: string) =>
  `https://wa.me/${profile.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

/* ---------- Navigation ---------- */
export const nav: { id: string; label: T }[] = [
  { id: "a-propos", label: { fr: "À propos", en: "About" } },
  { id: "services", label: { fr: "Services", en: "Services" } },
  { id: "projets", label: { fr: "Projets", en: "Work" } },
  { id: "methode", label: { fr: "Méthode", en: "Method" } },
  { id: "parcours", label: { fr: "Parcours", en: "Background" } },
  { id: "contact", label: { fr: "Contact", en: "Contact" } },
];

/* ---------- 00. Hero ---------- */
export const hero = {
  kicker: {
    fr: "Marketing digital · IA · Automatisation — Dakar",
    en: "Digital marketing · AI · Automation — Dakar",
  },
  title: { fr: "Je fais croître votre marque avec l'IA.", en: "I grow your brand with AI." },
  subtitle: {
    fr: "J'aide les PME, boutiques en ligne et entreprises du BTP à développer leur présence digitale grâce au marketing, à la création de contenu et aux outils d'intelligence artificielle.",
    en: "I help SMEs, online stores and construction companies grow their digital presence through marketing, content creation and artificial intelligence tools.",
  },
  ctaProjects: { fr: "Voir mes projets", en: "See my work" },
  ctaWhatsapp: { fr: "WhatsApp", en: "WhatsApp" },
  video: {
    src: "/videos/arrow-home-original.mp4",
    poster: "/videos/posters/arrow-home-original.webp",
    caption: { fr: "Vidéo originale — Arrow Home Group", en: "Original video — Arrow Home Group" },
    label: {
      fr: "Vidéo originale réalisée pour Arrow Home Group, diffusée en boucle sans le son",
      en: "Original video made for Arrow Home Group, looping without sound",
    },
  },
  marquee: [
    "Marketing digital",
    "Community management",
    "Création de contenu",
    "Automatisation IA",
    "Sites web",
    "Meta Ads",
    "Social media",
    "BTP & immobilier",
  ],
  marqueeEn: [
    "Digital marketing",
    "Community management",
    "Content creation",
    "AI automation",
    "Websites",
    "Meta Ads",
    "Social media",
    "Construction & real estate",
  ],
};

/* ---------- 01. À propos ---------- */
export const about = {
  title: { fr: "Le marketing, la création et l'IA dans un même workflow.", en: "Marketing, creation and AI in a single workflow." },
  lines: [
    {
      fr: "Diplômé d'un Master en Marketing Digital (ISM Thiès, 2024) et d'une Licence en Gestion des Entreprises.",
      en: "Master's degree in Digital Marketing (ISM Thiès, 2024) and a Bachelor's in Business Management.",
    },
    {
      fr: "Aujourd'hui Responsable Marketing Digital chez Arrow Home Group Sénégal (BTP), et en charge de Forza Luxury.",
      en: "Currently Head of Digital Marketing at Arrow Home Group Senegal (construction), also in charge of Forza Luxury.",
    },
    {
      fr: "Avant : Community Manager et créateur de contenu chez Tornadoes Job Afrique, puis en freelance.",
      en: "Before: Community Manager and content creator at Tornadoes Job Afrique, then freelance.",
    },
    {
      fr: "Je gère les réseaux sociaux, les calendriers éditoriaux, les campagnes et la production de visuels et vidéos.",
      en: "I run social media, editorial calendars, campaigns and the production of visuals and videos.",
    },
    {
      fr: "J'utilise l'IA et l'automatisation pour produire plus vite, mesurer et améliorer en continu.",
      en: "I use AI and automation to produce faster, measure and keep improving.",
    },
  ],
  // Le 3e chiffre (projets réalisés) est calculé automatiquement depuis la galerie ci-dessous.
  stats: [
    { value: "4", label: { fr: "ans d'expérience — marketing digital, community management, social media, création de contenu", en: "years of experience — digital marketing, community management, social media, content creation" } },
    { value: "4", label: { fr: "marques accompagnées — Arrow Home Group, FORZA, MMB Moto Express, Touba Trading", en: "brands supported — Arrow Home Group, FORZA, MMB Moto Express, Touba Trading" } },
  ],
  projectsLabel: { fr: "projets réalisés et visibles dans ce portfolio", en: "projects delivered and shown in this portfolio" },
};

/* ---------- 02. Services ---------- */
export const services: { title: T; text: T; cta: T; message: string }[] = [
  {
    title: { fr: "Marketing digital", en: "Digital marketing" },
    text: { fr: "Stratégie digitale, campagnes publicitaires Meta Ads, acquisition et analyse des performances.", en: "Digital strategy, Meta Ads campaigns, acquisition and performance analysis." },
    cta: { fr: "Demander un devis", en: "Request a quote" },
    message: "Bonjour Cheikh, je souhaite un devis pour une campagne de marketing digital.",
  },
  {
    title: { fr: "Création de contenu", en: "Content creation" },
    text: { fr: "Visuels, flyers, carrousels, Reels et vidéos publicitaires adaptés à chaque plateforme.", en: "Visuals, flyers, carousels, Reels and ad videos tailored to each platform." },
    cta: { fr: "Demander un devis", en: "Request a quote" },
    message: "Bonjour Cheikh, je souhaite un devis pour de la création de contenu.",
  },
  {
    title: { fr: "Community management", en: "Community management" },
    text: { fr: "Calendrier éditorial, publication, animation des communautés et suivi des statistiques.", en: "Editorial calendar, publishing, community engagement and analytics follow-up." },
    cta: { fr: "Audit gratuit de vos pages", en: "Free audit of your pages" },
    message: "Bonjour Cheikh, je souhaite un audit gratuit de mes pages réseaux sociaux.",
  },
  {
    title: { fr: "Automatisation IA", en: "AI automation" },
    text: { fr: "Workflows Make et Claude pour automatiser la production de contenu et les tâches répétitives.", en: "Make and Claude workflows to automate content production and repetitive tasks." },
    cta: { fr: "Discutons-en", en: "Let's talk" },
    message: "Bonjour Cheikh, j'aimerais discuter d'un projet d'automatisation IA.",
  },
  {
    title: { fr: "Création de sites web", en: "Website creation" },
    text: { fr: "Sites vitrines et e-commerce rapides, pensés mobile, déployés sur Vercel.", en: "Fast, mobile-first showcase and e-commerce websites, deployed on Vercel." },
    cta: { fr: "Demander un devis", en: "Request a quote" },
    message: "Bonjour Cheikh, je souhaite un devis pour la création d'un site web.",
  },
];

/* ---------- 03. Projets ---------- */
export type Domain = "marketing" | "social" | "content" | "web";
export const domains: { id: Domain; label: T }[] = [
  { id: "marketing", label: { fr: "Marketing digital", en: "Digital marketing" } },
  { id: "social", label: { fr: "Community management & social media", en: "Community & social media" } },
  { id: "content", label: { fr: "Création de contenu", en: "Content creation" } },
  { id: "web", label: { fr: "Sites web & automatisation IA", en: "Websites & AI automation" } },
];

export type Brand = "arrow" | "forza" | "tornadoes" | "mmb" | "touba" | "senautomatia" | "automatia" | "teranga" | "firi";
export const brands: Record<Brand, string> = {
  arrow: "Arrow Home Group",
  forza: "FORZA Luxury",
  tornadoes: "Tornadoes Job Afrique",
  mmb: "MMB Moto Express",
  touba: "Touba Trading",
  senautomatia: "Sen AutomatIA",
  automatia: "AutomatIA",
  teranga: "Teranga Test",
  firi: "Firi",
};

export type MediaItem = {
  id: string;
  kind: "image" | "video";
  src: string;
  poster?: string;
  width: number;
  height: number;
  brand: Brand;
  domain: Domain;
  title: T;
  description: T;
  alt: T;
  href?: string; // lien externe (ex. site web en ligne)
};

const v = (n: number) => String(n).padStart(2, "0");

/** Galerie : uniquement les réalisations réellement présentes (visuels et vidéos). */
export const media: MediaItem[] = [
  // — Arrow Home Group —
  {
    id: "arrow-monday", kind: "image", src: "/images/arrow-home/arrow-home.webp", width: 1254, height: 1254, brand: "arrow", domain: "social",
    title: { fr: "Monday Motivation", en: "Monday Motivation" },
    description: { fr: "Communication digitale et création de contenu pour un acteur du BTP, de la construction et de l'immobilier.", en: "Digital communication and content for a construction and real estate company." },
    alt: { fr: "Visuel Arrow Home Group « Monday Motivation » : casque de chantier blanc devant des immeubles en construction", en: "Arrow Home Group “Monday Motivation” visual: white hard hat in front of buildings under construction" },
  },
  {
    id: "arrow-maouloud", kind: "image", src: "/images/arrow-home/maouloud-2026.webp", width: 1254, height: 1254, brand: "arrow", domain: "social",
    title: { fr: "Bonne célébration du Maouloud 2026", en: "Happy Maouloud 2026" },
    description: { fr: "Visuel de communication institutionnelle pour les réseaux sociaux d'Arrow Home Group.", en: "Institutional social media visual for Arrow Home Group." },
    alt: { fr: "Visuel Arrow Home Group souhaitant une bonne célébration du Maouloud 2026, mosquée au coucher du soleil", en: "Arrow Home Group visual wishing a happy Maouloud 2026, mosque at sunset" },
  },
  {
    id: "arrow-stade", kind: "image", src: "/images/arrow-home/stade-iba-mar-diop.webp", width: 1024, height: 1536, brand: "arrow", domain: "marketing",
    title: { fr: "Projet réalisé & livré — Stade Iba Mar Diop", en: "Delivered project — Iba Mar Diop Stadium" },
    description: { fr: "Communication autour d'un projet réalisé et livré au Stade Iba Mar Diop.", en: "Communication around a project delivered at the Iba Mar Diop Stadium." },
    alt: { fr: "Affiche Arrow Home « Projet réalisé & livré » : rénovation du Stade Iba Mar Diop à Dakar", en: "Arrow Home poster “Project delivered”: renovation of the Iba Mar Diop Stadium in Dakar" },
  },
  {
    id: "arrow-stade-photo", kind: "image", src: "/images/arrow-home/stade-iba-mar-diop-photo.webp", width: 1092, height: 1440, brand: "arrow", domain: "content",
    title: { fr: "Stade Iba Mar Diop", en: "Iba Mar Diop Stadium" },
    description: { fr: "Visuel photographique du projet du Stade Iba Mar Diop.", en: "Photograph of the Iba Mar Diop Stadium project." },
    alt: { fr: "Photo de la piste d'athlétisme rouge et des tribunes rénovées du Stade Iba Mar Diop", en: "Photo of the red running track and renovated stands of the Iba Mar Diop Stadium" },
  },
  {
    id: "arrow-reves", kind: "image", src: "/images/arrow-home/construisons-vos-reves.webp", width: 853, height: 1280, brand: "arrow", domain: "content",
    title: { fr: "Construisons vos rêves ensemble", en: "Let's build your dreams together" },
    description: { fr: "Création visuelle présentant les solutions de construction d'Arrow Home.", en: "Visual presenting Arrow Home's construction solutions." },
    alt: { fr: "Flyer Arrow Home « Construisons vos rêves ensemble » avec photos de chantiers et d'immeubles", en: "Arrow Home flyer “Let's build your dreams together” with photos of construction sites" },
  },
  {
    id: "arrow-espaces", kind: "image", src: "/images/arrow-home/donnez-vie-a-vos-espaces.webp", width: 1080, height: 1350, brand: "arrow", domain: "content",
    title: { fr: "Donnez vie à vos espaces", en: "Bring your spaces to life" },
    description: { fr: "Création visuelle autour de la conception, de l'aménagement et de la décoration.", en: "Visual about interior design, fitting and decoration." },
    alt: { fr: "Flyer Arrow Home « Donnez vie à vos espaces » montrant un salon moderne et lumineux", en: "Arrow Home flyer “Bring your spaces to life” showing a bright modern living room" },
  },
  {
    id: "arrow-video", kind: "video", src: "/videos/arrow-home-original.mp4", poster: "/videos/posters/arrow-home-original.webp", width: 406, height: 720, brand: "arrow", domain: "content",
    title: { fr: "Vidéo originale — Arrow Home Group", en: "Original video — Arrow Home Group" },
    description: { fr: "Vidéo originale réalisée pour Arrow Home Group, sans recours à l'IA.", en: "Original video made for Arrow Home Group, without AI." },
    alt: { fr: "Vidéo verticale tournée dans les locaux d'Arrow Home, logo de la marque en vitrine", en: "Vertical video filmed at Arrow Home's office, brand logo on display" },
  },
  {
    id: "arrow-video-realisations", kind: "video", src: "/videos/arrow-home/arrow-home-realisations.mp4", poster: "/videos/posters/arrow-home-realisations.webp", width: 720, height: 1280, brand: "arrow", domain: "content",
    title: { fr: "Du plan à la réalité — vidéo publicitaire voix off", en: "From plan to reality — voice-over ad video" },
    description: { fr: "Vidéo publicitaire avec voix off présentant les réalisations d'Arrow Home : Ecobank Thiaroye, Axil Hôtel, Villa Sangalkam, Projet P7 – Kalia.", en: "Voice-over ad video showcasing Arrow Home projects: Ecobank Thiaroye, Axil Hotel, Villa Sangalkam, Project P7 – Kalia." },
    alt: { fr: "Vidéo verticale Arrow Home : plan d'architecte sur fond bleu, « Tout grand projet commence par un plan »", en: "Arrow Home vertical video: architect's plan on a blue background, “Every great project starts with a plan”" },
  },
  {
    id: "arrow-video-ecobank", kind: "video", src: "/videos/arrow-home/arrow-home-agence-ecobank.mp4", poster: "/videos/posters/arrow-home-agence-ecobank.webp", width: 720, height: 1280, brand: "arrow", domain: "content",
    title: { fr: "D'une ancienne maison à une agence Ecobank", en: "From an old house to an Ecobank branch" },
    description: { fr: "Vidéo chantier en 8 étapes : la transformation d'une ancienne maison en agence Ecobank, des enduits aux finitions.", en: "8-step site video: turning an old house into an Ecobank branch, from rendering to finishing." },
    alt: { fr: "Vidéo verticale Arrow Home : pièce vide en travaux, texte « On transforme. »", en: "Arrow Home vertical video: empty room under renovation, caption “We transform.”" },
  },
  {
    id: "arrow-video-avant-apres", kind: "video", src: "/videos/arrow-home/arrow-home-avant-apres-130m2.mp4", poster: "/videos/posters/arrow-home-avant-apres-130m2.webp", width: 720, height: 1280, brand: "arrow", domain: "content",
    title: { fr: "Avant / après — du brut au clé en main, 130 m²", en: "Before / after — from shell to turnkey, 130 m²" },
    description: { fr: "Vidéo avant / après d'un appartement de 130 m² livré clé en main par les équipes Arrow Home.", en: "Before / after video of a 130 m² apartment delivered turnkey by Arrow Home's teams." },
    alt: { fr: "Vidéo verticale Arrow Home : une femme présente l'appartement rénové, texte « Après : signé Arrow Home »", en: "Arrow Home vertical video: a woman presents the renovated apartment, caption “After: signed Arrow Home”" },
  },
  {
    id: "arrow-site", kind: "image", src: "/images/sites/arrow-home-site.webp", width: 1440, height: 900, brand: "arrow", domain: "web", href: "https://arrow-home.vercel.app/fr",
    title: { fr: "Site web Arrow Home Group", en: "Arrow Home Group website" },
    description: { fr: "Site vitrine trilingue (FR / EN / 中文) : expertises, réalisations, méthode et demande de devis pré-remplie.", en: "Trilingual showcase website (FR / EN / 中文): services, projects, method and pre-filled quote request." },
    alt: { fr: "Capture d'écran de la page d'accueil du site Arrow Home Group : « Construire aujourd'hui. Donner forme à demain. »", en: "Screenshot of the Arrow Home Group homepage: “Build today. Shape tomorrow.”" },
  },
  // — Sen AutomatIA —
  {
    id: "senautomatia-site", kind: "image", src: "/images/sites/sen-automatia.webp", width: 1440, height: 900, brand: "senautomatia", domain: "web", href: "https://sen-automatia-site.vercel.app/",
    title: { fr: "Site web Sen AutomatIA", en: "Sen AutomatIA website" },
    description: { fr: "Site de l'agence Sen AutomatIA : marketing digital et IA pour les PME et boutiques en ligne au Sénégal.", en: "Website of the Sen AutomatIA agency: digital marketing and AI for SMEs and online stores in Senegal." },
    alt: { fr: "Capture d'écran de la page d'accueil de Sen AutomatIA : « votre agence de marketing digital et IA »", en: "Screenshot of the Sen AutomatIA homepage: “your digital marketing and AI agency”" },
  },
  // — FORZA Luxury —
  {
    id: "forza-video-parfums", kind: "video", src: "/videos/forza/forza-parfums-encens.mp4", poster: "/videos/posters/forza-parfums-encens.webp", width: 720, height: 1280, brand: "forza", domain: "content",
    title: { fr: "FORZA Parfums & Encens — vidéo publicitaire voix off", en: "FORZA Perfumes & Incense — voice-over ad video" },
    description: { fr: "Vidéo publicitaire avec voix off pour la gamme FORZA Parfums & Encens : « Offrez-vous une signature olfactive ».", en: "Voice-over ad video for the FORZA Perfumes & Incense range: “Treat yourself to a signature scent”." },
    alt: { fr: "Vidéo verticale FORZA : logo doré « FORZA Parfums & Encens » sur fond noir", en: "FORZA vertical video: gold “FORZA Parfums & Encens” logo on a black background" },
  },
  {
    id: "forza-solutions", kind: "image", src: "/images/forza/forza-luxury.webp", width: 1124, height: 1399, brand: "forza", domain: "content",
    title: { fr: "Forza Luxury — Des solutions sur mesure", en: "Forza Luxury — Tailored solutions" },
    description: { fr: "Direction artistique premium et création de visuel social media.", en: "Premium art direction and social media visual." },
    alt: { fr: "Visuel FORZA Luxury « Des solutions sur mesure » listant immobilier, automobile, voyages, décoration et conciergerie", en: "FORZA Luxury “Tailored solutions” visual listing real estate, cars, travel, decoration and concierge" },
  },
  {
    id: "forza-immo-finition", kind: "image", src: "/images/forza/immobilier-construction-finition.webp", width: 1128, height: 1394, brand: "forza", domain: "content",
    title: { fr: "Immobilier, construction & finition", en: "Real estate, construction & finishing" },
    description: { fr: "Visuel premium présentant les activités immobilières, de construction et de finition.", en: "Premium visual presenting real estate, construction and finishing services." },
    alt: { fr: "Visuel FORZA « Immobilier, construction & finition » avec une villa moderne et sa piscine", en: "FORZA “Real estate, construction & finishing” visual with a modern villa and pool" },
  },
  {
    id: "forza-immo-terrain", kind: "image", src: "/images/forza/immobilier-construction-travailleur.webp", width: 1128, height: 1394, brand: "forza", domain: "content",
    title: { fr: "Immobilier, construction & finition — terrain", en: "Real estate, construction & finishing — on site" },
    description: { fr: "Création visuelle premium autour de l'activité construction et immobilier.", en: "Premium visual about construction and real estate." },
    alt: { fr: "Visuel FORZA avec un ouvrier en casque et gilet orange consultant des plans", en: "FORZA visual with a worker in a hard hat and orange vest reading plans" },
  },
  {
    id: "forza-conciergerie", kind: "image", src: "/images/forza/accompagnement-conciergerie.webp", width: 1254, height: 1254, brand: "forza", domain: "content",
    title: { fr: "Accompagnement & Conciergerie", en: "Support & Concierge" },
    description: { fr: "Visuel premium de présentation des services d'accompagnement et de conciergerie.", en: "Premium visual presenting support and concierge services." },
    alt: { fr: "Visuel FORZA « Accompagnement & Conciergerie » avec une conseillère au téléphone", en: "FORZA “Support & Concierge” visual with an advisor on the phone" },
  },
  {
    id: "forza-byd", kind: "image", src: "/images/forza/byd-2024.webp", width: 1254, height: 1254, brand: "forza", domain: "marketing",
    title: { fr: "BYD 2024", en: "BYD 2024" },
    description: { fr: "Création publicitaire pour la communication automobile de Forza Luxury.", en: "Ad creative for Forza Luxury's car sales." },
    alt: { fr: "Publicité FORZA « À vendre BYD 2024 » : SUV blanc, prix 34 000 000 FCFA", en: "FORZA ad “For sale BYD 2024”: white SUV, price 34,000,000 FCFA" },
  },
  {
    id: "forza-toyota", kind: "image", src: "/images/forza/toyota-corolla-hybrid-cross.webp", width: 1254, height: 1254, brand: "forza", domain: "marketing",
    title: { fr: "Toyota Corolla Hybrid Cross 2024", en: "Toyota Corolla Hybrid Cross 2024" },
    description: { fr: "Création publicitaire automobile pour les réseaux sociaux.", en: "Car ad creative for social media." },
    alt: { fr: "Publicité FORZA « À vendre Toyota Corolla Hybrid Cross 2024 » : SUV noir, prix 26 000 000 FCFA", en: "FORZA ad “For sale Toyota Corolla Hybrid Cross 2024”: black SUV, price 26,000,000 FCFA" },
  },
  {
    id: "forza-visa", kind: "image", src: "/images/forza/visa-asie-schengen.webp", width: 1254, height: 1254, brand: "forza", domain: "marketing",
    title: { fr: "Visa Asie & Visa Schengen", en: "Asia & Schengen visas" },
    description: { fr: "Création publicitaire pour les services de voyage et d'accompagnement visa.", en: "Ad creative for travel and visa assistance services." },
    alt: { fr: "Publicité FORZA Visa Asie et Visa Schengen : voyageuse avec chapeau et lunettes à l'aéroport", en: "FORZA Asia and Schengen visa ad: traveller in hat and sunglasses at the airport" },
  },
  {
    id: "forza-vip", kind: "image", src: "/images/forza/voyage-vip-paris.webp", width: 1254, height: 1254, brand: "forza", domain: "marketing",
    title: { fr: "Voyage VIP à Paris", en: "VIP trip to Paris" },
    description: { fr: "Création visuelle destinée à promouvoir une offre de voyage VIP.", en: "Visual promoting a VIP travel offer." },
    alt: { fr: "Publicité FORZA « Tourisme & billetterie VIP » : passeports tendus devant la tour Eiffel", en: "FORZA “Tourism & VIP ticketing” ad: passports held up in front of the Eiffel Tower" },
  },
  {
    id: "forza-octobre-rose", kind: "image", src: "/images/forza/octobre-rose.webp", width: 1254, height: 1254, brand: "forza", domain: "social",
    title: { fr: "Octobre Rose — Ensemble contre le cancer du sein", en: "Pink October — Together against breast cancer" },
    description: { fr: "Création de communication de sensibilisation pour Octobre Rose.", en: "Awareness communication for Pink October." },
    alt: { fr: "Visuel FORZA Octobre Rose : femme en foulard rose, message de sensibilisation au dépistage", en: "FORZA Pink October visual: woman in a pink headscarf, screening awareness message" },
  },
  // — Tornadoes Job Afrique (vidéos IA) —
  ...[
    { n: 1, w: 720, h: 404, fr: "Jeune homme pensif, sous-titre « Avoir un Master »", en: "Thoughtful young man, caption “Getting a Master's”" },
    { n: 2, w: 404, h: 720, fr: "Diplômes encadrés au mur, sous-titre « Les diplômes »", en: "Framed diplomas on a wall, caption “The diplomas”" },
    { n: 3, w: 404, h: 720, fr: "Jeune femme éclairée par un écran, sous-titre « Aminata veut réussir »", en: "Young woman lit by a screen, caption “Aminata wants to succeed”" },
    { n: 4, w: 404, h: 720, fr: "Jeune homme assis sur un lit, sous-titre « Au Sénégal »", en: "Young man sitting on a bed, caption “In Senegal”" },
    { n: 5, w: 720, h: 404, fr: "Mur de diplômes encadrés, sous-titre « Un diplôme »", en: "Wall of framed diplomas, caption “A diploma”" },
    { n: 6, w: 404, h: 720, fr: "Femme à un bureau lumineux, sous-titre « À Dakar, le succès demande »", en: "Woman at a bright desk, caption “In Dakar, success takes”" },
    { n: 7, w: 720, h: 404, fr: "Homme face à la mer au coucher du soleil, sous-titre « À Dakar, l'avenir »", en: "Man facing the sea at sunset, caption “In Dakar, the future”" },
  ].map((x) => ({
    id: `tornadoes-${v(x.n)}`,
    kind: "video" as const,
    src: `/videos/tornadoes-${v(x.n)}.mp4`,
    poster: `/videos/posters/tornadoes-${v(x.n)}.webp`,
    width: x.w,
    height: x.h,
    brand: "tornadoes" as const,
    domain: "content" as const,
    title: { fr: `Tornadoes Job Afrique — vidéo ${x.n}`, en: `Tornadoes Job Afrique — video ${x.n}` },
    description: { fr: "Création vidéo réalisée dans le cadre du contenu social media et de l'AI Content Lab.", en: "Video created as part of social media content and the AI Content Lab." },
    alt: { fr: `Vidéo IA Tornadoes : ${x.fr}`, en: `Tornadoes AI video: ${x.en}` },
  })),
];

/** Études de cas (cartes « bento » + modal détaillé). */
export type CaseStudy = {
  id: string;
  brand: Brand;
  kind: T;
  domains: Domain[];
  cover?: string; // id d'un élément de la galerie ; vide = placeholder [À COMPLÉTER]
  summary: T;
  role: T;
  tools: string[];
  result: T;
  mediaIds: string[];
  link?: string;
  todo?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "arrow", brand: "arrow", domains: ["marketing", "social", "content", "web"], cover: "arrow-stade", link: "https://arrow-home.vercel.app/fr",
    kind: { fr: "Marketing BTP", en: "Construction marketing" },
    summary: { fr: "Communication digitale et création de contenu pour un acteur du BTP, de la construction et de l'immobilier.", en: "Digital communication and content for a construction and real estate company." },
    role: { fr: "Gestion et animation des réseaux sociaux, calendriers éditoriaux, création de visuels, carrousels, Reels et vidéos publicitaires, création du site web, suivi des performances.", en: "Social media management, editorial calendars, visuals, carousels, Reels and ad videos, website creation, performance tracking." },
    tools: ["Canva", "CapCut", "Meta Business Suite", "IA", "Vercel"],
    result: TODO,
    mediaIds: ["arrow-site", "arrow-video-realisations", "arrow-video-ecobank", "arrow-video-avant-apres", "arrow-video", "arrow-stade", "arrow-stade-photo", "arrow-monday", "arrow-maouloud", "arrow-reves", "arrow-espaces"],
  },
  {
    id: "forza", brand: "forza", domains: ["marketing", "social", "content"], cover: "forza-byd",
    kind: { fr: "Luxury Services — publicités", en: "Luxury Services — ads" },
    summary: { fr: "Direction artistique premium, vidéo publicitaire et créations pour l'automobile, l'immobilier, le voyage, la conciergerie et les parfums.", en: "Premium art direction, ad video and creatives for cars, real estate, travel, concierge and perfumes." },
    role: { fr: "Création et publication de contenus promotionnels, campagnes pour la mobilité et les services premium.", en: "Creation and publishing of promotional content, campaigns for mobility and premium services." },
    tools: ["Canva", "Meta Business Suite", "IA"],
    result: TODO,
    mediaIds: ["forza-video-parfums", "forza-byd", "forza-toyota", "forza-visa", "forza-vip", "forza-octobre-rose", "forza-solutions", "forza-immo-finition", "forza-immo-terrain", "forza-conciergerie"],
  },
  {
    id: "tornadoes", brand: "tornadoes", domains: ["content", "social"], cover: "tornadoes-07",
    kind: { fr: "Vidéos IA — social media", en: "AI videos — social media" },
    summary: { fr: "Série de vidéos réalisées dans le cadre du contenu social media et de l'AI Content Lab.", en: "Video series created as part of social media content and the AI Content Lab." },
    role: { fr: "Calendrier éditorial, création de Reels et vidéos, animation quotidienne des communautés, suivi des statistiques.", en: "Editorial calendar, Reels and videos, daily community engagement, analytics follow-up." },
    tools: ["CapCut", "IA vidéo", "Meta Business Suite"],
    result: TODO,
    mediaIds: Array.from({ length: 7 }, (_, i) => `tornadoes-${v(i + 1)}`),
  },
  {
    id: "senautomatia", brand: "senautomatia", domains: ["web"], cover: "senautomatia-site", link: "https://sen-automatia-site.vercel.app/",
    kind: { fr: "Agence — site web", en: "Agency — website" },
    summary: { fr: "Site de l'agence Sen AutomatIA : marketing digital et IA pour les PME et boutiques en ligne au Sénégal.", en: "Website of the Sen AutomatIA agency: digital marketing and AI for SMEs and online stores in Senegal." },
    role: { fr: "Conception et création du site web.", en: "Website design and build." },
    tools: ["Vercel"], result: TODO, mediaIds: ["senautomatia-site"],
  },
  {
    id: "automatia", brand: "automatia", domains: ["web"], todo: true,
    kind: { fr: "Boutique d'ebooks", en: "Ebook store" }, summary: TODO, role: TODO, tools: [], result: TODO, mediaIds: [],
  },
  {
    id: "touba", brand: "touba", domains: ["web"], todo: true,
    // ⚠ Lien de prévisualisation protégé par Vercel : remplacez-le par l'adresse publique du site.
    link: "https://touba-mouride-trading-git-a-propos-access-path.vercel.app/fr",
    kind: { fr: "Site e-commerce", en: "E-commerce website" }, summary: TODO, role: TODO, tools: ["Vercel"], result: TODO, mediaIds: [],
  },
  {
    id: "mmb", brand: "mmb", domains: [], todo: true,
    kind: TODO, summary: TODO, role: TODO, tools: [], result: TODO, mediaIds: [],
  },
  {
    id: "teranga", brand: "teranga", domains: [], todo: true,
    kind: TODO, summary: TODO, role: TODO, tools: [], result: TODO, mediaIds: [],
  },
  {
    id: "firi", brand: "firi", domains: [], todo: true,
    kind: TODO, summary: TODO, role: TODO, tools: [], result: TODO, mediaIds: [],
  },
];

/* ---------- 04. Méthode ---------- */
export const method: { title: T; text: T }[] = [
  { title: { fr: "Écouter", en: "Listen" }, text: { fr: "Comprendre la marque, son audience et ses objectifs.", en: "Understand the brand, its audience and its goals." } },
  { title: { fr: "Stratégie", en: "Strategy" }, text: { fr: "Définir le concept créatif, le calendrier éditorial et les canaux.", en: "Define the creative concept, editorial calendar and channels." } },
  { title: { fr: "Automatiser", en: "Automate" }, text: { fr: "Produire les contenus et automatiser ce qui se répète avec l'IA.", en: "Produce the content and automate repetitive work with AI." } },
  { title: { fr: "Mesurer", en: "Measure" }, text: { fr: "Analyser les performances et améliorer continuellement.", en: "Analyse performance and keep improving." } },
];

/* ---------- 05. Outils ---------- */
// logo = clé du tracé SVG dans components/logo-paths.ts (vide = nom typographique)
export const tools: { name: string; logo?: string }[] = [
  { name: "Claude", logo: "claude" },
  { name: "Claude Code", logo: "claude" },
  { name: "Make", logo: "make" },
  { name: "Canva" },
  { name: "Meta Ads", logo: "meta" },
  { name: "Vercel", logo: "vercel" },
  { name: "GitHub", logo: "github" },
  { name: "Supabase", logo: "supabase" },
];

/* ---------- 06. Parcours & certificats ---------- */
export const experience: { date: T; company: string; role: T }[] = [
  { date: { fr: "Août 2026 — aujourd'hui", en: "Aug 2026 — present" }, company: "Arrow Home Group / Forza Luxury", role: { fr: "Responsable Marketing Digital · Community & Social Media Manager", en: "Head of Digital Marketing · Community & Social Media Manager" } },
  { date: { fr: "Janv. 2026 — mai 2026", en: "Jan 2026 — May 2026" }, company: "Tornadoes Job Afrique", role: { fr: "Community Manager / Créateur de contenu digital", en: "Community Manager / Digital content creator" } },
  { date: { fr: "2025 — 2026", en: "2025 — 2026" }, company: "Freelance", role: { fr: "Community Manager", en: "Community Manager" } },
  { date: { fr: "Déc. 2021 — mars 2022", en: "Dec 2021 — Mar 2022" }, company: "Prévoyance Assurance Sénégal", role: { fr: "Assistant Assurance & Relation Client", en: "Insurance & Customer Relations Assistant" } },
  { date: { fr: "Sept. 2021 — déc. 2021", en: "Sep 2021 — Dec 2021" }, company: "Banque de l'Habitat du Sénégal", role: { fr: "Assistant Conseiller Commercial & Accueil", en: "Sales Advisor Assistant & Reception" } },
];

export const credentials: { domain: T; items: { year: string; title: T; org: string; type: "diploma" | "certificate" }[] }[] = [
  {
    domain: { fr: "Marketing digital", en: "Digital marketing" },
    items: [
      { year: "2022–2024", title: { fr: "Master en Marketing Digital", en: "Master's in Digital Marketing" }, org: "ISM Thiès", type: "diploma" },
      { year: "—", title: { fr: "Certificat Marketing Numérique", en: "Digital Marketing Certificate" }, org: "Google — Atelier Numérique", type: "certificate" },
      { year: "—", title: { fr: "Certificat Commerce Digital", en: "Digital Commerce Certificate" }, org: "Force N / Université Virtuelle du Sénégal (UVS)", type: "certificate" },
    ],
  },
  {
    domain: { fr: "Création de contenu & IA", en: "Content creation & AI" },
    items: [
      { year: "—", title: { fr: "Création de contenu IA", en: "AI content creation" }, org: "Africa Digital Youth Training Hub", type: "certificate" },
    ],
  },
  {
    domain: { fr: "Gestion & management", en: "Management" },
    items: [
      { year: "2018–2021", title: { fr: "Licence en Gestion des Entreprises", en: "Bachelor's in Business Management" }, org: "ISM Thiès", type: "diploma" },
      { year: "—", title: { fr: "Gestion de projets", en: "Project management" }, org: "ELAN Teranga", type: "certificate" },
    ],
  },
];

/* ---------- 07. Témoignages ---------- */
export const testimonials: { quote: T; name: string; company: string; photo?: string }[] = [
  { quote: TODO, name: "[À COMPLÉTER]", company: "[À COMPLÉTER]" },
  { quote: TODO, name: "[À COMPLÉTER]", company: "[À COMPLÉTER]" },
  { quote: TODO, name: "[À COMPLÉTER]", company: "[À COMPLÉTER]" },
];

/* ---------- 08. Contact ---------- */
export const contact = {
  title: { fr: "Créons ensemble.", en: "Let's create together." },
  text: {
    fr: "Un projet, une collaboration ou une opportunité ? Écrivez-moi : je réponds en priorité sur WhatsApp.",
    en: "A project, a collaboration or an opportunity? Write to me — WhatsApp is the fastest way.",
  },
  whatsappCta: { fr: "Écrire sur WhatsApp", en: "Message on WhatsApp" },
  form: {
    name: { fr: "Votre nom", en: "Your name" },
    company: { fr: "Entreprise (facultatif)", en: "Company (optional)" },
    message: { fr: "Votre message", en: "Your message" },
    sendWhatsapp: { fr: "Envoyer sur WhatsApp", en: "Send via WhatsApp" },
    sendEmail: { fr: "Envoyer par e-mail", en: "Send by email" },
    note: { fr: "Le message s'ouvre dans WhatsApp ou votre messagerie, prêt à envoyer.", en: "Your message opens in WhatsApp or your mail app, ready to send." },
  },
};

/* ---------- Libellés d'interface ---------- */
export const ui = {
  sections: {
    about: { fr: "À propos", en: "About" },
    services: { fr: "Services", en: "Services" },
    projects: { fr: "Projets", en: "Work" },
    method: { fr: "Ma méthode", en: "My method" },
    tools: { fr: "Outils & stack", en: "Tools & stack" },
    background: { fr: "Parcours & certificats", en: "Background & certificates" },
    testimonials: { fr: "Témoignages", en: "Testimonials" },
    contact: { fr: "Contact", en: "Contact" },
  },
  projectsTitle: { fr: "Des projets pensés pour être vus.", en: "Work made to be seen." },
  servicesTitle: { fr: "Ce que je fais pour votre marque.", en: "What I do for your brand." },
  methodTitle: { fr: "Quatre étapes, aucune perdue.", en: "Four steps, none wasted." },
  toolsTitle: { fr: "Les outils avec lesquels je travaille.", en: "The tools I work with." },
  backgroundTitle: { fr: "Un parcours en mouvement.", en: "A path in motion." },
  testimonialsTitle: { fr: "Ce qu'ils en disent.", en: "What they say." },
  experience: { fr: "Expérience", en: "Experience" },
  diplomas: { fr: "Diplômes & certificats", en: "Degrees & certificates" },
  diploma: { fr: "Diplôme", en: "Degree" },
  certificate: { fr: "Certificat", en: "Certificate" },
  all: { fr: "Tous", en: "All" },
  caseStudies: { fr: "Études de cas", en: "Case studies" },
  gallery: { fr: "Galerie", en: "Gallery" },
  items: { fr: "réalisations", en: "pieces" },
  open: { fr: "Voir l'étude de cas", en: "View case study" },
  role: { fr: "Mon rôle", en: "My role" },
  toolsLabel: { fr: "Outils", en: "Tools" },
  result: { fr: "Résultat", en: "Result" },
  close: { fr: "Fermer", en: "Close" },
  prev: { fr: "Précédent", en: "Previous" },
  next: { fr: "Suivant", en: "Next" },
  video: { fr: "Vidéo", en: "Video" },
  visitSite: { fr: "Voir le site en ligne", en: "Visit the live site" },
  noVisual: { fr: "Visuel [À COMPLÉTER]", en: "Visual [TO BE COMPLETED]" },
  noItems: { fr: "Aucune réalisation dans ce domaine pour l'instant — [À COMPLÉTER].", en: "No work in this category yet — [TO BE COMPLETED]." },
  downloadCv: { fr: "Télécharger mon CV", en: "Download my CV" },
  menu: { fr: "Menu", en: "Menu" },
  skip: { fr: "Aller au contenu", en: "Skip to content" },
  legal: { fr: "Mentions légales", en: "Legal notice" },
  rights: { fr: "Tous droits réservés.", en: "All rights reserved." },
  backTop: { fr: "Haut de page", en: "Back to top" },
};
