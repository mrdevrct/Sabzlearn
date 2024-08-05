/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container:{
        center: true
      },
      fontFamily:{
        danaLight : ['dana-light'],
        danaMedium : ['dana-medium'],
        danaDemibold : ['dana-demibold'],
        danaExtrabold : ['dana-extrabold'],
        IRANSNumber : ['IRANSans_Number'],
      }
    },
  },
  plugins: [],
}

