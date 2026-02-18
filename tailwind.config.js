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
                cyber: {
                    bg: '#050508',
                    surface: '#0d0d14',
                    border: '#1a1a2e',
                    cyan: '#00d4ff',
                    purple: '#7c3aed',
                    text: '#f0f0f0',
                    muted: '#6b7280',
                    glow: 'rgba(0, 212, 255, 0.15)',
                },
            },
            fontFamily: {
                sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
                mono: ['JetBrains Mono', 'Space Mono', 'monospace'],
                display: ['Space Mono', 'JetBrains Mono', 'monospace'],
                body: ['DM Sans', 'sans-serif'],
            },
            animation: {
                'scanline': 'scanline 8s linear infinite',
                'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
                'blink': 'blink 1s step-end infinite',
                'fade-up': 'fade-up 0.6s ease-out forwards',
            },
            keyframes: {
                scanline: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100%)' },
                },
                'glow-pulse': {
                    '0%': { boxShadow: '0 0 5px rgba(0, 212, 255, 0.1), inset 0 0 5px rgba(0, 212, 255, 0.05)' },
                    '100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.2), inset 0 0 10px rgba(0, 212, 255, 0.1)' },
                },
                blink: {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0 },
                },
                'fade-up': {
                    '0%': { opacity: 0, transform: 'translateY(30px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
}
