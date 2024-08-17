import { CiCalendarDate } from "react-icons/ci"
import { refreshKey } from "@/lib/utils"

export default function DateInput ( {
	label,
	defaultValue,
	name,
	className,
	...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
	label: string
	defaultValue: string
	name: string
	className?: string
	} ) {
	
	const uid = refreshKey( name )
	
	return (
		<div className={ `w-full relative ${ className }` } >
			<CiCalendarDate className="absolute text-2xl font-black fill-sky-700 dark:fill-white bottom-2 right-2 invisible-to-firefox" />
			<div className="relative" >
				{ label &&
					<label
						htmlFor={ uid }
						className="absolute text-[12px] top-0 left-2 text-sky-700 dark:text-sky-100"
					>
						{ label }:
					</label>
				}
				<input
					type="date"
					id={ uid }
					name={ name }
					defaultValue={ defaultValue }
					className={ `px-3 py-1 w-full rounded bg-transparent dark:bg-violet-400 dark:bg-opacity-10 shadow-cover focus:outline-none focus:ring-2 focus:ring-violet-500 text-right ${ !!label ? "pt-4 h-[44px]" : "h-[32px]" }` }
					{ ...props }
				/>
			</div>
		</div>
	)
}