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
		<div className={ `w-full relative` } >
			{ label &&
				<label
					htmlFor={ uid }
					className="absolute text-[12px] rounded-tl bg-gradient-to-br from-white from-50% to-transparent dark:bg-gradient-to-br dark:from-sky-700/90 dark:from-50% dark:to-transparent top-0 left-0 right-0 pl-2 text-sky-700 dark:text-white"
					style={{ maxWidth: "calc( 100% - 12px )" }}
				>
					{ label }:
				</label>
			}
			<textarea
				id={ uid }
				name={ name }
				className={ `scrollbar px-3 py-1 w-full rounded dark:bg-violet-400 dark:bg-opacity-10 shadow-cover focus:outline-none focus:ring-2 focus:ring-violet-500 text-right ${ !!label ? "pt-4" : "" } ${ className }` }
				{ ...props }
			>
				{ children }
			</textarea>
		</div>
	)
}