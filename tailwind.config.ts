/** @type {import('tailwindcss').Config} */
import { withTV } from 'tailwind-variants/transformer'

const config = withTV({
  darkMode: ['class'],
  content: [ "./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
  },
  plugins: [
    require('tailwindcss-animate'),
    require('tailwindcss-react-aria-components')
  ]
})

export default config
