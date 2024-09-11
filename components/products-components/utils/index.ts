import { Dispatch, SetStateAction } from "react"

export type PartNameType = keyof ProductProps[ "template" ][ "parts" ]

export type Pc = {
	name: string
	length: number
	wide: number
	thickness: number
	qty: number
	unit: string
}

export interface PartProps {
	frameWidth: number
	frameHeight: number
	frame: string
	battenWidth: number
	battenThickness: number
	plywoodThickness: number
	externalBattenPosition: "horizontal" | "vertical"
	partQty: number
	internalBattenPosition: "horizontal" | "vertical" | "auto"
	maxGap?: number
	stickers?: StickersProps[]
	battenQtyIn?: number
	customGapExtensions?: number[]
	battenWidthV?: [ number, number ]
	battenWidthH?: [ number, number ]
	battenWidthIn?: number[]
	measureUnit?: "cm" | "mm"
	hasExportStamp?: boolean
}

export interface FrameParamsProps extends PartProps {
	viewBox: string
	viewboxWidth: number
	viewboxHeight: number
	x0: number
	y0: number
	pieces: PieceProps[]
	finalInternalsPosition: "horizontal" | "vertical"
	internalsQty: number
	gaps: GapsProps[]
	stampSize: string
	listsMaxWidth: number
}

export interface ProductProps {
	name: string
	companyId: number
	clientCode: string
	templateId: number
	length: number
	width: number
	height: number
	contentWeight?: number
	template: {
		name: string
		parts: {
			lid: PartProps[]
			leftSide: PartProps[]
			rightSide: PartProps[]
			leftHeader: PartProps[]
			rightHeader: PartProps[]
		}
	}
}

export interface StickersProps {
	x?: number
	y?: number
	width?: number
	height?: number
	label: string
	labelCode: string
	color: "black" | "red"
	fontSize?: string
	position?: (
		"top-left"
		| "top-center"
		| "top-right"
		| "middle-left"
		| "middle-center"
		| "middle-right"
		| "bottom-left"
		| "bottom-center"
		| "bottom-right"
	)
	gapPositioning?: number
}

export interface GapsProps {
	x: number
	y: number
	width: number
	height: number

}

export interface FastenerProps {
	id?: number
	name: string
	unit?: string
	qty: number
}

export interface PieceProps {
	name: string
	x: number
	y: number
	width?: number
	height?: number
	thickness?: number
	unit?: string
	fill?: string
	fasteners?: FastenerProps[]
}

export interface FrameFormFieldProps {
	name: keyof PartProps
	element: "select" | "input"
	label: string
	type?: "text" | "number"
	valueType: "number" | "string" | "boolean" | "array"
	arrayIndex?: number
	options?: {
		value: string | number | boolean
		text: string
	}[]
	[ key: string ]: any
}

export type SelectedPieceType = {
	name: "none"
	| "plywood"
	| "battenH1"
	| "battenH2"
	| "battenV1"
	| "battenV2"
	| "battenIn1"
	| "battenIn2"
	| "battenIn3"
	| "battenIn4"
	| "battenIn5"
	| "battenIn6"
	| "battenIn7"
	| "battenIn8"
	pieceIndex?: number
	x?: number
	y?: number
	width?: number
	height?: number
}

export interface FrameComponentProps {
	partTitle: string
	frameParams: FrameParamsProps
	scale: number
	selectedPiece?: SelectedPieceType
	setSelectedPiece?: Dispatch<SetStateAction<SelectedPieceType>>
	showListOfMaterials?: boolean
	showListOfOthers?: boolean
	children?: React.ReactNode
}

export const calculateScale = ( boxWidth: number, partWidths: number[] ): number => {

	return 0.25
}

export const getPartTitle = ( partName: PartNameType ) => {
	const mapTitles = {
		base: "Base",
		lid: "Lid",
		leftSide: "Left Side",
		rightSide: "Right Side",
		leftHeader: "Left Header",
		rightHeader: "Right Header"
	}
	return mapTitles[ partName ]
}