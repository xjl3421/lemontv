export const useCookie = (name: string, defaultValue?: string) => {
  const getCookie = () => {
    if (typeof document === 'undefined') return defaultValue
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift()
    return defaultValue
  }

  const setCookie = (value: string, days = 7) => {
    if (typeof document === 'undefined') return
    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
  }

  return {
    value: ref(getCookie()),
    setCookie,
    getCookie,
  }
}