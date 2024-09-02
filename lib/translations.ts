interface Translation {
	en: string
	'pt-BR': string
	[ key: string ]: string
}

export default function t ( text: string, locale = "pt-BR" ): string {
	const translations: Translation[] = [
		{ en: "Dashboard", 'pt-BR': "Painel" },
		{ en: "Deals", 'pt-BR': "Negócios" },
		{ en: "Deal", 'pt-BR': "Negócio" },
		{ en: "Companies", 'pt-BR': "Empresas" },
		{ en: "Products", 'pt-BR': "Produtos" },
		{ en: "Profile", 'pt-BR': "Perfil" },
		{ en: "Login", 'pt-BR': "Entrar" },
		{ en: "Logout", 'pt-BR': "Sair" },
		{ en: "Change to dark mode.", 'pt-BR': "Mudar para o modo escuro." },
		{ en: "Change to light mode.", 'pt-BR': "Mudar para o modo claro" },
		{ en: "Invalid credentials. Please try again.", 'pt-BR': "Usuário e/ou senha incorretos. Tente novamente." },
		{ en: "Login failed. Try again later.", 'pt-BR': "Erro ao fazer login. Tente novamente mais tarde." },
		{ en: "An error occurred.", 'pt-BR': "Ocorreu um erro." },
		{ en: "Name", 'pt-BR': "Nome" },
		{ en: "Phone", 'pt-BR': "Fone" },
		{ en: "Unlocked", 'pt-BR': "Liberado" },
		{ en: "Locked", 'pt-BR': "Protegido" },
		{ en: "Search company", 'pt-BR': "Pesquisar empresa" },
		{ en: "Corporate reason", 'pt-BR': "Razão Social" },
		{ en: "Country", 'pt-BR': "País" },
		{ en: "Address", 'pt-BR': "Endereço" },
		{ en: "Country code", 'pt-BR': "Código do país" },
		{ en: "Number", 'pt-BR': "Número" },
		{ en: "Neighborhood", 'pt-BR': "Bairro" },
		{ en: "PostalCode", 'pt-BR': "CEP" },
		{ en: "City", 'pt-BR': "Cidade" },
		{ en: "State", 'pt-BR': "Estado" },
		{ en: "Website", 'pt-BR': "Site" },
		{ en: "Phone", 'pt-BR': "Fone" },
		{ en: "ICMS Tax payer", 'pt-BR': "Contribuinte do ICMS" },
		{ en: "Company size", 'pt-BR': "Porte" },
		{ en: "Save", 'pt-BR': "Salvar" },
		{ en: "Active", 'pt-BR': "Ativo" },
		{ en: "Complement", 'pt-BR': "Complemento" },
		{ en: "Power to close a deal", 'pt-BR': "Poder para fechar negócio" },
		{ en: "I don't know", 'pt-BR': "Eu não sei" },
		{ en: "None", 'pt-BR': "Nenhum" },
		{ en: "Influence", 'pt-BR': "Influência" },
		{ en: "Decision", 'pt-BR': "Decisão" },
		{ en: "Buyer", 'pt-BR': "Comprador" },
		{ en: "Add", 'pt-BR': "Adicionar" },
		{ en: "Decision", 'pt-BR': "Decisão" },
		{ en: "New Contact", 'pt-BR': "Novo contato" },
		{ en: "New Company", 'pt-BR': "Nova Empresa" },
		{ en: "Contacts", 'pt-BR': "Contatos" },
		{ en: "Registration data", 'pt-BR': "Dados cadastrais" },
		{ en: "Loading", 'pt-BR': "Carregando" },
		{ en: "Short name", 'pt-BR': "Nome curto" },
		{ en: "The company", 'pt-BR': "A empresa" },
		{ en: "belongs to", 'pt-BR': "pertence a" },
		{ en: "is already registered in the system.", 'pt-BR': "já está cadastrada no sistema." },
		{ en: "Error fetching company from receitaws.com.br", 'pt-BR': "Erro ao consultar cadastro da empresa em receitaws.com.br" },
		{ en: "ATTENTION! The company is not active in federal revenue.", 'pt-BR': "ATENÇÃO! A empresa não está ativa na receita federal." },
		{ en: "ATTENTION! The company's status is not 'OK' with the IRS.", 'pt-BR': "ATENÇÃO! O status da empresa não está como 'OK' na receita federal." },
		{ en: "Enter the I.E. in the format xxx.xxx.xxx.xxx.", 'pt-BR': "Digite a I.E. no formato xxx.xxx.xxx.xxx." },
		{ en: "Enter a valid CNPJ in the format xx.xxx.xxx/xxxx-xx.", 'pt-BR': "Digite um CNPJ válido no formato xx.xxx.xxx/xxxx-xx." },
		{ en: "Choose an option.", 'pt-BR': "Escolha uma opção" },
		{ en: "Short Name", 'pt-BR': "Nome Curto" },
		{ en: "ERROR! Unable to locate seller ID.", 'pt-BR': "ERRO! Não foi possível localizar o Id do vendedor." },
		{ en: "Error creating new deal.", 'pt-BR': "Erro ao criar novo negócio." },
		{ en: "Send proposal", 'pt-BR': "Enviar proposta" },
		{ en: "Follow up", 'pt-BR': "Acompanhamento" },
		{ en: "Negotiation", 'pt-BR': "Negociação" },
		{ en: "Won", 'pt-BR': "Ganho" },
		{ en: "Lost", 'pt-BR': "Perdido" },
		{ en: "New Deal", 'pt-BR': "Novo Negócio" },
		{ en: "Issuer", 'pt-BR': "Emitente" },
		{ en: "Expires in", 'pt-BR': "Expira em" },
		{ en: "Expires at", 'pt-BR': "Expira em" },
		{ en: "Stage", 'pt-BR': "Etapa" },
		{ en: "day", 'pt-BR': "dia" },
		{ en: "days", 'pt-BR': "dias" },
		{ en: "Institutional contacts", 'pt-BR': "Contatos institucionais" },
		{ en: "Address data", 'pt-BR': "Dados de endereço" },
		{ en: "Payment method", 'pt-BR': "Forma de pagamento" },
		{ en: "Format", 'pt-BR': "Formato" },
		{ en: "Enter a valid value", 'pt-BR': "Digite um valor válido" },
		{ en: "Freight type", 'pt-BR': "Tipo de frete" },
		{ en: "Freight value", 'pt-BR': "Valor do frete" },
		{ en: "Deliver forecast", 'pt-BR': "Previsão de entrega" },
		{ en: "Client order code", 'pt-BR': "Nº pedido do cliente" },
		{ en: "Observations", 'pt-BR': "Observações" },
		{ en: "Reason", 'pt-BR': "Motivo" },
		{ en: "Fragile", 'pt-BR': "Frágil" },
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
		{ en: "woods", 'pt-BR': "madeiras" },
	]

	const isCapitalized = text[ 0 ] === text[ 0 ].toUpperCase()
	const capitalized = text.charAt( 0 ).toUpperCase() + text.slice( 1 )
	const uncapitalized = text.charAt( 0 ).toLowerCase() + text.slice( 1 )

	let translation = translations.find( t => t.en === capitalized )

	if ( !translation || !translation[ locale ] )
		translation = translations.find( t => t.en === uncapitalized )

	const response = translation?.[ locale ]

	if ( !response ) return text

	if ( isCapitalized )
		return response.charAt( 0 ).toUpperCase() + response.slice( 1 )

	else
		return response.charAt( 0 ).toLowerCase() + response.slice( 1 )
}