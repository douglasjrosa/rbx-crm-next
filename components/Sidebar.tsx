import { CiBank, CiBoxes, CiMoneyBill, CiMonitor, CiUser } from 'react-icons/ci'
import NavLink from './NavLink'

export default function Sidebar () {
	return (
		<div className="relative w-[72px] bg-white">
			<nav className="flex flex-col justify-between h-screen bg-sky-500 dark:bg-sky-950 text-gray-900 dark:text-white px-3 py-6 z-40 fixed">
				<ul className="space-y-4">
					<li>
						<div className="text-xl text-white font-bold mb-6">CRM</div>
					</li>
					<li>
						<NavLink href="/dashboard" icon={ <CiMonitor /> } linkText="Painel" />
					</li>
					<li>
						<NavLink href="/deals" icon={ <CiMoneyBill /> } linkText="Negócios" />
					</li>
					<li>
						<NavLink href="/companies" icon={ <CiBank /> } linkText="Empresas" />
					</li>
					<li>
						<NavLink href="/products" icon={ <CiBoxes /> } linkText="Produtos" />
					</li>
				</ul>
				<ul className="space-y-4">
					<li>
						<NavLink href="/profile" icon={ <CiUser /> } linkText="Perfil" />
					</li>
				</ul>
			</nav>
		</div>
	)
}