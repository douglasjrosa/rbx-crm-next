export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const dbApiUrl = process.env.DB_API_URL as string
export const dbApiToken = process.env.DB_API_TOKEN as string

export const formatNumber = ( str: number | string ) => {
	return Number( String( str ).replace( /[^\d,]/g, "" ).replace( ",", "." ) )
}

export const formatPhone = ( phone: number | string ) => {
	const n = String( formatNumber( phone ) )
	let formatted = n[ 0 ] !== undefined ? '(' + n[ 0 ] : ""
	formatted += n[ 1 ] !== undefined ? n[ 1 ] + ") " : ""
	formatted += n[ 2 ] !== undefined ? n[ 2 ] + " " : ""
	formatted += n[ 3 ] !== undefined ? n[ 3 ] : ""
	formatted += n[ 4 ] !== undefined ? n[ 4 ] : ""
	formatted += n[ 5 ] !== undefined ? n[ 5 ] : ""
	formatted += n[ 6 ] !== undefined ? n[ 6 ] + "-" : ""
	formatted += n[ 7 ] !== undefined ? n[ 7 ] : ""
	formatted += n[ 8 ] !== undefined ? n[ 8 ] : ""
	formatted += n[ 9 ] !== undefined ? n[ 9 ] : ""
	formatted += n[ 10 ] !== undefined ? n[ 10 ] : ""
	return formatted
}

export const formatCnpj = ( cnpj: number | string ) => {
	const n = String( formatNumber( cnpj ) )
	let formatted = ''
	formatted += n.length === 13 ? '0' : ''
	formatted += n[ 0 ] !== undefined ? n[ 0 ] : ''
	formatted += n.length === 13 ? '.' : ''
	formatted += n[ 1 ] !== undefined ? n[ 1 ] : ''
	formatted += n.length === 14 ? '.' : ''
	formatted += n[ 2 ] !== undefined ? n[ 2 ] : ''
	formatted += n.length === 15 ? '.' : ''
	formatted += n[ 3 ] !== undefined ? n[ 3 ] : ''
	formatted += n.length === 13 ? '.' : ''
	formatted += n[ 4 ] !== undefined ? n[ 4 ] : ''
	formatted += n.length === 14 ? '.' : ''
	formatted += n[ 5 ] !== undefined ? n[ 5 ] : ''
	formatted += n.length === 15 ? '.' : ''
	formatted += n[ 6 ] !== undefined ? n[ 6 ] : ''
	formatted += n.length === 13 ? '/' : ''
	formatted += n[ 7 ] !== undefined ? n[ 7 ] : ''
	formatted += n.length === 14 ? '/' : ''
	formatted += n[ 8 ] !== undefined ? n[ 8 ] : ''
	formatted += n.length === 15 ? '/' : ''
	formatted += n[ 9 ] !== undefined ? n[ 9 ] : ''
	formatted += n[ 10 ] !== undefined ? n[ 10 ] : ''
	formatted += n.length === 13 ? '-' : ''
	formatted += n[ 11 ] !== undefined ? n[ 11 ] : ''
	formatted += n.length === 14 ? '-' : ''
	formatted += n[ 12 ] !== undefined ? n[ 12 ] : ''
	formatted += n.length === 15 ? '-' : ''
	formatted += n[ 13 ] !== undefined ? n[ 13 ] : ''
	formatted += n[ 14 ] !== undefined ? n[ 14 ] : ''
	return formatted
}

export const formatIE = ( ie: number | string ) => {
	const n = String( formatNumber( ie ) )
	let formatted = n[ 0 ] !== undefined ? n[ 0 ] : ""
	formatted += n[ 1 ] !== undefined ? n[ 1 ] : ""
	formatted += n[ 2 ] !== undefined ? n[ 2 ] + "." : ""
	formatted += n[ 3 ] !== undefined ? n[ 3 ] : ""
	formatted += n[ 4 ] !== undefined ? n[ 4 ] : ""
	formatted += n[ 5 ] !== undefined ? n[ 5 ] + "." : ""
	formatted += n[ 6 ] !== undefined ? n[ 6 ] : ""
	formatted += n[ 7 ] !== undefined ? n[ 7 ] : ""
	formatted += n[ 8 ] !== undefined ? n[ 8 ] + "-" : ""
	formatted += n[ 9 ] !== undefined ? n[ 9 ] : ""
	formatted += n[ 10 ] !== undefined ? n[ 10 ] : ""
	return formatted
}

export const formatCEP = ( cep: number | string ) => {
	const n = String( formatNumber( cep ) )
	let formatted = n[ 0 ] !== undefined ? n[ 0 ] : ""
	formatted += n[ 1 ] !== undefined ? n[ 1 ] + "." : ""
	formatted += n[ 2 ] !== undefined ? n[ 2 ] : ""
	formatted += n[ 3 ] !== undefined ? n[ 3 ] : ""
	formatted += n[ 4 ] !== undefined ? n[ 4 ] + "-" : ""
	formatted += n[ 5 ] !== undefined ? n[ 5 ] : ""
	formatted += n[ 6 ] !== undefined ? n[ 6 ] : ""
	formatted += n[ 7 ] !== undefined ? n[ 7 ] : ""
	return formatted
}

export const getSellerIdByUsername = async ( username: string ) => {
	const filters = `?filters[username][$eq]=${ username }`
	const response = await fetch( `${ baseUrl }/api/user-settings${ filters }` )
	const responseData = await response.json()

	if ( !response.ok ) {
		console.error( { username, response, responseData } )
		throw new Error( "Error fetching user-settings: ", responseData )
	}
	return responseData.data?.[ 0 ]?.id
}

export const truncateString = ( str: string, maxLength: number ) => {
	if ( String(str).length > maxLength ) {
		return str.substring( 0, maxLength - 3 ) + '...'
	}
	return str
}