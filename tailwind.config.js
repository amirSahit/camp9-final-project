/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './stories/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: '#038B91',
        green: '#4D9979',
        peach: '#FA9A5D',
        yellow: '#FEBF10',
      },
      borderWidth: {
        3: '3px',
      },
      boxShadow: {
        brutalist: '-5px 5px 0px black',
      },
    },
  },
  plugins: [],
};
