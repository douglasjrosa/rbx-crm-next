import { cache } from 'react'
import NextImage from 'next/image'

function getInitials ( displayName: string ) {
	return displayName
		.split( ' ' )
		.map( word => word[ 0 ] )
		.join( '' )
		.toUpperCase()
		.slice( 0, 2 )
}

const getRandomColor = cache( () => {
	const colors = [
		"bg-gray-500",
		"bg-cyan-600",
		"bg-sky-600",
		"bg-indigo-600",
		"bg-teal-500",
		"bg-cyan-400",
		"bg-indigo-400",
		"bg-slate-500",
		"bg-blue-500",
		"bg-sky-400"
	]
	return colors[ Math.floor( Math.random() * 10 ) ]
} )

async function checkImageExists ( url: string ): Promise<boolean> {
	try {
		const res = await fetch( url, { method: 'HEAD' } )
		return res.ok
	} catch {
		return false
	}
}

export default async function CompanyLogo ( { displayName, website, email, nfeEmail, size }: {
	displayName: string
	website?: string
	email?: string
	nfeEmail?: string
	size: number
} ) {
	const domain = website ? website.replace( /(.*:\/\/)|(www.)|(\/.*)/g, "" ) : (
		!!nfeEmail ? nfeEmail.replace( /.*@/g, "" ) : String( email?.replace( /.*@/g, "" ) )
	)
	const invalidDomain = [ "yahoo.com", "yahoo.com.br", "gmail.com", "hotmail.com", "" ].includes( domain )

	const logoUrl = invalidDomain ? "" : `https://logo.clearbit.com/${ domain }`
	const logoExists = await checkImageExists( logoUrl )

	const defaultClasses = "rounded-full flex items-center justify-center"
	const shadowClass = "shadow-[inset_-3px_-5px_3px_0.1px_rgba(0,0,0,0.3)]"

	if ( logoExists ) {
		return (
			<div
				className={ `relative bg-white ${ defaultClasses }` }
				style={ { width: `${ size }px`, height: `${ size }px` } }
			>
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
		const bgColor = getRandomColor()
		const initialsClasses = `text-bold text-white ${ bgColor }`
		return (
			<div
				className={ `${ defaultClasses } ${ initialsClasses } ${ shadowClass }` }
				style={ {
					fontSize: `${ Math.round( size / 2.5 ) }px`,
					width: `${ size }px`,
					height: `${ size }px`
				} }
			>
				{ initials }
			</div>
		)
	}
}