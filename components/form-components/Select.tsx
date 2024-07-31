export default function Select ( {
	id,
	label,
	defaultValue,
	placeholder,
	required,
	size,
	className,
	options
}: {
	id: string
	label: string
	defaultValue?: string
	placeholder?: string
	required?: boolean
	size?: 'sm' | 'md' | 'lg'
	className?: string
	options: Array<{ value: string, text: string }>
} ) {
	const responsiveClasses: { sm: string; md: string; lg: string } = {
		sm: 'w-2/5 sm:w-1/4 md:w-32 lg:w-40',
		md: 'w-5/6 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6',
		lg: 'w-5/6 md:w-2/3 lg:w-1/2 xl:w-2/5 2xl:w-1/3',
	}

	const classes = className ?? responsiveClasses[ size || "md" ]

	return (
		<div className={ `p-3 relative locked:opacity-70 ${ classes }` }>
			<label htmlFor={ id } >
				<span className="absolute text-[12px] top-4 left-5 text-sky-700 dark:text-sky-200">
					{ label }:
				</span>
				<select
					id={ id }
					name={ id }
					className={ `px-4 pt-5 pb-2 w-full rounded dark:bg-violet-400 dark:bg-opacity-10 shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-right scrollbar outline-none` }
					defaultValue={ defaultValue }
					required={ required }
				>
					<optgroup key="optionHeader" className="text-[7px] bg-sky-200 dark:bg-sky-900" label="">
						<option value="" className="text-[10pt] italic bg-sky-200 text-sky-900 dark:bg-sky-900 dark:text-white p-2 text-bold" disabled>
							{ placeholder || 'Escolha uma opção' }&nbsp;&nbsp;&nbsp;&nbsp;
						</option>
					</optgroup>
					<optgroup className="text-[7px] bg-sky-200 dark:bg-sky-900" label=""></optgroup>
					{ options.map( ( option, index ) => (
						<optgroup key={ index } className="text-[7px] dark:bg-sky-950" label="">
							<option value={ option.value } className="text-[12pt] dark:bg-sky-950 focus-visible:bg-black" >
								{ option.text }&nbsp;&nbsp;&nbsp;&nbsp;
							</option>
						</optgroup>
					) ) }
					<optgroup key="optionFooter" className="text-[7px] dark:bg-sky-950" label=""></optgroup>
				</select>
			</label>
		</div>
	)
}
