/* Generator isi laporan — menurunkan kolom + baris dari jenis laporan & dummy data.
 * Setiap laporan punya karakteristik sendiri: akun, jurnal, per pelanggan, per barang,
 * grafik, dll. Nilai deterministik (hash label) supaya stabil antar render.
 */

import {
  dummyAccounts, dummyCustomers, dummySuppliers, dummyProducts, dummyWarehouses,
  dummyJournalEntries, dummyBankRecords,
} from "./accounting-dummy-data"

export interface ReportColumn { key: string; idLabel: string; enLabel: string; align?: "right" }
export interface ReportRow { cells: (string | number)[]; bold?: boolean; group?: boolean; total?: boolean }
export interface GeneratedTable { kind: "table"; columns: ReportColumn[]; rows: ReportRow[] }
export interface GeneratedChart { kind: "chart"; series: { label: string; value: number }[] }
export type GeneratedReport = GeneratedTable | GeneratedChart

export interface ReportOptions {
  dari: string; sd: string; cabang: string
  customer: string; supplier: string; product: string; salesperson: string
  warehouse: string; account: string; bank: string; employee: string
  year: string; month: string
}

/* ── deterministic pseudo-random ── */
function det(seed: string, salt = 0): number {
  let h = 0
  const s = seed + salt
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return (h % 1000) / 1000
}
function noise(seed: string, base: number, salt = 0): number {
  return Math.round(base * (0.75 + det(seed, salt) * 0.5))
}

/* ── built-in entities yang belum ada di dummy data ── */
const EMPLOYEES = [
  { nama: "Budi Santoso", gaji: 8500000 }, { nama: "Andi Wijaya", gaji: 7500000 },
  { nama: "Siti Rahma", gaji: 9000000 }, { nama: "Dewi Lestari", gaji: 6500000 },
  { nama: "Rudi Hartono", gaji: 7000000 },
]
const SALESPEOPLE = ["Budi Hartono", "Andi Wijaya", "Siti Rahma", "Dewi Lestari", "Rudi Santoso"]
export const EMPLOYEE_NAMES = EMPLOYEES.map(e => e.nama)
export const SALESPEOPLE_NAMES = SALESPEOPLE
const MONTHS_ID = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]

const col = (key: string, idLabel: string, enLabel: string, align?: "right"): ReportColumn => ({ key, idLabel, enLabel, align })

function filterEntity<T extends { nama: string }>(list: T[], pick: string): T[] {
  return pick && pick !== "__all__" ? list.filter(x => x.nama === pick) : list
}

/* ── archetypes ── */
function accountsReport(): GeneratedTable {
  const cols = [col("kode", "Kode Perkiraan", "Account Code"), col("nama", "Nama", "Name"), col("tipe", "Tipe Akun", "Account Type"), col("saldo", "Saldo", "Balance", "right")]
  const rows: ReportRow[] = dummyAccounts.map(a => ({ cells: [a.kode, a.nama, a.tipeAkun, a.saldo] }))
  rows.push({ cells: ["", "TOTAL", "", dummyAccounts.reduce((s, a) => s + a.saldo, 0)], total: true })
  return { kind: "table", columns: cols, rows }
}

function balanceReport(): GeneratedTable {
  const cols = [col("kode", "Kode", "Code"), col("nama", "Nama Akun", "Account Name"), col("saldo", "Saldo", "Balance", "right")]
  const groups: [string, string, string[]][] = [
    ["report.groupAset", "A", ["Kas & Bank", "Piutang", "Persediaan", "Aset Lancar Lainnya", "Aset Tetap"]],
    ["report.groupKewajiban", "K", ["Kewajiban"]],
    ["report.groupModal", "M", ["Modal"]],
  ]
  const rows: ReportRow[] = []
  let grand = 0
  for (const [g, gk, types] of groups) {
    rows.push({ cells: [gk, g, ""], group: true })
    const accs = dummyAccounts.filter(a => types.includes(a.tipeAkun))
    for (const a of accs) { rows.push({ cells: [a.kode, a.nama, a.saldo] }); grand += a.saldo }
  }
  rows.push({ cells: ["", "TOTAL", grand], total: true })
  return { kind: "table", columns: cols, rows }
}

function pnlReport(): GeneratedTable {
  const cols = [col("nama", "Akun", "Account"), col("nilai", "Nilai", "Amount", "right")]
  const rows: ReportRow[] = []
  let pendapatan = 0, beban = 0
  for (const g of ["report.groupPendapatan", "report.groupBeban"]) {
    const types = g === "report.groupPendapatan" ? ["Pendapatan"] : ["Beban", "Beban Lain-lain"]
    rows.push({ cells: [g, ""], group: true })
    for (const a of dummyAccounts.filter(x => types.includes(x.tipeAkun))) {
      const v = noise(a.nama, 90000000)
      rows.push({ cells: [a.nama, v] })
      if (g === "report.groupPendapatan") pendapatan += v; else beban += v
    }
  }
  const laba = pendapatan - beban
  rows.push({ cells: [laba >= 0 ? "LABA BERSIH" : "RUGI BERSIH", Math.abs(laba)], bold: true, total: true })
  return { kind: "table", columns: cols, rows }
}

