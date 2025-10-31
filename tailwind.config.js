/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vintage: {
          darker: '#23170f',
          dark: '#2a2722',
          medium: '#3d352f',
          light: '#fef3c7',
          accent: '#d97706',
          'accent-light': '#f59e0b',
          'accent-dark': '#ea580c',
        }
      },
      fontFamily: {
        'serif': ['Source Serif 4', 'serif'],
      }
    },
  },
  plugins: [],
}
