export default function MainContent ( { children }: { children: React.ReactNode } ) {
	return (
		<div className="relative h-[calc(100vh-4rem)] w-screen sm:w-[calc(100vw-65px)] bg-gradient-to-tl from-blue-200 to-sky-100 dark:from-black dark:to-blue-950 scrollbar">
			<main className="flex-1 pb-6 pt-5 px-5 dark:text-white min-h-full" >
				{ children }
			</main>
		</div>
	)
}