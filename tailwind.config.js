/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vault: {
          dark: '#080C0A',       // Deep obsidian canvas with emerald cast
          canvas: '#0A0F0D',     // Primary dark backdrop
          surface: '#0E1712',    // Rich dark forest card surface
          elevated: '#121F18',   // Elevated surface
          border: '#1A3326',     // Rich dark contrast green border
          borderLight: '#264D39',// Luminous emerald border
          green: '#00875A',      // Signature rich contrast green
          greenHover: '#059669', // Hover state
          greenBright: '#10B981',// Vibrant emerald
          greenLuminous: '#34D399', // Mint glow
          textIvory: '#F4FAF6',  // Crisp ivory with cool cast
          textSage: '#8CA899',   // Muted sage secondary text
        },
        cookie: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          150: '#BBF7D0',
          200: '#86EFAC',
          300: '#4ADE80',
          400: '#22C55E',
          500: '#16A34A',
          600: '#15803D',
          700: '#166534',
          800: '#14532D',
          850: '#0F3E22',
          900: '#0A2A17',
          950: '#051A0E',
        },
        dark: {
          950: '#060A08',
          900: '#080C0A',
          850: '#0B120E',
          800: '#0E1712',
          750: '#121E18',
          700: '#172820',
          600: '#1E362B',
          500: '#2A4B3C',
          400: '#3D6853',
        },
      },
      fontFamily: {
        serif: ['"GT Alpina"', '"GT Alpina Workhorse Serif"', '"GT Alpina Fine"', '"Grilli Type"', 'Georgia', 'serif'],
        sans: ['"GT Alpina"', '"GT Alpina Workhorse Serif"', '"GT Alpina Fine"', '"Grilli Type"', 'Georgia', 'serif'],
        display: ['"GT Alpina"', '"GT Alpina Workhorse Serif"', '"GT Alpina Fine"', '"Grilli Type"', 'Georgia', 'serif'],
        mono: ['"GT Alpina"', '"GT Alpina Workhorse Serif"', '"GT Alpina Fine"', '"Grilli Type"', 'Georgia', 'serif'],
      },
      screens: {
        'xs': '420px',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'float-reverse': 'floatReverse 10s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 6s ease-in-out infinite',
        'marquee': 'marquee 35s linear infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-16px) scale(1.03)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(16px) scale(0.97)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
