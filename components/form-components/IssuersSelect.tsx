import { baseUrl } from "@/lib/utils"
import Select from "./Select"
import { Issuer, ResponseIssuers } from "@/lib/strapi-types/Issuer"
import { ResponseError } from "@/lib/strapi-types/Error"
import t from "@/lib/translations"

export default async function IssuersSelect ( { defaultValue }: { defaultValue?: string } ) {
	const response = await fetch( `${ baseUrl }/api/issuers?populate[payment_methods]=*&populate[company][fields][0]=displayName` )
	const responseIssuers: ResponseIssuers | ResponseError = await response.json()

	if ( typeof responseIssuers !== "object" || !( "data" in responseIssuers ) ) {
		console.error( { responseIssuers } )
		throw new Error( "Fail to fetch the list of issuers." )
		
	}
	
	let options: any[] = []

	responseIssuers.data.map( ( issuer: Issuer ) => {
		
		const { company } = issuer.attributes
			
		if ( typeof company === "object" && ( "data" in company ) && !!company.data?.id ) {
			
			const companyId = company.data.id
			const companyName = company.data.attributes.displayName
			
			options.push( {	
				value: companyId,
				text: companyName
			})
		}
	})

	return <Select
		label={ t( "Issuer" ) }
		name="issuerId"
		options={ options }
		defaultValue={ defaultValue }
	/>
}