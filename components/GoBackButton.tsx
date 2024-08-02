import Link from "next/link"
import { CiSquareChevLeft } from "react-icons/ci"

export default function GoBackButton ( { scale }: { scale: number } ) {
	return (
		<Link
			href="./"
			className="flex items-center justify-center text-white bg-black bg-opacity-0 rounded hover:bg-opacity-20"
			style={ { fontSize: `${ 36 * scale }px`, padding: `${ 5 * scale }px`, marginLeft: `${ 10 * scale }px` } }
		>
			<CiSquareChevLeft />
		</Link>
	)
}