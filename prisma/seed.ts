import 'dotenv/config'

import { PrismaClient } from '../lib/prisma/client'

const prisma = new PrismaClient()

async function main() {
    const { login, email, nome } = {
        login: 'd927014',
        email: 'vmabreu@prefeitura.sp.gov.br',
        nome: 'Victor Alexander Menezes de Abreu',
    }
    const usuario = await prisma.usuario.upsert({
        where:  { login },
        update: { email, nome },
        create: { login, email, nome }
    });

    if (usuario) console.log(`Usuário criado ou atualizado: ${usuario.login} - ${usuario.email} - ${usuario.nome}`)
    else console.error('Falha ao criar ou atualizar o usuário');
}

main()
  .then(async () => {
    await prisma.$disconnect()
    process.exit(0)
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
