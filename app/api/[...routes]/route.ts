import { NextRequest, NextResponse } from 'next/server'

async function fetchFromExternalApi ( req: NextRequest ) {
	try {
		const { pathname, searchParams } = req.nextUrl
		const routes = pathname.split( '/' ).filter( ( route ) => route && route !== "api" )

		const params: Record<string, string> = {}
		searchParams.forEach( ( value, key ) => {
			params[ key ] = value
		} )

		const dbApiUrl = process.env.DB_API_URL as string
		const dbApiToken = process.env.DB_API_TOKEN as string

		const queryParams = new URLSearchParams()
		for ( const [ key, value ] of Object.entries( params ) ) {
			queryParams.append( key, value )
		}

		const queryString = queryParams.toString()
		const externalUrl = `${ dbApiUrl }/${ routes.join( '/' ) }${ queryString ? '?' + queryString : '' }`
		
		const method = req.method as string
		let body: any = null
		
		if ( [ 'POST', 'PUT', 'PATCH' ].includes( method ) ) {
			try {
				if ( req.headers.get( 'content-length' ) && parseInt( req.headers.get( 'content-length' ) || '0' ) > 0 ) {
					body = await req.json()
					body = JSON.stringify( body )
				} else {
					return NextResponse.json( { error: 'No body JSON received.' }, { status: 400 } )
				}
			} catch ( error ) {
				console.error( 'Failed to parse JSON:', error )
				return NextResponse.json( { error: 'Invalid JSON' }, { status: 400 } )
			}
		}
		
		const response = await fetch( externalUrl, {
			method,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${ dbApiToken }`,
			},
			body
		} )

		const responseData = await response.json()
		
		if ( !response.ok ) {
			console.error( 'Error from external API:', responseData )
			return NextResponse.json( { error: 'Internal Server Error' }, { status: 500 } )
		}

		return NextResponse.json( responseData, { status: response.status, statusText: response.statusText } )

	} catch ( error: any ) {
		console.error( 'Error in handler:', error )
		return NextResponse.json( { error: error.message || 'Internal Server Error' }, { status: 500 } )
	}
}

export const GET = async ( req: NextRequest ) => await fetchFromExternalApi( req )

export const POST = async ( req: NextRequest ) => await fetchFromExternalApi( req )

export const PUT = async ( req: NextRequest ) => await fetchFromExternalApi( req )

export const PATCH = async ( req: NextRequest ) => await fetchFromExternalApi( req )

export const DELETE = async ( req: NextRequest ) => await fetchFromExternalApi( req )