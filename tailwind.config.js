/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight : false,
  },
  // important : '#root',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
     
      'lg': '1102px',
      // => @media (min-width: 1024px) { ... }

    }
  }
 
}
