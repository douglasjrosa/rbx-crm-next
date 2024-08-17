// Payment Method Attributes
export interface PaymentMethodAttributes {
	description?: string
	conditions?: string
	blingAccountCnpj?: string
	blingAccountName?: string
	blingPaymentMethodId?: string
	createdAt?: string
	updatedAt?: string
	createdBy?: User | null
	updatedBy?: User | null
}

// Payment Method Interface
export interface PaymentMethod {
	id: number
	attributes: PaymentMethodAttributes
}

export interface ResponsePaymentMethods {
	data: PaymentMethod[]
}

export interface ResponsePaymentMethod {
	data: PaymentMethod
}