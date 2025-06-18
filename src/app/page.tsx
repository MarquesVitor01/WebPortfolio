"use client";

import { useEffect, useState } from "react";
import Hero from "./home/components/Hero";
import About from "./home/components/About";
import Navbar from "./components/Navbar";
import TechCarousel from "./home/components/TechCarousel";
import ProjectGallery from "./home/components/ProjectGallery";
import GitHubStats from "./home/components/GitHubStats";
import Contato from "./home/components/Contato";
import Footer from "./home/components/Footer";

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const maxScrollEffect = 300;

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const progress = Math.min(scrollY / maxScrollEffect, 1);

  return (
    <>
      <Navbar />

      <Hero progress={progress} />

      <About />
      <GitHubStats username={"MarquesVitor01"} />
      <TechCarousel />
      <ProjectGallery />
      <Contato />
      <Footer />
      {scrollY > 200 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Voltar ao topo"
          className="fixed bottom-15 right-6 z-50 bg-white text-black px-4 py-3 rounded-full shadow-lg hover:bg-gray-200 transition-all"
        >
          ↑
        </button>
      )}
    </>
  );
}
