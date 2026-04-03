/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          DEFAULT: '#00F5FF',
          400: '#00F5FF',
          500: '#00D4E1',
          600: '#00B8C8',
        },
        violet: {
          DEFAULT: '#7C3AED',
          400: '#9B6FFF',
          500: '#7C3AED',
          600: '#6D28D9',
        },
        dark: {
          DEFAULT: '#0A0A0F',
          50: '#13131A',
          100: '#1A1A24',
          200: '#22222E',
        }
      },
      fontFamily: {
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 3s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #00F5FF, 0 0 10px #00F5FF, 0 0 20px #00F5FF' },
          '100%': { boxShadow: '0 0 10px #00F5FF, 0 0 25px #00F5FF, 0 0 50px #00F5FF' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
