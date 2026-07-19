"use client"

import { useState } from "react"
import { Printer, Download } from "lucide-react"

function formatIDR(n: number) { return `Rp ${n.toLocaleString("id-ID")}` }
function renderValue(val: number) {
  if (val < 0) return `(Rp ${Math.abs(val).toLocaleString("id-ID")})`
  return formatIDR(val)
}

const periods = ["Januari 2026", "Februari 2026", "Maret 2026", "April 2026", "Mei 2026", "Juni 2026"]

const aktivaLancar = [
  { label: "Kas & Cash Equivalent", value: 28500000 },
  { label: "Bank BCA", value: 45200000 },
  { label: "Bank Mandiri", value: 12800000 },
  { label: "Piutang Usaha", value: 38400000 },
  { label: "Persediaan Barang Dagang", value: 52000000 },
  { label: "Uang Muka Pembelian", value: 5500000 },
  { label: "Perlengkapan", value: 1200000 },
]
const totalAktivaLancar = aktivaLancar.reduce((s, r) => s + r.value, 0)

const aktivaTetap = [
  { label: "Peralatan Kantor", value: 18000000 },
  { label: "Kendaraan Operasional", value: 85000000 },
  { label: "Inventaris", value: 4500000 },
  { label: "Akumulasi Penyusutan", value: -22500000 },
]
const totalAktivaTetap = aktivaTetap.reduce((s, r) => s + r.value, 0)

const totalAktiva = totalAktivaLancar + totalAktivaTetap

const liabPendek = [
  { label: "Utang Usaha (Supplier)", value: 28500000 },
  { label: "Utang Pajak (PPN/PPH)", value: 8200000 },
  { label: "Utang Gaji", value: 3200000 },
  { label: "Uang Muka Customer", value: 4500000 },
]
const totalLiabPendek = liabPendek.reduce((s, r) => s + r.value, 0)

const liabPanjang = [
  { label: "Utang Bank", value: 35000000 },
]
const totalLiabPanjang = liabPanjang.reduce((s, r) => s + r.value, 0)

const modalRows = [
  { label: "Modal Disetor", value: 80000000 },
  { label: "Laba Ditahan Tahun Lalu", value: 54760000 },
  { label: "Laba Bersih Tahun Berjalan", value: 54440000 },
]
const totalModal = modalRows.reduce((s, r) => s + r.value, 0)

const totalPasiva = totalLiabPendek + totalLiabPanjang + totalModal

const thStyle: React.CSSProperties = { fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", padding: "10px 16px", borderBottom: "2px solid #ecebea", whiteSpace: "nowrap" }
const tdStyle: React.CSSProperties = { fontSize: 13, color: "#001526", padding: "10px 16px", borderBottom: "1px solid #f0f0f0" }

export default function NeracaPage() {
  const [period, setPeriod] = useState("Juni 2026")

  const renderSection = (title: string, color: string, rows: { label: string; value: number }[], totalLabel: string, totalValue: number) => (
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
        <td style={{ ...tdStyle, fontWeight: 700, borderTop: "1px solid #d8d8d8", background: "#f8f9fa" }}>{totalLabel}</td>
        <td style={{ ...tdStyle, textAlign: "right", fontWeight: 700, fontFamily: "monospace", borderTop: "1px solid #d8d8d8", background: "#f8f9fa" }}>{formatIDR(totalValue)}</td>
      </tr>
    </>
  )

  return (
    <div style={{ padding: "24px 28px", maxWidth: 1000, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#001526" }}>Neraca</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 4 }}>Balance Sheet — Per 30 Juni 2026</p>
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

      {/* Balance Sheet Table */}
      <div style={{ background: "#fff", border: "1px solid #ecebea", borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ ...thStyle, width: "60%" }}>KETERANGAN</th>
              <th style={{ ...thStyle, textAlign: "right", width: "40%" }}>NOMINAL</th>
            </tr>
          </thead>
          <tbody>
            {/* AKTIVA */}
            <tr>
              <td style={{ ...tdStyle, fontWeight: 700, fontSize: 15, background: "#0176d3", color: "#fff" }} colSpan={2}>AKTIVA</td>
            </tr>
            {renderSection("Aktiva Lancar", "#0176d3", aktivaLancar, "Total Aktiva Lancar", totalAktivaLancar)}
            {renderSection("Aktiva Tetap", "#0176d3", aktivaTetap, "Total Aktiva Tetap", totalAktivaTetap)}
            <tr>
              <td style={{ ...tdStyle, fontWeight: 700, fontSize: 15, background: "#eef4ff" }}>TOTAL AKTIVA</td>
              <td style={{ ...tdStyle, textAlign: "right", fontWeight: 700, fontSize: 15, fontFamily: "monospace", background: "#eef4ff", color: "#0176d3" }}>{formatIDR(totalAktiva)}</td>
            </tr>

            {/* PASIVA */}
            <tr>
              <td style={{ ...tdStyle, fontWeight: 700, fontSize: 15, background: "#7b4c9e", color: "#fff" }} colSpan={2}>PASIVA</td>
            </tr>
            {renderSection("Liabilitas Jangka Pendek", "#7b4c9e", liabPendek, "Total Liabilitas Jangka Pendek", totalLiabPendek)}
            {renderSection("Liabilitas Jangka Panjang", "#7b4c9e", liabPanjang, "Total Liabilitas Jangka Panjang", totalLiabPanjang)}
            {renderSection("Modal", "#059669", modalRows, "Total Modal", totalModal)}
            <tr>
              <td style={{ ...tdStyle, fontWeight: 700, fontSize: 15, background: "#e8f5e9" }}>TOTAL PASIVA</td>
              <td style={{ ...tdStyle, textAlign: "right", fontWeight: 700, fontSize: 15, fontFamily: "monospace", background: "#e8f5e9", color: "#059669" }}>{formatIDR(totalPasiva)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
