const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
    // mode: "jit",
    content: [],
    purge: [
        "./src/**/*.{js,jsx,ts,tsx,vue}",
        "./plugins/**/*.{js,jsx,ts,tsx,vue}",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#38927f",
                    light: "#6BC3AE",
                    dark: "#006453",
                },
                button: {
                    primary: "#1BC47D",
                },
                danger: "#EB7575",
                info: "#EAAB7E",
                success: "#76BD7D",
                internet: "#5F65FF",
                disabled: colors.gray["500"],
            },
        },
    },
    plugins: [],
};