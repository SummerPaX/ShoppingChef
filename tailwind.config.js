const { collapseTextChangeRangesAcrossMultipleVersions } = require("typescript");
const colors = require("tailwindcss/colors");

module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				gray: colors.neutral,
			},
			transitionProperty: {
				height: "height",
				spacing: "margin, padding",
				"opacity-transform": "opacity, transform",
			},
			animation: {
				wiggle: "wiggle 1s ease-in-out infinite",
				"bounce-up": "bounce-up 1s ease-in-out infinite",
				"bounce-right": "bounce-right 1s ease-in-out infinite",
				"bounce-left": "bounce-left 1s ease-in-out infinite",
				"slide-up": "slide-up 0.5s ease-in-out",
			},
			keyframes: {
				wiggle: {
					"0%, 100%": { transform: "rotate(-3deg)" },
					"50%": { transform: "rotate(3deg)" },
				},
				"bounce-up": {
					"0%, 100%": {
						transform: "translateY(0%)",
						"animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
					},
					"50%": {
						transform: "translateY(25%)",
						"animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
					},
				},
				"bounce-right": {
					"0%, 100%": {
						transform: "translateX(0%)",
						"animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
					},
					"50%": {
						transform: "translateX(25%)",
						"animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
					},
				},
				"bounce-left": {
					"0%, 100%": {
						transform: "translateX(0%)",
						"animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
					},
					"50%": {
						transform: "translateX(-25%)",
						"animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
					},
				},
				"slide-up": {
					"0%": {
						transform: "translateY(25%)",
						opacity: "0%",
						"animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
					},
					"100%": {
						transform: "translateY(0%)",
						opacity: "100%",
						"animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
					},
				},
			},
		},
	},
	plugins: [],
};
