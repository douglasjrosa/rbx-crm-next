
import { getSellerIdByUsername } from "@/app/api/utils"
import t from "@/lib/translations"
import { baseUrl } from "@/lib/utils"

interface CompaniesProps {
	params: {
		username: string
	}
}

const Companies = async ( { params }: CompaniesProps ) => {

	const { username } = params
	const sellerId = 2//await getSellerIdByUsername( username )

	const filters = `?filters[seller][$eq]=${ sellerId }`
	const response = await fetch( `${ baseUrl }/api/companies${ filters }&populate=*&sort=displayName:asc` )
	const responseData = await response.json()

	if ( !response.ok ) {
		console.error( { username, response, responseData } )
		throw new Error( "Error fetching companies: " )
	}

	const companies = responseData.data
	const { pagination } = responseData.meta

	return (
		<div>
			<div className="flex">
				<h1 className="text-3xl font-bold mb-6">{ t( 'Companies' ) }</h1>
			</div>
		</div>
	)
}
export default Companies