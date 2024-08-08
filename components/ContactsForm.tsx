import t from "@/lib/translations"
import Select from "./form-components/Select"
import Input from "./form-components/Input"
import SaveButton from "./form-components/SaveButton"
import { baseUrl, formatNumber, formatPhone, refreshKey } from "@/lib/utils"
import { ContactAttributes } from "@/lib/strapi-types/contact"
import { revalidateTag } from "next/cache"
import BreakRow from "./form-components/BreakRow"
import { getContacts } from "@/app/api/utils"
import LocableContainer from "./LockableContainer"
import SwitchButton from "./form-components/SwitchButton"
import Hidden from "./form-components/Hidden"
import Div from "./Div"
import NewContactForm from "./NewContactForm"
import Card from "./Card"

export default async function ContactsForm ( { companyId }: { companyId: string } ) {

	const handleUpdateContact = async ( formData: FormData ): Promise<void> => {
		"use server"

		const id = formData.get( "id" ) as string

		const data: ContactAttributes = {
			name: formData.get( "name" ) as string,
			phone: String( formatNumber( formData.get( "phone" ) as string ) ),
			email: formData.get( "email" ) as string,
			decisionRole: formData.get( "decisionRole" ) as string,
			companyId: companyId,
			isActive: !!formData.get( "isActive" )
		}
		const response = await fetch( `${ baseUrl }/api/contacts/${ id }`, {
			method: "PUT",
			body: JSON.stringify( { data } )
		} )

		const responseData = await response.json()
		if ( !response.ok ) console.error( { responseData } )

		revalidateTag( `get-contacts-${ companyId }` )
	}

	const filters = { isActive: true }
	const contacts = await getContacts( companyId, filters )

	return (
		<div className="flex flex-wrap justify-center">

			{ contacts.length > 0 && (
				<div className="w-full flex flex-wrap justify-center">
					{ contacts.map( ( contact, index ) => {

						const {
							name,
							phone,
							email,
							decisionRole,
							isActive
						} = contact.attributes


						const options = [
							{ value: "", text: t( "I don't know" ) },
							{ value: "none", text: t( "None" ) },
							{ value: "influence", text: t( "Influence" ) },
							{ value: "decision", text: t( "Decision" ) }
						]

						return (
							<div key={ `contact-${ index }` } className="w-full max-w-xs p-3 lg:p-0" >
								<LocableContainer>
									<form action={ handleUpdateContact } >
										<Hidden name="id" value={ contact.id } />
										<Card className="" >
											<Div className="w-full" readonly={ true } >
												<Input
													type="text"
													name="name"
													placeholder={ t( "Name" ) }
													defaultValue={ name }
												/>
											</Div>
											<Div className="w-full" readonly={ true } >
												<Input
													type="text"
													name="phone"
													placeholder={ t( "Phone" ) }
													defaultValue={ formatPhone( phone ) }
												/>
											</Div>
											<Div className="w-full" readonly={ true } >
												<Input
													type="email"
													name="email"
													placeholder={ t( "E-mail" ) }
													defaultValue={ email }
												/>
											</Div>
											<Div className="w-full" readonly={ true } >
												<Select
													name="decisionRole"
													defaultValue={ decisionRole }
													options={ options }
												/>
											</Div>
											<BreakRow size="sm" />
											<Div className="flex" >
												<SwitchButton
													name="isActive"
													label={ t( "Active" ) }
													checked={ !!isActive }
													size="sm"
												/>
												<SaveButton size="sm" >{ t( "Save" ) }</SaveButton>
											</Div>
										</Card>
									</form>
								</LocableContainer>
								<BreakRow size="md" />
							</div>
						)
					} ) }
				</div>
			) }

			<Div>
				<NewContactForm companyId={ companyId } />
			</Div>

			<BreakRow size="lg" />
		</div>
	)
}