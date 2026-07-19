"use client"

import { useState } from "react"
import { Plus, RefreshCw, Settings, Search } from "lucide-react"

interface Kategori { id: string; nama: string; keterangan: string }
const dummyData: Kategori[] = [
  { id: "1", nama: "General", keterangan: "Penjualan retail dan grosir" },
  { id: "2", nama: "Online", keterangan: "Penjualan via marketplace" },
]

const thStyle: React.CSSProperties = { padding: "8px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", borderBottom: "1px solid #e0e0e0" }
const tdStyle: React.CSSProperties = { padding: "8px 12px", fontSize: 13, color: "#001526" }
const rowStyle: React.CSSProperties = { borderBottom: "1px solid #f0f0f0" }
const btnIcon: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }
const btnIconOutline: React.CSSProperties = { ...btnIcon, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8" }
const inputStyle: React.CSSProperties = { height: 32, padding: "0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none", width: "100%", boxSizing: "border-box" }
const labelStyle: React.CSSProperties = { fontSize: 13, color: "#444746", minWidth: 100 }

export default function KategoriPenjualanPage() {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ nama: "", keterangan: "" })

  const filtered = dummyData.filter(i => !search || i.nama.toLowerCase().includes(search.toLowerCase()))
  const handleSave = () => { console.log("Save:", formData); setShowForm(false) }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Kategori Penjualan</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Kelola kategori jenis penjualan</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <button onClick={() => setShowForm(!showForm)} style={btnIcon}><Plus size={16} /></button>
          <button style={btnIconOutline}><RefreshCw size={14} /></button>
          <button style={btnIconOutline}><Settings size={14} /></button>
          <div style={{ flex: 1 }} />
          <div style={{ position: "relative" }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
            <input type="text" placeholder="Cari kategori penjualan..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ height: 32, padding: "0 10px 0 30px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, width: 200, outline: "none" }} />
          </div>
          <span style={{ fontSize: 11, color: "#888" }}>{filtered.length}</span>
        </div>
      </div>

      {showForm && (
        <div style={{ background: "#f3f3f3", padding: "16px 20px", borderBottom: "1px solid #d8d8d8" }}>
          <div style={{ background: "#fff", borderRadius: 8, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", position: "relative", maxWidth: 500 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526", marginBottom: 16 }}>Kategori Penjualan</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Nama Kategori *</label>
                <input type="text" value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})} style={{ ...inputStyle, border: "1px solid #0176d3" }} />
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <label style={{ ...labelStyle, marginTop: 6 }}>Keterangan</label>
                <textarea value={formData.keterangan} onChange={(e) => setFormData({...formData, keterangan: e.target.value})} rows={3} style={{ ...inputStyle, resize: "vertical", height: "auto", padding: "6px 10px" }} />
              </div>
            </div>
            <button onClick={handleSave} style={{ position: "absolute", right: 24, top: 20, ...btnIconOutline }} title="Simpan">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
            </button>
          </div>
        </div>
      )}

      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ background: "#fff" }}>
            <th style={{ ...thStyle, width: "40%" }}>Keterangan</th>
            <th style={{ ...thStyle, width: "60%" }}>Nama Kategori</th>
          </tr></thead>
          <tbody>
            {filtered.map(item => (
              <tr key={item.id} style={rowStyle}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "#f0f7ff"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}
              >
                <td style={{ ...tdStyle, color: "#444746" }}>{item.keterangan || ""}</td>
                <td style={{ ...tdStyle, fontWeight: 500 }}>{item.nama}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
