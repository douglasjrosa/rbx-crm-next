import t from "@/lib/translations"
import { formatNumberToBR } from "@/lib/utils"
import { Pc, PieceProps, StickersProps } from "./utils/"

export default function ListOfMaterials ( {
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

	const eachOfThePieces = pieces?.map( ( piece ) => {
		const { name, thickness = 0, unit = "" } = piece
		const length = Math.max( Number( piece.width ), Number( piece.height ) )
		const wide = Math.min( Number( piece.width ), Number( piece.height ) )
		const qty = 1
		return { name, length, wide, thickness, qty, unit }
	} )

	const summedWoods = eachOfThePieces?.reduce( ( acc: Pc[], current: Pc ) => {
		if ( current.name !== "plywood" ) {
			const existingPc: Pc | undefined = acc.find(
				( pc: Pc ) =>
					pc.length === current.length &&
					pc.wide === current.wide &&
					pc.thickness === current.thickness
			)

			if ( existingPc ) existingPc.qty += current.qty
			else acc.push( current )
		}
		return acc
	}, [] as Pc[] )

	return (
		<div className="text-black font-black p-3" >
			<h2 className="text-lg" >{ t("Battens") }:</h2>
			{ summedWoods?.map( ( piece, index ) => {
				const length = measureUnit === "cm" ? formatNumberToBR( piece.length / 10 ) : piece.length
				const wide = measureUnit === "cm" ? formatNumberToBR( piece.wide / 10 ) : piece.wide
				const thickness = measureUnit === "cm" ? formatNumberToBR( piece.thickness / 10 ) : piece.thickness
				const qty = piece.qty * partQty
				return (
					<div key={ `piece-${ index }` } >
						{ length } x { wide } x { thickness }{ measureUnit } = { qty } { piece.unit }
					</div>
				)
			} ) }
		</div>
	)
}
