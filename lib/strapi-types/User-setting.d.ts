// Seller Attributes
export interface SellerAttributes {
	username?: string
	jwt?: string
	themeMode?: string
	phone?: string
	displayName?: string
	user?: string | number | {
		data: User
	}
	email?: string
	createdAt?: string
	updatedAt?: string
	createdBy?: User | null
	updatedBy?: User | null
}

// Seller Interface
export interface Seller {
	id: number
	attributes: SellerAttributes
}

export interface ResponseSellers {
	data: Seller[]
}

export interface ResponseSeller {
	data: Seller
}