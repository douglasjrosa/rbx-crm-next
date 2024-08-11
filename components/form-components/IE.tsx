"use client"

import { useState } from "react"
import Input from "./Input"
import t from "@/lib/translations"
import { formatIE } from "@/lib/utils"

export default function IE ( { className, defaultValue, ...props }: React.InputHTMLAttributes<HTMLInputElement> ) {
	const [ value, setValue ] = useState( formatIE( String( defaultValue ) ) )
	return (
		<Input
			type="text"
			label={ t( "IE" ) }
			name="ie"
			value={ value }
			placeholder="xxx.xxx.xxx.xxx"
			onChange={ ( e: any ) => setValue( formatIE( e.target.value ) ) }
			pattern="(\d{3}\.\d{3}\.\d{3}.\d{3})?"
			title={ t( "Enter the I.E. in the format xxx.xxx.xxx.xxx." ) }
			className={ `tracking-wider ${ className }` }
			{ ...props }
		/>
	)
}