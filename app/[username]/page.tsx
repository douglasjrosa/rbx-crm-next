'use client'

import { redirect } from 'next/navigation'

export default function Home () {
	const username = localStorage.getItem( "username" )
	redirect( `/${ username }/dashboard` )
}