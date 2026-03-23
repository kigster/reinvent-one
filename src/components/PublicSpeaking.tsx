"use client";

import { useState, useCallback, memo } from "react";
import { talks, type Talk } from "@/data/talks";
import { trackClick } from "./SectionContext";
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
      className="group flex flex-col text-left rounded-xl overflow-hidden border border-gray-200 hover:border-brand-accent/50 transition-all duration-300 bg-white card-shadow w-full max-w-[500px] h-[500px]"
    >
      {/* Cover image */}
      <div className="relative w-full flex-1 min-h-0 overflow-hidden">
        <img
          src={talk.cover}
          alt={talk.title}
          className="absolute inset-0 w-full h-full object-cover brightness-90 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-8 shrink-0">
        <h3 className="font-heading text-4xl font-semibold text-brand-dark mb-2 leading-tight">
          {talk.title}{" "}
          <span className="text-gray-400 font-normal">[{talk.year}]</span>
        </h3>
        <p className="text-base text-gray-600 leading-relaxed mb-4 line-clamp-3">
          {talk.excerpt}
        </p>

        {/* Status line */}
        <div className="flex items-center justify-between text-sm text-gray-400 pt-3 border-t border-gray-100">
          <span>{talk.pages} pages</span>
          <span>{formatSize(talk.sizeBytes)} PDF</span>
        </div>
      </div>
    </button>
  );
});

export default function PublicSpeaking() {
  const [selectedTalk, setSelectedTalk] = useState<Talk | null>(null);
  const handleSelect = useCallback((talk: Talk) => {
    trackClick("talks", talk.title, "open");
    setSelectedTalk(talk);
  }, []);
  const handleClose = useCallback(() => {
    if (selectedTalk) trackClick("talks", selectedTalk.title, "close");
    setSelectedTalk(null);
  }, [selectedTalk]);

  return (
    <section id="speaking" className="relative py-24 bg-gray-200 text-gray-900">
      <div className="mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-5xl sm:text-6xl font-bold text-brand-dark mb-4">
            Public Speaking
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Talks and presentations on software architecture, Ruby, DevOps,
            concurrency, and scaling distributed systems.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 xl:gap-[50px]">
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
