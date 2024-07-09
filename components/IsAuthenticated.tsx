'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export const IsAuthenticated = () => {
	const router = useRouter()
	const [ isAuthenticated, setIsauthenticated ] = useState( false )

	useEffect( () => {
		const jwt = localStorage.getItem( 'jwt' )
		if ( !jwt ) {
			router.push( '/login' )
		}
		else setIsauthenticated( true )
	}, [] )

	return (
		<>
			{ !isAuthenticated && <div className=' z-50 absolute top-0 bottom-0 left-0 right-0 bg-white dark:bg-sky-900' ></div> || null }
		</>
	)
}