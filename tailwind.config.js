// tailwind.config.js

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
				'porto3': "url('/mapamundi1.webp')"
			} )
		},
	},
	darkMode: 'class', // This enables dark mode based on the 'dark' class
	variants: {
		extend: {
			backgroundColor: [ 'locked', 'show-menu' ],
			textColor: [ 'locked', 'show-menu' ],
			opacity: [ 'locked', 'show-menu' ],
			pointerEvents: [ 'locked', 'show-menu' ],
		},
	},
	plugins: [
		function ( { addVariant, e } )
		{
			addVariant( 'locked', ( { modifySelectors, separator } ) =>
			{
				modifySelectors( ( { className } ) =>
				{
					return `.locked .${ e( `locked${ separator }${ className }` ) }`
				} )
			} ),
				addVariant( 'show-menu', ( { modifySelectors, separator } ) =>
				{
					modifySelectors( ( { className } ) =>
					{
						return `.show-menu .${ e( `show-menu${ separator }${ className }` ) }`
					} )
				} )
		},
	],
}
