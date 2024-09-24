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
	battenWidthV?: [ number, number ]
	battenWidthH?: [ number, number ]
	battenWidthIn?: number[]
	crossedBattenWidth?: number
	crossedBattenY?: number
	measureUnit?: "cm" | "mm"
	hasExportStamp?: boolean
	stickersQty?: number
	pieces?: PieceProps[]
	gaps?: GapsProps[]
	internalsQtyCustom?: number
	hasCrossedBatten?: boolean
	splicingBattenWidth?: number
	splicingBattenThickness?: number
	fasteners?: {
		mountingQty?: number
		closingQty?: number
	}
	kpis?: {
		mounting?: number
		closing?: number
		stickerPlacing?: number
		stamping?: number
	}
}

export interface FrameParamsProps extends PartProps {
	viewBox: string
	viewboxWidth: number
	viewboxHeight: number
	x0: number
	y0: number
	finalInternalsPosition: "horizontal" | "vertical"
	internalsQty: number
	stampSize: string
	listsMaxWidth: number
	partName: PartNameType
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
	name: string
	label: "fragile" | "logo" | "spec"
	labelCode: string
	color: "black" | "red" | "colorful"
	x?: number
	y?: number
	width?: number
	height?: number
	fontSize?: string
	gapPositioning?: number
	doesNotFit?: boolean
	freeAlignment?: "top-left" | "free"
}

export interface GapsProps {
	x: number
	y: number
	width: number
	height: number

}

export interface PieceProps {
	name: string
	x: number
	y: number
	width: number
	height: number
	thickness?: number
	unit?: string
	fill?: string
}

export interface FrameFormFieldProps {
	partPropName: keyof PartProps
	fieldElement: "select" | "input" | "switch"
	fieldLabel: string
	fieldType?: "text" | "number" | "object"
	fieldProps?: { [ key: string ]: any }
	fieldValue?: ( frameParams: FrameParamsProps ) => string | number | readonly string[] | undefined
	min?: ( frameParams: FrameParamsProps ) => number | undefined
	max?: ( frameParams: FrameParamsProps ) => number | undefined
	fieldValueType: "number" | "string" | "boolean" | "array"
	arrayIndex?: number
	arrayValueType?: "number" | "string" | "object"
	options?: {
		value: string | number | boolean
		text: string
	}[]
	objectKey?: keyof StickersProps | keyof PieceProps | keyof GapsProps
	objectValueType?: "number" | "string",
	onChange?: (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
		partName: PartNameType,
		partDivIndex: number,
		frameParams: FrameParamsProps
	) => void
}

export type SelectedPieceType = {
	pieceName: string
	pieceIndex?: number
	partDivIndex?: number
	x?: number
	y?: number
	width?: number
	height?: number
}

export interface FrameComponentProps {
	partDivIndex: number
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