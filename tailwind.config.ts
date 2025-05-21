import { text } from "stream/consumers";
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        btn: {
          primary: "#95c7dc",
          secondary: "#e2eff9",
          textPrimary: "#4f5063",
        },
        themeDark: "#2596be",
        theme: {
          primary: "#4F5063",
        },
        bgLight: "#2595be12",
        uae: {
          primary: "#95C7DC", // Updated to match Salik primary
          secondary: "#7bb7d1", // Updated to match Salik secondary
          accent: "#99c7e0", // Updated to match Salik accent
          red: "#FF0000", // Red accent from UAE flag
          green: "#00763B", // Green accent from UAE flag
          light: "#f7f9fc", // Updated to match Salik light background
          dark: "#051C3B", // Dark navy for backgrounds
        },
        brand: {
          blue: "#1e88e5",
          red: "#ea384c",
          "red-light": "#ffdee2",
          peach: "#fde1d3",
        },
        pastel: {
          pink: "#ffdee2",
          peach: "#fde1d3",
          red: "#ea384c",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        dubai: {
          blue: "#0EA5E9",
          gold: "#F59E0B",
          navy: "#1E3A8A",
          slate: "#0F172A",
          light: "#E0F2FE",
        },
        tesla: {
          dark: "#0A1929",
          card: "#0F2942",
          accent: "#00C8FF",
        },
        salik: {
          primary: "#374151",
          secondary: "#4B5563",
          light: "#F3F4F6",
          dark: "#111827",
          accent: "#60A5FA",
          muted: "#9CA3AF",
          border: "#E5E7EB",
          background: "#F9FAFB",
          foreground: "#374151",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "car-rotate": {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(360deg)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 15px 2px rgba(96, 165, 250, 0.5)" },
          "50%": { boxShadow: "0 0 25px 5px rgba(96, 165, 250, 0.8)" },
        },
        "pulse-gentle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "car-rotate": "car-rotate 5s ease-in-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "slide-in": "slide-in 0.5s ease-out forwards",
        glow: "glow 3s infinite",
        "pulse-gentle": "pulse-gentle 2s infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "dubai-gradient": "linear-gradient(135deg, #0EA5E9 0%, #1E3A8A 100%)",
        "salik-gradient": "linear-gradient(135deg, #4B5563 0%, #374151 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
