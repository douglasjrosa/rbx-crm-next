import { formatNumberToBR } from "@/lib/utils"
import Arrow from "./Arrow"

export default function Dimension ( {
	x,
	y,
	dimension,
	type,
	auxiliaryDimensionLine = 140,
	measureUnit = "cm",
	showMeasureUnit
}: {
	x: number
	y: number
	dimension: number
	type: "top" | "bottom" | "left" | "right"
	auxiliaryDimensionLine?: number
	measureUnit?: "cm" | "mm"
	showMeasureUnit?: boolean
} ) {

	const dimensionLineDistance = auxiliaryDimensionLine - 20
	const fontSize = "3rem"
	
	if ( type === "bottom" ) {
		return (
			<g>
				<line
					x1={ x }
					y1={ y }
					x2={ x }
					y2={ y + auxiliaryDimensionLine }
					stroke="black"
					strokeWidth={ 2 }
				/>
				<line
					x1={ x + dimension }
					y1={ y }
					x2={ x + dimension }
					y2={ y + auxiliaryDimensionLine }
					stroke="black"
					strokeWidth={ 2 }
				/>
				<line
					x1={ x }
					y1={ y + dimensionLineDistance }
					x2={ x + dimension }
					y2={ y + dimensionLineDistance }
					stroke="black"
					strokeWidth={ 3 }
				/>
				<Arrow x={ x } y={ y + dimensionLineDistance } to="left" />
				<Arrow x={ x + dimension } y={ y + dimensionLineDistance } to="right" />
				<text
					x={ x + ( dimension / 2 ) }
					y={ y + dimensionLineDistance - 20 }
					textAnchor="middle"
					style={{ fontSize }}
				>
					{ measureUnit === "cm" ? formatNumberToBR( dimension / 10 ) : dimension }{ showMeasureUnit && measureUnit }
				</text>
			</g>
		)
	}
	else if ( type === "right" ) {
		return (
			<g>
				<line
					x1={ x }
					y1={ y }
					x2={ x + auxiliaryDimensionLine }
					y2={ y }
					stroke="black"
					strokeWidth={ 2 }
				/>
				<line
					x1={ x }
					y1={ y + dimension }
					x2={ x + auxiliaryDimensionLine }
					y2={ y + dimension }
					stroke="black"
					strokeWidth={ 2 }
				/>
				<line
					x1={ x + dimensionLineDistance }
					y1={ y }
					x2={ x + dimensionLineDistance }
					y2={ y + dimension }
					stroke="black"
					strokeWidth={ 3 }
				/>
				<Arrow x={ x + dimensionLineDistance } y={ y } to="up" />
				<Arrow x={ x + dimensionLineDistance } y={ y + dimension } to="down" />
				<text
					x={ - y - dimension / 2 }
					y={ x + dimensionLineDistance - 20 }
					transform="rotate(-90 0,0)"
					textAnchor="middle"
					style={{ fontSize }}
				>
					{ measureUnit === "cm" ? formatNumberToBR( dimension / 10 ) : dimension }{ showMeasureUnit && measureUnit }
				</text>
			</g>
		)
	}
	else if ( type === "top" ) {
		return (
			<g>
				<line
					x1={ x }
					y1={ y }
					x2={ x }
					y2={ y - auxiliaryDimensionLine }
					stroke="black"
					strokeWidth={ 2 }
				/>
				<line
					x1={ x + dimension }
					y1={ y }
					x2={ x + dimension }
					y2={ y - auxiliaryDimensionLine }
					stroke="black"
					strokeWidth={ 2 }
				/>
				<line
					x1={ x }
					y1={ y - dimensionLineDistance }
					x2={ x + dimension }
					y2={ y - dimensionLineDistance }
					stroke="black"
					strokeWidth={ 3 }
				/>
				<Arrow x={ x } y={ y - dimensionLineDistance } to="left" />
				<Arrow x={ x + dimension } y={ y - dimensionLineDistance } to="right" />
				<text
					x={ x + dimension / 2 }
					y={ y - dimensionLineDistance - 20 }
					textAnchor="middle"
					style={{ fontSize }}
				>
					{ measureUnit === "cm" ? formatNumberToBR( dimension / 10 ) : dimension }{ showMeasureUnit && measureUnit }
				</text>
			</g>
		)
	}
}