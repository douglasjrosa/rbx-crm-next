export default function MainContent ( { children }: { children: React.ReactNode } ) {
	return (
		<main className="flex-1 p-6 h-screen bg-gradient-to-tr from-sky-200 to-cyan-50 dark:from-slate-950 dark:to-purple-950 dark:text-white " >
			{ children }
		</main>
	)
}