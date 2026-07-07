"use client"

import { useState } from "react"
import { Plus, RefreshCw, Settings, Search } from "lucide-react"

interface Satuan { id: string; nama: string }
const dummyData: Satuan[] = [{ id: "1", nama: "PCS" }]

export default function SatuanBarangPage() {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ nama: "", refKodePajak: "" })
  const filtered = dummyData.filter(i => !search || i.nama.toLowerCase().includes(search.toLowerCase()))
  const handleSave = () => { console.log("Save:", formData); setShowForm(false) }
  const inputStyle = { padding: "6px 8px", fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 4, outline: "none", width: "100%", boxSizing: "border-box" as const }
  const labelStyle = { fontSize: 12, color: "#444746", minWidth: 120 }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div><h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Satuan Barang</h1><p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Kelola satuan unit barang</p></div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <button onClick={() => setShowForm(!showForm)} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }}><Plus size={16} /></button>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}><RefreshCw size={14} /></button>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}><Settings size={14} /></button>
          <div style={{ flex: 1 }} />
          <div style={{ position: "relative" }}><Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} /><input type="text" placeholder="Ketik dan [Enter]" value={search} onChange={(e) => setSearch(e.target.value)} style={{ padding: "6px 10px 6px 30px", fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 6, width: 180, outline: "none" }} /></div>
          <span style={{ fontSize: 11, color: "#888" }}>{filtered.length}</span>
        </div>
      </div>

      {showForm && (
        <div style={{ background: "#f3f3f3", padding: "16px 20px", borderBottom: "1px solid #d8d8d8" }}>
          <div style={{ background: "#fff", borderRadius: 8, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", position: "relative", maxWidth: 400 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526", marginBottom: 16 }}>Satuan Barang</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><label style={labelStyle}>Nama *</label><input type="text" value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})} style={{ ...inputStyle, border: "1px solid #90caf9" }} /></div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><label style={labelStyle}>Pajak</label><div><label style={{ fontSize: 11, color: "#666" }}>Ref Kode Pajak ⓘ</label><div style={{ position: "relative", marginTop: 4 }}><Search size={11} style={{ position: "absolute", left: 6, top: "50%", transform: "translateY(-50%)", color: "#999" }} /><input type="text" value={formData.refKodePajak} onChange={(e) => setFormData({...formData, refKodePajak: e.target.value})} placeholder="Cari/Pilih..." style={{ ...inputStyle, paddingLeft: 24 }} /></div></div></div>
            </div>
            <button onClick={handleSave} style={{ position: "absolute", right: 24, top: 20, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f0f0", border: "1px solid #d8d8d8", borderRadius: 4, cursor: "pointer", color: "#444746" }} title="Simpan"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg></button>
          </div>
        </div>
      )}

      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead><tr style={{ background: "#4a5568" }}>
            <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "#fff", borderBottom: "1px solid #3a4150", width: "5%" }}>#</th>
            <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "#fff", borderBottom: "1px solid #3a4150", width: "90%" }}>Nama</th>
          </tr></thead>
          <tbody>
            {filtered.map((item, idx) => (
              <tr key={item.id} style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.style.background = "#f8f9ff"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                <td style={{ padding: "8px 12px", color: "#666" }}>{idx + 1}</td>
                <td style={{ padding: "8px 12px", fontWeight: 500, color: "#001526" }}>{item.nama}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
