"use client"

import { usePathname } from "next/navigation"
import { useState, useEffect, useCallback } from "react"
import { FiLock, FiUnlock } from "react-icons/fi"

export default function LockedToggle () {
	const pathname = usePathname()
	const [ locked, setLocked ] = useState( false )

	useEffect( () => {
		const savedLocked = localStorage.getItem( "locked" ) === "true"
		setLocked( savedLocked )
		document.documentElement.classList.toggle( "locked", savedLocked )
	}, [] )

	const toggleLocked = useCallback( () => {
		const newLocked = !locked
		setLocked( newLocked )
		localStorage.setItem( "locked", newLocked.toString() )
		document.documentElement.classList.toggle( "locked", newLocked )
	}, [locked] )

	useEffect( () => {
		const handleRouteChange = () => {
			localStorage.setItem( "locked", "true" )
			setLocked( true )
			document.documentElement.classList.toggle( "locked", true )
		}

		handleRouteChange()
	}, [ pathname ] )

	const iconColor = locked
		? "bg-gray-500 dark:bg-slate-700 hover:bg-gray-700 active:bg-gray-800 dark:hover:bg-slate-800 dark:active:bg-slate-900"
		: "bg-green-500 dark:bg-green-600 hover:bg-green-700 active:bg-green-800 dark:hover:bg-green-700 dark:active:bg-green-800"


	return (
		<div className="z-9999">
			<button
				onClick={ toggleLocked }
				className={ `${ iconColor } flex text-white fixed right-4 bottom-6 rounded-full` }
			>
				<span className={ `flex items-center justify-center size-12 shadow-[inset_-3px_-5px_3px_0.1px_rgba(0,0,0,0.3)] text-sm sm:text-2xl rounded-full` }>
					{ locked ? <FiLock /> : <FiUnlock /> }
				</span>
			</button>
		</div>
	)
}
