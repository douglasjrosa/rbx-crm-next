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
		<div className={ `w-full relative ${ className ?? "" } bg-white dark:bg-sky-900 rounded shadow-[inset_2px_2px_6px_0.8px_rgba(0,0,0,0.2)]` }>
			{ label && (
				<span className="absolute text-[12px] left-2 top-1 text-sky-700 dark:text-sky-200 z-10">
					{ label }:
				</span>
			) }
			<select
				id={ uid }
				name={ name }
				className={ `relative p-2 pr-0 w-full rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-violet-500 text-right outline-none z-20 ${ !!label ? "pt-4 pb-0 h-[44px]" : "h-[32px]" }` }
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
