/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
        // ou crie nomes personalizados:
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

