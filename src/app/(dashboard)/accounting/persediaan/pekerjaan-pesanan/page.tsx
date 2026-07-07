"use client"

import { useState } from "react"
import { dummyJobOrders, type JobOrder } from "@/lib/accounting-dummy-data"

/* ── Inline SVG icons ── */
const Icon = ({ children, size = 14 }: { children: React.ReactNode; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>{children}</svg>
)
const PlusIcon = () => <Icon size={16}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Icon>
const RefreshIcon = () => <Icon><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></Icon>
const SearchIcon = () => <Icon size={13}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Icon>
const FilterIcon = () => <Icon><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></Icon>

/* ── Shared styles ── */
const selectStyle: React.CSSProperties = { height: 32, padding: "0 28px 0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, background: "#fff", color: "#001526", cursor: "pointer", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center" }
const inputStyle: React.CSSProperties = { height: 32, padding: "0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none", width: "100%", boxSizing: "border-box" }
const labelStyle: React.CSSProperties = { fontSize: 13, color: "#444746", minWidth: 100 }
const thStyle: React.CSSProperties = { padding: "8px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap", cursor: "pointer", userSelect: "none" }
const btnIcon: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, cursor: "pointer", flexShrink: 0 }
const btnIconBlue: React.CSSProperties = { ...btnIcon, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6 }
const btnIconWhite: React.CSSProperties = { ...btnIcon, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6 }
const btnPrimary: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "7px 14px", fontSize: 13, fontWeight: 600, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }

function statusBadge(s: JobOrder["status"]) {
  const colors: Record<string, { bg: string; fg: string }> = {
    Draft: { bg: "#fff3e0", fg: "#e65100" },
    "In Progress": { bg: "#e3f2fd", fg: "#1565c0" },
    Completed: { bg: "#e8f5e9", fg: "#2e7d32" },
  }
  const c = colors[s] || { bg: "#f5f5f5", fg: "#666" }
  return <span style={{ padding: "2px 8px", borderRadius: 10, fontSize: 11, background: c.bg, color: c.fg }}>{s}</span>
}

export default function PekerjaanPesananPage() {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [filterStatus, setFilterStatus] = useState("semua")

  const filtered = dummyJobOrders.filter(i => {
    if (search && !i.nomor.toLowerCase().includes(search.toLowerCase()) && !i.pelanggan.toLowerCase().includes(search.toLowerCase())) return false
    if (filterStatus !== "semua" && i.status !== filterStatus) return false
    return true
  })

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>Pekerjaan Pesanan</h1>
        <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Kelola pekerjaan produksi</p>

        {/* Filters */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
          <select style={selectStyle}><option>Tanggal: Semua</option></select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={selectStyle}>
            <option value="semua">Status: Semua</option>
            <option>Draft</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>

        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <button style={btnIconBlue}><FilterIcon /></button>
          <button onClick={() => setShowForm(!showForm)} style={btnIconBlue}><PlusIcon /></button>
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
          <div style={{ background: "#fff", borderRadius: 8, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", maxWidth: 700 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526", marginBottom: 16 }}>Data Baru</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Tanggal *</label>
                <input style={{ ...inputStyle, width: 130 }} defaultValue="07/07/2026" />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Batch No *</label>
                <input style={inputStyle} placeholder="Otomatis" />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Pelanggan *</label>
                <input style={inputStyle} placeholder="Cari/Pilih..." />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Keterangan</label>
                <input style={inputStyle} placeholder="Deskripsi" />
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
                { label: "#", width: "30px" },
                { label: "NOMOR #", width: "16%" },
                { label: "TANGGAL", width: "12%" },
                { label: "PELANGGAN", width: "25%" },
                { label: "KETERANGAN", width: "32%" },
                { label: "STATUS", width: "12%" },
              ].map(col => (
                <th key={col.label} style={{ ...thStyle, width: col.width }}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data</td></tr>
            ) : filtered.map((item, idx) => (
              <tr key={item.id} style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer", fontSize: 13, color: "#001526" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#f0f7ff")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <td style={{ padding: "8px 12px", color: "#888" }}>{idx + 1}</td>
                <td style={{ padding: "8px 12px" }}>{item.nomor}</td>
                <td style={{ padding: "8px 12px" }}>{item.tanggal}</td>
                <td style={{ padding: "8px 12px" }}>{item.pelanggan}</td>
                <td style={{ padding: "8px 12px" }}>{item.keterangan}</td>
                <td style={{ padding: "8px 12px" }}>{statusBadge(item.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
