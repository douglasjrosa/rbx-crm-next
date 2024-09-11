"use client"

import t from "@/lib/translations"
import Input from "../form-components/Input"
import Select from "../form-components/Select"
import PlywoodFrame from "./svg-components/PlywoodFrame"
import { useRef, useState } from "react"
import { PlywoodFrameProps, StickersProps } from "./utils"
import ZoomButtons from "./ZoomButtons"

export default function SettingsTab ( { scale }: { scale: number } ) {

	const sideRef = useRef<HTMLDivElement>( null )

	const [ productLength, setProductLength ] = useState( 1200 )
	const [ productWidth, setProductWidth ] = useState( 800 )
	const [ productHeight, setProductHeight ] = useState( 1000 )
	const [ externalBattenPosition, setExternalBattenPosition ] = useState<"horizontal" | "vertical">( "horizontal" )
	const [ internalBattenPosition, setInternalBattenPosition ] = useState<PlywoodFrameProps[ "internalBattenPosition" ]>( "horizontal" )
	const [ battenWidth, setBattenWidth ] = useState( 30 )
	const [ battenQtyIn, setbattenQtyIn ] = useState<number | undefined>( 2 )
	const [ position, setPosition ] = useState<StickersProps[ "position" ]>( "top-left" )
	const [ gapPositioning, setGapPositioning ] = useState( 0 )
	const [ zoom, setZoom ] = useState( scale )

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
	const showListOfOthers = true

	return (
		<div className="block lg:flex">
			<div className="w-1/6 px-3 flex flex-col gap-3 lg:flex-none">
				<Input type="number" name="productLength" step={ 100 } label="Comprimento" value={ productLength } onChange={ e => setProductLength( Number( e.target.value ) ) } />
				<Input type="number" name="productWidth" step={ 100 } label="Largura" value={ productWidth } onChange={ e => setProductWidth( Number( e.target.value ) ) } />
				<Input type="number" name="productHeight" label="Altura" value={ productHeight } onChange={ e => setProductHeight( Number( e.target.value ) ) } />
				<Select name="internalBattenPosition" label="Sarrafo interno" value={ internalBattenPosition } onChange={ e => setInternalBattenPosition( e.target.value as "horizontal" | "vertical" ) } options={ [
					{ value: "auto", text: t( "Auto" ) },
					{ value: "horizontal", text: t( "Horizontal" ) },
					{ value: "vertical", text: t( "Vertical" ) }
				] } />
				<Select name="position" label="Position" value={ position } onChange={ e => setPosition( e.target.value as StickersProps[ "position" ] ) } options={ [
					{ value: "top-left", text: t( "Top-left" ) },
					{ value: "top-center", text: t( "Top-center" ) },
					{ value: "top-right", text: t( "Top-right" ) },
					{ value: "middle-left", text: t( "Middle-left" ) },
					{ value: "middle-center", text: t( "Middle-center" ) },
					{ value: "middle-right", text: t( "Middle-right" ) },
					{ value: "bottom-left", text: t( "Bottom-left" ) },
					{ value: "bottom-center", text: t( "Bottom-center" ) },
					{ value: "bottom-right", text: t( "Bottom-right" ) },
				] } />
				<Input type="number" name="gapPositioning" label="Gap Positioning" value={ gapPositioning } onChange={ e => setGapPositioning( Number( e.target.value ) ) } />
				<Input type="number" name="battenQtyIn" label="Qtde sarrafos internos" value={ battenQtyIn } onChange={ e => setbattenQtyIn( Number( e.target.value ) ) } />
				<Select name="externalBattenPosition" label="Sarrafo externo" value={ externalBattenPosition } onChange={ e => setExternalBattenPosition( e.target.value as "horizontal" | "vertical" ) } options={ [
					{ value: "horizontal", text: t( "Horizontal" ) },
					{ value: "vertical", text: t( "Vertical" ) }
				] } />
			</div>
			<div ref={ sideRef } className="block lg:w-5/6" >
				<PlywoodFrame
					partTitle={ t( "Side" ) }
					maxGap={ 500 }
					externalBattenPosition={ externalBattenPosition }
					internalBattenPosition={ internalBattenPosition }
					frameWidth={ productLength }
					frameHeight={ productHeight }
					battenQtyIn={ battenQtyIn }
					battenWidth={ battenWidth }
					customGapExtensions={ customGapExtensions }
					plywoodThickness={ plywoodThickness }
					battenThickness={ battenThickness }
					hasExportStamp={ hasExportStamp }
					showListOfMaterials={ showListOfMaterials }
					showListOfOthers={ showListOfOthers }
					partQty={ partQty }
					stickers={ stickers }
					scale={ zoom }
				>
					<ZoomButtons zoom={ zoom } setZoom={ setZoom } />
				</PlywoodFrame>
			</div>
		</div>
	)
}