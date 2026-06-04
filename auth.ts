import { cookies } from 'next/headers'

const COOKIE = 'sc_admin'
const SECRET = process.env.AUTH_SECRET || 'shiro-dev-secret'

export interface Session { id: string; username: string; iat: number }

export function createToken(p: Omit<Session,'iat'>): string {
  const d: Session = { ...p, iat: Date.now() }
  return Buffer.from(JSON.stringify(d)+'|'+SECRET).toString('base64url')
}

export function verifyToken(t: string): Session|null {
  try {
    const dec = Buffer.from(t,'base64url').toString()
    const sep = dec.lastIndexOf('|'+SECRET)
    if(sep===-1) return null
    const s: Session = JSON.parse(dec.slice(0,sep))
    if(Date.now()-s.iat > 7*86400*1000) return null
    return s
  } catch { return null }
}

export function getSession(): Session|null {
  try { const t=cookies().get(COOKIE)?.value; return t?verifyToken(t):null }
  catch { return null }
}

export function verifyPw(pw: string, stored: string): boolean {
  return stored===pw ||
    (stored==='shiro123_plaintext_ganti_setelah_login' && pw==='shiro123')
}
