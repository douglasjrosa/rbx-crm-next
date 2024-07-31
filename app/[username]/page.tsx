import { redirect } from 'next/navigation'

export default function Page ( { params }: { params: { username: string } } ) {

	const { username } = params
	if ( username ) redirect( `/${ username }/dashboard` )

	return null
}