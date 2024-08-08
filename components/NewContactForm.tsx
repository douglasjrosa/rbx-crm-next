import t from "@/lib/translations"
import Div from "./Div"
import BreakRow from "./form-components/BreakRow"
import FormGroup from "./form-components/FormGroup"
import Input from "./form-components/Input"
import Select from "./form-components/Select"
import SaveButton from "./form-components/SaveButton"
import { ContactAttributes } from "@/lib/strapi-types/contact"
import { baseUrl, formatNumber } from "@/lib/utils"
import { revalidateTag } from "next/cache"

export default async function NewContactForm ( { companyId }: { companyId: string } ) {

	async function handleAddContact ( formData: FormData ): Promise<void> {
		"use server"

		const data: ContactAttributes = {
			name: formData.get( "name" ) as string,
			phone: String( formatNumber( formData.get( "phone" ) as string ) ),
			email: formData.get( "email" ) as string,
			decisionRole: formData.get( "decisionRole" ) as string,
			companyId: companyId
		}

		const response = await fetch( `${ baseUrl }/api/contacts`, {
			method: "POST",
			body: JSON.stringify( { data } )
		} )

		const responseData = await response.json()
		if ( !response.ok ) console.error( { responseData } )

		revalidateTag( `get-contacts-${ companyId }` )
	}

	return (
		<Div className="max-w-xs" >
			<form action={ handleAddContact } >
				<FormGroup title={ t( "New Contact" ) } className="pt-8 pb-6 px-4" >
					<Div className="w-full" >
						<Input
							type="text"
							label={ t( "Name" ) }
							name="name"
							className="w-full"
							required
						/>
					</Div>
					<BreakRow size="sm" />
					<Div className="w-full" >
						<Input
							type="text"
							label={ t( "Phone" ) }
							name="phone"
							className="w-full"
							required
						/>

					</Div>
					<BreakRow size="sm" />
					<Div className="w-full" >
						<Input
							type="email"
							label={ t( "E-mail" ) }
							name="email"
							className="w-full"
						/>
					</Div>
					<BreakRow size="sm" />
					<Div className="w-full" >
						<Select
							label={ t( "Power to close a deal" ) }
							name="decisionRole"
							options={ [
								{ value: "", text: t( "I don't know" ) },
								{ value: "none", text: t( "None" ) },
								{ value: "influence", text: t( "Influence" ) },
								{ value: "decision", text: t( "Decision" ) },
							] }
							className="w-full"
						/>
					</Div>
					<BreakRow size="md" />
					<Div className="w-full flex justify-end" >
						<SaveButton size="sm" lockable={ false } >{ t( "Add" ) }</SaveButton>
					</Div>
				</FormGroup>
			</form>
		</Div>
	)
}