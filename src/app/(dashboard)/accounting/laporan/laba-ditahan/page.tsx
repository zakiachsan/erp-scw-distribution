"use client"

import { TrendingUp, Calendar } from "lucide-react"

const TH: React.CSSProperties = { fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", padding: "8px 12px", textAlign: "left", borderBottom: "1px solid #e0e0e0", whiteSpace: "nowrap" }
const TH_RIGHT: React.CSSProperties = { ...TH, textAlign: "right" }
const TD: React.CSSProperties = { fontSize: 13, color: "#001526", padding: "8px 12px", borderBottom: "1px solid #f0f0f0" }

function fmtIDR(n: number) { return `Rp ${n.toLocaleString("id-ID")}` }

interface RowRetained {
  year: string
  saldoAwal: number
  labaBersih: number
  dividen: number
  saldoAkhir: number
}

const DATA: RowRetained[] = [
  { year: "2024", saldoAwal: 850000000,  labaBersih: 425000000, dividen: 150000000, saldoAkhir: 1125000000 },
  { year: "2025", saldoAwal: 1125000000, labaBersih: 580000000, dividen: 200000000, saldoAkhir: 1505000000 },
  { year: "2026", saldoAwal: 1505000000, labaBersih: 720000000, dividen: 250000000, saldoAkhir: 1975000000 },
]

export default function LabaDitahanPage() {
  const totalDividen = DATA.reduce((s, r) => s + r.dividen, 0)
  const totalLaba = DATA.reduce((s, r) => s + r.labaBersih, 0)

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Laba Ditahan</h1>
        <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>
          Statement of Retained Earnings — saldo awal + laba bersih − dividen = saldo akhir
        </p>

        {/* Summary cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 14 }}>
          <SummaryCard icon={<DollarIcon />} label="Saldo Akhir 2026" value={fmtIDR(DATA[2].saldoAkhir)} color="#0d7a3d" />
          <SummaryCard icon={<TrendingUp />} label="Akumulasi Laba 3 Tahun" value={fmtIDR(totalLaba)} color="#0176d3" />
          <SummaryCard icon={<Calendar />} label="Akumulasi Dividen 3 Tahun" value={fmtIDR(totalDividen)} color="#b95000" />
        </div>
      </div>

      <div style={{ flex: 1, overflow: "auto", background: "#fff", marginTop: 14 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
            <tr>
              <th style={TH}>Tahun</th>
              <th style={TH_RIGHT}>Saldo Awal</th>
              <th style={TH_RIGHT}>+ Laba Bersih</th>
              <th style={TH_RIGHT}>− Dividen</th>
              <th style={TH_RIGHT}>Saldo Akhir</th>
              <th style={TH_RIGHT}>Δ YoY</th>
            </tr>
          </thead>
          <tbody>
            {DATA.map((r, idx) => {
              const yoy = idx > 0 ? ((r.saldoAkhir - DATA[idx - 1].saldoAkhir) / DATA[idx - 1].saldoAkhir) * 100 : 0
              return (
                <tr key={r.year} style={{ background: idx % 2 === 0 ? "#fff" : "#fafbfc" }}>
                  <td style={{ ...TD, fontWeight: 600, color: "#0176d3" }}>{r.year}</td>
                  <td style={{ ...TD, textAlign: "right", fontFamily: "monospace" }}>{fmtIDR(r.saldoAwal)}</td>
                  <td style={{ ...TD, textAlign: "right", fontFamily: "monospace", color: "#0d7a3d" }}>{fmtIDR(r.labaBersih)}</td>
                  <td style={{ ...TD, textAlign: "right", fontFamily: "monospace", color: "#c1342b" }}>({fmtIDR(r.dividen)})</td>
                  <td style={{ ...TD, textAlign: "right", fontFamily: "monospace", fontWeight: 700, color: "#001526" }}>{fmtIDR(r.saldoAkhir)}</td>
                  <td style={{ ...TD, textAlign: "right", fontFamily: "monospace", color: yoy >= 0 ? "#0d7a3d" : "#c1342b" }}>
                    {idx === 0 ? "—" : `${yoy >= 0 ? "+" : ""}${yoy.toFixed(1)}%`}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SummaryCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div style={{ background: "#fff", padding: 14, borderRadius: 8, border: "1px solid #e0e0e0", borderLeft: `3px solid ${color}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, color, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
        {icon}{label}
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, color: "#001526", marginTop: 6, fontFamily: "monospace" }}>{value}</div>
    </div>
  )
}

function DollarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}
