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

		const userJwt = localStorage.getItem( 'userJwt' )

		if ( !userJwt || !routeIsAllowed ) {
			router.push( '/' )
		}
		else setIsauthenticated( true )
	}, [ params.username, router ] )

	return (
		<>
			{ !isAuthenticated && <div className=' z-50 absolute top-0 bottom-0 left-0 right-0 bg-white dark:bg-sky-900' ></div> || null }
		</>
	)
}