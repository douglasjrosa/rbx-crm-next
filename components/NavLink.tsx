import Link from "next/link"
import { ReactNode } from "react"
import t from '@/lib/translations'

type NavLinkProps = {
	href: string
	icon: ReactNode
	linkText: string
}

export default function NavLink ( { href, icon, linkText }: NavLinkProps ) {
	return (
		<Link href={ href } className='group flex items-center w-[42px]' >
			<div
				className="p-2 rounded-full bg-transparent text-2xl border border-white text-white h-[42px] z-10 hover:bg-sky-700" >
				{ icon }
			</div>
			<span
				className="hidden group-hover:block text-lg bg-sky-500 dark:bg-sky-950 h-[40px] px-5 pt-1 rounded-r-full border border-l-0 border-white ml-[-15px] text-white z-0 opacity-90"
			>
				{ t( linkText ) }
			</span>
		</Link>
	)
}