
const Card = ( { className, children }: { className?: string, children: React.ReactNode } ) => {
	const darkClasses = "dark:bg-gradient-to-tr dark:from-sky-900 dark:to-cyan-600"
	const lightClasses = "bg-white"
	return (
		<div className={ `w-full p-3 rounded-lg shadow-xl ${ lightClasses } ${ darkClasses } ${ className }` } >
			{ children }
		</div>
	)
}
export default Card