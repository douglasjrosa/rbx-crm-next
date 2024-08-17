// Interaction Attributes
export interface InteractionAttributes {
	type?: string
	content?: string
	deal?: string | number | {
		data: Deal
	}
	contact?: string | number | {
		data: Contact
	}
	seller?: string | number | {
		data: Seller
	}
	createdAt?: string
	updatedAt?: string
	createdBy?: User | null
	updatedBy?: User | null
}

// Interaction Interface
export interface Interaction {
	id: number
	attributes: InteractionAttributes
}

export interface ResponseInteractions {
	data: Interaction[]
}

export interface ResponseInteraction {
	data: Interaction
}