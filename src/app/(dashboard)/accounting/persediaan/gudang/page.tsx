"use client"

import { useState } from "react"
import { Plus, RefreshCw, Printer, Settings, Search, Filter } from "lucide-react"

interface GudangItem { id: string; nama: string; alamat: string }
const dummyData: GudangItem[] = [{ id: "1", nama: "Center", alamat: "" }]
type FormTab = "gudang" | "alamat" | "pengguna"

export default function GudangPage() {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [formTab, setFormTab] = useState<FormTab>("gudang")
  const [filterNonAktif, setFilterNonAktif] = useState("semua")
  const filtered = dummyData.filter(i => !search || i.nama.toLowerCase().includes(search.toLowerCase()))
  const handleSave = () => { setShowForm(false); setFormTab("gudang") }
  const selectStyle = { padding: "5px 24px 5px 8px", fontSize: 11, border: "1px solid #d8d8d8", borderRadius: 4, background: "#fff", color: "#001526", cursor: "pointer", appearance: "none" as const, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat" as const, backgroundPosition: "right 6px center" }
  const inputStyle = { padding: "6px 8px", fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 4, outline: "none", width: "100%", boxSizing: "border-box" as const }
  const labelStyle = { fontSize: 12, color: "#444746", minWidth: 130 }
  const tabs: { key: FormTab; label: string }[] = [
    { key: "gudang", label: "Gudang" }, { key: "alamat", label: "Alamat" }, { key: "pengguna", label: "Pengguna" },
  ]

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div><h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Gudang</h1><p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Kelola data gudang</p></div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
          <select value={filterNonAktif} onChange={(e) => setFilterNonAktif(e.target.value)} style={selectStyle}><option value="semua">Non Aktif: Semua</option></select>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 4, cursor: "pointer" }}><Filter size={12} /></button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <button onClick={() => { setShowForm(!showForm); setFormTab("gudang") }} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }}><Plus size={16} /></button>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}><Settings size={14} /></button>
          <div style={{ flex: 1 }} />
          <div style={{ position: "relative" }}><Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} /><input type="text" placeholder="Ketik dan [Enter]" value={search} onChange={(e) => setSearch(e.target.value)} style={{ padding: "6px 10px 6px 30px", fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 6, width: 180, outline: "none" }} /></div>
          <span style={{ fontSize: 11, color: "#888" }}>{filtered.length}</span>
        </div>
      </div>

      {showForm && (
        <div style={{ background: "#f3f3f3", padding: "16px 20px", borderBottom: "1px solid #d8d8d8" }}>
          <div style={{ background: "#fff", borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", overflow: "hidden", position: "relative" }}>
            <div style={{ display: "flex", borderBottom: "1px solid #d8d8d8" }}>
              {tabs.map(t => <button key={t.key} onClick={() => setFormTab(t.key)} style={{ padding: "10px 16px", fontSize: 11, fontWeight: formTab === t.key ? 600 : 400, background: formTab === t.key ? "#fff" : "#f5f5f5", color: formTab === t.key ? "#001526" : "#666", border: "none", borderBottom: formTab === t.key ? "2px solid #0176d3" : "2px solid transparent", cursor: "pointer" }}>{t.label}</button>)}
            </div>
            <div style={{ padding: "16px 20px" }}>
              {formTab === "gudang" && (
                <div style={{ maxWidth: 500, display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}><label style={labelStyle}>Nama *</label><input type="text" style={{ ...inputStyle, border: "1px solid #90caf9" }} /></div>
                  <div><label style={{ fontSize: 11, color: "#444746", display: "block", marginBottom: 2 }}>Deskripsi</label><textarea rows={3} style={{ ...inputStyle, resize: "vertical" }} /></div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}><label style={labelStyle}>Penanggung Jawab</label><input type="text" style={inputStyle} /></div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}><input type="checkbox" style={{ width: 16, height: 16 }} /><label style={{ fontSize: 12, color: "#444746" }}>Gudang Barang Rusak</label><span style={{ fontSize: 11, color: "#666" }}>Ya. Merupakan gudang penyimpanan barang rusak</span></div>
                </div>
              )}
              {formTab === "alamat" && (
                <div style={{ maxWidth: 500, display: "flex", flexDirection: "column", gap: 10 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#0176d3" }}>Alamat</label>
                  <textarea placeholder="Jalan" rows={3} style={{ ...inputStyle, resize: "vertical" }} />
                  <div style={{ display: "flex", gap: 8 }}><input type="text" placeholder="Kota" style={inputStyle} /><input type="text" placeholder="K.Pos" style={{ ...inputStyle, width: 80, flex: "none" }} /></div>
                  <input type="text" placeholder="Provinsi" style={inputStyle} />
                  <input type="text" placeholder="Negara" style={inputStyle} />
                </div>
              )}
              {formTab === "pengguna" && (
                <div style={{ maxWidth: 500 }}>
                  <p style={{ fontSize: 11, color: "#888" }}>Belum ada pengguna yang ditugaskan ke gudang ini.</p>
                </div>
              )}
            </div>
            <button onClick={handleSave} style={{ position: "absolute", right: 16, top: 12, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f0f0", border: "1px solid #d8d8d8", borderRadius: 4, cursor: "pointer", color: "#444746" }} title="Simpan"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg></button>
          </div>
        </div>
      )}

      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead><tr style={{ background: "#4a5568" }}>
            {[{l:"Nama",w:"50%"},{l:"Alamat",w:"45%"}].map((c:any) => <th key={c.l} style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "#fff", borderBottom: "1px solid #3a4150", width: c.w }}>{c.l}</th>)}
          </tr></thead>
          <tbody>
            {filtered.map(item => (
              <tr key={item.id} style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.style.background = "#f8f9ff"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                <td style={{ padding: "8px 12px", fontWeight: 500, color: "#001526" }}>{item.nama}</td>
                <td style={{ padding: "8px 12px", color: "#444746" }}>{item.alamat || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
