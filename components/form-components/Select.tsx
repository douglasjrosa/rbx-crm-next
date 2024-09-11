import { refreshKey } from "@/lib/utils"

export default function Select ( {
	label,
	className,
	name,
	options,
	...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
	label?: string
	className?: string
	name: string
		options: {
			value: string | number | boolean
			text: string
		}[]
} ) {

	const uid = refreshKey( name )

	return (
		<div className={ `w-full relative ${ className ?? "" }` }>
			{ label && (
				<span className="absolute text-[12px] left-2 top-1 text-sky-700 dark:text-sky-200 z-10">
					{ label }:
				</span>
			) }
			<select
				id={ uid }
				name={ name }
				className={ `relative p-2 pr-0 w-full rounded bg-white bg-opacity-30 dark:bg-violet-400 dark:bg-opacity-10 shadow-cover focus:outline-none focus:ring-2 focus:ring-violet-500 text-right outline-none z-20 ${ !!label ? "pt-5 h-[44px]" : "h-[32px]" }` }
				{ ...props }
			>
				{ options.map( ( option, optionIndex ) => (
					<option key={ optionIndex } value={ typeof option.value === "boolean" ? String( option.value ) : option.value } className="text-[12pt] dark:bg-sky-950 focus-visible:bg-black" >
						{ option.text }&nbsp;&nbsp;
					</option>
				) ) }
			</select>
		</div>
	)
}
