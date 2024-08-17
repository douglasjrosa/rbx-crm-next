import { getCompanyAttributesById } from "@/app/api/utils"
import Div from "@/components/Div"
import Form from "@/components/form-components/Form"
import FormGroup from "@/components/form-components/FormGroup"
import Hidden from "@/components/form-components/Hidden"
import SaveButton from "@/components/form-components/SaveButton"
import Select from "@/components/form-components/Select"
import SwitchButton from "@/components/form-components/SwitchButton"
import Input from "@/components/form-components/Input"
import LocableContainer from "@/components/LockableContainer"
import { CompanyAttributes } from "@/lib/strapi-types/Company"
import t from "@/lib/translations"
import { baseUrl, formatNumber, states } from "@/lib/utils"
import { revalidateTag } from "next/cache"
import { redirect, RedirectType } from "next/navigation"
import CNPJ from "@/components/form-components/CNPJ"
import IE from "@/components/form-components/IE"
import PHONE from "@/components/form-components/PHONE"
import CNAE from "@/components/form-components/CNAE"
import CEP from "@/components/form-components/CEP"
import Card from "@/components/Card"
import BreakRow from "@/components/form-components/BreakRow"


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
				<Hidden name="username" value={ username } />
				<Hidden name="id" value={ companyId } />
				<Hidden name="icmsTaxpayer" value="0" />
				<Card className="py-10" >
					<Div className="flex flex-wrap justify-evenly">
						<Div size="lg" className="p-3" >
							<FormGroup title={ t( "Registration data" ) } >
								<Div className="p-3 w-full" >
									<Input
										type="text"
										label={ t( "Name" ) }
										name="displayName"
										defaultValue={ displayName }
										required={ true }
									/>
								</Div>
								<Div className="p-3 w-full" readonly >
									<CNPJ
										defaultValue={ cnpj }
										required={ true }
									/>
								</Div>
								<Div className="p-3 w-full" >
									<IE
										defaultValue={ ie }
										required={ true }
									/>
								</Div>
								<Div className="p-3 w-full" >
									<Input
										type="text"
										label={ t( "Corporate reason" ) }
										name="corporateReason"
										defaultValue={ corporateReason }
									/>
								</Div>
								<Div className="p-3 w-full" >
									<Input
										type="text"
										label={ t( "Company size" ) }
										name="companySize"
										defaultValue={ companySize }
									/>
								</Div>
								<Div className="p-3 w-1/2" >
									<CNAE
										defaultValue={ cnae }
									/>
								</Div>
								<Div className="p-3 flex items-center w-1/2" >
									<SwitchButton
										name="simplesNacional"
										label={ t( "Simples Nacional" ) }
										checked={ !!simplesNacional }
										size="sm"
									/>
								</Div>
							</FormGroup>
						</Div>
						<Div size="lg" className="p-3" >
							<FormGroup title={ t( "Address data" ) } >
								<Div className="p-3 w-full" >
									<Input
										type="text"
										label={ t( "Address" ) }
										name="address"
										defaultValue={ address }
									/>
								</Div>
								<Div className="p-3 w-1/3" >
									<Input
										type="number"
										label={ t( "Number" ) }
										name="addressNumber"
										defaultValue={ addressNumber }
									/>
								</Div>
								<Div className="p-3 w-2/3" >
									<Input
										type="text"
										label={ t( "Complement" ) }
										name="addressComplement"
										defaultValue={ addressComplement }
									/>
								</Div>
								<Div className="p-3 w-full" >
									<Input
										type="text"
										label={ t( "Neighborhood" ) }
										name="neighborhood"
										defaultValue={ neighborhood }
									/>
								</Div>
								<Div className="p-3 w-full" >
									<CEP
										name="postalCode"
										defaultValue={ postalCode }
									/>
								</Div>
								<Div className="p-3 w-full" >
									<Input
										type="text"
										label={ t( "City" ) }
										name="city"
										defaultValue={ city }
									/>
								</Div>
								<Div className="p-3 w-full" >
									<Select
										label={ t( "State" ) }
										name="state"
										defaultValue={ state }
										options={ states }
									/>
								</Div>
								<Div className="p-3 w-1/2" >
									<Input
										type="number"
										label={ t( "Country code" ) }
										name="countryCode"
										defaultValue={ countryCode }
									/>
								</Div>
								<Div className="p-3 w-1/2" >
									<Input
										type="text"
										label={ t( "Country" ) }
										name="country"
										defaultValue={ country }
									/>
								</Div>
							</FormGroup>
						</Div>
						<Div className="p-3 w-full" >
							<FormGroup title={ t( "Institutional contacts" ) } >
								<Div size="md" className="p-3" >
									<PHONE
										defaultValue={ phone }
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
								<Div size="grow" className="p-3" >
									<Input
										type="text"
										label={ t( "Website" ) }
										name="website"
										defaultValue={ website }
									/>
								</Div>
							</FormGroup>
						</Div>
					</Div>
					<BreakRow size="lg" />
					<Div className="py-6 w-full flex justify-center" >
						<SaveButton className="" >{ t( "Save" ) }</SaveButton>
					</Div>
				</Card>
			</Form>
		</LocableContainer >
	)
}
export default Page
