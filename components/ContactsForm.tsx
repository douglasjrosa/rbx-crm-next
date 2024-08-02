import t from "@/lib/translations"
import FormGroup from "./form-components/FormGroup"
import Select from "./form-components/Select"
import TextBox from "./form-components/TextBox"
import SaveButton from "./form-components/SaveButton"
import EmailBox from "./form-components/EmailBox"
import { baseUrl, capitalize, formatNumber, formatPhone } from "@/lib/utils"
import { ContactAttributes } from "@/lib/strapi-types/contact"
import { revalidateTag } from "next/cache"
import Card from "./Card"
import BreakRow from "./form-components/BreakRow"
import { getContacts } from "@/app/api/utils"
import LocableContainer from "./LockableContainer"
import { IoLogoWhatsapp } from "react-icons/io"
import Link from "next/link"
import ContactCard from "./ContactCard"

export default async function ContactsForm ( { companyId }: { companyId: string } ) {

	async function handleAddContact ( formData: FormData ) {
		"use server"

		const data: ContactAttributes = {
			name: formData.get( "newContactName" ) as string,
			phone: String( formatNumber( formData.get( "newContactPhone" ) as string ) ),
			email: formData.get( "newContactEmail" ) as string,
			decisionRole: formData.get( "newContactDecisionRole" ) as string,
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

	const contacts = await getContacts( companyId )

	return (
		<>
			<LocableContainer>
				<form action={ handleAddContact } >
					<FormGroup title={ t( "New Contact" ) } >
						<div
							className="w-4/5 sm:w-1/2 lg:w-full mx-auto"
						>
							<TextBox
								label={ t( "Name" ) }
								id="newContactName"
								className="w-full"
							/>
						</div>
						<div
							className="w-4/5 sm:w-1/2 lg:w-full mx-auto"
						>
							<TextBox
								label={ t( "Phone" ) }
								id="newContactPhone"
								className="w-full"
							/>
						</div>
						<div
							className="w-4/5 sm:w-1/2 lg:w-full mx-auto"
						>
							<EmailBox
								label={ t( "E-mail" ) }
								id="newContactEmail"
								className="w-full"
							/>
						</div>
						<div
							className="w-4/5 sm:w-1/2 lg:w-full mx-auto"
						>
							<Select
								label={ t( "Power to close a deal" ) }
								id="newContactDecisionRole"
								options={ [
									{ value: "", text: t( "I don't know" ) },
									{ value: "none", text: t( "None" ) },
									{ value: "influence", text: t( "Influence" ) },
									{ value: "decision", text: t( "Decision" ) },
								] }
								className="w-full"
							/>
						</div>
						<div
							className="p-3 w-full mx-auto my-auto flex justify-center my-3"
						>
							<SaveButton>{ t( "Add" ) }</SaveButton>
						</div>
					</FormGroup>
				</form>
			</LocableContainer>

			{ contacts.length > 0 && (
				<>
					{ contacts.map( contact => {


						const {
							name,
							phone,
							email,
							decisionRole,
							isActive
						} = contact.attributes

						if ( isActive ) {
							return (
								<div key={ `contact-${ contact.id }` } className="mt-10" >
									<LocableContainer>
										<form>
											<FormGroup title={ name } className="pt-8 pb-6 px-4" >
												<input
													type="text"
													name="phone"
													placeholder={ t( "Phone" ) }
													defaultValue={ formatPhone( phone ) }
													className="px-4 py-1 w-full my-1 rounded dark:bg-violet-400 dark:bg-opacity-10 shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-right"
												/>
												<input
													type="text"
													name="email"
													placeholder={ t( "E-mail" ) }
													defaultValue={ email }
													className="px-4 py-1 w-full my-1 rounded dark:bg-violet-400 dark:bg-opacity-10 shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-right"
												/>
												<select
													name="decisionRole"
													defaultValue={ decisionRole }
													className="px-4 py-1 w-full my-1 rounded dark:bg-violet-400 dark:bg-opacity-10 shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-right"
												>
													<option className="dark:bg-sky-900" value=""> { t( "I don't know" ) }</option>
													<option className="dark:bg-sky-900" value="none"> { t( "None" ) }</option>
													<option className="dark:bg-sky-900" value="influence"> { t( "Influence" ) }</option>
													<option className="dark:bg-sky-900" value="decision"> { t( "Decision" ) }</option>
												</select>
											</FormGroup>
										</form>
									</LocableContainer>
								</div>
							)
						}
					} ) }
					<BreakRow size="xl" />
				</>
			) }

		</>
	)
}