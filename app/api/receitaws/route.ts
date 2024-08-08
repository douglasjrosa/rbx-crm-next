import { NextRequest, NextResponse } from "next/server"

export const GET = async ( req: NextRequest ): Promise<NextResponse<any>> => {
	try {
		const { searchParams } = req.nextUrl

		const params: Record<string, string> = {}
		searchParams.forEach( ( value, key ) => {
			params[ key ] = value
		} )

		const { cnpj } = params

		const response = await fetch( `https://receitaws.com.br/v1/cnpj/${ cnpj }`, {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
			}
		} )

		const responseData = await response.json()

		if ( !response.ok ) console.error( 'Error from external API:', responseData )

		return NextResponse.json( responseData, { status: response.status, statusText: response.statusText }
		)
	} catch ( error: any ) {
		console.error( 'Error in handler:', { error } )
		return NextResponse.json( { error: error.message || 'Internal Server Error' }, { status: 500 } )
	}
}
