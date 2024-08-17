// User Attributes
export interface UserAttributes {
	username?: string
	email?: string
	provider?: string
	resetPasswordToken?: string | null
	confirmationToken?: string | null
	confirmed?: boolean
	blocked?: boolean
	role?: string | number | {
		data: Role
	}
	settings?: {
		data: any
	}
	createdAt?: string
	updatedAt?: string
	createdBy?: User | null
	updatedBy?: User | null
}

// User Interface
export interface User {
	id: number
	attributes: UserAttributes
}

export interface ResponseUsers {
	data: User[]
}

export interface ResponseUser {
	data: User
}