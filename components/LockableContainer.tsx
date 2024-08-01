export default function LocableContainer ( { children }: { children: React.ReactNode } ) {
	return (
		<div className="relative" >
			{ children }
			<div className="bg-black rounded-lg opacity-10 absolute left-0 top-0 right-0 bottom-0 hidden locked:block" ></div>
		</div>
	)
}