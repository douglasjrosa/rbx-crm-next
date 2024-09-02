import { Archivo_Black } from 'next/font/google'
import { calculatePieces, PlywoodFrameProps } from "./utils"
import PartTitle from "./PartTitle"
import Dimension from "./Dimension"
import Stickers from "./Stickers"
import ListOfBattens from "./ListOfBattens"

const archivo = Archivo_Black( { weight: "400", subsets: [ "latin" ] } )

export default function PlywoodFrame ( {
	partTitle,
	externalBattenPosition,
	internalBattenPosition = "auto",
	frameWidth,
	frameHeight,
	battenQtdyIn,
	battenWidth,
	battenWidthV,
	battenWidthH,
	battenWidthIn,
	battenThickness,
	plywoodThickness,
	maxGap,
	customGapExtensions,
	hasExportStamp = false,
	stickers,
	showListOfMaterials,
	partQty,
	measureUnit = "cm",
	children
}: PlywoodFrameProps ) {

	const x0 = 100
	const y0 = 300

	const { pieces, gaps, internalsQty, finalInternalsPosition } = calculatePieces( {
		externalBattenPosition,
		internalBattenPosition,
		frameWidth,
		frameHeight,
		battenQtdyIn,
		battenWidth,
		battenThickness,
		battenWidthV,
		battenWidthH,
		battenWidthIn,
		maxGap,
		customGapExtensions,
		plywoodThickness,
		partQty,
		measureUnit
	} )

	const stampSize = ( !!plywoodThickness || ( battenWidthH?.[ 1 ] || battenWidth ) > 40 ? 40 : battenWidth ) + "px"

	const heightDimensionsDistance = ( internalsQty > 0 && finalInternalsPosition === "horizontal" ) ? 240 : 120

	const viewBox = `0 0 ${ x0 + frameWidth + 20 + heightDimensionsDistance + 20 + x0 } ${ frameHeight + ( y0 + 200 ) }`

	if ( !frameWidth || !frameHeight || !battenWidth ) return null

	return (
		<div className="rounded shadow-cover bg-white" >

			<svg viewBox={ viewBox } >
				<PartTitle x={ x0 - 10 } y={ 100 } >{ partTitle }</PartTitle>

				<g id="frame" >
					{ pieces.map( ( piece, index ) => {
						const {
							x,
							y,
							width,
							height,
							fill
						} = piece
						return (
							<rect
								key={ `piece0${ index }` }
								x={ x0 + x }
								y={ y0 + y }
								width={ width }
								height={ height }
								fill={ fill }
								stroke="black"
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

				{ !!stickers && stickers.length > 0 && !!plywoodThickness && <Stickers x={ x0 } y={ y0 } stickers={ stickers } gaps={ gaps } /> }


				{ hasExportStamp &&
					<text
						x={ x0 + frameWidth - ( battenWidthV?.[ 1 ] || battenWidth ) - 20 }
						y={ y0 + frameHeight - ( !!plywoodThickness ? ( battenWidthH?.[ 1 ] || battenWidth ) + 20 : + 5 ) }
						textAnchor="end"
						font-size={ stampSize }
						fontWeight="bolder"
						className={ archivo.className }
					>
						EXP
					</text>
				}
			</svg>
			{ showListOfMaterials && <ListOfBattens
				pieces={ pieces }
				stickers={ stickers }
				partQty={ 2 }
				measureUnit={ measureUnit }
			/> }

			{ children }
		</div>
	)
}
