import Link from "next/link"
import { CiEdit } from "react-icons/ci"

export default function EditButton ( { href }: { href: string } ) {

	const bgColors = "bg-sky-500 hover:bg-sky-600 active:bg-sky-700"
	const darkBgColors = "dark:bg-sky-800 dark:hover:bg-sky-900 dark:active:bg-sky-950"
	const appearance = "flex items-center justify-center size-8 shadow-[inset_-3px_-5px_3px_0.05px_rgba(0,0,0,0.2)] rounded-lg text-xl font-black text-white"

	return (
		<div className="absolute top-2 right-2">
			<Link
				href={ href }
				className={ `${ appearance } ${ bgColors } ${ darkBgColors }` }
			>
				<CiEdit />
			</Link>
		</div>
	)
}