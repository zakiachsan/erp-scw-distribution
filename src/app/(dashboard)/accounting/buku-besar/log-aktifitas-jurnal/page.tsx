"use client"

import { useState, useMemo } from "react"

/* INTEGRASI: cross-module — Log Aktifitas mencakup jurnal Buku Besar,
 * Kas & Bank, Penjualan, Pembelian. Pakai dummy data (no real DB).
 */

interface ActivityLog {
  id: string
  tanggal: string
  jam: string
  pengguna: string
  peran: "Admin" | "Accountant" | "Kasir" | "Sales" | "Finance Manager"
  tipeTindakan:
    | "Buat Jurnal"
    | "Edit Jurnal"
    | "Hapus Jurnal"
    | "Posting Jurnal"
    | "Unpost Jurnal"
    | "Buat Pembayaran"
    | "Buat Penerimaan"
    | "Buat Transfer Bank"
    | "Buat Faktur"
    | "Edit Master Akun"
    | "Buat Aset Tetap"
    | "Buat Disposisi Aset"
    | "Posting ke Buku Besar"
  noReferensi: string
  modul: "Buku Besar" | "Kas & Bank" | "Penjualan" | "Pembelian" | "Aset Tetap" | "Persediaan"
  keterangan: string
}

const DUMMY_USERS = ["Andi Wijaya", "Siti Rahayu", "Budi Santoso", "Dewi Lestari", "Rian Pratama", "Maya Anggraini"]

