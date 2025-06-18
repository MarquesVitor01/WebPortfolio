"use client";

import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState } from "react";

export default function About() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = ["slide01.png", "slide02.png", "slide03.png"];

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1.5, spacing: 15, origin: "center" },
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
  });

  return (
    <section
      id="about"
      className="min-h-screen bg-indigo-900 text-white flex flex-col items-center px-6 py-20"
      style={{ position: "relative", zIndex: 20, marginTop: "100vh" }}
    >
      <div className="max-w-5xl w-full flex flex-col items-center text-center mb-12">
        <span className="text-indigo-200 text-lg mb-2 uppercase tracking-widest">
          Quem sou eu?
        </span>
        <p className="max-w-3xl text-lg leading-relaxed text-gray-200 text-justify">
          Sou desenvolvedor full stack com foco em soluções escaláveis,
          integrações bancárias e automação empresarial. Tenho experiência
          sólida com TypeScript, Node.js, React, Next.js e bancos de dados SQL e
          NoSQL. Atuo no backend com NestJS, Express e microserviços, e no
          frontend com interfaces responsivas e otimizadas. Tenho forte domínio
          em Google Cloud (Firestore, Firebase, Sheets API) e experiência com
          AWS. Também trabalho com integrações de pagamento como EFI Pay e
          Stripe. Atualmente, curso o último semestre de Análise e
          Desenvolvimento de Sistemas e busco oportunidades em backend, full
          stack ou cloud.
        </p>
      </div>

      <div className="w-full max-w-5xl">
        <div
          ref={sliderRef}
          className="keen-slider rounded-2xl overflow-hidden"
        >
          {images.map((img, index) => (
            <div
              key={index}
              className="keen-slider__slide relative h-[300px] md:h-[500px]"
            >
              <Image
                src={`/${img}`}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6 space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-1 transition-all duration-300 rounded-full ${
                currentSlide === index ? "bg-white w-10" : "bg-white/30 w-5"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}
