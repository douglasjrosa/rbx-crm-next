import { ContactAttributes } from "./contact"

export interface CompanyAttributes {
	displayName: string
	cnpj: `${ number }`
	ie?: `${ number }`
	postalCode?: `${ number }`
	contacts?: ContactAttributes
	isActive?: boolean
	seller?: any // Defina o tipo correto se necessário
	creditLimit?: number
	maximumPaymentTerm?: number
	seasonality?: number
	corporateReason?: string
	email?: string
	country?: string
	address?: string
	countryCode?: number
	addressNumber?: number
	addressComplement?: string
	neighborhood?: string
	city?: string
	state?: string
	website?: string
	nfeEmail?: string
	phone?: `${ number }`
	icmsTaxpayer?: string
	cnae?: `${ number }`
	companySize?: string
	simplesNacional?: boolean
}