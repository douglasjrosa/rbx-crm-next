// Order Item Interface
export interface OrderItem {
	id?: number
	productCode?: string
	description?: string
	qty?: number
	mounted?: boolean
	export?: boolean
	price?: number
	subtotal?: number
}

// Order Attributes
export interface OrderAttributes {
	deal?: string | number | {
		data: Deal
	}
	seller?: string | number | {
		data: Seller
	}
	deliverForecast?: string
	freightType?: string
	orderDiscount?: number
	extraCosts?: number
	orderSubtotalValue?: number
	orderTotalValue?: number
	clientOrderCode?: string
	observations?: string
	company?: string | number | {
		data: Company
	}
	issuer?: string | number | {
		data: Issuer
	}
	payment_method?: string | number | {
		data: PaymentMethod
	}
	freightValue?: number
	items?: OrderItem[]
	isActive?: boolean
	migrationId?: number
	createdAt?: string
	updatedAt?: string
	createdBy?: User | null
	updatedBy?: User | null
}

// Order Interface
export interface Order {
	id: number
	attributes: OrderAttributes
}

export interface ResponseOrders {
	data: Order[]
}

export interface ResponseOrder {
	data: Order
}