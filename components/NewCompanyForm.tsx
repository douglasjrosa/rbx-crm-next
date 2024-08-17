"use client"

import t from "@/lib/translations"
import Div from "./Div"
import BreakRow from "./form-components/BreakRow"
import FormGroup from "./form-components/FormGroup"
import SaveButton from "./form-components/SaveButton"
import { baseUrl, formatFutureDate, formatNumber } from "@/lib/utils"
import { redirect } from "next/navigation"
import { getCompanyByCnpj, getCompanyDataFromReceitaByCnpj } from "@/app/api/utils"
import { useCallback, useState } from "react"
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { IoMdAdd, IoMdClose } from "react-icons/io"
import Input from "./form-components/Input"
import CNPJ from "./form-components/CNPJ"
import { ResponseError } from "@/lib/strapi-types/Error"
import { CompanyAttributes, ResponseCompany } from "@/lib/strapi-types/Company"

export default function NewCompanyForm ( { username, sellerId }: { username: string, sellerId: string | number } ) {

	const [ formIsVisible, setFormIsVisible ] = useState( false )

	const handleAddCompany = useCallback( async ( formData: FormData ): Promise<void> => {

		const displayName = formData.get( "displayName" ) as string
		const cnpj: `${ number }` = `${ formatNumber( formData.get( "cnpj" ) as string ) }`

		const receitaData = await getCompanyDataFromReceitaByCnpj( displayName, cnpj )


		if ( 'error' in receitaData ) {
			toast.error( receitaData.error )
		} else {

			const data: CompanyAttributes = {
				...receitaData,
				country: "BRASIL",
				countryCode: 1058,
				simplesNacional: true,
				seller: sellerId,
				expiresAt: formatFutureDate( 180 )
			}

			const queryString = "&fields[0]=displayName&populate[seller][fields][0]=displayName"
			const companyExists = await getCompanyByCnpj( cnpj, queryString )
			if ( companyExists ) {
				const seller = companyExists.attributes.seller?.data?.attributes?.displayName
				if ( seller ) {
					toast.warn( `${ t( "The company" ) } ${ companyExists.attributes.displayName } ${ t( "belongs to" ) } ${ seller }.` )
				}
				else {
					toast.warn( `${ t( "The company" ) } ${ companyExists.attributes.displayName } ${ t( "is already registered in the system." ) }` )
				}
			}
			else {
				const response = await fetch( `${ baseUrl }/api/companies`, {
					method: "POST",
					body: JSON.stringify( { data } )
				} )

				const responseData: ResponseCompany | ResponseError = await response.json()
				if ( !response.ok ) {
					console.error( { responseData } )
					throw new Error( `Error creating new company.` )
				}

				const companyId = responseData.data.id

				if ( companyId ) {
					redirect( `/${ username }/companies/${ companyId }/edit` )
				}
			}
		}
	}, [ username, sellerId ] )

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
						<form action={ handleAddCompany } >
							<FormGroup title={ t( "New Company" ) } className="pt-8 pb-6 px-4" >
								<Div className="w-full" >
									<Input
										type="text"
										label={ t( "Short name" ) }
										name="displayName"
										className="w-full"
										placeholder={ t( "Short Name" ) }
										required
									/>
								</Div>
								<BreakRow size="sm" />
								<Div className="w-full" >
									<CNPJ
										className="w-full"
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