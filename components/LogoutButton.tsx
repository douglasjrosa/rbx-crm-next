'use client'

import t from '@/lib/translations'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { CiLogout } from 'react-icons/ci'

export default function LogoutButton () {
	const router = useRouter()

	const handleLogout = useCallback( () => {
		localStorage.clear()
		router.push( '/' )
	}, [ router ] )

	return (
		<button
			onClick={ handleLogout }
			className="w-fit flex"
		>
			<span className='p-2 text-2xl border  border-sky-900 dark:border-white rounded-full size-11 flex items-center justify-center'>{ <CiLogout /> }</span>
			<span className='text-md p-3'>{ t( "Logout" ) }</span>
		</button>
	)
}
