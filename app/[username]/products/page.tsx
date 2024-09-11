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

export default function Products () {

	const boxRef = useRef<HTMLDivElement>( null )
	const [ scale, setScale ] = useState( 1 )
	const [ selectedPiece, setSelectedPiece ] = useState<SelectedPieceType>( { name: "none" } )
	const [ product, setProduct ] = useState( productTest )


	useEffect( () => {
		console.log( { product } )
		console.log( { selectedPiece } )
	}, [ selectedPiece ] )

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
		<div onClick={ () => !!setSelectedPiece && setSelectedPiece( { name: "none" } ) }>

			<h1 className="text-3xl font-bold mb-6">{ t( 'Products' ) }</h1>

			<div>
				<Tabs>
					{
						Object.entries( product.template.parts ).map( ([ partName, partDivs ]) => partDivs.map( ( partDiv: PartProps, index: number ) => {
							
							const frameParams = calculateFrameParams( { partDiv } )

							const partTitle = getPartTitle( partName as PartNameType )
							
							return (
								<Tab key={ index } title={ t( partTitle ) }>
									<div className="flex">
										<div className="w-1/6 px-3 flex flex-col gap-3 lg:flex-none">
											<FrameForm
												partName={ partName as PartNameType }
												index={ index }
												frameParams={ frameParams }
												product={ product }
												setProduct={ setProduct }
												fields={ fields }
											/>
										</div>
										<div ref={ boxRef } className="block lg:w-5/6" >
											<FrameCard
												frameParams={ frameParams }
												scale={ scale }
												selectedPiece={ selectedPiece }
												setSelectedPiece={ setSelectedPiece }
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