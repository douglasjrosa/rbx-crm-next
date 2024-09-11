import { ProductProps } from "."

export const productTest: ProductProps = {
	name: "Cadeira Odonto",
	companyId: 1,
	clientCode: "0568-acl",
	templateId: 1,
	length: 1200,
	width: 80,
	height: 1000,
	template: {
		name: "Caixa econômica",
		parts: {
			lid: [ {
				frameWidth: 1200,
				frameHeight: 800,
				frame: "PlywoodFrame",
				battenWidth: 30,
				battenThickness: 18,
				plywoodThickness: 3,
				stickers: [ {
					label: "Frágil",
					labelCode: "0001",
					color: "red",
				} ],
				externalBattenPosition: "horizontal",
				internalBattenPosition: "auto",
				partQty: 1
			} ],
			leftSide: [ {
				frameWidth: 1200,
				frameHeight: 800,
				frame: "PlywoodFrame",
				battenWidth: 30,
				battenThickness: 18,
				plywoodThickness: 3,
				partQty: 2,
				stickers: [ {
					label: "Frágil",
					labelCode: "0001",
					color: "red",
				} ],
				externalBattenPosition: "horizontal",
				internalBattenPosition: "auto"
			} ],
			rightSide: [ {
				frameWidth: 1200,
				frameHeight: 800,
				frame: "PlywoodFrame",
				battenWidth: 30,
				battenThickness: 18,
				plywoodThickness: 3,
				stickers: [ {
					label: "Frágil",
					labelCode: "0001",
					color: "red",
				} ],
				externalBattenPosition: "horizontal",
				internalBattenPosition: "auto",
				partQty: 1
			} ],
			leftHeader: [ {
				frameWidth: 1200,
				frameHeight: 800,
				frame: "PlywoodFrame",
				battenWidth: 30,
				battenThickness: 18,
				plywoodThickness: 3,
				stickers: [ {
					label: "Frágil",
					labelCode: "0001",
					color: "red",
				} ],
				externalBattenPosition: "horizontal",
				internalBattenPosition: "auto",
				partQty: 1
			} ],
			rightHeader: [ {
				frameWidth: 1200,
				frameHeight: 800,
				frame: "PlywoodFrame",
				battenWidth: 30,
				battenThickness: 18,
				plywoodThickness: 3,
				stickers: [ {
					label: "Frágil",
					labelCode: "0001",
					color: "red",
				} ],
				externalBattenPosition: "horizontal",
				internalBattenPosition: "auto",
				partQty: 1
			} ]
		}
	}
}