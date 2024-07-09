import { IsAuthenticated } from "@/components/IsAuthenticated"
import MainContent from "@/components/MainContent"
import Sidebar from "@/components/Sidebar"
import ThemeScript from "@/components/ThemeScript"

export default function ( { children }: { children: React.ReactNode } ) {
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