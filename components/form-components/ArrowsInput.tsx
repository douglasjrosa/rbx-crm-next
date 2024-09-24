"use client"

import { useState, useEffect, SetStateAction, Dispatch } from "react"

export default function ArrowsInput ( { axeX, initialX, reverseX, setAxeX, axeY, initialY, reverseY, setAxeY, step }: {
	axeX?: boolean
	initialX?: number
	reverseX?: boolean
	setAxeX?: Dispatch<SetStateAction<number>>
	axeY?: boolean
	initialY?: number
	reverseY?: boolean
	setAxeY?: Dispatch<SetStateAction<number>>
	step?: number
} ) {
	const [ x, setX ] = useState( initialX ?? 0 )
	const [ y, setY ] = useState( initialY ?? 0 )

	// Handle keyboard arrow key press
	const handleKeyDown = ( e: KeyboardEvent ) => {
		switch ( e.key ) {
			case "ArrowUp":
				axeY && setY( ( prevY ) => !reverseY ? prevY + ( step ?? 1 ) : prevY - ( step ?? 1 ) )
				break
			case "ArrowDown":
				axeY && setY( ( prevY ) => !reverseY ? prevY - ( step ?? 1 ) : prevY + ( step ?? 1 ) )
				break
			case "ArrowLeft":
				axeX && setX( ( prevX ) => !reverseX ? prevX - ( step ?? 1 ) : prevX + ( step ?? 1 ) )
				break
			case "ArrowRight":
				axeX && setX( ( prevX ) => !reverseX ? prevX + ( step ?? 1 ) : prevX - ( step ?? 1 ) )
				break
			default:
				break
		}
	}

	useEffect( () => {
		// Add event listener for keyboard events
		window.addEventListener( "keydown", handleKeyDown )

		// Cleanup listener on component unmount
		return () => {
			window.removeEventListener( "keydown", handleKeyDown )
		}
	}, [] )

	useEffect( () => {
		setAxeX && setAxeX( x )
		setAxeY && setAxeY( y )
	}, [ x, y ] )

	return (
		<div>
			<h3>Invisible XY Inputs</h3>
			<p>Use the arrow keys to control the values of X and Y.</p>
			<div>
				<strong>X:</strong> { x } <br />
				<strong>Y:</strong> { y }
			</div>
		</div>
	)
}
