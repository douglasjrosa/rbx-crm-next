import { GapsProps, StickersProps } from "."

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

				const widthNeeded = margin + currentSticker.width
				const heightNeeded = currentSticker.height + margin * 3

				const stickerFitsThisGap = gapWidth >= widthNeeded
					&& ( gapHeight >= heightNeeded )

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

					if ( gapHeight > heightNeeded ) {
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