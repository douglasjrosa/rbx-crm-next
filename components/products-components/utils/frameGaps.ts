import { GapsProps } from "."

export const calculateFrameGaps = ( {
	frameWidth,
	frameHeight,
	internalsQty,
	frameExtension,
	finalInternalsPosition,
	battenWidth,
	battenWidthH,
	battenWidthV,
	battenWidthIn,
	customGapExtensions
}: {
	frameWidth: number,
	frameHeight: number,
	internalsQty: number,
	frameExtension: number,
	finalInternalsPosition: string,
	battenWidth: number,
	battenWidthH?: [ number, number ],
	battenWidthV?: [ number, number ],
	battenWidthIn?: number[],
	customGapExtensions?: number[]
} ): GapsProps[] => {

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
			if ( finalInternalsPosition === "horizontal" ) {
				gapExtension = divisions - ( battenWidthH?.[ 0 ] || battenWidth )
			}
			else {
				gapExtension = divisions - ( battenWidthV?.[ 0 ] || battenWidth )
			}
			gapExtension -= ( battenWidthIn?.[ 0 ] || battenWidth ) / 2
		}
		else if ( !gapExtension && lastGap ) {
			gapExtension = remainingGapsExtension
		}
		else {
			gapExtension = gapExtension ?? divisions
			gapExtension -= ( battenWidthIn?.[ i - 1 ] || battenWidth ) / 2
			gapExtension -= ( battenWidthIn?.[ 1 ] || battenWidth ) / 2
		}
		
		gapExtension = Math.max( gapExtension, 200)

		remainingFrameExtension -= gapExtension ?? divisions
		remainingGapsExtension -= gapExtension
		remainingGapsQty--

		if ( finalInternalsPosition === "vertical" ) {
			const xAdvance: number = firstGap
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

