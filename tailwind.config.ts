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
          50: '#EFDFCA',
          100: '#EBD2B3',
          200: '#D3B293',
          300: '#D3B293',
          400: '#9C6D48',
          500: '#9C6D48',
          600: '#9C6D48',
          700: '#52392B',
          800: '#52392B',
          900: '#52392B',
          950: '#52392B',
        },
        cream: {
          50: '#fefcf7',
          100: '#EFDFCA',
          200: '#EBD2B3',
          300: '#D3B293',
          400: '#D3B293',
          500: '#9C6D48',
          600: '#9C6D48',
        },
        craft: {
          bg: '#EBD2B3',
          paper: '#EFDFCA',
          ink: '#52392B',
          accent: '#9C6D48',
          muted: '#AF9F90',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'paper': '0 2px 10px -2px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
