import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReinventONE — Applied AI & AI-First Engineering",
  description:
    "ReinventONE helps companies integrate AI into their products and workflows. AI strategy, LLM integration, AI-powered product development, and MLOps.",
  icons: {
    icon: "/images/re1/favicon/favicon-32x32.png",
    apple: "/images/re1/favicon/apple-icon-180x180.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-brand-dark text-white antialiased">{children}</body>
    </html>
  );
}
