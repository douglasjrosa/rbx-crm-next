import { getAllPaymentMethodsSelectOptions, getDealById } from "@/app/api/utils"
import Card from "@/components/Card"
import CompanyTitle from "@/components/CompanyTitle"
import DealStage from "@/components/DealStage"
import Div from "@/components/Div"
import DateInput from "@/components/form-components/DateInput"
import Input from "@/components/form-components/Input"
import Textarea from "@/components/form-components/Textarea"
import FreightSelectsCard from "@/components/FreightSelectsCard"
import IssuerAndPaymentMethodSelectsCard from "@/components/IssuerAndPaymentMethodSelectsCard"
import ToggleLockedButton from "@/components/ToggleLockedButton"
import t from "@/lib/translations"
import { daysToDate, formatCurrency, formatDateToBR, formatFutureDate } from "@/lib/utils"


interface PageProps {
	params: {
		dealId: string
		username: string
	}
}

export default async function Page ( { params }: PageProps ) {

	const { dealId } = params
	const deal = await getDealById( dealId )

	if ( !deal ) throw new Error( "Error fetching deal data by Id." )

	const {
		reasonForLoss,
		interactions,
		order,
		company,
		seller,
		isActive,
		stage,
		followUpAt,
		negotiationAt,
		startedAt,
		expiresAt,
		finishedAt,
		migrationId,
		createdAt,
		updatedAt,
		createdBy,
		updatedBy
	} = deal.attributes

	if ( typeof company !== 'object' || !( 'data' in company ) ) {
		console.error( { deal } )
		throw new Error( "Fail to identify the company related to the deal." )
	}

	const companyId = company.data.id
	const {
		displayName,
		corporateReason,
		cnpj,
		website,
		email,
		nfeEmail
	} = company.data.attributes

	const orderData = ( typeof order === 'object' && ( 'data' in order ) ) ? order.data : null
	const {
		deliverForecast,
		freightType,
		freightValue,
		orderDiscount,
		extraCosts,
		orderSubtotalValue,
		orderTotalValue,
		clientOrderCode,
		observations,
		issuer,
		payment_method,
		items
	} = orderData?.attributes

	if ( typeof issuer !== 'object' || !( 'data' in issuer ) ) {
		console.error( { deal } )
		throw new Error( "Fail to identify the issuer related to the deal." )
	}

	const issuerId = String( issuer.data.attributes.company.data.id )

	const daysToExpiring = daysToDate( expiresAt ?? formatFutureDate() )

	const allPaymentMethods = await getAllPaymentMethodsSelectOptions()

	return (
		<div className="mx-auto">
			<div className="flex justify-between flex-wrap gap-4 items-center w-full">
				<div className="flex-1 sm:w-fit">
					<CompanyTitle
						companyId={ companyId }
						displayName={ displayName }
						corporateReason={ corporateReason }
						cnpj={ cnpj }
						website={ website }
						email={ email }
						nfeEmail={ nfeEmail }
					/>
				</div>
				<div className="flex-none sm:w-fit flex gap-5 flex-wrap max-w-full" >
					<Div className="flex-none w-48">
						<Card className="flex flex-col justify-between text-right">
							<p className="text-sm">{ `${ t( "Deal" ) }: ${ deal.id } ` }</p>
							{ orderTotalValue &&
								<div className="text-success text-xl font-black">
									{ formatCurrency( orderTotalValue, "R$" ) }
								</div>
							}
							<div className="text-xs">{ `${ t( "Expires at" ) } ${ formatDateToBR( expiresAt ?? formatFutureDate() ) }` }</div>
						</Card>
					</Div>
					<Div className="flex-none min-w-48 max-w-64">
						<Card className="min-h-full text-right">
							<DealStage stage={ stage } reasonForLoss={ reasonForLoss } />
						</Card>
					</Div>
				</div>
			</div>
			<div className="flex flex-wrap my-10 w-full" >
				<div className="p-2 flex-none w-full sm:w-64">
					<IssuerAndPaymentMethodSelectsCard
						defaultIssuerId={ issuerId }
						defaultPaymentMethodId={ payment_method }
						allPaymentMethods={ allPaymentMethods }
					/>
				</div>
				<div className="p-2 flex-none w-full sm:w-64">
					<FreightSelectsCard
						freightType={ freightType }
						freightValue={ freightValue }
					/>
				</div>
				<div className="p-2 flex-none w-full sm:w-64">
					<Card className="flex flex-col gap-4 p-6 w-full">
						<DateInput
							label={ t( "Deliver forecast" ) }
							name="deliverForecast"
							defaultValue={ deliverForecast }
						/>
						<Input
							type="text"
							name="clientOrderCode"
							label={ t( "Client order code" ) }
							defaultValue={ clientOrderCode }
						/>
					</Card>
				</div>
				<div className="p-2 flex-1">
					<Card className="flex flex-col gap-4 p-6 w-full min-w-64 h-full">
						<Textarea
							name="observations"
							label={ t( "Observations" ) }
							className="p-3"
							rows={ 3 }
						>
							{ observations }
						</Textarea>
					</Card>
				</div>
			</div>
			<ToggleLockedButton />
		</div>
	)
}

