import { Dispatch, SetStateAction } from "react"
import { FiZoomIn, FiZoomOut } from "react-icons/fi"

export default function ZoomButtons ( { zoom, setZoom }: { zoom: number, setZoom: Dispatch<SetStateAction<number>> } ) {
	return (
		<div className="absolute text-white text-xl flex flex-col gap-2 left-2" onClick={ e => e.stopPropagation() } >
			<button
				type="button"
				name="zoom+"
				onClick={ () => setZoom( 1.1 * zoom ) }
				className="p-1 rounded shadow-cover bg-sky-800 opacity-50 hover:opacity-100 active:bg-sky-600"
			>
				<FiZoomIn />
			</button>
			<button
				type="button"
				name="zoom-"
				onClick={ () => setZoom( 0.9 * zoom ) }
				className="p-1 rounded shadow-cover bg-sky-800 opacity-50 hover:opacity-100 active:bg-sky-600"
			>
				<FiZoomOut />
			</button>
		</div>
	)
}