import { NextResponse } from "next/server";

type GitHubRepo = {
  name: string;
  languages_url: string;
};

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const username = "MarquesVitor01";

  if (!token) {
    return NextResponse.json(
      { error: "Token do GitHub não encontrado." },
      { status: 500 }
    );
  }

  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const user = await userRes.json();
    const repos: GitHubRepo[] = await reposRes.json();

    const langTotals: Record<string, number> = {};

    await Promise.all(
      repos.slice(0, 5).map(async (repo) => {
        const langRes = await fetch(repo.languages_url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!langRes.ok) return;

        const langs: Record<string, number> = await langRes.json();
        for (const [lang, bytes] of Object.entries(langs)) {
          langTotals[lang] = (langTotals[lang] || 0) + bytes;
        }
      })
    );

    return NextResponse.json({ user, langData: langTotals });
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar dados do GitHub" },
      { status: 500 }
    );
  }
}
