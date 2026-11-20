import type { Metadata } from "next";
import { profile } from "@/data/content";

export const metadata: Metadata = { title: `Mentions légales — ${profile.name}`, robots: { index: false } };

export default function Legal() {
  return (
    <main className="shell max-w-3xl py-24">
      <a href="/" className="mono text-xs text-muted hover:text-accent">← Retour au portfolio</a>
      <h1 className="display mt-10 text-6xl md:text-8xl">Mentions légales</h1>
      <div className="mt-12 space-y-10 leading-relaxed text-muted [&_h2]:mb-3 [&_h2]:font-serif [&_h2]:text-3xl [&_h2]:text-text">
        <section>
          <h2>Éditeur du site</h2>
          <p>{profile.name} — Dakar, Sénégal.<br />Contact : <a className="text-text underline" href={`mailto:${profile.email}`}>{profile.email}</a> · {profile.phoneDisplay}</p>
        </section>
        <section>
          <h2>Hébergement</h2>
          <p>Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — vercel.com</p>
        </section>
        <section>
          <h2>Propriété intellectuelle</h2>
          <p>Les visuels et vidéos présentés ont été réalisés par {profile.name} pour les marques citées (Arrow Home Group, FORZA Luxury, Tornadoes Job Afrique…). Les marques et logos restent la propriété de leurs titulaires respectifs. Toute reproduction sans autorisation est interdite.</p>
        </section>
        <section>
          <h2>Données personnelles</h2>
          <p>Ce site ne collecte aucune donnée et n’utilise pas de cookies de suivi. Le formulaire de contact ouvre simplement WhatsApp ou votre messagerie : aucune information n’est stockée sur ce site.</p>
        </section>
      </div>
    </main>
  );
}
