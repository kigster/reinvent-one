/**
 * Pure conversion logic: GitHub repo array → component repo array.
 * Used by convert-repos-to-component.ts and by unit tests with fixture data.
 */

export const REQUIRED_REPO = "kigster/gomoku-ansi-c" as const;

export interface GithubRepo {
  full_name: string;
  name: string;
  description?: string | null;
  html_url: string;
  homepage?: string | null;
  stargazers_count?: number;
  forks_count?: number;
  language?: string | null;
  archived?: boolean;
  disabled?: boolean;
  owner?: { login?: string };
  license?: { key?: string } | null;
  topics?: string[];
}

export interface ComponentRepo {
  name: string;
  repo: string;
  desc: string;
  stars: number;
  url: string;
  homepage: string;
  forks: number;
  languages: string[];
  topics: string[];
  site?: string;
  license?: string;
}

const LANGUAGE_PATTERNS: [RegExp, string][] = [
  [/\b(ruby|rails|gem)\b/i, "Ruby"],
  [/\b(objective-c|objective c|ios)\b/i, "Objective-C"],
  [/\bswift\b/i, "Swift"],
  [/\b(arduino|cmake|c\+\+|c\/c\+\+)\b/i, "C++"],
  [/\b(ansi c|c language)\b/i, "C"],
  [/\b(typescript|node\.?js)\b/i, "TypeScript"],
  [/\bjavascript\b/i, "JavaScript"],
  [/\bpython\b/i, "Python"],
  [/\b(bash|shell)\b/i, "Shell"],
  [/\bgo\b/i, "Go"],
  [/\brust\b/i, "Rust"],
];

export function inferLanguageFromDescription(description: string): string | null {
  const lower = description.toLowerCase();
  for (const [re, lang] of LANGUAGE_PATTERNS) {
    if (re.test(lower)) return lang;
  }
  return null;
}

export function validSite(repo: GithubRepo): boolean {
  const h = repo.homepage;
  if (!h || typeof h !== "string" || !h.trim()) return false;
  const trimmed = h.replace(/\/$/, "");
  const urlTrimmed = (repo.html_url || "").replace(/\/$/, "");
  return trimmed !== urlTrimmed;
}

export function buildLanguages(repo: GithubRepo): string[] {
  const primary = repo.language || "Other";
  const inferred = inferLanguageFromDescription(repo.description ?? "");
  let langs: string[] =
    inferred && inferred !== primary ? [primary, inferred] : [primary];

  const hasCmake = langs.includes("CMake");
  const hasCpp = langs.includes("C++");
  if (hasCmake && hasCpp && !langs.includes("Arduino")) {
    langs = [...langs, "Arduino"];
  }

  if (/cookbook/i.test(repo.name) && !langs.includes("Chef")) {
    langs = [...langs, "Chef"];
  }

  return Array.from(new Set(langs));
}

export function toComponentRepo(r: GithubRepo): ComponentRepo {
  const languages = buildLanguages(r);
  const desc = (r.description ?? "").trim().replace(/^\s+|\s+$/g, "");
  const out: ComponentRepo = {
    name: r.name,
    repo: r.full_name,
    desc,
    stars: r.stargazers_count ?? 0,
    url: r.html_url,
    homepage: r.homepage ?? "",
    forks: r.forks_count ?? 0,
    languages,
    topics: r.topics ?? [],
  };
  if (r.license?.key) out.license = r.license.key;
  if (validSite(r) && r.homepage) out.site = r.homepage;
  return out;
}

export function filterRepos(repos: GithubRepo[]): GithubRepo[] {
  return repos.filter(
    (r) =>
      !r.archived &&
      !r.disabled &&
      (r.owner?.login === "kigster" || r.full_name?.startsWith("kigster/"))
  );
}

/**
 * Converts and sorts GitHub repos to component shape. Does not read/write files.
 */
export function convertRepos(repos: GithubRepo[]): ComponentRepo[] {
  const filtered = filterRepos(repos);
  return filtered
    .sort((a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0))
    .map(toComponentRepo);
}
