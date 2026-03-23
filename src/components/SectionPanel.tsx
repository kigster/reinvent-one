"use client";

import { useSectionNav } from "./SectionContext";

export default function SectionPanel({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { shownSection, phase } = useSectionNav();
  const isActive = id === shownSection;

  if (!isActive) {
    return <div style={{ display: "none" }}>{children}</div>;
  }

  let opacity: number;
  let transition: string;

  if (phase === "fading-out") {
    opacity = 0;
    transition = "opacity 0.5s ease-in-out";
  } else if (phase === "fading-in") {
    opacity = 0;
    transition = "opacity 0.3s ease-in-out";
  } else {
    opacity = 1;
    transition = "opacity 0.3s ease-in-out";
  }

  return (
    <div style={{ opacity, transition }}>
      {children}
    </div>
  );
}
