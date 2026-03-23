import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  slugify,
  sendGaEvent,
  trackClick,
  SECTION_IDS,
  type TrackAction,
} from "./SectionContext";

describe("slugify", () => {
  it("lowercases and hyphenates a title", () => {
    expect(slugify("Thread Safety in Ruby and Rails")).toBe(
      "thread-safety-in-ruby-and-rails"
    );
  });

  it("strips leading and trailing hyphens", () => {
    expect(slugify("--hello--")).toBe("hello");
  });

  it("collapses multiple non-alphanumeric chars into one hyphen", () => {
    expect(slugify("From Obvious to Ingenious — Scaling Web Apps")).toBe(
      "from-obvious-to-ingenious-scaling-web-apps"
    );
  });

  it("handles commas and special punctuation", () => {
    expect(slugify("Behold, the Unix Command Line")).toBe(
      "behold-the-unix-command-line"
    );
  });

  it("preserves digits", () => {
    expect(slugify("Concurrency in Ruby 3")).toBe("concurrency-in-ruby-3");
  });

  it("returns empty string for empty input", () => {
    expect(slugify("")).toBe("");
  });

  it("handles input that is only special characters", () => {
    expect(slugify("!@#$%^&*()")).toBe("");
  });
});

describe("sendGaEvent", () => {
  let gtagSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    gtagSpy = vi.fn();
    window.gtag = gtagSpy;
  });

  afterEach(() => {
    delete window.gtag;
  });

  it("calls window.gtag with 'event' and the name", () => {
    sendGaEvent("nav.open.services");
    expect(gtagSpy).toHaveBeenCalledWith("event", "nav.open.services");
  });

  it("does not throw when window.gtag is undefined", () => {
    delete window.gtag;
    expect(() => sendGaEvent("anything")).not.toThrow();
  });
});

describe("trackClick", () => {
  let gtagSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    gtagSpy = vi.fn();
    window.gtag = gtagSpy;
  });

  afterEach(() => {
    delete window.gtag;
  });

  it("sends section.slug.open by default", () => {
    trackClick("talks", "Thread Safety in Ruby and Rails");
    expect(gtagSpy).toHaveBeenCalledWith(
      "event",
      "talks.open.thread-safety-in-ruby-and-rails"
    );
  });

  it("sends section.slug.close when action is close", () => {
    trackClick("client", "Wealthfront", "close");
    expect(gtagSpy).toHaveBeenCalledWith(
      "event",
      "client.close.wealthfront"
    );
  });

  it("sends section.slug.open explicitly", () => {
    trackClick("oss", "Bashmatic", "open");
    expect(gtagSpy).toHaveBeenCalledWith("event", "oss.open.bashmatic");
  });

  it("handles names with special characters", () => {
    trackClick("client", "CFAEA (503c) Organization", "open");
    expect(gtagSpy).toHaveBeenCalledWith(
      "event",
      "client.open.cfaea-503c-organization"
    );
  });

  it("handles nav section ids directly", () => {
    trackClick("nav", "open-source");
    expect(gtagSpy).toHaveBeenCalledWith("event", "nav.open.open-source");
  });

  const actions: TrackAction[] = ["open", "close"];
  for (const action of actions) {
    it(`accepts '${action}' as a valid action`, () => {
      trackClick("talks", "Test", action);
      expect(gtagSpy).toHaveBeenCalledWith("event", `talks.${action}.test`);
    });
  }
});

describe("SECTION_IDS", () => {
  it("contains all expected sections", () => {
    expect(SECTION_IDS).toContain("hero");
    expect(SECTION_IDS).toContain("services");
    expect(SECTION_IDS).toContain("about");
    expect(SECTION_IDS).toContain("portfolio");
    expect(SECTION_IDS).toContain("speaking");
    expect(SECTION_IDS).toContain("open-source");
    expect(SECTION_IDS).toContain("contact");
  });

  it("has exactly 7 sections", () => {
    expect(SECTION_IDS).toHaveLength(7);
  });
});
