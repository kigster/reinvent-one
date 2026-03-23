"use client";

import { useState, useCallback, memo } from "react";
import { talks, type Talk } from "@/data/talks";
import PdfViewer from "./PdfViewer";

function formatSize(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  return mb >= 10 ? `${Math.round(mb)} MB` : `${mb.toFixed(1)} MB`;
}

const TalkCard = memo(function TalkCard({
  talk,
  onSelect,
}: {
  talk: Talk;
  onSelect: (talk: Talk) => void;
}) {
  return (
    <button
      onClick={() => onSelect(talk)}
      className="group flex flex-col text-left rounded-xl overflow-hidden border border-gray-200 hover:border-brand-accent/50 transition-all duration-300 bg-white card-shadow"
    >
      {/* Cover image, blurred */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <img
          src={talk.cover}
          alt={talk.title}
          className="absolute object-cover brightness-90 transition-transform duration-300 group-hover:scale-105"
          style={{ top: "-20px", left: "calc(-7.5% + 40px)", width: "115%", height: "calc(100% + 20px)" }}
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-heading text-3xl font-semibold text-brand-dark mb-2 leading-tight" style={{ fontSize: "2.08rem" }}>
          {talk.title}{" "}
          <span className="text-gray-400 font-normal">[{talk.year}]</span>
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          {talk.excerpt}
        </p>

        {/* Status line */}
        <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
          <span>{talk.pages} pages</span>
          <span>{formatSize(talk.sizeBytes)} PDF</span>
        </div>
      </div>
    </button>
  );
});

export default function PublicSpeaking() {
  const [selectedTalk, setSelectedTalk] = useState<Talk | null>(null);
  const handleSelect = useCallback((talk: Talk) => setSelectedTalk(talk), []);
  const handleClose = useCallback(() => setSelectedTalk(null), []);

  return (
    <section id="speaking" className="relative py-24 bg-gray-200 text-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-5xl sm:text-6xl font-bold text-brand-dark mb-4">
            Public Speaking
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Talks and presentations on software architecture, Ruby, DevOps,
            concurrency, and scaling distributed systems.
          </p>
        </div>

        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8">
          {talks.map((talk) => (
            <TalkCard key={talk.slug} talk={talk} onSelect={handleSelect} />
          ))}
        </div>
      </div>

      {selectedTalk && (
        <PdfViewer talk={selectedTalk} onClose={handleClose} />
      )}
    </section>
  );
}
