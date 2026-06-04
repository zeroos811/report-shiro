# 🧺 Shiro Closing v2

Aplikasi closing kasir harian Shiro Clean Laundry.
**Next.js 14 · Tailwind CSS · Supabase**

---

## 🚀 Setup & Deploy (Gratis)

### Step 1 — Supabase

1. Daftar di https://supabase.com → buat project baru
2. Buka **SQL Editor** → paste isi `supabase-schema.sql` → klik **Run**
3. Catat dari **Settings → API**:
   - Project URL
   - anon public key

### Step 2 — Push ke GitHub

```bash
git init
git add .
git commit -m "init"
# Buat repo di github.com/new lalu:
git remote add origin https://github.com/USERNAME/shiro-closing.git
git push -u origin main
```

### Step 3 — Deploy ke Vercel

1. Login https://vercel.com → **Add New Project** → import repo GitHub
2. Tambahkan **Environment Variables**:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key Supabase |
| `NEXT_PUBLIC_WA_NUMBER` | Nomor WA tanpa + (contoh: `6281234567890`) |
| `AUTH_SECRET` | String random panjang (contoh: `shiro-rahasia-2024-xyz`) |
| `NEXTAUTH_URL` | URL Vercel (contoh: `https://shiro-closing.vercel.app`) |

3. Klik **Deploy**

---

## 🔐 Login Default

| Username | Password |
|----------|----------|
| `admin`  | `shiro123` |

> **Wajib ubah password** setelah pertama login via Admin → Pengaturan

---

## 📱 Akses

| Halaman | URL | Siapa |
|---------|-----|-------|
| Beranda | `/` | Semua |
| Form Closing | `/kasir` | Kasir (tanpa login) |
| Admin | `/admin` | Admin saja |

---

## ✅ Fitur

- Form closing: Shift 1 & Shift 2
- Shift 2 otomatis hitung selisih dari Shift 1
- Setoran Tunai & Non Tunai otomatis
- Kirim laporan ke WhatsApp
- Dashboard: omzet harian, bulanan, target
- Laporan: filter tanggal, bulan, custom range
- Export Excel (CSV)
- Admin: lihat, edit, hapus laporan
