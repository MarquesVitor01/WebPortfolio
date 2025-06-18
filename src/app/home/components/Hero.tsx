"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import CodeBackground from "@/app/components/CodeBackground";

interface HeroProps {
  progress: number;
}

export default function Hero({ progress }: HeroProps) {
  const fullName = "Vitor Marques Silva";
  const [displayedText, setDisplayedText] = useState("");
  const [, setScrolled] = useState(false);

  useEffect(() => {
    let currentIndex = 0;

    function type() {
      if (currentIndex < fullName.length) {
        const charToAdd = fullName.charAt(currentIndex);
        setDisplayedText((prev) => prev + charToAdd);
        currentIndex++;
        setTimeout(type, 150);
      }
    }

    type();
  }, []);

  function scrollToSection(id: string) {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="inicio"
      aria-label="Seção principal de apresentação"
      style={{
        position: "fixed",
        top: 64,
        left: 0,
        right: 0,
        height: "calc(100vh - 64px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px 24px",
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(10px)",
        zIndex: 10,
        perspective: "1500px",
        transformStyle: "preserve-3d",
        overflow: "hidden",
      }}
    >
      <CodeBackground />

      <div
        className="animate-text-3d relative max-w-4xl w-full flex flex-col justify-center items-center text-center px-6 pt-24 pb-16 rounded-3xl bg-white/10 backdrop-blur-md shadow-[0_10px_30px_rgba(0,255,128,0.3),0_20px_50px_rgba(0,128,255,0.2)]"
        style={{
          opacity: 1 - progress,
          transform: `
            scale(${1 - progress * 0.15})
            translateZ(${progress * -400}px)
            translateY(${progress * -20}px)
          `,
          transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
          pointerEvents: progress >= 0.98 ? "none" : "auto",
        }}
      >
        <h2 className="text-lg text-gray-300 mb-3 tracking-wide">Olá, eu sou</h2>

        <div
          className="mb-6 border-r-4 border-white pr-4 inline-block transform-style-preserve-3d transition-transform duration-500 ease-in-out"
          aria-label={fullName}
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold drop-shadow-lg break-words">
            {displayedText}
          </h1>
        </div>

        <div className="rounded-full border-4 border-white shadow-lg mb-8">
          <Image
            src="/vitor_bg.jpg"
            alt="Foto de perfil de Vitor Marques"
            width={180}
            height={180}
            className="rounded-full"
            priority
          />
        </div>

        <div className="flex space-x-8 mb-8">
          <a
            href="https://github.com/MarquesVitor01"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-white hover:text-gray-300 transition text-3xl"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/vitor-marques-9199ab17a"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-white hover:text-gray-300 transition text-3xl"
          >
            <FaLinkedin />
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-5">
          <button
            onClick={() => scrollToSection("#contato")}
            className="bg-white text-indigo-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition shadow-md"
          >
            Contato
          </button>
          <button
            onClick={() => scrollToSection("#projetos")}
            className="border border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-800 transition shadow-md text-white"
          >
            Projetos
          </button>
          <a
            href="/Curriculo_Vitor_Marques_Silva.pdf"
            download="Curriculo_Vitor_Marques_Silva.pdf"
            className="bg-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition shadow-md text-white"
          >
            Currículo
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes text3d {
          0% {
            transform: rotateX(0deg) rotateY(0deg) translateZ(0);
          }
          25% {
            transform: rotateX(3deg) rotateY(6deg) translateZ(6px);
          }
          50% {
            transform: rotateX(5deg) rotateY(8deg) translateZ(8px);
          }
          75% {
            transform: rotateX(3deg) rotateY(6deg) translateZ(6px);
          }
          100% {
            transform: rotateX(0deg) rotateY(0deg) translateZ(0);
          }
        }

        .animate-text-3d {
          animation: text3d 6s ease-in-out infinite;
          will-change: transform;
          transform-style: preserve-3d;
        }
      `}</style>
    </section>
  );
}
