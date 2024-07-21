import Link from "next/link"
import { ReactNode } from "react"
import t from '@/lib/translations'

type NavLinkProps = {
	href: string
	icon: ReactNode
	linkText: string
	className?: string
}

export default function NavLink ( { href, icon, linkText, className }: NavLinkProps ) {
	return (
		<Link href={ href } className={ `group flex items-center w-[42px] relative ${ className }` } >
			<div
				className="rounded-full bg-transparent text-2xl border border-white text-white z-10 hover:bg-sky-700 size-10 flex items-center justify-center" >
				{ icon }
			</div>
			<span
				className="hidden group-hover:block text-lg bg-sky-500 dark:bg-sky-950 h-[40px] px-5 pt-1 rounded-r-full border border-l-0 border-white absolute left-[30px] top-[1px] text-white opacity-90"
			>
				{ t( linkText ) }
			</span>
		</Link>
	)
}