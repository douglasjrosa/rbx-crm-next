import { getCompanyAttributes } from "@/app/api/utils"
import CompanyTitle from "@/components/CompanyTitle"

interface PageProps {
	params: {
		companyId: string
		username: string
	}
}

export default async function Page ( { params }: PageProps ) {

	const { companyId, username } = params

	const companyAttributes = await getCompanyAttributes( companyId )
	if ( !companyAttributes ) throw new Error( "Error fetching company data by Id." )

	const {
		displayName,
		corporateReason
	} = companyAttributes

	return (
		<>
			<div className="">
				<CompanyTitle
					companyId={ companyId }
					displayName={ displayName }
					corporateReason={ corporateReason }
					edit={ true }
				/>
			</div>
		</>
	)
}