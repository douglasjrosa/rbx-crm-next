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
	]

	const translation = translations.find( t => t.en === text )

	if ( translation && translation[ locale ] )
		return translation[ locale ]
	else
		return text
}