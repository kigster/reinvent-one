/** Shared type for open source repo data (used by generated data and openSourceData). */
export interface RepoProject {
  name: string;
  repo: string;
  desc: string;
  stars: number;
  url: string;
  site?: string;
  command?: string;
  languages: string[];
  favorite?: boolean;
  homepage?: string;
  forks?: number;
  license?: string;
  topics?: string[];
}
