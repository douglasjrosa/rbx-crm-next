import { GapsProps, PieceProps } from "."

export const recalculateFrameGaps = ( pieces: PieceProps[], finalInternalsPosition: "vertical" | "horizontal" ): GapsProps[] => {
	const gaps: GapsProps[] = []
	if ( !!pieces?.length ) {
		const externalBattensH = pieces.filter( piece => piece.name.replace( /\d/g, "" ) === "battenH" )
		const externalBattensV = pieces.filter( piece => piece.name.replace( /\d/g, "" ) === "battenV" )
		const internalBattens = pieces.filter( piece => piece.name.replace( /\d/g, "" ) === "battenIn" )

		const internalsQty = internalBattens.length

		if ( internalsQty === 0 ) {
			gaps.push( {
				x: externalBattensV[ 0 ].x + externalBattensV[ 0 ].width,
				y: externalBattensH[ 0 ].y + externalBattensH[ 0 ].height,
				width: externalBattensV[ 1 ].x - externalBattensV[ 0 ].x - externalBattensV[ 0 ].width,
				height: externalBattensH[ 1 ].y - externalBattensH[ 0 ].y - externalBattensH[ 0 ].height
			} )
		}
		else {
			if ( finalInternalsPosition === "vertical" ) {
				gaps.push( {
					x: externalBattensV[ 0 ].x + externalBattensV[ 0 ].width,
					y: externalBattensH[ 0 ].y + externalBattensH[ 0 ].height,
					width: Math.max( internalBattens[ 0 ].x - externalBattensV[ 0 ].x - externalBattensV[ 0 ].width, 0 ),
					height: internalBattens[ 0 ].height
				} )

				for ( let i = 0; i < internalsQty - 1; i++ ) {
					gaps.push( {
						x: internalBattens[ i ].x + internalBattens[ i ].width,
						y: externalBattensH[ 0 ].y + externalBattensH[ 0 ].height,
						width: Math.max( internalBattens[ i + 1 ].x - internalBattens[ i ].x - internalBattens[ i ].width, 0 ),
						height: internalBattens[ i ].height
					} )
				}
				gaps.push( {
					x: internalBattens[ internalsQty - 1 ].x + internalBattens[ internalsQty - 1 ].width,
					y: externalBattensH[ 0 ].y + externalBattensH[ 0 ].height,
					width: Math.max( externalBattensV[ 1 ].x - internalBattens[ internalsQty - 1 ].x - externalBattensV[ 1 ].width, 0 ),
					height: internalBattens[ internalsQty - 1 ].height
				} )
			}
			else {
				gaps.push( {
					x: externalBattensV[ 0 ].x + externalBattensV[ 0 ].width,
					y: externalBattensH[ 0 ].y + externalBattensH[ 0 ].height,
					width: internalBattens[ 0 ].width,
					height: Math.max( internalBattens[ 0 ].y - externalBattensH[ 0 ].y - externalBattensH[ 0 ].height, 0 )
				} )
				for ( let i = 0; i < internalsQty - 1; i++ ) {
					gaps.push( {
						x: internalBattens[ i ].x,
						y: internalBattens[ i ].y + internalBattens[ i ].height,
						width: internalBattens[ i ].width,
						height: Math.max( internalBattens[ i + 1 ].y - internalBattens[ i ].y - internalBattens[ i ].height, 0 )
					} )
				}
				gaps.push( {
					x: externalBattensV[ 0 ].x + externalBattensV[ 0 ].width,
					y: internalBattens[ internalsQty - 1 ].y + internalBattens[ internalsQty - 1 ].height,
					width: internalBattens[ internalsQty - 1 ].width,
					height: Math.max( externalBattensH[ 1 ].y - internalBattens[ internalsQty - 1 ].y - externalBattensH[ 1 ].height, 0 )
				} )
			}
		}
	}
	return gaps
}
