'use client'

import { getSellerIdByUsername } from '@/app/api/utils'
import t from '@/lib/translations'
import { useState, useEffect, useRef } from 'react'
import Hidden from './Hidden'

interface CompaniesInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	username: string
}

const CompaniesInput = ( { username, ...props }: CompaniesInputProps ) => {

	const [ companyId, setCompanyId ] = useState( 0 )
	const [ companyName, setCompanyName ] = useState( '' )
	const [ companies, setCompanies ] = useState<any[]>( [] )
	const [ isFocused, setIsFocused ] = useState( false )
	const dropdownRef = useRef<HTMLDivElement | null>( null )

	useEffect( () => {
		setIsFocused( true )
		const fetchData = async () => {
			if ( companyName.length > 2 ) {
				const sellerId = await getSellerIdByUsername( username )

				const filters = `filters[seller][$eq]=${ sellerId }&filters[displayName][$containsi]=${ companyName }`
				const response = await fetch( `/api/companies?${ filters }&populate=*&sort=displayName:asc` )
				const responseData = await response.json()
				const result = responseData.data

				setCompanies( result )
			} else {
				setCompanies( [] )
			}
		}

		fetchData()
	}, [ companyName, username ] )


	const handleBlur = () => {
		setTimeout( () => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains( document.activeElement )
			) {
				setIsFocused( false )
			}
		}, 200 )
	}

	const layoutClasses = "w-full px-4 py-1"
	const bgClasses = "bg-white bg-opacity-60 dark:bg-opacity-20 dark:focus:bg-opacity-10 focus:bg-opacity-100 placeholder-gray-500 dark:placeholder-gray-300"
	const appearenceClasses = "rounded-md focus:outline-none text-md shadow-lg"

	let alternate = true

	return (
		<div className="relative max-w-xs mx-3 justify-self-end flex items-center">
			<Hidden name="companyId" value={ `${ companyId }` } />
			<input
				type="text"
				value={ companyName }
				onChange={ ( e ) => setCompanyName( e.target.value ) }
				onFocus={ () => setIsFocused( true ) }
				onBlur={ handleBlur }
				placeholder={ t( "Search company" ) }
				className={ `${ layoutClasses } ${ bgClasses } ${ appearenceClasses }` }
				tabIndex={ 100 }
			/>
			{ companies?.length > 0 && isFocused && (
				<div
					ref={ dropdownRef }
					className="absolute top-10 left-0 right-0 z-10 mt-2 dark:bg-slate-950 bg-white bg-opacity-90 rounded-md shadow-lg max-h-60 overflow-y-auto"
				>
					{ companies.map( ( company, index ) => {
						alternate = !alternate
						return (
							<button
								type="button"
								key={ company.id }
								tabIndex={ 101 + index }
								className={ `group w-full ${ alternate ? "bg-sky-100 dark:bg-sky-950" : "bg-white dark:bg-sky-900" }` }
								onClick={ () => {
									setIsFocused( false )
									setCompanyId( company.id )
									setCompanyName( company.attributes.displayName )
								} }
							>
								<div
									className="group-hover:bg-violet-200 group-focus-visible:bg-violet-200 dark:group-hover:bg-slate-800 dark:group-focus-visible:bg-slate-800 dark:text-gray-400 dark:group-hover:text-white dark:group-focus-visible:text-white"
								>
									<div className="p-2">
										{ company.attributes.displayName }
									</div>
								</div>
							</button>
						)
					} ) }
				</div>
			) }
		</div>
	)
}

export default CompaniesInput
