import t from "@/lib/translations"
import { GapsProps, PartProps, PieceProps } from "."

export const calculateFramePieces = ( {
	partDiv,
	finalInternalsPosition,
	internalsQty,
	gaps
}: {
	partDiv: PartProps
	finalInternalsPosition: "horizontal" | "vertical"
	internalsQty: number
	gaps: GapsProps[]
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
		battenWidthIn
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

	return pieces
}