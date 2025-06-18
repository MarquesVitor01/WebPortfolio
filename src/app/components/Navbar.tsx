"use client";

import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  function scrollToSection(id: string) {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  }

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/40 px-6 py-4 flex justify-between items-center transition-shadow duration-300
        ${scrolled ? "shadow-lg" : ""}
      `}
      aria-label="Main Navigation"
    >
      <h1 className="text-2xl font-bold text-white cursor-default select-none">
        VitorMarques
      </h1>

      {/* Menu desktop */}
      <div className="hidden md:flex space-x-8 text-white font-medium">
        <button onClick={() => scrollToSection("#about")} className="hover:text-green-400 transition">
          Sobre
        </button>
        <button onClick={() => scrollToSection("#projetos")} className="hover:text-green-400 transition">
          Projetos
        </button>
        <button onClick={() => scrollToSection("#contato")} className="hover:text-green-400 transition">
          Contato
        </button>
      </div>

      {/* Botão menu mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isOpen}
        className="md:hidden text-white text-2xl focus:outline-none"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Menu lateral mobile */}
      <div
        className={`
          fixed top-[64px] right-0 w-3/4 max-w-xs bg-black/90 backdrop-blur-md h-full shadow-lg
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          md:hidden
          flex flex-col p-6 space-y-6
          text-white font-medium
        `}
      >
        <button onClick={() => scrollToSection("#projetos")} className="hover:text-green-400 transition text-lg">
          Projetos
        </button>
        <button onClick={() => scrollToSection("#about")} className="hover:text-green-400 transition text-lg">
          Sobre
        </button>
        <button onClick={() => scrollToSection("#contato")} className="hover:text-green-400 transition text-lg">
          Contato
        </button>
      </div>
    </nav>
  );
}
