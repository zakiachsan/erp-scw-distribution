"use client"

import { useState } from "react"
import { RefreshCw, Search, Printer } from "lucide-react"
import { dummyAssetChanges } from "@/lib/accounting-dummy-data"

const selectStyle: React.CSSProperties = {
  height: 32, padding: "0 24px 0 10px", fontSize: 13,
  border: "1px solid #d8d8d8", borderRadius: 6,
  background: "#fff", color: "#001526", cursor: "pointer",
  appearance: "none" as const,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat" as const, backgroundPosition: "right 10px center",
}
const thStyle: React.CSSProperties = { padding: "10px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", borderBottom: "1px solid #e0e0e0" }
const tdStyle: React.CSSProperties = { padding: "8px 12px", fontSize: 13, color: "#001526" }
const rowStyle: React.CSSProperties = { borderBottom: "1px solid #f0f0f0" }
const btnIcon: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }
const btnIconOutline: React.CSSProperties = { ...btnIcon, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8" }

export default function PerubahanAsetTetapPage() {
  const [search, setSearch] = useState("")
  const [filterField, setFilterField] = useState("semua")

  const filtered = dummyAssetChanges.filter(c => {
    if (search && !c.namaAset.toLowerCase().includes(search.toLowerCase()) && !c.kodeAset.toLowerCase().includes(search.toLowerCase())) return false
    if (filterField !== "semua" && c.field !== filterField) return false
    return true
  })

  const fieldOptions = Array.from(new Set(dummyAssetChanges.map(c => c.field)))

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Perubahan Aset Tetap</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Histori perubahan data aset tetap (lokasi, metode, status, dll)</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 16, marginBottom: 12 }}>
          <div style={{ background: "#fff", border: "1px solid #ecebea", borderRadius: 8, padding: "14px 16px" }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", marginBottom: 4 }}>Total Perubahan</p>
            <p style={{ fontSize: 22, fontWeight: 700, color: "#0176d3" }}>{dummyAssetChanges.length}</p>
            <p style={{ fontSize: 11, color: "#888", marginTop: 2 }}>histori tercatat</p>
          </div>
          <div style={{ background: "#fff", border: "1px solid #ecebea", borderRadius: 8, padding: "14px 16px" }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", marginBottom: 4 }}>Aset Terdampak</p>
            <p style={{ fontSize: 22, fontWeight: 700, color: "#001526" }}>{new Set(dummyAssetChanges.map(c => c.kodeAset)).size}</p>
            <p style={{ fontSize: 11, color: "#888", marginTop: 2 }}>aset unik</p>
          </div>
          <div style={{ background: "#fff", border: "1px solid #ecebea", borderRadius: 8, padding: "14px 16px" }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", marginBottom: 4 }}>Field Paling Diubah</p>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#001526", marginTop: 6 }}>Lokasi</p>
            <p style={{ fontSize: 11, color: "#888", marginTop: 2 }}>2 perubahan tercatat</p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12, flexWrap: "wrap" }}>
          <select value={filterField} onChange={e => setFilterField(e.target.value)} style={selectStyle}>
            <option value="semua">Field: Semua</option>
            {fieldOptions.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
          <div style={{ flex: 1 }} />
          <button style={btnIconOutline}><RefreshCw size={14} /></button>
          <button style={btnIconOutline}><Printer size={14} /></button>
          <div style={{ position: "relative" }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
            <input type="text" placeholder="Cari perubahan aset..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ height: 32, padding: "0 10px 0 30px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, width: 200, outline: "none" }} />
          </div>
          <span style={{ fontSize: 11, color: "#888", minWidth: 20, textAlign: "right" }}>{filtered.length}</span>
        </div>
      </div>

      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ background: "#fff" }}>
            {[
              { l: "#" }, { l: "Tanggal Perubahan" }, { l: "Kode Aset" }, { l: "Nama Aset" },
              { l: "Field yang Diubah" }, { l: "Nilai Lama" }, { l: "Nilai Baru" },
              { l: "Pengguna" }, { l: "Keterangan" },
            ].map(c => <th key={c.l} style={thStyle}>{c.l}</th>)}
          </tr></thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={9} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data perubahan</td></tr>
            ) : filtered.map((c, idx) => (
              <tr key={c.id} style={rowStyle}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "#f0f7ff"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}
              >
                <td style={{ ...tdStyle, color: "#444746" }}>{idx + 1}</td>
                <td style={tdStyle}>{c.tanggal}</td>
                <td style={{ ...tdStyle, fontFamily: "monospace", color: "#0176d3", fontWeight: 600 }}>{c.kodeAset}</td>
                <td style={{ ...tdStyle, fontWeight: 500 }}>{c.namaAset}</td>
                <td style={tdStyle}>
                  <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 4, background: "#e8f1fb", color: "#0176d3", fontSize: 11, fontWeight: 600 }}>{c.field}</span>
                </td>
                <td style={{ ...tdStyle, color: "#ea001e", textDecoration: "line-through" }}>{c.nilaiLama}</td>
                <td style={{ ...tdStyle, color: "#2e844a", fontWeight: 500 }}>{c.nilaiBaru}</td>
                <td style={{ ...tdStyle, fontSize: 12 }}>{c.pengguna}</td>
                <td style={{ ...tdStyle, fontSize: 12, color: "#666" }}>{c.keterangan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
