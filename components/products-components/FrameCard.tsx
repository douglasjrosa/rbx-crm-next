"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import ZoomButtons from "./ZoomButtons"
import { FrameParamsProps, SelectedPieceType } from "./utils/"
import { mountFrameComponent } from "./utils/frameComponent"

export default function FrameCard ( { partDivIndex, frameTitle, frameParams, scale, selectedPiece, setSelectedPiece }: {
	partDivIndex: number
	frameTitle: string
	frameParams: FrameParamsProps
	scale: number
	selectedPiece: SelectedPieceType
	setSelectedPiece?: Dispatch<SetStateAction<SelectedPieceType>>
} ) {

	const [ zoom, setZoom ] = useState( scale )

	useEffect( () => {
		setZoom( scale )
	}, [ scale ] )

	const { frame } = frameParams
	const FrameComponent = mountFrameComponent( frame )

	return (
		<div className="block lg:flex">
			<FrameComponent
				partDivIndex={ partDivIndex }
				partTitle={ frameTitle }
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