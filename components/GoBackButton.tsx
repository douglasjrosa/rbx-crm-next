import Link from "next/link"
import { CiSquareChevLeft } from "react-icons/ci"

export default function GoBackButton () {
	return (
		<Link
			href="./"
			className="flex items-center justify-center text-3xl text-white bg-black bg-opacity-0 rounded p-px hover:bg-opacity-20"
		>
			<CiSquareChevLeft />
		</Link>
	)
}