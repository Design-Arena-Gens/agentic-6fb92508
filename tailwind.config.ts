import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5fbff",
          100: "#e1f1ff",
          200: "#bddfff",
          300: "#8ac6ff",
          400: "#56a3ff",
          500: "#2f7fff",
          600: "#1c58db",
          700: "#153fb0",
          800: "#14368c",
          900: "#162f72"
        }
      }
    }
  },
  plugins: []
};

export default config;
