import { Projects } from "@/components/projects";
import { About, Background, Contact, Footer, Header, Hero, Method, Services, Tools } from "@/components/sections";

export default function Home() {
  return (
    <>
      <Header />
      <main id="contenu">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Method />
        <Tools />
        <Background />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
