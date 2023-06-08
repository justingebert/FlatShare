/** @type {import('tailwindcss').Config} */

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  pruge: ['./views/**/*.ejs'],
  content: ['./views/**/*.ejs'],
  theme: {
    extend: {
      colors: {
        'primary1': '#FFAD05',
        'primary2': '#5995ED',
        'secondary1': '#FCFF4B',
        'secondary2': '#7CAFC4',
        'background': '#1F2421'
      }
    },
  },
  plugins: [
  {
  tailwindcss: {},
  autoprefixer: {},
  },
  ],
  };

//npx tailwindcss -i ./styles/tailwind.css -o ./public/css/styles.css --watch