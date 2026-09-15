# Deploy em produção (porta 3301 + PM2)

Passo a passo pra subir o app no servidor.

> O `next.config.ts` usa `output: "standalone"`. A partir do Next 16, `next start` **não funciona** mais com esse config — é obrigatório rodar `node .next/standalone/server.js`. O script `build` já copia os assets necessários (`public/` e `.next/static/`) pra dentro de `.next/standalone/` via `postbuild`, e o script `start` já aponta pro server.js standalone.

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

Isso roda `next build` e, em seguida (via `postbuild`), copia `public/` e `.next/static/` pra `.next/standalone/`.

## 5. Copiar o `.env.production` pro standalone

O `.next/standalone/server.js` roda isolado, sem o resto do projeto — ele só lê variáveis de ambiente que estiverem na própria pasta:

```bash
cp .env.production .next/standalone/.env.production
```

> Repita esse passo a cada novo build (o `.next/standalone` é recriado do zero).

## 6. Subir com PM2

```bash
PORT=3301 pm2 start .next/standalone/server.js --name subvencao2026
```

Persistir entre restarts do servidor:

```bash
pm2 save
pm2 startup
# rode o comando que o pm2 startup imprimir (precisa de sudo)
```

## 7. Verificar

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
cp .env.production .next/standalone/.env.production
pm2 restart subvencao2026
```

---

## Corrigindo um processo já rodando com `next start` (erro "does not work with output: standalone")

Se o PM2 foi iniciado antes com `pm2 start npm -- start` (rodando `next start`), o log vai mostrar:

```
⚠ "next start" does not work with "output: standalone" configuration. Use "node .next/standalone/server.js" instead.
```

Pra corrigir, no servidor:

```bash
pm2 delete subvencao2026

git pull
npm install
npm run build
cp .env.production .next/standalone/.env.production

PORT=3301 pm2 start .next/standalone/server.js --name subvencao2026
pm2 save
```
