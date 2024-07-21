export default function ( { name, value }: { name: string, value: string} ) {
	return (
		<input type="hidden" name={ name } value={ value } />
	)
}