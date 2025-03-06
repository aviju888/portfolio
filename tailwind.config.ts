import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        "fadeIn": "fadeIn 0.5s ease-in-out forwards",
        "blob": "blob 7s infinite",
        "pulse": "pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 8s ease-in-out infinite alternate",
        "scrollBounce": "scrollBounce 2s ease-in-out infinite",
        "gradient-x": "gradient-x 3s ease infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
