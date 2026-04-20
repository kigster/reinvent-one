"use client";

import { useEffect, useRef, useState } from "react";
import { useSectionNav } from "./SectionContext";

type OverflowLink = {
  label: string;
  href: string;
  topCls: string;
  dropCls: string;
};

type PermanentLink = {
  label: string;
  href: string;
  external?: boolean;
  sectionId?: string;
};

const overflowLinks: OverflowLink[] = [
  { label: "Services", href: "#services", topCls: "hidden md:inline-block", dropCls: "md:hidden" },
  { label: "Portfolio", href: "#portfolio", topCls: "hidden md:inline-block", dropCls: "md:hidden" },
  { label: "Speaking", href: "#speaking", topCls: "hidden lg:inline-block", dropCls: "lg:hidden" },
  { label: "Open Source", href: "#open-source", topCls: "hidden lg:inline-block", dropCls: "lg:hidden" },
  { label: "Schedule", href: "#schedule", topCls: "hidden xl:inline-block", dropCls: "xl:hidden" },
];

const permanentLinks: PermanentLink[] = [
  { label: "Founder", href: "#about", sectionId: "about" },
  { label: "Contact", href: "#contact", sectionId: "contact" },
  { label: "Blog", href: "#blog", external: true },
];

export default function Header() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const { shownSection, navigateTo } = useSectionNav();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!aboutOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAboutOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAboutOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [aboutOpen]);

  const handleNav = (href: string) => {
    navigateTo(href.slice(1));
    setAboutOpen(false);
  };

  const openBlog = () => {
    window.open("https://kig.re/", "_blank", "noopener,noreferrer");
    setAboutOpen(false);
  };

  const aboutActive = shownSection === "about";
  const textStroke = { WebkitTextStroke: "0.4px currentColor" as const };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/90 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              navigateTo("hero");
            }}
            className="flex items-center gap-2"
          >
            <img
              src="/images/re1/logos/reinvent-one-logo-890x242-on-dark.png"
              alt="ReinventONE"
              className="h-12"
            />
          </a>

          <nav className="flex items-center gap-4 sm:gap-6 md:gap-7 lg:gap-8">
            {overflowLinks.map((link) => {
              const sectionId = link.href.slice(1);
              const isActive = shownSection === sectionId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(link.href);
                  }}
                  className={`${link.topCls} text-base font-abel uppercase tracking-wider transition-colors ${
                    isActive ? "text-brand-accent" : "text-gray-300 hover:text-brand-accent"
                  }`}
                  style={textStroke}
                >
                  {link.label}
                </a>
              );
            })}

            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setAboutOpen((o) => !o)}
                aria-haspopup="true"
                aria-expanded={aboutOpen}
                className={`flex items-center gap-1 cursor-pointer text-base font-abel uppercase tracking-wider transition-colors ${
                  aboutActive ? "text-brand-accent" : "text-gray-300 hover:text-brand-accent"
                }`}
                style={textStroke}
              >
                About
                <svg
                  className={`w-3 h-3 transition-transform ${aboutOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {aboutOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 min-w-[200px] bg-brand-dark border border-white/10 rounded shadow-xl py-2"
                >
                  {overflowLinks.map((link) => {
                    const sectionId = link.href.slice(1);
                    const isActive = shownSection === sectionId;
                    return (
                      <a
                        key={`drop-${link.href}`}
                        href={link.href}
                        role="menuitem"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNav(link.href);
                        }}
                        className={`${link.dropCls} block px-4 py-2 text-sm font-abel uppercase tracking-wider transition-colors ${
                          isActive
                            ? "text-brand-accent"
                            : "text-gray-300 hover:text-brand-accent hover:bg-white/5"
                        }`}
                        style={textStroke}
                      >
                        {link.label}
                      </a>
                    );
                  })}

                  <div className="xl:hidden border-t border-white/10 my-1" />

                  {permanentLinks.map((link) => {
                    if (link.external) {
                      return (
                        <a
                          key={`drop-${link.label}`}
                          href={link.href}
                          role="menuitem"
                          onClick={(e) => {
                            e.preventDefault();
                            openBlog();
                          }}
                          className="block px-4 py-2 text-sm font-abel uppercase tracking-wider text-gray-300 hover:text-brand-accent hover:bg-white/5 transition-colors"
                          style={textStroke}
                        >
                          {link.label}
                        </a>
                      );
                    }
                    const isActive = link.sectionId === shownSection;
                    return (
                      <a
                        key={`drop-${link.label}`}
                        href={link.href}
                        role="menuitem"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNav(link.href);
                        }}
                        className={`block px-4 py-2 text-sm font-abel uppercase tracking-wider transition-colors ${
                          isActive
                            ? "text-brand-accent"
                            : "text-gray-300 hover:text-brand-accent hover:bg-white/5"
                        }`}
                        style={textStroke}
                      >
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
