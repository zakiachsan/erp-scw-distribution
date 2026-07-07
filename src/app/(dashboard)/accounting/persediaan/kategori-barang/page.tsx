"use client"

import { useState } from "react"

/* ── Inline SVG icons ── */
const Icon = ({ children, size = 14 }: { children: React.ReactNode; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>{children}</svg>
)
const PlusIcon = () => <Icon size={16}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Icon>
const RefreshIcon = () => <Icon><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></Icon>
const SearchIcon = () => <Icon size={13}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Icon>

/* ── Shared styles ── */
const inputStyle: React.CSSProperties = { height: 32, padding: "0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none", width: "100%", boxSizing: "border-box" }
const labelStyle: React.CSSProperties = { fontSize: 13, color: "#444746", minWidth: 130 }
const thStyle: React.CSSProperties = { padding: "8px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap", cursor: "pointer", userSelect: "none" }
const btnIcon: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, cursor: "pointer", flexShrink: 0 }
const btnIconBlue: React.CSSProperties = { ...btnIcon, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6 }
const btnIconWhite: React.CSSProperties = { ...btnIcon, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6 }
const btnPrimary: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "7px 14px", fontSize: 13, fontWeight: 600, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }

interface Kategori { id: string; nama: string; kategoriDefault: boolean }
const dummyData: Kategori[] = [
  { id: "1", nama: "General", kategoriDefault: true },
  { id: "2", nama: "Bahan Baku", kategoriDefault: false },
  { id: "3", nama: "Bahan Penolong", kategoriDefault: false },
  { id: "4", nama: "Barang Jadi", kategoriDefault: false },
]

export default function KategoriBarangPage() {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [newDefault, setNewDefault] = useState(false)

  const filtered = dummyData.filter(i => !search || i.nama.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>Kategori Barang</h1>
        <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Kelola kategori barang</p>

        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <button onClick={() => { setShowForm(!showForm); setNewDefault(false) }} style={btnIconBlue}><PlusIcon /></button>
          <button style={btnIconWhite}><RefreshIcon /></button>
          <div style={{ flex: 1 }} />
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999", display: "flex" }}><SearchIcon /></span>
            <input type="text" placeholder="Ketik dan [Enter" value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === "Enter" && setSearch(search)} style={{ ...inputStyle, paddingLeft: 30, width: 200, height: 32 }} />
          </div>
          <span style={{ fontSize: 11, color: "#888", minWidth: 20, textAlign: "right" }}>{filtered.length}</span>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ background: "#f3f3f3", padding: "16px 20px", borderBottom: "1px solid #d8d8d8" }}>
          <div style={{ background: "#fff", borderRadius: 8, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", maxWidth: 400 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526", marginBottom: 16 }}>Kategori Barang</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Nama *</label>
                <input style={inputStyle} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input type="checkbox" checked={newDefault} onChange={e => setNewDefault(e.target.checked)} style={{ width: 16, height: 16 }} />
                <label style={{ fontSize: 13, color: "#444746" }}>Kategori Default</label>
              </div>
            </div>
            <div style={{ marginTop: 14 }}>
              <button style={btnPrimary} onClick={() => setShowForm(false)}>Simpan</button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {[
                { label: "#", width: "5%" },
                { label: "NAMA", width: "55%" },
                { label: "KATEGORI DEFAULT", width: "40%" },
              ].map(col => (
                <th key={col.label} style={{ ...thStyle, width: col.width }}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={3} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data</td></tr>
            ) : filtered.map((item, idx) => (
              <tr key={item.id} style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer", fontSize: 13, color: "#001526" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#f0f7ff")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <td style={{ padding: "8px 12px" }}>{idx + 1}</td>
                <td style={{ padding: "8px 12px" }}>{item.nama}</td>
                <td style={{ padding: "8px 12px" }}>
                  <span style={{ padding: "2px 8px", borderRadius: 10, fontSize: 11, background: item.kategoriDefault ? "#e8f5e9" : "#f5f5f5", color: item.kategoriDefault ? "#2e7d32" : "#666" }}>
                    {item.kategoriDefault ? "Ya" : "Tidak"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