const DUMMY_LOGS: ActivityLog[] = [
  { id: "log-001", tanggal: "03/08/2026", jam: "14:32:15", pengguna: "Andi Wijaya",     peran: "Admin",            tipeTindakan: "Posting ke Buku Besar",  noReferensi: "JV-2026-0312", modul: "Buku Besar",  keterangan: "Posting journal entry bulan Juli 2026 — biaya penyusutan" },
  { id: "log-002", tanggal: "03/08/2026", jam: "13:18:42", pengguna: "Siti Rahayu",     peran: "Accountant",       tipeTindakan: "Buat Pembayaran",       noReferensi: "PAY-2026-0089", modul: "Kas & Bank",  keterangan: "Pembayaran PO-2026-0042 ke PT Maju Jaya — Rp 12.500.000" },
  { id: "log-003", tanggal: "03/08/2026", jam: "11:45:08", pengguna: "Budi Santoso",    peran: "Kasir",            tipeTindakan: "Buat Penerimaan",       noReferensi: "RCP-2026-0078", modul: "Kas & Bank",  keterangan: "Penerimaan pembayaran INV-2026-0201 dari CV Sumber Rezeki" },
  { id: "log-004", tanggal: "03/08/2026", jam: "10:22:31", pengguna: "Andi Wijaya",     peran: "Admin",            tipeTindakan: "Buat Jurnal",          noReferensi: "JV-2026-0311", modul: "Buku Besar",  keterangan: "Jurnal umum — accrual biaya listrik bulan Juli" },
  { id: "log-005", tanggal: "03/08/2026", jam: "09:55:17", pengguna: "Dewi Lestari",    peran: "Sales",            tipeTindakan: "Buat Faktur",          noReferensi: "INV-2026-0220", modul: "Penjualan",   keterangan: "Faktur penjualan ke 28 Auto Detailing — 5 item, Rp 8.750.000" },
  { id: "log-006", tanggal: "02/08/2026", jam: "16:48:55", pengguna: "Rian Pratama",    peran: "Finance Manager",  tipeTindakan: "Edit Master Akun",     noReferensi: "ACC-1501",     modul: "Buku Besar",  keterangan: "Update akun Peralatan Kantor — perubahan nama" },
  { id: "log-007", tanggal: "02/08/2026", jam: "15:30:22", pengguna: "Maya Anggraini",  peran: "Accountant",       tipeTindakan: "Posting Jurnal",       noReferensi: "JV-2026-0310", modul: "Buku Besar",  keterangan: "Posting retur pembelian RR-2026-0015" },
  { id: "log-008", tanggal: "02/08/2026", jam: "14:12:08", pengguna: "Siti Rahayu",     peran: "Accountant",       tipeTindakan: "Buat Transfer Bank",  noReferensi: "TRF-2026-0023", modul: "Kas & Bank",  keterangan: "Transfer BCA ke Mandiri Rp 25.000.000 — dana operasional" },
  { id: "log-009", tanggal: "02/08/2026", jam: "11:05:43", pengguna: "Budi Santoso",    peran: "Kasir",            tipeTindakan: "Buat Pembayaran",      noReferensi: "PAY-2026-0088", modul: "Kas & Bank",  keterangan: "Pembayaran gaji karyawan — Rp 45.000.000" },
  { id: "log-010", tanggal: "02/08/2026", jam: "10:18:29", pengguna: "Andi Wijaya",     peran: "Admin",            tipeTindakan: "Buat Aset Tetap",     noReferensi: "FA-2026-0008", modul: "Aset Tetap",  keterangan: "Registrasi Laptop Dell XPS — Rp 18.500.000, kategori Elektronik" },
  { id: "log-011", tanggal: "01/08/2026", jam: "16:55:11", pengguna: "Dewi Lestari",    peran: "Sales",            tipeTindakan: "Edit Jurnal",         noReferensi: "JV-2026-0309", modul: "Buku Besar",  keterangan: "Edit keterangan jurnal diskon penjualan" },
  { id: "log-012", tanggal: "01/08/2026", jam: "15:40:38", pengguna: "Rian Pratama",    peran: "Finance Manager",  tipeTindakan: "Buat Jurnal",          noReferensi: "JV-2026-0308", modul: "Buku Besar",  keterangan: "Jurnal adjustment stok opname gudang Jakarta" },
  { id: "log-013", tanggal: "01/08/2026", jam: "14:22:05", pengguna: "Siti Rahayu",     peran: "Accountant",       tipeTindakan: "Posting Jurnal",       noReferensi: "JV-2026-0307", modul: "Buku Besar",  keterangan: "Posting selisih kurs mata uang asing" },
  { id: "log-014", tanggal: "01/08/2026", jam: "13:11:47", pengguna: "Maya Anggraini",  peran: "Accountant",       tipeTindakan: "Buat Pembayaran",      noReferensi: "PAY-2026-0087", modul: "Kas & Bank",  keterangan: "Pembayaran DP 30% PO-2026-0051 ke CV Teknik Utama" },
  { id: "log-015", tanggal: "01/08/2026", jam: "11:33:19", pengguna: "Andi Wijaya",     peran: "Admin",            tipeTindakan: "Buat Disposisi Aset", noReferensi: "DSP-2026-0002", modul: "Aset Tetap",  keterangan: "Disposisi printer rusak — nilai buku Rp 0" },
  { id: "log-016", tanggal: "31/07/2026", jam: "16:48:02", pengguna: "Budi Santoso",    peran: "Kasir",            tipeTindakan: "Buat Penerimaan",     noReferensi: "RCP-2026-0077", modul: "Kas & Bank",  keterangan: "Penerimaan pelunasan INV-2026-0188 dari Kios Warna" },
  { id: "log-017", tanggal: "31/07/2026", jam: "15:22:14", pengguna: "Dewi Lestari",    peran: "Sales",            tipeTindakan: "Buat Faktur",          noReferensi: "INV-2026-0219", modul: "Penjualan",   keterangan: "Faktur Dresscoated — 3 produk, Rp 4.250.000" },
  { id: "log-018", tanggal: "31/07/2026", jam: "14:05:51", pengguna: "Siti Rahayu",     peran: "Accountant",       tipeTindakan: "Unpost Jurnal",       noReferensi: "JV-2026-0306", modul: "Buku Besar",  keterangan: "Unpost jurnal koreksi kesalahan input nominal" },
  { id: "log-019", tanggal: "31/07/2026", jam: "11:48:33", pengguna: "Rian Pratama",    peran: "Finance Manager",  tipeTindakan: "Edit Master Akun",     noReferensi: "ACC-4100",     modul: "Buku Besar",  keterangan: "Tambah sub-akun Pendapatan Jasa Instalasi" },
  { id: "log-020", tanggal: "31/07/2026", jam: "10:12:09", pengguna: "Andi Wijaya",     peran: "Admin",            tipeTindakan: "Hapus Jurnal",        noReferensi: "JV-2026-0305", modul: "Buku Besar",  keterangan: "Hapus jurnal draft yang belum di-posting" },
  { id: "log-021", tanggal: "30/07/2026", jam: "16:30:25", pengguna: "Maya Anggraini",  peran: "Accountant",       tipeTindakan: "Posting Jurnal",       noReferensi: "JV-2026-0304", modul: "Buku Besar",  keterangan: "Posting amortisasi biaya dibayar dimuka" },
  { id: "log-022", tanggal: "30/07/2026", jam: "15:18:42", pengguna: "Budi Santoso",    peran: "Kasir",            tipeTindakan: "Buat Transfer Bank",  noReferensi: "TRF-2026-0022", modul: "Kas & Bank",  keterangan: "Transfer antar rekening untuk pembayaran vendor" },
  { id: "log-023", tanggal: "30/07/2026", jam: "13:55:08", pengguna: "Dewi Lestari",    peran: "Sales",            tipeTindakan: "Buat Faktur",          noReferensi: "INV-2026-0218", modul: "Penjualan",   keterangan: "Faktur PT Auto Glaze — Rp 15.800.000" },
  { id: "log-024", tanggal: "30/07/2026", jam: "11:25:37", pengguna: "Siti Rahayu",     peran: "Accountant",       tipeTindakan: "Buat Pembayaran",      noReferensi: "PAY-2026-0086", modul: "Kas & Bank",  keterangan: "Pembayaran listrik PLN bulan Juli 2026" },
  { id: "log-025", tanggal: "30/07/2026", jam: "10:08:14", pengguna: "Andi Wijaya",     peran: "Admin",            tipeTindakan: "Buat Jurnal",          noReferensi: "JV-2026-0303", modul: "Buku Besar",  keterangan: "Jurnal closing akhir bulan — provisioning bonus" },
  { id: "log-026", tanggal: "29/07/2026", jam: "16:42:55", pengguna: "Rian Pratama",    peran: "Finance Manager",  tipeTindakan: "Edit Master Akun",     noReferensi: "ACC-2100",     modul: "Buku Besar",  keterangan: "Update saldo awal hutang dagang" },
  { id: "log-027", tanggal: "29/07/2026", jam: "15:15:21", pengguna: "Maya Anggraini",  peran: "Accountant",       tipeTindakan: "Posting Jurnal",       noReferensi: "JV-2026-0302", modul: "Buku Besar",  keterangan: "Posting pembelian bahan baku produksi" },
  { id: "log-028", tanggal: "29/07/2026", jam: "13:38:47", pengguna: "Budi Santoso",    peran: "Kasir",            tipeTindakan: "Buat Penerimaan",     noReferensi: "RCP-2026-0076", modul: "Kas & Bank",  keterangan: "Penerimaan DP order dari customer baru" },
  { id: "log-029", tanggal: "29/07/2026", jam: "11:55:12", pengguna: "Dewi Lestari",    peran: "Sales",            tipeTindakan: "Edit Jurnal",         noReferensi: "JV-2026-0301", modul: "Buku Besar",  keterangan: "Edit harga pada jurnal retur penjualan" },
  { id: "log-030", tanggal: "29/07/2026", jam: "10:22:39", pengguna: "Andi Wijaya",     peran: "Admin",            tipeTindakan: "Buat Aset Tetap",     noReferensi: "FA-2026-0007", modul: "Aset Tetap",  keterangan: "Registrasi kendaraan operasional — kategori Kendaraan" },
]

