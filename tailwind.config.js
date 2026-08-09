/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#d71920',
          container: '#fff1ec',
          'on-container': '#251913',
        },
        surface: {
          DEFAULT: '#fff8f6',
          dim: '#ecd5cc',
          bright: '#fff8f6',
          container: {
            lowest: '#ffffff',
            low: '#fff1ec',
            high: '#f6e6e0',
            highest: '#f1e0d9',
          }
        },
        on: {
          surface: '#251913',
          'surface-variant': '#52443d',
        },
        outline: {
          DEFAULT: '#85736b',
          variant: '#d7c2b9',
        }
      },
      fontFamily: {
        display: ['Rubik', 'sans-serif'],
        body: ['Rubik', 'sans-serif'],
      },
      borderRadius: {
        'eight': '8px',
      },
      spacing: {
        'margin-desktop': '80px',
        'margin-mobile': '20px',
        'stack-loose': '40px',
        'stack-tight': '12px',
      }
    },
  },
  plugins: [],
}
