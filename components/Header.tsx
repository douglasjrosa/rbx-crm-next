"use client"
import SearchCompany from "@/components/SearchCompany"
import Image from "next/image"
import ToggleShowMenu from "./ToggleShowMenu"
import GoBackButton from "./GoBackButton"
import { useEffect, useState } from "react"

interface SidebarProps {
	username: string
}

export default function Header ( { username }: SidebarProps ) {

	const [ scale, setScale ] = useState( 1 )

	const applyZoom = () => {
		const { innerWidth, outerWidth } = window
		if ( outerWidth !== innerWidth ) {
			const scale = innerWidth / outerWidth
			setScale( scale )
		}
	}

	useEffect( () => {
		const { devicePixelRatio } = window
		setScale( 1 / devicePixelRatio )

		window.addEventListener( 'resize', applyZoom )
		window.addEventListener( 'DOMContentLoaded', applyZoom )
	}, [] )

	return (
		<div
			className={ `relative w-full z-50` }
			style={ { height: `${ 64 * scale }px` } }
		>
			<div
				className={ `w-full fixed flex flex-row items-center bg-sky-500 dark:bg-sky-900 shadow-lg` }
				style={ { height: `${ 64 * scale }px` } }
			>
				<div
					className={ `bg-black bg-opacity-20 h-full flex items-center justify-center` }
					style={ { width: `${ Math.floor( 65 * scale ) }px` } }
				>
					<ToggleShowMenu scale={ scale } />
					<div
						className="rounded-full shadow-lg bg-white hidden sm:block h-fit"
						style={ { width: `${ 40 * scale }px`, height: `${ 40 * scale }px`, padding: `${ 3 * scale }px` } }
					>
						<Image
							src="/logotipo2.webp"
							alt="Logo Ribermax"
							width={ 40 * scale }
							height={ 40 * scale }
							className="rounded-full"
						/>
					</div>
				</div>
				<div className="flex flex-row justify-between w-full">
					<GoBackButton scale={ scale } />
					<SearchCompany username={ username } route={ "companies" } scale={ scale } />
				</div>
			</div>
		</div>
	)
}