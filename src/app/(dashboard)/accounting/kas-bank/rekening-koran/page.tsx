"use client"

import { useState } from "react"
import { RefreshCw, Search } from "lucide-react"
import { dummyBankRecords } from "@/lib/accounting-dummy-data"

// ── SLDS Shared Styles ──
const TH: React.CSSProperties = { fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", padding: "8px 12px", textAlign: "left", borderBottom: "1px solid #e0e0e0", whiteSpace: "nowrap" }
const TD: React.CSSProperties = { fontSize: 13, color: "#001526", padding: "8px 12px", borderBottom: "1px solid #f0f0f0" }
const BTN_ICON: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }
const INPUT: React.CSSProperties = { height: 32, padding: "0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none", boxSizing: "border-box" }

function formatIDR(n: number) { return `Rp ${n.toLocaleString("id-ID")}` }

export default function RekeningKoranPage() {
  const [search, setSearch] = useState("")
  const [akunDipilih, setAkunDipilih] = useState("")
  const [tanggalAwal, setTanggalAwal] = useState("01/07/2026")
  const [tanggalAkhir, setTanggalAkhir] = useState("06/07/2026")

  const filtered = dummyBankRecords.filter(item => {
    if (search && !item.keterangan.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

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
    </div>
  )
}
