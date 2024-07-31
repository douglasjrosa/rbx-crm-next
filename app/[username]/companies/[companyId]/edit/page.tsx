import { getCompanyAttributes } from "@/app/api/utils"
import ContactsForm from "@/components/ContactsForm"
import BreakRow from "@/components/form-components/BreakRow"
import Form from "@/components/form-components/Form"
import FormGroup from "@/components/form-components/FormGroup"
import Hidden from "@/components/form-components/Hidden"
import NumberBox from "@/components/form-components/NumberBox"
import SaveButton from "@/components/form-components/SaveButton"
import Select from "@/components/form-components/Select"
import SwitchButton from "@/components/form-components/SwitchButton"
import TextBox from "@/components/form-components/TextBox"
import { CompanyAttributes } from "@/lib/strapi-types/companyAttributes"
import t from "@/lib/translations"
import { baseUrl, formatCEP, formatCnpj, formatIE, formatNumber, formatPhone, states } from "@/lib/utils"
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect, RedirectType } from "next/navigation"


async function updateCompanyData ( formData: FormData ) {
	"use server"

	const username = formData.get( "username" ) as string
	const id = parseInt( formData.get( "id" ) as string )

	const data: CompanyAttributes = {
		displayName: formData.get( "displayName" ) as string,
		cnpj: String( formatNumber( formData.get( "cnpj" ) as string ) ),
		ie: String( formatNumber( formData.get( "ie" ) as string ) ),
		postalCode: String( formatNumber( formData.get( "postalCode" ) as string ) ),
		phone: String( formatNumber( formData.get( "phone" ) as string ) ),
		cnae: String( formatNumber( formData.get( "cnae" ) as string ) ),
		icmsTaxpayer: String( formatNumber( formData.get( "icmsTaxpayer" ) as string ) ),
		corporateReason: formData.get( "corporateReason" ) as string,
		email: formData.get( "email" ) as string,
		country: formData.get( "country" ) as string,
		address: formData.get( "address" ) as string,
		countryCode: parseInt( formData.get( "countryCode" ) as string ),
		addressNumber: parseInt( formData.get( "addressNumber" ) as string ),
		addressComplement: formData.get( "addressComplement" ) as string,
		neighborhood: formData.get( "neighborhood" ) as string,
		city: formData.get( "city" ) as string,
		state: formData.get( "state" ) as string,
		website: formData.get( "website" ) as string,
		nfeEmail: formData.get( "nfeEmail" ) as string,
		companySize: formData.get( "companySize" ) as string,
		simplesNacional: formData.get( "simplesNacional" ) === "on"
	}

	const response = await fetch( `${ baseUrl }/api/companies/${ id }`, {
		method: "PUT",
		body: JSON.stringify( { data } )
	} )

	const responseData = await response.json()
	if ( !response.ok ) console.error( { responseData } )

	revalidateTag( `company-data-${ id }` )
	//revalidatePath( `/${ username }/companies/${ id }` )
	//revalidatePath( `/${ username }/companies` )

	redirect( `/${ username }/companies/${ id }`, RedirectType.replace )
}

interface PageProps {
	params: {
		companyId: string
		username: string
	}
}


const Page = async ( { params }: PageProps ) => {

	const { companyId, username } = params

	const companyAttributes = await getCompanyAttributes( companyId )
	if ( !companyAttributes ) throw new Error( "Error fetching company data by Id." )
	
	const {
		displayName,
		cnpj,
		ie,
		postalCode,
		phone,
		cnae,
		corporateReason,
		email,
		country,
		address,
		countryCode,
		addressNumber,
		addressComplement,
		neighborhood,
		city,
		state,
		website,
		nfeEmail,
		companySize,
		simplesNacional
	} = companyAttributes


	return (
		<>
			<div className="flex flex-wrap">
				<div className="w-full lg:w-1/4 p-3">
					<ContactsForm />
				</div>
				<div className="w-full lg:w-3/4 p-3">
					<Form action={ updateCompanyData } >
						<FormGroup title={ t( "Registration data" ) } >
							<Hidden id="username" value={ username } />
							<Hidden id="id" value={ companyId } />
							<Hidden id="icmsTaxpayer" value="0" />
							<TextBox
								label={ t( "Name" ) }
								id="displayName"
								defaultValue={ displayName }
								required={ true }
							/>
							<TextBox
								label={ t( "Corporate reason" ) }
								id="corporateReason"
								defaultValue={ corporateReason }
								size="lg"
							/>
							<TextBox
								label="CNPJ"
								id="cnpj"
								placeholder="xx.xxx.xxx/xxxx-xx"
								defaultValue={ formatCnpj( cnpj ) }
								pattern="(\d{2}|\d{3})\.\d{3}\.\d{3}\/\d{4}-\d{2}"
								title="Digite um CNPJ válido no formato xx.xxx.xxx/xxxx-xx"
								required={ true }
							/>
							<TextBox
								label={ t( "IE" ) }
								id="ie"
								defaultValue={ formatIE( ie ) }
								pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
								title="Digite um CNPJ válido no formato xxx.xxx.xxx-xx"
							/>
							<TextBox
								label={ t( "CNAE" ) }
								id="cnae"
								defaultValue={ cnae }
							/>
							<TextBox
								label={ t( "Company size" ) }
								id="companySize"
								defaultValue={ companySize }
							/>
							<SwitchButton
								id="simplesNacional"
								label={ t( "Simples Nacional" ) }
								checked={ simplesNacional }
								size="sm"
							/>
							<BreakRow size="xl" />
							<TextBox
								label={ t( "Address" ) }
								id="address"
								defaultValue={ address }
							/>
							<NumberBox
								label={ t( "Number" ) }
								id="addressNumber"
								defaultValue={ addressNumber }
								size="sm"
							/>
							<TextBox
								label={ t( "Complement" ) }
								id="addressComplement"
								defaultValue={ addressComplement }
								size="sm"
							/>
							<TextBox
								label={ t( "Neighborhood" ) }
								id="neighborhood"
								defaultValue={ neighborhood }
								size="sm"
							/>
							<TextBox
								label={ t( "PostalCode" ) }
								id="postalCode"
								defaultValue={ formatCEP( postalCode ) }
								size="sm"
							/>
							<BreakRow size="sm" />
							<TextBox
								label={ t( "City" ) }
								id="city"
								defaultValue={ city }
							/>
							<Select
								label={ t( "State" ) }
								id="state"
								defaultValue={ state }
								options={ states }
							/>
							<NumberBox
								label={ t( "Country code" ) }
								id="countryCode"
								defaultValue={ countryCode }
								size="sm"
							/>
							<TextBox
								label={ t( "Country" ) }
								id="country"
								defaultValue={ country }
							/>
							<BreakRow size="xl" />
							<TextBox
								label={ t( "Phone" ) }
								id="phone"
								defaultValue={ formatPhone( phone ) }
							/>
							<TextBox
								label={ t( "E-mail" ) }
								id="email"
								defaultValue={ email }
							/>
							<TextBox
								label={ t( "Nf-e E-mail" ) }
								id="nfeEmail"
								defaultValue={ nfeEmail }
							/>
							<TextBox
								label={ t( "Website" ) }
								id="website"
								defaultValue={ website }
							/>
							<BreakRow size="xl" />
							<SaveButton className="mx-auto my-4" >{ t( "Save" ) }</SaveButton>
						</FormGroup>
					</Form>
				</div>
			</div>
		</>
	)
}
export default Page
