import Header from "@/components/Header"
import { IsAuthenticated } from "@/components/IsAuthenticated"
import MainContent from "@/components/MainContent"
import Sidebar from "@/components/Sidebar"
import ThemeScript from "@/components/ThemeScript"

interface DashboardPageProps {
	children: React.ReactNode
	params: { username: string }
}

export default function Layout ( { children, params }: DashboardPageProps ) {
	const { username } = params
	return (
		<>
			<ThemeScript />
			<IsAuthenticated />
			<div className="flex flex-col ">
				<div className="relative w-full h-16 z-50" >
					<Header username={ username } />
				</div>
				<div className="relative flex w-full z-40" >
					<div className="w-[65px] hidden sm:block show-menu:block absolute sm:relative z-39">
						<Sidebar username={ username } />
					</div>
					<div className="w-full sm:max-w-[calc(100%-65px)] z-38 w-100vw" >
						<MainContent>
							{ children }
						</MainContent>
					</div>
				</div>
			</div>
		</>
	)
}