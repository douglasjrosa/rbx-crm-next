import LogoutButton from "@/components/LogoutButton"
import ThemeToggle from "@/components/ThemeToggle"

const Card = ( { children }: { children: React.ReactNode } ) => {
	const darkClasses = "dark:from-sky-900 dark:to-cyan-600"
	const lightClasses = "from-cyan-100 to-white"
	return (
		<div className={ `bg-gradient-to-tr p-8 rounded-lg shadow-lg m-2 w-fit ${ lightClasses } ${ darkClasses }` } >
			{ children }
		</div>
	)
}
export default Card