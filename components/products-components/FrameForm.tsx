"use client"

import Select from "../form-components/Select"
import { FrameFormFieldProps, FrameParamsProps, PartNameType, PartProps, ProductProps } from "./utils"
import { Dispatch, SetStateAction, useState } from "react"
import Input from "../form-components/Input"
import { calculateFrameParams } from "./utils/frameParams"

export default function FrameForm ( { partName, index, frameParams, product, setProduct, fields }: {
	partName: PartNameType
	index: number
	frameParams: FrameParamsProps
	product: ProductProps
	setProduct: Dispatch<SetStateAction<ProductProps>>
	fields?: FrameFormFieldProps[]
} ) {

	let [ updatingProduct, setUpdatingProduct ] = useState( product )

	const handleChange = (
		name: keyof PartProps,
		index: number,
		valueType: "string" | "number" | "boolean" | "array",
		value: any,
		type?: "text" | "number",
		arrayIndex?: number
	) => {
		let newValue: any

		if ( valueType === "number" ) newValue = Number( value )
		else if ( valueType === "string" ) newValue = String( value )
		else if ( valueType === "boolean" ) {
			newValue = value !== false
				&& value !== "false"
				&& value !== 0
				&& value !== "0"
				&& value !== null
				&& value !== undefined
				&& value !== ""
				&& value !== "NaN"
		}
		else if ( valueType === "array" ) {
			newValue = []
			if ( arrayIndex !== undefined ) {
				const count = Array.isArray( frameParams[ name ] ) ? frameParams[ name ].length : 0
				for ( let i = 0; i < count; i++ ) {
					if ( Array.isArray( frameParams[ name ] ) && frameParams[ name ][ i ] !== undefined )
						newValue.push( frameParams[ name ][ i ] )
					else
						newValue.push( type === "number" ? 0 : "" )
				}
				newValue[ arrayIndex ] = type === "number" ? Number( value ) : String( value )
			}
			else newValue.push( type === "number" ? Number( value ) : String( value ) )
		}
		else newValue = value

		const updatedProduct = {
			...updatingProduct,
			template: {
				...updatingProduct.template,
				parts: {
					...updatingProduct.template.parts,
					[ partName ]: Array.isArray( updatingProduct.template.parts[ partName ] )
						? updatingProduct.template.parts[ partName ].map( ( partDiv, i ) => {
							if ( i === index ) {
								const updatedPartDiv = { ...partDiv, [ name ]: newValue }
								return calculateFrameParams( { partDiv: updatedPartDiv } )
							}
							return calculateFrameParams( { partDiv } )
						} )
						: updatingProduct.template.parts[ partName ]
				}
			}
		}

		setUpdatingProduct( updatedProduct )
		setProduct( updatedProduct )
	}

	return (
		<div onClick={ e => e.stopPropagation() } className="flex flex-col gap-3">
			{ !!fields && fields.map( ( field, i ) => {

				const { element, name, options, valueType, arrayIndex, type } = field

				let { value } = field
				if ( value === undefined ) {
					if ( valueType === "array" && arrayIndex !== undefined )
						value = Array.isArray( frameParams[ name ] ) ? frameParams[ name ]?.[ arrayIndex ] : frameParams[ name ] ?? 0
					else
						value = frameParams[ name ]
				}

				if ( element === "select" ) {
					return (
						<div key={ i }>
							{ options &&
								<Select
									{ ...field }
									value={ value }
									onChange={ e => handleChange(
										name,
										index,
										valueType,
										e.target.value,
										type,
										arrayIndex
									) }
									options={ options }
								/>
							}
						</div>
					)
				}
				if ( element === "input" ) {
					return (
						<div key={ i }>
							{ type &&
								<Input
									{ ...field }
									type={ type }
									value={ value }
									onChange={ e => handleChange(
										name,
										index,
										valueType,
										e.target.value,
										type,
										arrayIndex
									) }
								/>
							}
						</div>
					)
				}
			} ) }
		</div>
	)
}
