import { NextRequest, NextResponse } from 'next/server'

export const GET = async ( req: NextRequest ) => {
	try {

		let success = 0

		const oldCrmDbUrl = process.env.OLD_CRM_DB_URL as string
		const oldCrmToken = process.env.OLD_CRM_TOKEN as string

		const issuers = [
			"45683129000180", // Daniela
			"17757153000180", // Max Brasil
			"04586593000170", // Bragheto
			"30668678000108"  // Renato
		]

		for ( const cnpj of issuers ) {

			const fields = "&fields=nome&fields=endereco&fields=numero&fields=complemento&fields=bairro&fields=cep&fields=cidade&fields=uf&fields=site&fields=pais&fields=porte&fields=simples&fields=ieStatus&fields=status&fields=email&fields=emailNfe&fields=CNPJ&fields=Ie&fields=fone&fields=celular&fields=CNAE&fields=codpais&fields=vendedor&fields=createdAt&fields=razao&fields=fantasia"

			const filters = `&filters[CNPJ][$eq]=${ cnpj }`

			const companiesUrl = `${ oldCrmDbUrl }/empresas?${ fields + filters }`

			const oldCrmResponse = await fetch( companiesUrl, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${ oldCrmToken }`,
				}
			} )

			const oldCrmResponseData = await oldCrmResponse.json()

			if ( !oldCrmResponse.ok ) {
				console.error( 'Error from external API:', oldCrmResponseData )
			}

			const [ issuer ] = oldCrmResponseData.data

			const {
				nome,
				endereco,
				numero,
				complemento,
				bairro,
				cep,
				cidade,
				uf,
				site,
				pais,
				porte,
				simples,
				status,
				email,
				emailNfe,
				CNPJ,
				Ie,
				fone,
				celular,
				CNAE,
				codpais,
				vendedor,
				razao,
				fantasia
			} = issuer.attributes

			const dbApiUrl = process.env.DB_API_URL as string
			const dbApiToken = process.env.DB_API_TOKEN as string

			const issuersEndpoint = `${ dbApiUrl }/issuers`
			const issuerFilters = `?filters[companyData][cnpj][$eq]=${ CNPJ?.replace( /\D/g, '' ) }`

			const newIssuerResponse = await fetch( ( issuersEndpoint + issuerFilters ), {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${ dbApiToken }`,
				}
			} )

			const newIssuerResponseData = await newIssuerResponse.json()


			
			if ( newIssuerResponseData.meta.pagination.total === 0 ) {
				
				const newIssuerData: any = {
					data: {
						companyData: {
							cnpj: CNPJ?.replace( /\D/g, '' ) || "0",
							displayName: nome || fantasia,
							oficialName: razao,
							email: email,
							ie: Ie?.replace( /\D/g, '' ) || "0",
							country: pais,
							address: endereco,
							countryCode: +codpais,
							addressNumber: +numero,
							addressComplement: complemento,
							neighborhood: bairro,
							postalCode: cep?.replace( /\D/g, '' ) || "0",
							city: cidade,
							state: uf,
							website: site,
							nfeEmail: emailNfe,
							phone: fone?.replace( /\D/g, '' ) || celular?.replace( /\D/g, '' ) || "0",
							cnae: CNAE?.replace( /\D/g, '' ) || "0",
							companySize: porte,
							simplesNacional: !!simples
						}
					}
				}

				const response = await fetch( issuersEndpoint, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${ dbApiToken }`,
					},
					body: JSON.stringify( newIssuerData )
				} )
				
				const responseData = await response.json()
				return NextResponse.json( { responseData } )
				if ( response.ok ) success++
			}
		}

		return NextResponse.json( { success }, { status: 200, statusText: "ok" } )

	} catch ( error: any ) {
		console.error( 'Error in handler:', { error } )
	}
}