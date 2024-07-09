import Card from "@/components/Card"
import LogoutButton from "@/components/LogoutButton"
import ThemeToggle from "@/components/ThemeToggle"
import t from "@/lib/translations"
import { baseUrl } from "@/lib/utils"

const Profile = async () => {
	const response = await fetch( `${ baseUrl }/api/users/me` )
	const user = await response.json()
	console.log({user})
	return (
		<div>
			<h1 className="text-3xl font-bold mb-6">Perfil</h1>

			<Card>
				<div className="flex flex-col gap-5">
					<ThemeToggle />
					<ul>
						<li>{ t( 'Name' ) }: </li>
					</ul>
					<LogoutButton />
				</div>
			</Card>
		</div>
	)
}
export default Profile