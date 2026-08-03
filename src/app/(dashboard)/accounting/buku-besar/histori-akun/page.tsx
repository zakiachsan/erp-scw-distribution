"use client"

/* INTEGRASI: Histori Akun menampilkan mutasi per akun (mirip Buku Besar per akun).
   Sumber data: dummyBankRecords (representasi pergerakan akun kas/bank).
   Dropdown pencarian induk akun terhubung ke dummyAccounts. */

import { useState, useMemo } from "react"
import { dummyBankRecords, dummyAccounts, BankRecord } from "@/lib/accounting-dummy-data"

/* ── Inline SVG icons ── */
const Icon = ({ children, size = 14 }: { children: React.ReactNode; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>{children}</svg>
)
const RefreshIcon   = () => <Icon><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></Icon>
const DownloadIcon  = () => <Icon><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></Icon>
const PrinterIcon   = () => <Icon><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 12H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2"/><rect x="6" y="14" width="12" height="8"/></Icon>
const SearchIcon    = () => <Icon size={13}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Icon>

/* ── Shared styles ── */
const inputStyle: React.CSSProperties = {
  height: 32, padding: "0 10px", fontSize: 13,
  border: "1px solid #d8d8d8", borderRadius: 6,
  outline: "none", boxSizing: "border-box",
}
const selectStyle: React.CSSProperties = {
  height: 32, padding: "0 28px 0 10px", fontSize: 13,
  border: "1px solid #d8d8d8", borderRadius: 6,
  background: "#fff", color: "#001526", cursor: "pointer",
  appearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 8px center",
}
const thStyle: React.CSSProperties = {
  padding: "8px 12px", textAlign: "left",
  fontSize: 11, fontWeight: 600, color: "#444746",
  textTransform: "uppercase", letterSpacing: "0.04em",
  background: "#fff", borderBottom: "1px solid #f0f0f0",
  whiteSpace: "nowrap",
}
const btnIconBlue: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  width: 32, height: 32, background: "#0176d3", color: "#fff",
  border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer", flexShrink: 0,
}
const btnIconWhite: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  width: 32, height: 32, background: "#fff", color: "#0176d3",
  border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer", flexShrink: 0,
}

/* ── Summary card style ── */
const cardStyle: React.CSSProperties = {
  background: "#fff", border: "1px solid #e5e5e5", borderRadius: 8,
  padding: "12px 16px", minWidth: 160, flex: 1,
}

/* ── Expand dummyBankRecords with per-account entries so user can scope to a specific akun ── */
const extendedRecords: (BankRecord & { akunKode: string; akunNama: string })[] = [
  ...dummyBankRecords.map((r) => ({ ...r, akunKode: "110102", akunNama: "Bank BCA - Rekening Giro" })),
  { id: "br-bca-1", tanggal: "04/07/2026", noSumber: "PMB/2026/07/002", noCek: "-", tipeTransaksi: "Penerimaan", keterangan: "Penerimaan jasa welding", mutasi: 12000000, tipe: "Kredit", saldo: 97000000, akunKode: "110102", akunNama: "Bank BCA - Rekening Giro" },
  { id: "br-bca-2", tanggal: "07/07/2026", noSumber: "SO/2026/07/004", noCek: "-", tipeTransaksi: "Penerimaan", keterangan: "Pelunasan CV Karya Mandiri", mutasi: 18000000, tipe: "Kredit", saldo: 115000000, akunKode: "110102", akunNama: "Bank BCA - Rekening Giro" },
  { id: "br-bca-3", tanggal: "08/07/2026", noSumber: "EXP/2026/07/003", noCek: "CEK-002", tipeTransaksi: "Pembayaran", keterangan: "Bayar tagihan TELKOM", mutasi: -3500000, tipe: "Debit", saldo: 111500000, akunKode: "110102", akunNama: "Bank BCA - Rekening Giro" },
  { id: "br-mdr-1", tanggal: "02/07/2026", noSumber: "PO/2026/07/002", noCek: "-", tipeTransaksi: "Pembayaran", keterangan: "Pembelian besi beton", mutasi: -18000000, tipe: "Debit", saldo: 102000000, akunKode: "110103", akunNama: "Bank Mandiri" },
  { id: "br-mdr-2", tanggal: "06/07/2026", noSumber: "SO/2026/07/005", noCek: "-", tipeTransaksi: "Penerimaan", keterangan: "Uang muka UD Sukses", mutasi: 8000000, tipe: "Kredit", saldo: 110000000, akunKode: "110103", akunNama: "Bank Mandiri" },
  { id: "br-mdr-3", tanggal: "09/07/2026", noSumber: "EXP/2026/07/004", noCek: "-", tipeTransaksi: "Pembayaran", keterangan: "Gaji karyawan batch 1", mutasi: -25000000, tipe: "Debit", saldo: 85000000, akunKode: "110103", akunNama: "Bank Mandiri" },
  { id: "br-mdr-4", tanggal: "10/07/2026", noSumber: "SO/2026/07/006", noCek: "-", tipeTransaksi: "Penerimaan", keterangan: "Penjualan ke PT Teknindo", mutasi: 24000000, tipe: "Kredit", saldo: 109000000, akunKode: "110103", akunNama: "Bank Mandiri" },
  { id: "br-bni-1", tanggal: "03/07/2026", noSumber: "PMB/2026/07/003", noCek: "-", tipeTransaksi: "Penerimaan", keterangan: "Pinjaman modal kerja", mutasi: 100000000, tipe: "Kredit", saldo: 100000000, akunKode: "110104", akunNama: "Bank BNI" },
  { id: "br-bni-2", tanggal: "05/07/2026", noSumber: "EXP/2026/07/005", noCek: "CEK-003", tipeTransaksi: "Pembayaran", keterangan: "Cicilan pokok pinjaman", mutasi: -15000000, tipe: "Debit", saldo: 85000000, akunKode: "110104", akunNama: "Bank BNI" },
  { id: "br-bni-3", tanggal: "08/07/2026", noSumber: "SO/2026/07/007", noCek: "-", tipeTransaksi: "Penerimaan", keterangan: "Pelunasan Toko Berkah Abadi", mutasi: 5500000, tipe: "Kredit", saldo: 90500000, akunKode: "110104", akunNama: "Bank BNI" },
]

