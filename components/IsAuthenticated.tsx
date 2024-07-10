'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export const IsAuthenticated = () => {
	
	const router = useRouter()
	const params = useParams()
	const [ isAuthenticated, setIsauthenticated ] = useState( false )

	useEffect( () => {

		const username = localStorage.getItem( 'username' )
		const routeIsAllowed = username === params.username

		const rbxjwt = localStorage.getItem( 'rbxjwt' )

		if ( !rbxjwt || !routeIsAllowed ) {
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