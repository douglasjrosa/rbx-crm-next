import t from "@/lib/translations"

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

export interface PlywoodFrameProps {
	partTitle?: string
	externalBattenPosition: "horizontal" | "vertical"
	internalBattenPosition: "horizontal" | "vertical" | "auto"
	frameWidth: number
	battenThickness: number
	plywoodThickness?: number
	frameHeight: number
	battenQtdyIn?: number
	battenWidth: number
	battenWidthV?: [ number, number ]
	battenWidthH?: [ number, number ]
	battenWidthIn?: number[]
	maxGap: number
	customGapExtensions?: number[]
	hasFragile?: boolean
	hasLogo?: boolean
	hasExportStamp?: boolean
	showListOfMaterials?: boolean
	stickers?: StickersProps[]
	partQty: number
	measureUnit?: "cm" | "mm"
	children?: React.ReactNode
}

export const spreadStickersAlongTheGaps = ( gaps: GapsProps[], stickers?: StickersProps[] ) => {

	gaps.forEach( ( gap, index ) => {
		const margin = 20
		let gapWidth = gap.width
		let gapHeight = gap.height

		let stickerCount = 0
		stickers?.forEach( ( sticker, stickerIndex, array ) => {

			const currentSticker = {
				...sticker,
				gapPositioning: sticker.gapPositioning ?? 0,
				position: sticker.position || "top-left",
				width: sticker.width || 210,
				height: sticker.height || 148
			}

			if ( currentSticker.gapPositioning === index ) {

				const stickerFitsThisGap = gapWidth >= ( margin + currentSticker.width )
					&& ( gapHeight >= ( margin + currentSticker.height + margin * 2 ) )

				if ( stickerFitsThisGap ) {

					if ( !sticker.x ) {
						currentSticker.x = ( gaps[ index ].x ?? 0 ) +
							( [ "top-left", "middle-left", "bottom-left" ].includes( currentSticker.position ) ? margin : 0 ) +
							( [ "top-center", "middle-center", "bottom-center" ].includes( currentSticker.position ) ? ( gaps[ index ].width / 2 ) - ( currentSticker.width / 2 ) : 0 ) +
							( [ "top-right", "middle-right", "bottom-right" ].includes( currentSticker.position ) ? ( gaps[ index ].width - margin - currentSticker.width ) : 0 )
					}

					if ( !sticker.y ) {
						currentSticker.y = ( gaps[ index ].y ?? 0 ) +
							( [ "top-left", "top-center", "top-right" ].includes( currentSticker.position ) ? margin : 0 ) +
							( [ "middle-left", "middle-center", "middle-right" ].includes( currentSticker.position ) ? ( gaps[ index ].height / 2 ) - ( currentSticker.height / 2 ) : 0 ) +
							( [ "bottom-left", "bottom-center", "bottom-right" ].includes( currentSticker.position ) ? ( gaps[ index ].height - margin * 3 - currentSticker.height ) : 0 )
					}

					if ( gapHeight > currentSticker.height + margin ) {
						gapHeight -= currentSticker.height
					}
					else {
						gapWidth -= currentSticker.width
						gapHeight = gap.height
					}

					stickerCount++
				}
				else {
					currentSticker.gapPositioning++
				}
				array[ stickerIndex ] = currentSticker
			}
		} )
	} )
	return stickers
}

export const alignStickersInTheGap = ( gaps: GapsProps[], stickers?: StickersProps[] ) => {

	stickers?.forEach( ( sticker, index, array ) => {

		for ( let nextIndex = index + 1; nextIndex <= stickers.length; nextIndex++ ) {

			let comparingSticker = stickers[ nextIndex ]

			if (
				comparingSticker !== undefined
				&& comparingSticker.x !== undefined
				&& comparingSticker.y !== undefined
				&& comparingSticker.width !== undefined
				&& comparingSticker.height !== undefined
				&& sticker.width !== undefined
				&& sticker.height !== undefined
				&& sticker.position !== undefined
				&& sticker.gapPositioning !== undefined
				&& sticker.gapPositioning === comparingSticker?.gapPositioning
				&& sticker.x === comparingSticker?.x
				&& sticker.y === comparingSticker?.y
			) {

				const margin = 20

				let comparingStickerX = comparingSticker.x
				let comparingStickerY = comparingSticker.y
				let stickerX = sticker.x
				let stickerY = sticker.y

				const stickersFitsInRemainingGapHeight = gaps[ sticker.gapPositioning ].height > sticker.height + comparingSticker.height + margin * 2

				if ( stickersFitsInRemainingGapHeight ) {
					if ( [ "top-left", "top-center", "top-right" ].includes( sticker.position ) )
						comparingStickerY += sticker.height + margin

					else if ( [ "middle-left", "middle-center", "middle-right" ].includes( sticker.position ) ) {
						stickerY = ( gaps[ sticker.gapPositioning ].height - ( sticker.height + comparingSticker.height + margin ) ) / 2
						comparingStickerY = stickerY + sticker.height + margin
					}
					else {
						stickerY -= comparingSticker.height + margin
					}
				}
				else {
					if ( [ "top-left", "middle-left", "bottom-left" ].includes( sticker.position ) )
						comparingStickerX += sticker.width + margin

					else if ( [ "top-center", "middle-center", "bottom-center" ].includes( sticker.position ) ) {
						stickerX = ( gaps[ sticker.gapPositioning ].width - ( sticker.width + comparingSticker.width + margin ) ) / 2
						comparingStickerX = stickerX + sticker.width + margin
					}
					else {
						stickerX -= comparingSticker.width + margin
					}

				}

				array[ index ] = {
					...sticker,
					x: stickerX,
					y: stickerY
				}
				array[ nextIndex ] = {
					...comparingSticker,
					x: comparingStickerX,
					y: comparingStickerY
				}

			}
		}
	} )
	return stickers
}

