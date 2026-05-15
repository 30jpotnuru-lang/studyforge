export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#0066FF',
          600: '#0052CC',
          700: '#003D99'
        },
        secondary: {
          500: '#7C3AED',
          600: '#6D28D9'
        },
        dark: {
          900: '#0F172A',
          950: '#020617'
        },
        accent: '#39FF14'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace']
      }
    }
  },
  plugins: []
}
