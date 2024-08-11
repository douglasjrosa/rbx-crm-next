import { Comfortaa } from 'next/font/google'
import '@/app/globals.css'

const comfortaa = Comfortaa( { subsets: [ 'latin' ] } )

export default function RootLayout ( { children }: { children: React.ReactNode } ) {
	
	const defaultClasses = "text-sky-900 dark:text-white max-w-screen max-h-screen w-screen h-screen overflow-hidden"
	const bgClasses = "bg-gradient-to-tl from-blue-200 to-sky-100 dark:from-black dark:to-blue-950"

	return (
		<html lang="pt-BR">
			<body className={ `${ comfortaa.className } ${ defaultClasses } ${ bgClasses }` } >
				{ children }
			</body>
		</html>
	)
}