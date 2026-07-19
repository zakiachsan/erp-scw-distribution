"use client"

import { useState } from "react"
import { Printer, Download, Receipt, Users, Building } from "lucide-react"

function formatIDR(n: number) { return `Rp ${n.toLocaleString("id-ID")}` }

const periods = ["Januari 2026", "Februari 2026", "Maret 2026", "April 2026", "Mei 2026", "Juni 2026"]

const piutangData = [
  { id: 1, customer: "PT Autogloss Indonesia", jumlah: 12500000, jatuhTempo: "15/07/2026", status: "Belum" },
  { id: 2, customer: "CV Ceramic Pro JKT", jumlah: 8200000, jatuhTempo: "10/07/2026", status: "Belum" },
  { id: 3, customer: "UD Shinemax", jumlah: 6800000, jatuhTempo: "05/07/2026", status: "Belum" },
  { id: 4, customer: "PT DetailWorks BDG", jumlah: 4500000, jatuhTempo: "20/07/2026", status: "Belum" },
  { id: 5, customer: "CV ProShine SBY", jumlah: 3200000, jatuhTempo: "25/06/2026", status: "Lunas" },
  { id: 6, customer: "AutoCare Makassar", jumlah: 2100000, jatuhTempo: "30/06/2026", status: "Lunas" },
  { id: 7, customer: "GlossUp Bali", jumlah: 1100000, jatuhTempo: "28/06/2026", status: "Lunas" },
]

const hutangData = [
  { id: 1, supplier: "PT SCW Manufacturing", jumlah: 18500000, jatuhTempo: "20/07/2026", status: "Belum" },
  { id: 2, supplier: "PT Kimia Jaya", jumlah: 5200000, jatuhTempo: "15/07/2026", status: "Belum" },
  { id: 3, supplier: "PT Kemasan Indonesia", jumlah: 3800000, jatuhTempo: "10/07/2026", status: "Belum" },
  { id: 4, supplier: "PT Logistik Express", jumlah: 1500000, jatuhTempo: "05/07/2026", status: "Lunas" },
  { id: 5, supplier: "CV ATK Supply", jumlah: 500000, jatuhTempo: "30/06/2026", status: "Lunas" },
]

const totalPiutang = piutangData.reduce((s, r) => s + r.jumlah, 0)
const totalHutang = hutangData.reduce((s, r) => s + r.jumlah, 0)
const net = totalPiutang - totalHutang

const thStyle: React.CSSProperties = { fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", padding: "10px 16px", borderBottom: "2px solid #ecebea", whiteSpace: "nowrap" }
const tdStyle: React.CSSProperties = { fontSize: 13, color: "#001526", padding: "10px 16px", borderBottom: "1px solid #f0f0f0" }

export default function HutangPiutangPage() {
  const [period, setPeriod] = useState("Juni 2026")

  const summaryCards = [
    { title: "Total Piutang", value: formatIDR(totalPiutang), desc: `${piutangData.filter(p => p.status === "Belum").length} belum lunas`, icon: Users, color: "#059669", bg: "#ecfdf5" },
    { title: "Total Hutang", value: formatIDR(totalHutang), desc: `${hutangData.filter(p => p.status === "Belum").length} belum lunas`, icon: Building, color: "#ea001e", bg: "#fef2f2" },
    { title: "Net (Piutang - Hutang)", value: formatIDR(net), desc: net >= 0 ? "Posisi surplus" : "Posisi defisit", icon: Receipt, color: "#0176d3", bg: "#eef4ff" },
  ]

  return (
    <div style={{ padding: "24px 28px", maxWidth: 1200, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#001526" }}>Laporan Hutang Piutang</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 4 }}>Ringkasan piutang dan hutang — Per 30 Juni 2026</p>
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

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Piutang Table */}
        <div style={{ background: "#fff", border: "1px solid #ecebea", borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "hidden" }}>
          <div style={{ padding: "16px 24px", borderBottom: "1px solid #ecebea", background: "#ecfdf5" }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#059669" }}>Piutang (Receivables)</h3>
            <p style={{ fontSize: 11, color: "#444746", marginTop: 2 }}>{piutangData.length} item · {piutangData.filter(p => p.status === "Belum").length} belum lunas</p>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={thStyle}>PELANGGAN</th>
                <th style={{ ...thStyle, textAlign: "right" }}>JUMLAH</th>
                <th style={thStyle}>JATUH TEMPO</th>
                <th style={thStyle}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {piutangData.map(row => (
                <tr key={row.id} style={{ cursor: "pointer" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#f0f7ff"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
                >
                  <td style={tdStyle}>{row.customer}</td>
                  <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace" }}>{formatIDR(row.jumlah)}</td>
                  <td style={{ ...tdStyle, color: "#444746" }}>{row.jatuhTempo}</td>
                  <td style={tdStyle}>
                    <span style={{
                      padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600,
                      background: row.status === "Lunas" ? "#e8f5e9" : "#fff3e0",
                      color: row.status === "Lunas" ? "#2e7d32" : "#e65100",
                    }}>{row.status}</span>
                  </td>
                </tr>
              ))}
              <tr style={{ background: "#f8f9fa" }}>
                <td style={{ ...tdStyle, fontWeight: 700 }}>TOTAL</td>
                <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace", fontWeight: 700 }}>{formatIDR(totalPiutang)}</td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Hutang Table */}
        <div style={{ background: "#fff", border: "1px solid #ecebea", borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "hidden" }}>
          <div style={{ padding: "16px 24px", borderBottom: "1px solid #ecebea", background: "#fef2f2" }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#ea001e" }}>Hutang (Payables)</h3>
            <p style={{ fontSize: 11, color: "#444746", marginTop: 2 }}>{hutangData.length} item · {hutangData.filter(p => p.status === "Belum").length} belum lunas</p>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={thStyle}>PEMASOK</th>
                <th style={{ ...thStyle, textAlign: "right" }}>JUMLAH</th>
                <th style={thStyle}>JATUH TEMPO</th>
                <th style={thStyle}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {hutangData.map(row => (
                <tr key={row.id} style={{ cursor: "pointer" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#f0f7ff"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
                >
                  <td style={tdStyle}>{row.supplier}</td>
                  <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace" }}>{formatIDR(row.jumlah)}</td>
                  <td style={{ ...tdStyle, color: "#444746" }}>{row.jatuhTempo}</td>
                  <td style={tdStyle}>
                    <span style={{
                      padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600,
                      background: row.status === "Lunas" ? "#e8f5e9" : "#fff3e0",
                      color: row.status === "Lunas" ? "#2e7d32" : "#e65100",
                    }}>{row.status}</span>
                  </td>
                </tr>
              ))}
              <tr style={{ background: "#f8f9fa" }}>
                <td style={{ ...tdStyle, fontWeight: 700 }}>TOTAL</td>
                <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace", fontWeight: 700 }}>{formatIDR(totalHutang)}</td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
