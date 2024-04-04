/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f35627',
        secondary: 'rgb(45 27 21)',
        'secondary-light': 'rgb(55 36 31)',
        'secondary-lighter': '#7E736F',
        'primary-light': 'rgb(251 109 17)',
        'primary-lightest': '#FFF8F0',
        'grey-light': 'rgb(246 246 246)',
        'grey-dark': 'rgb(202 198 196)',
        'grey-darker': 'rgb(202 198 196)',
        'grey-darkest': 'rgb(140 155 165)',
      },
      fontFamily: {
        butler: ['Butler', 'sans-serif'],
        'font-hk': ['hk_grotesk', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
