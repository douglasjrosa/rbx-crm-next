"use client"

import { useEffect, useState } from "react"
import Select from "./form-components/Select"
import t from "@/lib/translations"
import { AllPaymentMethodsSelectOptionsType } from "@/app/api/utils"
import Card from "./Card"

export default function IssuerAndPaymentMethodSelects (
	{
		defaultIssuerId,
		defaultPaymentMethodId,
		allPaymentMethods
	}: {
		defaultIssuerId: string
		defaultPaymentMethodId: string
		allPaymentMethods: AllPaymentMethodsSelectOptionsType
	}
) {

	const [ issuerId, setIssuerId ] = useState( defaultIssuerId )
	const [ issuersOptions, setIssuersOptions ] = useState<{ value: string, text: string }[]>()

	const [ paymentMethodId, setPaymentMethodId ] = useState( defaultPaymentMethodId )
	const [ paymentMethodsOptions, setPaymentMethodsOptions ] = useState<{ value: string, text: string }[]>()

	useEffect( () => {
		const allIssuersOptions = allPaymentMethods.map( issuer => ( { value: issuer.value, text: issuer.text } ) )
		setIssuersOptions( allIssuersOptions )

		const [ currentIssuer ] = allPaymentMethods.filter( ( issuer ) => issuer.value === issuerId )
		setPaymentMethodsOptions( currentIssuer.paymentMethodsOptions )
	}, [ issuerId, allPaymentMethods ] )

	return (
		<Card className="flex flex-col gap-4 p-6 w-full">
			{ issuersOptions &&
				<Select
					label={ t( "Issuer" ) }
					name="issuerId"
					options={ issuersOptions }
					value={ issuerId }
					onChange={ ( e ) => setIssuerId( e.target.value ) }
				/>
			}
			{ paymentMethodsOptions &&
				<Select
					label={ t( "Payment method" ) }
					name="payment_method"
					options={ paymentMethodsOptions }
					value={ paymentMethodId }
					onChange={ ( e ) => setPaymentMethodId( e.target.value ) }
				/>
			}
		</Card>
	)
}