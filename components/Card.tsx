
const Card = ( { className, children }: { className?: string, children: React.ReactNode } ) => {
	const darkClasses = "dark:bg-gradient-to-tr dark:from-sky-900 dark:to-cyan-600"
	const lightClasses = "bg-white"
	return (
		<div className={ `p-3 rounded-lg shadow-xl m-2 w-fit ${ lightClasses } ${ darkClasses } ${ className }` } >
			{ children }
		</div>
	)
}
export default Card