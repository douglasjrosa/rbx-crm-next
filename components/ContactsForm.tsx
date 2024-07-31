import t from "@/lib/translations"
import FormGroup from "./form-components/FormGroup"
import Select from "./form-components/Select"
import TextBox from "./form-components/TextBox"
import SaveButton from "./form-components/SaveButton"
import EmailBox from "./form-components/EmailBox"

export default function ContactsForm () {
	return (
		<form>
			<FormGroup title={ t( "Contacts" ) } >
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
	)
}