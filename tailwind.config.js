/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#0D0724',
          900: '#150B33',
          800: '#221252',
          700: '#2F1B6E',
        },
        coral: '#FF5470',
        sunny: '#FFB726',
        mint: '#2EE6A8',
        sky: '#4CC9F0',
        lilac: '#B388FF',
        tangerine: '#FF8A3D',
        cream: '#FFF6E9',
        ink: '#150B33',
      },
      fontFamily: {
        display: ['"Lilita One"', '"Baloo 2"', 'system-ui', 'sans-serif'],
        body: ['"Baloo 2"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        sticker: '5px 5px 0 rgba(13, 7, 36, 0.9)',
        'sticker-sm': '3px 3px 0 rgba(13, 7, 36, 0.9)',
        'sticker-glow': '5px 5px 0 rgba(13, 7, 36, 0.9), 0 0 24px rgba(46, 230, 168, 0.5)',
      },
    },
  },
  plugins: [],
}
