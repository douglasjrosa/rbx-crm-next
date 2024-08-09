import { ReceitaCompanyData } from "@/lib/receitaws-types/company"
import { CompanyAttributes } from "@/lib/strapi-types/company"
import { ContactAttributes } from "@/lib/strapi-types/contact"
import t from "@/lib/translations"
import { baseUrl, formatNumber } from "@/lib/utils"

export const getSellerIdByEmail = async ( email: string ): Promise<number | null> => {

	const companiesEndpoint = `${ baseUrl }/api/user-settings?filters[email][$eq]=${ email }`

	const response = await fetch( companiesEndpoint )
	const responseData = await response.json()
	if ( !response.ok ) console.error( 'Error from external API:', responseData )
	return responseData.data?.[ 0 ]?.id || null
}

export const getCompanyIdByCnpj = async ( cnpj: string | number ): Promise<number | null> => {
	const cleanedCnpj = String( cnpj ).replace( /\D/g, '' )

	const companiesEndpoint = `${ baseUrl }/api/companies?filters[cnpj][$eq]=${ cleanedCnpj }`

	const response = await fetch( companiesEndpoint )

	const responseData = await response.json()
	if ( !response.ok ) console.error( 'Error from external API:', responseData )

	return responseData.data?.[ 0 ]?.id || null
}

export const getCompanyByCnpj = async ( cnpj: string | number, queryString?: string ): Promise<any | null> => {
	const cleanedCnpj = String( cnpj ).replace( /\D/g, '' )

	const companiesEndpoint = `${ baseUrl }/api/companies?filters[cnpj][$eq]=${ cleanedCnpj }${ queryString ?? "" }`
	const response = await fetch( companiesEndpoint )

	const responseData = await response.json()
	if ( !response.ok ) console.error( 'Error from external API:', responseData )

	return responseData.data?.[ 0 ] || null
}

export const isExpired = ( datetime: string, daysToExpire: number ): boolean => {
	const specifiedDate = new Date( datetime )

	const currentDate = new Date()

	const differenceInMilliseconds = currentDate.getTime() - specifiedDate.getTime()

	const differenceInDays = differenceInMilliseconds / ( 1000 * 60 * 60 * 24 )

	return differenceInDays > daysToExpire
}

export const parseToFloat = ( number: string | number ): number => {
	return typeof number === "number" ? number : parseFloat( String( number ).replace( /[^\d,]/g, '' ).replace( ',', '.' ) )
}

export const getIssuerIdByCnpj = async ( cnpj: string | number ): Promise<number | null> => {
	const cleanedCnpj = String( cnpj ).replace( /\D/g, '' )

	const issuersEndpoint = `${ baseUrl }/api/issuers?filters[company][cnpj][$eq]=${ cleanedCnpj }`

	const response = await fetch( issuersEndpoint )

	const responseData = await response.json()
	if ( !response.ok ) console.error( 'Error from external API:', responseData )

	return responseData.data?.[ 0 ]?.id || null
}


export const getSellerIdByUsername = async ( username: string ): Promise<number | null> => {
	const filters = `?filters[username][$eq]=${ username }`
	const response = await fetch( `${ baseUrl }/api/user-settings${ filters }` )
	const responseData = await response.json()

	if ( !response.ok ) {
		console.error( { username, response, responseData } )
		throw new Error( "Error fetching user-settings: ", responseData )
	}
	return responseData.data?.[ 0 ]?.id || null
}

export const getCompanyAttributesById = async ( companyId: string | number ): Promise<CompanyAttributes | null> => {

	const response = await fetch( `${ baseUrl }/api/companies/${ companyId }?populate=*`, {
		next: {
			tags: [ `company-data-${ companyId }` ]
		}
	} )
	const responseData = await response.json()

	return responseData.data?.id ? responseData.data.attributes : null
}

export const getContacts = async ( companyId: string | number, filters?: any ): Promise<{ id: string, attributes: ContactAttributes }[]> => {

	let str = `filters[companyId]=${ companyId }`
	for ( const filter in filters ) {
		if ( filters.hasOwnProperty( filter ) ) {
			str += `&filters[${ filter }]=${ filters[ filter ] }`
		}
	}
	const response = await fetch( `${ baseUrl }/api/contacts?${ str }`, {
		next: {
			tags: [ `get-contacts-${ companyId }` ]
		}
	} )
	const responseData = await response.json()

	return responseData.data || []
}

export const fetchReceitaByCnpj = async ( cnpj: string ): Promise<ReceitaCompanyData | null> => {
	const response = await fetch( `${ baseUrl }/api/receitaws?cnpj=${ cnpj }` )
	const responseData = await response.json()
	return responseData || null
}

export const getCompanyDataFromReceitaByCnpj = async (
	displayName: string,
	cnpj: `${ number }`
): Promise<CompanyAttributes | { error: string }> => {

	const receitaData = await fetchReceitaByCnpj( cnpj )

	if ( !receitaData ) {
		console.error( { receitaData } )
		return { error: t( "Error fetching company from receitaws.com.br" ) }
	}

	if ( receitaData.situacao !== "ATIVA" ) {
		console.error( { receitaData } )
		return { error: t( "ATTENTION! The company is not active in federal revenue." ) }
	}

	if ( receitaData.status !== "OK" ) {
		console.error( { receitaData } )
		return {
			error:
				t( "ATTENTION! The company's status is not 'OK' with the IRS." )
				+ ` ${ t( "Reason" ) }: ${ receitaData.motivo_situacao }`
		}
	}

	const companyData: CompanyAttributes = {
		displayName,
		cnpj,
		corporateReason: receitaData.nome,
		companySize: receitaData.porte,
		postalCode: `${ formatNumber( receitaData.cep ) }`,
		email: receitaData.email,
		address: receitaData.logradouro,
		addressNumber: formatNumber( receitaData.numero ),
		addressComplement: receitaData.complemento,
		neighborhood: receitaData.bairro,
		city: receitaData.municipio,
		state: receitaData.uf,
		website: ( receitaData.email ).replace( /.*@/g, "https://www." ),
		nfeEmail: receitaData.email,
		phone: `${ formatNumber( receitaData.telefone ) }`,
		cnae: `${ formatNumber( receitaData.atividade_principal[ 0 ]?.code ) }`
	}
	return companyData
}