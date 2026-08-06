/* Parameter laporan — filter yang relevan per laporan, diturunkan dari nama laporan
 * + default per kategori. Dipakai modal "Parameter Laporan" dan halaman generate.
 * Framework laporan sesungguhnya (dari user) bisa menimpa lewat overrides di bawah.
 */

export type ReportFilter =
  | "date" | "branch" | "customer" | "supplier" | "product" | "salesperson"
  | "warehouse" | "account" | "bank" | "employee" | "year" | "month"

export type ReportRender = "table" | "chart" | "csv"

export interface ReportParams {
  filters: ReportFilter[]
  checkboxes: string[] // i18n keys
  render: ReportRender
}

const CATEGORY_FILTERS: Record<string, ReportFilter[]> = {
  keuangan: ["date", "branch", "year"],
  "buku-besar": ["date", "branch", "account"],
  "kas-bank": ["date", "branch", "bank"],
  piutang: ["date", "branch", "customer"],
  penjualan: ["date", "branch", "customer", "product"],
  "tenaga-penjual": ["date", "branch", "salesperson", "customer"],
  utang: ["date", "branch", "supplier"],
  pembelian: ["date", "branch", "supplier", "product"],
  persediaan: ["date", "branch", "product", "warehouse"],
  gudang: ["date", "branch", "warehouse", "product"],
  "pekerjaan-pesanan": ["date", "branch"],
  manufaktur: ["date", "branch"],
  "aset-tetap": ["date", "branch", "account"],
  pajak: ["date", "branch", "month"],
  pemeriksaan: ["date", "branch"],
  "lain-lain": [],
}

const KEYWORD_FILTERS: [RegExp, ReportFilter][] = [
  [/per Pelanggan|per pelanggan|Pelanggan/i, "customer"],
  [/per Pemasok|per pemasok|Pemasok/i, "supplier"],
  [/per Barang|per barang|Barang/i, "product"],
  [/per Penjual|per penjual/i, "salesperson"],
  [/per Gudang|per gudang/i, "warehouse"],
  [/per Bank|per bank/i, "bank"],
  [/per Akun|per akun|Akun/i, "account"],
  [/Karyawan|per Karyawan/i, "employee"],
  [/per Tahun|Multi Year|Tahunan/i, "year"],
  [/per Bulan|Bulanan|Kuartal|Multi Periode/i, "month"],
]

const FINANCIAL_CB = [
  "report.cb.totalOnly", "report.cb.parentAccount", "report.cb.childAccount",
  "report.cb.zeroBalance", "report.cb.parentBalance",
]

export function getReportParams(catKey: string, title: string): ReportParams {
  const filters = new Set<ReportFilter>(CATEGORY_FILTERS[catKey] ?? ["date", "branch"])
  for (const [re, f] of KEYWORD_FILTERS) {
    if (re.test(title)) filters.add(f)
  }
  // laporan "gaji karyawan" sudah dapat employee via keyword; buang filter tahun/bulan duplikat
  const checkboxes: string[] = []
  if (/Belum Proses/i.test(title)) checkboxes.push("report.cb.pendingOnly")
  if (/Belum Lunas/i.test(title)) checkboxes.push("report.cb.unpaidOnly")
  if ((catKey === "keuangan" || catKey === "buku-besar") && /Laba\/Rugi|Neraca|Arus Kas|Rasio|Jurnal|Buku Besar/i.test(title)) {
    checkboxes.push(...FINANCIAL_CB)
  }
  let render: ReportRender = "table"
  if (/Grafik|Porsi|Proyeksi/i.test(title)) render = "chart"
  else if (/\(CSV\)/i.test(title)) render = "csv"
  return { filters: [...filters], checkboxes, render }
}
