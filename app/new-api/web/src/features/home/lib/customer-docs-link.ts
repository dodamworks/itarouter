// Preserve custom documentation destinations; only resolve guide paths for the docs app.
export function customerDocsLink(configuredUrl: unknown, guide?: string) {
  const base =
    typeof configuredUrl === 'string' && configuredUrl
      ? configuredUrl
      : '/about'
  if (!guide) return base
  try {
    const url = new URL(base, 'https://itarouter.com')
    if (url.pathname.replace(/\/$/, '') !== '/docs') return base
    url.pathname = `/docs/${guide}`
    url.search = ''
    url.hash = ''
    return base.startsWith('/') ? url.pathname : url.href
  } catch {
    return base
  }
}
