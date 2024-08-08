
import { getSellerIdByUsername } from "@/app/api/utils"
import NewCompanyForm from "@/components/NewCompanyForm"
import ToggleLockedButton from "@/components/ToggleLockedButton"
import t from "@/lib/translations"
import { baseUrl } from "@/lib/utils"

interface CompaniesProps {
	params: {
		username: string
	}
}

const Companies = async ( { params }: CompaniesProps ) => {

	const { username } = params
	const sellerId = await getSellerIdByUsername( username )

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
		<div className="mx-auto">
			<div className="w-full flex justify-between">
				<h1 className="text-2xl">{ t( "Companies" ) }</h1>
				<NewCompanyForm username={ username } sellerId={ sellerId } />
			</div>
			<div className=" my-10 relative w-full" >
				<div className="flex flex-wrap">
					<div className="w-full lg:w-3/4 p-3">
					</div>
					<div className="w-full lg:w-1/4 p-3">
					</div>
				</div>
			</div>
			<ToggleLockedButton />
		</div>
	)
}
export default Companies