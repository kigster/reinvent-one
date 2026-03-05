÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷#!/usr/bin/env node
/**
 * Reads kigster.repositories.json and builds openSource data:
 * - Filter repos with stargazers_count > 0
 * - Sort by stars desc
 * - Group by language, with languages as [language] array
 * - Merge in existing name/desc/link/command where repo matches
 */

const fs = require("fs");
const path = require("path");

const repoPath = path.join(__dirname, "..", "kigster.repositories.json");
const data = JSON.parse(fs.readFileSync(repoPath, "utf8"));

// Existing overrides from current openSource (flattened, keyed by repo)
const existingByRepo = {
  "kigster/simple-feed": {
    name: "simple-feed",
    desc: "A complete social activity feed implementation that scales to millions of users, using Redis as the backend with constant read time for each feed consumer.",
  },
  "kigster/sym": {
    name: "sym",
    desc: "Easy-to-use symmetric encryption usi÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷ng AES-256-CBC cipher with a 256-bit key, encrypted with a conveniently cached password.",
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
  "kigster/makeabox.io": {
    name: "makeabox.io",
    desc: "A website for generating PDF layouts for laser cutting.",
    link: "https://makeabox.io/",
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
  },
  "kigster/pullulant": {
    name: "pullulant",
    desc: "Kick start a fresh development environment on any Mac with this opinionated, modular, and customizable installer.",
  },
};

const withStars = data.filter((r) => r.stargazers_count > 0);
withStars.sort((a, b) => b.stargazers_count - a.stargazers_count);

const byLanguage = {};
for (const r of withStars) {
  const lang = r.language || "Other";
  if (!byLanguage[lang]) byLanguage[lang] = [];
  const override = existingByRepo[r.full_name] || {};
  const name = override.name || r.name;
  const desc = override.desc || r.description || "";
  const project = {
    name,
    repo: r.full_name,
    desc: desc.trim(),
    stars: r.stargazers_count,
    url: r.html_url,
  };
  if (override.link) project.link = override.link;
  if (override.command) project.command = override.command;
  byLanguage[lang].push(project);
}

const groups = Object.entries(byLanguage).map(([lang, projects]) => ({
  languages: [lang],
  projects,
}));

function formatProject(p) {
  const lines = [
    `      {`,
    `        name: ${JSON.stringify(p.name)},`,
    `        repo: ${JSON.stringify(p.repo)},`,
    `        desc: ${JSON.stringify(p.desc)},`,
    `        stars: ${p.stars},`,
    `        url: ${JSON.stringify(p.url)},`,
  ];
  if (p.link) lines.push(`        link: ${JSON.stringify(p.link)},`);
  if (p.command) lines.push(`        command: ${JSON.stringify(p.command)},`);
  lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, "");
  lines.push(`      },`);
  return lines.join("\n");
}

const out = [];
out.push("export interface Project {");
out.push("  name: string;");
out.push("  repo: string;");
out.push("  desc: string;");
out.push("  stars: number;");
out.push("  url: string;");
out.push("  link?: string;");
out.push("  command?: string;");
out.push("}");
out.push("");
out.push("export interface LanguageGroup {");
out.push("  languages: string[];");
out.push("  projects: Project[];");
out.push("}");
out.push("");
out.push("export const openSource: LanguageGroup[] = [");
groups.forEach((g, i) => {
  out.push("  {");
  out.push(`    languages: ${JSON.stringify(g.languages)},`);
  out.push("    projects: [");
  g.projects.forEach((p) => out.push(formatProject(p)));
  out.push("    ],");
  out.push("  },");
});
out.push("];");

console.log(out.join("\n"));
