import { FrameParamsProps, PartNameType, PartProps } from "."
import { calculateInitialFrameGaps } from "./initialFrameGaps"
import { calculateFramePieces } from "./framePieces"
import { spreadStickersAlongTheGaps } from "./frameStickers"
import { recalculateFrameGaps } from "./recalculateFrameGaps"

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
		battenWidth,
		plywoodThickness,
		battenWidthH,
		stickersQty,
		stickers,
		internalsQtyCustom
	} = partDiv
	
	const autoInternalsPosition = externalBattenPosition === "horizontal"
	? ( frameHeight > ( frameWidth + 200 ) ? "horizontal" : "vertical" )
	: ( frameWidth > ( frameHeight + 200 ) ? "vertical" : "horizontal" )

	const finalInternalsPosition = internalBattenPosition === "auto" ? autoInternalsPosition : internalBattenPosition

	const frameLength = finalInternalsPosition === "horizontal" ? frameHeight : frameWidth
	const internalsQty = internalsQtyCustom || Math.ceil( frameLength / maxGap ) - 1

	let gaps = partDiv.gaps ?? calculateInitialFrameGaps( {
		...partDiv,
		finalInternalsPosition,
		frameLength,
		internalsQty,
	} )
	
	const pieces = calculateFramePieces( {
		partDiv,
		finalInternalsPosition,
		internalsQty,
		gaps
	} )

	gaps = recalculateFrameGaps( pieces, finalInternalsPosition )
	
	const updatedStickers = spreadStickersAlongTheGaps( gaps || [], stickers || [], stickersQty ?? 0 )

	const heightDimensionsDistance = ( internalsQty > 0 && finalInternalsPosition === "horizontal" ) ? 240 : 120

	x0 += 90
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
		stampSize,
		stickers: updatedStickers
	}

	return frameParams
}