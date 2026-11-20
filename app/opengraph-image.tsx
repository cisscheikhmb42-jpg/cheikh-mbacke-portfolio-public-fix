import { ImageResponse } from "next/og";

export const alt = "Cheikh Mbacke Cisse — Je fais croître votre marque avec l'IA.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0A0A0B", color: "#F4F1EA", padding: 72, fontFamily: "serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#8A8A85", fontFamily: "monospace" }}>
          <span>CHEIKH MBACKE CISSE</span>
          <span style={{ color: "#C6F432" }}>DAKAR — SÉNÉGAL</span>
        </div>
        <div style={{ display: "flex", fontSize: 104, lineHeight: 1, letterSpacing: -3 }}>Je fais croître votre marque avec l’IA.</div>
        <div style={{ display: "flex", gap: 24, fontSize: 24, color: "#8A8A85", fontFamily: "monospace", borderTop: "1px solid rgba(244,241,234,0.12)", paddingTop: 28 }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: "#C6F432", marginTop: 6 }} />
          <span>MARKETING DIGITAL · CONTENU · COMMUNITY MANAGEMENT · AUTOMATISATION IA</span>
        </div>
      </div>
    ),
    size,
  );
}
