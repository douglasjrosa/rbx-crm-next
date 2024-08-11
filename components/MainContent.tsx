
export default function MainContent ( { children }: { children: React.ReactNode } ) {

	return (
		<main className="pb-6 pt-5 px-5 dark:text-white"	>
			{ children }
		</main>
	)
}