import t from "@/lib/translations"
import { FiLock, FiUnlock } from "react-icons/fi"

export default function SaveButton () {
	return (
		<button
			className="relative py-3 px-10 bg-green-600 text-lg rounded locked:dark:bg-gray-800 locked:bg-gray-500 text-white shadow-[inset_-3px_-5px_5px_0.2px_rgba(0,0,0,0.7)] hover:bg-green-700 active:bg-green-800"
			type="submit"
		>
			<div className="rounded-full border border-white opacity-70 text-sm absolute bottom-1 right-1 p-[5px]">
				<FiLock className="hidden locked:block" />
				<FiUnlock className="block locked:hidden" />
			</div>
			{ t( "Save" ) }
		</button>
	)
}