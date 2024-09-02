export default function Arrow ( { x, y, to }: {
	x: number
	y: number
	to: "up" | "down" | "left" | "right"
} ) {
	if ( to === "up" ) {
		return (
			<polyline
				points={ `
				${ x },${ y } 
				${ x - 15 },${ y + 50 }
				${ x + 15 },${ y + 50 }
				` }
				stroke="black"
				strokeWidth={ 2 }
			/>
		)
	}
	else if ( to === "down" ) {
		return (
			<polyline
				points={ `
				${ x },${ y } 
				${ x - 15 },${ y - 50 }
				${ x + 15 },${ y - 50 }
				` }
				stroke="black"
				strokeWidth={ 2 }
			/>
		)
	}
	else if ( to === "left" ) {
		return (
			<polyline
				points={ `
				${ x },${ y } 
				${ x + 50 },${ y - 15 }
				${ x + 50 },${ y + 15 }
				` }
				stroke="black"
				strokeWidth={ 2 }
			/>
		)
	}
	else if ( to === "right" ) {
		return (
			<polyline
				points={ `
				${ x },${ y } 
				${ x - 50 },${ y - 15 }
				${ x - 50 },${ y + 15 }
				` }
				stroke="black"
				strokeWidth={ 2 }
			/>
		)
	}
}