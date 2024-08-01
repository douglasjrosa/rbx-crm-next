import Link from "next/link"
import Card from "./Card"
import { IoLogoWhatsapp } from "react-icons/io"
import { capitalize, formatPhone } from "@/lib/utils"
import t from "@/lib/translations"
import { ContactAttributes } from "@/lib/strapi-types/contact"

export default function ContactCard ( { index, contactAttributes }: { index: number, contactAttributes: ContactAttributes } ) {

	const {
		name,
		phone,
		email,
		decisionRole
	} = contactAttributes
	return (

		<Card key={ `contact-${ index }` } className="w-full relative flex flex-col gap-3" >
			<span className="absolute text-2xl right-3 text-green-500 dark:text-white">
				<Link href={ `https://wa.me/${ phone }` }>
					<IoLogoWhatsapp />
				</Link>
			</span>
			<p className="text-lg" >{ name }</p>
			{
				phone &&
				<p className="text-sm">
					<a href={ `tel:+55${ phone }` } >
						{ formatPhone( phone ) }
					</a>
				</p>
			}
			{
				email &&
				<p className="text-sm" >
					<a href={ `mailto:${ email }` } >
						{ email }
					</a>
				</p>
			}
			{
				!!decisionRole &&
				<div>
					<p className="text-xs opacity-70">{ t( "Power to close a deal" ) }:</p>
					<p>{ t( capitalize( decisionRole ) ) }</p>
				</div>
			}
		</Card>
	)
}