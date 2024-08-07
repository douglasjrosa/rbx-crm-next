import { getCompanyAttributes } from "@/app/api/utils"
import CompanyTitle from "@/components/CompanyTitle"
import ContactsForm from "@/components/ContactsForm"
import ToggleLockedButton from "@/components/ToggleLockedButton"


interface PageProps {
	children: React.ReactNode
	params: {
		companyId: string
		username: string
	}
}

export default async function Layout ( { children, params }: PageProps ) {

	const { companyId } = params
	const companyAttributes = await getCompanyAttributes( companyId )
	if ( !companyAttributes ) throw new Error( "Error fetching company data by Id." )

	const {
		displayName,
		corporateReason,
		cnpj
	} = companyAttributes

	return (
		<div className="mx-auto">
			<div className="">
				<CompanyTitle
					companyId={ companyId }
					displayName={ displayName }
					corporateReason={ corporateReason }
					cnpj={ cnpj }
				/>
			</div>
			<div className=" my-10 relative w-full" >
				<div className="flex flex-wrap">
					<div className="w-full lg:w-1/4 p-3">
						<ContactsForm companyId={ companyId } />
					</div>
					<div className="w-full lg:w-3/4 p-3">
						{ children }
					</div>
				</div>
			</div>
			<ToggleLockedButton />
		</div>
	)
}

