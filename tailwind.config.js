/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				comfortaa: [ 'Comfortaa', 'sans-serif' ]
			},
		},
	},
	darkMode: 'class', // This enables dark mode based on the 'dark' class
	plugins: [],
}