"use client";

import Image from "next/image";
import { useState } from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";

export default function Contato() {
  const fullName = "Vitor Marques Silva";
  const email = "marque.vitor47@gmail.com";
  const telefoneWhatsApp = "+5511940518638";
  const numero = "11 940518638";
  const [form, setForm] = useState({ nome: "", mensagem: "" });

  const whatsappLink = () => {
    const msg = encodeURIComponent(
      `Olá, meu nome é ${form.nome} e gostaria de entrar em contato: ${form.mensagem}`
    );
    return `https://wa.me/${telefoneWhatsApp.replace(/\D/g, "")}?text=${msg}`;
  };

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <section
      id="contato"
      aria-label="Seção de contato"
      className="w-full min-h-[600px]flex justify-center items-center px-6 py-20 relative z-20 "
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="max-w-6xl w-full bg-white/10 backdrop-blur-md rounded-3xl  p-10 flex flex-col md:flex-row gap-10">
        <div className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/2 gap-6">
          <div
            className="rounded-full  shadow-lg cursor-default w-40 h-40 relative"
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "rotateY(0deg) rotateX(0deg) scale(1)";
            }}
          >
            <Image
              src="/vitor_bg.jpg"
              alt={`Foto de perfil de ${fullName}`}
              fill
              className="rounded-full object-cover"
              priority
            />
          </div>

          <h2 className="text-4xl font-bold text-white">{fullName}</h2>
          <p className="text-neutral-300">
            Desenvolvedor Full Stack / Software Engineer
          </p>
          <p className="text-neutral-400">{email}</p>
          <p className="text-neutral-400">{numero}</p>

          <div className="flex space-x-8 text-white text-3xl">
            <a
              href="https://github.com/MarquesVitor01"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-gray-300 transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/vitor-marques-9199ab17a"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-gray-300 transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.instagram.com/__marques.v/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-gray-300 transition"
            >
              <FaInstagram />
            </a>
          </div>

          <a
            href="/Curriculo_Vitor_Marques_Silva.pdf"
            download="Curriculo_Vitor_Marques_Silva.pdf"
            className="mt-6 bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition shadow-md"
          >
            Download Currículo
          </a>
        </div>
        <form
          className="md:w-1/2 bg-white/20 backdrop-blur-sm rounded-xl p-6 flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            window.open(whatsappLink(), "_blank");
          }}
        >
          <h3 className="text-3xl font-semibold text-white mb-4 text-center">
            Contato via WhatsApp
          </h3>

          <label className="flex flex-col text-white text-sm font-medium">
            Seu nome:
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Digite seu nome"
              required
              className="mt-1 p-3 rounded-md border border-neutral-400 bg-white/30 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>

          <label className="flex flex-col text-white text-sm font-medium">
            Sua mensagem:
            <textarea
              name="mensagem"
              value={form.mensagem}
              onChange={handleChange}
              placeholder="Escreva sua mensagem"
              required
              rows={5}
              className="mt-1 p-3 rounded-md border border-neutral-400 bg-white/30 text-black resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-full transition shadow-md"
            aria-label="Enviar mensagem via WhatsApp"
          >
            <FaWhatsapp size={20} />
            Enviar pelo WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
}
