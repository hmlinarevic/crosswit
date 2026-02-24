module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./context/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        fontFamily: {
            caveat: ["Caveat"],
            righteous: ["Righteous"],
            merriweather: ["Merriweather"],
            hand: ["Architects Daughter"],
            ubuntu: ["Ubuntu"],
            ubuntuMono: ["Ubuntu Mono"],
            sourceCodePro: ["Source Code Pro"],
            titilliumWeb: ["Titillium Web"],
            roboto: ["Roboto"],
        },
        extend: {
            colors: {
                base: "#09080C",
                black: "#09080C",
                rose: "#ebbcba",
                love: "#eb6f92",
                muted: "#6e6a86",
                iris: "#c4a7e7",
                gold: "#f6c177",
                foam: "#9ccfd8",
                pine: "#31748f"
            },
        },
    },
    variants: {},
    plugins: [],
};
