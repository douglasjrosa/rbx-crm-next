import { GapsProps, StickersProps } from "."

export const spreadStickersAlongTheGaps = (
	gaps: GapsProps[],
	stickers: StickersProps[],
	stickersQty: number,
	hasCrossedBatten: boolean,
	crossedBattenY: number,
	crossedBattenWidth: number
) => {
	
	const newStickers = []
	for ( let i = 0; i < stickersQty; i++ ) {
		if ( stickers[ i ] !== undefined ) {
			newStickers.push( stickers[ i ] )
		}
		else {
			const newSticker: StickersProps = {
				name: `sticker${ i + 1 }`,
				label: "fragile",
				labelCode: "0001",
				color: "red",
			} 
			newStickers.push( newSticker )
		}
	}
	stickers = newStickers

	gaps.forEach( ( gap, gapIndex ) => {

		const margin = 20
		let remainingGapHeight = gap.height
		let remainingGapWidth = gap.width
		let stickerCount = 0

		stickers.forEach( ( sticker, stickerIndex, array ) => {
			let gapPositioning = Math.min( ( sticker.gapPositioning ?? 1 ), gaps.length )

			const positionIndex = gapIndex + 1
			if ( gapPositioning === positionIndex ) {

				const biggestStickerWidth = stickers.reduce( ( prev, current ) => {
					const currentWidth = current.width ?? 210
					const prevWidth = prev.width ?? 210
					return currentWidth >= prevWidth && ( sticker.gapPositioning ?? 0 ) === positionIndex ? current : prev
				}, stickers[ 0 ] )?.width ?? 210


				const currentSticker = {
					...sticker,
					doesNotFit: false,
					width: sticker.width ?? 210,
					height: sticker.height ?? 148
				}

				let prevSticker
				for ( let i = 0; i < stickerIndex; i++ ) {
					if ( stickers[ i ].gapPositioning === positionIndex ) prevSticker = stickers[ i ]
				}

				const freeAlignment = sticker.freeAlignment === "free"
				const heightNeeded = currentSticker.height + margin * 3
				const widthNeeded = margin * 2 + currentSticker.width
				const prevStickerHeight = stickerIndex > 0 ? ( prevSticker?.height ?? 0 ) : 0
				const prevStickerY = stickerIndex > 0 ? ( prevSticker?.y ?? 0 ) : ( gaps[ gapIndex ].y ?? 0 )

				let x = ( gaps[ gapIndex ].x ?? 0 ) + margin
				let y = ( gaps[ gapIndex ].y ?? 0 )

				let resolved = false
				while ( !resolved ) {
					if ( remainingGapHeight >= heightNeeded ) {

						if ( remainingGapWidth >= widthNeeded ) {
							remainingGapHeight -= currentSticker.height
							if ( stickerCount > 0 ) y = prevStickerY + prevStickerHeight + margin
							stickerCount++
							resolved = true
						}
						else {
							if ( gapPositioning === gaps.length )
								currentSticker.doesNotFit = true
							else {
								y = 0
								x = 0
								gapPositioning++
							}

							resolved = true
						}
					}
					else {
						remainingGapWidth -= biggestStickerWidth
						remainingGapHeight = gap.height
					}
				}

				x = freeAlignment && !!sticker.x ? sticker.x : x
				x = Math.min( x, gap.x + gap.width - currentSticker.width - margin )
				x = Math.max( x, gap.x + margin )

				if (
					hasCrossedBatten
					&& y + currentSticker.height + margin > crossedBattenY
					&& y < crossedBattenY + crossedBattenWidth
				) {
					console.log({crossedBattenWidth})
					y += currentSticker.height + margin + crossedBattenWidth
				}

				const maxY = gap.y + gap.height - currentSticker.height - margin

				y = freeAlignment && !!sticker.y ? sticker.y : y
				y = Math.min( y, maxY )
				y = Math.max( y, gap.y + margin )

				array[ stickerIndex ] = { ...currentSticker, x, y, gapPositioning }
			}
		} )
	} )
	return stickers
}
