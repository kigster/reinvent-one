"use client";

import { useState } from "react";
import { openSource, type LanguageGroup } from "@/data/openSource";

export default function OpenSource() {
  const [activeTab, setActiveTab] = useState(0);
  const group: LanguageGroup = openSource[activeTab];

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

        {/* Language tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {openSource.map((lang, i) => (
            <button
              key={lang.language}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                i === activeTab
                  ? "bg-brand-accent text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {lang.language}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {group.projects.map((project) => (
            <a
              key={project.repo}
              href={
                project.link || `https://github.com/${project.repo}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 rounded-lg bg-white/5 border border-white/10 hover:border-brand-accent/50 hover:bg-white/10 transition-all group"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-heading text-xl font-semibold group-hover:text-brand-accent transition-colors">
                  {project.name}
                </h3>
                <svg
                  className="w-4 h-4 text-gray-500 shrink-0 mt-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                {project.desc}
              </p>
              <p className="text-xs text-gray-500 mt-2 font-mono">
                {project.repo}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
