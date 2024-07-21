import { NextRequest, NextResponse } from 'next/server'

export const GET = async ( req: NextRequest ) => {
	try {

		let savedNow = 0
		let savedBefore = 0
		let pagination
		const year = '2024'
		const toYear = '2024'
		const month = '07'
		const toMonth = '08'

		const oldCrmDbUrl = process.env.OLD_CRM_DB_URL as string
		const oldCrmToken = process.env.OLD_CRM_TOKEN as string

		const fields = "&fields=nome&fields=endereco&fields=numero&fields=complemento&fields=bairro&fields=cep&fields=cidade&fields=uf&fields=site&fields=pais&fields=porte&fields=simples&fields=ieStatus&fields=status&fields=email&fields=emailNfe&fields=CNPJ&fields=Ie&fields=fone&fields=celular&fields=CNAE&fields=codpais&fields=vendedor&fields=createdAt&fields=razao&fields=fantasia"

		const filters = `&filters[createdAt][$gt]=${ year }-${ month }-01&filters[createdAt][$lt]=${ toYear }-${ toMonth }-02`

		const companiesUrl = `${ oldCrmDbUrl }/empresas?${ fields + filters }`

		const response = await fetch( companiesUrl, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${ oldCrmToken }`,
			}
		} )

		const responseData = await response.json()
		pagination = responseData.meta.pagination

		if ( !response.ok ) {
			console.error( 'Error from external API:', responseData )
		}

		for ( const company of responseData.data ) {
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
			} = company.attributes


			const dbApiUrl = process.env.DB_API_URL as string
			const dbApiToken = process.env.DB_API_TOKEN as string

			if ( !CNPJ ) continue

			const newCompanyUrl = `${ dbApiUrl }/companies?filters[companyData][cnpj][$eq]=${ CNPJ?.replace( /\D/g, '' ) }`

			const response = await fetch( newCompanyUrl, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${ dbApiToken }`,
				}
			} )

			const responseData = await response.json()

			if ( responseData.meta.pagination.total > 0 ) savedBefore++
			else {

				const sellerId = vendedor === "Antonio Carlos" ? 3 : (
					vendedor === "Virginia" ? 2 : (
						vendedor === "Claudia" ? 4 : 5
					)
				)

				const newData = {
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
						},
						isActive: !!status,
						seller: sellerId,
						creditLimit: 15000,
						maximumPaymentTerm: 42,
						seasonality: 30,
						locale: "pt-BR"
					}
				}

				const newCompanyUrl = `${ dbApiUrl }/companies`
				const response = await fetch( newCompanyUrl, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${ dbApiToken }`,
					},
					body: JSON.stringify( newData )
				} )

				if ( response.ok ) savedNow++
			}
		}

		return NextResponse.json( { savedNow, savedBefore, pagination }, { status: 200, statusText: "ok" } )

	} catch ( error: any ) {
		console.error( 'Error in handler:', { error } )
	}
}