"use client";

import { useEffect, useState, useRef } from "react";

const codeLines = [
  `"use client";`,
  ``,
  `import Image from "next/image";`,
  `import { useEffect, useState } from "react";`,
  `import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";`,
  `import CodeBackground from "@/app/components/CodeBackground";`,
  ``,
  `export default function Hero() {`,
  `  const fullName = "Vitor Marques";`,
  `  const [displayedText, setDisplayedText] = useState("");`,
  ``,
  `  useEffect(() => {`,
  `    let currentIndex = 0;`,
  ``,
  `    function type() {`,
  `      if (currentIndex < fullName.length) {`,
  `        const charToAdd = fullName.charAt(currentIndex);`,
  `        setDisplayedText((prev) => prev + charToAdd);`,
  `        currentIndex++;`,
  `        setTimeout(type, 150);`,
  `      }`,
  `    }`,
  ``,
  `    type();`,
  `  }, []);`,
  ``,
  `  return (`,
  `    <section`,
  `      id="home"`,
  `      className="relative min-h-[calc(100vh-64px)] flex justify-center items-center bg-gradient-to-r from-green-800 via-black-600 to-blue-800 py-5 px-6"`,
  `      aria-label="Seção principal de apresentação"`,
  `    >`,
  `      <CodeBackground />`,
  ``,
  `      <div className="relative max-w-4xl w-full flex flex-col justify-center items-center text-center px-6 pt-24 pb-16 rounded-3xl bg-white/10 backdrop-blur-md shadow-[0_10px_30px_rgba(0,255,128,0.3),0_20px_50px_rgba(0,128,255,0.2)] transform perspective-[1000px]">`,
  `        <h2 className="text-lg text-gray-300 mb-3 tracking-wide">Olá, eu sou</h2>`,
  ``,
  `        <h1`,
  `          className="text-5xl md:text-7xl font-extrabold mb-6 border-r-4 border-white pr-4 animate-caret-blink drop-shadow-lg"`,
  `          aria-label={fullName}`,
  `        >`,
  `          {displayedText}`,
  `        </h1>`,
  ``,
  `        <div`,
  `          className="rounded-full border-4 border-white shadow-lg mb-8 cursor-pointer transition-transform duration-500 ease-in-out transform-style-preserve-3d"`,
  `          onMouseMove={(e) => {`,
  `            const rect = e.currentTarget.getBoundingClientRect();`,
  `            const x = e.clientX - rect.left - rect.width / 2;`,
  `            const y = e.clientY - rect.top - rect.height / 2;`,
  `            e.currentTarget.style.transform = \`rotateY(\${x / 25}deg) rotateX({-y / 25}deg) scale(1.05)\`;`,
  `          }}`,
  `          onMouseLeave={(e) => {`,
  `            e.currentTarget.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";`,
  `          }}`,
  `        >`,
  `          <Image`,
  `            src="/vitor_bg.jpg"`,
  `            alt="Foto de perfil de Vitor Marques"`,
  `            width={180}`,
  `            height={180}`,
  `            className="rounded-full"`,
  `            priority`,
  `          />`,
  `        </div>`,
  ``,
  `        <div className="flex space-x-8 mb-8">`,
  `          <a`,
  `            href="https://github.com/seuusuario"`,
  `            target="_blank"`,
  `            rel="noopener noreferrer"`,
  `            aria-label="GitHub"`,
  `            className="text-white hover:text-gray-300 transition text-3xl"`,
  `          >`,
  `            <FaGithub />`,
  `          </a>`,
  `          <a`,
  `            href="https://linkedin.com/in/seuusuario"`,
  `            target="_blank"`,
  `            rel="noopener noreferrer"`,
  `            aria-label="LinkedIn"`,
  `            className="text-white hover:text-gray-300 transition text-3xl"`,
  `          >`,
  `            <FaLinkedin />`,
  `          </a>`,
  `          <a`,
  `            href="https://twitter.com/seuusuario"`,
  `            target="_blank"`,
  `            rel="noopener noreferrer"`,
  `            aria-label="Twitter"`,
  `            className="text-white hover:text-gray-300 transition text-3xl"`,
  `          >`,
  `            <FaTwitter />`,
  `          </a>`,
  `        </div>`,
  ``,
  `        <div className="flex flex-wrap justify-center gap-5">`,
  `          <a`,
  `            href="#contato"`,
  `            className="bg-white text-indigo-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition shadow-md"`,
  `          >`,
  `            Contato`,
  `          </a>`,
  `          <a`,
  `            href="#projetos"`,
  `            className="border border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-800 transition shadow-md"`,
  `          >`,
  `            Projetos`,
  `          </a>`,
  `          <a`,
  `            href="/curriculo.pdf"`,
  `            target="_blank"`,
  `            rel="noopener noreferrer"`,
  `            className="bg-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition shadow-md text-white"`,
  `          >`,
  `            Currículo`,
  `          </a>`,
  `        </div>`,
  `      </div>`,
  `    </section>`,
  `  );`,
  `}`,
];

export default function CodeBackground() {
  const [displayedLines, setDisplayedLines] = useState<string[]>(
    Array(codeLines.length).fill("")
  );
  const [cursorVisible, setCursorVisible] = useState(true);
  const timeoutIds = useRef<NodeJS.Timeout[]>([]);
  const isMounted = useRef(true);

  useEffect(() => {
    async function typeLine(line: string, index: number) {
      for (let i = 0; i <= line.length; i++) {
        if (!isMounted.current) return;
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          newLines[index] = line.substring(0, i);
          return newLines;
        });
        await new Promise((res) => {
          timeoutIds.current.push(setTimeout(res, 30));
        });
      }
    }

    async function runAnimation() {
      while (isMounted.current) {
        for (let i = 0; i < codeLines.length; i++) {
          await typeLine(codeLines[i], i);
          await new Promise((res) => {
            timeoutIds.current.push(setTimeout(res, 600));
          });
        }
        await new Promise((res) => {
          timeoutIds.current.push(setTimeout(res, 1000));
        });
        if (!isMounted.current) break;
        setDisplayedLines(Array(codeLines.length).fill(""));
      }
    }

    runAnimation();

    const cursorInterval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);

    return () => {
      isMounted.current = false;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timeoutIds.current.forEach(clearTimeout);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <pre
      aria-hidden="true"
      className="
        pointer-events-none
        select-none
        fixed inset-0
        overflow-hidden
        p-6
        bg-black/90
        font-mono
        text-sm
        opacity-30
        z-0
        whitespace-pre-wrap
        leading-5
        text-green-300
      "
    >
      {displayedLines.map((line, i) => (
        <div key={i} className="break-words whitespace-pre-wrap">
          {line || "\u00A0"}
        </div>
      ))}
      <div className="h-4">
        {cursorVisible ? (
          <span className="inline-block w-2 bg-green-400 animate-blink"></span>
        ) : (
          <span className="inline-block w-2 h-4"></span>
        )}
      </div>

      <style>{`
        @keyframes blink {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-start infinite;
          height: 1em;
        }
      `}</style>
    </pre>
  );
}
