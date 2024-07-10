import t from "@/lib/translations"

const Dashboard = () => {
	return (
		<div>
			<h1 className="text-3xl font-bold mb-6">{ t( 'Dashboard' ) }</h1>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="bg-sky-950 p-6 rounded shadow-lg">
					<h2 className="text-xl font-semibold mb-2">Negócios</h2>
					<p className="">Total: 25</p>
				</div>
				<div className="bg-sky-950 p-6 rounded shadow">
					<h2 className="text-xl font-semibold mb-2">Empresas</h2>
					<p className="">Total: 50</p>
				</div>
				<div className="bg-sky-950 p-6 rounded shadow">
					<h2 className="text-xl font-semibold mb-2">Produtos</h2>
					<p className="">Total: 100</p>
				</div>
			</div>
		</div>
	)
}
export default Dashboard