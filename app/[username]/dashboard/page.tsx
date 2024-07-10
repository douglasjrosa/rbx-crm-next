import Card from "@/components/Card"
import t from "@/lib/translations"

const Dashboard = () => {
	return (
		<div>
			<h1 className="text-3xl font-bold mb-6">{ t( 'Dashboard' ) }</h1>
			<div className="flex">
				<Card>
					<h2 className="text-xl font-semibold mb-2">Negócios</h2>
					<p className="">Total: 25</p>
				</Card>
			</div>
		</div>
	)
}
export default Dashboard