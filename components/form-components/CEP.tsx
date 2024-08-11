"use client"

import { useState } from "react"
import Input from "./Input"
import t from "@/lib/translations"
import { formatCEP } from "@/lib/utils"

export default function CEP ( { className, name, defaultValue, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { name: string } ) {
	const [ value, setValue ] = useState( formatCEP( String( defaultValue ) ) )
	return (
		<Input
			type="text"
			label={ t( "CEP" ) }
			name={ name }
			placeholder="xx.xxx-xxx"
			value={ value }
			onChange={ ( e: any ) => setValue( formatCEP( e.target.value ) ) }
			pattern="(\d{2}\.\d{3}-\d{3})?"
			title={ t( "Digite um CEP válido. Formato: xx.xxx-xxx" ) }
			className={ `tracking-wider ${ className }` }
			{ ...props }
		/>
	)
}