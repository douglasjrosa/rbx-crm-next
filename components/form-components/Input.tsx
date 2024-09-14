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
		<div className={ `w-full relative bg-white dark:bg-sky-900 shadow-[inset_2px_2px_6px_0.8px_rgba(0,0,0,0.2)] rounded ${ className }` } >
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
				className={ `px-3 py-1 w-full rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-violet-500 text-right ${ !!label ? "pt-4 h-[44px]" : "h-[32px]" }` }
				{ ...props }
			/>
		</div>
	)
}