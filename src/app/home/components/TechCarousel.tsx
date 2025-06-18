"use client";

import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useRef } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const techLogos = [
  { src: "/type-logo.png", alt: "TypeScript" },
  { src: "/logo-nextjs.png", alt: "Next" },
  { src: "/react-logo.jpg", alt: "React/Native" },
  { src: "/java-logo.png", alt: "Java" },
  { src: "/spring-logo.png", alt: "Spring" },
  { src: "/angular-logo.png", alt: "Angular" },
  { src: "/node-logo.png", alt: "Node" },
  { src: "/firebase-logo.png", alt: "Firebase" },
  { src: "/mongodb-logo.png", alt: "MongoDB" },
  { src: "/postgresql-logo.png", alt: "PostgreSQL" },
  { src: "/mysql-logo.png", alt: "MySQL" },
  { src: "/Google-Cloud-Logo.png", alt: "Google Cloud" },
  { src: "/aws-logo.png", alt: "AWS" },
];

export default function TechCarousel() {
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    breakpoints: {
      "(max-width: 640px)": {
        slides: { perView: 2.5, spacing: 16 },
      },
      "(min-width: 641px) and (max-width: 1024px)": {
        slides: { perView: 3.5, spacing: 24 },
      },
    },
    slides: {
      perView: 5,
      spacing: 40,
    },
    drag: false,
  });

  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!slider || !slider.current) return;

    function autoplay() {
      slider.current?.next();
      timerId.current = setTimeout(autoplay, 3000);
    }

    autoplay();

    return () => {
      if (timerId.current) clearTimeout(timerId.current);
    };
  }, [slider]);

  function handleMouseEnter() {
    if (timerId.current) clearTimeout(timerId.current);
  }

  function handleMouseLeave() {
    if (!slider || !slider.current) return;

    function autoplay() {
      slider.current?.next();
      timerId.current = setTimeout(autoplay, 3000);
    }

    autoplay();
  }

  return (
    <section
      className="w-full bg-black py-24 flex flex-col items-center relative z-20 overflow-visible min-h-[300px]"
      aria-label="Tecnologias utilizadas - carrossel"
    >
      <p className="text-sm text-neutral-400 uppercase tracking-wide pb-10">
        TECNOLOGIAS QUE UTILIZO:
      </p>

      <div
        ref={sliderRef}
        className="keen-slider max-w-6xl w-full cursor-default select-none overflow-visible"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {techLogos.map(({ src, alt }, i) => (
          <div
            key={i}
            className="keen-slider__slide flex justify-center items-center"
            tabIndex={0}
            aria-label={alt}
          >
            <div className="relative group flex flex-col items-center">
              <div
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 relative"
                data-tooltip-id="tech-tooltip"
                data-tooltip-content={alt}
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110 rounded-xl shadow-md"
                  priority={i === 0}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tooltip único fora do map */}
      <Tooltip
        id="tech-tooltip"
        place="top"
        style={{ zIndex: 9999 }}
        className="z-[9999] !bg-white !text-black !text-sm !px-3 !py-1 !rounded-md shadow-lg"
      />
    </section>
  );
}
