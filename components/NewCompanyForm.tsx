"use client"

import t from "@/lib/translations"
import Div from "./Div"
import BreakRow from "./form-components/BreakRow"
import FormGroup from "./form-components/FormGroup"
import SaveButton from "./form-components/SaveButton"
import { CompanyAttributes } from "@/lib/strapi-types/company"
import { baseUrl, formatCnpj, formatNumber } from "@/lib/utils"
import { redirect } from "next/navigation"
import { getCompanyByCnpj, getCompanyDataFromReceitaByCnpj } from "@/app/api/utils"
import { useCallback, useRef, useState } from "react"
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { IoMdAdd, IoMdClose } from "react-icons/io"
import Input from "./form-components/Input"

export default function NewCompanyForm ( { username, sellerId }: { username: string, sellerId?: number | null } ) {

	const dropdownRef = useRef<HTMLDivElement | null>( null )
	const [ formIsVisible, setFormIsVisible ] = useState( false )
	const [ cnpj, setCnpj ] = useState( "" )

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

				const responseData = await response.json()
				if ( !response.ok ) {
					console.error( { responseData } )
					throw new Error( `Error creating new company.` )
				}

				const companyId = responseData.data?.id

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
			<div className="max-w-xs fixed right-4 top-20" >
				<div className="w-full flex justify-end mb-4">
					<button
						className={ `${ buttonClasses } text-[32pt] text-white border border-4 border-white shadow-[3px_3px_8px_2px_rgba(0,0,0,0.3)]` }
						onClick={ () => setFormIsVisible( !formIsVisible ) }
					>
						{ formIsVisible && <IoMdClose /> }
						{ !formIsVisible && <IoMdAdd /> }
					</button>
				</div>
				{ formIsVisible &&
					<div ref={ dropdownRef } >
						<form action={ handleAddCompany } >
							<FormGroup title={ t( "New Company" ) } className="pt-8 pb-6 px-4" >
								<Div className="w-full" >
									<Input
										label={ t( "Short name" ) }
										name="displayName"
										className="w-full"
										required
									/>
								</Div>
								<BreakRow size="sm" />
								<Div className="w-full" >
									<Input
										type="text"
										label={ t( "CNPJ" ) }
										name="cnpj"
										className="w-full"
										placeholder="xx.xxx.xxx/xxxx-xx"
										value={  cnpj }
										onChange={ ( e: any ) => setCnpj( formatCnpj( e.target.value ) ) }
										pattern="(\d{2}|\d{3})\.\d{3}\.\d{3}\/\d{4}-\d{2}"
										title={ t( "Digite um CNPJ válido no formato xx.xxx.xxx/xxxx-xx." ) }
										required
									/>

								</Div>
								<BreakRow size="md" />
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