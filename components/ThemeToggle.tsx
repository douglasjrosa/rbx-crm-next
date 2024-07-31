'use client'

import { useState, useEffect, useCallback } from 'react'
import { CiDark, CiLight } from "react-icons/ci"
import t from '@/lib/translations'

export default function ThemeToggle () {
	const [ theme, setTheme ] = useState( 'light' )
	const themeText: { light: string, dark: string, [ key: string ]: string } = {
		light: 'Change to dark mode.',
		dark: 'Change to light mode.'
	}

	useEffect( () => {
		( async () => {
			const savedTheme = localStorage.getItem( 'theme' ) || 'light'
			setTheme( savedTheme )
			const userSettingsId = localStorage.getItem( "userSettingsId" )
			await fetch( `/api/user-settings/${ userSettingsId }`, {
				method: "PUT",
				body: JSON.stringify( {
					data: { themeMode: savedTheme }
				} )
			} )
		} )()
	}, [ theme ] )

	const toggleTheme = useCallback( () => {
		const newTheme = theme === 'light' ? 'dark' : 'light'
		setTheme( newTheme )
		localStorage.setItem( 'theme', newTheme )
		document.documentElement.classList.toggle( 'dark', newTheme === 'dark' )
	}, [ theme ] )

	const textColor = theme === 'light' ? "text-sky-900" : "text-white"
	const borderColor = theme === 'light' ? "border-sky-900" : "border-white"

	return (
		<button
			onClick={ toggleTheme }
			className="w-fit flex"
		>
			<span className={ `${ textColor } ${ borderColor } border text-2xl rounded-full size-11 flex items-center justify-center` } >{ theme === 'light' ? <CiDark /> : <CiLight /> }</span>
			<span className='text-md p-3'>{ t( themeText[ theme ] ) }</span>
		</button>
	)
}