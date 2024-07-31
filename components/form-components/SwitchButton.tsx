"use client"

import { useState } from "react"

interface SwitchButtonProps {
	id: string
	label: string
	checked: boolean
	size?: "sm" | "md" | "lg"
}

const SwitchButton = ( { id, label, checked, size }: SwitchButtonProps ) => {
	const [ enabled, setEnabled ] = useState( checked )

	const responsiveClasses: { sm: string, md: string, lg: string } = {
		sm: "w-2/5 sm:w-1/4 md:w-32 lg:w-44",
		md: "w-5/6 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6",
		lg: "w-5/6 md:w-2/3 lg:w-1/2 xl:w-2/5 2xl:w-1/3"
	}

	return (
		<div className={ `p-3 relative locked:opacity-60 flex items-center gap-2 ${ responsiveClasses[ size || "md" ] }` } >
			<span className="relative">
				<input
					id={ id }
					name={ id }
					type="checkbox"
					className="sr-only"
					defaultChecked={ checked }
				/>
				<label htmlFor={ id } >
					<span
						onClick={ () => setEnabled( !enabled ) }
						className={ `pointer block bg-gray-600 w-12 h-6 rounded-full shadow-[inset_2px_5px_3px_0.5px_rgba(0,0,0,0.3)] ${ enabled ? "bg-green-600" : "bg-gray-400" }` }
					>
						<span className={ `absolute left-1 top-1 bg-white w-5 h-4 rounded-full shadow-[inset_-3px_-5px_2px_0.05px_rgba(0,0,0,0.15)] transition ${ enabled ? "transform translate-x-full" : "" }` }></span>
					</span>
				</label>
			</span>
			<span className=" texty-sm" >{ label }</span>
		</div >

	)
}
export default SwitchButton