"use client"

import { useState } from "react"
import { Printer, Download, ShoppingCart, TrendingUp, BarChart3, Bookmark, X } from "lucide-react"

function formatIDR(n: number) { return `Rp ${n.toLocaleString("id-ID")}` }

const periods = ["Januari 2026", "Februari 2026", "Maret 2026", "April 2026", "Mei 2026", "Juni 2026"]

const monthlyData = [
  { bulan: "Januari 2026", order: 35, total: 26800000 },
  { bulan: "Februari 2026", order: 32, total: 24200000 },
  { bulan: "Maret 2026", order: 45, total: 34500000 },
  { bulan: "April 2026", order: 40, total: 30800000 },
  { bulan: "Mei 2026", order: 48, total: 33200000 },
  { bulan: "Juni 2026", order: 45, total: 35500000 },
]

const topProducts = [
  { rank: 1, name: "SCW Snow Foam", total: 40500000, qty: 270 },
  { rank: 2, name: "SCW Interior Detailer", total: 25200000, qty: 210 },
  { rank: 3, name: "SCW Spray Wax", total: 19800000, qty: 180 },
  { rank: 4, name: "SCW Tire Gel", total: 14250000, qty: 150 },
  { rank: 5, name: "SCW Ceramic Coating", total: 30000000, qty: 120 },
]

const totalPenjualan = monthlyData.reduce((s, r) => s + r.total, 0)
const totalOrder = monthlyData.reduce((s, r) => s + r.order, 0)
const avgPerOrder = totalPenjualan / totalOrder

