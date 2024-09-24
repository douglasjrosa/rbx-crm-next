interface Translation {
	en: string
	'pt-BR': string
	[ key: string ]: string
}

export default function t (
	text: string,
	{ locale = "pt-BR", isExpression = true }: { locale?: string, isExpression?: boolean } = {}
): string {

	const translations: Translation[] = [
		{ en: "dashboard", 'pt-BR': "painel" },
		{ en: "deals", 'pt-BR': "negócios" },
		{ en: "deal", 'pt-BR': "negócio" },
		{ en: "companies", 'pt-BR': "empresas" },
		{ en: "products", 'pt-BR': "produtos" },
		{ en: "profile", 'pt-BR': "perfil" },
		{ en: "login", 'pt-BR': "entrar" },
		{ en: "logout", 'pt-BR': "sair" },
		{ en: "change to dark mode.", 'pt-BR': "mudar para o modo escuro." },
		{ en: "change to light mode.", 'pt-BR': "mudar para o modo claro" },
		{ en: "invalid credentials. Please try again.", 'pt-BR': "usuário e/ou senha incorretos. Tente novamente." },
		{ en: "login failed. Try again later.", 'pt-BR': "erro ao fazer login. Tente novamente mais tarde." },
		{ en: "an error occurred.", 'pt-BR': "ocorreu um erro." },
		{ en: "name", 'pt-BR': "nome" },
		{ en: "phone", 'pt-BR': "fone" },
		{ en: "unlocked", 'pt-BR': "liberado" },
		{ en: "locked", 'pt-BR': "protegido" },
		{ en: "search company", 'pt-BR': "pesquisar empresa" },
		{ en: "corporate reason", 'pt-BR': "razão Social" },
		{ en: "country", 'pt-BR': "país" },
		{ en: "address", 'pt-BR': "endereço" },
		{ en: "country code", 'pt-BR': "código do país" },
		{ en: "number", 'pt-BR': "número" },
		{ en: "neighborhood", 'pt-BR': "bairro" },
		{ en: "postalCode", 'pt-BR': "CEP" },
		{ en: "city", 'pt-BR': "cidade" },
		{ en: "state", 'pt-BR': "estado" },
		{ en: "website", 'pt-BR': "site" },
		{ en: "phone", 'pt-BR': "fone" },
		{ en: "iCMS Tax payer", 'pt-BR': "contribuinte do ICMS" },
		{ en: "company size", 'pt-BR': "porte" },
		{ en: "save", 'pt-BR': "salvar" },
		{ en: "active", 'pt-BR': "ativo" },
		{ en: "complement", 'pt-BR': "complemento" },
		{ en: "power to close a deal", 'pt-BR': "poder para fechar negócio" },
		{ en: "i don't know", 'pt-BR': "eu não sei" },
		{ en: "none", 'pt-BR': "nenhum" },
		{ en: "influence", 'pt-BR': "influência" },
		{ en: "decision", 'pt-BR': "decisão" },
		{ en: "buyer", 'pt-BR': "comprador" },
		{ en: "add", 'pt-BR': "adicionar" },
		{ en: "decision", 'pt-BR': "decisão" },
		{ en: "new Contact", 'pt-BR': "novo contato" },
		{ en: "new Company", 'pt-BR': "nova Empresa" },
		{ en: "contacts", 'pt-BR': "contatos" },
		{ en: "registration data", 'pt-BR': "dados cadastrais" },
		{ en: "loading", 'pt-BR': "carregando" },
		{ en: "short name", 'pt-BR': "nome curto" },
		{ en: "the company", 'pt-BR': "a empresa" },
		{ en: "belongs to", 'pt-BR': "pertence a" },
		{ en: "is already registered in the system.", 'pt-BR': "já está cadastrada no sistema." },
		{ en: "error fetching company from receitaws.com.br", 'pt-BR': "erro ao consultar cadastro da empresa em receitaws.com.br" },
		{ en: "aTTENTION! The company is not active in federal revenue.", 'pt-BR': "aTENÇÃO! A empresa não está ativa na receita federal." },
		{ en: "aTTENTION! The company's status is not 'OK' with the IRS.", 'pt-BR': "aTENÇÃO! O status da empresa não está como 'OK' na receita federal." },
		{ en: "enter the I.E. in the format xxx.xxx.xxx.xxx.", 'pt-BR': "digite a I.E. no formato xxx.xxx.xxx.xxx." },
		{ en: "enter a valid CNPJ in the format xx.xxx.xxx/xxxx-xx.", 'pt-BR': "digite um CNPJ válido no formato xx.xxx.xxx/xxxx-xx." },
		{ en: "choose an option.", 'pt-BR': "escolha uma opção" },
		{ en: "short Name", 'pt-BR': "nome Curto" },
		{ en: "eRROR! Unable to locate seller ID.", 'pt-BR': "eRRO! Não foi possível localizar o Id do vendedor." },
		{ en: "error creating new deal.", 'pt-BR': "erro ao criar novo negócio." },
		{ en: "send proposal", 'pt-BR': "enviar proposta" },
		{ en: "follow up", 'pt-BR': "acompanhamento" },
		{ en: "negotiation", 'pt-BR': "negociação" },
		{ en: "won", 'pt-BR': "ganho" },
		{ en: "lost", 'pt-BR': "perdido" },
		{ en: "new Deal", 'pt-BR': "novo Negócio" },
		{ en: "issuer", 'pt-BR': "emitente" },
		{ en: "expires in", 'pt-BR': "expira em" },
		{ en: "expires at", 'pt-BR': "expira em" },
		{ en: "stage", 'pt-BR': "etapa" },
		{ en: "day", 'pt-BR': "dia" },
		{ en: "days", 'pt-BR': "dias" },
		{ en: "institutional contacts", 'pt-BR': "contatos institucionais" },
		{ en: "address data", 'pt-BR': "dados de endereço" },
		{ en: "payment method", 'pt-BR': "forma de pagamento" },
		{ en: "format", 'pt-BR': "formato" },
		{ en: "enter a valid value", 'pt-BR': "digite um valor válido" },
		{ en: "freight type", 'pt-BR': "tipo de frete" },
		{ en: "freight value", 'pt-BR': "valor do frete" },
		{ en: "deliver forecast", 'pt-BR': "previsão de entrega" },
		{ en: "client order code", 'pt-BR': "nº pedido do cliente" },
		{ en: "observations", 'pt-BR': "observações" },
		{ en: "reason", 'pt-BR': "motivo" },
		{ en: "fragile", 'pt-BR': "frágil" },
		{ en: "sheets", 'pt-BR': "chapas" },
		{ en: "pieces", 'pt-BR': "peças" },
		{ en: "parts", 'pt-BR': "partes" },
		{ en: "battens", 'pt-BR': "sarrafos" },
		{ en: "top-left", 'pt-BR': "superior-esquerdo" },
		{ en: "top-center", 'pt-BR': "superior-centro" },
		{ en: "top-right", 'pt-BR': "superior-direito" },
		{ en: "middle-left", 'pt-BR': "meio-esquerdo" },
		{ en: "middle-center", 'pt-BR': "meio-centro" },
		{ en: "middle-right", 'pt-BR': "meio-direito" },
		{ en: "bottom-left", 'pt-BR': "inferior-esquerdo" },
		{ en: "bottom-center", 'pt-BR': "inferior-centro" },
		{ en: "bottom-right", 'pt-BR': "inferior-direito" },
		{ en: "don't fit", 'pt-BR': "não cabem" },
		{ en: "stickers", 'pt-BR': "adesivos" },
		{ en: "side", 'pt-BR': "lateral" },
		{ en: "header", 'pt-BR': "cabeceira" },
		{ en: "measures", 'pt-BR': "medidas" },
		{ en: "woods", 'pt-BR': "madeiras" },
		{ en: "others", 'pt-BR': "outros" },
		{ en: "plywood and accessories", 'pt-BR': "compensados e acessórios" },
		{ en: "budget", 'pt-BR': "orçamento" },
		{ en: "settings", 'pt-BR': "configurações" },
		{ en: "external battens position", 'pt-BR': "posição dos sarrafos Externos" },
		{ en: "internal battens position", 'pt-BR': "posição dos sarrafos Internos" },
		{ en: "internal battens qty", 'pt-BR': "qtde. de sarrafos Internos" },
		{ en: "frame width", 'pt-BR': "largura do quadro" },
		{ en: "frame height", 'pt-BR': "altura do quadro" },
		{ en: "batten width", 'pt-BR': "largura do sarrafo" },
		{ en: "batten widths", 'pt-BR': "largura dos sarrafos" },
		{ en: "export", 'pt-BR': "exportação" },
		{ en: "yes", 'pt-BR': "sim" },
		{ en: "no", 'pt-BR': "não" },
		{ en: "plywood thickness", 'pt-BR': "espessura da chapa" },
		{ en: "batten thickness", 'pt-BR': "espessura dos sarrafos" },
		{ en: "frame qty", 'pt-BR': "quantidade de quadros" },
		{ en: "gap width", 'pt-BR': "largura do vão" },
		{ en: "left side", 'pt-BR': "lateral Esquerda" },
		{ en: "in", 'pt-BR': "em" },
		{ en: "left", 'pt-BR': "esquerda" },
		{ en: "right", 'pt-BR': "direita" },
		{ en: "left side", 'pt-BR': "lateral esquerda" },
		{ en: "right side", 'pt-BR': "lateral direita" },
		{ en: "left header", 'pt-BR': "cabeceira esquerda" },
		{ en: "right header", 'pt-BR': "cabeceira direita" },
		{ en: "sides", 'pt-BR': "laterais" },
		{ en: "headers", 'pt-BR': "cabeceiras" },
		{ en: "special", 'pt-BR': "especial" },
		{ en: "spec", 'pt-BR': "espec" },
		{ en: "label", 'pt-BR': "Etiqueta" },
		{ en: "sticker code", 'pt-BR': "código do adesivo" },
		{ en: "sticker color", 'pt-BR': "cor do adesivo" },
		{ en: "height", 'pt-BR': "altura" },
		{ en: "width", 'pt-BR': "largura" },
		{ en: "sticker gap", 'pt-BR': "vão do adesivo" },
		{ en: "alignment", 'pt-BR': "alinhamento" },
		{ en: "colorful", 'pt-BR': "colorido" },
		{ en: "black", 'pt-BR': "preto" },
		{ en: "red", 'pt-BR': "vermelho" },
		{ en: "margin top", 'pt-BR': "margem superior" },
		{ en: "margin left", 'pt-BR': "margem esquerda" },
		{ en: "free", 'pt-BR': "livre" },
		{ en: "stickers qty", 'pt-BR': "quantidade de adesivos" },
		{ en: "lid", 'pt-BR': "tampa" },
		{ en: "batten placement", 'pt-BR': "posicionamento do sarrafo" },
		{ en: "part", 'pt-BR': "parte" },
		{ en: "crossed batten", 'pt-BR': "sarrafo cruzado" },
		{ en: "", 'pt-BR': "" },
		{ en: "", 'pt-BR': "" },
		{ en: "", 'pt-BR': "" },
		{ en: "", 'pt-BR': "" },
		{ en: "", 'pt-BR': "" },
		{ en: "", 'pt-BR': "" },
		{ en: "", 'pt-BR': "" },
		{ en: "", 'pt-BR': "" },
		{ en: "", 'pt-BR': "" },
		{ en: "", 'pt-BR': "" },
	]

	if ( isExpression ) {

		const isCapitalized = !!text[ 0 ] && text[ 0 ] === text[ 0 ].toUpperCase()
		const textUncapitalized = text.split( " " ).map( word => word.charAt( 0 ).toLowerCase() + word.slice( 1 ) ).join( " " )
		const searchTranslation = translations.find( t => t.en === textUncapitalized )
		const translation = searchTranslation?.[ locale ]

		if ( !translation ) return text

		return isCapitalized ? translation.charAt( 0 ).toUpperCase() + translation.slice( 1 ) : translation
	}
	else {
		return text.split( " " ).map( word => {

			const isCapitalized = !!word[ 0 ] && word[ 0 ] === word[ 0 ].toUpperCase()
			const uncapitalized = word.charAt( 0 ).toLowerCase() + word.slice( 1 )

			const searchTranslation = translations.find( t => t.en === uncapitalized )
			const translation = searchTranslation?.[ locale ]

			if ( !translation ) return word

			return isCapitalized
				? translation.charAt( 0 ).toUpperCase() + translation.slice( 1 )
				: translation.charAt( 0 ).toLowerCase() + translation.slice( 1 )
			
		} ).join( " " )
	}
}