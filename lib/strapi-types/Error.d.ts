interface ErrorDetails {
	[ key: string ]: any
}

interface ErrorMeta {
	status: number
	name: string
	message: string
	details: ErrorDetails
}

export interface ResponseError {
	data: Record<string, any>
	error: ErrorMeta
}