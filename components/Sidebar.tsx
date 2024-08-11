"use client"
import { CiBank, CiBoxes, CiMoneyBill, CiMonitor, CiUser } from 'react-icons/ci'
import NavLink from './NavLink'
import { useCallback, useEffect, useState } from 'react'

interface SidebarProps {
	username: string
}

export default function Sidebar ( { username }: SidebarProps ) {
	const [ isShort, setIsShort ] = useState( false )

	useEffect( () => {
		const checkMobile = () => {
			const { innerHeight } = window
			setIsShort( innerHeight < 354 )
		}
		checkMobile()
		window.addEventListener( 'resize', checkMobile )
		return () => window.removeEventListener( 'resize', checkMobile )
	}, [] )

	return (

		<nav className="flex flex-col gap-2 justify-between h-full" >
			<ul className={ `flex flex-col items-center py-2 lg:pt-5 ${ isShort ? "gap-2" : "gap-4" }`} >
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
					<NavLink href={ `/${ username }/products` } icon={ <CiBoxes /> } linkText="Produtos" />
				</li>
			</ul>
			<ul className="w-full py-2 bg-black bg-opacity-10">
				<li>
					<NavLink href={ `/${ username }/profile` } icon={ <CiUser /> } linkText="Perfil" className='m-auto' />
				</li>
			</ul>
		</nav>
	)
}