/** @format */

import Credentials from 'next-auth/providers/credentials';

export const authConfig = {
	providers: [
		Credentials({
			name: 'credentials',
			credentials: {
				login: {},
				senha: {},
			},
			authorize: async (credentials) => {
				const { login, senha } = credentials ?? {};
				if (!login || !senha) return null;

				const resposta = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ login, senha }),
				});

				if (!resposta.ok) return null;

				return resposta.json();
			},
		}),
	],
	callbacks: {
		// @eslint-disable-next-line
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		async jwt({ token, user }: any) {
			if (user) {
				token.id = user.id;
				token.email = user.email;
				token.nome = user.nome;
				token.login = user.login;
				token.permissao = user.permissao;
				token.ultimoLogin = user.ultimoLogin;
			}
			return token;
		},
		// @eslint-disable-next-line
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		async session({ session, token }: any) {
			session.user.id = token.id;
			session.user.email = token.email;
			session.user.nome = token.nome;
			session.user.login = token.login;
			session.user.permissao = token.permissao;
			session.user.ultimoLogin = token.ultimoLogin;
			return session;
		},
	},
	pages: {
		signIn: '/auth/login',
		error: '/auth/login',
	},
	trustHost: true,
};