export const calculateGaps = (
	frameWidth: number,
	frameHeight: number,
	internalsQty: number,
	frameExtension: number,
	finalInternalsPosition: string,
	battenWidth: number,
	battenWidthH?: [ number, number ],
	battenWidthV?: [ number, number ],
	battenWidthIn?: number[],
	customGapExtensions?: number[],
): GapsProps[] => {

	const gapsQty = internalsQty + 1
	let remainingGapsQty = gapsQty
	let remainingFrameExtension = frameExtension

	let remainingGapsExtension = remainingFrameExtension
		- ( finalInternalsPosition === "horizontal"
			? ( battenWidthH?.[ 0 ] || battenWidth ) + ( battenWidthH?.[ 1 ] || battenWidth )
			: ( battenWidthV?.[ 0 ] || battenWidth ) + ( battenWidthV?.[ 1 ] || battenWidth )
		)
	for ( let i = 0; internalsQty && i < internalsQty; i++ ) {
		remainingGapsExtension -= ( battenWidthIn?.[ i ] || battenWidth )
	}

	let gaps: GapsProps[] = []

	for ( let i = 0; i < gapsQty; i++ ) {

		const divisions = remainingFrameExtension / remainingGapsQty

		const firstGap = i === 0
		const lastGap = remainingGapsQty === 1

		let gapExtension = customGapExtensions?.[ i ]

		if ( !gapExtension && firstGap ) {
			gapExtension = divisions
			gapExtension -= finalInternalsPosition === "horizontal"
				? ( battenWidthH?.[ 0 ] || battenWidth )
				: ( battenWidthV?.[ 0 ] || battenWidth )
			gapExtension -= ( battenWidthIn?.[ 0 ] || battenWidth ) / 2
		}
		else if ( !gapExtension && lastGap ) {
			gapExtension = remainingGapsExtension
		}
		else {
			gapExtension = divisions
			gapExtension -= ( battenWidthIn?.[ i - 1 ] || battenWidth ) / 2
			gapExtension -= ( battenWidthIn?.[ 1 ] || battenWidth ) / 2
		}

		remainingFrameExtension -= divisions
		remainingGapsExtension -= gapExtension
		remainingGapsQty--

		if ( finalInternalsPosition === "vertical" ) {
			const xAdvance = firstGap
				? ( battenWidthV?.[ 0 ] || battenWidth )
				: gaps[ i - 1 ].x + gaps[ i - 1 ].width + ( battenWidthIn?.[ i - 1 ] || battenWidth )

			gaps.push( {
				x: xAdvance,
				y: ( battenWidthH?.[ 0 ] || battenWidth ),
				width: gapExtension,
				height: frameHeight - ( battenWidthH?.[ 0 ] || battenWidth ) - ( battenWidthH?.[ 1 ] || battenWidth )

			} )
		}
		else {
			const yAdvance: number = firstGap
				? ( battenWidthH?.[ 0 ] || battenWidth )
				: gaps[ i - 1 ].y + gaps[ i - 1 ].height + ( battenWidthIn?.[ i - 1 ] || battenWidth )

			gaps.push( {
				x: ( battenWidthV?.[ 0 ] || battenWidth ),
				y: yAdvance,
				width: frameWidth - ( battenWidthV?.[ 0 ] || battenWidth ) - ( battenWidthV?.[ 1 ] || battenWidth ),
				height: gapExtension
			} )
		}
	}

	return gaps
}

