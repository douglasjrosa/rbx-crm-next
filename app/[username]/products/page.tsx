"use client"

import FrameCard from "@/components/products-components/FrameCard"
import FrameForm from "@/components/products-components/FrameForm"
import { calculateScale, getPartTitle, PartNameType, SelectedPieceType } from "@/components/products-components/utils"
import { Tabs, Tab } from "@/components/Tabs"
import t from "@/lib/translations"
import { useEffect, useRef, useState } from "react"
import { calculateFrameParams } from "@/components/products-components/utils/frameParams"
import { productTest } from "@/components/products-components/utils/productTest"
import getProductFormFields from "@/components/products-components/utils/productFields"
import { clearLiveProduct, getLiveProduct, getPart, storeLiveProduct, updatePartProp } from "@/components/products-components/utils/handleProduct"

export default function Products () {
	const boxRef = useRef<HTMLDivElement>( null )
	const [ scale, setScale ] = useState( 0.25 )
	const [ selectedPiece, setSelectedPiece ] = useState<SelectedPieceType>( { pieceName: "none" } )
	const [ product, setProduct ] = useState<any>( null )

	useEffect( () => {
		console.log( selectedPiece, product )
	}, [ selectedPiece ] )

	useEffect( () => {
		
		const liveProduct = getLiveProduct()
		if ( liveProduct ) {
			console.log( liveProduct )
			setProduct( liveProduct )
		}
		
		const updateProduct = () => setProduct( getLiveProduct() )

		window.addEventListener( 'liveProductUpdated', updateProduct )

		return () => {
			window.removeEventListener( 'liveProductUpdated', updateProduct )
		}
	}, [] )

	useEffect( () => {
		if ( !!boxRef.current && product ) {
			const boxWidth = boxRef.current.offsetWidth

			const partWidths = [
				product.length + 300,
				product.width + 300,
				product.height + 300,
			]
			const scale = calculateScale( boxWidth, partWidths )
			setScale( scale )
		}
	}, [ boxRef, product ] )

	const lid = getPart( "lid" )

	const fields = getProductFormFields( selectedPiece )

	return (
		<div onClick={ () => !!setSelectedPiece && setSelectedPiece( { pieceName: "none" } ) }>
			<h1 className="text-3xl font-bold mb-6">{ t( 'Products' ) }</h1>

			<Tabs>
				{ product !== null && !!lid && lid.map( ( partDiv, partDivIndex ) => {
					const partName = "lid"
					const frameParams = calculateFrameParams( {
						partName,
						partDiv,
					} )

					const { gaps } = frameParams

					if ( !partDiv.gaps?.length && !!gaps?.length )
						updatePartProp( {
							partName,
							partDivIndex,
							partPropName: "gaps",
							value: gaps,
						} )

					const partTitle = getPartTitle( partName as PartNameType )

					return (
						<Tab key={ partDivIndex } title={ t( partTitle ) }>
							<div className="flex flex-col gap-6 md:flex-row md:flex-row-reverse md:gap-0 py-3 max-w-full justify-start scrollbar ">
								<div ref={ boxRef } className="flex-grow p-3">
									<FrameCard
										frameParams={ frameParams }
										scale={ scale }
										selectedPiece={ selectedPiece }
										setSelectedPiece={ setSelectedPiece }
									/>
								</div>
								<div onClick={ ( e ) => e.stopPropagation() } className="p-3 w-full flex-1">
									<div className="flex gap-3 flex-wrap justify-around">
										<div className="flex-none w-52">
											<FrameForm
												partName={ partName as PartNameType }
												partDivIndex={ partDivIndex }
												frameParams={ frameParams }
												fields={ fields }
											/>
										</div>
									</div>
								</div>
							</div>
						</Tab>
					)
				} ) }

				<Tab title={ t( "Budget" ) }>
					<div className="flex gap-3">
						<button type="button" onClick={ () => {
							storeLiveProduct( productTest )
						} }>
							Criar
						</button>
						<button type="button" onClick={ () => {
							clearLiveProduct()
						} }>
							Deletar
						</button>
						<button type="button" onClick={ () => {
							clearLiveProduct()
							storeLiveProduct( productTest )
						} }>
							Ressetar
						</button>
					</div>
				</Tab>

			</Tabs>
		</div>
	)
}
