export const baseUrl = process.env.BASE_URL

export const formatPhone = ( phone: number | string ) => {
	const n = String( phone ).replace( /\D/g, '' )
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