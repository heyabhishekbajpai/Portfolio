/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#3915ac',
                secondary: '#785bec',
                accent: '#21a2f2',
            },
            fontFamily: {
                sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
