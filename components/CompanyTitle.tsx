import { formatCnpj, truncateString } from "@/lib/utils"
import EditButton from "./EditButton"
import CompanyLogo from "./CompanyLogo"
import Card from "./Card"

export default function CompanyTitle ( {
	companyId,
	displayName,
	corporateReason,
	cnpj,
	edit,
	website,
	email,
	nfeEmail
}: {
	companyId: string
	displayName: string
	corporateReason?: string
	cnpj: string
	edit?: boolean
	website?: string
	email?: string
	nfeEmail?: string
} ) {
	return (
		<Card className="relative flex flex-row gap-6 items-center min-w-80 max-w-96">
			<div className="flex-initial w-[80px] h-[80px]">
				<CompanyLogo
					website={ website }
					email={ email }
					nfeEmail={ nfeEmail }
					displayName={ displayName }
					size={ 80 }
				/>
			</div>
			<div className="flex-1" >
				<h1>
					<span className="text-xl lg:text-3xl" >{ truncateString( displayName, 20 ) }</span>
					<span className="text-xs dark:opacity-60 ml-4" >{ `Id: ${ companyId }` }</span>
				</h1>
				<div className="text-xs dark:opacity-80" >{ corporateReason }</div>
				<div className="text-xs dark:opacity-80" >{ formatCnpj( cnpj ) }</div>
				{ edit && <EditButton href={ `${ companyId }/edit` } /> }
			</div>
		</Card>
	)
}