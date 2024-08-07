export default function NumberBox (
	{ index, name, label, defaultValue, placeholder, pattern, title, required, className }: {
		index?: number | string
		name: string
		label?: string
		defaultValue?: number
		placeholder?: string
		pattern?: string
		title?: string
		required?: boolean
		className?: string
	}
) {
	return (
		<div className={ `w-full relative ${ className }` } >
			{ label &&
				<label
					htmlFor={ `${ name }-${ index ?? "" }` }
					className="absolute text-[12px] top-0 left-2 text-sky-700 dark:text-sky-200"
				>
					{ label }:
				</label>
			}
			<input
				id={ `${ name }-${ index ?? "" }` }
				type="number"
				className={ `px-3 py-1 w-full rounded dark:bg-violet-400 dark:bg-opacity-10 shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-right ${ !!label ? "pt-4 h-[44px]" : "h-[32px]" }` }
				name={ name }
				defaultValue={ defaultValue }
				placeholder={ placeholder }
				pattern={ pattern }
				title={ title }
				required={ required }
			/>
		</div>
	)
}