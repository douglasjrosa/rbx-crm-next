"use client"

import FrameCard from "@/components/products-components/FrameCard"
import FrameForm from "@/components/products-components/FrameForm"
import { calculateScale, getPartTitle, PartNameType, PartProps, SelectedPieceType } from "@/components/products-components/utils"
import { Tabs, Tab } from "@/components/Tabs"
import t from "@/lib/translations"
import { useEffect, useRef, useState } from "react"
import { calculateFrameParams } from "@/components/products-components/utils/frameParams"
import { productTest } from "@/components/products-components/utils/productTest"
import getProductFormFields from "@/components/products-components/utils/productFields"
import { spreadStickersAlongTheGaps } from "@/components/products-components/utils/frameStickers"

export default function Products () {

	const boxRef = useRef<HTMLDivElement>( null )
	const [ scale, setScale ] = useState( 1 )
	const [ selectedPiece, setSelectedPiece ] = useState<SelectedPieceType>( { pieceName: "none" } )
	const [ product, setProduct ] = useState( productTest )

	useEffect( () => {
		console.log( { product } )
	}, [ product ] )

	useEffect( () => {
		if ( !!boxRef.current ) {
			const boxWidth = boxRef.current.offsetWidth
			const partWidths = [
				product.length + 300,
				product.width + 300,
				product.height + 300
			]
			const scale = calculateScale( boxWidth, partWidths )
			setScale( scale )
		}
	}, [ boxRef ] )

	const fields = getProductFormFields( selectedPiece )

	return (
		<div onClick={ () => !!setSelectedPiece && setSelectedPiece( { pieceName: "none" } ) }>

			<h1 className="text-3xl font-bold mb-6">{ t( 'Products' ) }</h1>

			<div>
				<Tabs>
					{
						Object.entries( product.template.parts ).map( ( [ partName, partDivs ] ) => partDivs.map( ( partDiv: PartProps, partDivIndex: number ) => {

							const frameParams = calculateFrameParams( {
								partName: partName as PartNameType,
								partDiv
							} )
							
							const { gaps, stickers, stickersQty } = frameParams

							frameParams.stickers = spreadStickersAlongTheGaps( gaps, stickers || [], stickersQty ?? 0 )

							const partTitle = getPartTitle( partName as PartNameType )

							return (
								<Tab key={ partDivIndex } title={ t( partTitle ) }>
									<div className="flex flex-col gap-6 md:flex-row md:flex-row-reverse md:gap-0 py-3 max-w-full justify-start scrollbar ">
										<div ref={ boxRef } className="flex-grow p-3" >
											<FrameCard
												frameParams={ frameParams }
												scale={ scale }
												selectedPiece={ selectedPiece }
												setSelectedPiece={ setSelectedPiece }
											/>
										</div>
										<div className="p-3 w-full flex-1">
											<FrameForm
												partName={ partName as PartNameType }
												partDivIndex={ partDivIndex }
												frameParams={ frameParams }
												product={ product }
												setProduct={ setProduct }
												fields={ fields }
											/>
										</div>
									</div>
								</Tab>
							)
						} ) )
					}
					<Tab title={ t( "Budget" ) }>
						<div className="flex gap-3">
						</div>
					</Tab>
				</Tabs>
			</div>
		</div>
	)
}