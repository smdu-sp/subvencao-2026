/** @format */

'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get('callbackUrl') || '/';
	const error = searchParams.get('error');

	const [loading, setLoading] = useState(false);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);
		const form = e.currentTarget;
		const login = (form.elements.namedItem('login') as HTMLInputElement).value;
		const senha = (form.elements.namedItem('senha') as HTMLInputElement).value;

		await signIn('credentials', { login, senha, callbackUrl });
		setLoading(false);
	}

	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
			<form
				onSubmit={handleSubmit}
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '1rem',
					width: '320px',
					padding: '2rem',
					border: '1px solid #ccc',
					borderRadius: '8px',
				}}
			>
				<h2 style={{ margin: 0, textAlign: 'center' }}>Login</h2>

				{error && (
					<p style={{ color: 'red', margin: 0, textAlign: 'center', fontSize: '0.875rem' }}>
						Credenciais inválidas. Tente novamente.
					</p>
				)}

				<div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
					<label htmlFor="login">Usuário</label>
					<input
						id="login"
						name="login"
						type="text"
						required
						autoComplete="username"
						style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
					/>
				</div>

				<div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
					<label htmlFor="senha">Senha</label>
					<input
						id="senha"
						name="senha"
						type="password"
						required
						autoComplete="current-password"
						style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
					/>
				</div>

				<button
					type="submit"
					disabled={loading}
					style={{
						padding: '0.625rem',
						borderRadius: '4px',
						border: 'none',
						background: '#2563eb',
						color: '#fff',
						cursor: loading ? 'not-allowed' : 'pointer',
						opacity: loading ? 0.7 : 1,
					}}
				>
					{loading ? 'Entrando...' : 'Entrar'}
				</button>
			</form>
		</div>
	);
}