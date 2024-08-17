// Issuer Attributes
export interface IssuerAttributes {
	blingAccessToken?: string
	blingRefreshToken?: string
	blingClientId?: string
	blingClientSecret?: string
	blingExpiresIn?: number
	payment_methods?: string[] | {
		data: PaymentMethod[]
	}
	isActive?: boolean
	company?: string | number | {
		data: Company
	}
	createdAt?: string
	updatedAt?: string
	createdBy?: User | null
	updatedBy?: User | null
}

// Issuer Interface
export interface Issuer {
	id: number
	attributes: IssuerAttributes
}

export interface ResponseIssuers {
	data: Issuer[]
}

export interface ResponseIssuer {
	data: Issuer
}