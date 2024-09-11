import { FrameComponentProps } from "."
import PlywoodFrame from "../svg-components/PlywoodFrame"

export const mountFrameComponent = ( frame: string ): React.FC<FrameComponentProps> => {
	const frameMap: any = {
		PlywoodFrame
	}
	return frameMap[ frame ] || null
}