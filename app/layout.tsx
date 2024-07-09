import { Comfortaa } from 'next/font/google'
import '@/app/globals.css'

const comfortaa = Comfortaa( { subsets: [ 'latin' ] } )

export default function RootLayout ( { children }: { children: React.ReactNode } ) {
	return (
		<html lang="pt-BR">
			<body className={ `${ comfortaa.className } text-sky-900 dark:text-white` } >
				{ children }
			</body>
		</html>
	)
}