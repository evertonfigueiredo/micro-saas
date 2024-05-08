Esse projeto foi desenvolvido usando o [Next.js](https://nextjs.org/) iniciando ele com [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Configurando Variáveis de Ambiente

Para começar você deve preencher as variaveis de ambiente conforme o .env-exemple

Aqui você irar colocar a url do seu banco de dados PostgreSQL
```bash
DATABASE_URL=
```

Logo em seguida você ira adicionar as informações referentes ao sistema de envio de e-mails

```bash
EMAIL_SERVER_USER=
EMAIL_SERVER_PASSWORD=
EMAIL_SERVER_HOST=
EMAIL_SERVER_PORT=
EMAIL_FROM=
```

Agora ira definir um secret
```bash
AUTH_SECRET=
```

Neste item você deve definir a url do seu projeto, caso seja localhost ou em um domínio.
```bash
NEXT_PUBLIC_APP_URL=
```
Para o sistema de pagamento usaremos o Stripe, ele que ficara responsável por atribuir os planos aos usuários quando forem criados ou atualizados. 
```bash
STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```
Por ultimo também teremos a configuração do REDIS, onde iremos utilizar nosso sistema de filas.

```bash
REDIS_HOST=
REDIS_PORT=
```
## Iniciando projeto
Para começarmos a iniciar o projeto primeiro iremos instalar os pacotes utilizando o NPM.

```
npm install
```

A pois isso podemos iniciar o projeto utilizando o comando:
```
npm run dev
```

Para que possamos iniciar o sistema de filas para envio de e-mail, iremos utilizar o comando abaixo:

```
npm run worker:send
```

## Configurando o WebHook do Stripe

Para que o sistema de pagamento da Stripe funcione corretamente siga o passo a passo no site deles [bem aqui](https://docs.stripe.com/webhooks?locale=pt-BR#test-webhook).