/* ── Inline SVG icons ── */
const Icon = ({ children, size = 14 }: { children: React.ReactNode; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>{children}</svg>
)
const PlusIcon       = () => <Icon><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Icon>
const RefreshIcon    = () => <Icon><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></Icon>
const SearchIcon     = () => <Icon size={13}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Icon>
const FilterIcon     = () => <Icon><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></Icon>
const HistoryIcon    = () => <Icon><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/><polyline points="12 7 12 12 16 14"/></Icon>
const UserIcon       = () => <Icon size={12}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></Icon>
const ActivityIcon   = () => <Icon size={12}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></Icon>
const ClockIcon      = () => <Icon size={12}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></Icon>
const EditIcon       = () => <Icon size={12}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></Icon>

const selectStyle: React.CSSProperties = {
  height: 32, padding: "0 26px 0 10px", fontSize: 13,
  border: "1px solid #d8d8d8", borderRadius: 6,
  outline: "none", boxSizing: "border-box", background: "#fff",
  appearance: "none" as const,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat" as const, backgroundPosition: "right 10px center",
  cursor: "pointer",
}
const inputStyle: React.CSSProperties = {
  height: 32, padding: "0 10px", fontSize: 13,
  border: "1px solid #d8d8d8", borderRadius: 6,
  outline: "none", boxSizing: "border-box", background: "#fff",
}
const btnPrimary: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
  height: 32, padding: "0 14px", fontSize: 13, fontWeight: 600,
  background: "#0176d3", color: "#fff",
  border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer",
}
const btnIconWhite: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  width: 32, height: 32, background: "#fff", color: "#0176d3",
  border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer", flexShrink: 0,
}
const thStyle: React.CSSProperties = {
  padding: "8px 12px", textAlign: "left",
  fontSize: 11, fontWeight: 600, color: "#444746",
  textTransform: "uppercase", letterSpacing: "0.04em",
  background: "#fff", borderBottom: "1px solid #f0f0f0",
  whiteSpace: "nowrap",
}

