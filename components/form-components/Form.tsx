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
			<div className="opacity-50 absolute left-0 top-0 right-0 bottom-0 hidden locked:block" ></div>
		</form>
	)
}