export default function HistoriAkunPage() {
  const [search, setSearch] = useState("")
  const [tanggalAwal, setTanggalAwal] = useState("01/07/2026")
  const [tanggalAkhir, setTanggalAkhir] = useState("31/07/2026")
  const [akunDipilih, setAkunDipilih] = useState("")
  const [akunOpen, setAkunOpen] = useState(false)

  // Filtered records: scope to selected account (or all if blank)
  const filtered = useMemo(() => {
    return extendedRecords.filter((item) => {
      if (akunDipilih) {
        const q = akunDipilih.toLowerCase()
        return item.akunKode.toLowerCase().includes(q) || item.akunNama.toLowerCase().includes(q)
      }
      return true
    }).filter((item) => {
      if (search) {
        const q = search.toLowerCase()
        return item.keterangan.toLowerCase().includes(q) || item.noSumber.toLowerCase().includes(q)
      }
      return true
    })
  }, [search, akunDipilih])

  // Summary cards
  const totalMutasiMasuk = filtered.filter((r) => r.mutasi > 0).reduce((s, r) => s + r.mutasi, 0)
  const totalMutasiKeluar = filtered.filter((r) => r.mutasi < 0).reduce((s, r) => s + r.mutasi, 0)
  const saldoAkhir = filtered.length > 0 ? filtered[filtered.length - 1].saldo : 0
  const akunAktif = new Set(filtered.map((r) => r.akunKode)).size

  // Account picker dropdown options
  const akunOptions = useMemo(() => {
    const q = akunDipilih.toLowerCase()
    return dummyAccounts.filter((a) => !q || a.kode.toLowerCase().includes(q) || a.nama.toLowerCase().includes(q)).slice(0, 50)
  }, [akunDipilih])

  // Picked account label for header
  const pickedAkun = akunDipilih ? dummyAccounts.find((a) => a.kode === akunDipilih || akunDipilih.includes(a.kode)) : null

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>Histori Akun</h1>
            <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>
              Riwayat transaksi per akun perkiraan {pickedAkun && <span style={{ color: "#0176d3", fontWeight: 500 }}>· {pickedAkun.kode} — {pickedAkun.nama}</span>}
            </p>
          </div>
        </div>

        {/* Summary cards */}
        <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
          <div style={cardStyle}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Total Mutasi Masuk</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#2e844a", marginTop: 4, fontFamily: "monospace" }}>Rp {totalMutasiMasuk.toLocaleString("id-ID")}</div>
            <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{filtered.filter((r) => r.mutasi > 0).length} transaksi</div>
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Total Mutasi Keluar</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#ea001e", marginTop: 4, fontFamily: "monospace" }}>Rp {Math.abs(totalMutasiKeluar).toLocaleString("id-ID")}</div>
            <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{filtered.filter((r) => r.mutasi < 0).length} transaksi</div>
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Saldo Akhir</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#001526", marginTop: 4, fontFamily: "monospace" }}>Rp {saldoAkhir.toLocaleString("id-ID")}</div>
            <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>Running balance</div>
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Akun Aktif</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#0176d3", marginTop: 4, fontFamily: "monospace" }}>{akunAktif}</div>
            <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>rekening</div>
          </div>
        </div>

        {/* Filters + Search + Actions — ONE row (per skill pattern) */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          {/* Searchable account picker */}
          <div style={{ position: "relative", width: 220 }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999", display: "flex" }}><SearchIcon /></span>
            <input
              type="text"
              placeholder="Pilih akun (kode/nama)..."
              value={akunDipilih}
              onChange={(e) => { setAkunDipilih(e.target.value); setAkunOpen(true) }}
              onFocus={() => setAkunOpen(true)}
              onBlur={() => setTimeout(() => setAkunOpen(false), 150)}
              style={{ ...inputStyle, paddingLeft: 30, width: "100%" }}
            />
            {akunOpen && (
              <div style={{
                position: "absolute", top: 34, left: 0, right: 0, maxHeight: 240, overflowY: "auto",
                background: "#fff", border: "1px solid #d8d8d8", borderRadius: 6,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)", zIndex: 10,
              }}>
                {akunOptions.length === 0 ? (
                  <div style={{ padding: 12, fontSize: 12, color: "#888", textAlign: "center" }}>Tidak ada hasil</div>
                ) : akunOptions.map((a) => (
                  <div
                    key={a.id}
                    onMouseDown={() => { setAkunDipilih(`${a.kode} — ${a.nama}`); setAkunOpen(false) }}
                    style={{ padding: "8px 10px", fontSize: 13, cursor: "pointer", borderBottom: "1px solid #f5f5f5" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#f0f7ff")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                  >
                    <span style={{ fontFamily: "monospace", fontWeight: 600, color: "#0176d3", marginRight: 6 }}>{a.kode}</span>
                    <span style={{ color: "#001526" }}>{a.nama}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <input type="text" value={tanggalAwal} onChange={(e) => setTanggalAwal(e.target.value)} placeholder="dd/mm/yyyy" style={{ ...inputStyle, width: 110 }} />
            <span style={{ fontSize: 13, color: "#666" }}>s/d</span>
            <input type="text" value={tanggalAkhir} onChange={(e) => setTanggalAkhir(e.target.value)} placeholder="dd/mm/yyyy" style={{ ...inputStyle, width: 110 }} />
          </div>

          <button style={btnIconBlue}><RefreshIcon /></button>
          <button style={btnIconWhite}><DownloadIcon /></button>
          <button style={btnIconWhite}><PrinterIcon /></button>

          <div style={{ flex: 1 }} />
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999", display: "flex" }}><SearchIcon /></span>
            <input
              type="text"
              placeholder="Cari keterangan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ ...inputStyle, paddingLeft: 30, width: 200, height: 32 }}
            />
          </div>
          <span style={{ fontSize: 11, color: "#888", minWidth: 20, textAlign: "right" }}>{filtered.length}</span>
        </div>
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {[
                { label: "Tanggal", width: "10%" },
                { label: "Akun", width: "16%" },
                { label: "No. Sumber #", width: "13%" },
                { label: "Tipe Transaksi", width: "12%" },
                { label: "Keterangan", width: "23%" },
                { label: "Mutasi", width: "12%", align: "right" as const },
                { label: "Saldo", width: "14%", align: "right" as const },
              ].map((col) => (
                <th key={col.label} style={{ ...thStyle, textAlign: col.align || "left", width: col.width }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>
                  Belum ada data
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer", fontSize: 13, color: "#001526" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f7ff")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.tanggal}</td>
                  <td style={{ padding: "6px 12px" }}>
                    <div style={{ fontFamily: "monospace", fontSize: 12, color: "#0176d3", fontWeight: 600 }}>{item.akunKode}</div>
                    <div style={{ fontSize: 11, color: "#666" }}>{item.akunNama}</div>
                  </td>
                  <td style={{ padding: "8px 12px", fontFamily: "monospace", color: "#0176d3" }}>{item.noSumber}</td>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.tipeTransaksi}</td>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.keterangan}</td>
                  <td style={{ padding: "8px 12px", textAlign: "right", fontFamily: "monospace" }}>
                    {item.mutasi > 0 ? <span style={{ color: "#2e844a" }}>Rp {item.mutasi.toLocaleString("id-ID")}</span> : item.mutasi < 0 ? <span style={{ color: "#ea001e" }}>(Rp {Math.abs(item.mutasi).toLocaleString("id-ID")})</span> : <span>-</span>}
                  </td>
                  <td style={{ padding: "8px 12px", textAlign: "right", fontFamily: "monospace", color: "#001526", fontWeight: 600 }}>Rp {item.saldo.toLocaleString("id-ID")}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
