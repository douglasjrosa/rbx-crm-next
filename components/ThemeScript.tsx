'use client'

import { useEffect, useState } from 'react'
import { Bounce, ToastContainer } from 'react-toastify'

export default function ThemeScript () {
	
	const [ theme, setTheme ] = useState( "light" )
	useEffect( () => {
		const theme = localStorage.getItem( 'theme' ) || 'light'
		document.documentElement.classList.toggle( 'dark', theme === 'dark' )
		setTheme( theme )
	}, [] )

	return (
		<ToastContainer
			position="bottom-center"
			autoClose={ 5000 }
			hideProgressBar={ false }
			newestOnTop={ false }
			closeOnClick
			rtl={ false }
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme={ theme }
			transition={ Bounce }
		/>
	)
}