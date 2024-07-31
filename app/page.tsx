'use client'

import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import LoginForm from '@/components/LoginForm'
import Image from 'next/image'

const LoginPage = () => {
	
	useEffect( () => {
		const username = localStorage.getItem( "username" )
		if ( username ) redirect( `/${ username }/dashboard` )
	}, [] )

	return (
		<div className="bg-porto1 w-screen h-screen">
			<div className="min-h-screen flex items-center justify-center">
				<div className="p-10 shadow-lg flex flex-col items-center justify-center bg-white rounded-lg">
					<Image src="/logomarca1.webp" alt="Locomarca Ribermax" width={ 287 } height={ 212 } priority />
					<LoginForm />
				</div>
			</div>
		</div>
	)
}

export default LoginPage