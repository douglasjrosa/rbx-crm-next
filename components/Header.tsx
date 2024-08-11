import SearchCompany from "@/components/SearchCompany"
import Image from "next/image"
import ToggleShowMenu from "./ToggleShowMenu"
import GoBackButton from "./GoBackButton"

interface SidebarProps {
	username: string
}

export default function Header ( { username }: SidebarProps ) {
	return (
		<div className={ `flex flex-row items-center h-full` } >
			<div className={ `bg-black bg-opacity-20 flex items-center justify-center h-full flex-none w-14` } >
				<ToggleShowMenu />
				<div className="rounded-full shadow-lg bg-white hidden sm:block h-fit w-[40px] p-[3px]" >
					<Image
						src="/logotipo2.webp"
						alt="Logo Ribermax"
						width={ 40 }
						height={ 40 }
						className="rounded-full"
					/>
				</div>
			</div>
			<div className="flex-1 flex flex-row justify-end sm:justify-between">
				<GoBackButton />
				<SearchCompany username={ username } route={ "companies" } />
			</div>
		</div>
	)
}