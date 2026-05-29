/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vesak: {
          night: "#07111f",
          deep: "#130a2e",
          gold: "#f8d37a",
          ember: "#ff9e45",
          candle: "#fff3c9",
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(248, 211, 122, 0.24)",
        ember: "0 0 30px rgba(255, 158, 69, 0.2)",
      },
      backgroundImage: {
        "vesak-radial": "radial-gradient(circle at top, rgba(248,211,122,0.18), transparent 45%), radial-gradient(circle at bottom right, rgba(255,158,69,0.16), transparent 35%), linear-gradient(180deg, #07111f 0%, #130a2e 100%)",
      },
      keyframes: {
        floatUp: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -18px, 0)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.65", transform: "scale(0.94)" },
          "50%": { opacity: "1", transform: "scale(1.06)" },
        },
        drift: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": { transform: "translate3d(12px, -18px, 0)" },
        },
      },
      animation: {
        "float-up": "floatUp 6s ease-in-out infinite",
        "glow-pulse": "glowPulse 3.5s ease-in-out infinite",
        drift: "drift 11s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};