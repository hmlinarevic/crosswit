/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
    ],
    // darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                // caveat: ["Caveat"],
                // merriweather: ["Merriweather"],
                // hand: ["Architects Daughter"],
                // ubuntuMono: ["Ubuntu Mono"],
                // sourceCodePro: ["Source Code Pro"],
                ubuntu: ["var(--font-ubuntu)"],
                caveat: ["var(--font-caveat)"],
                righteous: ["var(--font-righteous)"],
                titilliumWeb: ["var(--font-titilliumWeb)"],
                // roboto: ["Roboto"],
            },
            colors: {
                black: "#09080C",
                rose: "#ebbcba",
                love: "#eb6f92",
                muted: "#6e6a86",
                iris: "#c4a7e7",
                gold: "#f6c177",
                foam: "#9ccfd8",
                pine: "#31748f",
            },
        },
        // extend: {
        // },
    },
    // variants: {},
    // plugins: [],
};
