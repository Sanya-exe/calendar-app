/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spring: {
          primary: '#22c55e',
          bg: '#f0fdf4',
          accent: '#fce7f3',
        },
        summer: {
          primary: '#f97316',
          bg: '#fef3c7',
          accent: '#fef9c3',
        },
        autumn: {
          primary: '#d97706',
          bg: '#fffbeb',
          accent: '#fef3c7',
        },
        winter: {
          primary: '#3b82f6',
          bg: '#eff6ff',
          accent: '#f0f9ff',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
