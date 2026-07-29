"use client"

import { useState } from "react"
import { RefreshCw, Search, Upload } from "lucide-react"
import { dummyBankRecords, type BankRecord } from "@/lib/accounting-dummy-data"

// ── SLDS Shared Styles ──
const TH: React.CSSProperties = { fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", padding: "8px 12px", textAlign: "left", borderBottom: "1px solid #e0e0e0", whiteSpace: "nowrap" }
const TD: React.CSSProperties = { fontSize: 13, color: "#001526", padding: "8px 12px", borderBottom: "1px solid #f0f0f0" }
const BTN_ICON: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }
const INPUT: React.CSSProperties = { height: 32, padding: "0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none", boxSizing: "border-box" }

function formatIDR(n: number) { return `Rp ${n.toLocaleString("id-ID")}` }

// ── Dummy BCA mutation data for import simulation ──
const dummyBCAMutations = [
  { tanggal: "01/07/2026", keterangan: "TRSF E-BANKING CR 0107/FTSCY/WS95051 PT MAJU BERSAMA", debit: 0, kredit: 25000000, saldo: 110000000 },
  { tanggal: "02/07/2026", keterangan: "TRSF E-BANKING DB 0207/FTSCY/WS95102 CV SINAR JAYA", debit: 8810000, kredit: 0, saldo: 101190000 },
  { tanggal: "03/07/2026", keterangan: "BIAYA ADMIN BULANAN", debit: 15000, kredit: 0, saldo: 101175000 },
  { tanggal: "04/07/2026", keterangan: "TRSF E-BANKING CR 0407/FTSCY/WS95210 PT TEKNINDO SOLUSI", debit: 0, kredit: 18000000, saldo: 119175000 },
  { tanggal: "05/07/2026", keterangan: "SETORAN TUNAI CABANG JAKARTA", debit: 0, kredit: 50000000, saldo: 169175000 },
  { tanggal: "06/07/2026", keterangan: "TRSF E-BANKING DB 0607/FTSCY/WS95301 UD SUMBER REZEKI", debit: 5500000, kredit: 0, saldo: 163675000 },
]

