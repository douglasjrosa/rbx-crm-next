export default function ( { id, value }: { id: string, value: string} ) {
	return (
		<input type="hidden" id={ id } name={ id } value={ value } />
	)
}