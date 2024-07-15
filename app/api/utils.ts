import { dbApiToken, dbApiUrl } from "@/lib/utils"
import { NextRequest, NextResponse } from "next/server"

export async function fetchFromExternalApi ( req: NextRequest ) {
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

		if ( !response.ok ) console.error( 'Error from external API:', responseData )

		return NextResponse.json( responseData, { status: response.status, statusText: response.statusText } )

	} catch ( error: any ) {
		console.error( 'Error in handler:', { error } )
		return NextResponse.json( { error: error.message || 'Internal Server Error' }, { status: 500 } )
	}
}

export const getSellerIdByEmail = async ( email: string ) => {

	const companiesEndpoint = `${ dbApiUrl }/user-settings?filters[email][$eq]=${ email }`

	const response = await fetch( companiesEndpoint, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${ dbApiToken }`,
		}
	} )
	const responseData = await response.json()
	if ( !response.ok ) console.error( 'Error from external API:', responseData )
	return responseData.data?.[0]?.id
}

export const getCompanyIdByCnpj = async ( cnpj: string | number ) => {
	const cleanedCnpj = String( cnpj ).replace( /\D/g, '' )

	const companiesEndpoint = `${ dbApiUrl }/companies?filters[companyData][cnpj][$eq]=${ cleanedCnpj }`

	const response = await fetch( companiesEndpoint, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${ dbApiToken }`,
		}
	} )

	const responseData = await response.json()
	if ( !response.ok ) console.error( 'Error from external API:', responseData )

	return responseData.data?.[ 0 ]?.id
}

export const isExpired = ( datetime: string, daysToExpire: number ): boolean => {
	const specifiedDate = new Date( datetime )

	const currentDate = new Date()

	const differenceInMilliseconds = currentDate.getTime() - specifiedDate.getTime()

	const differenceInDays = differenceInMilliseconds / ( 1000 * 60 * 60 * 24 )

	return differenceInDays > daysToExpire
}

export const parseToFloat = ( number: string | number ) => {
	return typeof number === "number" ? number : parseFloat( String( number ).replace( /[^\d,]/g, '' ).replace( ',', '.' ) )
}

export const getIssuerByCnpj = async ( cnpj: string | number ) => {
	const cleanedCnpj = String( cnpj ).replace( /\D/g, '' )

	const issuersEndpoint = `${ dbApiUrl }/issuers?filters[company][companyData][cnpj][$eq]=${ cleanedCnpj }`

	const response = await fetch( issuersEndpoint, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${ dbApiToken }`,
		}
	} )

	const responseData = await response.json()
	if ( !response.ok ) console.error( 'Error from external API:', responseData )

	return responseData.data?.[ 0 ]?.id
}