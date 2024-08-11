
import { getSellerIdByUsername } from "@/app/api/utils"
import CompanyLogo from "@/components/CompanyLogo"
import NewCompanyForm from "@/components/NewCompanyForm"
import { CompanyAttributes } from "@/lib/strapi-types/company"
import t from "@/lib/translations"
import { baseUrl, truncateString } from "@/lib/utils"
import Link from "next/link"
import { FaMoneyBill1Wave } from "react-icons/fa6"
import { IoChatbubbleEllipsesSharp } from "react-icons/io5"
import { RxLapTimer } from "react-icons/rx"

interface CompaniesProps {
	params: {
		username: string
	}
}

const Companies = async ( { params }: CompaniesProps ) => {

	const { username } = params
	const sellerId = await getSellerIdByUsername( username )

	const filters = `?filters[seller][$eq]=${ sellerId }`
	const response = await fetch( `${ baseUrl }/api/companies${ filters }&pagination[pageSize]=100&populate=*&sort=displayName:asc` )
	const responseData = await response.json()

	if ( !response.ok ) {
		console.error( { username, response, responseData } )
		throw new Error( "Error fetching companies: " )
	}

	const companies: { id: number, attributes: CompanyAttributes }[] = responseData.data
	const { pagination } = responseData.meta

	let alternate = true

	return (
		<div className="mx-auto">
			<div className="w-full flex justify-between z-50">
				<h1 className="text-xl lg:text-3xl">{ t( "Companies" ) }</h1>
			</div>
			<div className="my-10 w-full" >
				<div className="flex flex-wrap">
					<div className="w-full lg:w-1/2 py-3 px-4">
						<ul className="bg-sky-800" >
							{ companies.map( company => {
								const { id, attributes } = company
								const { displayName, website, nfeEmail, email } = attributes

								alternate = !alternate

								return (
									<li key={ id } >
										<Link
											href={ `companies/${ id }` }
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
												<div className="flex gap-2 text-green-700 dark:text-lime-400 items-center" >
													<FaMoneyBill1Wave className="text-2xl" />
													<span className="font-black text-sm" >155.000,00</span>
												</div>
												<div className="flex flex-col gap-2" >
													<div className="flex gap-2 text-red-500 dark:text-orange-500 items-center" >
														<IoChatbubbleEllipsesSharp className="text-2xl" />
														<span className="font-black text-sm" >3 dias em atraso</span>
													</div>
													<div className="flex gap-2 text-yellow-600 dark:text-yellow-300 items-center" >
														<RxLapTimer className="text-2xl" />
														<span className="font-black text-sm" >Expira em 15 dias</span>
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
			<NewCompanyForm username={ username } sellerId={ sellerId } />
		</div>
	)
}
export default Companies