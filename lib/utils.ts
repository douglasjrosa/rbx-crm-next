export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const dbApiUrl = process.env.DB_API_URL as string
export const dbApiToken = process.env.DB_API_TOKEN as string

export const formatNumber = ( str: number | string | undefined ) => {
	return Number( String( str ).replace( /[^\d,]/g, "" ).replace( ",", "." ) )
}

export const formatPhone = ( phone: number | string | undefined ) => {
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

export const formatCnpj = ( cnpj: number | string | undefined ) => {
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

export const formatIE = ( ie: number | string | undefined ) => {
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

export const formatCEP = ( cep: number | string | undefined ) => {
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

export const truncateString = ( str: string, maxLength: number ) => {
	if ( String(str).length > maxLength ) {
		return str.substring( 0, maxLength - 3 ) + '...'
	}
	return str
}

export const states: Array<{ value: string; text: string }> = [
	{ value: 'AC', text: 'Acre' },
	{ value: 'AL', text: 'Alagoas' },
	{ value: 'AP', text: 'Amapá' },
	{ value: 'AM', text: 'Amazonas' },
	{ value: 'BA', text: 'Bahia' },
	{ value: 'CE', text: 'Ceará' },
	{ value: 'DF', text: 'Distrito Federal' },
	{ value: 'ES', text: 'Espírito Santo' },
	{ value: 'GO', text: 'Goiás' },
	{ value: 'MA', text: 'Maranhão' },
	{ value: 'MT', text: 'Mato Grosso' },
	{ value: 'MS', text: 'Mato Grosso do Sul' },
	{ value: 'MG', text: 'Minas Gerais' },
	{ value: 'PA', text: 'Pará' },
	{ value: 'PB', text: 'Paraíba' },
	{ value: 'PR', text: 'Paraná' },
	{ value: 'PE', text: 'Pernambuco' },
	{ value: 'PI', text: 'Piauí' },
	{ value: 'RJ', text: 'Rio de Janeiro' },
	{ value: 'RN', text: 'Rio Grande do Norte' },
	{ value: 'RS', text: 'Rio Grande do Sul' },
	{ value: 'RO', text: 'Rondônia' },
	{ value: 'RR', text: 'Roraima' },
	{ value: 'SC', text: 'Santa Catarina' },
	{ value: 'SP', text: 'São Paulo' },
	{ value: 'SE', text: 'Sergipe' },
	{ value: 'TO', text: 'Tocantins' },
]