function journalReport(): GeneratedTable {
  const cols = [col("tgl", "Tanggal", "Date"), col("no", "No. Jurnal", "Journal No."), col("ket", "Keterangan", "Description"), col("debit", "Debit", "Debit", "right"), col("kredit", "Kredit", "Credit", "right")]
  const rows: ReportRow[] = dummyJournalEntries.map((j) => ({
    cells: [j.tanggal, j.nomor, j.keterangan, j.total, 0],
  }))
  rows.push({ cells: ["", "", "TOTAL", dummyJournalEntries.reduce((s, j) => s + j.total, 0), 0], total: true })
  return { kind: "table", columns: cols, rows }
}

function customersReport(title: string, o: ReportOptions): GeneratedTable {
  const aging = /Umur Piutang/.test(title)
  const cols = aging
    ? [col("nama", "Pelanggan", "Customer"), col("kota", "Kota", "City"), col("belum", "Belum Jatuh Tempo", "Not Yet Due", "right"), col("lama", "Terlambat", "Overdue", "right"), col("total", "Total", "Total", "right")]
    : [col("kode", "Kode", "Code"), col("nama", "Pelanggan", "Customer"), col("kota", "Kota", "City"), col("saldo", "Nilai", "Value", "right")]
  const rows: ReportRow[] = filterEntity(dummyCustomers, o.customer).map(c => {
    const total = Math.round(c.saldo * (0.9 + det(c.nama) * 0.2))
    if (aging) {
      const overdue = Math.round(total * det(c.nama, 1))
      return { cells: [c.nama, c.kota, total - overdue, overdue, total] }
    }
    return { cells: [c.idPelanggan, c.nama, c.kota, total] }
  })
  const total = rows.reduce((s, r) => s + (r.cells[r.cells.length - 1] as number), 0)
  rows.push({ cells: [...Array(cols.length - 1).fill(""), total], total: true })
  return { kind: "table", columns: cols, rows }
}

function suppliersReport(title: string, o: ReportOptions): GeneratedTable {
  const cols = [col("kode", "Kode", "Code"), col("nama", "Pemasok", "Supplier"), col("kota", "Kota", "City"), col("saldo", "Nilai", "Value", "right")]
  const rows: ReportRow[] = filterEntity(dummySuppliers, o.supplier).map(s => ({
    cells: [s.idPemasok, s.nama, s.kota, Math.round(s.saldo * (0.9 + det(s.nama) * 0.2))],
  }))
  const total = rows.reduce((sum, r) => sum + (r.cells[3] as number), 0)
  rows.push({ cells: ["", "", "TOTAL", total], total: true })
  return { kind: "table", columns: cols, rows }
}

function productsReport(title: string, o: ReportOptions): GeneratedTable {
  const persediaan = /Persediaan|Stok|Kartu|Nilai|Barang/i.test(title)
  const cols = [col("kode", "Kode", "Code"), col("nama", "Barang", "Item"), col("kat", "Kategori", "Category"), col("qty", "Qty", "Qty", "right"), col("nilai", "Nilai", "Value", "right")]
  const rows: ReportRow[] = filterEntity(dummyProducts, o.product).map(p => {
    const qty = persediaan ? p.stok : Math.max(1, Math.round(p.stok * det(p.kode)))
    const harga = persediaan ? p.hargaBeli : p.hargaJual
    return { cells: [p.kode, p.nama, p.kategori, qty, qty * harga] }
  })
  const total = rows.reduce((s, r) => s + (r.cells[4] as number), 0)
  rows.push({ cells: ["", "", "TOTAL", rows.reduce((s, r) => s + (r.cells[3] as number), 0), total], total: true })
  return { kind: "table", columns: cols, rows }
}

function salespeopleReport(title: string, o: ReportOptions): GeneratedTable {
  const komisi = /Komisi/.test(title)
  const cols = [col("nama", "Tenaga Penjual", "Salesperson"), col("nilai", "Penjualan", "Sales", "right")]
  if (komisi) cols.push(col("komisi", "Komisi", "Commission", "right"))
  const rows: ReportRow[] = SALESPEOPLE.filter(s => !o.salesperson || o.salesperson === "__all__" || o.salesperson === s).map(s => {
    const nilai = noise(s, 250000000)
    const cells: (string | number)[] = [s, nilai]
    if (komisi) cells.push(Math.round(nilai * 0.025))
    return { cells }
  })
  return { kind: "table", columns: cols, rows }
}

