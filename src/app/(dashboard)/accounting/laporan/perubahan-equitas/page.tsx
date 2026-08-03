"use client"

const TH: React.CSSProperties = { fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", padding: "8px 12px", textAlign: "left", borderBottom: "1px solid #e0e0e0", whiteSpace: "nowrap" }
const TH_RIGHT: React.CSSProperties = { ...TH, textAlign: "right" }
const TD: React.CSSProperties = { fontSize: 13, color: "#001526", padding: "8px 12px", borderBottom: "1px solid #f0f0f0" }

function fmtIDR(n: number) { return `Rp ${n.toLocaleString("id-ID")}` }

interface EquityRow {
  year: string
  modalAwal: number
  tambahanModal: number
  dividen: number
  labaDitahan: number
  modalAkhir: number
}

const DATA: EquityRow[] = [
  { year: "2024", modalAwal: 1500000000, tambahanModal: 0,          dividen: 150000000, labaDitahan: 425000000,  modalAkhir: 1775000000 },
  { year: "2025", modalAwal: 1775000000, tambahanModal: 200000000,  dividen: 200000000, labaDitahan: 580000000,  modalAkhir: 2355000000 },
  { year: "2026", modalAwal: 2355000000, tambahanModal: 0,          dividen: 250000000, labaDitahan: 720000000,  modalAkhir: 2825000000 },
]

export default function PerubahanEquitasPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Perubahan Equitas Pemilik</h1>
        <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Statement of Changes in Equity — perubahan modal dari tahun ke tahun</p>
      </div>

      <div style={{ flex: 1, overflow: "auto", background: "#fff", marginTop: 14 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
            <tr>
              <th style={TH}>Tahun</th>
              <th style={TH_RIGHT}>Modal Awal</th>
              <th style={TH_RIGHT}>+ Tambahan Modal</th>
              <th style={TH_RIGHT}>− Dividen</th>
              <th style={TH_RIGHT}>+ Laba Ditahan</th>
              <th style={TH_RIGHT}>Modal Akhir</th>
              <th style={TH_RIGHT}>Δ YoY</th>
            </tr>
          </thead>
          <tbody>
            {DATA.map((r, idx) => {
              const delta = idx > 0 ? r.modalAkhir - DATA[idx - 1].modalAkhir : 0
              return (
                <tr key={r.year} style={{ background: idx % 2 === 0 ? "#fff" : "#fafbfc" }}>
                  <td style={{ ...TD, fontWeight: 600, color: "#0176d3" }}>{r.year}</td>
                  <td style={{ ...TD, textAlign: "right", fontFamily: "monospace" }}>{fmtIDR(r.modalAwal)}</td>
                  <td style={{ ...TD, textAlign: "right", fontFamily: "monospace", color: r.tambahanModal > 0 ? "#0d7a3d" : "#aaa" }}>
                    {r.tambahanModal > 0 ? fmtIDR(r.tambahanModal) : "—"}
                  </td>
                  <td style={{ ...TD, textAlign: "right", fontFamily: "monospace", color: "#c1342b" }}>
                    {r.dividen > 0 ? `(${fmtIDR(r.dividen)})` : "—"}
                  </td>
                  <td style={{ ...TD, textAlign: "right", fontFamily: "monospace", color: "#0d7a3d" }}>{fmtIDR(r.labaDitahan)}</td>
                  <td style={{ ...TD, textAlign: "right", fontFamily: "monospace", fontWeight: 700, color: "#001526" }}>{fmtIDR(r.modalAkhir)}</td>
                  <td style={{ ...TD, textAlign: "right", fontFamily: "monospace", color: delta >= 0 ? "#0d7a3d" : "#c1342b" }}>
                    {idx === 0 ? "—" : `${delta >= 0 ? "+" : ""}${fmtIDR(delta)}`}
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
