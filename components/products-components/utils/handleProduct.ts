import { FrameFormFieldProps, FrameParamsProps, PartNameType, PartProps, ProductProps } from "."
import { calculateFrameParams } from "./frameParams"

const handlePartPropValueFromField = (
	partName: PartNameType,
	value: any,
	field: FrameFormFieldProps,
	frameParams: FrameParamsProps
) => {

	const {
		partPropName,
		fieldValueType,
		arrayIndex,
		arrayValueType,
		objectKey,
		objectValueType
	} = field

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
			else if ( arrayValueType === "object" && !!objectKey ) {
				newValue[ arrayIndex ][ objectKey ] = objectValueType === "string" ? String( value ) : Number( value )
			}
			else throw new Error( `Error trying to update propriety "${ partPropName }" of part "${ partName }"` )
		}
		else newValue.push( arrayValueType === "number" ? Number( value ) : String( value ) )
	}
	else newValue = value

	return newValue
}

export const storeLiveProduct = ( product: any ): void => {
	const key: string = "liveProduct"
	try {
		const serializedProduct = JSON.stringify( product )
		localStorage.setItem( key, serializedProduct )

		const event = new CustomEvent( 'liveProductUpdated' )
		window.dispatchEvent( event );

	} catch ( error ) {
		console.error( "Error storing the product:", error )
	}
}

export const getLiveProduct = (): ProductProps | null => {
	const key = "liveProduct"
	try {
		const serializedProduct = localStorage.getItem( key )
		if ( serializedProduct ) {
			return JSON.parse( serializedProduct )
		}
		console.warn( `No product found with key "${ key }".` )
		return null
	} catch ( error ) {
		console.error( "Error retrieving the product:", error )
		return null
	}
}

export const clearLiveProduct = (): void => {
	const key = "liveProduct"
	try {
		localStorage.removeItem( key )
		
		const event = new CustomEvent( 'liveProductUpdated' )
		window.dispatchEvent( event );
	} catch ( error ) {
		console.error( "Error clearing the product:", error )
	}
}

export const getPart = ( partName: PartNameType ): PartProps[] | null => {
	const product = getLiveProduct()
	return product ? product.template.parts[ partName ] : null
}

export const updatePartDiv = ( {
	partName,
	partDivIndex,
	frameParams
}: {
	partName: PartNameType
	partDivIndex: number
	frameParams: FrameParamsProps
}
): void => {

	const product = getLiveProduct()
	if ( !!product ) {
		const newProduct = {
			...product,
			template: {
				...product.template,
				parts: {
					...product.template.parts,
					[ partName ]: Array.isArray( product.template.parts[ partName ] )
						? product.template.parts[ partName ].map( ( partDiv, i ) => {
							if ( i === partDivIndex ) {
								return frameParams
							}
						} )
						: product.template.parts[ partName ]
				}
			}
		}

		storeLiveProduct( newProduct )
	}
}

export const updatePartProp = ( {
	partName,
	partDivIndex,
	partPropName,
	value,
	field
}: {
	partName: PartNameType,
	partDivIndex: number,
	partPropName: keyof FrameParamsProps,
	value: any,
	field?: FrameFormFieldProps
}
): void => {

	const product = getLiveProduct()
	if ( !!product ) {
		const frameParams = calculateFrameParams( {
			partName,
			partDiv: product.template.parts[ partName ][ partDivIndex ]
		} )

		const newValue = !!field
			? handlePartPropValueFromField( partName, value, field, frameParams )
			: value

		const newProduct = {
			...product,
			template: {
				...product.template,
				parts: {
					...product.template.parts,
					[ partName ]: Array.isArray( product.template.parts[ partName ] )
						? product.template.parts[ partName ].map( ( partDiv, i ) => {
							if ( i === partDivIndex ) {
								const updatedPartDiv = { ...partDiv, [ partPropName ]: newValue }
								return calculateFrameParams( { partName, partDiv: updatedPartDiv } )
							}
							return calculateFrameParams( { partName, partDiv } )
						} )
						: product.template.parts[ partName ]
				}
			}
		}

		storeLiveProduct( newProduct )
	}
}
