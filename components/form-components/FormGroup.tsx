export default function FormGroup ( { title, children }: { title: string, children: React.ReactNode } ) {

	const lightTitleClasses = "border-blue-500 text-slate-100 bg-blue-500"
	const darkTitleClasses = "dark:border-gray-500 dark:text-gray-300 dark:bg-blue-950"

	const lightBorderClasses = "border-blue-500"
	const darkBorderClasses = "dark:border-gray-500"

	return (
		<div className={ `relative pt-12 w-full border rounded-lg ${ lightBorderClasses } ${ darkBorderClasses }` } >
			<h2 className={ `absolute top-[-20px] left-8 py-1 px-4 rounded-lg border text-lg ${ lightTitleClasses } ${ darkTitleClasses }` } >{ title }</h2>
			<div className="flex flex-wrap justify-start h-fit">
				{ children }
			</div>
		</div>
	)
}