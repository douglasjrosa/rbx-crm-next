export default function LocableContainer ( { children, className }: { children: React.ReactNode, className?: string } ) {
	return (
		<div className={ `relative ${ className }` } >
			{ children }
			<div className="bg-gradient-to-tl from-black to-transparent rounded-lg opacity-20 absolute left-0 top-0 right-0 bottom-0 hidden locked:block" ></div>
		</div>
	)
}