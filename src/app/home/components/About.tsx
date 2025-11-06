"use client";

import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function About() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    {
      src: "estoque.png",
      title: "SaaS de Gerenciamento de Estoque",
      desc: "Plataforma SaaS em fase de testes de produção, criada para automatizar o controle e fluxo de produtos em empresas de qualquer porte.",
      status: "Em testes de produção",
    },
    {
      src: "mind.png",
      title: "MindCare",
      desc: "Aplicativo mobile em desenvolvimento para acompanhamento psicológico e bem-estar emocional, com foco em autoavaliações e suporte terapêutico.",
      status: "Em desenvolvimento",
    },
    {
      src: "slide03.png",
      title: "CRM Corporativo",
      desc: "Sistema completo para gestão de clientes, contratos e finanças, totalmente funcional e disponível para uso corporativo.",
      status: "Disponível",
    },
  ];

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1.2, spacing: 20, origin: "center" },
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
  });

  const nextSlide = () => instanceRef.current?.next();
  const prevSlide = () => instanceRef.current?.prev();

  return (
    <section
      id="about"
      className="min-h-screen bg-indigo-900 text-white flex flex-col items-center px-6 py-20"
      style={{ position: "relative", zIndex: 20, marginTop: "100vh" }}
    >
      {/* Texto principal */}
      <div className="max-w-6xl w-full flex flex-col items-center text-center mb-12">
        <span className="text-indigo-200 text-lg mb-2 uppercase tracking-widest">
          Quem sou eu?
        </span>
        <p className="max-w-4xl text-lg leading-relaxed text-gray-200 text-justify">
          Desenvolvedor Full Stack Web e Mobile com sólida experiência em projetar, desenvolver
          e escalar sistemas completos, do backend ao frontend. Especialista em Next.js, Node.js,
          React, React Native, TypeScript, Firebase e .NET, com domínio em APIs RESTful, integrações
          corporativas, automação de processos e bancos de dados SQL e NoSQL. Atuação prática em
          infraestrutura cloud (GCP e AWS), integrações financeiras (Gerencianet/EFIPay) e
          metodologias ágeis (Scrum e Kanban). Foco em entregas seguras, escaláveis e orientadas a
          resultados.
        </p>
      </div>

      {/* Slider de imagens */}
      <div className="relative w-full max-w-6xl">
        {/* Setas */}
        <button
          onClick={prevSlide}
          className="absolute -left-6 top-1/2 -translate-y-1/2 bg-indigo-700 hover:bg-indigo-600 p-2 rounded-full shadow-lg z-10 transition"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute -right-6 top-1/2 -translate-y-1/2 bg-indigo-700 hover:bg-indigo-600 p-2 rounded-full shadow-lg z-10 transition"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Slides */}
        <div
          ref={sliderRef}
          className="keen-slider rounded-2xl overflow-visible"
        >
          {images.map((item, index) => (
            <div
              key={index}
              className="keen-slider__slide relative h-[320px] md:h-[520px] group overflow-hidden rounded-2xl"
            >
              {/* Imagem */}
              <Image
                src={`/${item.src}`}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority={index === 0}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center text-center px-4">
                <h3 className="text-xl md:text-2xl font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-200 text-sm md:text-base mb-2">
                  {item.desc}
                </p>
                <span className="text-indigo-300 text-sm font-medium uppercase tracking-wide">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Indicadores */}
        <div className="flex justify-center mt-6 space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-1 transition-all duration-300 rounded-full ${currentSlide === index ? "bg-white w-10" : "bg-white/30 w-5"
                }`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}
