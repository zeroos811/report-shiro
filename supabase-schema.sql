-- ============================================================
-- SHIRO CLOSING v2 — Supabase Schema
-- Jalankan di: Supabase > SQL Editor > Run
-- ============================================================

-- 1. Tabel laporan closing
CREATE TABLE IF NOT EXISTS reports (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kasir               TEXT NOT NULL,
  report_date         DATE NOT NULL,
  shift               INTEGER NOT NULL CHECK (shift IN (1, 2)),
  submitted_at        TEXT NOT NULL,

  -- Nilai aktual shift (Shift 2 sudah dikurangi Shift 1)
  tunai               BIGINT NOT NULL DEFAULT 0,
  qris                BIGINT NOT NULL DEFAULT 0,
  transfer            BIGINT NOT NULL DEFAULT 0,
  edc                 BIGINT NOT NULL DEFAULT 0,

  -- Raw input (untuk Shift 2: total dari kasir app sebelum dikurangi)
  raw_tunai           BIGINT DEFAULT 0,
  raw_qris            BIGINT DEFAULT 0,
  raw_transfer        BIGINT DEFAULT 0,
  raw_edc             BIGINT DEFAULT 0,

  -- Pemasukan & pengeluaran (JSON array: [{nominal, keterangan, jenis}])
  pemasukan           JSONB NOT NULL DEFAULT '[]',
  pengeluaran         JSONB NOT NULL DEFAULT '[]',
  total_pemasukan     BIGINT NOT NULL DEFAULT 0,
  total_pengeluaran   BIGINT NOT NULL DEFAULT 0,

  -- Kalkulasi setoran
  setoran_tunai       BIGINT NOT NULL DEFAULT 0,
  setoran_non_tunai   BIGINT NOT NULL DEFAULT 0,

  -- Kalkulasi omzet
  total_omzet         BIGINT NOT NULL DEFAULT 0,
  omzet_bersih        BIGINT NOT NULL DEFAULT 0,

  -- Referensi Shift 1 (diisi saat Shift 2)
  s1_ref              JSONB DEFAULT NULL,

  created_at          TIMESTAMPTZ DEFAULT now(),
  updated_at          TIMESTAMPTZ DEFAULT now()
);

-- Index untuk query cepat
CREATE INDEX IF NOT EXISTS reports_date_idx   ON reports (report_date DESC);
CREATE INDEX IF NOT EXISTS reports_shift_idx  ON reports (shift);
CREATE INDEX IF NOT EXISTS reports_kasir_idx  ON reports (kasir);

-- 2. Tabel target omzet
CREATE TABLE IF NOT EXISTS targets (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type        TEXT NOT NULL CHECK (type IN ('daily', 'monthly')),
  amount      BIGINT NOT NULL DEFAULT 0,
  month       INTEGER,
  year        INTEGER,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Seed target default
INSERT INTO targets (type, amount) VALUES ('daily', 2000000)
  ON CONFLICT DO NOTHING;
INSERT INTO targets (type, amount, month, year)
  VALUES ('monthly', 45000000,
    EXTRACT(MONTH FROM now())::int,
    EXTRACT(YEAR  FROM now())::int)
  ON CONFLICT DO NOTHING;

-- 3. Tabel admin
CREATE TABLE IF NOT EXISTS admins (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username    TEXT UNIQUE NOT NULL,
  password    TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Default admin: username=admin, password=shiro123
-- (hash SHA-256 dari 'shiro123' + secret — akan diverifikasi oleh API)
INSERT INTO admins (username, password) VALUES ('admin', 'shiro123_plaintext_ganti_setelah_login')
  ON CONFLICT (username) DO NOTHING;

-- 4. Trigger updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER reports_updated_at
  BEFORE UPDATE ON reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 5. Disable RLS (app pakai server-side auth)
ALTER TABLE reports  DISABLE ROW LEVEL SECURITY;
ALTER TABLE targets  DISABLE ROW LEVEL SECURITY;
ALTER TABLE admins   DISABLE ROW LEVEL SECURITY;

-- ============================================================
-- Selesai. Cek dengan: SELECT * FROM reports LIMIT 5;
-- ============================================================
