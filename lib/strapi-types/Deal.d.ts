// Deal Attributes
export interface DealAttributes {
	reasonForLoss?: string
	interactions?: string[] | number[] | {
		data: Interaction[]
	}
	order?: string | number | {
		data: Order
	}
	company?: string | number | {
		data: Company
	}
	seller?: string | number | {
		data: Seller
	}
	isActive?: boolean
	stage?: "Send proposal" | "Follow up" | "Negotiation" | "Won" | "Lost"
	followUpAt?: string
	negotiationAt?: string
	startedAt?: string
	finishedAt?: string
	expiresAt?: string
	migrationId?: number
	createdAt?: string
	updatedAt?: string
	createdBy?: User | null
	updatedBy?: User | null
}

// Deal Interface
export interface Deal {
	id: number
	attributes: DealAttributes
}

export interface ResponseDeals {
	data: Deal[]
}

export interface ResponseDeal {
	data: Deal
}
