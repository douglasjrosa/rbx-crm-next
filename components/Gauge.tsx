interface GaugeProps {
	value: number
	maxValue?: number
	size?: number
	strokeWidth?: number
	units?: string
}

export default function Gauge ( { value, maxValue = 100, size = 70, units }: GaugeProps ) {

	const strokeWidth = Math.ceil(size / 10)
	const radius = ( size - strokeWidth ) / 2
	const circumference = 2 * Math.PI * radius
	const progress = Math.min( value, maxValue ) / maxValue
	const fontSize = Math.floor( size / ( !units ? 3 : 4 ) )

	const theme = progress > 0.9
		? "text-success"
		: ( progress > 0.5
			? "text-info"
			: ( progress > 0.25
				? "text-warning"
				: "text-danger"
			)
		)
	
	return (
		<div
			className="relative"
			style={ {
				width: size,
				height: size
			} }
		>
			<svg
				width={ size }
				height={ size }
				className="transform rotate-[-90deg]"
			>
				<circle
					cx={ size / 2 }
					cy={ size / 2 }
					r={ radius }
					strokeWidth={ strokeWidth }
					fill="transparent"
					className="text-secondary"
					stroke="currentColor"
				/>
				<circle
					cx={ size / 2 }
					cy={ size / 2 }
					r={ radius }
					strokeWidth={ strokeWidth }
					fill="transparent"
					strokeDasharray={ circumference }
					strokeDashoffset={ circumference * ( 1 - progress ) }
					strokeLinecap="round"
					className={ `${ theme } transition-all duration-500` }
					stroke="currentColor"
				/>
			</svg>
			<div className="absolute inset-0 flex content-center justify-center flex-wrap">
				<span
					className={ `font-semibold content-center` }
					style={ {
						fontSize: `${ fontSize }px`,
						lineHeight: `${ fontSize }px`
					} }
				>
					{ Math.round( progress * 100 ) }
				</span>
				{ !!units && (
					<span
						className={ `content-start text-center` }
						style={ {
							width: `${ !!units && units.length > 2 ? "100%" : "fit-content" }`,
							fontSize: `${ Math.floor( fontSize / 1.5 ) }px`,
							marginLeft: `${ !!units && units.length > 2 ? Math.floor( fontSize / 7 ) : 0 }px`
						} }
					>{ units ?? "" }</span>
				) }
			</div>
		</div>
	)
}
