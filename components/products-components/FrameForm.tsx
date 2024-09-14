"use client"

import Select from "../form-components/Select"
import { FrameFormFieldProps, FrameParamsProps, GapsProps, PartNameType, PartProps, PieceProps, ProductProps, StickersProps } from "./utils"
import { Dispatch, SetStateAction, useState } from "react"
import Input from "../form-components/Input"
import { calculateFrameParams } from "./utils/frameParams"

export default function FrameForm ( {
	partName,
	partDivIndex,
	frameParams,
	product,
	setProduct,
	fields
}: {
	partName: PartNameType
	partDivIndex: number
	frameParams: FrameParamsProps
	product: ProductProps
	setProduct: Dispatch<SetStateAction<ProductProps>>
	fields?: FrameFormFieldProps[]
} ) {

	let [ updatingProduct, setUpdatingProduct ] = useState( product )

	const handleChange = (
		partPropName: keyof PartProps,
		partDivIndex: number,
		fieldValueType: "string" | "number" | "boolean" | "array",
		value: any,
		arrayValueType?: "string" | "number" | "object",
		arrayIndex?: number,
		objectKey?: keyof StickersProps | keyof PieceProps | keyof GapsProps,
		objectValueType?: "string" | "number"
	) => {
		let newValue: any

		if ( fieldValueType === "number" ) newValue = Number( value )
		else if ( fieldValueType === "string" ) newValue = String( value )
		else if ( fieldValueType === "boolean" ) {
			newValue = value !== false
				&& value !== "false"
				&& value !== 0
				&& value !== "0"
				&& value !== null
				&& value !== undefined
				&& value !== ""
				&& value !== "NaN"
		}
		else if ( fieldValueType === "array" ) {
			newValue = []
			if ( arrayIndex !== undefined ) {
				const count = Array.isArray( frameParams[ partPropName ] ) ? frameParams[ partPropName ].length : 0
				for ( let i = 0; i < count; i++ ) {
					if ( Array.isArray( frameParams[ partPropName ] ) && frameParams[ partPropName ][ i ] !== undefined )
						newValue.push( frameParams[ partPropName ][ i ] )
					else
						newValue.push( arrayValueType === "number" ? 0 : "" )
				}

				if ( arrayValueType === "number" )
					newValue[ arrayIndex ] = Number( value )
				else if ( arrayValueType === "string" )
					newValue[ arrayIndex ] = String( value )
				else if ( arrayValueType === "object" && !!objectKey )
					newValue[ arrayIndex ][ objectKey ] = objectValueType === "string" ? String( value ) : Number( value )
				else throw new Error( `Error trying to update propriety "${ partPropName }" of part "${ partName }"` )
			}
			else newValue.push( arrayValueType === "number" ? Number( value ) : String( value ) )
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
							if ( i === partDivIndex ) {
								const updatedPartDiv = { ...partDiv, [ partPropName ]: newValue }
								return calculateFrameParams( { partName, partDiv: updatedPartDiv } )
							}
							return calculateFrameParams( { partName, partDiv } )
						} )
						: updatingProduct.template.parts[ partName ]
				}
			}
		}

		setUpdatingProduct( updatedProduct )
		setProduct( updatedProduct )
	}

	return (
		<div onClick={ e => e.stopPropagation() } className="flex gap-3 flex-wrap justify-around">
			{ !!fields && fields.map( ( field, i ) => {

				const {
					fieldElement,
					fieldLabel,
					partPropName,
					options,
					fieldValueType,
					arrayIndex,
					fieldType,
					arrayValueType,
					objectKey,
					objectValueType,
					fieldProps,
					fieldValue
				} = field

				let newValue
				if ( fieldValueType === "array" && arrayIndex !== undefined ) {
					if ( arrayValueType === "string" )
						newValue = String( frameParams[ partPropName ] )
					else if ( arrayValueType === "number" )
						newValue = Number( frameParams[ partPropName ] )
					else if (
						arrayValueType === "object"
						&& Array.isArray( frameParams[ partPropName ] )
						&& !!objectKey
						&& frameParams[ partPropName ][ arrayIndex ]?.[ objectKey ] !== undefined
					) {
						newValue = objectValueType === "string"
							? String( frameParams[ partPropName ][ arrayIndex ][ objectKey ] ?? "" )
							: Number( frameParams[ partPropName ][ arrayIndex ][ objectKey ] ?? 0 )
					}
					else {
						console.error( { frameParams, partPropName, arrayIndex, objectKey } )
						throw new Error( `Error mounting frame form value of propriety "${ partPropName }" of part "${ partName }"` )
					}
				}
				else newValue = fieldValueType === "string"
					? String( frameParams[ partPropName ] ?? fieldValue ?? "" )
					: Number( frameParams[ partPropName ] ?? fieldValue ?? 0 )

					
					if ( fieldElement === "select" && !!options ) {
						return (
							<div className="flex-none w-52">
							<Select
								key={ i }
								name={ partPropName }
								label={ fieldLabel }
								value={ newValue }
								onChange={ e => handleChange(
									partPropName,
									partDivIndex,
									fieldValueType,
									e.target.value,
									arrayValueType,
									arrayIndex,
									objectKey,
									objectValueType
								) }
								options={ options }
								className="flex-none"
								{ ...fieldProps }
								/>
						</div>
					)
				}
				if ( fieldElement === "input" && fieldType ) {
					return (
						<div className="flex-none w-52">
							<Input
								key={ i }
								type={ fieldType }
								name={ partPropName }
								label={ fieldLabel }
								value={ newValue }
								onChange={ e => handleChange(
									partPropName,
									partDivIndex,
									fieldValueType,
									e.target.value,
									arrayValueType,
									arrayIndex,
									objectKey,
									objectValueType
								) }
								className="flex-none"
								{ ...fieldProps }
							/>
						</div>
					)
				}
			} ) }
		</div>
	)
}
