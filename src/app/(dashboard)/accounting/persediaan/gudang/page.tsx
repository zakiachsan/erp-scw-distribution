"use client"

import { useState } from "react"
import { dummyWarehouses } from "@/lib/accounting-dummy-data"

type FormTab = "informasi" | "lokasi" | "lainnya"

/* ── Inline SVG icons ── */
const Icon = ({ children, size = 14 }: { children: React.ReactNode; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>{children}</svg>
)
const PlusIcon = () => <Icon size={16}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Icon>
const SearchIcon = () => <Icon size={13}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Icon>
const FilterIcon = () => <Icon><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></Icon>

/* ── Shared styles ── */
const inputStyle: React.CSSProperties = { height: 32, padding: "0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none", width: "100%", boxSizing: "border-box" }
const labelStyle: React.CSSProperties = { fontSize: 13, color: "#444746", minWidth: 130 }
const thStyle: React.CSSProperties = { padding: "8px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap", cursor: "pointer", userSelect: "none" }
const btnIcon: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, cursor: "pointer", flexShrink: 0 }
const btnIconBlue: React.CSSProperties = { ...btnIcon, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6 }
const btnIconWhite: React.CSSProperties = { ...btnIcon, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6 }
const btnPrimary: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "7px 14px", fontSize: 13, fontWeight: 600, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }

export default function GudangPage() {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [formTab, setFormTab] = useState<FormTab>("informasi")

  const filtered = dummyWarehouses.filter(i => !search || i.nama.toLowerCase().includes(search.toLowerCase()))

  const formTabs: { key: FormTab; label: string }[] = [
    { key: "informasi", label: "Informasi" },
    { key: "lokasi", label: "Lokasi" },
    { key: "lainnya", label: "Lainnya" },
  ]

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>Gudang</h1>
        <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Kelola data gudang</p>

        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <button style={btnIconWhite}><FilterIcon /></button>
          <button onClick={() => { setShowForm(!showForm); setFormTab("informasi") }} style={btnIconBlue}><PlusIcon /></button>
          <div style={{ flex: 1 }} />
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999", display: "flex" }}><SearchIcon /></span>
            <input type="text" placeholder="Cari..." value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === "Enter" && setSearch(search)} style={{ ...inputStyle, paddingLeft: 30, width: 200, height: 32 }} />
          </div>
          <span style={{ fontSize: 11, color: "#888", minWidth: 20, textAlign: "right" }}>{filtered.length}</span>
        </div>
      </div>

      {/* Form (3 tabs) */}
      {showForm && (
        <div style={{ background: "#f3f3f3", padding: "16px 20px", borderBottom: "1px solid #d8d8d8" }}>
          <div style={{ background: "#fff", borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", overflow: "hidden", maxWidth: 600 }}>
            {/* Sub-tabs */}
            <div style={{ display: "flex", borderBottom: "1px solid #d8d8d8" }}>
              {formTabs.map(t => (
                <button
                  key={t.key}
                  onClick={() => setFormTab(t.key)}
                  style={{
                    padding: "10px 20px", fontSize: 13, fontWeight: formTab === t.key ? 600 : 400,
                    background: formTab === t.key ? "#fff" : "#f5f5f5",
                    color: formTab === t.key ? "#001526" : "#666",
                    border: "none", borderBottom: formTab === t.key ? "2px solid #e91e63" : "2px solid transparent",
                    cursor: "pointer",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div style={{ padding: "20px 24px" }}>
              {formTab === "informasi" && (
                <div style={{ padding: "16px", border: "1px solid #e0e0e0", borderRadius: 6 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={labelStyle}>Nama *</label>
                      <input style={inputStyle} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={labelStyle}>Penanggung Jawab</label>
                      <input style={inputStyle} />
                    </div>
                  </div>
                </div>
              )}

              {formTab === "lokasi" && (
                <div style={{ padding: "16px", border: "1px solid #e0e0e0", borderLeft: "3px solid #0176d3", borderRadius: 6 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={labelStyle}>Alamat</label>
                      <textarea style={{ ...inputStyle, resize: "vertical", height: 60, padding: "8px 10px", border: "1px solid #90caf9" }} />
                    </div>
                  </div>
                </div>
              )}

              {formTab === "lainnya" && (
                <div style={{ padding: "16px", border: "1px solid #e0e0e0", borderRadius: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={labelStyle}>Catatan</label>
                    <textarea style={{ ...inputStyle, resize: "vertical", height: 60, padding: "8px 10px" }} />
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", padding: "0 24px 16px" }}>
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
                { label: "NAMA", width: "30%" },
                { label: "ALAMAT", width: "40%" },
                { label: "PENANGGUNG JAWAB", width: "30%" },
              ].map(col => (
                <th key={col.label} style={{ ...thStyle, width: col.width }}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={3} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data</td></tr>
            ) : filtered.map(item => (
              <tr key={item.id} style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer", fontSize: 13, color: "#001526" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#f0f7ff")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <td style={{ padding: "8px 12px", fontWeight: 500 }}>{item.nama}</td>
                <td style={{ padding: "8px 12px" }}>{item.alamat}</td>
                <td style={{ padding: "8px 12px" }}>{item.penanggungJawab}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
