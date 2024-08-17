import { refreshKey } from "@/lib/utils"

export default function Input ( {
	label,
	type,
	className,
	name,
	...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label?: string, name: string, type: string } ) {

	const uid = refreshKey( name )

	return (
		<div className={ `w-full relative ${ className }` } >
			{ label &&
				<label
					htmlFor={ uid }
					className="absolute text-[12px] top-0 left-2 text-sky-700 dark:text-sky-100"
				>
					{ label }:
				</label>
			}
			<input
				type={ type }
				id={ uid }
				name={ name }
				className={ `px-3 py-1 w-full rounded dark:bg-violet-400 dark:bg-opacity-10 shadow-cover focus:outline-none focus:ring-2 focus:ring-violet-500 text-right ${ !!label ? "pt-4 h-[44px]" : "h-[32px]" }` }
				{ ...props }
			/>
		</div>
	)
}