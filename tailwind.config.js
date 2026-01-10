/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
      },
      colors: {
        primary: {
          DEFAULT: '#FFD700',
          hover: '#1D1D1D',
        },
        'primary-hover': '#1D1D1D',
        'text-default': '#1D1D1D',
        'text-primary-hover': '#FFD700',
      },
      fontFamily: {
        body: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
  include: ["src", "vite-env.d.ts"]
};
