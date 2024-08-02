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
		<IsAuthenticated>
			<ThemeScript />
			<div className="flex flex-col bg-gradient-to-tl from-blue-200 to-sky-100 dark:from-black dark:to-blue-950">
				<Header username={ username } />
				<div className="relative flex flex-row w-full h-fit z-40" >
					<Sidebar username={ username } />
					<MainContent>{ children }</MainContent>
				</div>
			</div>
		</IsAuthenticated>
	)
}