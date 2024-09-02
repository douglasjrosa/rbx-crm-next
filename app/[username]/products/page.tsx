"use client"

import Input from "@/components/form-components/Input"
import Select from "@/components/form-components/Select"
import PlywoodFrame from "@/components/svg-components/PlywoodFrame"
import { StickersProps } from "@/components/svg-components/utils"
import t from "@/lib/translations"
import { useState } from "react"

const Products = () => {

	const [ frameWidth, setFrameWidth ] = useState( 1200 )
	const [ frameHeight, setFrameHeight ] = useState( 200 )
	const [ externalBattenPosition, setExternalBattenPosition ] = useState<"horizontal" | "vertical">( "horizontal" )
	const [ internalBattenPosition, setInternalBattenPosition ] = useState<"horizontal" | "vertical">( "vertical" )
	const [ battenWidth, setBattenWidth ] = useState( 30 )
	const [ battenQtdyIn, setBattenQtdyIn ] = useState<number | undefined>()
	const [ position, setPosition ] = useState<StickersProps[ "position" ]>( "top-left" )
	const [ gapPositioning, setGapPositioning ] = useState( 0 )

	let customGapExtensions
	const plywoodThickness = 3
	const battenThickness = 18
	const hasExportStamp = true
	const partQty = 2

	const stickers: StickersProps[] = [
		{
			label: "Frágil",
			labelCode: "0002",
			color: "red",
		},
		{
			label: "Logo",
			labelCode: "0003",
			color: "black",
			gapPositioning,
			position
		}
	]

	const showListOfMaterials = true

	return (
		<div>
			<h1 className="text-3xl font-bold mb-6">{ t( 'Products' ) }</h1>
			<div className="flex gap-3">
				<div className="w-1/5">
					<Input type="number" name="frameWidth" label="Comprimento" value={ frameWidth } onChange={ e => setFrameWidth( Number( e.target.value ) ) } />
				</div>
				<div className="w-1/5">
					<Input type="number" name="frameHeight" label="Largura" value={ frameHeight } onChange={ e => setFrameHeight( Number( e.target.value ) ) } />
				</div>
				<div className="w-1/5">
					<Input type="number" name="battenWidth" label="Sarrafos" value={ battenWidth } onChange={ e => setBattenWidth( Number( e.target.value ) ) } />
				</div>
				<div className="w-1/5">
					<Select name="position" label="Position" value={ position } onChange={ e => setPosition( e.target.value as StickersProps["position"] ) } options={ [
						{ value: "top-left", text: t( "Top-left") },
						{ value: "top-center", text: t( "Top-center") },
						{ value: "top-right", text: t( "Top-right") },
						{ value: "middle-left", text: t( "Middle-left") },
						{ value: "middle-center", text: t( "Middle-center") },
						{ value: "middle-right", text: t( "Middle-right") },
						{ value: "bottom-left", text: t( "Bottom-left") },
						{ value: "bottom-center", text: t( "Bottom-center") },
						{ value: "bottom-right", text: t( "Bottom-right") },
					]} />
				</div>
				<div className="w-1/5">
					<Input type="number" name="gapPositioning" label="Gap Positioning" value={ gapPositioning } onChange={ e => setGapPositioning( Number( e.target.value ) ) } />
				</div>
				<div className="w-1/5">
					<Input type="number" name="battenQtdyIn" label="Qtde sarrafos internos" value={ battenQtdyIn } onChange={ e => setBattenQtdyIn( Number( e.target.value ) ) } />
				</div>
				<div className="w-1/5">
					<Select name="externalBattenPosition" label="Sarrafo externo" value={ externalBattenPosition } onChange={ e => setExternalBattenPosition( e.target.value as "horizontal" | "vertical" ) } options={ [
					{ value: "horizontal", text: t( "Horizontal" ) },
					{ value: "vertical", text: t( "Vertical" ) }
				] } />
				</div>
				<div className="w-1/5">
					<Select name="internalBattenPosition" label="Sarrafo interno" value={ internalBattenPosition } onChange={ e => setInternalBattenPosition( e.target.value as "horizontal" | "vertical" ) } options={ [
						{ value: "auto", text: t( "Auto" ) },
						{ value: "horizontal", text: t( "Horizontal" ) },
						{ value: "vertical", text: t( "Vertical" ) }
					] } />
				</div>
			</div>
			<div className="p-6 rounded bg-sky-200 w-[800px]">
				<PlywoodFrame
					partTitle="Lateral"
					externalBattenPosition={ externalBattenPosition }
					internalBattenPosition={ internalBattenPosition }
					frameWidth={ frameWidth }
					frameHeight={ frameHeight }
					battenQtdyIn={ battenQtdyIn }
					battenWidth={ battenWidth }
					customGapExtensions={ customGapExtensions }
					plywoodThickness={ plywoodThickness }
					battenThickness={ battenThickness }
					hasExportStamp={ hasExportStamp }
					maxGap={ 500 }
					showListOfMaterials={ showListOfMaterials }
					partQty={ partQty }
					stickers={ stickers }
				></PlywoodFrame>
			</div>
		</div>
	)
}
export default Products