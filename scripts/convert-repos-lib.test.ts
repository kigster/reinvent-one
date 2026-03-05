import { describe, it, expect, beforeAll } from "vitest";
import * as path from "path";
import * as fs from "fs";
import {
  convertRepos,
  filterRepos,
  buildLanguages,
  toComponentRepo,
  inferLanguageFromDescription,
  validSite,
  REQUIRED_REPO,
  type GithubRepo,
} from "./convert-repos-lib";

const FIXTURE_PATH = path.join(
  process.cwd(),
  "src/lib/kigster.repositories.json"
);

function loadFixture(): GithubRepo[] {
  const raw = fs.readFileSync(FIXTURE_PATH, "utf-8");
  return JSON.parse(raw);
}

describe("convert-repos-lib with kigster.repositories.json fixture", () => {
  let fixture: GithubRepo[];

  beforeAll(() => {
    fixture = loadFixture();
  });

  it("loads fixture and it is a non-empty array", () => {
    expect(Array.isArray(fixture)).toBe(true);
    expect(fixture.length).toBeGreaterThan(0);
  });

  it("every fixture item has full_name, name, html_url", () => {
    for (const r of fixture) {
      expect(r).toHaveProperty("full_name");
      expect(r).toHaveProperty("name");
      expect(r).toHaveProperty("html_url");
      expect(typeof r.full_name).toBe("string");
      expect(typeof r.html_url).toBe("string");
    }
  });

  it("convertRepos includes gomoku-ansi-c", () => {
    const result = convertRepos(fixture);
    const found = result.find((p) => p.repo === REQUIRED_REPO);
    expect(found).toBeDefined();
    expect(found!.repo).toBe("kigster/gomoku-ansi-c");
    expect(found!.name).toBe("gomoku-ansi-c");
  });

  it("convertRepos excludes archived and disabled repos", () => {
    const result = convertRepos(fixture);
    const repoNames = result.map((r) => r.repo);
    const archivedOrDisabled = fixture.filter((r) => r.archived || r.disabled);
    for (const r of archivedOrDisabled) {
      expect(repoNames).not.toContain(r.full_name);
    }
  });

  it("convertRepos only includes kigster repos", () => {
    const result = convertRepos(fixture);
    for (const p of result) {
      expect(p.repo.startsWith("kigster/")).toBe(true);
    }
  });

  it("convertRepos returns sorted by stars descending", () => {
    const result = convertRepos(fixture);
    for (let i = 1; i < result.length; i++) {
      expect(result[i].stars).toBeLessThanOrEqual(result[i - 1].stars);
    }
  });

  it("convertRepos output has required ComponentRepo shape", () => {
    const result = convertRepos(fixture);
    for (const p of result) {
      expect(p).toHaveProperty("name");
      expect(p).toHaveProperty("repo");
      expect(p).toHaveProperty("desc");
      expect(p).toHaveProperty("stars");
      expect(p).toHaveProperty("url");
      expect(p).toHaveProperty("homepage");
      expect(p).toHaveProperty("forks");
      expect(p).toHaveProperty("languages");
      expect(p).toHaveProperty("topics");
      expect(Array.isArray(p.languages)).toBe(true);
      expect(Array.isArray(p.topics)).toBe(true);
    }
  });

  it("when language is C++ and CMake, Arduino is added to languages", () => {
    const result = convertRepos(fixture);
    const withCmakeAndCpp = result.filter(
      (p) =>
        p.languages.includes("CMake") &&
        p.languages.includes("C++") &&
        p.languages.includes("Arduino")
    );
    expect(withCmakeAndCpp.length).toBeGreaterThan(0);
  });
});

describe("filterRepos", () => {
  const fixture = loadFixture();

  it("filters out archived repos", () => {
    const archived = fixture.find((r) => r.archived === true);
    if (archived) {
      const filtered = filterRepos(fixture);
      expect(filtered.map((r) => r.full_name)).not.toContain(archived.full_name);
    }
  });

  it("keeps gomoku-ansi-c", () => {
    const filtered = filterRepos(fixture);
    expect(filtered.some((r) => r.full_name === REQUIRED_REPO)).toBe(true);
  });
});

describe("inferLanguageFromDescription", () => {
  it("infers Ruby from gem", () => {
    expect(inferLanguageFromDescription("A ruby gem for X")).toBe("Ruby");
  });
  it("infers C++ from arduino", () => {
    expect(inferLanguageFromDescription("Arduino project")).toBe("C++");
  });
  it("infers C from ansi c", () => {
    expect(inferLanguageFromDescription("ANSI C implementation")).toBe("C");
  });
  it("returns null when no pattern matches", () => {
    expect(inferLanguageFromDescription("Random text")).toBeNull();
  });
});

describe("buildLanguages", () => {
  it("adds Arduino when both CMake and C++ present", () => {
    const repo: GithubRepo = {
      full_name: "kigster/test",
      name: "test",
      html_url: "https://github.com/kigster/test",
      language: "CMake",
      description: "Uses C++ and arduino.",
    };
    const langs = buildLanguages(repo);
    expect(langs).toContain("CMake");
    expect(langs).toContain("C++");
    expect(langs).toContain("Arduino");
  });

  it("uses primary language when no inference", () => {
    const repo: GithubRepo = {
      full_name: "kigster/foo",
      name: "foo",
      html_url: "https://github.com/kigster/foo",
      language: "Ruby",
      description: "Something",
    };
    expect(buildLanguages(repo)).toEqual(["Ruby"]);
  });

  it("adds Chef when project name contains cookbook", () => {
    const repo: GithubRepo = {
      full_name: "kigster/solr-sunspot-cookbook",
      name: "solr-sunspot-cookbook",
      html_url: "https://github.com/kigster/solr-sunspot-cookbook",
      language: "Ruby",
      description: "Something",
    };
    const langs = buildLanguages(repo);
    expect(langs).toContain("Chef");
    expect(langs).toContain("Ruby");
  });
});

describe("validSite", () => {
  it("returns false when homepage is empty", () => {
    expect(
      validSite({
        full_name: "x/y",
        name: "y",
        html_url: "https://github.com/x/y",
        homepage: "",
      } as GithubRepo)
    ).toBe(false);
  });
  it("returns false when homepage equals html_url", () => {
    expect(
      validSite({
        full_name: "x/y",
        name: "y",
        html_url: "https://github.com/x/y",
        homepage: "https://github.com/x/y",
      } as GithubRepo)
    ).toBe(false);
  });
  it("returns true when homepage differs from html_url", () => {
    expect(
      validSite({
        full_name: "x/y",
        name: "y",
        html_url: "https://github.com/x/y",
        homepage: "https://example.com",
      } as GithubRepo)
    ).toBe(true);
  });
});

describe("toComponentRepo", () => {
  it("maps required fields correctly", () => {
    const r: GithubRepo = {
      full_name: "kigster/foo",
      name: "foo",
      description: "Desc",
      html_url: "https://github.com/kigster/foo",
      stargazers_count: 10,
      forks_count: 2,
      language: "Ruby",
      topics: ["a", "b"],
    };
    const out = toComponentRepo(r);
    expect(out.repo).toBe("kigster/foo");
    expect(out.name).toBe("foo");
    expect(out.desc).toBe("Desc");
    expect(out.stars).toBe(10);
    expect(out.forks).toBe(2);
    expect(out.url).toBe("https://github.com/kigster/foo");
    expect(out.languages).toEqual(["Ruby"]);
    expect(out.topics).toEqual(["a", "b"]);
    expect(out.homepage).toBe("");
  });
});
