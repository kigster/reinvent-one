import type { RepoProject } from "./openSourceTypes";
import { openSourceProjects } from "./openSourceData.generated";

export type { RepoProject } from "./openSourceTypes";

/** Favorite repos (full_name), shown first in their own panel, in this order. */
const FAVORITES = [
  "kigster/gomoku-ansi-c",
  "kigster/simple-feed",
  "kigster/cmake-project-template",
  "kigster/colored2",
  "kigster/puma-daemon",
  "kigster/back-seat-driver",
  "kigster/arli",
  "kigster/bashmatic",
  "kigster/laser-cutter",
  "kigster/makeabox",
] as const;

/**
 * Infers extra languages from repo name (case-insensitive):
 * - "arduino" in name → add "Arduino" if missing
 * - "cookbook" in name → add "Chef" if missing
 */
function inferLanguagesFromRepoName(project: RepoProject): RepoProject {
  const repoLower = project.repo.toLowerCase();
  const languages = [...project.languages];
  if (repoLower.includes("arduino") && !languages.some((l) => l.toLowerCase() === "arduino")) {
    languages.push("Arduino");
  }
  if (repoLower.includes("cookbook") && !languages.some((l) => l.toLowerCase() === "chef")) {
    languages.push("Chef");
  }
  if (languages.length === project.languages.length) return project;
  return { ...project, languages };
}

/**
 * Returns open source projects: favorites first (in FAVORITES order), then the rest by stars desc.
 * Data is generated at build time from component.repositories.json via `just convert`.
 * Languages are augmented from repo name (arduino → Arduino, cookbook → Chef).
 */
export function getOpenSourceProjects(): RepoProject[] {
  const isFavorite = (repo: string) => FAVORITES.includes(repo as (typeof FAVORITES)[number]);
  const withInferred = (p: RepoProject, favorite: boolean) =>
    inferLanguagesFromRepoName({ ...p, favorite });
  const favorites = FAVORITES.map((repo) => openSourceProjects.find((p) => p.repo === repo)).filter(
    (p): p is RepoProject => p != null
  ).map((p) => withInferred(p, true));
  const others = openSourceProjects
    .filter((p) => !isFavorite(p.repo))
    .sort((a, b) => b.stars - a.stars)
    .map((p) => withInferred(p, false));
  return [...favorites, ...others];
}
