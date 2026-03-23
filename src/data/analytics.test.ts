import { describe, it, expect } from "vitest";
import { slugify, SECTION_IDS } from "@/components/SectionContext";
import { talks } from "./talks";
import { clients } from "./clients";

// GA4 event names: max 40 chars, alphanumeric + underscores,
// must start with a letter. We use dots as delimiters which GA4 allows.
// Verify our generated event names are well-formed.
const GA4_EVENT_RE = /^[a-z][a-z0-9._-]+$/;

describe("GA event names from talks data", () => {
  it("talks array is non-empty", () => {
    expect(talks.length).toBeGreaterThan(0);
  });

  for (const talk of talks) {
    const slug = slugify(talk.title);

    it(`"${talk.title}" slugifies to a non-empty string`, () => {
      expect(slug.length).toBeGreaterThan(0);
    });

    it(`talks.${slug}.open is a valid GA4 event name`, () => {
      const eventName = `talks.open.${slug}`;
      expect(eventName).toMatch(GA4_EVENT_RE);
    });

    it(`talks.${slug}.close is a valid GA4 event name`, () => {
      const eventName = `talks.close.${slug}`;
      expect(eventName).toMatch(GA4_EVENT_RE);
    });
  }

  it("all talk slugs are unique", () => {
    const slugs = talks.map((t) => slugify(t.title));
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("GA event names from clients data", () => {
  it("clients array is non-empty", () => {
    expect(clients.length).toBeGreaterThan(0);
  });

  for (const client of clients) {
    const slug = slugify(client.name);

    it(`"${client.name}" slugifies to a non-empty string`, () => {
      expect(slug.length).toBeGreaterThan(0);
    });

    it(`client.${slug}.open is a valid GA4 event name`, () => {
      const eventName = `client.open.${slug}`;
      expect(eventName).toMatch(GA4_EVENT_RE);
    });
  }

  it("all client slugs are unique", () => {
    const slugs = clients.map((c) => slugify(c.name));
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("GA event names from nav sections", () => {
  for (const id of SECTION_IDS) {
    it(`nav.${id}.open is a valid GA4 event name`, () => {
      const eventName = `nav.open.${id}`;
      expect(eventName).toMatch(GA4_EVENT_RE);
    });
  }
});
