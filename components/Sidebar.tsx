"use client"
import { CiBank, CiBoxes, CiMoneyBill, CiMonitor, CiUser } from 'react-icons/ci'
import NavLink from './NavLink'

interface SidebarProps {
	username: string
}

export default function Sidebar ( { username }: SidebarProps ) {
	return (

		<div
			className="hidden sm:block show-menu:block absolute sm:relative z-39"
			style={ { width: "63px" } }
		>
			<nav
				className="flex flex-col gap-2 justify-between bg-sky-500 dark:bg-sky-950 text-gray-900 dark:text-white z-40 fixed w-[65px]"
				style={ { width: "62px", height: `calc(100vh - 62px)` } }
			>
				<ul className="flex gap-6 flex-col items-center py-2 lg:pt-5">
					<li>
						<NavLink href={ `/${ username }/dashboard` } icon={ <CiMonitor /> } linkText="Painel" />
					</li>
					<li>
						<NavLink href={ `/${ username }/deals` } icon={ <CiMoneyBill /> } linkText="Negócios" />
					</li>
					<li>
						<NavLink href={ `/${ username }/companies` } icon={ <CiBank /> } linkText="Empresas" />
					</li>
					<li>
						<NavLink href={ `/${ username }/products` } icon={ <CiBoxes /> } linkText="Produtos"  />
					</li>
				</ul>
				<ul className="w-full py-2 bg-black bg-opacity-10">
					<li>
						<NavLink href={ `/${ username }/profile` } icon={ <CiUser /> } linkText="Perfil" className='m-auto' />
					</li>
				</ul>
			</nav>
		</div>
	)
}