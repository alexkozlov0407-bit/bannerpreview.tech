/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        discord: {
          canvas: '#1e1f22',
          panel: '#2b2d31',
          elevated: '#313338',
          muted: '#949ba4',
          faint: '#b5bac1',
          blurple: '#5865f2',
          green: '#23a559'
        }
      },
      boxShadow: {
        panel: '0 18px 42px rgba(0, 0, 0, .28)'
      }
    }
  },
  plugins: []
}
