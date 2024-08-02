"use client"
import { useEffect, useState } from "react"

export default function MainContent ( { children }: { children: React.ReactNode } ) {
	const [ scale, setScale ] = useState( 1 )
	const [ outerHeight, setOuterHeight ] = useState( 1 )

	const applyZoom = () => {
		const { innerWidth, outerWidth } = window
		if ( outerWidth !== innerWidth ) {
			const scale = innerWidth / outerWidth
			setScale( scale )
		}
	}

	useEffect( () => {
		const { devicePixelRatio, outerHeight } = window
		setOuterHeight( outerHeight )
		setScale( 1 / devicePixelRatio )

		window.addEventListener( 'resize', applyZoom )
		window.addEventListener( 'DOMContentLoaded', applyZoom )
	}, [] )

	return (
		<div className="z-38" >
			<div className="relative">
				<main
					className="flex-1 pb-6 pt-5 px-5 dark:text-white min-h-full scrollbar"
					style={ { height: `calc(100vh - ${ Math.floor( 64 * scale ) }px)`, width: `calc(100vw - ${ Math.floor( 64 * scale )}px)` } }
				>
					{ children }
				</main>
			</div>
		</div>
	)
}