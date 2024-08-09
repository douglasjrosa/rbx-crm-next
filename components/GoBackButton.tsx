import Link from "next/link"
import { CiSquareChevLeft } from "react-icons/ci"

export default function GoBackButton () {
	return (
		<Link
			href="./"
			className="flex items-center justify-center text-white bg-black bg-opacity-0 rounded hover:bg-opacity-20"
			style={ { fontSize: "36px", padding: "5px", marginLeft: "10px" } }
		>
			<CiSquareChevLeft />
		</Link>
	)
}