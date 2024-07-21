

interface DashboardPageProps {
	children: React.ReactNode
}

export default function ( { children }: DashboardPageProps ) {

	return (
		<div className="bg-porto1 w-screen h-screen">
			{ children }
		</div>
	)
}