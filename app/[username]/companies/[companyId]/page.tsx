import CompanyTitle from "@/components/CompanyTitle"
import { ApiCompanyCompany } from "@/lib/strapi-types/contentTypes"
import t from "@/lib/translations"
import { baseUrl } from "@/lib/utils"

interface CompanyProps extends ApiCompanyCompany {
	id: string | number
}

interface PageProps {
	params: {
		companyId: string
		username: string
	}
}

export default async function Page ( { params }: PageProps ) {

	const { companyId, username } = params

	const response = await fetch( `${ baseUrl }/api/companies/${ companyId }?populate=*` )
	const responseData = await response.json()

	const company = responseData.data as CompanyProps
	const displayName = company.attributes?.displayName
	const companyData = company.attributes?.companyData || null
	const sellerId = company.attributes?.seller?.data?.id


	return (
		<>
			<div className="">
				<CompanyTitle
					companyId={ companyId }
					displayName={ displayName }
					corporateReason={ companyData.corporateReason }
					edit={ true }
				/>
			</div>
		</>
	)
}