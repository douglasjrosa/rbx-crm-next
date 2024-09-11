import t from "@/lib/translations"
import { PieceProps, StickersProps } from "./utils"
import { formatNumberToBR } from "@/lib/utils"

export default function ListOfOthers ( {
	pieces,
	stickers,
	partQty,
	measureUnit
}: {
	pieces?: PieceProps[]
	stickers?: StickersProps[]
	partQty: number
	measureUnit: "cm" | "mm"
} ) {

	const [ plywood ] = !pieces ? [] : pieces.filter( piece => piece.name === "plywood" )

	const width = measureUnit === "cm" ? formatNumberToBR( ( plywood?.width ?? 0 ) / 10 ) : plywood.width
	const height = measureUnit === "cm" ? formatNumberToBR( ( plywood?.height ?? 0 ) / 10 ) : plywood.height
	const thickness = measureUnit === "cm" ? formatNumberToBR( ( plywood?.thickness ?? 0 ) / 10 ) : plywood.thickness

	return (
		<div className="text-black font-black p-3" >
			<h2 className="text-lg" >{ t( "Plywood and accessories" ) }:</h2>
			<div>
				{ width } x { height } x { thickness }{ measureUnit } = { partQty } { plywood?.unit ?? "" }
			</div>

		</div>
	)
}
