"use client";

import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FaGithub } from "react-icons/fa";

ChartJS.register(ArcElement, Tooltip, Legend);

type GitHubProfile = {
  public_repos: number;
  followers: number;
  following: number;
};

type LanguageData = {
  [language: string]: number;
};

export default function GitHubStats({
  username = "MarquesVitor01",
}: {
  username: string;
}) {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [langData, setLangData] = useState<LanguageData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/github");
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Erro ao buscar /api/github: ${text}`);
        }

        const { user, langData } = await res.json();
        setProfile(user);
        setLangData(langData);
      } catch (error) {
        console.error("Erro ao buscar estatísticas do GitHub:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [username]);

  return (
    <section className="py-10 px-6 bg-indigo-900 text-white relative z-20">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Estatísticas do meu GitHub Pessoal
        </h2>
        {loading || !profile ? (
          <div className="text-gray-300 text-sm md:text-base animate-pulse">
            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full mx-auto mb-2 animate-spin" />
            Carregando estatísticas...
          </div>
        ) : (
          <p className="text-gray-300 text-sm md:text-base">
            Possuo {profile.public_repos} repositórios
          </p>
        )}
      </div>

      <div className="flex flex-col items-center max-w-5xl mx-auto">
        <h3 className="text-lg font-semibold mb-4">Linguagens Mais Usadas</h3>

        <div className="w-full max-w-xs h-[250px] flex items-center justify-center ">
          {loading ? (
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Pie
              data={{
                labels: Object.keys(langData),
                datasets: [
                  {
                    data: Object.values(langData),
                    backgroundColor: [
                      "#f87171",
                      "#60a5fa",
                      "#34d399",
                      "#fbbf24",
                      "#c084fc",
                      "#a78bfa",
                      "#f472b6",
                    ],
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    labels: {
                      color: "white",
                      font: { size: 12 },
                    },
                  },
                },
              }}
            />
          )}
        </div>
        <a
          href="https://github.com/MarquesVitor01"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-white hover:text-gray-300 transition text-3xl pt-10"
        >
          <FaGithub />
        </a>
      </div>
    </section>
  );
}
