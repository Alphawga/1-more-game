import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        "energy-orange": "var(--color-energy-orange)",
        "trust-blue": "var(--color-trust-blue)",
        
        // Secondary Colors
        "victory-gold": "var(--color-victory-gold)",
        "digital-black": "var(--color-digital-black)",
        
        // Accent Colors
        "growth-green": "var(--color-growth-green)",
        "alert-red": "var(--color-alert-red)",
        
        // Neutral Colors
        "cloud-white": "var(--color-cloud-white)",
        "pure-white": "var(--color-pure-white)",
        "charcoal": "var(--color-charcoal)",
        
        // Hover states
        "energy-orange-hover": "var(--color-energy-orange-hover)",
        "trust-blue-hover": "var(--color-trust-blue-hover)",
        
        // Disabled states
        "energy-orange-disabled": "var(--color-energy-orange-disabled)",
        "trust-blue-disabled": "var(--color-trust-blue-disabled)",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'gradient-x': 'gradient-x 3s ease infinite',
        'gradient-y': 'gradient-y 3s ease infinite',
        'gradient-xy': 'gradient-xy 3s ease infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      backgroundSize: {
        '200': '200% 200%',
      },
    },
  },
  plugins: [],
} satisfies Config;
