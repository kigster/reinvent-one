"use client";

import { useState } from "react";
import { useSectionNav } from "./SectionContext";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Schedule", href: "#schedule" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Speaking", href: "#speaking" },
  { label: "Open Source", href: "#open-source" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { shownSection, navigateTo } = useSectionNav();

  const handleNav = (href: string) => {
    navigateTo(href.slice(1));
    setMenuOpen(false);
  };

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

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
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
                  className={`text-base font-abel uppercase tracking-wider transition-colors ${
                    isActive
                      ? "text-brand-accent"
                      : "text-gray-300 hover:text-brand-accent"
                  }`}
                  style={{ WebkitTextStroke: "0.4px currentColor" }}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="md:hidden pb-4 border-t border-white/10 pt-4">
            {navLinks.map((link) => {
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
                  className={`block py-2 text-sm font-abel uppercase tracking-wider transition-colors ${
                    isActive
                      ? "text-brand-accent"
                      : "text-gray-300 hover:text-brand-accent"
                  }`}
                  style={{ WebkitTextStroke: "0.4px currentColor" }}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
