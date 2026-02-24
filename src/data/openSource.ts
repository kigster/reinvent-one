export interface Project {
  name: string;
  repo: string;
  desc: string;
  link?: string;
  command?: string;
}

export interface LanguageGroup {
  language: string;
  projects: Project[];
}

export const openSource: LanguageGroup[] = [
  {
    language: "Ruby",
    projects: [
      {
        name: "simple-feed",
        repo: "kigster/simple-feed",
        desc: "A complete social activity feed implementation that scales to millions of users, using Redis as the backend with constant read time for each feed consumer.",
      },
      {
        name: "sym",
        repo: "kigster/sym",
        desc: "Easy-to-use symmetric encryption using AES-256-CBC cipher with a 256-bit key, encrypted with a conveniently cached password.",
      },
      {
        name: "warp-dir",
        repo: "kigster/warp-dir",
        desc: "A command line utility that lets you bookmark frequently used folders so you can quickly warp (cd) into them.",
        command:
          "gem install warp-dir; warp-dir install --dotfile ~/.bash_profile",
      },
      {
        name: "arli",
        repo: "kigster/arli",
        desc: "Arduino Library manager decoupled from any IDE, with a project generator based on arduino-cmake.",
      },
      {
        name: "ventable",
        repo: "kigster/ventable",
        desc: 'A take on the "Observable" design pattern with Events as first class citizens.',
      },
      {
        name: "laser-cutter",
        repo: "kigster/laser-cutter",
        desc: "Given a 3D box dimension, generates a PDF layout for laser-cut snap-on enclosures. Powers MakeABox.io.",
      },
      {
        name: "makeabox.io",
        repo: "kigster/makeabox.io",
        desc: "A website for generating PDF layouts for laser cutting.",
        link: "https://makeabox.io/",
      },
      {
        name: "sym-crypt",
        repo: "kigster/sym-crypt",
        desc: "Pure encryption routines used by the sym gem.",
      },
      {
        name: "attr_memoized",
        repo: "kigster/attr_memoized",
        desc: "An attribute memoization library that offers thread safety during initialization.",
      },
      {
        name: "register",
        repo: "kigster/register",
        desc: "A tiny library that turns a module into a Facade to application globals via auto-generated module-level methods.",
      },
      {
        name: "dupervisor",
        repo: "kigster/dupervisor",
        desc: "Converts config files between YAML, JSON, and Windows INI format.",
      },
    ],
  },
  {
    language: "C/C++ & Objective-C",
    projects: [
      {
        name: "CMake Project Template",
        repo: "kigster/cmake-project-template",
        desc: "Jump-start C++ projects with a solid CMake/C++ project structure.",
      },
      {
        name: "Back Seat Driver",
        repo: "kigster/back-seat-driver",
        desc: "Obstacle avoidance multi-motor Arduino library for autonomous motion. Supports servo-based bots and DC motors.",
      },
      {
        name: "Gomoku — Five in a Row (iOS)",
        repo: "kigster/kigomoku-ios",
        desc: "An Objective-C/iOS implementation of the popular game. Uses a heuristics engine in ANSI C with Alpha-Beta pruning.",
      },
      {
        name: "Arduino Libraries Collection",
        repo: "kigster/kiguino",
        desc: "Collection of Arduino libraries and wrappers for sensors, rotary knobs, and more.",
      },
      {
        name: "Rotary Encoder with Button",
        repo: "kigster/RotaryEncoderWithButton",
        desc: "A simple wrapper library for reading rotary encoder buttons that incorporate a push button.",
      },
    ],
  },
  {
    language: "BASH",
    projects: [
      {
        name: "bash-it",
        repo: "bash-it/bash-it",
        desc: "Contributed the search functionality to this very popular Bash framework.",
      },
      {
        name: "bashmatic",
        repo: "kigster/bashmatic",
        desc: "A collection of BASH tools and frameworks for multi-purpose scripting, with a runtime framework and ANSI drawing routines.",
      },
      {
        name: "pullulant",
        repo: "kigster/pullulant",
        desc: "Kick start a fresh development environment on any Mac with this opinionated, modular, and customizable installer.",
      },
    ],
  },
];
