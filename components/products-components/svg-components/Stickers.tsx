import t from "@/lib/translations"
import { GapsProps, StickersProps } from "../utils"
import { alignStickersInTheGap, spreadStickersAlongTheGaps } from "../utils/frameStickers"

export default function Stickers ( { x, y, stickers, gaps }: { x: number, y: number, stickers?: StickersProps[], gaps: GapsProps[] } ) {

	stickers = spreadStickersAlongTheGaps( gaps, stickers )

	stickers = alignStickersInTheGap( gaps, stickers )

	return (
		<g>
			{ !!stickers && stickers.map( ( sticker, index ) => {

				if ( !sticker.x || !sticker.y ) return (
					<g key={ `sticker-${ index }` } >
						<rect
							x={ x }
							y={ y }
							width={ sticker.width }
							height={ sticker.height }
							fill="red"
							stroke="darkgray"
						/>
						<text
							x={ x + 105 }
							y={ y + 40 }
							textAnchor="middle"
							style={ { fontSize: "40px" } }
							fill="yellow"
							fontWeight="bolder"
						>
							{ t( "Ooops!" ) }
						</text>
						<text
							x={ x + 105 }
							y={ y + 85 }
							textAnchor="middle"
							style={ { fontSize: "33px" } }
							fill="yellow"
							fontWeight="bolder"
						>
							{ t( "Stickers" ) }
						</text>
						<text
							x={ x + 105 }
							y={ y + 125 }
							textAnchor="middle"
							style={ { fontSize: "33px" } }
							fill="yellow"
							fontWeight="bolder"
						>
							{ t( "don't fit" ) }.
						</text>
					</g>
				)

				return (
					<g key={ `sticker-${ index }` } >
						<rect
							x={ x + ( sticker.x ?? 0 ) }
							y={ y + ( sticker.y ?? 0 ) }
							width={ sticker.width }
							height={ sticker.height }
							fill="white"
							stroke="darkgray"
						/>
						<text
							x={ x + ( sticker.x ?? 0 ) + 105 }
							y={ y + ( sticker.y ?? 0 ) + 65 }
							textAnchor="middle"
							style={ { fontSize: "60px" } }
							fill={ sticker.color }
							fontWeight="bolder"
						>
							{ sticker.label }
						</text>
						<text
							x={ x + ( sticker.x ?? 0 ) + 105 }
							y={ y + ( sticker.y ?? 0 ) + 130 }
							textAnchor="middle"
							style={ { fontSize: "45px" } }
							fill={ sticker.color }
							fontWeight="bolder"
						>
							{ sticker.labelCode }
						</text>
					</g>
				)
			} ) }
		</g>
	)
}