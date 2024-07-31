import SearchCompany from "@/components/SearchCompany"
import Image from "next/image"
import ToggleShowMenu from "./ToggleShowMenu"
import GoBackButton from "./GoBackButton"

interface SidebarProps {
	username: string
}

export default function Header ( { username }: SidebarProps ) {
	return (
		<div className="w-full fixed flex items-center justify-between pl-20 bg-sky-500 dark:bg-sky-900 shadow-lg h-16">
			<div className="bg-black bg-opacity-20 absolute left-0 w-[65px] h-full flex items-center justify-center">
				<ToggleShowMenu />
				<div className="rounded-full p-1 shadow-lg bg-white hidden sm:block" >
					<Image
						src="/logotipo2.webp"
						alt="Logo Ribermax"
						width={ 40 }
						height={ 40 }
						className="rounded-full"
					/>
				</div>
			</div>
			<GoBackButton />
			<SearchCompany username={ username } route={ "companies" } />
		</div>
	)
}