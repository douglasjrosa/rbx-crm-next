import SearchCompany from "@/components/SearchCompany"
import Image from "next/image"
import ToggleShowMenu from "./ToggleShowMenu"
import GoBackButton from "./GoBackButton"

interface SidebarProps {
	username: string
}

export default function Header ( { username }: SidebarProps ) {
	return (
		<div
			className={ `relative w-full z-50` }
			style={ { height: "64px" } }
		>
			<div
				className={ `w-full fixed flex flex-row items-center bg-sky-500 dark:bg-sky-900 shadow-lg` }
				style={ { height: "64px" } }
			>
				<div
					className={ `bg-black bg-opacity-20 h-full flex items-center justify-center` }
					style={ { width: "64px" } }
				>
					<ToggleShowMenu />
					<div
						className="rounded-full shadow-lg bg-white hidden sm:block h-fit"
						style={ { width: "40px", height: "40px", padding: "3px" } }
					>
						<Image
							src="/logotipo2.webp"
							alt="Logo Ribermax"
							width={ 40 }
							height={ 40 }
							className="rounded-full"
						/>
					</div>
				</div>
				<div className="flex flex-row justify-between w-full">
					<GoBackButton />
					<SearchCompany username={ username } route={ "companies" } />
				</div>
			</div>
		</div>
	)
}