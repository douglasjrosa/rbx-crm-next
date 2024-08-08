interface Translation {
	en: string
	'pt-BR': string
	[ key: string ]: string
}

export default function t ( text: string, locale = "pt-BR" ): string {
	const translations: Translation[] = [
		{ en: "Dashboard", 'pt-BR': "Painel" },
		{ en: "Deals", 'pt-BR': "Negócios" },
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
		{ en: "Reason", 'pt-BR': "Motivo" },
	]

	const translation = translations.find( t => t.en === text )

	if ( translation && translation[ locale ] )
		return translation[ locale ]
	else
		return text
}