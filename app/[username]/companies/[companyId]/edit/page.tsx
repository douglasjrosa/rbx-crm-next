import { getCompanyAttributesById } from "@/app/api/utils"
import Div from "@/components/Div"
import BreakRow from "@/components/form-components/BreakRow"
import Form from "@/components/form-components/Form"
import FormGroup from "@/components/form-components/FormGroup"
import Hidden from "@/components/form-components/Hidden"
import SaveButton from "@/components/form-components/SaveButton"
import Select from "@/components/form-components/Select"
import SwitchButton from "@/components/form-components/SwitchButton"
import Input from "@/components/form-components/Input"
import LocableContainer from "@/components/LockableContainer"
import { CompanyAttributes } from "@/lib/strapi-types/company"
import t from "@/lib/translations"
import { baseUrl, formatCEP, formatCnpj, formatIE, formatNumber, formatPhone, states } from "@/lib/utils"
import { revalidateTag } from "next/cache"
import { redirect, RedirectType } from "next/navigation"


async function handleUpdateCompanyData ( formData: FormData ) {
	"use server"

	const username = formData.get( "username" ) as string
	const id = formatNumber( formData.get( "id" ) as string )

	const data: CompanyAttributes = {
		displayName: formData.get( "displayName" ) as string,
		cnpj: `${ formatNumber( formData.get( "cnpj" ) as string ) }`,
		ie: `${ formatNumber( formData.get( "ie" ) as string ) }`,
		postalCode: `${ formatNumber( formData.get( "postalCode" ) as string ) }`,
		phone: `${ formatNumber( formData.get( "phone" ) as string ) }`,
		cnae: `${ formatNumber( formData.get( "cnae" ) as string ) }`,
		icmsTaxpayer: formData.get( "icmsTaxpayer" ) as string,
		corporateReason: formData.get( "corporateReason" ) as string,
		email: formData.get( "email" ) as string,
		country: formData.get( "country" ) as string,
		address: formData.get( "address" ) as string,
		countryCode: formatNumber( formData.get( "countryCode" ) as string ),
		addressNumber: formatNumber( formData.get( "addressNumber" ) as string ),
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

	const companyAttributes = await getCompanyAttributesById( companyId )
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

		<LocableContainer>
			<Form action={ handleUpdateCompanyData } >
				<FormGroup title={ t( "Registration data" ) } >
					<Hidden name="username" value={ username } />
					<Hidden name="id" value={ companyId } />
					<Hidden name="icmsTaxpayer" value="0" />

					<Div size="md" className="p-3" >
						<Input
							type="text"
							label={ t( "Name" ) }
							name="displayName"
							defaultValue={ displayName }
							required={ true }
						/>
					</Div>
					<Div size="md" className="p-3" readonly >
						<Input
							type="text"
							label="CNPJ"
							name="cnpj"
							placeholder="xx.xxx.xxx/xxxx-xx"
							defaultValue={ formatCnpj( cnpj ) }
							pattern="(\d{2}|\d{3})\.\d{3}\.\d{3}\/\d{4}-\d{2}"
							title={ t( "Digite um CNPJ válido no formato xx.xxx.xxx/xxxx-xx." ) }
							required={ true }
						/>
					</Div>
					<Div size="lg" className="p-3" >
						<Input
							type="text"
							label={ t( "Corporate reason" ) }
							name="corporateReason"
							defaultValue={ corporateReason }
						/>
					</Div>
					<Div size="md" className="p-3" >
						<Input
							type="text"
							label={ t( "IE" ) }
							name="ie"
							defaultValue={ formatIE( ie ) }
							pattern="\d{3}\.\d{3}\.\d{3}.\d{3}"
							title={ t( "Enter the I.E. in the format xxx.xxx.xxx.xxx." ) }
						/>
					</Div>
					<Div size="md" className="p-3" >
						<Input
							type="text"
							label={ t( "CNAE" ) }
							name="cnae"
							defaultValue={ cnae }
						/>
					</Div>
					<Div size="md" className="p-3" >
						<Input
							type="text"
							label={ t( "Company size" ) }
							name="companySize"
							defaultValue={ companySize }
						/>
					</Div>
					<Div size="md" className="p-3 flex items-center" >
						<SwitchButton
							name="simplesNacional"
							label={ t( "Simples Nacional" ) }
							checked={ !!simplesNacional }
							size="sm"
						/>
					</Div>
					<BreakRow size="xl" />
					<Div size="lg" className="p-3" >
						<Input
							type="text"
							label={ t( "Address" ) }
							name="address"
							defaultValue={ address }
						/>
					</Div>
					<Div size="md" className="p-3" >
						<Input
							type="number"
label={ t( "Number" ) }
							name="addressNumber"
							defaultValue={ addressNumber }
						/>
					</Div>
					<Div size="md" className="p-3" >
						<Input
							type="text"
							label={ t( "Complement" ) }
							name="addressComplement"
							defaultValue={ addressComplement }
						/>
					</Div>
					<Div size="md" className="p-3" >
						<Input
							type="text"
							label={ t( "Neighborhood" ) }
							name="neighborhood"
							defaultValue={ neighborhood }
						/>
					</Div>
					<BreakRow size="sm" />
					<Div size="md" className="p-3" >
						<Input
							type="text"
							label={ t( "PostalCode" ) }
							name="postalCode"
							defaultValue={ formatCEP( postalCode ) }
						/>
					</Div>
					<Div size="md" className="p-3" >
						<Input
							type="text"
							label={ t( "City" ) }
							name="city"
							defaultValue={ city }
						/>
					</Div>
					<Div size="md" className="p-3" >
						<Select
							label={ t( "State" ) }
							name="state"
							defaultValue={ state }
							options={ states }
						/>
					</Div>
					<Div size="md" className="p-3" >
						<Input
							type="number"
label={ t( "Country code" ) }
							name="countryCode"
							defaultValue={ countryCode }
						/>
					</Div>
					<Div size="md" className="p-3" >
						<Input
							type="text"
							label={ t( "Country" ) }
							name="country"
							defaultValue={ country }
						/>
					</Div>
					<BreakRow size="xl" />
					<Div size="md" className="p-3" >
						<Input
							type="text"
							label={ t( "Phone" ) }
							name="phone"
							defaultValue={ formatPhone( phone ) }
						/>
					</Div>
					<Div size="md" className="p-3" >
						<Input
							type="text"
							label={ t( "E-mail" ) }
							name="email"
							defaultValue={ email }
						/>
					</Div>
					<Div size="md" className="p-3" >
						<Input
							type="text"
							label={ t( "Nf-e E-mail" ) }
							name="nfeEmail"
							defaultValue={ nfeEmail }
						/>
					</Div>
					<Div size="md" className="p-3" >
						<Input
							type="text"
							label={ t( "Website" ) }
							name="website"
							defaultValue={ website }
						/>
					</Div>
					<BreakRow size="md" />
					<Div className="p-3 w-full flex justify-end" >
						<SaveButton className="" >{ t( "Save" ) }</SaveButton>
					</Div>
				</FormGroup>
			</Form>
		</LocableContainer >
	)
}
export default Page
