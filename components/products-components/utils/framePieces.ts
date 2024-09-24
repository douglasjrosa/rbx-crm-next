import t from "@/lib/translations"
import { GapsProps, PartProps, PieceProps } from "."

export const calculateFramePieces = ( {
	partDiv,
	finalInternalsPosition,
	gaps,
	partDivIndex
}: {
	partDiv: PartProps
	finalInternalsPosition: "horizontal" | "vertical"
	gaps: GapsProps[]
	partDivIndex: number
} ): PieceProps[] => {

	const {
		frameWidth,
		frameHeight,
		plywoodThickness,
		externalBattenPosition,
		battenWidthV,
		battenWidth,
		battenWidthH,
		battenThickness,
		battenWidthIn,
		hasCrossedBatten,
		crossedBattenWidth,
		crossedBattenY,
		splicingBattenWidth,
		splicingBattenThickness
	} = partDiv

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

	if ( partDivIndex > 0 ) {
		pieces.push( {
			name: `splicingBatten`,
			x: 0 - ( splicingBattenWidth || 60 ) - 50,
			y: 0,
			width: splicingBattenWidth || 60,
			height: frameHeight,
			thickness: splicingBattenThickness || battenThickness,
			fill: eucalyptus,
			unit: t( "pieces" )
		} )
	}

	for ( let i = 0; i < gaps?.length - 1; i++ ) {
		if ( finalInternalsPosition === "vertical" ) {

			pieces.push( {
				name: `battenIn${ i + 1 }`,
				x: gaps[ i ].x + gaps[ i ].width,
				y: gaps[ i ].y,
				width: battenWidthIn?.[ i ] || battenWidth,
				height: frameHeight - ( battenWidthH?.[ 0 ] || battenWidth ) - ( battenWidthH?.[ 1 ] || battenWidth ),
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
				width: frameWidth - ( battenWidthV?.[ 0 ] || battenWidth ) - ( battenWidthV?.[ 1 ] || battenWidth ),
				height: battenWidthIn?.[ i ] || battenWidth,
				thickness: battenThickness,
				fill: eucalyptus,
				unit: t( "pieces" )
			} )
		}
	}

	for ( let i = 0; !!hasCrossedBatten && finalInternalsPosition === "vertical" && i < gaps?.length; i++ ) {
		const halfBattenWidth = ( crossedBattenWidth || battenWidth ) / 2
		let y = gaps[ i ].height >= 2200 - halfBattenWidth
			? 2200
			: ( gaps[ i ].height >= 1600 - halfBattenWidth ? 1600 : frameHeight / 2 )
		y -= halfBattenWidth
		y = crossedBattenY || y
		pieces.push( {
			name: `crossedBatten${ i + 1 }`,
			x: gaps[ i ].x,
			y,
			width: gaps[ i ].width,
			height: crossedBattenWidth || battenWidth,
			thickness: battenThickness,
			fill: eucalyptus,
			unit: t( "pieces" )
		} )
	}

	return pieces
}