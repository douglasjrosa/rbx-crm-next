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
			<div className="fixed top-14 right-0 bottom-0 left-0 sm:left-14 overflow-auto scrollbar" >
				<MainContent>{ children }</MainContent>
			</div>
			<div className="fixed top-14 bottom-0 w-14 hidden sm:block show-menu:block bg-sky-500 dark:bg-sky-950 text-gray-900 dark:text-white" >
				<Sidebar username={ username } />
			</div>
			<div className="fixed top-0 left-0 right-0 h-14 bg-sky-500 dark:bg-sky-900 shadow-lg">
				<Header username={ username } />
			</div>
		</IsAuthenticated>
	)
}