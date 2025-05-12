/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e40af',
          light: '#60a5fa',
          dark: '#1e3a8a'
        },
        secondary: {
          DEFAULT: '#d97706',
          light: '#fbbf24',
          dark: '#b45309'
        },
        neutral: {
          DEFAULT: '#6b7280',
          light: '#d1d5db',
          dark: '#374151'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif']
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp')
  ]
}
