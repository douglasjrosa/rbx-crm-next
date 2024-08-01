export interface ContactAttributes {
	name: string
	phone?: string
	email?: string
	decisionRole: string
	companyId: string | number
	interactions?: Array<string | number>
	isActive?: boolean
}
