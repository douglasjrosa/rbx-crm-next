"use client"
import { CiBank, CiBoxes, CiMoneyBill, CiMonitor, CiUser } from 'react-icons/ci'
import NavLink from './NavLink'
import { useEffect, useState } from 'react'

interface SidebarProps {
	username: string
}

export default function Sidebar ( { username }: SidebarProps ) {

	const [ scale, setScale ] = useState( 1 )
	const [ outerHeight, setOuterHeight ] = useState( 1 )

	const applyZoom = () => {
		const { innerWidth, outerWidth } = window
		if ( outerWidth !== innerWidth ) {
			const scale = innerWidth / outerWidth
			setScale( scale )
		}
	}

	useEffect( () => {
		const { devicePixelRatio, outerHeight } = window
		setOuterHeight( outerHeight )
		setScale( 1 / devicePixelRatio )

		window.addEventListener( 'resize', applyZoom )
		window.addEventListener( 'DOMContentLoaded', applyZoom )
	}, [] )

	return (

		<div
			className="hidden sm:block show-menu:block absolute sm:relative z-39"
			style={ { width: `${ Math.ceil( 63 * scale ) }px` } }
		>
			<nav
				className="flex flex-col gap-2 justify-between bg-sky-500 dark:bg-sky-950 text-gray-900 dark:text-white z-40 fixed w-[65px]"
				style={ { width: `${ Math.ceil( 62 * scale ) }px`, height: `calc(100vh - ${Math.ceil( 62 * scale )}px)` } }
			>
				<ul className="flex gap-6 flex-col items-center py-2">
					<li>
						<NavLink href={ `/${ username }/dashboard` } icon={ <CiMonitor /> } linkText="Painel" scale={ scale } />
					</li>
					<li>
						<NavLink href={ `/${ username }/deals` } icon={ <CiMoneyBill /> } linkText="Negócios" scale={ scale } />
					</li>
					<li>
						<NavLink href={ `/${ username }/companies` } icon={ <CiBank /> } linkText="Empresas" scale={ scale } />
					</li>
					<li>
						<NavLink href={ `/${ username }/products` } icon={ <CiBoxes /> } linkText="Produtos" scale={ scale }  />
					</li>
				</ul>
				<ul className="w-full py-2 bg-black bg-opacity-10">
					<li>
						<NavLink href={ `/${ username }/profile` } icon={ <CiUser /> } linkText="Perfil" className='m-auto' scale={ scale } />
					</li>
				</ul>
			</nav>
		</div>
	)
}