'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import t from '@/lib/translations'

const LoginForm = () => {
	const [ identifier, setIdentifier ] = useState( '' )
	const [ password, setPassword ] = useState( '' )
	const [ error, setError ] = useState( '' )
	const router = useRouter()

	const handleSubmit = async ( e: React.FormEvent ) => {
		e.preventDefault()
		setError( '' )

		try {
			const response = await fetch( '/api/auth/local', {
				method: 'POST',
				body: JSON.stringify( { identifier, password } ),
			} )

			const data = await response.json()

			if ( !response.ok ) {
				const message = response.status === 400
					? 'Invalid credentials. Please try again.'
					: 'Login failed. Try again later.'

				setError( message )
				return
			}

			const { jwt, user } = data
			localStorage.setItem( 'jwt', jwt )
			localStorage.setItem( 'username', user.username )
			localStorage.setItem( 'phone', user.phone )
			localStorage.setItem( 'email', user.email )

			router.push( '/dashboard' )
		} catch ( error: any ) {
			setError( t( error.message || 'An error occurred.' ) )
		}
	}

	return (
		<form onSubmit={ handleSubmit } className="max-w-md mx-auto p-10 shadow-md">
			<div className="mb-6">
				<label htmlFor="identifier" className="block text-sm font-medium">
					Email
				</label>
				<input
					type="text"
					id="identifier"
					value={ identifier }
					onChange={ ( e ) => setIdentifier( e.target.value ) }
					className="mt-1 block w-full border focus:outline-none focus:ring focus:ring-sky-500 px-4 py-2 text-lg"
				/>
			</div>
			<div className="mb-6">
				<label htmlFor="password" className="block text-sm font-medium">
					Password
				</label>
				<input
					type="password"
					id="password"
					value={ password }
					onChange={ ( e ) => setPassword( e.target.value ) }
					className="mt-1 block w-full border focus:outline-none focus:ring focus:ring-sky-500 px-4 py-2 text-lg"
				/>
			</div>
			{ error && <div className="mb-4 text-red-500 text-sm">{ error }</div> }
			<button type="submit" className="w-full py-2 px-4 bg-sky-600">
				Login
			</button>
		</form>
	)
}

export default LoginForm
