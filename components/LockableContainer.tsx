export default function LocableContainer ( { children }: { children: React.ReactNode } ) {
	return (
		<>
			{ children }
			<div className="bg-black rounded-lg opacity-10 absolute left-0 top-[-15px] right-0 bottom-0 hidden locked:block" ></div>
		</>
	)
}