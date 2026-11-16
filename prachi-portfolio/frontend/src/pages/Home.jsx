import { useEffect } from "react";
import { useLenis } from "@/lib/site";
import { Header } from "@/components/site/Header";
import { ScrollProgress, BackToTop } from "@/components/site/ScrollBits";
import { EasterEgg } from "@/components/site/EasterEgg";
import { CafeTunes } from "@/components/site/CafeTunes";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Impact } from "@/components/sections/Impact";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Research } from "@/components/sections/Research";
import { Toolbox } from "@/components/sections/Toolbox";
import { Learning } from "@/components/sections/Learning";
import { Beyond } from "@/components/sections/Beyond";
import { AiTwin } from "@/components/sections/AiTwin";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  useLenis(true);
  useEffect(() => { document.title = "Prachi Singh · AI Engineer & Software Engineer"; }, []);
  return (
    <div className="grain relative" data-testid="home-page">
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <About />
        <Impact />
        <Experience />
        <Projects />
        <Research />
        <Toolbox />
        <Learning />
        <Beyond />
        <AiTwin />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <CafeTunes />
      <EasterEgg />
    </div>
  );
}
