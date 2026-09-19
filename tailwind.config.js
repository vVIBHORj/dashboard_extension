/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./popup.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          dark: "#0a0b0d",
          panel: "#121418",
          card: "#16181d",
          inner: "#0d0e11"
        },
        border: {
          subtle: "#1f2229",
          muted: "#2a2e38",
          highlight: "#3a3f4d"
        },
        digit: {
          active: "#f5f0db",
          inactive: "#1e2129",
          glow: "rgba(245, 240, 219, 0.4)"
        },
        accent: {
          red: "#ef4444",
          green: "#22c55e",
          amber: "#f59e0b"
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Space Mono"', '"IBM Plex Mono"', 'monospace'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif']
      }
    },
  },
  plugins: [],
}
