"use client";

import { useMemo, memo, useState } from "react";
import type { RepoProject } from "@/lib/openSourceData";
import { trackClick } from "./SectionContext";

function projectNameColor(stars: number): string {
  if (stars > 500) return "text-orange-400";
  if (stars > 250) return "text-yellow-400";
  if (stars > 50) return "text-amber-200";
  return "text-white";
}

/** GitHub repo stargazers URL (stars link to this). */
function stargazersUrl(repoUrl: string): string {
  return repoUrl.replace(/\/?$/, "") + "/stargazers";
}

type Props = { projects: RepoProject[] };

const ALL_LANGUAGES = "All";

export default function OpenSource({ projects }: Props) {
  const [languageFilter, setLanguageFilter] = useState<string>(ALL_LANGUAGES);

  const { favorites, others, languages } = useMemo(() => {
    const fav: RepoProject[] = [];
    const oth: RepoProject[] = [];
    const langSet = new Set<string>();
    for (const p of projects) {
      if (p.favorite) fav.push(p);
      else oth.push(p);
      for (const lang of p.languages) langSet.add(lang);
    }
    const langList = Array.from(langSet).sort((a, b) => a.localeCompare(b));
    return { favorites: fav, others: oth, languages: langList };
  }, [projects]);

  const filteredFavorites = useMemo(() => {
    if (languageFilter === ALL_LANGUAGES) return favorites;
    return favorites.filter((p) =>
      p.languages.some((l) => l.toLowerCase() === languageFilter.toLowerCase())
    );
  }, [favorites, languageFilter]);

  const filteredOthers = useMemo(() => {
    if (languageFilter === ALL_LANGUAGES) return others;
    return others.filter((p) =>
      p.languages.some((l) => l.toLowerCase() === languageFilter.toLowerCase())
    );
  }, [others, languageFilter]);

  return (
    <section
      id="open-source"
      className="relative py-24 bg-brand-darker text-white"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-5xl sm:text-6xl font-bold mb-4">
            Open Source
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A passion for open source, with contributions spanning multiple
            languages and ecosystems.
          </p>
        </div>

        {/* Language filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setLanguageFilter(ALL_LANGUAGES)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              languageFilter === ALL_LANGUAGES
                ? "bg-brand-accent text-white"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            All
          </button>
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguageFilter(lang)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                languageFilter === lang
                  ? "bg-brand-accent text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {filteredFavorites.length > 0 && (
          <div className="mb-14">
            <h3 className="font-heading text-2xl font-semibold mb-6 text-white">
              Favorite Projects
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFavorites.map((project) => (
                <ProjectCard key={project.repo} project={project} favorite />
              ))}
            </div>
          </div>
        )}

        {filteredOthers.length > 0 && (
          <div>
            <h3 className="font-heading text-xl font-semibold mb-6 text-gray-300">
              More Projects
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {filteredOthers.map((project) => (
                <ProjectCard key={project.repo} project={project} favorite={false} />
              ))}
            </div>
          </div>
        )}

        {filteredFavorites.length === 0 && filteredOthers.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            No projects match the selected language.
          </p>
        )}
      </div>
    </section>
  );
}

const ProjectCard = memo(function ProjectCard({
  project,
  favorite = false,
}: {
  project: RepoProject;
  favorite?: boolean;
}) {
  const nameColor = projectNameColor(project.stars);
  const starsUrl = stargazersUrl(project.url);

  return (
    <div
      className={`flex flex-col p-5 rounded-lg border transition-all duration-200 ease-out group min-h-[280px] ${
        favorite
          ? "bg-white/12 border-white/15 hover:border-brand-accent/50 hover:bg-white/15 hover:scale-[1.15] hover:z-10 origin-center"
          : "bg-white/5 border-white/10 hover:border-brand-accent/50 hover:bg-white/10"
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackClick("oss", project.name)}
          className={`font-heading text-xl font-semibold hover:underline transition-colors ${nameColor}`}
        >
          {project.name}
        </a>
        <div className="flex items-center gap-1.5 shrink-0">
          {project.site && (
            <a
              href={project.site}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded text-gray-400 hover:text-brand-accent transition-colors"
              title="External site"
              aria-label={`Open ${project.name} site`}
            >
              <ExternalSiteIcon className="w-4 h-4" />
            </a>
          )}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded text-gray-400 hover:text-white transition-colors"
            title="View on GitHub"
            aria-label={`${project.name} on GitHub`}
          >
            <GitHubIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
      <p className="text-sm text-gray-400 leading-relaxed mb-3 flex-1 min-h-0">
        {project.desc}
      </p>

      {project.languages.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2 items-center shrink-0">
          {project.languages.map((lang) => (
            <span
              key={lang}
              className="px-2 py-0.5 rounded-full text-xs font-medium bg-white/15 text-gray-400 whitespace-nowrap"
            >
              {lang}
            </span>
          ))}
        </div>
      )}

      {project.topics && project.topics.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2 shrink-0">
          {project.topics.slice(0, 6).map((topic) => (
            <span
              key={topic}
              className="px-1.5 py-0.5 rounded text-xs text-gray-500 bg-white/5"
            >
              {topic}
            </span>
          ))}
          {project.topics.length > 6 && (
            <span className="text-xs text-gray-500">
              +{project.topics.length - 6}
            </span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between gap-2 mt-auto flex-wrap shrink-0 pt-2 border-t border-white/10">
        <p className="text-xs text-gray-500 font-mono truncate min-w-0">
          {project.repo}
        </p>
        <div className="flex items-center gap-3 shrink-0">
          {typeof project.forks === "number" && (
            <span className="text-sm font-medium text-gray-400">
              {project.forks} fork{project.forks !== 1 ? "s" : ""}
            </span>
          )}
          {project.license && (
            <span className="text-xs text-gray-500 uppercase">
              {project.license}
            </span>
          )}
          <a
            href={starsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-400 hover:text-amber-400 transition-colors flex items-center gap-1"
            title="Stargazers on GitHub"
            aria-label={`${project.stars} stars on GitHub`}
          >
            <StarIcon className="w-4 h-4 shrink-0" style={{ color: "#FFDD00" }} />
            <span>{project.stars.toLocaleString()}</span>
          </a>
        </div>
      </div>
    </div>
  );
});

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function ExternalSiteIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}

function StarIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      className={className}
      style={style}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.909 1.48-8.279-6.064-5.828 8.332-1.151z" />
    </svg>
  );
}
