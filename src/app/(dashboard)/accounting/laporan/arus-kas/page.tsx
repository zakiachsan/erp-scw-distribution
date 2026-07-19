"use client"

import { useState } from "react"
import { Printer, Download } from "lucide-react"

function formatIDR(n: number) { return `Rp ${n.toLocaleString("id-ID")}` }
function renderValue(val: number) {
  if (val < 0) return `(Rp ${Math.abs(val).toLocaleString("id-ID")})`
  return formatIDR(val)
}

const periods = ["Januari 2026", "Februari 2026", "Maret 2026", "April 2026", "Mei 2026", "Juni 2026"]

const operasiRows = [
  { label: "Penerimaan dari Pelanggan", value: 165000000 },
  { label: "Pembayaran ke Supplier", value: -82000000 },
  { label: "Pembayaran Gaji & THR", value: -18500000 },
  { label: "Pembayaran Sewa Kantor", value: -9000000 },
  { label: "Pembayaran Listrik & Air", value: -1700000 },
  { label: "Pembayaran Biaya Pengiriman", value: -4200000 },
  { label: "Pembayaran Pajak", value: -12000000 },
  { label: "Pembayaran Lain-Lain", value: -3500000 },
]
const kasBersihOperasi = operasiRows.reduce((s, r) => s + r.value, 0)

const investasiRows = [
  { label: "Pembelian Peralatan", value: -4500000 },
]
const kasBersihInvestasi = investasiRows.reduce((s, r) => s + r.value, 0)

const pendanaanRows = [
  { label: "Pinjaman Bank", value: 15000000 },
  { label: "Pembayaran Cicilan Utang", value: -8000000 },
]
const kasBersihPendanaan = pendanaanRows.reduce((s, r) => s + r.value, 0)

const perubahanKas = kasBersihOperasi + kasBersihInvestasi + kasBersihPendanaan
const kasAwal = 50000000
const kasAkhir = kasAwal + perubahanKas

const thStyle: React.CSSProperties = { fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", padding: "10px 16px", borderBottom: "2px solid #ecebea", whiteSpace: "nowrap" }
const tdStyle: React.CSSProperties = { fontSize: 13, color: "#001526", padding: "10px 16px", borderBottom: "1px solid #f0f0f0" }

export default function ArusKasPage() {
  const [period, setPeriod] = useState("Juni 2026")

  const renderSection = (title: string, color: string, rows: { label: string; value: number }[], subtotal: number, subtotalLabel: string) => (
    <>
      <tr>
        <td style={{ ...tdStyle, fontWeight: 700, color, background: "#f8f9fa" }} colSpan={2}>{title}</td>
      </tr>
      {rows.map(row => (
        <tr key={row.label}>
          <td style={{ ...tdStyle, paddingLeft: 32 }}>{row.label}</td>
          <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace", color: row.value < 0 ? "#ea001e" : "#001526" }}>{renderValue(row.value)}</td>
        </tr>
      ))}
      <tr>
        <td style={{ ...tdStyle, fontWeight: 700, borderTop: "1px solid #d8d8d8", background: "#f8f9fa" }}>{subtotalLabel}</td>
        <td style={{ ...tdStyle, textAlign: "right", fontWeight: 700, fontFamily: "monospace", borderTop: "1px solid #d8d8d8", background: "#f8f9fa", color: subtotal < 0 ? "#ea001e" : "#059669" }}>{renderValue(subtotal)}</td>
      </tr>
    </>
  )

  return (
    <div style={{ padding: "24px 28px", maxWidth: 1000, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#001526" }}>Arus Kas</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 4 }}>Cash Flow Statement — Periode: 1 Januari - 30 Juni 2026</p>
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

      {/* Cash Flow Table */}
      <div style={{ background: "#fff", border: "1px solid #ecebea", borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ ...thStyle, width: "60%" }}>KETERANGAN</th>
              <th style={{ ...thStyle, textAlign: "right", width: "40%" }}>NOMINAL</th>
            </tr>
          </thead>
          <tbody>
            {/* Aktivitas Operasi */}
            {renderSection("ARUS KAS DARI AKTIVITAS OPERASI", "#d97706", operasiRows, kasBersihOperasi, "Kas Bersih dari Operasi")}

            {/* Aktivitas Investasi */}
            {renderSection("ARUS KAS DARI AKTIVITAS INVESTASI", "#0176d3", investasiRows, kasBersihInvestasi, "Kas Bersih dari Investasi")}

            {/* Aktivitas Pendanaan */}
            {renderSection("ARUS KAS DARI AKTIVITAS PENDANAAN", "#7b4c9e", pendanaanRows, kasBersihPendanaan, "Kas Bersih dari Pendanaan")}

            {/* Summary */}
            <tr>
              <td style={{ ...tdStyle, fontWeight: 700, fontSize: 15, background: "#fffbeb" }}>PERUBAHAN KAS BERSIH</td>
              <td style={{ ...tdStyle, textAlign: "right", fontWeight: 700, fontSize: 15, fontFamily: "monospace", background: "#fffbeb", color: "#d97706" }}>{formatIDR(perubahanKas)}</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, paddingLeft: 32 }}>Kas Awal</td>
              <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace" }}>{formatIDR(kasAwal)}</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 700, fontSize: 15, background: "#d97706", color: "#fff" }}>Kas Akhir</td>
              <td style={{ ...tdStyle, textAlign: "right", fontWeight: 700, fontSize: 15, fontFamily: "monospace", background: "#d97706", color: "#fff" }}>{formatIDR(kasAkhir)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
