"use client"

import { useState } from "react"
import { Plus, RefreshCw, Printer, Search } from "lucide-react"

interface FOBItem {
  id: string; nama: string
}

const dummyData: FOBItem[] = [
  { id: "1", nama: "Destination" },
  { id: "2", nama: "Shipping Point" },
]

export default function FOBPage() {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ nama: "" })

  const filtered = dummyData.filter((item) => {
    if (search && !item.nama.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const handleSave = () => { console.log("Save:", formData); setShowForm(false); setFormData({ nama: "" }) }

  const thStyle: React.CSSProperties = { fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", padding: "8px 12px", textAlign: "left", background: "#fff" }
  const tdStyle: React.CSSProperties = { padding: "8px 12px", fontSize: 13, color: "#001526" }
  const btnStyle: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", fontSize: 13, fontWeight: 600, background: "#0176d3", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }
  const inputStyle: React.CSSProperties = { height: 32, padding: "0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none" }
  const iconBtnStyle: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "transparent", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer", color: "#0176d3" }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "16px 20px 0", background: "#fff" }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", margin: 0 }}>FOB</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2, margin: 0 }}>Kelola pengaturan Free On Board</p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, paddingBottom: 12 }}>
          <button style={btnStyle} onClick={() => setShowForm(!showForm)}><Plus size={14} /></button>
          <button style={iconBtnStyle}><RefreshCw size={14} /></button>
          <div style={{ flex: 1 }} />
          <button style={iconBtnStyle}><Printer size={14} /></button>
          <div style={{ position: "relative" }}>
            <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#444746" }} />
            <input placeholder="Cari FOB..." value={search} onChange={(e) => setSearch(e.target.value)}
              style={{ ...inputStyle, paddingLeft: 30, paddingRight: 10, width: 180 }} />
          </div>
          <span style={{ fontSize: 12, color: "#444746", minWidth: 20, textAlign: "right" }}>{filtered.length}</span>
        </div>
      </div>

      {showForm && (
        <div style={{ background: "#f8f9fa", padding: "16px 20px", borderBottom: "1px solid #ecebea" }}>
          <div style={{ border: "1px solid #ddd", borderRadius: 8, background: "#fff", position: "relative", padding: 20, maxWidth: 500 }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: "#001526", margin: "0 0 16px" }}>FOB</h3>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <label style={{ fontSize: 13, color: "#444746", minWidth: 60 }}>Nama <span style={{ color: "#ea001e" }}>*</span></label>
              <input value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                style={{ ...inputStyle, flex: 1, maxWidth: 300 }} />
            </div>
            <button onClick={handleSave}
              style={{ position: "absolute", right: 20, top: 20, width: 36, height: 36, display: "inline-flex", alignItems: "center", justifyContent: "center", background: "#f3f3f3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer", color: "#444746" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
            </button>
          </div>
        </div>
      )}

      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ecebea" }}>
              <th style={thStyle}>Nama</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td style={{ ...tdStyle, textAlign: "center", padding: "64px 12px", color: "#444746" }}>Belum ada data</td></tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id}
                  style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer", transition: "background 100ms" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#f0f7ff"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <td style={{ ...tdStyle, fontWeight: 500, color: "#001526" }}>{item.nama}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