/* Per-tipe badge color */
const TIPE_COLOR: Record<string, { bg: string; fg: string }> = {
  "Buat Jurnal":           { bg: "#eef4ff", fg: "#0176d3" },
  "Edit Jurnal":           { bg: "#fff4e5", fg: "#b95000" },
  "Hapus Jurnal":          { bg: "#ffeaea", fg: "#c1342b" },
  "Posting Jurnal":        { bg: "#e6f7ee", fg: "#0d7a3d" },
  "Unpost Jurnal":         { bg: "#fff8e1", fg: "#a1730b" },
  "Posting ke Buku Besar": { bg: "#e6f7ee", fg: "#0d7a3d" },
  "Buat Pembayaran":       { bg: "#fff0e5", fg: "#c45a17" },
  "Buat Penerimaan":       { bg: "#e6f7ee", fg: "#0d7a3d" },
  "Buat Transfer Bank":    { bg: "#eef4ff", fg: "#0176d3" },
  "Buat Faktur":           { bg: "#f4ecff", fg: "#6f3dc4" },
  "Edit Master Akun":      { bg: "#fff8e1", fg: "#a1730b" },
  "Buat Aset Tetap":       { bg: "#eef4ff", fg: "#0176d3" },
  "Buat Disposisi Aset":   { bg: "#ffeaea", fg: "#c1342b" },
}
const MODUL_COLOR: Record<string, { bg: string; fg: string }> = {
  "Buku Besar":  { bg: "#f0f7ff", fg: "#0176d3" },
  "Kas & Bank":  { bg: "#fff4e5", fg: "#b95000" },
  "Penjualan":   { bg: "#f4ecff", fg: "#6f3dc4" },
  "Pembelian":   { bg: "#fff0e5", fg: "#c45a17" },
  "Aset Tetap":  { bg: "#eef4ff", fg: "#0176d3" },
  "Persediaan":  { bg: "#e6f7ee", fg: "#0d7a3d" },
}

