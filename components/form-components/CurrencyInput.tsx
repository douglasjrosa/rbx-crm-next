"use client"

import { useState } from "react"
import Input from "./Input"
import t from "@/lib/translations"
import { formatCurrency } from "@/lib/utils"

export default function CurrencyInput ( {
	label,
	name,
	currency,
	className,
	defaultValue,
	...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string, name: string, currency?: string } ) {

	const [ value, setValue ] = useState( formatCurrency( String( defaultValue ) ) )
	
	return (
		<Input
			type="text"
			label={ label }
			name={ name }
			placeholder={ `${ currency && currency + " " }xx.xxx,xx` }
			value={ value }
			onChange={ ( e: any ) => setValue( formatCurrency( e.target.value ) ) }
			pattern="([a-Z ]+)?(\d{2}\.\d{3},\d{2})?"
			title={ `${ t( "Enter a valid value" ) }. ${ t( "Format" ) }: ${ currency && currency + " " }xx.xxx-xxx.` }
			className={ `tracking-wider ${ className }` }
			{ ...props }
		/>
	)
}