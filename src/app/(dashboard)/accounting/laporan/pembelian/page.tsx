"use client"

import { useState } from "react"
import { Printer, Download, Package, TrendingUp, BarChart3 } from "lucide-react"

function formatIDR(n: number) { return `Rp ${n.toLocaleString("id-ID")}` }

const periods = ["Januari 2026", "Februari 2026", "Maret 2026", "April 2026", "Mei 2026", "Juni 2026"]

const monthlyData = [
  { bulan: "Januari 2026", po: 8, total: 14500000 },
  { bulan: "Februari 2026", po: 7, total: 13200000 },
  { bulan: "Maret 2026", po: 10, total: 18500000 },
  { bulan: "April 2026", po: 9, total: 16000000 },
  { bulan: "Mei 2026", po: 9, total: 17300000 },
  { bulan: "Juni 2026", po: 9, total: 18500000 },
]

const totalPembelian = monthlyData.reduce((s, r) => s + r.total, 0)
const totalPO = monthlyData.reduce((s, r) => s + r.po, 0)
const avgPerPO = totalPembelian / totalPO

const summaryCards = [
  { title: "Total Pembelian", value: formatIDR(totalPembelian), desc: `${monthlyData.length} bulan`, icon: Package, color: "#ea580c", bg: "#fff7ed" },
  { title: "Rata-rata per PO", value: formatIDR(avgPerPO), desc: `${totalPO} total PO`, icon: BarChart3, color: "#ea580c", bg: "#fff7ed" },
  { title: "Jumlah PO", value: totalPO.toString(), desc: `${monthlyData.length} bulan`, icon: TrendingUp, color: "#ea580c", bg: "#fff7ed" },
]

const thStyle: React.CSSProperties = { fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", padding: "10px 16px", borderBottom: "2px solid #ecebea", whiteSpace: "nowrap" }
const tdStyle: React.CSSProperties = { fontSize: 13, color: "#001526", padding: "10px 16px", borderBottom: "1px solid #f0f0f0" }

export default function LaporanPembelianPage() {
  const [period, setPeriod] = useState("Juni 2026")

  return (
    <div style={{ padding: "24px 28px", maxWidth: 1200, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#001526" }}>Laporan Pembelian</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 4 }}>Ringkasan pembelian — Periode: 1 Januari - 30 Juni 2026</p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <select value={period} onChange={e => setPeriod(e.target.value)} style={{ height: 34, padding: "0 12px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none", background: "#fff" }}>
            {periods.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <button onClick={() => alert("Download PDF placeholder")} style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 34, padding: "0 14px", fontSize: 13, fontWeight: 600, background: "#fff", color: "#001526", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}>
            <Download size={14} /> PDF
          </button>
          <button onClick={() => window.print()} style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 34, padding: "0 14px", fontSize: 13, fontWeight: 600, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }}>
            <Printer size={14} /> Cetak
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        {summaryCards.map(card => (
          <div key={card.title} style={{ background: "#fff", border: "1px solid #ecebea", borderRadius: 8, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 6 }}>{card.title}</p>
                <p style={{ fontSize: 22, fontWeight: 700, color: "#001526", lineHeight: 1.3 }}>{card.value}</p>
                <p style={{ fontSize: 12, color: "#444746", marginTop: 4 }}>{card.desc}</p>
              </div>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: card.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <card.icon size={20} style={{ color: card.color }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Monthly Table */}
      <div style={{ background: "#fff", border: "1px solid #ecebea", borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "hidden" }}>
        <div style={{ padding: "16px 24px", borderBottom: "1px solid #ecebea" }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526" }}>Pembelian Bulanan</h3>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={thStyle}>BULAN</th>
              <th style={{ ...thStyle, textAlign: "right" }}>JUMLAH PO</th>
              <th style={{ ...thStyle, textAlign: "right" }}>TOTAL NILAI</th>
              <th style={{ ...thStyle, textAlign: "right" }}>RATA-RATA/PO</th>
            </tr>
          </thead>
          <tbody>
            {monthlyData.map(row => (
              <tr key={row.bulan} style={{ cursor: "pointer" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#f0f7ff"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
              >
                <td style={{ ...tdStyle, color: "#444746" }}>{row.bulan}</td>
                <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace" }}>{row.po}</td>
                <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace" }}>{formatIDR(row.total)}</td>
                <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace" }}>{formatIDR(Math.round(row.total / row.po))}</td>
              </tr>
            ))}
            <tr style={{ background: "#f8f9fa", fontWeight: 700 }}>
              <td style={{ ...tdStyle, fontWeight: 700 }}>TOTAL</td>
              <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace", fontWeight: 700 }}>{totalPO}</td>
              <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace", fontWeight: 700 }}>{formatIDR(totalPembelian)}</td>
              <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace", fontWeight: 700 }}>{formatIDR(Math.round(avgPerPO))}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
