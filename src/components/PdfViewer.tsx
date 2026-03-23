"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { Talk } from "@/data/talks";

interface Props {
  talk: Talk;
  onClose: () => void;
}

export default function PdfViewer({ talk, onClose }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalPages = talk.pages;

  const goNext = useCallback(() => {
    setCurrentPage((p) => Math.min(p + 1, totalPages));
  }, [totalPages]);

  const goPrev = useCallback(() => {
    setCurrentPage((p) => Math.max(p - 1, 1));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, goNext, goPrev]);

  // Mouse wheel navigation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let wheelTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (wheelTimeout) return;
      wheelTimeout = setTimeout(() => {
        wheelTimeout = null;
      }, 300);
      if (e.deltaY > 0) goNext();
      else if (e.deltaY < 0) goPrev();
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [goNext, goPrev]);

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Reset loading state when page changes
  useEffect(() => {
    setLoading(true);
  }, [currentPage]);

  // Build a URL that renders one page of the PDF via the browser's built-in
  // PDF viewer. We embed the PDF in an <iframe> with a page fragment.
  const pdfUrl = `${talk.pdf}#page=${currentPage}&toolbar=0&navpanes=0`;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-[25px]" />

      {/* Modal */}
      <div
        className="relative w-[90vw] h-[90vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden"
        style={{
          boxShadow:
            "0 0 60px 25px rgba(0,0,0,0.75), 0 25px 50px -12px rgba(0,0,0,0.5)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 bg-gray-100 border-b border-gray-200 shrink-0">
          <div className="flex items-center gap-4">
            <h3 className="font-heading text-xl font-semibold text-brand-dark truncate">
              {talk.title}
            </h3>
            <span className="text-sm text-gray-500 whitespace-nowrap">
              Page {currentPage} of {totalPages}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-900 transition-colors text-lg font-bold"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* PDF Content */}
        <div className="flex-1 relative bg-gray-200">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-gray-500">Loading page {currentPage}...</div>
            </div>
          )}
          <iframe
            key={currentPage}
            src={pdfUrl}
            className="w-full h-full border-0"
            title={`${talk.title} - Page ${currentPage}`}
            onLoad={() => setLoading(false)}
          />
        </div>

        {/* Navigation controls on the right */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
          <button
            onClick={goPrev}
            disabled={currentPage <= 1}
            className="w-10 h-10 rounded-full bg-brand-dark/80 text-white flex items-center justify-center hover:bg-brand-dark disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg"
            aria-label="Previous page"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
          <button
            onClick={goNext}
            disabled={currentPage >= totalPages}
            className="w-10 h-10 rounded-full bg-brand-dark/80 text-white flex items-center justify-center hover:bg-brand-dark disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg"
            aria-label="Next page"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
