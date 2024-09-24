/**
 * Calculates the gaps between internal elements within a frame.
 *
 * This function takes into account the frame's dimensions, the number of internal elements,
 * the frame's length, the final internal element's position, and the widths of the battens.
 *
 * It returns an array of objects, each representing a gap, with properties for the gap's x and y coordinates,
 * width, and height.
 *
 * @param {Object} options - The options for calculating the gaps.
 * @param {number} options.frameWidth - The width of the frame.
 * @param {number} options.frameHeight - The height of the frame.
 * @param {number} options.internalsQty - The number of internal elements.
 * @param {number} options.frameLength - The length of the frame that will be splited into gap divisions.
 * @param {string} options.finalInternalsPosition - The position of the final internal element, either "horizontal" or "vertical".
 * @param {number} options.battenWidth - The width of the battens.
 * @param {[number, number]} [options.battenWidthH] - The horizontal batten widths.
 * @param {[number, number]} [options.battenWidthV] - The vertical batten widths.
 * @param {number[]} [options.battenWidthIn] - The internal batten widths.
 * @param {number[]} [options.customGapLengths] - Custom gap lengths.
 * @returns {GapsProps[]} An array of gap objects.
 *
 * @example
 * const gaps = calculateFrameGaps({
 *   frameWidth: 100,
 *   frameHeight: 200,
 *   internalsQty: 3,
 *   frameLength: 20,
 *   finalInternalsPosition: "horizontal",
 *   battenWidth: 5,
 *   battenWidthH: [10, 10],
 *   battenWidthV: [5, 5],
 *   battenWidthIn: [5, 5, 5],
 *   customGapLengths: [10, 20, 30]
 * })
 */

import { GapsProps } from "."

export const calculateInitialFrameGaps = ( {
	frameWidth,
	frameHeight,
	internalsQty,
	frameLength,
	finalInternalsPosition,
	battenWidth,
	battenWidthH,
	battenWidthV,
	battenWidthIn
}: {
	frameWidth: number,
	frameHeight: number,
	internalsQty: number,
	frameLength: number,
	finalInternalsPosition: string,
	battenWidth: number,
	battenWidthH?: [ number, number ],
	battenWidthV?: [ number, number ],
	battenWidthIn?: number[]
} ): GapsProps[] => {

	const gapsQty = internalsQty + 1

	let gaps: GapsProps[] = []
	const divisions: number[] = []

	const defaultDivision = Math.round( frameLength / gapsQty )

	for ( let i = 0; i < gapsQty; i++ ) {
		const isFirstGap = i === 0
		const isLastGap = i === gapsQty - 1
		let substract = 0

		// Calculating and saving the FIRST GAP from top to bottom / left to right.
		if ( isFirstGap ) {
			substract = finalInternalsPosition === "vertical"
				? substract = ( battenWidthV?.[ 0 ] || battenWidth ) + ( battenWidthIn?.[ i ] || battenWidth ) / 2
				: ( battenWidthH?.[ i ] || battenWidth ) + ( battenWidthIn?.[ i ] || battenWidth ) / 2
		}
		// Calculating and saving the LAST GAP.
		else if ( isLastGap ) {
			substract = finalInternalsPosition === "vertical"
				? ( battenWidthV?.[ 1 ] || battenWidth ) + ( battenWidthIn?.[ internalsQty - 1 ] || battenWidth ) / 2
				: ( battenWidthH?.[ 1 ] || battenWidth ) + ( battenWidthIn?.[ internalsQty - 1 ] || battenWidth ) / 2
		}
		// Calculating and saving the MIDDLE GAPS.
		else {
			substract = finalInternalsPosition === "vertical"
				? ( battenWidthIn?.[ i - 1 ] || battenWidth ) / 2 + ( battenWidthIn?.[ i ] || battenWidth ) / 2
				: ( battenWidthIn?.[ i - 1 ] || battenWidth ) / 2 + ( battenWidthIn?.[ i ] || battenWidth ) / 2
		}
		divisions.push( defaultDivision - substract )
	}


	for ( let i = 0; i < gapsQty; i++ ) {

		const isFirstGap = i === 0
		const isLastGap = i === gapsQty - 1

		// Calculating and saving the FIRST GAP from top to bottom / left to right.
		if ( isFirstGap ) {
			if ( finalInternalsPosition === "vertical" ) {
				// Including the first gap into "gaps" in VERTICAL internal battens position context.
				gaps.push( {
					x: battenWidthV?.[ 0 ] || battenWidth,
					y: ( battenWidthH?.[ 0 ] || battenWidth ),
					width: divisions[ i ],
					height: frameHeight - ( battenWidthH?.[ 0 ] || battenWidth ) - ( battenWidthH?.[ 1 ] || battenWidth )
				} )
			}
			else {
				// Including the first gap into "gaps" in HORIZONTAL internal battens position context.
				gaps.push( {
					x: battenWidthV?.[ 0 ] || battenWidth,
					y: ( battenWidthH?.[ 0 ] || battenWidth ),
					width: frameWidth - ( battenWidthV?.[ 0 ] || battenWidth ) - ( battenWidthV?.[ 1 ] || battenWidth ),
					height: divisions[ i ]
				} )
			}
		}
		// Calculating and saving the LAST GAP.
		else if ( isLastGap ) {
			if ( finalInternalsPosition === "vertical" ) {
				// Including the last gap into "gaps" in VERTICAL internal battens position context.
				gaps.push( {
					x: gaps[ i - 1 ].x + gaps[ i - 1 ].width + ( battenWidthIn?.[ i - 1 ] || battenWidth ),
					y: ( battenWidthH?.[ 0 ] || battenWidth ),
					width: divisions[ i ],
					height: frameHeight - ( battenWidthH?.[ 0 ] || battenWidth ) - ( battenWidthH?.[ 1 ] || battenWidth )
				} )
			}
			else {
				// Including the last gap into "gaps" in HORIZONTAL internal battens position context.
				gaps.push( {
					x: battenWidthV?.[ 0 ] || battenWidth,
					y: gaps[ i - 1 ].y + gaps[ i - 1 ].height + ( battenWidthIn?.[ i - 1 ] || battenWidth ),
					width: frameWidth - ( battenWidthV?.[ 0 ] || battenWidth ) - ( battenWidthV?.[ 1 ] || battenWidth ),
					height: divisions[ i ]
				} )
			}
		}
		// Calculating and saving the MIDDLE GAPS.
		else {
			if ( finalInternalsPosition === "vertical" ) {
				// Including current middle gap into "gaps" in VERTICAL internal battens position context.
				gaps.push( {
					x: gaps[ i - 1 ].x + gaps[ i - 1 ].width + ( battenWidthIn?.[ i - 1 ] || battenWidth ),
					y: ( battenWidthH?.[ 0 ] || battenWidth ),
					width: divisions[ i ],
					height: frameHeight - ( battenWidthH?.[ 0 ] || battenWidth ) - ( battenWidthH?.[ 1 ] || battenWidth )
				} )
			}
			else {
				// Including current middle gap into "gaps" in HORIZONTAL internal battens position context.
				gaps.push( {
					x: battenWidthV?.[ 0 ] || battenWidth,
					y: gaps[ i - 1 ].y + gaps[ i - 1 ].height + ( battenWidthIn?.[ i - 1 ] || battenWidth ),
					width: frameWidth - ( battenWidthV?.[ 0 ] || battenWidth ) - ( battenWidthV?.[ 1 ] || battenWidth ),
					height: divisions[ i ]
				} )
			}
		}
	}

	return gaps
}

