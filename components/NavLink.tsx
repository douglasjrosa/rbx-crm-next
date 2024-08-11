"use client"

import Link from "next/link"
import { ReactNode, useState, useCallback, useEffect } from "react"
import t from '@/lib/translations'

type NavLinkProps = {
	href: string
	icon: ReactNode
	linkText: string
	className?: string
}

export default function NavLink ( { href, icon, linkText, className }: NavLinkProps ) {
	const [ isVisible, setIsVisible ] = useState( false )

	const handleInteraction = useCallback( () => {
			setIsVisible( true )
			setTimeout( () => setIsVisible( false ), 1500 )
	}, [] )

	return (
		<Link
			href={ href }
			className={ `group flex items-center relative w-[42px] ${ className }` }
			onClick={ handleInteraction }
			onMouseEnter={ () => setIsVisible( true ) }
			onMouseLeave={ () => setIsVisible( false ) }
		>
			<div className="text-[20pt] size-[42px] rounded-full bg-transparent border border-white text-white z-10 hover:bg-sky-700 flex items-center justify-center">
				{ icon }
			</div>
			<span
				className={ `
          text-[15pt] bg-sky-500 dark:bg-sky-950 h-[40px] px-5 pt-1 rounded-r-full 
          border border-l-0 border-white absolute left-[30px] top-[1px] text-white 
          transition-opacity duration-300
          ${ isVisible ? 'opacity-90' : 'opacity-0 pointer-events-none' }
        `}
			>
				{ t( linkText ) }
			</span>
		</Link>
	)
}