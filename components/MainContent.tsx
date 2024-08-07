"use client"
import { useEffect, useState } from "react"

export default function MainContent ( { children }: { children: React.ReactNode } ) {
	const [ scale, setScale ] = useState( 1 )
	const [ sidebarWidth, setSidebarWidth ] = useState( "100vw" )

	const applyZoom = () => {
		const { innerWidth, outerWidth } = window
		if ( outerWidth !== innerWidth ) {
			const scale = innerWidth / outerWidth
			setScale( scale )
		}
	}

	useEffect( () => {
		const { devicePixelRatio, outerWidth } = window
		
		setScale( 1 / devicePixelRatio )
		const sidebarWidth = outerWidth > 655 ? `calc(100vw - ${ Math.floor( 64 * scale ) }px)` : "100vw"
		setSidebarWidth( sidebarWidth )

		window.addEventListener( 'resize', applyZoom )
		window.addEventListener( 'DOMContentLoaded', applyZoom )
	}, [scale] )


	return (
		<div className="z-38" >
			<div className="relative">
				<main
					style={ {
						height: `calc(100vh - ${ Math.floor( 64 * scale ) }px)`,
						width: sidebarWidth
					} }
					className="flex-1 pb-6 pt-5 px-5 dark:text-white min-h-full scrollbar"
				>
					{ children }
				</main>
			</div>
		</div>
	)
}