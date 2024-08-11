import Link from "next/link"
import { CiSquareChevLeft } from "react-icons/ci"

export default function GoBackButton () {
	
	const layoutClasses = "flex items-center justify-center p-[5px] ml-[10px]"
	const textClasses = "text-[36px] text-white"
	const appearenceClasses = "bg-black bg-opacity-0 rounded hover:bg-opacity-20"
	const displayClasses = "hidden sm:block"

	return (
		<Link href="./" className={ `${ layoutClasses } ${ textClasses } ${ appearenceClasses } ${ displayClasses }` } >
			<CiSquareChevLeft />
		</Link>
	)
}