export default function RekeningKoranPage() {
  const [search, setSearch] = useState("")
  const [akunDipilih, setAkunDipilih] = useState("")
  const [tanggalAwal, setTanggalAwal] = useState("01/07/2026")
  const [tanggalAkhir, setTanggalAkhir] = useState("06/07/2026")
  const [showImportModal, setShowImportModal] = useState(false)
  const [importedRecords, setImportedRecords] = useState<BankRecord[]>([])

  const allRecords = [...dummyBankRecords, ...importedRecords]
  const filtered = allRecords.filter(item => {
    if (search && !item.keterangan.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const handleProsesImport = () => {
    const newRecords: BankRecord[] = dummyBCAMutations.map((m, i) => ({
      id: `bca-imp-${i + 1}`,
      tanggal: m.tanggal,
      noSumber: `BCA-${m.tanggal.replace(/\//g, "")}`,
      noCek: "-",
      tipeTransaksi: m.kredit > 0 ? "Penerimaan" : "Pembayaran",
      keterangan: m.keterangan,
      mutasi: m.kredit > 0 ? m.kredit : -m.debit,
      tipe: m.kredit > 0 ? "Kredit" as const : "Debit" as const,
      saldo: m.saldo,
    }))
    setImportedRecords(prev => [...prev, ...newRecords])
    setShowImportModal(false)
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* ── Header ── */}
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Rekening Koran</h1>
        <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Rekonsiliasi rekening koran bank</p>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <div style={{ position: "relative", width: 200 }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
            <input style={{ ...INPUT, paddingLeft: 30, width: "100%" }} placeholder="Cari/Pilih..." value={akunDipilih} onChange={e => setAkunDipilih(e.target.value)} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <input style={{ ...INPUT, width: 110 }} value={tanggalAwal} onChange={e => setTanggalAwal(e.target.value)} />
            <span style={{ fontSize: 13, color: "#666" }}>s/d</span>
            <input style={{ ...INPUT, width: 110 }} value={tanggalAkhir} onChange={e => setTanggalAkhir(e.target.value)} />
          </div>
          <button style={BTN_ICON}><RefreshCw size={14} /></button>
          <button onClick={() => setShowImportModal(true)} style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 32, padding: "0 12px", fontSize: 13, fontWeight: 600, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }}>
            <Upload size={14} /> Import Mutasi BCA
          </button>
        </div>
      </div>

      {/* ── Table ── */}
      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr>
            <th style={{ ...TH, width: "12%" }}>TANGGAL</th>
            <th style={{ ...TH, width: "14%" }}>NO. SUMBER #</th>
            <th style={{ ...TH, width: "10%" }}>NO. CEK #</th>
            <th style={{ ...TH, width: "26%" }}>KETERANGAN</th>
            <th style={{ ...TH, width: "14%", textAlign: "right" }}>MUTASI</th>
            <th style={{ ...TH, width: "10%" }}>TIPE</th>
            <th style={{ ...TH, width: "14%", textAlign: "right" }}>SALDO</th>
          </tr></thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data</td></tr>
            ) : filtered.map(item => (
              <tr key={item.id} style={{ cursor: "pointer" }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#f0f7ff"} onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}>
                <td style={{ ...TD, color: "#444746" }}>{item.tanggal}</td>
                <td style={{ ...TD, fontFamily: "monospace", color: "#0176d3" }}>{item.noSumber}</td>
                <td style={{ ...TD, color: "#444746" }}>{item.noCek}</td>
                <td style={{ ...TD, color: "#444746" }}>{item.keterangan}</td>
                <td style={{ ...TD, textAlign: "right", fontFamily: "monospace", color: item.mutasi > 0 ? "#2e844a" : "#ea001e" }}>
                  {item.mutasi > 0 ? formatIDR(item.mutasi) : item.mutasi < 0 ? `(Rp ${Math.abs(item.mutasi).toLocaleString("id-ID")})` : "-"}
                </td>
                <td style={{ ...TD, color: "#444746" }}>{item.tipe}</td>
                <td style={{ ...TD, textAlign: "right", fontFamily: "monospace" }}>{formatIDR(item.saldo)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Import Mutasi BCA Modal ── */}
      {showImportModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }} onClick={() => setShowImportModal(false)}>
          <div style={{ background: "#fff", borderRadius: 10, width: 720, maxHeight: "80vh", display: "flex", flexDirection: "column", boxShadow: "0 8px 30px rgba(0,0,0,0.18)" }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #e0e0e0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#001526", margin: 0 }}>Import Mutasi BCA</h3>
                <p style={{ fontSize: 12, color: "#444746", margin: "2px 0 0" }}>Preview data CSV mutasi rekening BCA — 6 baris ditemukan</p>
              </div>
              <button onClick={() => setShowImportModal(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#888", lineHeight: 1 }}>✕</button>
            </div>
            <div style={{ flex: 1, overflow: "auto", padding: "12px 20px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead><tr>
                  <th style={TH}>TANGGAL</th>
                  <th style={TH}>KETERANGAN</th>
                  <th style={{ ...TH, textAlign: "right" }}>DEBIT</th>
                  <th style={{ ...TH, textAlign: "right" }}>KREDIT</th>
                  <th style={{ ...TH, textAlign: "right" }}>SALDO</th>
                </tr></thead>
                <tbody>
                  {dummyBCAMutations.map((m, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <td style={{ ...TD, color: "#444746", whiteSpace: "nowrap" }}>{m.tanggal}</td>
                      <td style={{ ...TD, fontSize: 12, color: "#444746" }}>{m.keterangan}</td>
                      <td style={{ ...TD, textAlign: "right", fontFamily: "monospace", color: "#ea001e" }}>{m.debit > 0 ? formatIDR(m.debit) : "-"}</td>
                      <td style={{ ...TD, textAlign: "right", fontFamily: "monospace", color: "#2e844a" }}>{m.kredit > 0 ? formatIDR(m.kredit) : "-"}</td>
                      <td style={{ ...TD, textAlign: "right", fontFamily: "monospace" }}>{formatIDR(m.saldo)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ padding: "12px 20px", borderTop: "1px solid #e0e0e0", display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button onClick={() => setShowImportModal(false)} style={{ height: 34, padding: "0 16px", fontSize: 13, fontWeight: 600, background: "#fff", color: "#444746", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}>Batal</button>
              <button onClick={handleProsesImport} style={{ height: 34, padding: "0 16px", fontSize: 13, fontWeight: 600, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }}>Proses Import</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
