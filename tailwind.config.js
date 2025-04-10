/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        jakarta: ['var(--font-jakarta)', 'sans-serif'],
        handwriting: ['var(--font-handwriting)', 'cursive'],
        serif_human: ['Gloock', 'serif'], // Add Gloock here if needed globally
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Add the typography plugin here
  ],
} 