import { NextRequest, NextResponse } from 'next/server'
import { getCompanyIdByCnpj, getIssuerByCnpj, getSellerIdByEmail, isExpired, parseToFloat } from '../../utils'

export const GET = async ( req: NextRequest ) => {
	try {

		let count = 0
		let newDealSavedNow = 0
		let newOrderSavedNow = 0
		let newDealSavedBefore = 0
		let newOrderSavedBefore = 0
		let dealErrors = 0
		let orderErrors = 0
		const year = '2023'
		const toYear = '2024'
		const month = '03'
		const toMonth = '08'

		const oldCrmDbUrl = process.env.OLD_CRM_DB_URL as string
		const oldCrmToken = process.env.OLD_CRM_TOKEN as string

		const filters = `&filters[createdAt][$gt]=${ year }-${ month }-01&filters[createdAt][$lt]=${ toYear }-${ toMonth }-02`

		const businessesUrl = `${ oldCrmDbUrl }/businesses?${ filters }&populate=*`


		const response = await fetch( businessesUrl, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${ oldCrmToken }`,
			}
		} )

		const responseData = await response.json()
		
		if ( !response.ok ) {
			console.error( 'Error from external API:', responseData )
			return NextResponse.json( { message: 'Error from external API', responseData } )
		}
		const pagination = responseData.meta.pagination
		
		for ( const deal of responseData.data ) {
			
			count++
			
			if ( !!deal && !deal.hasOwnProperty( "attributes" ) )
				return NextResponse.json( { deal } )

			const {
				Mperca,
				empresa,
				vendedor,
				status,
				etapa,
				andamento,
				createdAt,
				updatedAt,
				pedidos
				
			} = deal?.attributes
			
			const companyId = await getCompanyIdByCnpj( empresa.data?.attributes?.CNPJ )

			const sellerId = await getSellerIdByEmail( vendedor.data?.attributes?.email )

			const etapas = [ null, null, "Send proposal", "Follow up", "Negotiation", "Negotiation" ]
			const dealIsExpired = isExpired( updatedAt, 30 )
			const stage = etapa < 6 && !dealIsExpired ? etapas[ etapa ] : ( andamento === 5 ? "Won" : "Lost" )

			const finishedAt = stage === "Won" || stage === "Lost" ? updatedAt : null


			const dbApiUrl = process.env.DB_API_URL as string
			const dbApiToken = process.env.DB_API_TOKEN as string

			const dealFilters = `?filters[migrationId][$eq]=${ deal.id }`
			const newDealEndpoint = `${ dbApiUrl }/deals`

			const response = await fetch( ( newDealEndpoint + dealFilters ), {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${ dbApiToken }`,
				}
			} )

			const responseData = await response.json()

			let newDealId = responseData.data?.[0]?.id

			if ( !!newDealId ) newDealSavedBefore++
			else {
				const newDealData = {
					data: {
						reasonForLoss: String( Mperca ),
						company: companyId,
						seller: sellerId,
						isActive: status,
						stage,
						startedAt: createdAt,
						followUpAt: null,
						negotiationAt: null,
						finishedAt,
						migrationId: deal.id
					}
				}

				const response = await fetch( newDealEndpoint, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${ dbApiToken }`,
					},
					body: JSON.stringify( newDealData )
				} )

				const responseData = await response.json()
				newDealId = responseData.data?.id
				if ( !newDealId ) {
					dealErrors++
					return NextResponse.json({responseData})
				}
				
				newDealSavedNow++
			}

			const pedido = pedidos.data.pop()

			if ( pedido === undefined ) continue
			
			const {
				vencPedido,
				frete,
				descontoTotal,
				custoAdicional,
				totalGeral,
				dataEntrega,
				cliente_pedido,
				obs,
				valorFrete,
				fornecedor,
				itens
			} = pedido?.attributes

			const orderItems = itens.map( ( item: any ) => {
				const { codg, prodId, nomeProd, Qtd, mont, expo, vFinal, total } = item

				return {
					productCode: codg || prodId,
					description: nomeProd,
					qty: parseToFloat( Qtd ),
					mounted: mont,
					export: expo,
					price: parseToFloat( vFinal ),
					subtotal: parseToFloat( total )
				}
			})

			const newOrderData = {
				data: {
					deal: newDealId,
					seller: sellerId,
					deliverForecast: dataEntrega || vencPedido,
					freightType: frete,
					orderDiscount: parseToFloat( descontoTotal ),
					extraCosts: parseToFloat( custoAdicional ),
					orderSubtotalValue: parseToFloat( totalGeral ) - parseToFloat( custoAdicional ) + parseToFloat( descontoTotal ),
					orderTotalValue: parseToFloat( totalGeral ),
					clientOrderCode: cliente_pedido,
					observations: obs,
					company: companyId,
					issuer: await getIssuerByCnpj( fornecedor ),
					freightValue: parseToFloat( valorFrete ),
					items: orderItems,
					isActive: true,
					migrationId: pedido.id
				}
			}

			const orderFilters = `?filters[migrationId][$eq]=${ pedido.id }`
			const newOrderEndpoint = `${ dbApiUrl }/orders`

			const orderResponse = await fetch( ( newOrderEndpoint + orderFilters ), {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${ dbApiToken }`,
				}
			} )

			const orderResponseData = await orderResponse.json()
			
			if ( !!orderResponseData.data?.[0]?.id ) newOrderSavedBefore++
			else {
				
				const orderResponse = await fetch( newOrderEndpoint, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${ dbApiToken }`,
					},
					body: JSON.stringify( newOrderData )
				} )
				const orderResponseData = await orderResponse.json()

				if ( !orderResponseData.data?.id ) {
					orderErrors++
					return NextResponse.json( { orderResponseData }, { status: orderResponse.status, statusText: orderResponse.statusText } )
				}

				newOrderSavedNow++
			}

		}
		return NextResponse.json( {
			newDealSavedNow,
			newDealSavedBefore,
			newOrderSavedNow,
			newOrderSavedBefore,
			dealErrors,
			orderErrors,
			pagination
		}, { status: 200, statusText: "ok" } )

	} catch ( error: any ) {
		console.error( 'Error in handler:', { error } )
	}
}