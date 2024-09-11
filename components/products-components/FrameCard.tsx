"use client"

import t from "@/lib/translations"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import ZoomButtons from "./ZoomButtons"
import { FrameParamsProps, SelectedPieceType } from "./utils/"
import { mountFrameComponent } from "./utils/frameComponent"

export default function FrameCard ( { frameParams, scale, selectedPiece, setSelectedPiece }: {
	frameParams: FrameParamsProps
	scale: number
	selectedPiece: SelectedPieceType
	setSelectedPiece?: Dispatch<SetStateAction<SelectedPieceType>>
} ) {

	const [ zoom, setZoom ] = useState( scale )

	useEffect( () => {
		setZoom( scale )
	}, [ scale ] )

	const FrameComponent = mountFrameComponent( frameParams.frame )

	return (
		<div className="block lg:flex">
			<FrameComponent
				partTitle={ t( "Side" ) }
				frameParams={ frameParams }
				scale={ zoom }
				selectedPiece={ selectedPiece }
				setSelectedPiece={ setSelectedPiece }
				showListOfMaterials={ true }
				showListOfOthers={ true }
			>
				<ZoomButtons zoom={ zoom } setZoom={ setZoom } />
			</FrameComponent>
		</div>
	)
}