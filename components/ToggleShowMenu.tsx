"use client"

import { usePathname } from "next/navigation"
import { useState, useEffect, useCallback } from "react"
import { FiMenu, FiX } from "react-icons/fi"

export default function ToggleShowMenu () {
	const pathname = usePathname()
	const [ showMenu, setShowMenu ] = useState( false )

	useEffect( () => {
		const savedShowMenu = localStorage.getItem( "show-menu" ) === "true"
		setShowMenu( savedShowMenu )
		document.documentElement.classList.toggle( "show-menu", savedShowMenu )
	}, [] )

	const toggleShowMenu = useCallback( () => {
		const newShowMenu = !showMenu
		setShowMenu( newShowMenu )
		localStorage.setItem( "show-menu", newShowMenu.toString() )
		document.documentElement.classList.toggle( "show-menu", newShowMenu )
	}, [ showMenu ] )

	useEffect( () => {
		const handleRouteChange = () => {
			localStorage.setItem( "show-menu", "false" )
			setShowMenu( false )
			document.documentElement.classList.toggle( "show-menu", false )
		}

		handleRouteChange()
	}, [ pathname ] )

	const bgColor = showMenu ? "bg-red-400" : "bg-white bg-opacity-20"

	return (
		<button
			onClick={ toggleShowMenu }
			className={ `flex block sm:hidden` }
		>
			<span
				className={ `text-white rounded shadow-lg ${ bgColor }` }
				style={ { fontSize: "25px", padding: "5px" } }
			>
				{ showMenu ? <FiX /> : <FiMenu /> }
			</span>
		</button>
	)
}
