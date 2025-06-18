"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-neutral-950 text-neutral-400 text-sm py-6 px-4 flex flex-col md:flex-row items-center justify-between border-t border-neutral-800 relative z-20">
      <p className="text-center md:text-left mb-2 md:mb-0">
        © {new Date().getFullYear()} Vitor Marques Silva. Todos os direitos reservados.
      </p>

      <div className="flex gap-4">
        <a
          href="https://github.com/MarquesVitor01"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/vitor-marques-9199ab17a"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
        >
          LinkedIn
        </a>
        <a
          href="mailto:marque.vitor47@gmail.com"
          className="hover:text-white transition"
        >
          E-mail
        </a>
      </div>
    </footer>
  );
}
