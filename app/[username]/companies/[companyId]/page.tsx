import { getCompanyAttributesById } from "@/app/api/utils"
import CompanyTitle from "@/components/CompanyTitle"

interface PageProps {
	params: {
		companyId: string
	}
}

export default async function Page ( { params }: PageProps ) {

	const { companyId } = params

	const companyAttributes = await getCompanyAttributesById( companyId )
	if ( !companyAttributes ) throw new Error( "Error fetching company data by Id." )

	const {
		displayName,
		corporateReason,
		cnpj
	} = companyAttributes

	return (
		<>
			<div className="">
				<CompanyTitle
					companyId={ companyId }
					displayName={ displayName }
					corporateReason={ corporateReason }
					cnpj={ cnpj }
					edit={ true }
				/>
			</div>
		</>
	)
}