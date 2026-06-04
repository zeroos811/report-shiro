'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-dvh bg-white flex flex-col">
      {/* Status-like top padding */}
      <div className="flex-1 flex flex-col items-center justify-center px-7 py-10 gap-0">
        {/* Logo */}
        <div className="w-20 h-20 rounded-3xl bg-red-600 flex items-center justify-center shadow-lg mb-5"
          style={{boxShadow:'0 10px 28px rgba(220,38,38,.30)'}}>
          <svg width="42" height="42" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" viewBox="0 0 24 24">
            <path d="M3 17c2.5-3 4.5-5 8-5s5.5 2 8-1"/>
            <path d="M3 11c2.5-3 4.5-5 8-5s5.5 2 8-1"/>
          </svg>
        </div>
        <p className="text-xs font-bold text-red-600 tracking-widest uppercase mb-2">SHIRO CLEAN LAUNDRY</p>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Shiro Closing</h1>
        <p className="text-sm text-slate-500 text-center leading-relaxed mb-10">
          Laporan closing kasir harian<br/>cepat &amp; langsung ke WhatsApp
        </p>

        {/* Buat Laporan */}
        <Link href="/kasir" className="w-full bg-red-600 rounded-2xl p-5 flex items-center gap-4 mb-3 no-underline active:opacity-90"
          style={{boxShadow:'0 5px 18px rgba(220,38,38,.26)'}}>
          <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-base font-extrabold text-white mb-0.5">Buat Laporan</p>
            <p className="text-xs text-white/70">Isi data closing kasir harian</p>
          </div>
          <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
        </Link>

        <div className="flex items-center gap-3 w-full mb-3">
          <div className="flex-1 h-px bg-slate-200"/>
          <span className="text-xs text-slate-400">atau</span>
          <div className="flex-1 h-px bg-slate-200"/>
        </div>

        {/* Login Admin */}
        <Link href="/admin" className="w-full bg-white rounded-2xl p-4 flex items-center gap-4 border border-slate-200 shadow-sm no-underline active:opacity-90">
          <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" fill="none" stroke="#dc2626" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-extrabold text-slate-900 mb-0.5">Login Admin</p>
            <p className="text-xs text-slate-500">Dashboard &amp; kelola laporan</p>
          </div>
          <svg width="14" height="14" fill="none" stroke="#94a3b8" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
        </Link>
      </div>

      <div className="py-5 text-center">
        <p className="text-xs text-slate-400">© 2024 Shiro Clean Laundry · v2.0</p>
      </div>
    </main>
  )
}
