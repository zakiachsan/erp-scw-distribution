"use client"

import { useState } from "react"
import { Plus, RefreshCw, Search, Filter } from "lucide-react"

const selectStyle: React.CSSProperties = {
  height: 32, padding: "0 24px 0 10px", fontSize: 13,
  border: "1px solid #d8d8d8", borderRadius: 6,
  background: "#fff", color: "#001526", cursor: "pointer",
  appearance: "none" as const,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat" as const, backgroundPosition: "right 10px center",
}
const inputStyle: React.CSSProperties = {
  height: 32, padding: "0 10px", fontSize: 13,
  border: "1px solid #d8d8d8", borderRadius: 6,
  outline: "none", width: "100%", boxSizing: "border-box",
}
const labelStyle: React.CSSProperties = { fontSize: 13, color: "#444746", minWidth: 100 }
const thStyle: React.CSSProperties = { padding: "8px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", borderBottom: "1px solid #e0e0e0" }
const tdStyle: React.CSSProperties = { padding: "8px 12px", fontSize: 13, color: "#001526" }
const tdMono: React.CSSProperties = { ...tdStyle, fontFamily: "monospace", fontSize: 12 }
const rowStyle: React.CSSProperties = { borderBottom: "1px solid #f0f0f0" }
const btnIcon: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }
const btnIconOutline: React.CSSProperties = { ...btnIcon, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8" }

export default function PenerimaanBarangPage() {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [filterStatus, setFilterStatus] = useState("semua")
  const [items] = useState<{ id: string; nomor: string; noTerima: string; tanggal: string; pemasok: string; keterangan: string; status: string }[]>([])
  const filtered = items.filter(i => {
    if (search && !i.nomor.toLowerCase().includes(search.toLowerCase())) return false
    if (filterStatus !== "semua" && i.status !== filterStatus) return false
    return true
  })
  const handleSave = () => setShowForm(false)

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Penerimaan Barang</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Proses penerimaan barang dari pemasok</p>
        </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12, flexWrap: "wrap" }}>
            <select style={selectStyle}><option>Tanggal: Semua</option></select>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={selectStyle}>
            <option value="semua">Status: Semua</option><option>Draft</option><option>Received</option>
            </select>
            <div style={{ flex: 1 }} />
            <div style={{ position: "relative" }}>
              <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
              <input type="text" placeholder="Cari penerimaan barang..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ height: 32, padding: "0 10px 0 30px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, width: 200, outline: "none" }} />
            </div>
            <span style={{ fontSize: 11, color: "#888", minWidth: 20, textAlign: "right" }}>{filtered.length}</span>
          </div>
      </div>

      {showForm && (
        <div style={{ background: "#f3f3f3", padding: "16px 20px", borderBottom: "1px solid #d8d8d8" }}>
          <div style={{ background: "#fff", borderRadius: 8, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526", marginBottom: 16 }}>Data Baru</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><label style={labelStyle}>Pemasok *</label><input style={{ ...inputStyle, flex: 1 }} placeholder="Cari/Pilih..." /></div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><label style={labelStyle}>Form No *</label><input style={{ ...inputStyle, flex: 1 }} placeholder="Otomatis" /></div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><label style={labelStyle}>Tanggal *</label><input style={{ ...inputStyle, width: 130 }} defaultValue="07/07/2026" /></div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><label style={labelStyle}>No Terima *</label><input style={{ ...inputStyle, flex: 1 }} /></div>
            </div>
            <div style={{ marginTop: 16 }}>
              <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "7px 14px", fontSize: 13, fontWeight: 600, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }} onClick={handleSave}>Simpan</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ background: "#fff" }}>
            <th style={thStyle}>Nomor #</th>
            <th style={thStyle}>No Terima #</th>
            <th style={thStyle}>Tanggal</th>
            <th style={thStyle}>Pemasok</th>
            <th style={thStyle}>Keterangan</th>
            <th style={thStyle}>Status</th>
          </tr></thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data</td></tr>
            ) : filtered.map(item => (
              <tr key={item.id} style={rowStyle}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#f0f7ff"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
              >
                <td style={tdMono}>{item.nomor}</td>
                <td style={tdMono}>{item.noTerima}</td>
                <td style={tdStyle}>{item.tanggal}</td>
                <td style={tdStyle}>{item.pemasok}</td>
                <td style={tdStyle}>{item.keterangan}</td>
                <td style={tdStyle}>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
