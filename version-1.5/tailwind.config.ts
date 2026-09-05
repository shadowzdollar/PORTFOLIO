import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        wood: {
          50: '#faf6f1',
          100: '#f0e6d6',
          200: '#e0cbac',
          300: '#cda87a',
          400: '#be8a55',
          500: '#b07340',
          600: '#9a5c35',
          700: '#7d462e',
          800: '#673a2b',
          900: '#573127',
          950: '#311813',
        },
        cream: {
          50: '#fefcf7',
          100: '#fdf7ea',
          200: '#faeecf',
          300: '#f6e0aa',
          400: '#f0cb7c',
          500: '#ebb555',
          600: '#dc9a2f',
          700: '#b67a24',
          800: '#936024',
          900: '#784f21',
          950: '#412810',
        },
        craft: {
          bg: '#f5efe6',
          paper: '#faf6f1',
          ink: '#2c1810',
          accent: '#b85c38',
          muted: '#8b7355',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'wood-grain': "url('/wood-texture.png')",
        'paper-texture': "url('/paper-texture.png')",
      },
      boxShadow: {
        'wood': '0 4px 20px -4px rgba(88, 49, 39, 0.3)',
        'wood-lg': '0 8px 40px -8px rgba(88, 49, 39, 0.4)',
        'paper': '0 2px 10px -2px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'sway': 'sway 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
