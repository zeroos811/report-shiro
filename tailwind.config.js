/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#dc2626', dark: '#b91c1c', light: '#fef2f2', border: '#fee2e2' },
        ink:   { DEFAULT: '#0f172a', 2: '#64748b', 3: '#94a3b8' },
        surf:  { DEFAULT: '#f1f5f9', 2: '#e2e8f0' },
      }
    }
  },
  plugins: []
}
