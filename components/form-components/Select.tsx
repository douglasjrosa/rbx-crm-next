import t from "@/lib/translations"
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
	options: { value: string | number, text: string }[]
} ) {

	const uid = refreshKey( name )

	return (
		<div className={ `w-full relative ${ className }` }>
			<label htmlFor={ uid } >
				{ label &&
					<span className="absolute text-[12px] left-2 text-sky-700 dark:text-sky-200">
						{ label }:
					</span>
				}
				<select
					id={ uid }
					name={ name }
					className={ `p-1 pr-0 w-full rounded bg-white bg-opacity-30 dark:bg-violet-400 dark:bg-opacity-10 shadow-cover focus:outline-none focus:ring-2 focus:ring-violet-500 text-right outline-none ${ !!label ? "pt-4 h-[44px]" : "h-[32px]" }` }
					{ ...props }
				>
					<optgroup className="text-[7px] bg-white dark:bg-sky-950" label=""></optgroup>
					{ options.map( ( option, optionIndex ) => (
						<optgroup key={ optionIndex } className="text-[7px] bg-white dark:bg-sky-950" label="">
							<option value={ option.value } className="text-[12pt] dark:bg-sky-950 focus-visible:bg-black" >
								{ option.text }&nbsp;&nbsp;
							</option>
						</optgroup>
					) ) }
					<optgroup key="optionFooter" className="text-[7px] bg-white dark:bg-sky-950" label=""></optgroup>
				</select>
			</label>
		</div>
	)
}
