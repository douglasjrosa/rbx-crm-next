import React, { useState, ReactNode } from 'react'

export const Tab = ( { children }: { title: string, children: ReactNode } ) => <>{ children }</>

export const Tabs = ( { children }: { children: ReactNode } ) => {

	const [ activeTab, setActiveTab ] = useState( 0 )

	const tabTitles = React.Children.map( children, ( child, index ) => {
		if ( React.isValidElement( child ) && child.props.title ) {
			return (
				<button
					key={ index }
					onClick={ () => setActiveTab( index ) }
					className={ `px-4 focus:outline-none pt-2 text-white text-nowrap shadow-lg w-fit rounded-t-lg bg-sky-500 dark:bg-sky-700 ${ activeTab === index ?
						'pb-3 font-black'
						: 'opacity-70 text-sm'
						}` }
				>
					{ child.props.title }
				</button>
			)
		}
	} )

	return (
		<div>
			<div className="flex gap-1 items-end scrollbar">{ tabTitles }</div>
			<div className='bg-sky-500 dark:bg-sky-700 rounded-b pt-3 pb-5 px-3 shadow-cover'>{ React.Children.toArray( children )[ activeTab ] }</div>
		</div>
	)
}