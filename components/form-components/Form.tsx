export default function Form ( { children, action, method, className }: {
	children: React.ReactNode
	action?: ( formData: FormData ) => Promise<void>
	method?: string
	className?: string
} ) {
	return (
		<form
			action={ action }
			method={ method }
			className={ `relative w-full ${ className }` }
		>
			{ children }
		</form>
	)
}