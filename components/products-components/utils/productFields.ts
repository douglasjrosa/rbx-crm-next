import t from "@/lib/translations"
import { FrameFormFieldProps, SelectedPieceType } from "."
import { recalculateFrameGaps } from "./recalculateFrameGaps"
import { updatePartDiv, updatePartProp } from "./handleProduct"
import { calculateInitialFrameGaps } from "./initialFrameGaps"
import { calculateFrameParams } from "./frameParams"

const getAllProductFormfields = ( selectedPiece: SelectedPieceType ): FrameFormFieldProps[] => {
	const { pieceName, pieceIndex, x, y } = selectedPiece
	return [
		{
			fieldElement: "input",
			partPropName: "frameWidth",
			fieldLabel: t( "Frame width" ),
			fieldValueType: "number",
			fieldType: "number",
			fieldProps: {
				min: 0,
				step: 10
			}
		},
		{
			fieldElement: "input",
			partPropName: "frameHeight",
			fieldLabel: t( "Frame height" ),
			fieldValueType: "number",
			fieldType: "number",
			fieldProps: {
				min: 0,
				step: 10
			}
		},
		{
			fieldElement: "input",
			partPropName: "battenWidth",
			fieldLabel: t( "Batten widths" ),
			fieldValueType: "number",
			fieldType: "number",
			fieldProps: {
				min: 0
			}
		},
		{
			fieldElement: "input",
			partPropName: "battenThickness",
			fieldLabel: t( "Batten thickness" ),
			fieldValueType: "number",
			fieldType: "number",
			fieldProps: {
				min: 0
			}
		},
		{
			fieldElement: "input",
			partPropName: "plywoodThickness",
			fieldLabel: t( "Plywood thickness" ),
			fieldValueType: "number",
			fieldType: "number",
			fieldProps: {
				min: 0
			}
		},
		{
			fieldElement: "select",
			partPropName: "externalBattenPosition",
			fieldLabel: t( "External battens position" ),
			fieldValueType: "string",
			options: [
				{ value: "horizontal", text: t( "Horizontal" ) },
				{ value: "vertical", text: t( "Vertical" ) }
			]
		},
		{
			fieldElement: "select",
			partPropName: "internalsQtyCustom",
			fieldLabel: t( "Internal battens qty" ),
			fieldValueType: "number",
			options: [
				{ value: 0, text: t( "Auto" ) },
				{ value: -1, text: "0" },
				{ value: 1, text: "1" },
				{ value: 2, text: "2" },
				{ value: 3, text: "3" },
				{ value: 4, text: "4" },
				{ value: 5, text: "5" },
				{ value: 6, text: "6" },
				{ value: 7, text: "7" },
			],
			onChange: ( e, partName, partDivIndex, frameParams ) => {
				const internalsQtyCustom = Number( e.target.value )
				const newFrameParams = calculateFrameParams( {
					partName,
					partDiv: {
						...frameParams,
						gaps: undefined,
						internalsQtyCustom
					}
				} )
				updatePartDiv( {
					partName,
					partDivIndex,
					frameParams: newFrameParams
				})
			}
		},
		{
			fieldElement: "select",
			partPropName: "hasExportStamp",
			fieldLabel: t( "Export" ),
			fieldValueType: "string",
			options: [
				{ value: "false", text: t( "No" ) },
				{ value: "true", text: t( "Yes" ) }
			]
		},
		{
			fieldElement: "input",
			partPropName: "partQty",
			fieldLabel: t( "Frame qty" ),
			fieldValueType: "number",
			fieldType: "number",
			fieldProps: {
				min: 0
			}
		},
		{
			fieldElement: "select",
			partPropName: "internalBattenPosition",
			fieldLabel: t( "Internal battens position" ),
			fieldValueType: "string",
			options: [
				{ value: "auto", text: t( "Auto" ) },
				{ value: "horizontal", text: t( "Horizontal" ) },
				{ value: "vertical", text: t( "Vertical" ) }
			]
		},
		{
			fieldElement: "input",
			partPropName: "battenWidthH",
			fieldLabel: t( "Batten width" ),
			fieldValueType: "array",
			arrayValueType: "number",
			arrayIndex: pieceIndex,
			fieldType: "number",
			fieldProps: {
				min: 0
			}
		},
		{
			fieldElement: "input",
			partPropName: "battenWidthV",
			fieldLabel: t( "Batten width" ),
			fieldValueType: "array",
			arrayValueType: "number",
			arrayIndex: pieceIndex,
			fieldType: "number",
			fieldProps: {
				min: 0
			}
		},
		{
			fieldElement: "input",
			partPropName: "battenWidthIn",
			fieldLabel: t( "Batten width" ),
			fieldValueType: "array",
			arrayValueType: "number",
			arrayIndex: pieceIndex,
			fieldType: "number",
			fieldProps: {
				min: 0
			}
		},
		{
			fieldElement: "input",
			partPropName: "gaps",
			fieldLabel: t( "Batten placement" ),
			fieldValueType: "number",
			arrayIndex: pieceIndex,
			fieldType: "number",
			fieldValue: frameParams => {
				const { finalInternalsPosition, pieces } = frameParams
				const piece = pieces?.find( piece => piece.name === pieceName )
				return finalInternalsPosition === "vertical" ? piece?.x : piece?.y
			},
			min: frameParams => {
				const { gaps, finalInternalsPosition } = frameParams
				if ( !!gaps && !!pieceIndex ) {
					const prevGap = gaps[ pieceIndex ]
					return finalInternalsPosition === "vertical"
						? prevGap.x || 0
						: prevGap.y || 0
				}
			},
			max: frameParams => {
				const { pieces, finalInternalsPosition } = frameParams
				const internalBattens = pieces?.filter( piece => piece.name.replace( /\d/g, "" ) === "battenIn" )
				if ( Array.isArray( internalBattens ) && internalBattens.length > 0 && pieceIndex !== undefined ) {
					const isLastInternalBatten = pieceIndex === internalBattens.length - 1
					console.log( { isLastInternalBatten } )
					if ( finalInternalsPosition === "vertical" ) {
						if ( isLastInternalBatten ) {
							const battenV2 = pieces?.find( piece => piece.name === "battenV2" )
							return !!battenV2 && battenV2.x - internalBattens[ pieceIndex ].width || undefined
						}
						else {
							return internalBattens[ pieceIndex + 1 ].x - internalBattens[ pieceIndex ].width
						}
					}
					else {
						if ( isLastInternalBatten ) {
							const battenH2 = pieces?.find( piece => piece.name === "battenH2" )
							return !!battenH2 && battenH2.y - internalBattens[ pieceIndex ].height || undefined
						}
						else {
							const max = internalBattens[ pieceIndex + 1 ].y - internalBattens[ pieceIndex ].height
							return max
						}
					}
				}
			},
			fieldProps: {
				step: 5
			},
			onChange: ( e, partName, partDivIndex, frameParams ) => {
				const { pieces, finalInternalsPosition } = frameParams
				const newPieces = pieces?.map( ( piece ) => {
					if ( piece.name === pieceName ) {
						return finalInternalsPosition === "vertical"
							? { ...piece, x: Number( e.target.value ) }
							: { ...piece, y: Number( e.target.value ) }
					}
					else return piece
				} )
				console.log( { newPieces } )
				const newGaps = recalculateFrameGaps( newPieces ?? [], finalInternalsPosition )

				updatePartProp( {
					partName,
					partDivIndex,
					partPropName: "gaps",
					value: newGaps,
				} )
				updatePartProp( {
					partName,
					partDivIndex,
					partPropName: "pieces",
					value: newPieces,
				} )
			}
		},
		{
			fieldElement: "select",
			fieldValueType: "array",
			arrayValueType: "object",
			objectValueType: "string",
			partPropName: "stickers",
			fieldLabel: t( "Label" ),
			arrayIndex: pieceIndex,
			objectKey: "label",
			options: [
				{ value: "fragile", text: t( "Fragile" ) },
				{ value: "logo", text: t( "Logo" ) },
				{ value: "special", text: t( "Special" ) },
			]
		},
		{
			fieldElement: "input",
			fieldType: "text",
			fieldValueType: "array",
			arrayValueType: "object",
			objectValueType: "string",
			partPropName: "stickers",
			fieldLabel: t( "Sticker code" ),
			arrayIndex: pieceIndex,
			objectKey: "labelCode",
		},
		{
			fieldElement: "select",
			fieldValueType: "array",
			arrayValueType: "object",
			objectValueType: "string",
			partPropName: "stickers",
			fieldLabel: t( "Sticker color" ),
			arrayIndex: pieceIndex,
			objectKey: "color",
			options: [
				{ value: "red", text: t( "Red" ) },
				{ value: "black", text: t( "Black" ) },
				{ value: "colorful", text: t( "Colorful" ) }
			],
			fieldProps: {
				min: 0,
				step: 10
			}
		},
		{
			fieldElement: "input",
			fieldType: "number",
			fieldValueType: "array",
			arrayValueType: "object",
			objectValueType: "number",
			partPropName: "stickers",
			fieldLabel: t( "Height" ),
			arrayIndex: pieceIndex,
			objectKey: "height",
			fieldProps: {
				min: 0,
				step: 10
			}
		},
		{
			fieldElement: "input",
			fieldType: "number",
			fieldValueType: "array",
			arrayValueType: "object",
			objectValueType: "number",
			partPropName: "stickers",
			fieldLabel: t( "Width" ),
			arrayIndex: pieceIndex,
			objectKey: "width",
			fieldProps: {
				min: 0,
				step: 10
			}
		},
		{
			fieldElement: "input",
			fieldType: "number",
			partPropName: "stickers",
			fieldLabel: t( "Sticker gap" ),
			fieldValueType: "array",
			arrayIndex: pieceIndex,
			arrayValueType: "object",
			objectKey: "gapPositioning",
			objectValueType: "number",
			fieldProps: {
				min: 1
			}
		},
		{
			fieldElement: "select",
			fieldValueType: "array",
			arrayValueType: "object",
			objectValueType: "number",
			partPropName: "stickers",
			fieldLabel: t( "Alignment" ),
			arrayIndex: pieceIndex,
			objectKey: "freeAlignment",
			options: [
				{ value: 0, text: t( "Top-left" ) },
				{ value: 1, text: t( "Free" ) }
			]
		},
		{
			fieldElement: "input",
			fieldType: "number",
			fieldValueType: "array",
			arrayValueType: "object",
			objectValueType: "number",
			partPropName: "stickers",
			fieldLabel: t( "Margin top" ),
			arrayIndex: pieceIndex,
			objectKey: "y",
			fieldProps: {
				min: 0,
				step: 10
			}
		},
		{
			fieldElement: "input",
			fieldType: "number",
			fieldValueType: "array",
			arrayValueType: "object",
			objectValueType: "number",
			partPropName: "stickers",
			fieldLabel: t( "Margin left" ),
			arrayIndex: pieceIndex,
			objectKey: "x",
			fieldProps: {
				min: 0,
				step: 10
			}
		},
		{
			fieldElement: "input",
			fieldType: "number",
			partPropName: "stickersQty",
			fieldLabel: t( "Stickers Qty" ),
			fieldValueType: "number",
			fieldProps: {
				min: 0,
				max: 6
			}
		},
	]
}

