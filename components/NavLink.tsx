import Link from "next/link"
import { ReactNode } from "react"
import t from '@/lib/translations'

type NavLinkProps = {
	href: string
	icon: ReactNode
	linkText: string
	className?: string
	scale?: number
}

export default function NavLink ( { href, icon, linkText, className, scale = 1 }: NavLinkProps ) {
	return (
		<Link
			href={ href }
			className={ `group flex items-center relative ${ className }` }
			style={ { width: `${ Math.floor( 42 * scale ) }px` } }
		>
			<div
				className="rounded-full bg-transparent border border-white text-white z-10 hover:bg-sky-700 flex items-center justify-center"
				style={ { fontSize: `${ Math.floor( 20 * scale ) }pt`, width: `${ Math.floor( 42 * scale ) }px`, height: `${ Math.floor( 42 * scale ) }px` } }
			>
				{ icon }
			</div>
			<span
				className="hidden group-hover:block bg-sky-500 dark:bg-sky-950 h-[40px] px-5 pt-1 rounded-r-full border border-l-0 border-white absolute left-[30px] top-[1px] text-white opacity-90"
				style={ { fontSize: `${ Math.floor( 15 * scale ) }pt` } }
			>
				{ t( linkText ) }
			</span>
		</Link>
	)
}