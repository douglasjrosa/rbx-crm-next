export default function (
	{ id, label, defaultValue, placeholder, pattern, title, required, size, className }: {
		id: string
		label: string
		defaultValue?: string
		placeholder?: string
		pattern?: string
		title?: string
		required?: boolean
		size?: "sm" | "md" | "lg"
		className?: string
	}
) {

	const responsiveClasses: { sm: string, md: string, lg: string } = {
		sm: "w-2/5 sm:w-1/4 md:w-32 lg:w-40",
		md: "w-5/6 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6",
		lg: "w-5/6 md:w-2/3 lg:w-1/2 xl:w-2/5 2xl:w-1/3"
	}

	const classes = className ?? responsiveClasses[ size || "md" ]

	return (
		<div className={ `p-3 relative locked:opacity-70 ${ classes }` } >
			<label
				htmlFor={ id }
				className="absolute text-[12px] top-4 left-5 text-gray-400"
			>
				{ label }:
			</label>
			<input
				id={ id }
				type="text"
				className={ `px-4 pt-5 pb-2 w-full rounded dark:bg-violet-400 dark:bg-opacity-10 shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-right` }
				name={ id }
				defaultValue={ defaultValue }
				placeholder={ placeholder }
				pattern={ pattern }
				title={ title }
				required={ required }
			/>
		</div>
	)
}