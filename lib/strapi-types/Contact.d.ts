// Contact Attributes
export interface ContactAttributes {
	name?: string
	phone?: string
	email?: string
	decisionRole?: string
	interactions?: string[] | number[] | {
		data: Interaction[]
	}
	isActive?: boolean
	companyId: string
	createdAt?: string
	updatedAt?: string
	createdBy?: User | null
	updatedBy?: User | null
}

// Contact Interface
export interface Contact {
	id: number
	attributes: ContactAttributes
}

export interface ResponseContacts {
	data: Contact[]
}

export interface ResponseContact {
	data: Contact
}