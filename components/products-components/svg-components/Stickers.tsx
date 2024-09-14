import t from "@/lib/translations"
import { SelectedPieceType, StickersProps } from "../utils"
import { Dispatch, SetStateAction } from "react"

export default function Stickers ( {
	x,
	y,
	stickers,
	selectedPiece,
	setSelectedPiece
}: {
	x: number
	y: number
	stickers: StickersProps[]
	selectedPiece?: SelectedPieceType
	setSelectedPiece?: Dispatch<SetStateAction<SelectedPieceType>>
} ) {

	return (
		<g>
			{ !!stickers && stickers.map( ( sticker, stickerIndex ) => {

				const doesNotFit = sticker.doesNotFit ?? false
				const width = sticker.width ?? 210
				const height = sticker.height ?? 148
				const stickerX = sticker.x ?? 0
				const stickerY = sticker.y ?? 0
				const labelColor = sticker.color === "colorful" ? "green" : ( sticker.color ?? "red" )
				const labelCodeColor = sticker.color === "colorful" ? "blue" : ( sticker.color ?? "red" )

				let label = ( t( sticker.label ) ).toUpperCase()
				label = label[ 0 ] + label[ 1 ] + label[ 2 ] + ( label[ 3 ] ?? "" ) + ( label[ 4 ] ?? "" ) + ( label[ 5 ] ?? "" )

				const largeFont = Math.min( width * 0.23, height * 0.4 )
				const smallFont = Math.min( width * 0.28, height * 0.38 )

				const pieceName = `sticker${ stickerIndex + 1 }` as SelectedPieceType[ "pieceName" ]
				
				if ( doesNotFit ) {
					return (
						<g key={ `sticker-${ stickerIndex }` } >
							<rect
								x={ x }
								y={ y }
								width={ width }
								height={ height }
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
								className="cursor-default"
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
								className="cursor-default"
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
								className="cursor-default"
							>
								{ t( "don't fit" ) }.
							</text>
						</g>
					)
				}
				else {
					return (
						<g
							key={ `sticker-${ stickerIndex }` }
							onClick={ e => {
								e.stopPropagation()
								!!setSelectedPiece && setSelectedPiece( { pieceName, pieceIndex: stickerIndex } )
							} }
						>
							<rect
								x={ x + stickerX }
								y={ y + stickerY }
								width={ width }
								height={ height }
								className={
									`${ !!selectedPiece && selectedPiece.pieceName === pieceName
										? "fill-[rgb(160,255,255)]"
										: "fill-white"
									}`
								}
							/>
							<text
								x={ x + stickerX + width * 0.5 }
								y={ y + stickerY + height * 0.45 }
								textAnchor="middle"
								style={ { fontSize: `${ largeFont }px` } }
								fill={ labelColor }
								fontWeight="bolder"
								className="cursor-default"
							>
								{ label }
							</text>
							<text
								x={ x + stickerX + width * 0.5 }
								y={ y + stickerY + height * 0.9 }
								textAnchor="middle"
								style={ { fontSize: `${ smallFont }px` } }
								fill={ labelCodeColor }
								fontWeight="bolder"
								className="cursor-default"
							>
								{ sticker.labelCode }
							</text>
							<rect
								x={ x + stickerX }
								y={ y + stickerY }
								width={ width }
								height={ height }
								className={
									`fill-transparent active:fill-[rgba(0,200,255,0.5)] ${ !!selectedPiece && selectedPiece.pieceName === pieceName
										? "stroke-[10px] stroke-[rgb(0,150,255)] fill-[rgb(160,255,255)]"
										: "stroke-gray-700 fill-transparent hover:fill-[rgba(0,255,255,0.4)]"
									}`
								}
							/>
						</g>
					)
				}
			} ) }
		</g>
	)
}