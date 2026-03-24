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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pdfDocRef = useRef<unknown>(null);
  const renderTaskRef = useRef<unknown>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const totalPages = talk.pages;

  const goNext = useCallback(() => {
    setCurrentPage((p) => Math.min(p + 1, totalPages));
  }, [totalPages]);

  const goPrev = useCallback(() => {
    setCurrentPage((p) => Math.max(p - 1, 1));
  }, []);

  // Load PDF document once
  useEffect(() => {
    let cancelled = false;

    async function loadPdf() {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

      const doc = await pdfjsLib.getDocument(talk.pdf).promise;
      if (!cancelled) {
        pdfDocRef.current = doc;
        setLoading(false);
      }
    }

    loadPdf();
    return () => { cancelled = true; };
  }, [talk.pdf]);

  // Render current page to canvas
  useEffect(() => {
    const doc = pdfDocRef.current as { getPage: (n: number) => Promise<{
      getViewport: (opts: { scale: number }) => { width: number; height: number };
      render: (ctx: { canvasContext: CanvasRenderingContext2D; viewport: unknown }) => { promise: Promise<void>; cancel: () => void };
    }> } | null;
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!doc || !canvas || !container) return;

    let cancelled = false;

    async function renderPage() {
      // Cancel any in-progress render
      if (renderTaskRef.current) {
        try { (renderTaskRef.current as { cancel: () => void }).cancel(); } catch { /* already done */ }
      }

      const page = await doc!.getPage(currentPage);
      if (cancelled) return;

      const containerWidth = container!.clientWidth;
      const containerHeight = container!.clientHeight;

      // Fit page within container (fit-to-width or fit-to-height, whichever is smaller)
      const unscaledViewport = page.getViewport({ scale: 1 });
      const scaleW = containerWidth / unscaledViewport.width;
      const scaleH = containerHeight / unscaledViewport.height;
      const scale = Math.min(scaleW, scaleH);

      const viewport = page.getViewport({ scale });
      const dpr = window.devicePixelRatio || 1;

      canvas!.width = viewport.width * dpr;
      canvas!.height = viewport.height * dpr;
      canvas!.style.width = `${viewport.width}px`;
      canvas!.style.height = `${viewport.height}px`;

      const ctx = canvas!.getContext("2d")!;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const task = page.render({ canvasContext: ctx, viewport });
      renderTaskRef.current = task;
      await task.promise;
    }

    renderPage();
    return () => { cancelled = true; };
  }, [currentPage, loading]); // loading dependency ensures re-render after doc loads

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

  // Touch swipe navigation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - touchStartRef.current.x;
      const dy = touch.clientY - touchStartRef.current.y;
      touchStartRef.current = null;

      // Only trigger if swipe is more vertical than horizontal and at least 50px
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 50) {
        if (dy < 0) goNext();  // swipe up = next page
        else goPrev();         // swipe down = prev page
      }
      // Horizontal swipe: left = next, right = prev
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        if (dx < 0) goNext();
        else goPrev();
      }
    };

    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [goNext, goPrev]);

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Re-render on resize (orientation change, window resize)
  useEffect(() => {
    const handleResize = () => {
      // Trigger re-render by toggling loading briefly
      if (pdfDocRef.current) {
        setLoading((l) => !l);
        requestAnimationFrame(() => setLoading((l) => !l));
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        className="relative w-[96vw] h-[92vh] sm:w-[90vw] sm:h-[90vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden"
        style={{
          boxShadow:
            "0 0 60px 25px rgba(0,0,0,0.75), 0 25px 50px -12px rgba(0,0,0,0.5)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 sm:px-6 sm:py-3 bg-gray-100 border-b border-gray-200 shrink-0">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <h3 className="font-heading text-base sm:text-xl font-semibold text-brand-dark truncate">
              {talk.title}
            </h3>
            <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
              {currentPage}/{totalPages}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-900 transition-colors text-lg font-bold shrink-0 ml-2"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* PDF Content */}
        <div className="flex-1 relative bg-gray-800 flex items-center justify-center overflow-hidden">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-gray-400">Loading...</div>
            </div>
          )}
          <canvas ref={canvasRef} className="max-w-full max-h-full" />
        </div>

        {/* Navigation controls */}
        <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 sm:gap-3 z-20">
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
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
            onClick={(e) => { e.stopPropagation(); goNext(); }}
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
