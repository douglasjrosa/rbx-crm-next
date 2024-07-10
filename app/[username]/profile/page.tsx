import Card from "@/components/Card"
import LogoutButton from "@/components/LogoutButton"
import ThemeToggle from "@/components/ThemeToggle"
import t from "@/lib/translations"
import { baseUrl, formatPhone } from "@/lib/utils"

interface PageProps {
	params: {
		username: string
	}
}

const Profile: React.FC<PageProps> = async ( { params } ) => {
	const { username } = params;
	const response = await fetch( `${ baseUrl }/api/user-settings?filters[username]=${ username }` )
	const userSettingsData = await response.json()
	const userSettings = userSettingsData.data?.[ 0 ]?.attributes
	console.log( { userSettings })
	return (
		<div>
			<h1 className="text-3xl font-bold mb-6">{ t( 'Profile' ) }</h1>

			<Card>
				<div className="flex flex-col gap-5">
					<ul className="flex flex-col gap-5 my-5">
						<li>{ t( 'Name' ) }: { userSettings.displayName }</li>
						<li>{ t( 'Phone' ) }: { formatPhone( userSettings.phone ) }</li>
						<li>{ t( 'Username' ) }: { username }</li>
						<li>{ t( 'Email' ) }: { userSettings.email }</li>
					</ul>
					<hr className="border border-slate-400"/>
					<ThemeToggle />
					<LogoutButton />
				</div>
			</Card>
		</div>
	)
}
export default Profile