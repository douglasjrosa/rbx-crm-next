import t from "@/lib/translations"
import { Archivo_Black } from "next/font/google"

const archivo = Archivo_Black( { weight: "400", subsets: [ "latin" ] } )

export default function PartMeasureUnits ( { x, y, children }: {
	x: number
	y: number
	fontSize?: string
	children: React.ReactNode
} ) {
	const fontSize = "3rem"
	return (
		<g>
			<text x={ x } y={ y } style={{ fontSize }} >{ t( "Measures" ) }:</text>
			<text x={ x } y={ y + 60 } style={{ fontSize }} >{ t( "in" ) }:</text>
			<text x={ x + 100 } y={ y + 60 } style={{ fontSize }} className={ archivo.className } >"{ children }"</text>
		</g>
	)
}