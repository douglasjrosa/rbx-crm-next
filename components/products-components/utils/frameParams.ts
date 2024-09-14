import { FrameParamsProps, PartNameType, PartProps } from "."
import { calculateFrameGaps } from "./frameGaps"
import { calculateFramePieces } from "./framePieces"

export const calculateFrameParams = ( { partName, partDiv, scale = 0.25, x0 = 100, y0 = 300 }: {
	partName: PartNameType
	partDiv: PartProps
	scale?: number
	x0?: number
	y0?: number
} ): FrameParamsProps => {

	const {
		maxGap = 500,
		internalBattenPosition,
		externalBattenPosition,
		frameWidth,
		frameHeight,
		battenQtyIn,
		battenWidth,
		plywoodThickness,
		battenWidthH
	} = partDiv

	const autoInternalsPosition = externalBattenPosition === "horizontal"
		? ( frameHeight > ( frameWidth + 200 ) ? "horizontal" : "vertical" )
		: ( frameWidth > ( frameHeight + 200 ) ? "vertical" : "horizontal" )

	const finalInternalsPosition = internalBattenPosition === "auto" ? autoInternalsPosition : internalBattenPosition

	const frameExtension = finalInternalsPosition === "horizontal" ? frameHeight : frameWidth
	const internalsQty = battenQtyIn || Math.ceil( frameExtension / maxGap ) - 1

	const gaps = calculateFrameGaps( {
		...partDiv,
		finalInternalsPosition,
		frameExtension,
		internalsQty,
	})

	const pieces = calculateFramePieces( {
		partDiv,
		finalInternalsPosition,
		internalsQty,
		gaps
	} )

	const heightDimensionsDistance = ( internalsQty > 0 && finalInternalsPosition === "horizontal" ) ? 240 : 120

	const viewboxWidth = x0 + frameWidth + 20 + heightDimensionsDistance + 20 + x0
	const viewboxHeight = frameHeight + ( y0 + 200 )
	const viewBox = `0 0 ${ viewboxWidth } ${ viewboxHeight }`

	const listsMaxWidth = viewboxWidth * scale

	const stampSize = `${ !!plywoodThickness || ( battenWidthH?.[ 1 ] || battenWidth ) > 40 ? 40 : battenWidth }px`

	const frameParams = {
		...partDiv,
		partName,
		x0,
		y0,
		finalInternalsPosition,
		internalsQty,
		gaps,
		pieces,
		viewboxWidth,
		viewboxHeight,
		viewBox,
		listsMaxWidth,
		stampSize
	}

	return frameParams
}