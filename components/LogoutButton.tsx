'use client'

import t from '@/lib/translations'
import { useRouter } from 'next/navigation'
import { CiLogout } from 'react-icons/ci'

export default function LogoutButton () {
	const router = useRouter()

	const handleLogout = () => {
		localStorage.clear()
		router.push( '/login' )
	}

	return (
		<button
			onClick={ handleLogout }
			className="w-fit flex"
		>
			<span className='p-2 text-2xl border  border-sky-900 dark:border-white rounded-full'>{ <CiLogout /> }</span>
			<span className='text-md p-3'>{ t( "Logout" ) }</span>
		</button>
	)
}
