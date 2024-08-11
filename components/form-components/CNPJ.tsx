"use client"

import { useState } from "react"
import Input from "./Input"
import t from "@/lib/translations"
import { formatCnpj } from "@/lib/utils"

export default function CNPJ ( { className, defaultValue, ...props }: React.InputHTMLAttributes<HTMLInputElement> ) {
	const [ value, setValue ] = useState( formatCnpj( String( defaultValue ) ) )
	return (
		<Input
			type="text"
			label={ t( "CNPJ" ) }
			name="cnpj"
			placeholder="xx.xxx.xxx/xxxx-xx"
			value={ value }
			onChange={ ( e: any ) => setValue( formatCnpj( e.target.value ) ) }
			pattern="((\d{2}|\d{3})\.\d{3}\.\d{3}\/\d{4}-\d{2})?"
			title={ t( "Digite um CNPJ válido no formato xx.xxx.xxx/xxxx-xx." ) }
			className={ `tracking-wider ${ className }` }
			{ ...props }
		/>
	)
}