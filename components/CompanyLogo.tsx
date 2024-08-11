"use client"

import { useState, useEffect } from 'react'
import NextImage from 'next/image'

function getInitials ( displayName: string ) {
	return displayName
		.split( ' ' )
		.map( word => word[ 0 ] )
		.join( '' )
		.toUpperCase()
		.slice( 0, 2 )
}

export default function CompanyLogo ( { displayName, website, email, nfeEmail, size }: {
	displayName: string
	website?: string
	email?: string
	nfeEmail?: string
	size: number
} ) {
	const [ logoLoaded, setLogoLoaded ] = useState( false )
	const [ attemptedLoad, setAttemptedLoad ] = useState( false )
	const [ initialsClasses, setInitialsClasses ] = useState( "" )

	const domain = website ? website.replace( /(.*:\/\/)|(www.)|(\/.*)/g, "" ) : (
		!!nfeEmail ? nfeEmail.replace( /.*@/g, "" ) : String( email?.replace( /.*@/g, "" ) )
	)
	const invalidDomain = [ "yahoo.com", "yahoo.com.br", "gmail.com", "hotmail.com", "" ].includes( domain )

	const logoUrl = invalidDomain ? "" : `https://logo.clearbit.com/${ domain }`

	useEffect( () => {
		const img: HTMLImageElement = new Image( size )
		img.onload = () => {
			setLogoLoaded( true )
			setAttemptedLoad( true )
		}
		img.onerror = () => {
			setLogoLoaded( false )
			setAttemptedLoad( true )
		}
		img.src = logoUrl
	}, [ logoUrl ] )

	useEffect( () => {

		const colors = [ "bg-gray-500", "bg-cyan-600", "bg-sky-600", "bg-indigo-600", "bg-teal-500", "bg-cyan-400", "bg-indigo-400", "bg-slate-500", "bg-blue-500", "bg-sky-400" ]

		const bgColor = colors[ Math.floor( Math.random() * 10 ) ]

		const initialsClasses = `text-bold text-[${ size / 12 }px] text-white ${ bgColor }`
		setInitialsClasses( initialsClasses )

	}, [ attemptedLoad ] )

	if ( !attemptedLoad || !initialsClasses ) return null

	const defaultClasses = `rounded-full w-[50px] h-[50px] flex items-center justify-center`
	const shadowClass = "shadow-[inset_-3px_-5px_3px_0.1px_rgba(0,0,0,0.3)]"
	if ( logoLoaded ) {
		return (
			<div className={ `relative ${ defaultClasses }` } >
				<NextImage
					src={ logoUrl }
					alt={ `${ displayName } logo` }
					width={ size }
					height={ size }
					className="rounded-full"
				/>
				<div className={ `absolute rounded-full top-0 bottom-0 left-0 right-0 ${ shadowClass }` }></div>
			</div>
		)
	} else {
		const initials = getInitials( displayName )
		return (
			<div className={ `${ defaultClasses } ${ initialsClasses } ${ shadowClass }` } >
				{ initials }
			</div>
		)
	}
}