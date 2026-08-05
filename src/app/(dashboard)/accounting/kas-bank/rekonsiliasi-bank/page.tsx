"use client"

import { useState } from "react"
import { RefreshCw, Search, Mic, Upload } from "lucide-react"
import { dummyBankRecords, type BankRecord } from "@/lib/accounting-dummy-data"

// ── SLDS Shared Styles ──
const TH: React.CSSProperties = { fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", padding: "6px 8px", textAlign: "left", borderBottom: "1px solid #e0e0e0", whiteSpace: "nowrap" }
const TD: React.CSSProperties = { fontSize: 13, color: "#001526", padding: "6px 8px", borderBottom: "1px solid #f0f0f0" }
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

export default function RekonsiliasiBankPage() {
  const [akunDipilih, setAkunDipilih] = useState("")
  const [tanggalAwal, setTanggalAwal] = useState("2026-06-29")
  const [tanggalAkhir, setTanggalAkhir] = useState("2026-07-06")
  const [showData, setShowData] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [importedRecords, setImportedRecords] = useState<BankRecord[]>([])

  const allBankRecords = [...dummyBankRecords, ...importedRecords]

  const handleRefresh = () => {
    if (akunDipilih) setShowData(true)
  }

  const handleProsesImport = () => {
    const newRecords: BankRecord[] = dummyBCAMutations.map((m, i) => ({
      id: `bca-rek-${i + 1}`,
      tanggal: m.tanggal,
      kasBank: "Bank BCA",
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
    setShowData(true)
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* ── Header ── */}
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Rekonsiliasi Bank</h1>
        <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Rekonsiliasi saldo bank dengan buku besar</p>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <div style={{ position: "relative", width: 220 }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
            <input style={{ ...INPUT, paddingLeft: 30, width: "100%" }} placeholder="Cari/Pilih Bank..." value={akunDipilih} onChange={e => setAkunDipilih(e.target.value)} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <input type="date" style={{ ...INPUT, width: 140 }} value={tanggalAwal} onChange={e => setTanggalAwal(e.target.value)} />
            <span style={{ fontSize: 13, color: "#666" }}>s/d</span>
            <input type="date" style={{ ...INPUT, width: 140 }} value={tanggalAkhir} onChange={e => setTanggalAkhir(e.target.value)} />
          </div>
          <button onClick={handleRefresh} style={BTN_ICON}><RefreshCw size={14} /></button>
          <button style={{ ...BTN_ICON, background: "#ffc107", borderColor: "#ffc107" }}><Mic size={14} /></button>
          <button onClick={() => setShowImportModal(true)} style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 32, padding: "0 12px", fontSize: 13, fontWeight: 600, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }}>
            <Upload size={14} /> Import Mutasi BCA
          </button>
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ flex: 1, overflow: "auto", background: "#f5f5f5", padding: "16px 20px" }}>
        {!showData ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 16 }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#e0e0e0", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
            </div>
            <p style={{ fontSize: 13, color: "#666", textAlign: "center", maxWidth: 400, lineHeight: 1.5 }}>
              Pilih Bank yang akan direkonsiliasi kemudian, klik tombol &apos;Refresh&apos; untuk memperbaharui data
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, height: "100%" }}>
            {/* Left: Rekening Bank */}
            <div style={{ background: "#fff", borderRadius: 8, border: "1px solid #d8d8d8", overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", borderBottom: "3px solid #0176d3" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 24, height: 24, background: "#0176d3", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z" /></svg>
                  </div>
                  <h3 style={{ fontSize: 13, fontWeight: 700, color: "#001526" }}>REKENING BANK</h3>
                </div>
              </div>
              <div style={{ padding: 16 }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead><tr>
                    <th style={TH}>Tanggal</th>
                    <th style={TH}>Keterangan</th>
                    <th style={{ ...TH, textAlign: "right" }}>Mutasi</th>
                    <th style={{ ...TH, textAlign: "right" }}>Saldo</th>
                  </tr></thead>
                  <tbody>
                    {allBankRecords.map(item => (
                      <tr key={item.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                        <td style={{ ...TD, color: "#444746" }}>{item.tanggal}</td>
                        <td style={{ ...TD, color: "#444746" }}>{item.keterangan}</td>
                        <td style={{ ...TD, textAlign: "right", fontFamily: "monospace", color: item.mutasi > 0 ? "#2e844a" : "#ea001e" }}>
                          {item.mutasi > 0 ? formatIDR(item.mutasi) : `(Rp ${Math.abs(item.mutasi).toLocaleString("id-ID")})`}
                        </td>
                        <td style={{ ...TD, textAlign: "right", fontFamily: "monospace" }}>{formatIDR(item.saldo)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: Jurnal Accurate */}
            <div style={{ background: "#fff", borderRadius: 8, border: "1px solid #d8d8d8", overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", borderBottom: "3px solid #ea001e" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 24, height: 24, background: "#ea001e", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>A</span>
                  </div>
                  <h3 style={{ fontSize: 13, fontWeight: 700, color: "#001526" }}>JURNAL ACCURATE</h3>
                </div>
              </div>
              <div style={{ padding: 16 }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead><tr>
                    <th style={TH}>Tanggal</th>
                    <th style={TH}>Keterangan</th>
                    <th style={{ ...TH, textAlign: "right" }}>Mutasi</th>
                    <th style={{ ...TH, textAlign: "right" }}>Saldo</th>
                  </tr></thead>
                  <tbody><tr><td colSpan={4} style={{ padding: 30, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data</td></tr></tbody>
                </table>
              </div>
            </div>
          </div>
        )}
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
