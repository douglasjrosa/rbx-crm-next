export default function Div ( { size, className, children, readonly }: {
		key?: number
		size?: "sm" | "md" | "lg" | "fit" | "grow" | "auto"
		className?: string
		children: React.ReactNode
		readonly?: boolean
	}
) {

	const responsiveClasses: { sm: string, md: string, lg: string, fit: string, grow: string, auto: string } = {
		sm: "flex-none w-1/2 sm:w-1/4 md:w-1/6 lg:w-[12.5%] xl:w-[10%] 2xl:w-1/12",
		md: "flex-none w-5/6 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6",
		lg: "flex-none w-5/6 sm:w-full md:w-2/3 lg:w-1/2 xl:w-2/5 2xl:w-1/3",
		fit: "flex-none w-fit min-w-fit max-w-fit",
		grow: "flex-1",
		auto: "flex-auto"
	}

	const customClasses = size ? `${ responsiveClasses[ size ] } ${ className }` : className

	return (
		<div className={ `relative ${ customClasses } mx-auto sm:mx-0` } >
			{ children }
			{ readonly && <div className="absolute top-0 bottom-0 left-0 right-0" ></div> }
		</div>
	)
}