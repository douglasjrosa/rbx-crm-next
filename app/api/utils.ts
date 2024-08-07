import { CompanyAttributes } from "@/lib/strapi-types/company"
import { ContactAttributes } from "@/lib/strapi-types/contact"
import { baseUrl } from "@/lib/utils"

export const getSellerIdByEmail = async ( email: string ): Promise<number | null> => {

	const companiesEndpoint = `${ baseUrl }/api/user-settings?filters[email][$eq]=${ email }`

	const response = await fetch( companiesEndpoint )
	const responseData = await response.json()
	if ( !response.ok ) console.error( 'Error from external API:', responseData )
	return responseData.data?.[ 0 ]?.id || null
}

export const getCompanyIdByCnpj = async ( cnpj: string | number ): Promise<number | null> => {
	const cleanedCnpj = String( cnpj ).replace( /\D/g, '' )

	const companiesEndpoint = `${ baseUrl }/api/companies?filters[companyData][cnpj][$eq]=${ cleanedCnpj }`

	const response = await fetch( companiesEndpoint )

	const responseData = await response.json()
	if ( !response.ok ) console.error( 'Error from external API:', responseData )

	return responseData.data?.[ 0 ]?.id || null
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

export const getIssuerIdByCnpj = async ( cnpj: string | number ): Promise<number | null> => {
	const cleanedCnpj = String( cnpj ).replace( /\D/g, '' )

	const issuersEndpoint = `${ baseUrl }/api/issuers?filters[company][companyData][cnpj][$eq]=${ cleanedCnpj }`

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

export const getCompanyAttributes = async ( companyId: string | number ): Promise<CompanyAttributes | null> => {

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