import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      colors: {
        // Apple-inspired palette
        apple: {
          black: "#1D1D1F",
          "gray-1": "#F5F5F7",
          "gray-2": "#FBFBFD",
          "gray-3": "#E8E8ED",
          "gray-4": "#D2D2D7",
          "gray-5": "#86868B",
          "gray-6": "#6E6E73",
          "gray-7": "#515154",
          blue: "#0066CC",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "slide-in-right": "slideInRight 0.6s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, #E8E8ED 1px, transparent 1px), linear-gradient(to bottom, #E8E8ED 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      boxShadow: {
        "apple-sm": "0 2px 8px rgba(0,0,0,0.08)",
        apple: "0 4px 16px rgba(0,0,0,0.10)",
        "apple-lg": "0 8px 32px rgba(0,0,0,0.12)",
        "apple-xl": "0 16px 48px rgba(0,0,0,0.14)",
      },
      transitionTimingFunction: {
        apple: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
    },
  },
  plugins: [],
};

export default config;
