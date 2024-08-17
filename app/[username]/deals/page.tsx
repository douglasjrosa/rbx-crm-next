
import { getSellerIdByUsername } from "@/app/api/utils"
import CompanyLogo from "@/components/CompanyLogo"
import NewDealForm from "@/components/NewDealForm"
import { Deal, ResponseDeals } from "@/lib/strapi-types/Deal"
import { ResponseError } from "@/lib/strapi-types/Error"
import t from "@/lib/translations"
import { baseUrl, formatCurrency, truncateString } from "@/lib/utils"
import Link from "next/link"
import { AiFillFunnelPlot } from "react-icons/ai"
import { CiWarning } from "react-icons/ci"
import { FaMoneyBill1Wave } from "react-icons/fa6"
import { IoChatbubbleEllipsesSharp } from "react-icons/io5"
import { RxLapTimer } from "react-icons/rx"

interface DealsProps {
	params: {
		username: string
	}
}

const Deals = async ( { params }: DealsProps ) => {

	const { username } = params
	const sellerId = await getSellerIdByUsername( username )

	if ( !sellerId ) return (
		<div className="p-6 rounded bg-red-500 text-white w-fit shadow font-black flex gap-4 items-center">
			<span><CiWarning className="text-5xl text-black bg-yellow-500 rounded" /></span>
			<span> { t( "ERROR! Unable to locate seller ID." ) }</span>
		</div>
	)

	let filters = `filters[seller][$eq]=${ sellerId }`
	filters += "&filters[$or][0][stage][$eq]=Send proposal"
	filters += "&filters[$or][1][stage][$eq]=Follow up"
	filters += "&filters[$or][2][stage][$eq]=Negotiation"

	const fields = "fields[0]=stage"

	let populate = "populate[order][fields][0]=orderTotalValue"
	populate += "&populate[company][fields][0]=displayName"
	populate += "&populate[company][fields][1]=website"
	populate += "&populate[company][fields][2]=email"
	populate += "&populate[company][fields][3]=nfeEmail"

	const pagination = "pagination[pageSize]=100"

	const response = await fetch( `${ baseUrl }/api/deals?${ filters }&${ fields }&${ populate }&${ pagination }` )
	const responseData: ResponseDeals | ResponseError = await response.json()

	if ( !response.ok ) {
		console.error( { username, response, responseData } )
		throw new Error( "Error fetching Deals: " )
	}

	const deals = responseData.data

	let alternate = true

	return (
		<div className="mx-auto">
			<div className="w-full flex justify-between z-50">
				<h1 className="text-xl lg:text-3xl">{ t( "Deals" ) }</h1>
			</div>
			<div className="my-10 w-full" >
				<div className="flex flex-wrap">
					<div className="w-full lg:w-1/2 py-3 px-4">
						<ul className="bg-sky-800" >
							{ deals.map( ( deal: Deal ) => {
								const { id, attributes } = deal

								const {
									order,
									company,
									stage
								} = attributes

								if ( typeof company !== "object" || !company || !( "data" in company ) || !stage ) return null

								const {
									displayName,
									website,
									email,
									nfeEmail
								} = company.data.attributes

								const orderTotalValue = order && typeof order === "object" && ( "data" in order )
									? order.data?.attributes?.orderTotalValue
									: null

								alternate = !alternate

								return (
									<li key={ id } >
										<Link
											href={ `deals/${ id }` }
											className={ `w-full gap-4 flex justify-between items-center flex-wrap p-4 ${ alternate ? "bg-sky-100 dark:bg-sky-950" : "bg-white dark:bg-sky-900" }` }
										>
											<div className="flex-1 flex gap-4 items-center sm:flex-row-reverse" >
												<div className="flex-1" >
													{ truncateString( displayName, 25 ) }
												</div>
												<div className="flex-none" >
													<CompanyLogo
														website={ website }
														email={ email }
														nfeEmail={ nfeEmail }
														displayName={ displayName }
														size={ 50 }
													/>
												</div>
											</div>
											<div className="flex-none flex gap-4 items-center flex-wrap w-full sm:w-fit" >
												<div className="flex flex-col gap-2" >
													<div className="flex gap-2 dark:text-orange-500 items-center justify-end" >
														<span className="font-black text-sm" >{ t( stage ) }</span>
														<AiFillFunnelPlot className="text-2xl" />
													</div>
													{ orderTotalValue && (
														<div className="flex gap-2 text-green-700 dark:text-lime-400 items-center justify-end" >
															<span className="font-black text-sm" >{ formatCurrency( orderTotalValue, "R$" ) }</span>
															<FaMoneyBill1Wave className="text-2xl" />
														</div>
													) }
												</div>
												<div className="flex flex-col gap-2" >
													<div className="flex gap-2 text-red-500 dark:text-orange-500 items-center justify-end" >
														<span className="font-black text-sm" >3 dias em atraso</span>
														<IoChatbubbleEllipsesSharp className="text-2xl" />
													</div>
													<div className="flex gap-2 text-yellow-600 dark:text-yellow-300 items-center justify-end" >
														<span className="font-black text-sm" >Expira em 15 dias</span>
														<RxLapTimer className="text-2xl" />
													</div>
												</div>
											</div>
										</Link>
									</li>
								)
							} )
							}
							<li>

							</li>
							<li>

							</li>
							<li>

							</li>
						</ul>
					</div>
					<div className="w-full lg:w-1/2 p-3">
					</div>
				</div>
			</div>
			<NewDealForm username={ username } sellerId={ sellerId } />
		</div >
	)
}
export default Deals