import CompanyTitle from "@/components/CompanyTitle"
import BreakRow from "@/components/form-components/BreakRow"
import Form from "@/components/form-components/Form"
import Hidden from "@/components/form-components/Hidden"
import SaveButton from "@/components/form-components/SaveButton"
import Select from "@/components/form-components/Select"
import SwitchButton from "@/components/form-components/SwitchButton"
import TextBox from "@/components/form-components/TextBox"
import ToggleLockedButton from "@/components/ToggleLockedButton"
import { ApiCompanyCompany } from "@/lib/strapi-types/contentTypes"
import t from "@/lib/translations"
import { baseUrl, formatCEP, formatCnpj, formatIE, formatNumber, formatPhone, truncateString } from "@/lib/utils"
import { revalidatePath } from "next/cache"

type CompanyData = {
	id: number
	cnpj?: string
	displayName?: string
	oficialName?: string
	email?: string
	ie?: string
	country?: string
	address?: string
	countryCode?: number
	addressNumber?: number
	addressComplement?: string
	neighborhood?: string
	postalCode?: string
	city?: string
	state?: string
	website?: string
	nfeEmail?: string
	phone?: string
	icmsTaxpayer?: number
	cnae?: string
	companySize?: string
	simplesNacional?: boolean
}

async function updateCompanyData ( formData: FormData ) {
	"use server"
	
	const id = parseInt( formData.get( "id" ) as string )
	const cnpj = String( formatNumber( formData.get( "cnpj" ) as string ))
	const ie = String( formatNumber( formData.get( "ie" ) as string ))
	const postalCode = String( formatNumber( formData.get( "postalCode" ) as string ))
	const phone = String( formatNumber( formData.get( "phone" ) as string ))
	const cnae = String( formatNumber( formData.get( "cnae" ) as string ))
	const icmsTaxpayer = parseInt( String( formatNumber( formData.get( "icmsTaxpayer" ) as string )))

	const companyData: CompanyData = {
		id,
		ie,
		postalCode,
		phone,
		cnae,
		icmsTaxpayer,
		oficialName: formData.get( "oficialName" ) as string,
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

	// In a real application, you would update the data in your database
	
	const updatedCompanyData = {
		data: {
			contacts: [],
			seasonality: 32
		}
	}
	
	const response = await fetch( `${ baseUrl }/api/companies/${ id }`, {
		method: "PUT",
		body: JSON.stringify( updatedCompanyData )
	} )
	
	const responseData = await response.json()
	console.log( updatedCompanyData )

	revalidatePath( `/companies/${ id }/edit` )
	revalidatePath( `/companies/${ id }` )
	revalidatePath( "/companies" )
}

interface CompanyProps extends ApiCompanyCompany {
	id: string | number
}

interface PageProps {
	params: {
		companyId: string
		username: string
	}
}


const Page = async ( { params }: PageProps ) => {

	const { companyId, username } = params

	const response = await fetch( `${ baseUrl }/api/companies/${ companyId }?populate=*` )
	const responseData = await response.json()

	const company = responseData.data as CompanyProps
	const companyData = company?.attributes?.companyData || null
	const sellerId = company?.attributes?.seller?.data?.id

	const states: Array<{ value: string; text: string }> = [
		{ value: 'AC', text: 'Acre' },
		{ value: 'AL', text: 'Alagoas' },
		{ value: 'AP', text: 'Amapá' },
		{ value: 'AM', text: 'Amazonas' },
		{ value: 'BA', text: 'Bahia' },
		{ value: 'CE', text: 'Ceará' },
		{ value: 'DF', text: 'Distrito Federal' },
		{ value: 'ES', text: 'Espírito Santo' },
		{ value: 'GO', text: 'Goiás' },
		{ value: 'MA', text: 'Maranhão' },
		{ value: 'MT', text: 'Mato Grosso' },
		{ value: 'MS', text: 'Mato Grosso do Sul' },
		{ value: 'MG', text: 'Minas Gerais' },
		{ value: 'PA', text: 'Pará' },
		{ value: 'PB', text: 'Paraíba' },
		{ value: 'PR', text: 'Paraná' },
		{ value: 'PE', text: 'Pernambuco' },
		{ value: 'PI', text: 'Piauí' },
		{ value: 'RJ', text: 'Rio de Janeiro' },
		{ value: 'RN', text: 'Rio Grande do Norte' },
		{ value: 'RS', text: 'Rio Grande do Sul' },
		{ value: 'RO', text: 'Rondônia' },
		{ value: 'RR', text: 'Roraima' },
		{ value: 'SC', text: 'Santa Catarina' },
		{ value: 'SP', text: 'São Paulo' },
		{ value: 'SE', text: 'Sergipe' },
		{ value: 'TO', text: 'Tocantins' },
	]

	return (
		<>
			<div className="">
				<CompanyTitle
					companyId={ companyId }
					displayName={ companyData.displayName }
					oficialName={ companyData.oficialName }
				/>
			</div>
			<div className="my-10 relative w-full" >
				<Form action={ updateCompanyData } >
					<Hidden name="id" value={ companyData.id } />
					<TextBox
						label={ t( "Name" ) }
						id="displayName"
						defaultValue={ companyData.displayName }
						required={ true }
					/>
					<TextBox
						label={ t( "Corporate reason" ) }
						id="oficialName"
						defaultValue={ companyData.oficialName }
						size="lg"
					/>
					<TextBox
						label="CNPJ"
						id="cnpj"
						placeholder="xx.xxx.xxx/xxxx-xx"
						defaultValue={ formatCnpj( companyData.cnpj ) }
						pattern="(\d{2}|\d{3})\.\d{3}\.\d{3}\/\d{4}-\d{2}"
						title="Digite um CNPJ válido no formato xx.xxx.xxx/xxxx-xx"
						required={ true }
					/>
					<TextBox
						label={ t( "IE" ) }
						id="ie"
						defaultValue={ formatIE( companyData.ie ) }
						pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
						title="Digite um CNPJ válido no formato xxx.xxx.xxx-xx"
					/>
					<TextBox
						label={ t( "CNAE" ) }
						id="cnae"
						defaultValue={ companyData.cnae }
					/>
					<TextBox
						label={ t( "Company size" ) }
						id="companySize"
						defaultValue={ companyData.companySize }
					/>
					<SwitchButton
						id="simplesNacional"
						label={ t( "Simples Nacional" ) }
						checked={ companyData.simplesNacional }
						size="sm"
						/>
					<SwitchButton
						id="icmsTaxpayer"
						label={ t( "ICMS Tax payer" ) }
						checked={ companyData.icmsTaxpayer }
						size="sm"
					/>
					<BreakRow  size="xl" />
					<TextBox
						label={ t( "Address" ) }
						id="address"
						defaultValue={ companyData.address }
					/>
					<TextBox
						label={ t( "Number" ) }
						id="addressNumber"
						defaultValue={ companyData.addressNumber }
						size="sm"
					/>
					<TextBox
						label={ t( "Complement" ) }
						id="addressComplement"
						defaultValue={ companyData.addressComplement }
						size="sm"
					/>
					<TextBox
						label={ t( "Neighborhood" ) }
						id="neighborhood"
						defaultValue={ companyData.neighborhood }
						size="sm"
					/>
					<TextBox
						label={ t( "PostalCode" ) }
						id="postalCode"
						defaultValue={ formatCEP( companyData.postalCode ) }
						size="sm"
					/>
					<BreakRow size="sm" />
					<TextBox
						label={ t( "City" ) }
						id="city"
						defaultValue={ companyData.city }
					/>
					<Select
						label={ t( "State" ) }
						id="state"
						defaultValue={ companyData.state }
						options={ states }
					/>
					<TextBox
						label={ t( "Country code" ) }
						id="countryCode"
						defaultValue={ companyData.countryCode }
						size="sm"
					/>
					<TextBox
						label={ t( "Country" ) }
						id="country"
						defaultValue={ companyData.country }
					/>
					<BreakRow  size="xl" />
					<TextBox
						label={ t( "Phone" ) }
						id="phone"
						defaultValue={ formatPhone( companyData.phone ) }
					/>
					<TextBox
						label={ t( "E-mail" ) }
						id="email"
						defaultValue={ companyData.email }
					/>
					<TextBox
						label={ t( "Nf-e E-mail" ) }
						id="nfeEmail"
						defaultValue={ companyData.nfeEmail }
					/>
					<TextBox
						label={ t( "Website" ) }
						id="website"
						defaultValue={ companyData.website }
					/>
					<BreakRow  size="xl" />
					<SaveButton />
				</Form>
			</div>
			<ToggleLockedButton />
		</>
	)
}
export default Page