export const calculatePieces = (
	{
		externalBattenPosition,
		internalBattenPosition,
		frameWidth,
		battenThickness,
		frameHeight,
		battenQtdyIn,
		battenWidth,
		battenWidthV,
		battenWidthH,
		battenWidthIn,
		maxGap,
		customGapExtensions,
		plywoodThickness
	}: PlywoodFrameProps
): {
	pieces: PieceProps[]
	gaps: GapsProps[]
	internalsQty: number
	finalInternalsPosition: PlywoodFrameProps[ "internalBattenPosition" ]
} => {

	const pine = "#FFFF90"
	const eucalyptus = "#ffc18d"

	const pieces = []

	if ( !!plywoodThickness ) pieces.push(
		{
			name: "plywood",
			x: 0,
			y: 0,
			width: frameWidth,
			height: frameHeight,
			thickness: plywoodThickness,
			fill: pine,
			unit: t( "sheets" )
		}
	)

	pieces.push(
		{
			name: "battenH1",
			x: ( externalBattenPosition === "vertical" ? ( battenWidthV?.[ 0 ] || battenWidth ) : 0 ),
			y: 0,
			width: frameWidth - ( externalBattenPosition === "vertical" ? ( ( battenWidthV?.[ 0 ] || battenWidth ) + ( battenWidthV?.[ 1 ] || battenWidth ) ) : 0 ),
			height: battenWidthH?.[ 0 ] || battenWidth,
			thickness: battenThickness,
			fill: eucalyptus,
			unit: t( "pieces" )
		},
		{
			name: "battenH2",
			x: ( externalBattenPosition === "vertical" ? ( battenWidthV?.[ 0 ] || battenWidth ) : 0 ),
			y: 0 + frameHeight - ( battenWidthH?.[ 1 ] || battenWidth ),
			width: frameWidth - ( externalBattenPosition === "vertical" ? ( ( battenWidthV?.[ 0 ] || battenWidth ) + ( battenWidthV?.[ 1 ] || battenWidth ) ) : 0 ),
			height: battenWidthH?.[ 1 ] || battenWidth,
			thickness: battenThickness,
			fill: eucalyptus,
			unit: t( "pieces" )
		},
		{
			name: "battenV1",
			x: 0,
			y: ( externalBattenPosition === "horizontal" ? ( battenWidthH?.[ 0 ] || battenWidth ) : 0 ),
			width: battenWidthV?.[ 0 ] || battenWidth,
			height: frameHeight - ( externalBattenPosition === "horizontal" ? ( ( battenWidthH?.[ 0 ] || battenWidth ) + ( battenWidthH?.[ 1 ] || battenWidth ) ) : 0 ),
			thickness: battenThickness,
			fill: eucalyptus,
			unit: t( "pieces" )
		},
		{
			name: "battenV2",
			x: frameWidth - ( battenWidthV?.[ 1 ] || battenWidth ),
			y: ( externalBattenPosition === "horizontal" ? ( battenWidthH?.[ 0 ] || battenWidth ) : 0 ),
			width: battenWidthV?.[ 1 ] || battenWidth,
			height: frameHeight - ( externalBattenPosition === "horizontal" ? ( ( battenWidthH?.[ 0 ] || battenWidth ) + ( battenWidthH?.[ 1 ] || battenWidth ) ) : 0 ),
			thickness: battenThickness,
			fill: eucalyptus,
			unit: t( "pieces" )
		},
	)

	const autoInternalsPosition: PlywoodFrameProps[ "internalBattenPosition" ] = externalBattenPosition === "horizontal"
		? ( frameHeight > ( frameWidth + 200 ) ? "horizontal" : "vertical" )
		: ( frameWidth > ( frameHeight + 200 ) ? "vertical" : "horizontal" )

	const finalInternalsPosition = internalBattenPosition === "auto" ? autoInternalsPosition : internalBattenPosition

	const frameExtension = finalInternalsPosition === "horizontal" ? frameHeight : frameWidth
	const internalsQty = battenQtdyIn || Math.ceil( frameExtension / maxGap ) - 1

	const gaps = calculateGaps(
		frameWidth,
		frameHeight,
		internalsQty,
		frameExtension,
		finalInternalsPosition,
		battenWidth,
		battenWidthH,
		battenWidthV,
		battenWidthIn,
		customGapExtensions,
	)

	for ( let i = 0; internalsQty && i < internalsQty; i++ ) {
		if ( finalInternalsPosition === "vertical" ) {

			pieces.push( {
				name: `battenIn${ i + 1 }`,
				x: gaps[ i ].x + gaps[ i ].width,
				y: gaps[ i ].y,
				width: battenWidthIn?.[ i ] || battenWidth,
				height: gaps[ i ].height,
				thickness: battenThickness,
				fill: eucalyptus,
				unit: t( "pieces" )
			} )
		}
		else {
			pieces.push( {
				name: `battenIn${ i + 1 }`,
				x: gaps[ i ].x,
				y: gaps[ i ].y + gaps[ i ].height,
				width: gaps[ i ].width,
				height: battenWidthIn?.[ i ] || battenWidth,
				thickness: battenThickness,
				fill: eucalyptus,
				unit: t( "pieces" )
			} )
		}
	}

	return { pieces, gaps, internalsQty, finalInternalsPosition }
}