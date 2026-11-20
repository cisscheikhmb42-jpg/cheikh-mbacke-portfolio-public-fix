import { Projects } from "@/components/projects";
import { About, Background, Contact, Footer, Header, Hero, Method, Services, Testimonials, Tools } from "@/components/sections";

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
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
