export function toRp(n: number): string {
  return new Intl.NumberFormat('id-ID', { style:'currency', currency:'IDR', minimumFractionDigits:0, maximumFractionDigits:0 }).format(n)
}
export function parseRp(v: string): number { return parseInt(v.replace(/\D/g,'')||'0',10)||0 }
export function todayStr(): string {
  const d=new Date()
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}
export function monthStr(): string {
  const d=new Date()
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`
}
export function nowStr(): string {
  const n=new Date()
  return `${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')} WIB`
}
export function fmtDate(s: string): string {
  try { return new Date(s+'T00:00:00').toLocaleDateString('id-ID',{weekday:'long',day:'numeric',month:'long',year:'numeric'}) }
  catch { return s }
}
export function fmtDateShort(s: string): string {
  try { const [y,m,d]=s.split('-'); return `${d}/${m}/${y}` } catch { return s }
}
