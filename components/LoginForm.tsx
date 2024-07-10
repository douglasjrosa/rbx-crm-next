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
			const authResponse = await fetch( '/api/auth/local', {
				method: 'POST',
				body: JSON.stringify( { identifier, password } ),
			} )

			const userData = await authResponse.json()

			if ( !authResponse.ok ) {
				const message = authResponse.status === 400
					? 'Invalid credentials. Please try again.'
					: 'Login failed. Try again later.'

				setError( message )
				return
			}
			const { jwt, user } = userData
			const { id, username } = user

			localStorage.setItem( 'rbxjwt', jwt )
			localStorage.setItem( 'userId', id )
			localStorage.setItem( 'username', username )

			const userSettingsResponse = await fetch( `/api/user-settings?filters[username]=${ username }` )
			const userSettings = await userSettingsResponse.json()

			const theme = userSettings.data?.[ 0 ]?.attributes?.themeMode || "light"
			const userSettingsId = userSettings.data?.[ 0 ]?.id
			
			localStorage.setItem( "theme", theme )
			localStorage.setItem( "userSettingsId", userSettingsId )

			await fetch( `/api/user-settings/${ userSettingsId }`, {
				method: 'PUT',
				body: JSON.stringify( {
					data: {
						jwt
					}
				})
			} )
			
			router.push( `/${ username }/dashboard` )
		} catch ( error: any ) {
			setError( t( error.message || 'An error occurred.' ) )
		}
	}

	return (
		<form onSubmit={ handleSubmit } className="max-w-md mx-auto">
			<div className="mb-6">
				<label htmlFor="identifier" className="block text-sm font-medium">
					Email
				</label>
				<input
					type="text"
					id="identifier"
					value={ identifier }
					onChange={ ( e ) => setIdentifier( e.target.value ) }
					className="mt-1 block w-full border focus:outline-none focus:ring focus:ring-sky-500 px-4 py-2 text-xl rounded border-sky-500"
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
					className="mt-1 block w-full border focus:outline-none focus:ring focus:ring-sky-500 px-4 py-2 text-xl rounded border-sky-500"
				/>
			</div>
			{ error && <div className="mb-4 text-red-500 text-sm">{ error }</div> }
			<button type="submit" className="w-full py-2 px-4 my-4 bg-sky-600 text-white rounded">
				Login
			</button>
		</form>
	)
}

export default LoginForm
