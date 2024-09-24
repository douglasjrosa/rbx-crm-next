import Select from "../form-components/Select"
import { FrameFormFieldProps, FrameParamsProps, PartNameType } from "./utils"
import Input from "../form-components/Input"
import { updatePartProp } from "./utils/handleProduct"
import { formatBoolean } from "@/lib/utils"
import SwitchButton from "../form-components/SwitchButton"

export default function FrameForm ( {
	partName,
	partDivIndex,
	frameParams,
	fields
}: {
	partName: PartNameType
	partDivIndex: number
	frameParams: FrameParamsProps
	fields?: FrameFormFieldProps[]
} ) {

	const handleFieldValue = ( field: FrameFormFieldProps ) => {

		const {
			partPropName,
			fieldValueType,
			arrayIndex,
			arrayValueType,
			objectKey,
			objectValueType
		} = field

		let newValue
		if ( fieldValueType === "array"
			&& arrayIndex !== undefined
			&& Array.isArray( frameParams[ partPropName ] )
		) {
			if ( arrayValueType === "string" )
				newValue = String( frameParams[ partPropName ][ arrayIndex ] ?? "" )
			else if ( arrayValueType === "number" )
				newValue = Number( frameParams[ partPropName ][ arrayIndex ] ?? 0 )
			else if (
				arrayValueType === "object"
				&& !!objectKey
				&& frameParams[ partPropName ][ arrayIndex ]?.[ objectKey ] !== undefined
			) {
				newValue = objectValueType === "string"
					? String( frameParams[ partPropName ][ arrayIndex ][ objectKey ] ?? "" )
					: Number( frameParams[ partPropName ][ arrayIndex ][ objectKey ] ?? 0 )
			}
			else {
				console.error( { frameParams, partPropName, arrayIndex, objectKey } )
				throw new Error( `Error mounting frame form value of propriety "${ partPropName }" of part "${ partName }"` )
			}
		}
		else if ( fieldValueType === "boolean" ) {
			const value = frameParams[ partPropName ]
			newValue = formatBoolean( value )
		}
		else newValue = fieldValueType === "string"
			? String( frameParams[ partPropName ] || "" )
			: Number( frameParams[ partPropName ] || 0 )

		return newValue
	}

	return (
		<div>
			{ !!fields && fields.map( ( field, i ) => {


				const {
					fieldElement,
					fieldLabel,
					fieldType,
					fieldProps,
					options,
					partPropName,
					onChange,
					fieldValue,
					min,
					max
				} = field

				let value = !!fieldValue ? fieldValue( frameParams ) : handleFieldValue( field )

				if ( fieldElement === "select" && !!options ) {
					value = typeof value === "boolean" ? ( !!value ? "true" : "false" ) : value
					return (
						<div key={ i } className="flex-none mb-3" >
							<Select
								name={ partPropName }
								label={ fieldLabel }
								value={ value }
								onChange={ e => {
									if ( onChange )
										onChange( e, partName, partDivIndex, frameParams )
									else
										updatePartProp( {
											partName,
											partDivIndex,
											partPropName,
											value: e.target.value,
											field
										} )
								} }
								options={ options }
								{ ...fieldProps }
							/>
						</div>
					)
				}
				if ( fieldElement === "input" && fieldType ) {
					value = typeof value === "boolean" ? ( !!value ? "true" : "false" ) : value
					return (
						<div key={ i } className="flex-none mb-3" >
							<Input
								type={ fieldType }
								name={ partPropName }
								label={ fieldLabel }
								value={ value }
								min={ !!min && min( frameParams ) || undefined }
								max={ !!max && max( frameParams ) || undefined }
								onChange={ e => {
									if ( onChange )
										onChange( e, partName, partDivIndex, frameParams )
									else
										updatePartProp( {
											partName,
											partDivIndex,
											partPropName,
											value: e.target.value,
											field
										} )
								} }
								{ ...fieldProps }
							/>
						</div>
					)
				}
				if ( fieldElement === "switch" ) {
					return (
						<div key={ i } className="flex-none mb-3" >
							<SwitchButton
								name={ partPropName }
								label={ fieldLabel }
								checked={ formatBoolean( value ) }
								onChange={ e => {
									if ( onChange )
										onChange( e, partName, partDivIndex, frameParams )
									else
										updatePartProp( {
											partName,
											partDivIndex,
											partPropName,
											value: e.target.checked,
											field
										} )
								} }
								{ ...fieldProps }
							/>
						</div>
					)
				}
			} ) }
		</div>
	)
}
