export default function FormGroup ( { title, className, children }: { title: string, className?: string, children: React.ReactNode } ) {

	const lightTitleClasses = "border-blue-500 text-slate-100 bg-blue-500"
	const darkTitleClasses = "dark:border-gray-500 dark:text-gray-300 dark:bg-blue-950"

	const lightBorderClasses = "border-blue-500"
	const darkBorderClasses = "dark:border-gray-500"

	const lightBgClasses = "bg-white"
	const darkBgClasses = "dark:bg-gradient-to-tl from-slate-900 to-sky-900"

	const defaultClasses = "relative pt-12 pb-6 shadow-xl w-full border rounded-lg"

	return (
		<div className={ `${ defaultClasses } ${ lightBgClasses } ${ darkBgClasses } ${ lightBorderClasses } ${ darkBorderClasses } ${ className }` } >
			<h2 className={ `absolute top-[-20px] left-8 py-1 px-4 rounded-lg border text-lg ${ lightTitleClasses } ${ darkTitleClasses }` } >{ title }</h2>
			<div className="flex flex-wrap justify-start h-fit">
				{ children }
			</div>
		</div>
	)
}