const thStyle: React.CSSProperties = { fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", padding: "10px 16px", borderBottom: "2px solid #ecebea", whiteSpace: "nowrap" }
const tdStyle: React.CSSProperties = { fontSize: 13, color: "#001526", padding: "10px 16px", borderBottom: "1px solid #f0f0f0" }
const inputStyle: React.CSSProperties = { height: 34, padding: "0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none", boxSizing: "border-box" }

interface FilterPreset { nama: string; tanggalAwal: string; tanggalAkhir: string; periode: string }

export default function LaporanPenjualanPage() {
  const [period, setPeriod] = useState("Juni 2026")
  const [tanggalAwal, setTanggalAwal] = useState("01/01/2026")
  const [tanggalAkhir, setTanggalAkhir] = useState("30/06/2026")
  const [savedPresets, setSavedPresets] = useState<FilterPreset[]>([
    { nama: "Q1 2026", tanggalAwal: "01/01/2026", tanggalAkhir: "31/03/2026", periode: "Maret 2026" },
    { nama: "Semester 1", tanggalAwal: "01/01/2026", tanggalAkhir: "30/06/2026", periode: "Juni 2026" },
  ])
  const [presetName, setPresetName] = useState("")
  const [showPresetInput, setShowPresetInput] = useState(false)

  const handleSimpanFilter = () => {
    if (!presetName.trim()) return
    setSavedPresets(prev => [...prev, { nama: presetName.trim(), tanggalAwal, tanggalAkhir, periode: period }])
    setPresetName("")
    setShowPresetInput(false)
  }

  const handleApplyPreset = (p: FilterPreset) => {
    setTanggalAwal(p.tanggalAwal)
    setTanggalAkhir(p.tanggalAkhir)
    setPeriod(p.periode)
  }

  const handleRemovePreset = (nama: string) => {
    setSavedPresets(prev => prev.filter(p => p.nama !== nama))
  }

  const summaryCards = [
    { title: "Total Penjualan", value: formatIDR(totalPenjualan), desc: `${monthlyData.length} bulan`, icon: TrendingUp, color: "#7c3aed", bg: "#f5f3ff" },
    { title: "Rata-rata per Order", value: formatIDR(avgPerOrder), desc: `${totalOrder} total order`, icon: BarChart3, color: "#7c3aed", bg: "#f5f3ff" },
    { title: "Jumlah Order", value: totalOrder.toString(), desc: `${monthlyData.length} bulan`, icon: ShoppingCart, color: "#7c3aed", bg: "#f5f3ff" },
  ]

  return (
    <div style={{ padding: "24px 28px", maxWidth: 1200, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#001526" }}>Laporan Penjualan</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 4 }}>Ringkasan penjualan — Periode: {tanggalAwal} - {tanggalAkhir}</p>
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

      {/* Date Range Filter + Memorize */}
      <div style={{ background: "#fff", border: "1px solid #ecebea", borderRadius: 8, padding: "14px 20px", marginBottom: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#444746" }}>Rentang Tanggal:</span>
          <input style={{ ...inputStyle, width: 120 }} value={tanggalAwal} onChange={e => setTanggalAwal(e.target.value)} placeholder="DD/MM/YYYY" />
          <span style={{ fontSize: 13, color: "#666" }}>s/d</span>
          <input style={{ ...inputStyle, width: 120 }} value={tanggalAkhir} onChange={e => setTanggalAkhir(e.target.value)} placeholder="DD/MM/YYYY" />
          <div style={{ flex: 1 }} />
          {showPresetInput ? (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <input style={{ ...inputStyle, width: 160 }} value={presetName} onChange={e => setPresetName(e.target.value)} placeholder="Nama preset..." onKeyDown={e => e.key === "Enter" && handleSimpanFilter()} autoFocus />
              <button onClick={handleSimpanFilter} style={{ height: 34, padding: "0 12px", fontSize: 12, fontWeight: 600, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }}>Simpan</button>
              <button onClick={() => setShowPresetInput(false)} style={{ height: 34, padding: "0 10px", fontSize: 12, fontWeight: 600, background: "#fff", color: "#444746", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}>Batal</button>
            </div>
          ) : (
            <button onClick={() => setShowPresetInput(true)} style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 34, padding: "0 14px", fontSize: 13, fontWeight: 600, background: "#fff", color: "#0176d3", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }}>
              <Bookmark size={14} /> Simpan Filter
            </button>
          )}
        </div>
        {/* Saved Presets as Chips */}
        {savedPresets.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, color: "#888" }}>Preset tersimpan:</span>
            {savedPresets.map(p => (
              <span key={p.nama} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px", fontSize: 12, fontWeight: 500, background: "#eef4ff", color: "#0176d3", border: "1px solid #c2dbf5", borderRadius: 14, cursor: "pointer" }} onClick={() => handleApplyPreset(p)} title={`${p.tanggalAwal} - ${p.tanggalAkhir}`}>
                {p.nama}
                <button onClick={e => { e.stopPropagation(); handleRemovePreset(p.nama) }} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", color: "#0176d3", opacity: 0.6 }}>
                  <X size={11} />
                </button>
              </span>
            ))}
          </div>
        )}
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

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        {/* Monthly Table */}
        <div style={{ background: "#fff", border: "1px solid #ecebea", borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "hidden" }}>
          <div style={{ padding: "16px 24px", borderBottom: "1px solid #ecebea" }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526" }}>Penjualan Bulanan</h3>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={thStyle}>BULAN</th>
                <th style={{ ...thStyle, textAlign: "right" }}>JUMLAH ORDER</th>
                <th style={{ ...thStyle, textAlign: "right" }}>TOTAL NILAI</th>
                <th style={{ ...thStyle, textAlign: "right" }}>RATA-RATA/ORDER</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map(row => (
                <tr key={row.bulan} style={{ cursor: "pointer" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#f0f7ff"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
                >
                  <td style={{ ...tdStyle, color: "#444746" }}>{row.bulan}</td>
                  <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace" }}>{row.order}</td>
                  <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace" }}>{formatIDR(row.total)}</td>
                  <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace" }}>{formatIDR(Math.round(row.total / row.order))}</td>
                </tr>
              ))}
              <tr style={{ background: "#f8f9fa", fontWeight: 700 }}>
                <td style={{ ...tdStyle, fontWeight: 700 }}>TOTAL</td>
                <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace", fontWeight: 700 }}>{totalOrder}</td>
                <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace", fontWeight: 700 }}>{formatIDR(totalPenjualan)}</td>
                <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace", fontWeight: 700 }}>{formatIDR(Math.round(avgPerOrder))}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Top Products */}
        <div style={{ background: "#fff", border: "1px solid #ecebea", borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "hidden" }}>
          <div style={{ padding: "16px 24px", borderBottom: "1px solid #ecebea" }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526" }}>5 Produk Terlaris</h3>
          </div>
          <div style={{ padding: 16 }}>
            {topProducts.map((p, i) => (
              <div key={p.rank} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < topProducts.length - 1 ? "1px solid #f0f0f0" : "none" }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: "#f5f3ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#7c3aed", flexShrink: 0 }}>
                  {p.rank}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#001526", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</p>
                  <p style={{ fontSize: 11, color: "#444746" }}>{p.qty} unit terjual</p>
                </div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#001526", fontFamily: "monospace", whiteSpace: "nowrap" }}>{formatIDR(p.total)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
