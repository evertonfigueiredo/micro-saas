export function createEmailMarketingContent(
  name: string,
  ebookLink: string,
  ebookTitle: string,
) {
  return `
      <html>
        <head>
          <style>
            /* Adicione estilos CSS aqui para estilizar o e-mail */
          </style>
        </head>
        <body>
          <h1>Olá ${name},</h1>
          <p>Confira nosso novo eBook!</p>
          <p><a href="${ebookLink}" download="${ebookTitle}.pdf">Clique aqui para baixar o eBook</a></p>
          <p>Esperamos que você goste!</p>
          <p>Atenciosamente,</p>
          <p>Sua equipe de marketing</p>
        </body>
      </html>
    `
}
