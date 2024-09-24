"use client"
import { refreshKey } from "@/lib/utils"
import { useState, useEffect } from "react"

type Sizes = "xs" | "sm" | "md" | "lg"

interface SwitchButtonProps {
	index?: number | string
	name: string
	label: string
	checked: boolean
	size?: Sizes
	onChange?: ( e: React.ChangeEvent<HTMLInputElement> ) => void
}

const SwitchButton = ( { index, name, label, checked, size, onChange }: SwitchButtonProps ) => {
	const [ enabled, setEnabled ] = useState( checked )
	
	useEffect( () => {
		setEnabled( checked )
	}, [ index, checked ] )
	
	const responsiveClasses = {
		xs: "text-xs",
		sm: "text-sm",
		md: "",
		lg: ""
	}

	const uid = refreshKey( name )

	return (
		<div
			key={ index }
			className={ `w-full relative locked:opacity-60 flex items-center gap-2 ${ responsiveClasses[ ( size || "md" ) ] }` }
		>
			<span className="relative">
				<input
					id={ uid }
					name={ name }
					type="checkbox"
					className="sr-only"
					checked={ enabled }
					onChange={ e => {
						const isChecked = e.target.checked
						setEnabled( isChecked )
						onChange && onChange( e )
					}}
				/>
				<label htmlFor={ uid }>
					<span
						className={ `pointer block bg-gray-600 w-12 h-6 rounded-full shadow-[inset_2px_5px_3px_0.5px_rgba(0,0,0,0.3)] ${ enabled ? "bg-green-600" : "bg-gray-400" }` }
					>
						<span className={ `absolute left-1 top-1 bg-white w-5 h-4 rounded-full shadow-[inset_-3px_-5px_2px_0.05px_rgba(0,0,0,0.15)] transition ${ enabled ? "transform translate-x-full" : "" }` }></span>
					</span>
				</label>
			</span>
			<span className="text-sm">{ label }</span>
		</div>
	)
}

export default SwitchButton