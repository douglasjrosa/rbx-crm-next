"use client"

import { useState } from "react"
import Input from "./Input"
import t from "@/lib/translations"
import { formatPhone } from "@/lib/utils"

export default function PHONE ( { className, defaultValue, ...props }: React.InputHTMLAttributes<HTMLInputElement> ) {
	const [ value, setValue ] = useState( formatPhone( String( defaultValue ) ) )
	return (
		<Input
			type="text"
			label={ t( "Phone" ) }
			name="phone"
			placeholder="(xx) x xxxx-xxxx"
			value={ value }
			onChange={ ( e: any ) => setValue( formatPhone( e.target.value ) ) }
			pattern="(\(\d{2}\)\s(\d{1}\s)?\d{4}-\d{4})?"
			title={ t( "Digite um número de telefone válido." ) }
			className={ `tracking-wider ${ className }` }
			{ ...props }
		/>
	)
}