function warehousesReport(title: string, o: ReportOptions): GeneratedTable {
  const cols = [col("nama", "Gudang", "Warehouse"), col("pj", "Penanggung Jawab", "Person in Charge"), col("jumlah", "Jumlah Barang", "Item Count", "right"), col("nilai", "Nilai Persediaan", "Inventory Value", "right")]
  const rows: ReportRow[] = filterEntity(dummyWarehouses, o.warehouse).map(w => {
    const items = 6 + Math.round(det(w.nama) * 8)
    return { cells: [w.nama, w.penanggungJawab, items, items * 4500000] }
  })
  rows.push({ cells: ["", "TOTAL", rows.reduce((s, r) => s + (r.cells[2] as number), 0), rows.reduce((s, r) => s + (r.cells[3] as number), 0)], total: true })
  return { kind: "table", columns: cols, rows }
}

function banksReport(title: string): GeneratedTable {
  const rekening = /Rekening|Histori|Rekonsiliasi|Transaksi/.test(title)
  if (rekening) {
    const cols = [col("tgl", "Tanggal", "Date"), col("ket", "Keterangan", "Description"), col("no", "No. Sumber", "Source No."), col("debit", "Debit", "Debit", "right"), col("kredit", "Kredit", "Credit", "right"), col("saldo", "Saldo", "Balance", "right")]
    const rows: ReportRow[] = dummyBankRecords.map(b => ({ cells: [b.tanggal, b.keterangan, b.noSumber, b.tipe === "Debit" ? Math.abs(b.mutasi) : 0, b.tipe === "Kredit" ? b.mutasi : 0, b.saldo] }))
    return { kind: "table", columns: cols, rows }
  }
  const cols = [col("kode", "Kode", "Code"), col("nama", "Akun Kas & Bank", "Cash & Bank Account"), col("saldo", "Saldo", "Balance", "right")]
  const rows: ReportRow[] = dummyAccounts.filter(a => a.tipeAkun === "Kas & Bank").map(a => ({ cells: [a.kode, a.nama, a.saldo] }))
  rows.push({ cells: ["", "TOTAL", rows.reduce((s, r) => s + (r.cells[2] as number), 0)], total: true })
  return { kind: "table", columns: cols, rows }
}

function employeesReport(title: string, o: ReportOptions): GeneratedTable {
  const pph = /PPh|Pajak Penghasilan/.test(title)
  const cols = [col("nama", "Karyawan", "Employee"), col("gaji", "Gaji", "Salary", "right")]
  if (pph) cols.push(col("pph", "PPh 21", "Income Tax", "right"))
  const rows: ReportRow[] = EMPLOYEES.filter(e => !o.employee || o.employee === "__all__" || o.employee === e.nama).map(e => {
    const cells: (string | number)[] = [e.nama, e.gaji]
    if (pph) cells.push(Math.round(e.gaji * 0.05))
    return { cells }
  })
  return { kind: "table", columns: cols, rows }
}

function taxReport(): GeneratedTable {
  const cols = [col("no", "No. Faktur", "Invoice No."), col("tgl", "Tanggal", "Date"), col("dpp", "DPP", "Tax Base", "right"), col("ppn", "PPN 11%", "VAT 11%", "right")]
  const rows: ReportRow[] = [
    { cells: ["FP-2026-0001", "02/08/2026", 85000000, 9350000] },
    { cells: ["FP-2026-0002", "04/08/2026", 61000000, 6710000] },
    { cells: ["FP-2026-0003", "06/08/2026", 124000000, 13640000] },
  ]
  rows.push({ cells: ["", "TOTAL", rows.reduce((s, r) => s + (r.cells[2] as number), 0), rows.reduce((s, r) => s + (r.cells[3] as number), 0)], total: true })
  return { kind: "table", columns: cols, rows }
}

function assetsReport(): GeneratedTable {
  const cols = [col("kode", "Kode", "Code"), col("nama", "Aset Tetap", "Fixed Asset"), col("tipe", "Tipe", "Type"), col("nilai", "Nilai Buku", "Book Value", "right")]
  const rows: ReportRow[] = dummyAccounts.filter(a => a.tipeAkun === "Aset Tetap").map(a => ({ cells: [a.kode, a.nama, a.tipeAkun, a.saldo] }))
  rows.push({ cells: ["", "TOTAL", "", rows.reduce((s, r) => s + (r.cells[3] as number), 0)], total: true })
  return { kind: "table", columns: cols, rows }
}

