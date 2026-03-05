#!/usr/bin/env node
/**
 * Reads kigster.repositories.json and builds openSource.ts:
 * - Flat Project[] sorted by stars descending
 * - site from homepage when present and not empty
 * - languages from repo.languages or [repo.language]
 * - Merges in name/desc/site overrides from existingByRepo
 */

const fs = require("fs");
const path = require("path");

const repoPath = path.join(__dirname, "..", "kigster.repositories.json");
const data = JSON.parse(fs.readFileSync(repoPath, "utf8"));

const existingByRepo = {
  "kigster/simple-feed": {
    name: "simple-feed",
    desc: "A complete social activity feed implementation that scales to millions of users, using Redis as the backend with constant read time for each feed consumer.",
  },
  "kigster/sym": {
    name: "sym",
    desc: "Easy-to-use symmetric encryption using AES-256-CBC cipher with a 256-bit key, encrypted with a conveniently cached password.",
  },
  "kigster/warp-dir": {
    name: "warp-dir",
    desc: "A command line utility that lets you bookmark frequently used folders so you can quickly warp (cd) into them.",
    command: "gem install warp-dir; warp-dir install --dotfile ~/.bash_profile",
  },
  "kigster/arli": {
    name: "arli",
    desc: "Arduino Library manager decoupled from any IDE, with a project generator based on arduino-cmake.",
  },
  "kigster/ventable": {
    name: "ventable",
    desc: 'A take on the "Observable" design pattern with Events as first class citizens.',
  },
  "kigster/laser-cutter": {
    name: "laser-cutter",
    desc: "Given a 3D box dimension, generates a PDF layout for laser-cut snap-on enclosures. Powers MakeABox.io.",
  },
  "kigster/makeabox": {
    name: "makeabox",
    desc: "MakeABox – use this app with a laser cutter to create a box with notches that connect all sides together.",
    site: "https://makeabox.io/",
  },
  "kigster/sym-crypt": {
    name: "sym-crypt",
    desc: "Pure encryption routines used by the sym gem.",
  },
  "kigster/attr_memoized": {
    name: "attr_memoized",
    desc: "An attribute memoization library that offers thread safety during initialization.",
  },
  "kigster/register": {
    name: "register",
    desc: "A tiny library that turns a module into a Facade to application globals via auto-generated module-level methods.",
  },
  "kigster/dupervisor": {
    name: "dupervisor",
    desc: "Converts config files between YAML, JSON, and Windows INI format.",
  },
  "kigster/cmake-project-template": {
    name: "CMake Project Template",
    desc: "Jump-start C++ projects with a solid CMake/C++ project structure.",
  },
  "kigster/back-seat-driver": {
    name: "Back Seat Driver",
    desc: "Obstacle avoidance multi-motor Arduino library for autonomous motion. Supports servo-based bots and DC motors.",
  },
  "kigster/kigomoku-ios": {
    name: "Gomoku — Five in a Row (iOS)",
    desc: "An Objective-C/iOS implementation of the popular game. Uses a heuristics engine in ANSI C with Alpha-Beta pruning.",
  },
  "kigster/kiguino": {
    name: "Arduino Libraries Collection",
    desc: "Collection of Arduino libraries and wrappers for sensors, rotary knobs, and more.",
  },
  "kigster/RotaryEncoderWithButton": {
    name: "Rotary Encoder with Button",
    desc: "A simple wrapper library for reading rotary encoder buttons that incorporate a push button.",
  },
  "kigster/bashmatic": {
    name: "bashmatic",
    desc: "A collection of BASH tools and frameworks for multi-purpose scripting, with a runtime framework and ANSI drawing routines.",
    site: "https://bashmatic.dev",
  },
  "kigster/pullulant": {
    name: "pullulant",
    desc: "Kick start a fresh development environment on any Mac with this opinionated, modular, and customizable installer.",
  },
};

const withStars = data.filter((r) => (r.stargazers_count || 0) > 0);
withStars.sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));

function validSite(repo) {
  const h = repo.homepage;
  if (!h || typeof h !== "string") return null;
  const t = h.trim();
  if (!t) return null;
  if (t === repo.html_url || t.replace(/\/$/, "") === repo.html_url) return null;
  return t;
}

// Collect all languages from JSON: array, or object (GitHub API shape), or single language
function allLanguagesFromRepo(r) {
  if (Array.isArray(r.languages) && r.languages.length > 0) {
    return r.languages;
  }
  if (r.languages && typeof r.languages === "object" && !Array.isArray(r.languages)) {
    return Object.keys(r.languages);
  }
  if (r.language) {
    return [r.language];
  }
  return [];
}

const projects = withStars.map((r) => {
  const override = existingByRepo[r.full_name] || {};
  const name = override.name || r.name;
  const desc = override.desc || (r.description || "").trim();
  const site = override.site !== undefined ? override.site : validSite(r);
  const languages = allLanguagesFromRepo(r);
  const project = {
    name,
    repo: r.full_name,
    desc,
    stars: r.stargazers_count || 0,
    url: r.html_url,
    languages: languages.length ? languages : ["Other"],
  };
  if (site) project.site = site;
  if (override.command) project.command = override.command;
  return project;
});

function formatProject(p) {
  const lines = [
    `  {`,
    `    name: ${JSON.stringify(p.name)},`,
    `    repo: ${JSON.stringify(p.repo)},`,
    `    desc: ${JSON.stringify(p.desc)},`,
    `    stars: ${p.stars},`,
    `    url: ${JSON.stringify(p.url)},`,
    `    languages: ${JSON.stringify(p.languages)},`,
  ];
  if (p.site) lines.push(`    site: ${JSON.stringify(p.site)},`);
  if (p.command) lines.push(`    command: ${JSON.stringify(p.command)},`);
  lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, "");
  lines.push(`  },`);
  return lines.join("\n");
}

const out = [];
out.push('export interface Project {');
out.push('  name: string;');
out.push('  repo: string;');
out.push('  desc: string;');
out.push('  stars: number;');
out.push('  url: string;');
out.push('  site?: string;');
out.push('  command?: string;');
out.push('  languages: string[];');
out.push('}');
out.push('');
out.push('export const openSource: Project[] = [');
projects.forEach((p) => out.push(formatProject(p)));
out.push('];');
out.push('');

const outPath = path.join(__dirname, "..", "src", "data", "openSource.ts");
fs.writeFileSync(outPath, out.join("\n"), "utf8");
console.error("Wrote", outPath, "with", projects.length, "projects");
