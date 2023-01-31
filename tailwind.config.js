/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
      extend: {
          colors: {
              'sv-blue-1': '#F3F9FF',
              'sv-blue-2': '#DEF0FF',
              'sv-blue-3': '#C6E4FF',
              'sv-blue-4': '#47A9FF',
              'sv-blue-5': '#004078',
              'sv-green-1': '#66DA53',
              'sv-placeholder': '#C7C7C7',
          },
          dropShadow: {
              'sv-login': '0 0 20px rgba(71, 169, 255, 0.39)',
          },
          borderRadius: {
              'sv-login-input': '25px',
          },
      },
  },

  plugins: [],
};
