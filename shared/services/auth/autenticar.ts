export async function autenticar(login: string, senha: string) {
    await fetch(`${process.env.SMUL_AUTH_URL}/api/smul-auth/ldap/autenticar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, senha }),
    });
    return null;
}