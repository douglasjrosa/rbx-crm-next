import { formatBoolean } from "@/lib/utils"
import { FrameFormFieldProps, FrameParamsProps, PartNameType, PartProps, PieceProps, ProductProps, StickersProps } from "."
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
		newValue = formatBoolean( value )
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
	try {
		if ( !!localStorage ) {
			const key: string = "liveProduct"
			const serializedProduct = JSON.stringify( product )
			localStorage.setItem( key, serializedProduct )

			const event = new CustomEvent( 'liveProductUpdated' )
			window.dispatchEvent( event )
		}
	} catch ( error ) {
		console.error( "Error storing the product:", error )
	}
}

export const getLiveProduct = (): ProductProps | null => {
	try {
		if ( !!localStorage ) {
			const key = "liveProduct"
			const serializedProduct = localStorage.getItem( key )
			if ( serializedProduct ) {
				return JSON.parse( serializedProduct )
			}
			return null
		}
		else return null
	} catch ( error ) {
		console.error( "Error retrieving the product:", error )
		return null
	}
}

export const clearLiveProduct = (): void => {
	try {
		const key = "liveProduct"
		localStorage.removeItem( key )

		const event = new CustomEvent( 'liveProductUpdated' )
		window.dispatchEvent( event )
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
	frameParams: FrameParamsProps | null
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
							else return partDiv
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
			partDiv: product.template.parts[ partName ][ partDivIndex ],
			partDivIndex
		} )

		const newValue = !!field && !!frameParams
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
								return calculateFrameParams( { partName, partDiv: updatedPartDiv, partDivIndex } )
							}
							else return calculateFrameParams( { partName, partDiv, partDivIndex } )
						} )
						: product.template.parts[ partName ]
				}
			}
		}

		storeLiveProduct( newProduct )
	}
}

export const calculatePlywoodFrameFasteners = ( pieces: PieceProps[] ): { mountingQty: number, closingQty: number } => {
	let mountingQty = 0
	let closingQty = 0
	pieces.forEach( ( piece ) => {
		if ( piece.name !== 'plywood' ) {
			const length = Math.max( piece.width, piece.height )
			const wide = Math.min( piece.width, piece.height )
			closingQty += length / 100

			if( piece.name.replace( /\d/g, "" ) === "battenIn" ) mountingQty += ( ( wide - 10 ) / 10 ) + 1
			if( piece.name.replace( /\d/g, "" ) === "crossedBattan" ) mountingQty += ( ( wide - 10 ) / 10 ) + 1
		}
	} )
	mountingQty = Math.ceil( mountingQty * 1.05 )
	closingQty = Math.ceil( closingQty * 1.05 )
	return { mountingQty, closingQty }
}

export const calculatePlywoodFrameKpis = (
	fasteners: { mountingQty?: number, closingQty?: number }, stickers?: StickersProps[], hasExportStamp?: boolean 
): { mounting: number, closing: number, stickerPlacing: number, stamping: 0 | 1 } => {
	return {
		mounting: fasteners?.mountingQty ?? 0,
		closing: fasteners?.closingQty ?? 0,
		stickerPlacing: stickers?.length ?? 0,
		stamping: hasExportStamp ? 1 : 0
	}
}