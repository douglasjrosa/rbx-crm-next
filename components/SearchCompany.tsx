'use client'

import { ApiCompanyCompany } from '@/lib/strapi-types/contentTypes'
import t from '@/lib/translations'
import { getSellerIdByUsername } from '@/lib/utils'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

interface CompanyProps extends ApiCompanyCompany {
	id: string | number
}

interface SearchCompanyProps {
	username: string
	route: string
}

const SearchCompany: React.FC<SearchCompanyProps> = ( { username, route } ) => {
	const [ query, setQuery ] = useState( '' )
	const [ companies, setCompanies ] = useState<CompanyProps[]>( [] )
	const [ isFocused, setIsFocused ] = useState( false )
	const dropdownRef = useRef<HTMLDivElement | null>( null )

	useEffect( () => {
		setIsFocused( true )
		const fetchData = async () => {
			if ( query.length > 2 ) {
				const sellerId = await getSellerIdByUsername( username )

				const filters = `filters[seller][$eq]=${ sellerId }&filters[companyData][displayName][$containsi]=${ query }`
				const response = await fetch( `/api/companies?${ filters }&populate=*&sort=companyData.displayName:asc` )
				const responseData = await response.json()
				const result = responseData.data as CompanyProps[]

				setCompanies( result )
			} else {
				setCompanies( [] )
			}
		}

		fetchData()
	}, [ query ] )

	const handleChange = ( e: any ) => {
		setQuery( e.target.value )
	}

	const handleFocus = () => {
		setIsFocused( true )
	}

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

	return (
		<div className="relative max-w-xs mx-3">
			<input
				type="text"
				value={ query }
				onChange={ handleChange }
				onFocus={ handleFocus }
				onBlur={ handleBlur }
				placeholder={ t( "Search company" ) }
				className="w-full p-2 rounded-md focus:outline-none bg-white bg-opacity-60 dark:bg-opacity-20 dark:focus:bg-opacity-10 text-sm sm:text-lg focus:bg-opacity-100 placeholder-gray-500 dark:placeholder-gray-300"
				tabIndex={ 100 }
			/>
			<svg className="pointer-events-none absolute right-4 top-2 h-6 w-6 fill-sky-700 dark:fill-white" xmlns="http://www.w3.org/2000/svg">
				<path d="M20.47 21.53a.75.75 0 1 0 1.06-1.06l-1.06 1.06Zm-9.97-4.28a6.75 6.75 0 0 1-6.75-6.75h-1.5a8.25 8.25 0 0 0 8.25 8.25v-1.5ZM3.75 10.5a6.75 6.75 0 0 1 6.75-6.75v-1.5a8.25 8.25 0 0 0-8.25 8.25h1.5Zm6.75-6.75a6.75 6.75 0 0 1 6.75 6.75h1.5a8.25 8.25 0 0 0-8.25-8.25v1.5Zm11.03 16.72-5.196-5.197-1.061 1.06 5.197 5.197 1.06-1.06Zm-4.28-9.97c0 1.864-.755 3.55-1.977 4.773l1.06 1.06A8.226 8.226 0 0 0 18.75 10.5h-1.5Zm-1.977 4.773A6.727 6.727 0 0 1 10.5 17.25v1.5a8.226 8.226 0 0 0 5.834-2.416l-1.061-1.061Z"></path>
			</svg>
			{ companies?.length > 0 && isFocused && (
				<div
					ref={ dropdownRef }
					className="absolute left-0 right-0 z-10 mt-2 dark:bg-slate-950 bg-white bg-opacity-90 rounded-md shadow-lg max-h-60 overflow-y-auto"
				>
					{ companies.map( ( company, index ) => {
						return (
							<Link
								key={ company.id }
								href={ `/${ username }/${ route }/${ company.id }` }
								onFocus={ handleFocus }
								onBlur={ handleBlur }
								tabIndex={ 101 + index }
								className="group"
								onClick={ () => setIsFocused( false ) }
							>
								<div
									className="group-hover:bg-violet-200 group-focus-visible:bg-violet-200 dark:group-hover:bg-slate-800 dark:group-focus-visible:bg-slate-800 dark:text-gray-400 dark:group-hover:text-white dark:group-focus-visible:text-white"
								>
									<div className="p-2">
										{ company.attributes.companyData.displayName }
									</div>
								</div>
							</Link>
						)
					} ) }
				</div>
			) }
		</div>
	)
}

export default SearchCompany
