"use client";

import { useState, useMemo } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { allProjects } from "@/app/data/projects";
import "react-datepicker/dist/react-datepicker.css";

const filters = ["Todos", "Web", "Mobile"];

export default function ProjectGallery() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);

  const projectsPerPage = 3;

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchSearch = project.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchFilter =
        selectedFilter === "Todos" || project.type === selectedFilter;
      return matchSearch && matchFilter;
    });
  }, [searchTerm, selectedFilter]);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  function handlePageChange(next: boolean) {
    setCurrentPage((prev) =>
      next ? Math.min(prev + 1, totalPages) : Math.max(prev - 1, 1)
    );
  }

  return (
    <section
      id="projetos"
      className="w-full bg-neutral-950 py-20 px-4 text-white flex flex-col items-center relative z-20"
    >
      <div className="max-w-6xl w-full text-center mb-10">
        <p className="text-sm text-neutral-400 uppercase tracking-wide">
          Portfólio
        </p>
        <h2 className="text-4xl font-bold mt-2">Projetos Recentes</h2>
      </div>

      <div className="flex flex-wrap gap-4 justify-center mb-10">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => {
              setSelectedFilter(filter);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full border ${
              selectedFilter === filter
                ? "bg-white text-black"
                : "border-white text-white hover:bg-white hover:text-black"
            } transition-all`}
          >
            {filter}
          </button>
        ))}

        <input
          type="text"
          placeholder="Buscar por título..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 rounded-full bg-neutral-800 border border-neutral-600 text-sm text-white placeholder:text-neutral-400 outline-none"
        />
      </div>
      <div className="py-5">
      <p className="text-sm text-neutral-400 uppercase tracking-wide text-center">
        Clicando sobre o projeto, você será direcionado ao respectivo repositório no GitHub
      </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {paginatedProjects.map((project) => (
          <div
            key={project.id}
            className="bg-neutral-900 rounded-xl p-4 border border-neutral-800 flex flex-col"
          >
            <Link href={project.url} target="_blank" rel="noopener noreferrer">
              <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden block hover:opacity-80 transition-opacity">
                <Image
                  src={project.image}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            </Link>

            <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
            <p className="text-sm text-neutral-400 mb-1">
              {project.type} • {project.date}
            </p>
            <p className="text-sm text-neutral-300 mb-3">
              {project.description}
            </p>

            <div className="text-sm text-neutral-300">
              <p className="mb-1 text-neutral-400">Tecnologias utilizadas:</p>
              <ul className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <li
                    key={idx}
                    className="px-3 py-1 rounded-full bg-neutral-800 border border-neutral-700 text-xs"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Paginação */}
      <div className="flex items-center justify-center gap-4 mt-12">
        <button
          onClick={() => handlePageChange(false)}
          disabled={currentPage === 1}
          className="p-2 rounded-full border border-white hover:bg-white hover:text-black disabled:opacity-30 transition-all"
        >
          <FaChevronLeft />
        </button>
        <span className="text-sm text-neutral-400">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(true)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-full border border-white hover:bg-white hover:text-black disabled:opacity-30 transition-all"
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
}
