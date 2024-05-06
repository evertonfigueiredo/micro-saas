export function getUrl(path?: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || ''
  const normalizedPath = path && !path.startsWith('/') ? `/${path}` : path || ''

  // Verificar se baseUrl é uma URL absoluta válida
  const isAbsoluteUrl = /^https?:\/\//i.test(baseUrl)

  // Se baseUrl já for uma URL absoluta válida, retornar a URL completa
  if (isAbsoluteUrl) {
    return `${baseUrl}${normalizedPath}`
  } else {
    // Caso contrário, retornar uma URL absoluta válida com um esquema padrão (por exemplo, "https://")
    return `https://${baseUrl}${normalizedPath}`
  }
}
