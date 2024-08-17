"use client"

import t from "@/lib/translations"
import Div from "./Div"
import BreakRow from "./form-components/BreakRow"
import FormGroup from "./form-components/FormGroup"
import SaveButton from "./form-components/SaveButton"
import { baseUrl, formatCnpj, formatFutureDate, formatNumber } from "@/lib/utils"
import { redirect } from "next/navigation"
import { getCompanyByCnpj, getCompanyDataFromReceitaByCnpj } from "@/app/api/utils"
import { useCallback, useState } from "react"
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { IoMdAdd, IoMdClose } from "react-icons/io"
import Input from "./form-components/Input"
import CNPJ from "./form-components/CNPJ"
import { Deal, DealAttributes, ResponseDeal } from "@/lib/strapi-types/Deal"
import { ResponseError } from "@/lib/strapi-types/Error"
import CompaniesSelect from "./form-components/CompaniesSelect"

export default function NewDealForm ( { username, sellerId }: { username: string, sellerId: string | number } ) {

	const [ formIsVisible, setFormIsVisible ] = useState( false )

	const handleAddDeal = useCallback( async ( formData: FormData ): Promise<void> => {

		const companyId = formData.get( "companyId" ) as string

		const data: DealAttributes = {
			company: companyId,
			seller: sellerId,
			expiresAt: formatFutureDate( 20 )
		}

		console.log({data})
/* 
		const response = await fetch( `${ baseUrl }/api/deals`, {
			method: "POST",
			body: JSON.stringify( { data } )
		} )

		const responseData: ResponseDeal | ResponseError = await response.json()

		if ( !response.ok ) {
			console.error( { responseData } )
			throw new Error( `Error creating new deal.` )
		}

		const dealId = responseData.data.id

		if ( dealId ) {
			redirect( `/${ username }/deals/${ dealId }` )
		}
 */
	}, [ sellerId ] )

const buttonClasses = formIsVisible
	? "bg-red-700 rounded-lg"
	: "bg-green-500 rounded-full"

return (
	<Div>
		{ formIsVisible && <div className="fixed bg-sky-200 opacity-80 dark:bg-slate-950 dark:opacity-90 top-0 bottom-0 left-0 right-0"></div> }
		<div className="max-w-[90vw] w-64 fixed right-6 top-16" >
			<div className="w-full flex justify-end mb-3">
				<button
					className={ `${ buttonClasses } text-4xl font-black text-white border border-2 border-white shadow-[3px_3px_8px_2px_rgba(0,0,0,0.3)]` }
					onClick={ () => setFormIsVisible( !formIsVisible ) }
				>
					{ formIsVisible && <IoMdClose /> }
					{ !formIsVisible && <IoMdAdd /> }
				</button>
			</div>
			{ formIsVisible &&
				<div>
					<form action={ handleAddDeal } >
						<FormGroup title={ t( "New Deal" ) } className="pt-8 pb-6 px-4" >
							<Div className="w-full" >
								<CompaniesSelect
									username={ username }
									required
								/>
							</Div>
							<BreakRow size="sm" />
							<Div className="w-full flex justify-end" >
								<SaveButton size="sm" lockable={ false } >{ t( "Add" ) }</SaveButton>
							</Div>
						</FormGroup>
					</form>
				</div>
			}
		</div>
	</Div>
)
}