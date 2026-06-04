export interface LineItem {
  nominal: number
  keterangan: string
  jenis: 'tunai' | 'nontunai'
}

export interface Report {
  id: string
  kasir: string
  report_date: string
  shift: 1 | 2
  submitted_at: string
  tunai: number; qris: number; transfer: number; edc: number
  raw_tunai?: number; raw_qris?: number; raw_transfer?: number; raw_edc?: number
  pemasukan: LineItem[]
  pengeluaran: LineItem[]
  total_pemasukan: number
  total_pengeluaran: number
  setoran_tunai: number
  setoran_non_tunai: number
  total_omzet: number
  omzet_bersih: number
  s1_ref?: { tunai:number; qris:number; transfer:number; edc:number } | null
  created_at?: string
  updated_at?: string
}

export interface Target {
  id?: string
  type: 'daily' | 'monthly'
  amount: number
  month?: number
  year?: number
}
