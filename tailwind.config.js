module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./context/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: ["class", "class"],
    theme: {
    	fontFamily: {
    		caveat: [
    			'"Caveat"',
    			'cursive'
    		],
    		righteous: [
    			'"Righteous"',
    			'sans-serif'
    		],
    		merriweather: [
    			'Merriweather'
    		],
    		hand: [
    			'Architects Daughter'
    		],
    		ubuntu: [
    			'Ubuntu'
    		],
    		ubuntuMono: [
    			'Ubuntu Mono'
    		],
    		sourceCodePro: [
    			'Source Code Pro'
    		],
    		titilliumWeb: [
    			'Titillium Web'
    		],
    		roboto: [
    			'Roboto'
    		],
    		outfit: [
    			'"Outfit"',
    			'sans-serif'
    		],
    		dmSans: [
    			'"DM Sans"',
    			'sans-serif'
    		],
    		firaCode: [
    			'"Fira Code"',
    			'monospace'
    		],
    		rubikDoodleShadow: [
    			'"Rubik Doodle Shadow"',
    			'sans-serif'
    		],
    		rampartOne: [
    			'"Rampart One"',
    			'sans-serif'
    		],
    		audiowide: [
    			'Audiowide',
    			'sans-serif'
    		]
    	},
    	extend: {
    		colors: {
    			// Rosé Pine palette (https://rosepinetheme.com/palette/ingredients/)
    			ink: '#0e0d12', /* darker than base for background */
    			base: '#ffffff', /* main content background (light for readability) */
    			baseDark: '#191724', /* original dark base for cards/surfaces */
    			surface: '#1f1d2e',
    			overlay: '#26233a',
    			subtle: '#908caa',
    			text: '#e0def4',
    			rose: '#ebbcba',
    			love: '#eb6f92',
    			gold: '#f6c177',
    			foam: '#9ccfd8',
    			pine: '#31748f',
    			iris: '#c4a7e7',
    			highlight: {
    				low: '#21202e',
    				med: '#403d52',
    				high: '#524f67'
    			},
    			black: '#191724',
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			// Rosé Pine muted (hex alias for palette consistency)
    			rpMuted: '#6e6a86',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		}
    	}
    },
    variants: {},
    plugins: [require("tailwindcss-animate")],
};
