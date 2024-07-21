import { truncateString } from "@/lib/utils"
import EditButton from "./EditButton"

export default function CompanyTitle ( { companyId, displayName, oficialName, edit }: {
	companyId: string
	displayName: string
	oficialName: string
	edit?: boolean
} ) {
	return (
		<div className="relative" >
			<h1>
				<span className="text-xl lg:text-3xl" >{ truncateString( displayName, 20 ) }</span>
				<span className="text-xs dark:opacity-60" >   { `Id: ${ companyId }` }</span>
			</h1>
			<div className="text-xs dark:opacity-80" >{ oficialName }</div>
			{ edit && <EditButton href={ `${ companyId }/edit` } /> }
		</div>
	)
}