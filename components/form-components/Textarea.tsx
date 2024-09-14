import { refreshKey } from "@/lib/utils"

export default function Textarea ( {
	label,
	className,
	name,
	children,
	...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string, name: string } ) {

	const uid = refreshKey( name )

	return (
		<div className={ `w-full relative bg-white dark:bg-sky-900 rounded shadow-[inset_2px_5px_3px_0.5px_rgba(0,0,0,0.3)]` } >
			{ label &&
				<label
					htmlFor={ uid }
					className="absolute text-[12px] top-0 left-0 right-0 pl-2 text-sky-700 dark:text-white"
					style={{ maxWidth: "calc( 100% - 12px )" }}
				>
					{ label }:
				</label>
			}
			<textarea
				id={ uid }
				name={ name }
				className={ `scrollbar h-full px-3 py-1 w-full rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-violet-500 text-right ${ !!label ? "pt-4" : "" } ${ className }` }
				{ ...props }
			>
				{ children }
			</textarea>
		</div>
	)
}