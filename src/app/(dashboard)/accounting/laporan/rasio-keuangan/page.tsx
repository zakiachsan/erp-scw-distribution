"use client"

import { useState } from "react"

const TH: React.CSSProperties = { fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", padding: "8px 12px", textAlign: "left", borderBottom: "1px solid #e0e0e0", whiteSpace: "nowrap" }
const TH_RIGHT: React.CSSProperties = { ...TH, textAlign: "right" }
const TD: React.CSSProperties = { fontSize: 13, color: "#001526", padding: "8px 12px", borderBottom: "1px solid #f0f0f0" }

type Tab = "tahun" | "bulan"
interface RatioRow {
  name: string
  formula: string
  v2024: number
  v2025: number
  v2026: number
  format: "decimal2" | "percent"
  /* For "bulan" view, 12 monthly values for 2026 */
  monthly?: number[]
}

const RATIOS: RatioRow[] = [
  { name: "Current Ratio",       formula: "Aset Lancar / Kewajiban Lancar", v2024: 2.10, v2025: 2.35, v2026: 2.58, format: "decimal2", monthly: [2.40, 2.45, 2.50, 2.42, 2.55, 2.60, 2.48, 2.52, 2.55, 2.60, 2.65, 2.58] },
  { name: "Quick Ratio",         formula: "(Aset Lancar − Persediaan) / Kewajiban Lancar", v2024: 1.45, v2025: 1.62, v2026: 1.78, format: "decimal2", monthly: [1.65, 1.68, 1.72, 1.70, 1.75, 1.78, 1.74, 1.76, 1.78, 1.80, 1.82, 1.78] },
  { name: "Debt to Equity",      formula: "Total Kewajiban / Total Ekuitas", v2024: 0.65, v2025: 0.58, v2026: 0.52, format: "decimal2", monthly: [0.55, 0.54, 0.53, 0.54, 0.53, 0.52, 0.53, 0.52, 0.52, 0.51, 0.52, 0.52] },
  { name: "ROA (Return on Assets)",    formula: "Laba Bersih / Total Aset",  v2024: 0.128, v2025: 0.142, v2026: 0.158, format: "percent", monthly: [0.012, 0.013, 0.014, 0.013, 0.014, 0.015, 0.014, 0.013, 0.014, 0.014, 0.015, 0.013] },
  { name: "ROE (Return on Equity)",    formula: "Laba Bersih / Total Ekuitas", v2024: 0.211, v2025: 0.224, v2026: 0.240, format: "percent", monthly: [0.020, 0.021, 0.022, 0.021, 0.022, 0.023, 0.022, 0.021, 0.022, 0.022, 0.023, 0.021] },
  { name: "Gross Margin",        formula: "(Penjualan − HPP) / Penjualan", v2024: 0.42, v2025: 0.45, v2026: 0.47, format: "percent", monthly: [0.46, 0.47, 0.47, 0.46, 0.47, 0.48, 0.47, 0.47, 0.47, 0.48, 0.48, 0.47] },
  { name: "Net Margin",          formula: "Laba Bersih / Penjualan", v2024: 0.085, v2025: 0.092, v2026: 0.103, format: "percent", monthly: [0.010, 0.010, 0.011, 0.010, 0.011, 0.011, 0.010, 0.010, 0.011, 0.011, 0.012, 0.010] },
]

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]

function fmt(value: number, format: RatioRow["format"]) {
  if (format === "percent") return `${(value * 100).toFixed(2)}%`
  return value.toFixed(2)
}

function healthColor(value: number, ratioName: string): string {
  /* Generic coloring: higher = better for most, except Debt to Equity (lower = better) */
  if (ratioName === "Debt to Equity") return value <= 0.55 ? "#0d7a3d" : value <= 0.75 ? "#b95000" : "#c1342b"
  if (ratioName.includes("Margin")) return value >= 0.10 ? "#0d7a3d" : value >= 0.05 ? "#b95000" : "#c1342b"
  return value >= 1.5 ? "#0d7a3d" : value >= 1.0 ? "#b95000" : "#c1342b"
}

export default function RasioKeuanganPage() {
  const [tab, setTab] = useState<Tab>("tahun")

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Rasio Keuangan</h1>
        <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Indikator kesehatan finansial perusahaan — likuiditas, solvabilitas, profitabilitas</p>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, marginTop: 14, borderBottom: "1px solid #e0e0e0" }}>
          <TabBtn active={tab === "tahun"} onClick={() => setTab("tahun")}>Per Tahun</TabBtn>
          <TabBtn active={tab === "bulan"} onClick={() => setTab("bulan")}>Per Bulan</TabBtn>
        </div>
      </div>

      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
            <tr>
              <th style={TH}>Rasio</th>
              <th style={TH}>Formula</th>
              {tab === "tahun" ? (
                <>
                  <th style={TH_RIGHT}>2024</th>
                  <th style={TH_RIGHT}>2025</th>
                  <th style={TH_RIGHT}>2026</th>
                  <th style={TH_RIGHT}>Δ 2024→2026</th>
                </>
              ) : (
                MONTHS.map((m) => <th key={m} style={TH_RIGHT}>{m} 2026</th>)
              )}
            </tr>
          </thead>
          <tbody>
            {RATIOS.map((r, idx) => (
              <tr key={r.name} style={{ background: idx % 2 === 0 ? "#fff" : "#fafbfc" }}>
                <td style={{ ...TD, fontWeight: 600 }}>{r.name}</td>
                <td style={{ ...TD, fontSize: 11, color: "#666" }}>{r.formula}</td>
                {tab === "tahun" ? (
                  <>
                    <td style={{ ...TD, textAlign: "right", fontFamily: "monospace", color: healthColor(r.v2024, r.name) }}>{fmt(r.v2024, r.format)}</td>
                    <td style={{ ...TD, textAlign: "right", fontFamily: "monospace", color: healthColor(r.v2025, r.name) }}>{fmt(r.v2025, r.format)}</td>
                    <td style={{ ...TD, textAlign: "right", fontFamily: "monospace", fontWeight: 700, color: healthColor(r.v2026, r.name) }}>{fmt(r.v2026, r.format)}</td>
                    <td style={{ ...TD, textAlign: "right", fontFamily: "monospace", color: (r.v2026 - r.v2024) >= 0 ? "#0d7a3d" : "#c1342b" }}>
                      {r.v2026 >= r.v2024 ? "+" : ""}{(((r.v2026 - r.v2024) / r.v2024) * 100).toFixed(1)}%
                    </td>
                  </>
                ) : (
                  (r.monthly || Array(12).fill(0)).map((v, i) => (
                    <td key={i} style={{ ...TD, textAlign: "right", fontFamily: "monospace", fontSize: 12, color: healthColor(v, r.name) }}>{fmt(v, r.format)}</td>
                  ))
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 18px", fontSize: 13, fontWeight: active ? 600 : 400,
        background: "transparent", color: active ? "#0176d3" : "#666",
        border: "none", borderBottom: active ? "2px solid #0176d3" : "2px solid transparent",
        marginBottom: -1, cursor: "pointer",
      }}
    >
      {children}
    </button>
  )
}
