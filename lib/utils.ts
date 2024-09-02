export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export const dbApiUrl = process.env.DB_API_URL as string
export const dbApiToken = process.env.DB_API_TOKEN as string

export const capitalize = ( str: string ): string => ( str.charAt( 0 ).toUpperCase() + str.slice( 1 ) )

export const formatNumber = ( str: number | string | undefined ): number => {
	if ( typeof str === 'number' ) return str
	return Number( String( str ).replace( /[^\d,]/g, "" ).replace( ",", "." ) )
}

export const formatPhone = ( phone: number | string | undefined ) => {
	const n = String( formatNumber( phone ) )
	let formatted = n[ 0 ] !== undefined && n[ 1 ] !== undefined ? '(' + n[ 0 ] : ( n[ 0 ] === "0" ? "" : n[ 0 ] )
	formatted += n[ 1 ] !== undefined ? n[ 1 ] : ""
	formatted += n[ 2 ] !== undefined ? ") " + n[ 2 ] : ""
	formatted += n[ 10 ] !== undefined ? " " : ""
	formatted += n[ 3 ] !== undefined ? n[ 3 ] : ""
	formatted += n[ 4 ] !== undefined ? n[ 4 ] : ""
	formatted += n[ 5 ] !== undefined ? n[ 5 ] : ""
	formatted += n[ 9 ] !== undefined && n[ 10 ] === undefined ? "-" : ""
	formatted += n[ 6 ] !== undefined ? n[ 6 ] : ""
	formatted += n[ 10 ] !== undefined ? "-" : ""
	formatted += n[ 7 ] !== undefined ? n[ 7 ] : ""
	formatted += n[ 8 ] !== undefined ? n[ 8 ] : ""
	formatted += n[ 9 ] !== undefined ? n[ 9 ] : ""
	formatted += n[ 10 ] !== undefined ? n[ 10 ] : ""
	return formatted
}

export const formatCnae = ( cnae: number | string | undefined ) => {
	const n = String( formatNumber( cnae ) )
	let formatted = n[ 0 ] !== undefined && n[ 1 ] !== undefined ? n[ 0 ] : ( n[ 0 ] === "0" ? "" : n[ 0 ] )
	formatted += n[ 1 ] !== undefined ? n[ 1 ] : ""
	formatted += n[ 2 ] !== undefined ? n[ 2 ] : ""
	formatted += n[ 3 ] !== undefined ? n[ 3 ] : ""
	formatted += n[ 4 ] !== undefined ? "-" + n[ 4 ] : ""
	formatted += n[ 5 ] !== undefined ? "/" + n[ 5 ] : ""
	formatted += n[ 6 ] !== undefined ? n[ 6 ] : ""
	return formatted
}

export const formatCnpj = ( cnpj: number | string | undefined ): string => {
	const n = String( formatNumber( cnpj ) )
	let formatted = ''
	formatted += n.length === 13 ? '0' : ''
	formatted += n[ 0 ] !== undefined && n[ 1 ] !== undefined ? n[ 0 ] : ( n[ 0 ] === "0" ? "" : n[ 0 ] )
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

export const formatIE = ( ie: number | string | undefined ): string => {
	const n = String( formatNumber( ie ) )
	let formatted = n[ 0 ] !== undefined && n[ 1 ] !== undefined ? n[ 0 ] : ( n[ 0 ] === "0" ? "" : n[ 0 ] )
	formatted += n[ 1 ] !== undefined ? n[ 1 ] : ""
	formatted += n[ 2 ] !== undefined ? n[ 2 ] : ""
	formatted += n[ 3 ] !== undefined ? "." + n[ 3 ] : ""
	formatted += n[ 4 ] !== undefined ? n[ 4 ] : ""
	formatted += n[ 5 ] !== undefined ? n[ 5 ] : ""
	formatted += n[ 6 ] !== undefined ? "." + n[ 6 ] : ""
	formatted += n[ 7 ] !== undefined ? n[ 7 ] : ""
	formatted += n[ 8 ] !== undefined ? n[ 8 ] : ""
	formatted += n[ 9 ] !== undefined ? "." + n[ 9 ] : ""
	formatted += n[ 10 ] !== undefined ? n[ 10 ] : ""
	formatted += n[ 11 ] !== undefined ? n[ 11 ] : ""
	return formatted
}

export const formatCEP = ( cep: number | string | undefined ): string => {
	const n = String( formatNumber( cep ) )
	let formatted = n[ 0 ] !== undefined && n[ 1 ] !== undefined ? n[ 0 ] : ( n[ 0 ] === "0" ? "" : n[ 0 ] )
	formatted += n[ 1 ] !== undefined ? n[ 1 ] : ""
	formatted += n[ 2 ] !== undefined ? "." + n[ 2 ] : ""
	formatted += n[ 3 ] !== undefined ? n[ 3 ] : ""
	formatted += n[ 4 ] !== undefined ? n[ 4 ] : ""
	formatted += n[ 5 ] !== undefined ? "-" + n[ 5 ] : ""
	formatted += n[ 6 ] !== undefined ? n[ 6 ] : ""
	formatted += n[ 7 ] !== undefined ? n[ 7 ] : ""
	return formatted
}

export const formatNumberToBR = ( value: number | string = 0, decimals?: number ): string => {

	let formatted: number | string = formatNumber( value )
	
	decimals = decimals === undefined && formatted !== Math.round( formatted ) ? 1 : 0
	
	formatted = formatted.toFixed( decimals )
	return formatted.replace( ".", "," )
}

export const formatCurrency = ( value?: number | string, currency?: string ): string => {
	if ( value === undefined || value === null ) return `${ currency } 0,00`

	// Converte o valor para número
	const numericValue = typeof value === 'string' ? parseFloat( value.replace( /[^\d,-]/g, '' ).replace( ',', '.' ) ) : value

	// Verifica se o valor é um número válido
	if ( isNaN( numericValue ) ) return `${ currency } 0,00`

	// Formata o valor para o formato brasileiro (R$ x.xxx.xxx,xx)
	let formatted = currency ?? ""
	formatted += currency ? " " : ""
	formatted += numericValue.toFixed( 2 ).replace( '.', ',' ).replace( /\B(?=(\d{3})+(?!\d))/g, '.' )
	return formatted
}

export const truncateString = ( str: string, maxLength: number ): string => {
	if ( String( str ).length > maxLength ) {
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

export const refreshKey = ( name: string ): string => {
	const random = Math.floor( Math.random() * 100000000000 )
	const date = new Date()
	const time = date.getTime()
	return `${ name }-${ time % random }`
}

export const formatFutureDate = ( daysFromToday = 0 ): string => {
	const today = new Date()
	const futureDate = new Date( today )
	futureDate.setDate( today.getDate() + daysFromToday )

	return futureDate.toISOString().split( 'T' )[ 0 ]
}

export const formatDateToBR = ( date: string ): string => {
	const [ year, month, day ] = date.split( '-' )
	return `${ day }/${ month }/${ year }`
}

export const daysToDate = ( date: string ): number => {
	const today = new Date()
	const targetDate = new Date( date )

	const timeDifference = targetDate.getTime() - today.getTime()

	const daysDifference = Math.ceil( timeDifference / ( 1000 * 60 * 60 * 24 ) )

	return daysDifference
}
