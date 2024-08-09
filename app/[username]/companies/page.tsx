
import { getSellerIdByUsername } from "@/app/api/utils"
import CompanyLogo from "@/components/CompanyLogo"
import NewCompanyForm from "@/components/NewCompanyForm"
import { CompanyAttributes } from "@/lib/strapi-types/company"
import t from "@/lib/translations"
import { baseUrl } from "@/lib/utils"
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

	let alternate = false

	return (
		<div className="mx-auto">
			<div className="w-full flex justify-between">
				<h1 className="text-2xl">{ t( "Companies" ) }</h1>
				<NewCompanyForm username={ username } sellerId={ sellerId } />
			</div>
			<div className=" my-10 relative w-full" >
				<div className="flex flex-wrap">
					<div className="w-full lg:w-3/4 py-3 px-4">
						<ul className="bg-sky-800" >
							<li className="w-full px-8 py-2 flex justify-between text-white text-sm" >
								<div className="flex-1" >Empresa:</div>
								<div className="flex-1" >Negócio:</div>
								<div className="flex-1" >Interação:</div>
								<div className="flex-1" >Expira em:</div>
							</li>
							{ companies.map( company => {
								const { id, attributes } = company
								const { displayName, website } = attributes
								
								alternate = !alternate

								return (
									<li
										key={ id }
										>
										<Link
											href={ `companies/${ id }` }
											className={ `w-full gap-4 flex justify-between items-center py-2 px-4 ${ alternate ? "bg-sky-100 dark:bg-sky-950" : "bg-white dark:bg-sky-900" }` }
										>
										<div className="flex" >
											<CompanyLogo website={ website } displayName={ displayName } size={ 40 } />
										</div>
										<div className="flex-1" >
											{ displayName }
										</div>
										<div className="flex gap-8 items-center" >
											<div className="flex gap-2 text-red-500 items-center" >
												<IoChatbubbleEllipsesSharp />
												<span className="text-xs" >3 dias em atraso</span>
											</div>
											<div className="flex gap-2 text-green-700 items-center" >
												<FaMoneyBill1Wave />
												<span className="text-xs" >R$ 5.000,00</span>
											</div>
											<div className="flex gap-2 text-yellow-600 items-center" >
												<RxLapTimer />
												<span className="text-xs" >15 dias</span>
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
					<div className="w-full lg:w-1/4 p-3">
					</div>
				</div>
			</div>
		</div>
	)
}
export default Companies