export default function getProductFormFields ( selectedPiece: SelectedPieceType ): FrameFormFieldProps[] {

	const fields = getAllProductFormfields( selectedPiece )

	const filteredFieldsMap: { [ key in SelectedPieceType[ "pieceName" ] ]?: FrameFormFieldProps[] } = {
		none: fields.filter( field => [
			"battenWidth",
			"battenThickness",
			"externalBattenPosition",
			"internalsQtyCustom",
			"hasExportStamp",
			"partQty",
		].includes( field.partPropName ) ),
		plywood: fields.filter( field => [
			"frameWidth",
			"frameHeight",
			"plywoodThickness",
			"stickersQty"
		].includes( field.partPropName ) ),
		battenH1: fields.filter( field => [
			"battenWidthH",
		].includes( field.partPropName ) ),
		battenH2: fields.filter( field => [
			"battenWidthH",
		].includes( field.partPropName ) ),
		battenV1: fields.filter( field => [
			"battenWidthV",
		].includes( field.partPropName ) ),
		battenV2: fields.filter( field => [
			"battenWidthV",
		].includes( field.partPropName ) ),
		battenIn1: fields.filter( field => [
			"battenWidthIn",
			"gaps"
		].includes( field.partPropName ) ),
		battenIn2: fields.filter( field => [
			"battenWidthIn",
			"gaps"
		].includes( field.partPropName ) ),
		battenIn3: fields.filter( field => [
			"battenWidthIn",
			"gaps"
		].includes( field.partPropName ) ),
		battenIn4: fields.filter( field => [
			"battenWidthIn",
			"gaps"
		].includes( field.partPropName ) ),
		battenIn5: fields.filter( field => [
			"battenWidthIn",
			"gaps"
		].includes( field.partPropName ) ),
		battenIn6: fields.filter( field => [
			"battenWidthIn",
			"gaps"
		].includes( field.partPropName ) ),
		battenIn7: fields.filter( field => [
			"battenWidthIn",
			"gaps"
		].includes( field.partPropName ) ),
		battenIn8: fields.filter( field => [
			"battenWidthIn",
			"gaps"
		].includes( field.partPropName ) ),
		sticker1: fields.filter( field => [
			"stickers"
		].includes( field.partPropName ) ),
		sticker2: fields.filter( field => [
			"stickers"
		].includes( field.partPropName ) ),
		sticker3: fields.filter( field => [
			"stickers"
		].includes( field.partPropName ) ),
		sticker4: fields.filter( field => [
			"stickers"
		].includes( field.partPropName ) ),
		sticker5: fields.filter( field => [
			"stickers"
		].includes( field.partPropName ) ),
		sticker6: fields.filter( field => [
			"stickers"
		].includes( field.partPropName ) )
	}
	return filteredFieldsMap[ selectedPiece.pieceName ] || []
}