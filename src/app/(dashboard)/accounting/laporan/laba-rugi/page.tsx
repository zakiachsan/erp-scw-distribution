"use client"

import React, { useState } from "react"
import { Printer, Download } from "lucide-react"

function formatIDR(n: number) { return `Rp ${n.toLocaleString("id-ID")}` }

const periods = ["Januari 2026", "Februari 2026", "Maret 2026", "April 2026", "Mei 2026", "Juni 2026"]

const sections = [
  {
    title: "PENDAPATAN",
    rows: [
      { label: "Pendapatan Penjualan Produk", value: 185000000 },
      { label: "Pendapatan Service/Training", value: 8500000 },
    ],
    totalLabel: "Total Pendapatan",
    totalValue: 193500000,
  },
  {
    title: "HARGA POKOK PENJUALAN",
    rows: [
      { label: "Persediaan Awal (1 Jan 2026)", value: 45000000 },
      { label: "Pembelian Barang Dagang", value: 98000000 },
      { label: "Biaya Pengiriman In", value: 3200000 },
      { label: "Persediaan Tersedia", value: 146200000 },
      { label: "Persediaan Akhir (30 Jun)", value: -52000000 },
    ],
    totalLabel: "HPP",
    totalValue: 94200000,
  },
]

const bebanRows = [
  { label: "Gaji Karyawan (8 org)", value: 16000000 },
  { label: "Sewa Kantor & Gudang", value: 4500000 },
  { label: "Listrik & Air", value: 850000 },
  { label: "Biaya Pengiriman Out", value: 4200000 },
  { label: "Marketing & Promosi", value: 2500000 },
  { label: "Biaya Operasional Kendaraan", value: 1800000 },
  { label: "Penyusutan Peralatan", value: 650000 },
  { label: "Asuransi", value: 350000 },
  { label: "Biaya Lain-Lain", value: 450000 },
]

const thStyle: React.CSSProperties = { fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", padding: "10px 16px", borderBottom: "2px solid #ecebea", whiteSpace: "nowrap" }
const tdStyle: React.CSSProperties = { fontSize: 13, color: "#001526", padding: "10px 16px", borderBottom: "1px solid #f0f0f0" }

export default function LabaRugiPage() {
  const [period, setPeriod] = useState("Juni 2026")

  const labaKotor = sections[0].totalValue - sections[1].totalValue
  const totalBeban = bebanRows.reduce((s, r) => s + r.value, 0)
  const labaBersihSebelumPajak = labaKotor - totalBeban
  const pajak = 13610000
  const labaBersih = labaBersihSebelumPajak - pajak

  const renderValue = (val: number) => {
    if (val < 0) return `(Rp ${Math.abs(val).toLocaleString("id-ID")})`
    return formatIDR(val)
  }

  return (
    <div style={{ padding: "24px 28px", maxWidth: 1000, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#001526" }}>Laba Rugi</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 4 }}>Income Statement — Periode: 1 Januari - 30 Juni 2026</p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <select
            value={period}
            onChange={e => setPeriod(e.target.value)}
            style={{ height: 34, padding: "0 12px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none", background: "#fff" }}
          >
            {periods.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <button
            onClick={() => alert("Download PDF placeholder")}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 34, padding: "0 14px", fontSize: 13, fontWeight: 600, background: "#fff", color: "#001526", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}
          >
            <Download size={14} /> PDF
          </button>
          <button
            onClick={() => window.print()}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 34, padding: "0 14px", fontSize: 13, fontWeight: 600, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }}
          >
            <Printer size={14} /> Cetak
          </button>
        </div>
      </div>

      {/* Statement Table */}
      <div style={{ background: "#fff", border: "1px solid #ecebea", borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ ...thStyle, width: "60%" }}>KETERANGAN</th>
              <th style={{ ...thStyle, textAlign: "right", width: "40%" }}>NOMINAL</th>
            </tr>
          </thead>
          <tbody>
            {/* Pendapatan */}
            {sections.map(section => (
              <React.Fragment key={section.title}>
                <tr key={section.title}>
                  <td style={{ ...tdStyle, fontWeight: 700, color: "#0176d3", background: "#f8f9fa" }} colSpan={2}>{section.title}</td>
                </tr>
                {section.rows.map(row => (
                  <tr key={row.label}>
                    <td style={{ ...tdStyle, paddingLeft: 32 }}>{row.label}</td>
                    <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace", color: row.value < 0 ? "#ea001e" : "#001526" }}>{renderValue(row.value)}</td>
                  </tr>
                ))}
                <tr>
                  <td style={{ ...tdStyle, fontWeight: 700, borderTop: "1px solid #d8d8d8", background: "#f8f9fa" }}>{section.totalLabel}</td>
                  <td style={{ ...tdStyle, textAlign: "right", fontWeight: 700, fontFamily: "monospace", borderTop: "1px solid #d8d8d8", background: "#f8f9fa" }}>{formatIDR(section.totalValue)}</td>
                </tr>
              </React.Fragment>
            ))}

            {/* Laba Kotor */}
            <tr>
              <td style={{ ...tdStyle, fontWeight: 700, fontSize: 15, background: "#e8f5e9" }}>LABA KOTOR</td>
              <td style={{ ...tdStyle, textAlign: "right", fontWeight: 700, fontSize: 15, fontFamily: "monospace", background: "#e8f5e9", color: "#2e844a" }}>{formatIDR(labaKotor)}</td>
            </tr>

            {/* Beban Operasional */}
            <tr>
              <td style={{ ...tdStyle, fontWeight: 700, color: "#ea001e", background: "#f8f9fa" }} colSpan={2}>BEBAN OPERASIONAL</td>
            </tr>
            {bebanRows.map(row => (
              <tr key={row.label}>
                <td style={{ ...tdStyle, paddingLeft: 32 }}>{row.label}</td>
                <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace" }}>{formatIDR(row.value)}</td>
              </tr>
            ))}
            <tr>
              <td style={{ ...tdStyle, fontWeight: 700, borderTop: "1px solid #d8d8d8", background: "#f8f9fa" }}>Total Beban Operasional</td>
              <td style={{ ...tdStyle, textAlign: "right", fontWeight: 700, fontFamily: "monospace", borderTop: "1px solid #d8d8d8", background: "#f8f9fa" }}>{formatIDR(totalBeban)}</td>
            </tr>

            {/* Laba Bersih Sebelum Pajak */}
            <tr>
              <td style={{ ...tdStyle, fontWeight: 700, background: "#eef4ff" }}>LABA BERSIH SEBELUM PAJAK</td>
              <td style={{ ...tdStyle, textAlign: "right", fontWeight: 700, fontFamily: "monospace", background: "#eef4ff", color: "#0176d3" }}>{formatIDR(labaBersihSebelumPajak)}</td>
            </tr>

            {/* Pajak */}
            <tr>
              <td style={{ ...tdStyle, paddingLeft: 32 }}>PPh Badan (22%)</td>
              <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace", color: "#ea001e" }}>(Rp {Math.abs(pajak).toLocaleString("id-ID")})</td>
            </tr>

            {/* Laba Bersih */}
            <tr>
              <td style={{ ...tdStyle, fontWeight: 700, fontSize: 16, background: "#059669", color: "#fff" }}>LABA BERSIH</td>
              <td style={{ ...tdStyle, textAlign: "right", fontWeight: 700, fontSize: 16, fontFamily: "monospace", background: "#059669", color: "#fff" }}>{formatIDR(labaBersih)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
