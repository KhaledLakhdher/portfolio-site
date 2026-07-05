/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1f2933',
        navy: {
          DEFAULT: '#2c3e63',
          600: '#243357',
          700: '#1c2947',
          800: '#141d33',
        },
        accent: '#3b5bdb',
        muted: '#52606d',
        paper: '#f7f8fa',
        line: '#e2e6ec',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        serif: ['Charter', 'Georgia', 'Cambria', 'serif'],
      },
      maxWidth: {
        content: '1120px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
