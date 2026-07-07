"use client"

import { useState } from "react"
import { RefreshCw, Search, Mic } from "lucide-react"
import { dummyBankRecords } from "@/lib/accounting-dummy-data"

// ── SLDS Shared Styles ──
const TH: React.CSSProperties = { fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", padding: "6px 8px", textAlign: "left", borderBottom: "1px solid #e0e0e0", whiteSpace: "nowrap" }
const TD: React.CSSProperties = { fontSize: 13, color: "#001526", padding: "6px 8px", borderBottom: "1px solid #f0f0f0" }
const BTN_ICON: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }
const INPUT: React.CSSProperties = { height: 32, padding: "0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none", boxSizing: "border-box" }

function formatIDR(n: number) { return `Rp ${n.toLocaleString("id-ID")}` }

export default function RekonsiliasiBankPage() {
  const [akunDipilih, setAkunDipilih] = useState("")
  const [tanggalAwal, setTanggalAwal] = useState("29/06/2026")
  const [tanggalAkhir, setTanggalAkhir] = useState("06/07/2026")
  const [showData, setShowData] = useState(false)

  const handleRefresh = () => {
    if (akunDipilih) setShowData(true)
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
            <input style={{ ...INPUT, width: 110 }} value={tanggalAwal} onChange={e => setTanggalAwal(e.target.value)} />
            <span style={{ fontSize: 13, color: "#666" }}>s/d</span>
            <input style={{ ...INPUT, width: 110 }} value={tanggalAkhir} onChange={e => setTanggalAkhir(e.target.value)} />
          </div>
          <button onClick={handleRefresh} style={BTN_ICON}><RefreshCw size={14} /></button>
          <button style={{ ...BTN_ICON, background: "#ffc107", borderColor: "#ffc107" }}><Mic size={14} /></button>
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
                    {dummyBankRecords.map(item => (
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
    </div>
  )
}
