import t from "@/lib/translations"
import Card from "./Card"
import Select from "./form-components/Select"
import CurrencyInput from "./form-components/CurrencyInput"

export default function FreightSelectsCard ( {
	freightType,
	freightValue
}: {
	freightType: string
	freightValue: string
} ) {
	return (
		<Card className="flex flex-col gap-4 p-6 w-full">
			<Select
				label={ t( "Freight type" ) }
				name="freightType"
				defaultValue={ freightType }
				options={ [
					{ value: "FOB", text: "FOB" },
					{ value: "CIF", text: "CIF" }
				] }
			/>
			<CurrencyInput
				label={ t( "Freight value" ) }
				name="freightValue"
				currency="R$"
				defaultValue={ freightValue }
			/>
		</Card>
	)
}