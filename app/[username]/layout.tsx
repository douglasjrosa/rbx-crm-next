import { IsAuthenticated } from "@/components/IsAuthenticated"
import MainContent from "@/components/MainContent"
import Sidebar from "@/components/Sidebar"
import ThemeScript from "@/components/ThemeScript"

interface DashboardPageProps {
	children: React.ReactNode
}

export default function ( { children }: DashboardPageProps ) {

	return (
		<>
			<IsAuthenticated />
			<ThemeScript />
			<div className="flex">
				<Sidebar />
				<MainContent>
					{ children }
				</MainContent>
			</div>
		</>
	)
}