export default function MainContent ( { children }: { children: React.ReactNode } ) {
	return (
		<main className="flex-1 p-6 bg-sky-100 dark:bg-slate-900 dark:text-white h-screen" >
			{ children }
		</main>
	)
}