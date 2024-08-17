// Company Attributes
export interface CompanyAttributes {
	displayName: string
	cnpj: string
	isActive?: boolean
	seller?: string | number | {
		data: Seller
	}
	creditLimit?: number
	maximumPaymentTerm?: number
	seasonality?: number
	corporateReason?: string
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
	phone?: string
	icmsTaxpayer?: string
	cnae?: string
	companySize?: string
	simplesNacional?: boolean
	nfeEmail?: string
	email?: string
	expiresAt?: string
	createdAt?: string
	updatedAt?: string
	createdBy?: User | null
	updatedBy?: User | null
	localizations?: {
		data: string[]
	}
	locale?: string
}

// Company Interface
export interface Company {
	id: number
	attributes: CompanyAttributes
}

export interface ResponseCompanies {
	data: Company[]
}

export interface ResponseCompany {
	data: Company
}