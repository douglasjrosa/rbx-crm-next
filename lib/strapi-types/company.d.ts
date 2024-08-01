export interface CompanyAttributes {
	displayName: string
	cnpj: string
	ie?: string
	postalCode?: string
	contacts?: any // Defina o tipo correto se necessário
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
	phone?: string
	icmsTaxpayer?: string
	cnae?: string
	companySize?: string
	simplesNacional: boolean
}