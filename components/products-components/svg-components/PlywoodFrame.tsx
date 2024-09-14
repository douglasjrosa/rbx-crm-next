import { Archivo_Black } from 'next/font/google'
import { FrameComponentProps, SelectedPieceType } from "../utils"
import PartTitle from "./PartTitle"
import Dimension from "./Dimension"
import Stickers from "./Stickers"
import ListOfBattens from "../ListOfBattens"
import PartMeasureUnits from './PartMeasureUnits'
import ListOfOthers from '../ListOfOthers'

const archivo = Archivo_Black( { weight: "400", subsets: [ "latin" ] } )

export default function PlywoodFrame ( {
	partTitle,
	frameParams,
	scale,
	selectedPiece,
	setSelectedPiece,
	showListOfMaterials,
	showListOfOthers,
	children
}: FrameComponentProps ) {

	const {
		frameWidth,
		frameHeight,
		battenWidth,
		battenWidthV,
		battenWidthH,
		plywoodThickness,
		hasExportStamp = false,
		stickers,
		partQty,
		measureUnit = "cm",
		viewBox,
		viewboxWidth,
		viewboxHeight,
		y0,
		pieces,
		finalInternalsPosition,
		gaps,
		stampSize,
		listsMaxWidth
	} = frameParams

	let { x0 } = frameParams
	x0 += 90

	if ( !frameWidth || !frameHeight || !battenWidth ) return null
	return (
		<div className="relative rounded shadow-cover bg-white dark:opacity-80 pt-3 flex flex-wrap" >
			<svg width={ viewboxWidth * scale } height={ viewboxHeight * scale } viewBox={ viewBox } >
				<PartTitle x={ x0 } y={ 100 } >{ partTitle }</PartTitle>
				<PartMeasureUnits x={ x0 + frameWidth + 20 } y={ y0 - 100 } >{ measureUnit }</PartMeasureUnits>

				<g id="frame" >
					{ pieces.map( ( piece, index ) => {

						const x = x0 + piece.x
						const y = y0 + piece.y

						const {
							fill,
							name,
							width,
							height,
						} = piece

						const pieceIndex = Number( name.replace( /\D/g, "" ) ) - 1

						return (
							<rect
								fill={ fill }
								stroke="black"
								className={ `active:fill-[rgb(0,100,255)] ${ name === selectedPiece?.pieceName
									? "fill-[rgba(0,150,255,0.3)] stroke-[10px] stroke-[rgb(0,150,255)]"
									: "hover:fill-[rgb(0,255,255)] hover:stroke-[10px] hover:stroke-[rgb(0,150,255)]" }`
								}
								onClick={ ( e ) => {
									e.stopPropagation()
									!!setSelectedPiece && setSelectedPiece( {
										pieceName: name as SelectedPieceType[ "pieceName" ],
										pieceIndex,
										x,
										y,
										width,
										height
									} )
								} }
								key={ `piece-${ index }` }
								x={ x }
								y={ y }
								width={ width }
								height={ height }
							/>
						)
					} ) }
				</g>

				<Dimension
					x={ x0 }
					y={ y0 + frameHeight + 20 }
					dimension={ frameWidth }
					type="bottom"
					measureUnit={ measureUnit }
				/>

				<Dimension
					x={ x0 + frameWidth + 20 }
					y={ y0 }
					dimension={ frameHeight }
					type="right"
					auxiliaryDimensionLine={ finalInternalsPosition === "horizontal" ? 270 : 140 }
					measureUnit={ measureUnit }
				/>
				{ finalInternalsPosition === "vertical" &&
					gaps.map( ( gap, index ) => {
						return (
							<Dimension
								key={ `gap-${ index }` }
								x={ x0 + gap.x }
								y={ y0 - 20 }
								dimension={ gap.width }
								type="top"
								auxiliaryDimensionLine={ 80 }
								measureUnit={ measureUnit }
							/>
						)
					} )
				}

				{ finalInternalsPosition === "horizontal" &&
					gaps.map( ( gap, index ) => {
						return (
							<Dimension
								key={ `gap-${ index }` }
								x={ x0 + frameWidth + gap.x }
								y={ y0 + gap.y }
								dimension={ gap.height }
								type="right"
								measureUnit={ measureUnit }
							/>
						)
					} )
				}


				{ !!stickers && stickers.length > 0 && !!plywoodThickness &&
					<Stickers
						x={ x0 }
						y={ y0 }
						stickers={ stickers }
						selectedPiece={ selectedPiece }
						setSelectedPiece={ setSelectedPiece }
					/>
				}

				{ hasExportStamp &&
					<text
						x={ x0 + frameWidth - ( battenWidthV?.[ 1 ] || battenWidth ) - 20 }
						y={ y0 + frameHeight - ( !!plywoodThickness ? ( battenWidthH?.[ 1 ] || battenWidth ) + 20 : + 5 ) }
						textAnchor="end"
						style={ { fontSize: stampSize } }
						fontWeight="bolder"
						className={ archivo.className }
					>
						EXP
					</text>
				}
			</svg>
			<div
				className="flex-grow flex flex-wrap content-center items-center justify-items-stretch"
				style={ { minWidth: "250px", maxWidth: listsMaxWidth } }
			>
				{ showListOfMaterials &&
					<ListOfBattens
						pieces={ pieces }
						stickers={ stickers }
						partQty={ partQty }
						measureUnit={ measureUnit }
					/>
				}
				{ showListOfOthers &&
					<ListOfOthers
						pieces={ pieces }
						stickers={ stickers }
						partQty={ partQty }
						measureUnit={ measureUnit }
					/>
				}
			</div>
			{ children }
		</div>
	)
}
