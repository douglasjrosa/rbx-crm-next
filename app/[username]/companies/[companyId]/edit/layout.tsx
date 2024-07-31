import { getCompanyAttributes } from "@/app/api/utils"
import CompanyTitle from "@/components/CompanyTitle"
import ToggleLockedButton from "@/components/ToggleLockedButton"


interface PageProps {
	children: React.ReactNode
	params: {
		companyId: string
		username: string
	}
}

export default async function Layout ( { children, params }: PageProps ) {

	const { companyId, username } = params
	const companyAttributes = await getCompanyAttributes( companyId )
	if ( !companyAttributes ) throw new Error( "Error fetching company data by Id." )

	const {
		displayName,
		corporateReason
	} = companyAttributes

	return (
		<div className="container">
			<div className="">
				<CompanyTitle
					companyId={ companyId }
					displayName={ displayName }
					corporateReason={ corporateReason }
				/>
			</div>
			<div className=" my-10 relative w-full" >
				{ children }
			</div>
			<ToggleLockedButton />
		</div>
	)
}