import PlywoodFrame from "@/components/svg-components/PlywoodFrame"
import t from "@/lib/translations"

const Products = () => {

	const length = 520
	const width = 1200
	const height = 1300
	const externalBattenPosition = "horizontal"

	return (
		<div>
			<h1 className="text-3xl font-bold mb-6">{ t( 'Products' ) }</h1>
			<div className="p-6 rounded bg-sky-200 w-[300px]">
				<PlywoodFrame
					partName="Lateral"
					externalBattenPosition={ externalBattenPosition }
					frameWidth={ length }
					frameHeight={ height }
					battenWidth={ 30 }
					hasFragile={ true }
					hasLogo={ true }
					hasExportStamp={ true }
				>
					Hello World!!!
				</PlywoodFrame>
			</div>
		</div>
	)
}
export default Products