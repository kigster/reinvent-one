import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#1a1a2e",
          darker: "#16213e",
          accent: "#e94560",
          light: "#f5f5f5",
        },
      },
      fontFamily: {
        heading: ["Teko", "sans-serif"],
        body: ["Open Sans", "sans-serif"],
        abel: ["Abel", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
