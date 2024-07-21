export default function BreakRow ( { size }: { size?: "sm" | "md" | "lg" | "xl" } ) {
	const sizeClass = {
		sm: "my-2",
		md: "my-4",
		lg: "my-6",
		xl: "my-8"
	}
	return <hr className={`w-full border-0 ${ sizeClass[ size || "md" ] }`} />
}