/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#409eff',
        navGray: '#999999',
        'tag竞赛': '#67c23a',
        'tag考研': '#e6a23c',
        'tag运动': '#f56c6c',
        textLight: '#999',
      },
      borderRadius: {
        'card': '12px',
        'search': '20px',
        'btn': '8px',
        'nav': '16px',
      }
    },
  },
  plugins: [],
}