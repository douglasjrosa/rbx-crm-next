import { NextRequest, NextResponse } from 'next/server'

export const GET = async ( req: NextRequest ) => {
	try {

		let savedNow = 0
		let savedBefore = 0
		let pagination
		let updatedNow = 0
		let errors = 0
		const year = '2024'
		const toYear = '2024'
		const month = '05'
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



/* 
			const companiesUrl = `${ dbApiUrl }/companies`

			const responseUpdate = await fetch( `${ companiesUrl }?filters[displayName][$null]=true&pagination[page]=${ 1 }&pagination[pageSize]=10&populate=*`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${ dbApiToken }`,
				}
			} )

			const responseUpdateData = await responseUpdate.json()
			pagination = responseUpdateData.meta?.pagination
			console.log( { responseUpdateData } )

			for ( const company of responseUpdateData.data ) {
				if ( !!company?.attributes?.companyData?.cnpj ) {

					if ( !company.attributes?.cnpj ) {
						const id = company?.id
						const cnpj = company?.attributes?.companyData?.cnpj
						const displayName = company?.attributes?.companyData?.displayName

						const data = { cnpj, displayName, ...company.data?.attributes }

						const responseUpdate = await fetch( `${ companiesUrl }/${ id }`, {
							method: 'PUT',
							headers: {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${ dbApiToken }`,
							},
							body: JSON.stringify( { data } )
						} )
						const responseUpdateData = await responseUpdate.json()
						console.log( { id: responseUpdateData.data.id } )
						savedNow++
					}
					else savedBefore++
				}
				else errors++
			}

 */




			if ( !CNPJ ) continue

			const newCompanyUrl = `${ dbApiUrl }/companies`


			const response = await fetch( `${ newCompanyUrl }?filters[cnpj][$eq]=${ CNPJ?.replace( /\D/g, '' ) }&populate=*`, {

				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${ dbApiToken }`,
				}
			} )

			const responseData = await response.json()

			const id = responseData.data?.[ 0 ]?.id
			
			if ( id ) {
				const corporateReason = responseData.data?.[ 0 ]?.attributes?.companyData?.corporateReason
				if ( !corporateReason ) {
					const data = responseData.data?.[ 0 ]?.attributes
					data.companyData.corporateReason = razao
					const responseUpdate = await fetch( `${ newCompanyUrl }/${ id }`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${ dbApiToken }`,
						},
						body: JSON.stringify( { data } )
					} )
					const responseUpdateData = await responseUpdate.json()
					if ( responseUpdate.ok ) {
						updatedNow++
						console.log( { id: responseUpdateData.data.id } )
					} else errors++
				}
				else savedBefore++
			}
			else {

				const sellerId = vendedor === "Antonio Carlos" ? 3 : (
					vendedor === "Virginia" ? 2 : (
						vendedor === "Claudia" ? 4 : 5
					)
				)

				const newData = {
					data: {
						cnpj: CNPJ?.replace( /\D/g, '' ) || "0",
						displayName: nome || fantasia,
						companyData: {
							corporateReason: razao,
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

		return NextResponse.json( { savedNow, savedBefore, updatedNow, errors, pagination }, { status: 200, statusText: "ok" } )

	} catch ( error: any ) {
		console.error( 'Error in handler:', { error } )
	}
}