function formatToday() {
  const d = new Date()
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`
}

export default function LogAktifitasJurnalPage() {
  const [search, setSearch] = useState("")
  const [filterModul, setFilterModul] = useState("all")
  const [filterTipe, setFilterTipe] = useState("all")
  const [filterPengguna, setFilterPengguna] = useState("all")

  const today = formatToday()

  const stats = useMemo(() => {
    const todayCount = DUMMY_LOGS.filter((l) => l.tanggal === today).length
    const uniqueUsers = new Set(DUMMY_LOGS.map((l) => l.pengguna)).size
    return {
      total: DUMMY_LOGS.length,
      today: todayCount,
      users: uniqueUsers,
      jurnalActions: DUMMY_LOGS.filter((l) => l.tipeTindakan.includes("Jurnal")).length,
    }
  }, [today])

  const filtered = useMemo(() => {
    return DUMMY_LOGS.filter((l) => {
      if (filterModul !== "all" && l.modul !== filterModul) return false
      if (filterTipe !== "all" && l.tipeTindakan !== filterTipe) return false
      if (filterPengguna !== "all" && l.pengguna !== filterPengguna) return false
      if (search) {
        const q = search.toLowerCase()
        return (
          l.pengguna.toLowerCase().includes(q) ||
          l.noReferensi.toLowerCase().includes(q) ||
          l.keterangan.toLowerCase().includes(q) ||
          l.tipeTindakan.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [search, filterModul, filterTipe, filterPengguna])

  const uniqueTipe = Array.from(new Set(DUMMY_LOGS.map((l) => l.tipeTindakan))).sort()

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>Log Aktifitas Jurnal</h1>
            <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>
              Riwayat semua aktivitas jurnal & transaksi dengan nama pengguna dan tipe tindakannya
            </p>
          </div>
          <button style={btnPrimary}>
            <PlusIcon /> Export Log
          </button>
        </div>

        {/* Summary Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 14 }}>
          <div style={{ background: "#fff", padding: 14, borderRadius: 8, border: "1px solid #e0e0e0", borderLeft: "3px solid #0176d3" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#0176d3", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              <ActivityIcon /> Total Aktivitas
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#001526", marginTop: 6, fontFamily: "monospace" }}>{stats.total}</div>
            <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>7 hari terakhir</div>
          </div>
          <div style={{ background: "#fff", padding: 14, borderRadius: 8, border: "1px solid #e0e0e0", borderLeft: "3px solid #0d7a3d" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#0d7a3d", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              <ClockIcon /> Hari Ini
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#001526", marginTop: 6, fontFamily: "monospace" }}>{stats.today}</div>
            <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>{today}</div>
          </div>
          <div style={{ background: "#fff", padding: 14, borderRadius: 8, border: "1px solid #e0e0e0", borderLeft: "3px solid #b95000" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#b95000", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              <UserIcon /> Pengguna Aktif
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#001526", marginTop: 6, fontFamily: "monospace" }}>{stats.users}</div>
            <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>user berbeda</div>
          </div>
          <div style={{ background: "#fff", padding: 14, borderRadius: 8, border: "1px solid #e0e0e0", borderLeft: "3px solid #6f3dc4" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#6f3dc4", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              <EditIcon /> Aksi Jurnal
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#001526", marginTop: 6, fontFamily: "monospace" }}>{stats.jurnalActions}</div>
            <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>posting + edit + unpost</div>
          </div>
        </div>

        {/* Filters + Search — same row pattern */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16, paddingBottom: 12, flexWrap: "wrap" }}>
          <select style={selectStyle} value={filterModul} onChange={(e) => setFilterModul(e.target.value)}>
            <option value="all">Modul: Semua</option>
            <option>Buku Besar</option>
            <option>Kas & Bank</option>
            <option>Penjualan</option>
            <option>Pembelian</option>
            <option>Aset Tetap</option>
            <option>Persediaan</option>
          </select>
          <select style={selectStyle} value={filterTipe} onChange={(e) => setFilterTipe(e.target.value)}>
            <option value="all">Tipe: Semua</option>
            {uniqueTipe.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <select style={selectStyle} value={filterPengguna} onChange={(e) => setFilterPengguna(e.target.value)}>
            <option value="all">Pengguna: Semua</option>
            {DUMMY_USERS.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
          <button style={btnIconWhite} aria-label="Refresh"><RefreshIcon /></button>
          <div style={{ flex: 1 }} />
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999", display: "flex" }}><SearchIcon /></span>
            <input
              type="text"
              placeholder="Cari aktivitas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ ...inputStyle, paddingLeft: 30, width: 220 }}
            />
          </div>
          <span style={{ fontSize: 11, color: "#888", minWidth: 20, textAlign: "right" }}>{filtered.length}</span>
        </div>
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflow: "auto", background: "#fff", borderTop: "1px solid #f0f0f0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
            <tr>
              <th style={{ ...thStyle, width: 110 }}>Tanggal</th>
              <th style={{ ...thStyle, width: 90 }}>Jam</th>
              <th style={{ ...thStyle, width: 180 }}>Pengguna</th>
              <th style={{ ...thStyle, width: 170 }}>Tipe Tindakan</th>
              <th style={{ ...thStyle, width: 140 }}>No. Referensi</th>
              <th style={{ ...thStyle, width: 110 }}>Modul</th>
              <th style={thStyle}>Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>
                  Belum ada data aktivitas untuk filter ini
                </td>
              </tr>
            ) : (
              filtered.map((l) => {
                const tc = TIPE_COLOR[l.tipeTindakan] || { bg: "#f0f0f0", fg: "#444746" }
                const mc = MODUL_COLOR[l.modul] || { bg: "#f0f0f0", fg: "#444746" }
                return (
                  <tr
                    key={l.id}
                    style={{ borderBottom: "1px solid #f0f0f0", fontSize: 13, color: "#001526" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fbff")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "8px 12px", color: "#444746", fontFamily: "monospace" }}>{l.tanggal}</td>
                    <td style={{ padding: "8px 12px", color: "#666", fontFamily: "monospace", fontSize: 12 }}>{l.jam}</td>
                    <td style={{ padding: "8px 12px" }}>
                      <div style={{ fontWeight: 600, color: "#001526" }}>{l.pengguna}</div>
                      <div style={{ fontSize: 11, color: "#666" }}>{l.peran}</div>
                    </td>
                    <td style={{ padding: "8px 12px" }}>
                      <span style={{
                        display: "inline-block", padding: "3px 8px", borderRadius: 4,
                        fontSize: 11, fontWeight: 600,
                        background: tc.bg, color: tc.fg,
                      }}>
                        {l.tipeTindakan}
                      </span>
                    </td>
                    <td style={{ padding: "8px 12px", color: "#0176d3", fontFamily: "monospace", fontWeight: 500 }}>
                      {l.noReferensi}
                    </td>
                    <td style={{ padding: "8px 12px" }}>
                      <span style={{
                        display: "inline-block", padding: "3px 8px", borderRadius: 4,
                        fontSize: 11, fontWeight: 600,
                        background: mc.bg, color: mc.fg,
                      }}>
                        {l.modul}
                      </span>
                    </td>
                    <td style={{ padding: "8px 12px", color: "#444746", fontSize: 12 }}>{l.keterangan}</td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
