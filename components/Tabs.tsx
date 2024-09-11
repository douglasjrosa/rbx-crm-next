import React, { useState, ReactNode } from 'react'

export const Tab = ( { title, children }: { title: string, children: ReactNode } ) => <>{ children }</>

export const Tabs = ( { children }: { children: ReactNode } ) => {
	const [ activeTab, setActiveTab ] = useState( 0 )

	const tabTitles = React.Children.map( children, ( child, index ) => {
		if ( React.isValidElement( child ) && child.props.title ) {
			return (
				<button
					key={ index }
					onClick={ () => setActiveTab( index ) }
					className={ `px-4 py-2 focus:outline-none ${ activeTab === index ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500' }` }
				>
					{ child.props.title }
				</button>
			)
		}
	} )

	return (
		<div>
			<div className="flex border-b mb-4">{ tabTitles }</div>
			<div>{ React.Children.toArray( children )[ activeTab ] }</div>
		</div>
	)
}