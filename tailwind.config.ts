import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pink: {
          50: "#FDF2F7",
          100: "#FCE8F1",
          200: "#FAD0E4",
          300: "#F6A8CC",
          400: "#EF74AC",
          500: "#E44D91",
          600: "#D42E78",
          700: "#B21E62",
          800: "#931B52",
          900: "#7A1A46",
        },
        navy: {
          50: "#F3F6FB",
          100: "#E4EAF5",
          200: "#C5D2E8",
          300: "#9DB0D2",
          400: "#6B84B0",
          500: "#45608E",
          600: "#32496F",
          700: "#263A5A",
          800: "#1B2A4A",
          900: "#111D38",
        },
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        display: ["'Playfair Display'", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 4px 24px -6px rgba(27, 42, 74, 0.10)",
        lift: "0 12px 32px -8px rgba(27, 42, 74, 0.16)",
        pinkglow: "0 8px 28px -8px rgba(212, 46, 120, 0.45)",
      },
    },
  },
  plugins: [],
};
export default config;
