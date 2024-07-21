"use client"

import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { FiMenu, FiX } from "react-icons/fi"

export default function ToggleShowMenu () {
	const pathname = usePathname()
	const [ showMenu, setShowMenu ] = useState( false )

	useEffect( () => {
		const savedShowMenu = localStorage.getItem( "show-menu" ) === "true"
		setShowMenu( savedShowMenu )
		document.documentElement.classList.toggle( "show-menu", savedShowMenu )
	}, [] )

	const toggleShowMenu = () => {
		const newShowMenu = !showMenu
		setShowMenu( newShowMenu )
		localStorage.setItem( "show-menu", newShowMenu.toString() )
		document.documentElement.classList.toggle( "show-menu", newShowMenu )
	}

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
			<span className={ `text-white p-[5px] text-2xl rounded shadow-lg ${ bgColor }` }>
				{ showMenu ? <FiX /> : <FiMenu /> }
			</span>
		</button>
	)
}
