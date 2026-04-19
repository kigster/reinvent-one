"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";

declare global {
  interface Window { gtag?: (...args: unknown[]) => void; }
}

export function sendGaEvent(name: string) {
  window.gtag?.("event", name);
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export type TrackAction = "open" | "close";

export function trackClick(section: string, name: string, action: TrackAction = "open") {
  sendGaEvent(`${section}.${action}.${slugify(name)}`);
}

export const SECTION_IDS = [
  "hero",
  "services",
  "about",
  "portfolio",
  "speaking",
  "open-source",
  "contact",
];

type Phase = "idle" | "fading-out" | "fading-in";

interface SectionNav {
  shownSection: string;
  phase: Phase;
  navigateTo: (id: string) => void;
  /** Sub-path within the current section (e.g. talk slug for #speaking/<slug>). */
  subPath: string | null;
  /** Update the sub-path (and the URL) without changing the active section. */
  setSubPath: (sub: string | null) => void;
}

const SectionContext = createContext<SectionNav>({
  shownSection: "hero",
  phase: "idle",
  navigateTo: () => {},
  subPath: null,
  setSubPath: () => {},
});

export function useSectionNav() {
  return useContext(SectionContext);
}

/** Parse a URL hash like "speaking/2026.inquirex" into [section, subPath]. */
function parseHash(rawHash: string): { section: string | null; subPath: string | null } {
  const hash = rawHash.startsWith("#") ? rawHash.slice(1) : rawHash;
  if (!hash) return { section: null, subPath: null };
  const slashIdx = hash.indexOf("/");
  const section = slashIdx === -1 ? hash : hash.slice(0, slashIdx);
  const subPath = slashIdx === -1 ? null : hash.slice(slashIdx + 1) || null;
  return { section, subPath };
}

/** Build the URL hash string for a section + optional sub-path. */
function buildHash(section: string, subPath: string | null): string {
  if (section === "hero" && !subPath) return window.location.pathname;
  return subPath ? `#${section}/${subPath}` : `#${section}`;
}

export function SectionProvider({
  defaultSection = "hero",
  children,
}: {
  defaultSection?: string;
  children: React.ReactNode;
}) {
  const [shownSection, setShownSection] = useState(defaultSection);
  const [subPath, setSubPathState] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const shownRef = useRef(defaultSection);
  const subPathRef = useRef<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigateTo = useCallback((id: string) => {
    if (id === shownRef.current && !timerRef.current && !subPathRef.current) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    trackClick("nav", id);
    setPhase("fading-out");

    timerRef.current = setTimeout(() => {
      shownRef.current = id;
      subPathRef.current = null;
      setShownSection(id);
      setSubPathState(null);
      setPhase("fading-in");
      window.scrollTo({ top: 0 });

      // Section nav always clears any sub-path
      history.replaceState(null, "", buildHash(id, null));

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPhase("idle");
          timerRef.current = null;
        });
      });
    }, 500);
  }, []);

  const setSubPath = useCallback((sub: string | null) => {
    if (sub === subPathRef.current) return;
    subPathRef.current = sub;
    setSubPathState(sub);
    history.replaceState(null, "", buildHash(shownRef.current, sub));
  }, []);

  // On mount, navigate to the section + sub-path specified in the URL hash
  useEffect(() => {
    const { section, subPath: sub } = parseHash(window.location.hash);
    if (section && SECTION_IDS.includes(section)) {
      shownRef.current = section;
      setShownSection(section);
      if (sub) {
        subPathRef.current = sub;
        setSubPathState(sub);
      }
    }
  }, []);

  // Intercept all hash-link clicks so every #section link works
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest?.("a[href^='#']");
      if (!anchor) return;
      const { section } = parseHash(anchor.getAttribute("href") ?? "");
      if (section && SECTION_IDS.includes(section)) {
        e.preventDefault();
        navigateTo(section);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [navigateTo]);

  return (
    <SectionContext.Provider value={{ shownSection, phase, navigateTo, subPath, setSubPath }}>
      {children}
    </SectionContext.Provider>
  );
}
