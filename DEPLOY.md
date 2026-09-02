# Deploy em produção (porta 3301 + PM2)

Passo a passo pra subir o app no servidor.

## 1. Código no servidor

```bash
git clone <repo-url> subvencao-2026
cd subvencao-2026
git checkout main
git pull
```

## 2. Variáveis de ambiente

Copie o exemplo e preencha com os valores reais de produção:

```bash
cp .env.production.example .env.production
```

Edite `.env.production` e preencha:

- `BASE_URL`, `NEXT_PUBLIC_APP_URL` — domínio real de produção
- `NEXT_PUBLIC_MAPTILER_KEY` — chave do MapTiler
- `ENVIRONMENT="production"`

O Next.js carrega `.env.production` automaticamente quando `NODE_ENV=production` (build e start).

## 3. Instalar dependências

```bash
npm install
```

## 4. Build

```bash
npm run build
```

## 5. Subir com PM2

O script `start` do `package.json` já sobe na porta 3301 (`next start -p 3301`):

```bash
pm2 start npm --name subvencao2026 -- start
```

Persistir entre restarts do servidor:

```bash
pm2 save
pm2 startup
# rode o comando que o pm2 startup imprimir (precisa de sudo)
```

## 6. Verificar

```bash
pm2 status
pm2 logs subvencao2026
curl -I http://localhost:3301
```

## Atualizações futuras (deploy de nova versão)

```bash
git pull
npm install
npm run build
pm2 restart subvencao2026
```

---

## Alternativa: build standalone

O `next.config.ts` tem `output: "standalone"`, que gera também `.next/standalone/server.js` — um bundle enxuto com `node_modules` mínimo embutido, pensado pra deploys sem o repositório completo (ex: Docker). Não é obrigatório usar; a abordagem acima (`next start` via PM2) já funciona normalmente com esse config.

Se preferir essa rota, depois do `npm run build`:

```bash
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/

PORT=3301 pm2 start .next/standalone/server.js --name subvencao2026
```

Nesse caso o `.env.production` precisa estar acessível na pasta `.next/standalone/` também (copie-o pra lá), já que o standalone não lê o restante do projeto.
