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
			backgroundImage: theme => ( {
				'porto1': "url('/porto1.jpg')",
				'porto2': "url('/porto2.jpg')",
				'porto3': "url('/porto3.jpg')",
				'mapamundi1': "url('/mapamundi1.webp')"
			} )
		},
	},
	darkMode: 'class', // This enables dark mode based on the 'dark' class
	plugins: [],
}