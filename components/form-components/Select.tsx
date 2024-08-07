export default function Select ( {
	index,
	name,
	label,
	defaultValue,
	placeholder,
	required,
	className,
	options
}: {
	index?: number | string
	name: string
	label?: string
	defaultValue?: string
	placeholder?: string
	required?: boolean
	size?: 'sm' | 'md' | 'lg'
	className?: string
	options: Array<{ value: string, text: string }>
} ) {
	return (
		<div className={ `w-full relative ${ className }` }>
			<label htmlFor={ `${ name }-${ index ?? "" }` } >
				{ label &&
					<span className="absolute text-[12px] left-2 text-sky-700 dark:text-sky-200">
						{ label }:
					</span>
				}
				<select
					id={ `${ name }-${ index ?? "" }` }
					name={ name }
					className={ `p-1 w-full rounded dark:bg-violet-400 dark:bg-opacity-10 shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-right scrollbar outline-none ${ !!label ? "pt-4 h-[44px]" : "h-[32px]" }` }
					defaultValue={ defaultValue }
					required={ required }
				>
					<optgroup key="optionHeader" className="text-[7px] bg-sky-200 dark:bg-sky-900" label="">
						<option value="" className="text-[10pt] italic bg-sky-200 text-sky-900 dark:bg-sky-900 dark:text-white p-2 text-bold" disabled>
							{ placeholder || 'Escolha uma opção' }&nbsp;&nbsp;&nbsp;&nbsp;
						</option>
					</optgroup>
					<optgroup className="text-[7px] bg-sky-200 dark:bg-sky-900" label=""></optgroup>
					{ options.map( ( option, optionIndex ) => (
						<optgroup key={ optionIndex } className="text-[7px] dark:bg-sky-950" label="">
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
