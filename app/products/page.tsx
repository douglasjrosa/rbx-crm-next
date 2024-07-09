
const Products = () => {
	return (
		<div>
			<h1 className="text-3xl font-bold mb-6">Produtos</h1>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="bg-white p-6 rounded shadow">
					<h2 className="text-xl font-semibold mb-2">Produtos</h2>
					<p className="text-gray-600">Total: 25</p>
				</div>
			</div>
		</div>
	)
}
export default Products