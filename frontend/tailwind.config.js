/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        panel: "#1e293b",
        primary: "#6366f1",
        accent: "#8b5cf6",
      },
      boxShadow: {
        glow: "0 20px 80px rgba(99, 102, 241, 0.22)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
