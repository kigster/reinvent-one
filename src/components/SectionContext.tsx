"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";

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
}

const SectionContext = createContext<SectionNav>({
  shownSection: "hero",
  phase: "idle",
  navigateTo: () => {},
});

export function useSectionNav() {
  return useContext(SectionContext);
}

export function SectionProvider({
  defaultSection = "hero",
  children,
}: {
  defaultSection?: string;
  children: React.ReactNode;
}) {
  const [shownSection, setShownSection] = useState(defaultSection);
  const [phase, setPhase] = useState<Phase>("idle");
  const shownRef = useRef(defaultSection);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigateTo = useCallback((id: string) => {
    if (id === shownRef.current && !timerRef.current) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    setPhase("fading-out");

    timerRef.current = setTimeout(() => {
      shownRef.current = id;
      setShownSection(id);
      setPhase("fading-in");
      window.scrollTo({ top: 0 });

      // Update URL hash without triggering a scroll
      history.replaceState(null, "", id === "hero" ? window.location.pathname : `#${id}`);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPhase("idle");
          timerRef.current = null;
        });
      });
    }, 500);
  }, []);

  // On mount, navigate to the section specified in the URL hash
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && SECTION_IDS.includes(hash)) {
      shownRef.current = hash;
      setShownSection(hash);
    }
  }, []);

  // Intercept all hash-link clicks so every #section link works
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest?.("a[href^='#']");
      if (!anchor) return;
      const hash = anchor.getAttribute("href")?.slice(1);
      if (hash && SECTION_IDS.includes(hash)) {
        e.preventDefault();
        navigateTo(hash);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [navigateTo]);

  return (
    <SectionContext.Provider value={{ shownSection, phase, navigateTo }}>
      {children}
    </SectionContext.Provider>
  );
}
