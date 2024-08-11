"use client"

import { useState } from "react"
import Input from "./Input"
import t from "@/lib/translations"
import { formatCnae } from "@/lib/utils"

export default function CNAE ( { className, defaultValue, ...props }: React.InputHTMLAttributes<HTMLInputElement> ) {
	const [ value, setValue ] = useState( formatCnae( String( defaultValue ) ) )
	return (
		<Input
			type="text"
			label={ t( "CNAE" ) }
			name="cnae"
			placeholder="xxxx-x/xx"
			value={ value }
			onChange={ ( e: any ) => setValue( formatCnae( e.target.value ) ) }
			pattern="(\d{4}-\d\/\d{2})?"
			title={ t( "Digite um CNAE válido. Formato: xxxx-x/xx" ) }
			className={ `tracking-wider ${ className }` }
			{ ...props }
		/>
	)
}