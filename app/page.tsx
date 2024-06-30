import { baseUrl } from "@/lib/utils"
import { Box, Button } from "@chakra-ui/react"


export default async function Home () {

	const response = await fetch( `${ baseUrl }/api/users` )
	const users = await response.json()

	return (
		<main>
			<Box>
				<h1>Home</h1>
				<Button
					colorScheme="teal"
					variant="solid"
					size="lg"
				>Wellcome</Button>
			</Box>
			{ users && 
				users.map( (user: any, key: number) => <p key={key}>{ user.username }</p> ) 
			}
		</main>
	)
}
