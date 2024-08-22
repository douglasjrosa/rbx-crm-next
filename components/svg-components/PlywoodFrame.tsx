import t from "@/lib/translations"

interface PlywoodFrameProps {
	partName: string
	externalBattenPosition: "horizontal" | "vertical"
	internalBattenPosition?: "horizontal" | "vertical"
	frameWidth: number
	frameHeight: number
	battenQtdyIn?: number
	battenWidth: number
	battenWidthV?: number[]
	battenWidthH?: number[]
	battenWidthIn?: number[]
	maxGap?: number
	hasPlywood?: boolean
	hasFragile?: boolean
	hasLogo?: boolean
	hasExportStamp?: boolean
	children?: React.ReactNode
}

export default function PlywoodFrame ( {
	partName,
	externalBattenPosition,
	internalBattenPosition,
	frameWidth,
	frameHeight,
	battenQtdyIn,
	battenWidth,
	battenWidthV,
	battenWidthH,
	battenWidthIn,
	maxGap = 500,
	hasPlywood = true,
	hasFragile = false,
	hasLogo = false,
	hasExportStamp = false,
	children
}: PlywoodFrameProps ) {


	const pine = "#FFFF90"
	const eucalyptus = "#ffc18d"

	const paddingX = 100
	const paddingY = 300

	const x0 = 0
	const y0 = 0

	const pieces = []

	if ( hasPlywood ) pieces.push(
		{
			name: "plywood",
			x: x0,
			y: y0,
			width: frameWidth,
			height: frameHeight,
			fill: pine
		}
	)

	pieces.push(
		{
			name: "battenH1",
			x: x0 + ( externalBattenPosition === "vertical" ? ( battenWidthV?.[ 0 ] || battenWidth ) : 0 ),
			y: y0,
			width: frameWidth - ( externalBattenPosition === "vertical" ? ( ( battenWidthV?.[ 0 ] || battenWidth ) + ( battenWidthV?.[ 1 ] || battenWidth ) ) : 0 ),
			height: battenWidthH?.[ 0 ] || battenWidth,
			fill: eucalyptus
		},
		{
			name: "battenH2",
			x: x0 + ( externalBattenPosition === "vertical" ? ( battenWidthV?.[ 0 ] || battenWidth ) : 0 ),
			y: y0 + frameHeight - ( battenWidthH?.[ 1 ] || battenWidth ),
			width: frameWidth - ( externalBattenPosition === "vertical" ? ( ( battenWidthV?.[ 0 ] || battenWidth ) + ( battenWidthV?.[ 1 ] || battenWidth ) ) : 0 ),
			height: battenWidthH?.[ 1 ] || battenWidth,
			fill: eucalyptus
		},
		{
			name: "battenV1",
			x: x0,
			y: y0 + ( externalBattenPosition === "horizontal" ? ( battenWidthH?.[ 0 ] || battenWidth ) : 0 ),
			width: battenWidthV?.[ 0 ] || battenWidth,
			height: frameHeight - ( externalBattenPosition === "horizontal" ? ( ( battenWidthH?.[ 0 ] || battenWidth ) + ( battenWidthH?.[ 1 ] || battenWidth ) ) : 0 ),
			fill: eucalyptus
		},
		{
			name: "battenV2",
			x: x0 + frameWidth - ( battenWidthV?.[ 1 ] || battenWidth ),
			y: y0 + ( externalBattenPosition === "horizontal" ? ( battenWidthH?.[ 0 ] || battenWidth ) : 0 ),
			width: battenWidthV?.[ 1 ] || battenWidth,
			height: frameHeight - ( externalBattenPosition === "horizontal" ? ( ( battenWidthH?.[ 0 ] || battenWidth ) + ( battenWidthH?.[ 1 ] || battenWidth ) ) : 0 ),
			fill: eucalyptus
		},
	)

	let finalInternalsPosition = externalBattenPosition === "horizontal"
		? ( frameHeight > ( frameWidth + 200 ) ? "horizontal" : "vertical" )
		: ( frameWidth > ( frameHeight + 200 ) ? "vertical" : "horizontal" )

	finalInternalsPosition = internalBattenPosition ?? finalInternalsPosition

	const frameExtension = finalInternalsPosition === "horizontal" ? frameHeight : frameWidth

	const internalsQty = battenQtdyIn || Math.ceil( frameExtension / maxGap ) - 1
	const gap = Math.round( frameExtension / ( internalsQty + 1 ) )

	const widthDimensionsDistance = 120
	const heightDimensionsDistance = ( internalsQty > 0 && finalInternalsPosition === "horizontal" )
		? widthDimensionsDistance * 2
		: widthDimensionsDistance
	const rowGapDimensionsDistance = widthDimensionsDistance / 2
	const columnGapDimensionsDistance = widthDimensionsDistance

	for ( let i = 0; internalsQty && i < internalsQty; i++ ) {
		if ( finalInternalsPosition === "vertical" ) {
			pieces.push( {
				name: `battenIn${ i + 1 }`,
				x: x0 + gap * ( i + 1 ) - ( battenWidthIn?.[ i ] || battenWidth ) / 2,
				y: y0 + ( battenWidthH?.[ 0 ] || battenWidth ),
				width: battenWidthIn?.[ i ] || battenWidth,
				height: frameHeight - ( battenWidthH?.[ 0 ] || battenWidth ) - ( battenWidthH?.[ 1 ] || battenWidth ),
				fill: eucalyptus
			} )
		}
		else {
			pieces.push( {
				name: `battenIn${ i + 1 }`,
				x: x0 + ( battenWidthV?.[ 0 ] || battenWidth ),
				y: y0 + gap * ( i + 1 ) - ( battenWidthIn?.[ i ] || battenWidth ) / 2,
				width: frameWidth - ( battenWidthV?.[ 0 ] || battenWidth ) - ( battenWidthV?.[ 1 ] || battenWidth ),
				height: battenWidthIn?.[ i ] || battenWidth,
				fill: eucalyptus
			} )
		}
	}

	const stickersFitInGapWidth = gap >= ( ( battenWidthH?.[ 0 ] || battenWidth ) + 21 + 210 + ( battenWidthIn?.[ 0 ] || battenWidth ) / 2 )

	const fragileFitsInGapHeight = frameHeight >= ( 148 + 21 + ( battenWidthH?.[ 0 ] || battenWidth ) + ( battenWidthH?.[ 1 ] || battenWidth ) )

	const logoFitsGapHeightInColumn1 = frameHeight >= (
		21 + 148 + ( battenWidthH?.[ 0 ] || battenWidth ) + ( battenWidthH?.[ 1 ] || battenWidth ) +
		( hasFragile ? 148 + 20 : 0 )
	)

	const logoFitsGapHeightInColumn2 = internalsQty > 0 && frameHeight >= (
		21 + 148 + ( battenWidthH?.[ 0 ] || battenWidth ) + ( battenWidthH?.[ 1 ] || battenWidth )
	)

	return (
		<div
			className="rounded shadow-cover bg-white"
		>

			<svg
				viewBox={
					`0 0 ${ frameWidth + ( paddingX * 2 ) + heightDimensionsDistance + 40 } ${ frameHeight + ( paddingY + 200 ) }`
				}
			>
				<defs>
					<g id="partName" >
						<text
							x={ -10 }
							y={ 0 }
							font-size="6em"
						>
							{ partName }
						</text>
					</g>

					<g id="frame" >
						{ pieces.map( piece => {
							const {
								x,
								y,
								width,
								height,
								fill
							} = piece
							return (
								<rect x={ x } y={ y } width={ width } height={ height } fill={ fill } stroke="black" />
							)
						} ) }
					</g>

					<g id="widthDimension">
						<line x1={ x0 } y1={ y0 + frameHeight } x2={ x0 } y2={ y0 + frameHeight + widthDimensionsDistance + 20 } stroke="black" strokeWidth={ 2 } />
						<line x1={ x0 + frameWidth } y1={ y0 + frameHeight } x2={ x0 + frameWidth } y2={ y0 + frameHeight + widthDimensionsDistance + 20 } stroke="black" strokeWidth={ 2 } />
						<line x1={ x0 } y1={ y0 + frameHeight + widthDimensionsDistance } x2={ x0 + frameWidth } y2={ y0 + frameHeight + widthDimensionsDistance } stroke="black" strokeWidth={ 3 } />
						<polyline
							points={ `
							${ x0 },${ y0 + frameHeight + widthDimensionsDistance } 
							${ x0 + 50 },${ y0 + frameHeight + widthDimensionsDistance - 15 }
							 ${ x0 + 50 },${ y0 + frameHeight + widthDimensionsDistance + 15 }
						` }
							stroke="black"
							strokeWidth={ 2 }
						/>
						<polyline
							points={ `
							${ x0 + frameWidth },${ y0 + frameHeight + widthDimensionsDistance } 
							${ x0 + frameWidth - 50 },${ y0 + frameHeight + widthDimensionsDistance - 15 } 
							${ x0 + frameWidth - 50 },${ y0 + frameHeight + widthDimensionsDistance + 15 }
						` }
							stroke="black"
							strokeWidth={ 2 }
						/>
						<text
							x={ x0 + ( frameWidth / 2 ) }
							y={ y0 + frameHeight + widthDimensionsDistance - 20 }
							textAnchor="middle"
							font-size="4em"
						>
							{ String( frameWidth / 10 ).replace( ".", "," ) }cm
						</text>
					</g>

					<g id="rowGapDimension">
						<line x1={ x0 + frameWidth - gap } y1={ y0 } x2={ x0 + frameWidth - gap } y2={ y0 - rowGapDimensionsDistance - 20 } stroke="black" strokeWidth={ 2 } />
						<line x1={ x0 + frameWidth } y1={ y0 } x2={ x0 + frameWidth } y2={ y0 - rowGapDimensionsDistance - 20 } stroke="black" strokeWidth={ 2 } />
						<line x1={ x0 + frameWidth - gap } y1={ y0 - rowGapDimensionsDistance } x2={ x0 + frameWidth } y2={ y0 - rowGapDimensionsDistance } stroke="black" strokeWidth={ 3 } />
						<polyline
							points={ `
							${ x0 + frameWidth - gap },${ y0 - rowGapDimensionsDistance } 
							${ x0 + frameWidth - gap + 50 },${ y0 - rowGapDimensionsDistance - 15 }
							${ x0 + frameWidth - gap + 50 },${ y0 - rowGapDimensionsDistance + 15 }
						` }
							stroke="black"
							strokeWidth={ 2 }
						/>
						<polyline
							points={ `
							${ x0 + frameWidth },${ y0 - rowGapDimensionsDistance } 
							${ x0 + frameWidth - 50 },${ y0 - rowGapDimensionsDistance - 15 } 
							${ x0 + frameWidth - 50 },${ y0 - rowGapDimensionsDistance + 15 }
						` }
							stroke="black"
							strokeWidth={ 2 }
						/>
						<text
							x={ x0 + frameWidth - ( gap / 2 ) }
							y={ y0 - rowGapDimensionsDistance - 20 }
							textAnchor="middle"
							font-size="4em"
						>
							{ String( gap / 10 ).replace( ".", "," ) }cm
						</text>
					</g>

					<g id="heightDimension">
						<line x1={ x0 } y1={ y0 } x2={ x0 + heightDimensionsDistance + 20 } y2={ y0 } stroke="black" strokeWidth={ 2 } />
						<line x1={ x0 } y1={ y0 + frameHeight } x2={ x0 + heightDimensionsDistance + 20 } y2={ y0 + frameHeight } stroke="black" strokeWidth={ 2 } />
						<line x1={ x0 + heightDimensionsDistance } y1={ y0 } x2={ x0 + heightDimensionsDistance } y2={ y0 + frameHeight } stroke="black" strokeWidth={ 3 } />
						<polyline
							points={ `
							${ x0 + heightDimensionsDistance },${ y0 } 
							${ x0 + heightDimensionsDistance + 15 },${ y0 + 50 }
							${ x0 + heightDimensionsDistance - 15 },${ y0 + 50 }
						` }
							stroke="black"
							strokeWidth={ 2 }
						/>
						<polyline
							points={ `
							${ x0 + heightDimensionsDistance },${ y0 + frameHeight } 
							${ x0 + heightDimensionsDistance + 15 },${ y0 + frameHeight - 50 } 
							${ x0 + heightDimensionsDistance - 15 },${ y0 + frameHeight - 50 }
						` }
							stroke="black"
							strokeWidth={ 2 }
						/>
						<text
							x={ x0 - ( ( frameHeight ) / 2 ) }
							y={ y0 + heightDimensionsDistance - 20 }
							textAnchor="middle"
							transform="rotate(-90 0,0)"
							font-size="4em"
						>
							{ String( frameHeight / 10 ).replace( ".", "," ) }cm
						</text>
					</g>

					<g id="columnGapDimension">
						<line x1={ x0 } y1={ y0 + gap } x2={ x0 + columnGapDimensionsDistance + 20 } y2={ y0 + gap } stroke="black" strokeWidth={ 2 } />
						<line x1={ x0 + columnGapDimensionsDistance } y1={ y0 } x2={ x0 + columnGapDimensionsDistance } y2={ y0 + gap } stroke="black" strokeWidth={ 3 } />
						<polyline
							points={ `
							${ x0 + columnGapDimensionsDistance },${ y0 } 
							${ x0 + columnGapDimensionsDistance + 15 },${ y0 + 50 }
							${ x0 + columnGapDimensionsDistance - 15 },${ y0 + 50 }
						` }
							stroke="black"
							strokeWidth={ 2 }
						/>
						<polyline
							points={ `
							${ x0 + columnGapDimensionsDistance },${ y0 + gap } 
							${ x0 + columnGapDimensionsDistance + 15 },${ y0 + gap - 50 } 
							${ x0 + columnGapDimensionsDistance - 15 },${ y0 + gap - 50 }
						` }
							stroke="black"
							strokeWidth={ 2 }
						/>
						<text
							x={ x0 - ( gap / 2 ) }
							y={ y0 + columnGapDimensionsDistance - 20 }
							transform="rotate(-90 0,0)"
							textAnchor="middle"
							font-size="4em"
						>
							{ String( gap / 10 ).replace( ".", "," ) }cm
						</text>
					</g>

					<g id="fragileSticker" >
						<rect
							x={ x0 + ( battenWidthV?.[ 0 ] || battenWidth ) + 20 }
							y={ y0 + ( battenWidthH?.[ 0 ] || battenWidth ) + 20 }
							width="210"
							height="148"
							fill="white"
							stroke="darkgray"
						/>
						<text
							x={ x0 + ( battenWidthV?.[ 0 ] || battenWidth ) + 20 + 105 }
							y={ y0 + ( battenWidthH?.[ 0 ] || battenWidth ) + 20 + 90 }
							textAnchor="middle"
							font-size="60px"
							fill="red"
							fontWeight="bolder"
						>
							{ t( "Fragile" ) }
						</text>
					</g>

					<g id="logoSticker" >
						<rect
							x={ x0 + ( battenWidthV?.[ 0 ] || battenWidth ) + 20 }
							y={ y0 + ( battenWidthH?.[ 0 ] || battenWidth ) + 20 }
							width="210"
							height="148"
							fill="white"
							stroke="darkgray"
						/>
						<text
							x={ x0 + ( battenWidthV?.[ 0 ] || battenWidth ) + 20 + 105 }
							y={ y0 + ( battenWidthH?.[ 0 ] || battenWidth ) + 20 + 90 }
							textAnchor="middle"
							font-size="60px"
							fontWeight="bolder"
						>
							{ t( "Logo" ) }
						</text>
					</g>

				</defs>

				<use href="#partName" x={ paddingX } y={ paddingY - 180 } />

				{ internalsQty > 0 && finalInternalsPosition === "vertical" &&
					<use href="#rowGapDimension" x={ paddingX } y={ paddingY - 20 } />
				}

				{ internalsQty > 0 && finalInternalsPosition === "horizontal" &&
					<use href="#columnGapDimension" x={ frameWidth + paddingX + 20 } y={ paddingY } />
				}

				<use href="#frame" x={ paddingX } y={ paddingY } />

				<use href="#widthDimension" x={ paddingX } y={ paddingY + 20 } />

				<use href="#heightDimension" x={ frameWidth + paddingX + 20 } y={ paddingY } />

				{
					hasFragile
					&& stickersFitInGapWidth
					&& fragileFitsInGapHeight
					&& <use href="#fragileSticker" x={ paddingX } y={ paddingY } />
				}

				{
					hasLogo
					&& stickersFitInGapWidth
					&& ( logoFitsGapHeightInColumn1
						? <use href="#logoSticker" x={ paddingX } y={ paddingY + ( hasFragile ? 160 : 0 ) } />
						: (
							logoFitsGapHeightInColumn2
							&& <use
								href="#logoSticker"
								x={ paddingX + gap - ( battenWidthV?.[ 0 ] || battenWidth ) + ( battenWidthIn?.[ 0 ] || battenWidth ) / 2 }
								y={ paddingY }
							/>
						)
					)
				}

				{ hasExportStamp &&
					<text
						x={ paddingX + x0 + frameWidth - ( battenWidthV?.[ 1 ] || battenWidth ) - 20 }
						y={ paddingY + y0 + frameHeight - ( battenWidthH?.[ 1 ] || battenWidth ) - 20 }
						textAnchor="end"
						font-size="40px"
						fontWeight="bolder"
					>
						EXP
					</text>
				}
			</svg>
			{ children }
		</div>
	)
}
