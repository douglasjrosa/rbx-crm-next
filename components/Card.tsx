import LogoutButton from "@/components/LogoutButton"
import ThemeToggle from "@/components/ThemeToggle"

const Card = ( { children }: { children: React.ReactNode } ) => {
	const darkClasses = "dark:bg-gradient-to-tr dark:from-sky-900 dark:to-cyan-600"
	const lightClasses = "bg-white"
	return (
		<div className={ `p-8 rounded-lg shadow-xl m-2 w-fit ${ lightClasses } ${ darkClasses }` } >
			{ children }
		</div>
	)
}
export default Card