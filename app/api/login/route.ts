/** @format */

import { db } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const { login, senha } = await req.json();
	if (!login || !senha)
		return NextResponse.json({ erro: 'Login e senha são obrigatórios.' }, { status: 400 });
	const usuario = await db.usuario.findUnique({ where: { login } });
	if (!usuario)
		return NextResponse.json({ erro: 'Usuário não encontrado.' }, { status: 404 });
	if (process.env.ENVIRONMENT !== "local") {
		const url = `${process.env.SMUL_AUTH_URL}/ldap/autenticar`;
		const resposta = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ login, senha }),
		});
		if (!resposta.ok) return NextResponse.json({ erro: 'Credenciais inválidas.' }, { status: 401 });
	}
	return NextResponse.json({
		id: usuario.id,
		email: usuario.email,
		nome: usuario.nome,
		login: usuario.login,
		permissao: usuario.permissao,
		ultimoLogin: usuario.ultimoLogin,
	});
}