function simpleReport(title: string): GeneratedTable {
  const cols = [col("nama", "Nama", "Name"), col("ket", "Keterangan", "Description")]
  const data: Record<string, [string, string][]> = {
    "Daftar FOB": [["FOB Jakarta", "Free on Board - Jakarta"], ["FOB Surabaya", "Free on Board - Surabaya"]],
    "Daftar Pajak": [["PPN 11%", "Pajak Pertambahan Nilai"], ["PPh 23", "Pajak Penghasilan Pasal 23"], ["PPh 21", "Pajak Penghasilan Pasal 21"]],
    "Daftar Pengiriman": [["Darat", "Pengiriman via darat"], ["Laut", "Pengiriman via laut"], ["Udara", "Pengiriman via udara"]],
    "Daftar Karyawan": EMPLOYEES.map(e => [e.nama, "Karyawan"] as [string, string]),
    "Daftar Log Aktifitas": [["2026-08-06 08:12", "Login oleh Admin"], ["2026-08-06 07:45", "Buat Pesanan Pembelian PO/2026/08/002"], ["2026-08-05 16:30", "Cetak laporan Laba Rugi"], ["2026-08-05 14:02", "Tambah pelanggan baru"]],
    "Daftar Pengguna per Cabang": [["Admin Pusat", "Cabang Jakarta"], ["Kasir", "Cabang Bandung"], ["Operator Gudang", "Cabang Surabaya"], ["Supervisor", "Cabang Jakarta"]],
  }
  const rows: ReportRow[] = (data[title] ?? [["-", "-"]]).map(d => ({ cells: d }))
  return { kind: "table", columns: cols, rows }
}

function chartReport(title: string): GeneratedChart {
  let series: { label: string; value: number }[]
  if (/Porsi Penjualan per Barang/.test(title)) {
    series = dummyProducts.slice(0, 8).map(p => ({ label: p.nama.replace("SCW ", ""), value: Math.round(p.stok * p.hargaJual * det(p.kode)) }))
  } else if (/Porsi Penjualan per Pelanggan/.test(title)) {
    series = dummyCustomers.map(c => ({ label: c.nama.replace("PT ", "").replace("CV ", "").replace("UD ", ""), value: Math.round(c.saldo * (0.9 + det(c.nama) * 0.3)) }))
  } else if (/Porsi Gaji/.test(title)) {
    series = EMPLOYEES.map(e => ({ label: e.nama.split(" ")[0], value: e.gaji }))
  } else if (/Proyeksi Kas/.test(title)) {
    series = MONTHS_ID.slice(7, 12).map((m, i) => ({ label: m, value: Math.round(270000000 * (1 - i * 0.08)) }))
  } else if (/Umur Piutang|Umur Utang/.test(title)) {
    series = [["Belum Jatuh Tempo", 98000000], ["1-30 hari", 45000000], ["31-60 hari", 22000000], ["61-90 hari", 12000000], ["> 90 hari", 8000000]].map(([l, v]) => ({ label: l as string, value: v as number }))
  } else if (/Rata-rata Pembayaran/.test(title)) {
    series = MONTHS_ID.map((m) => ({ label: m, value: 18 + Math.round(det(m) * 20) }))
  } else {
    // Grafik Penjualan Bulanan
    series = MONTHS_ID.map((m, i) => ({ label: m, value: 90000000 + Math.round(det(m, i) * 160000000) }))
  }
  return { kind: "chart", series }
}

/* ── dispatcher ── */
export function generateReport(catKey: string, title: string, o: ReportOptions): GeneratedReport {
  const t = title
  if (/Grafik|Porsi|Proyeksi/.test(t)) return chartReport(t)
  if (/Daftar Akun Perkiraan|Akun Perkiraan/.test(t)) return accountsReport()
  if (/Neraca/.test(t)) return balanceReport()
  if (/Laba\/Rugi/.test(t)) return pnlReport()
  if (/Jurnal|Buku Besar|Histori Akun/.test(t)) return journalReport()
  if (/per Pelanggan|Piutang|Pelanggan/.test(t)) return customersReport(t, o)
  if (/per Pemasok|Utang|Pemasok/.test(t)) return suppliersReport(t, o)
  if (/per Barang|Barang/.test(t)) return productsReport(t, o)
  if (/per Penjual|Komisi|Tenaga/.test(t)) return salespeopleReport(t, o)
  if (/per Gudang|Gudang|Mutasi/.test(t)) return warehousesReport(t, o)
  if (/per Bank|Bank|Rekening|Kas/.test(t)) return banksReport(t)
  if (/Karyawan|Gaji|PPh/.test(t)) return employeesReport(t, o)
  if (/Pajak|PPN|PPnBM|Bukti Potong/.test(t)) return taxReport()
  if (/Aset/.test(t)) return assetsReport()
  if (catKey === "lain-lain") return simpleReport(t)
  // fallback: coba akun
  return accountsReport()
}
