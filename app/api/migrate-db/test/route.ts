import { NextRequest, NextResponse } from 'next/server'

export const GET = async ( req: NextRequest ) => {
	try {

		const oldCrmDbUrl = process.env.OLD_CRM_DB_URL as string
		const oldCrmToken = process.env.OLD_CRM_TOKEN as string

		const dbApiUrl = process.env.DB_API_URL as string
		const dbApiToken = process.env.DB_API_TOKEN as string

		const newCompanyUrl = `${ dbApiUrl }/issuers?filters[company][companyData][cnpj][$eq]=45683129000180&populate=*`


		const response = await fetch( newCompanyUrl, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${ dbApiToken }`,
			}
		} )
		const responseData = await response.json()

		return NextResponse.json( responseData, { status: response.status, statusText: response.statusText } )

	} catch ( error: any ) {
		console.error( 'Error in handler:', { error } )
		return NextResponse.json( { error: error.message || 'Internal Server Error' }, { status: 500 } )
	}
}