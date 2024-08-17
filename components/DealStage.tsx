import t from "@/lib/translations"
import React from "react"

interface DealStageProps {
	stage?: "Send proposal" | "Follow up" | "Negotiation" | "Won" | "Lost"
	reasonForLoss?: string
}

export default function DealStage ( { stage = "Send proposal", reasonForLoss }: DealStageProps ) {
	const steps = [ "Send proposal", "Follow up", "Negotiation", "completed" ]

	const currentIndex = steps.indexOf( stage === "Won" || stage === "Lost" ? "completed" : stage )

	const stageColor = {
		"Send proposal": "bg-blue-500",
		"Follow up": "bg-yellow-500",
		"Negotiation": "bg-orange-500",
		"Won": "bg-green-500",
		"Lost": "bg-red-500",
	}

	const messageBoxColor = stage === "Won"
		? "bg-success text-white"
		: ( stage === "Lost"
			? "bg-danger text-white"
			: "bg-white dark:bg-slate-100 text-sky-900"
		)

	const borderColor = stage === "Won"
		? "border-t-green-600 dark:border-t-green-600"
		: ( stage === "Lost"
			? "border-t-red-500 dark:border-t-rose-500"
			: "border-t-white dark:border-t-slate-100"
		)

	return (
		<div className="relative w-full h-full flex flex-col items-center">
			<div className={ `${ messageBoxColor } flex-1 flex flex-col items-center justify-center shadow-cover rounded-lg px-4 py-2 w-full` } >
				<p className="text-sm font-bold text-center">{ t( stage ) }</p>
				{ stage === "Lost" && !!reasonForLoss &&
					<p className="text-xs font-bold text-center">
						{ t( reasonForLoss ?? "" ) }
					</p>
				}
			</div>
			<div className="flex-none flex justify-between items-center w-[90%] mt-[11px]">
				{ steps.map( ( s, index ) => (
					<div key={ index } className={ `${ index > 0 ? "flex-1" : "flex-none" } flex items-center` }>
						{ index > 0 && (
							<div className={ `flex-1 h-1 ${ index <= currentIndex ? stageColor[ stage ] : "bg-secondary" }` }></div>
						) }
						<div className="relative">
							{ index === currentIndex && (
								<div className={ `${ borderColor } absolute top-[-11px] w-0 h-0 border-x-[10px] border-x-transparent border-t-[9px]` }></div>
							) }
							<div className={ `w-5 h-5 rounded-full ${ index <= currentIndex ? stageColor[ stage ] : "bg-secondary" }` } ></div>
						</div>
					</div>
				) ) }
			</div>
		</div>
	)
}
