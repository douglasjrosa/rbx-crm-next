import t from "@/lib/translations"
import { FrameFormFieldProps, SelectedPieceType } from "."

const getAllProductFormfields = ( pieceIndex?: number ): FrameFormFieldProps[] => [
	{
		element: "input",
		name: "frameWidth",
		label: t( "Frame width" ),
		valueType: "number",
		type: "number",
		min: 0
	},
	{
		element: "input",
		name: "frameHeight",
		label: t( "Frame height" ),
		valueType: "number",
		type: "number",
		min: 0
	},
	{
		element: "input",
		name: "battenWidth",
		label: t( "Batten widths" ),
		valueType: "number",
		type: "number",
		min: 0
	},
	{
		element: "input",
		name: "battenThickness",
		label: t( "Batten thickness" ),
		valueType: "number",
		type: "number",
		min: 0
	},
	{
		element: "input",
		name: "plywoodThickness",
		label: t( "Plywood thickness" ),
		valueType: "number",
		type: "number",
		min: 0
	},
	{
		element: "select",
		name: "externalBattenPosition",
		label: t( "External battens position" ),
		valueType: "string",
		options: [
			{ value: "horizontal", text: t( "Horizontal" ) },
			{ value: "vertical", text: t( "Vertical" ) }
		]
	},
	{
		element: "select",
		name: "battenQtyIn",
		label: t( "Internal battens qty" ),
		valueType: "number",
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
		]
	},
	{
		element: "select",
		name: "hasExportStamp",
		label: t( "Export" ),
		valueType: "boolean",
		options: [
			{ value: false, text: t( "No" ) },
			{ value: true, text: t( "Yes" ) }
		]
	},
	{
		element: "input",
		name: "partQty",
		label: t( "Frame qty" ),
		valueType: "number",
		type: "number",
		min: 0
	},
	{
		element: "select",
		name: "internalBattenPosition",
		label: t( "Internal battens position" ),
		valueType: "string",
		options: [
			{ value: "auto", text: t( "Auto" ) },
			{ value: "horizontal", text: t( "Horizontal" ) },
			{ value: "vertical", text: t( "Vertical" ) }
		]
	},
	{
		element: "input",
		name: "battenWidthH",
		label: t( "Batten width" ),
		valueType: "array",
		arrayIndex: pieceIndex,
		type: "number",
		min: 0
	},
	{
		element: "input",
		name: "battenWidthV",
		label: t( "Batten width" ),
		valueType: "array",
		arrayIndex: pieceIndex,
		type: "number",
		min: 0
	},
	{
		element: "input",
		name: "battenWidthIn",
		label: t( "Batten width" ),
		valueType: "array",
		arrayIndex: pieceIndex,
		type: "number",
		min: 0
	},
	{
		element: "input",
		name: "customGapExtensions",
		label: t( "Gap widths" ),
		valueType: "array",
		arrayIndex: pieceIndex,
		type: "number",
		min: 0
	},
]

export default function getProductFormFields ( selectedPiece: SelectedPieceType ): FrameFormFieldProps[] {

	const { name, pieceIndex } = selectedPiece

	const fields = getAllProductFormfields( pieceIndex )
	
	const filteredFieldsMap: { [ key in SelectedPieceType[ "name" ] ]?: FrameFormFieldProps[] } = {
		none: fields.filter( field => [
			"battenWidth",
			"battenThickness",
			"externalBattenPosition",
			"battenQtyIn",
			"hasExportStamp",
			"partQty",
		].includes( field.name ) ),
		plywood: fields.filter( field => [
			"frameWidth",
			"frameHeight",
			"plywoodThickness",
		].includes( field.name ) ),
		battenH1: fields.filter( field => [
			"battenWidthH",
		].includes( field.name ) ),
		battenH2: fields.filter( field => [
			"battenWidthH",
		].includes( field.name ) ),
		battenV1: fields.filter( field => [
			"battenWidthV",
		].includes( field.name ) ),
		battenV2: fields.filter( field => [
			"battenWidthV",
		].includes( field.name ) ),
		battenIn1: fields.filter( field => [
			"battenWidthIn",
			"customGapExtensions"
		].includes( field.name ) ),
		battenIn2: fields.filter( field => [
			"battenWidthIn",
			"customGapExtensions"
		].includes( field.name ) ),
		battenIn3: fields.filter( field => [
			"battenWidthIn",
			"customGapExtensions"
		].includes( field.name ) ),
		battenIn4: fields.filter( field => [
			"battenWidthIn",
			"customGapExtensions"
		].includes( field.name ) ),
		battenIn5: fields.filter( field => [
			"battenWidthIn",
			"customGapExtensions"
		].includes( field.name ) ),
		battenIn6: fields.filter( field => [
			"battenWidthIn",
			"customGapExtensions"
		].includes( field.name ) ),
		battenIn7: fields.filter( field => [
			"battenWidthIn",
			"customGapExtensions"
		].includes( field.name ) ),
		battenIn8: fields.filter( field => [
			"battenWidthIn",
			"customGapExtensions"
		].includes( field.name ) ),
	}
	return filteredFieldsMap[ name ] || []
}