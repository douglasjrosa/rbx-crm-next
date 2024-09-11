export default function PartTitle ( { x, y, fontSize = "6em", children }: {
	x: number
	y: number
	fontSize?: string
	children: React.ReactNode
 }) {
	return <text x={ x } y={ y } style={{ fontSize }} >{ children }</text>
}