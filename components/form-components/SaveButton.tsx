"use client"

import React from 'react'
import { FiLock, FiUnlock } from "react-icons/fi"
import { useFormStatus } from 'react-dom'
import t from '@/lib/translations'


interface SaveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	size?: "sm" | "md" | "lg"
	lockable?: boolean	
}

export default function SaveButton ( props: SaveButtonProps ) {
	
	const { children, className, size, lockable = true, ...rest } = props
	const { pending } = useFormStatus()

	const buttonSizes: { [ key in NonNullable<SaveButtonProps[ "size" ]> ]: string } = {
		sm: "py-1 px-7 text-sm",
		md: "py-3 px-10",
		lg: "py-4 px-12 text-xl"
	}

	const iconSizes: { [ key in NonNullable<SaveButtonProps[ "size" ]> ]: string } = {
		sm: "rounded-full border border-white text-[7pt] absolute top-1 right-1 p-[3px] w-fit",
		md: "rounded-full border border-white text-sm absolute bottom-1 right-1 p-[5px]",
		lg: "py-4 px-12 text-xl"
	}

	const defaultClasses = "relative bg-green-600 text-lg rounded text-white shadow-[inset_-3px_-5px_5px_0.2px_rgba(0,0,0,0.2)] hover:bg-green-700 active:bg-green-800"

	return (
		<button
			className={ `${ defaultClasses } ${ lockable ? "locked:dark:bg-gray-800 locked:bg-gray-500" : "" } ${ buttonSizes[ size || "md" ] } ${ className }` }
			type="submit"
			disabled={ pending }
			{ ...rest }
		>
			{ lockable &&
				<div className={ `opacity-70 ${ iconSizes[ size || "md" ] }` } >
					<FiLock className="hidden locked:block" />
					<FiUnlock className="block locked:hidden" />
				</div>
			}
			{ pending ? t( "Loading" ) + "..." : children }
		</button>
	)
}