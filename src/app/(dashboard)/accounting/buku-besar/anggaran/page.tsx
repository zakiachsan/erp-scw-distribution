"use client"

import { useState } from "react"
import { dummyBudgets, Budget } from "@/lib/accounting-dummy-data"

/* ── Inline SVG icons ── */
const Icon = ({ children, size = 14 }: { children: React.ReactNode; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>{children}</svg>
)
const PlusIcon      = () => <Icon size={16}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Icon>
const RefreshIcon   = () => <Icon><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></Icon>
const PrinterIcon   = () => <Icon><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 12H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2"/><rect x="6" y="14" width="12" height="8"/></Icon>
const SettingsIcon  = () => <Icon><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></Icon>
const SearchIcon    = () => <Icon size={13}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Icon>
const SaveIcon      = () => <Icon size={16}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></Icon>

function formatIDR(n: number) { return `Rp ${n.toLocaleString("id-ID")}` }

/* ── Shared styles ── */
const inputStyle: React.CSSProperties = {
  height: 32, padding: "0 10px", fontSize: 13,
  border: "1px solid #d8d8d8", borderRadius: 6,
  outline: "none", width: "100%", boxSizing: "border-box",
}
const labelStyle: React.CSSProperties = { fontSize: 13, color: "#444746", minWidth: 120 }
const thStyle: React.CSSProperties = {
  padding: "8px 12px", textAlign: "left",
  fontSize: 11, fontWeight: 600, color: "#444746",
  textTransform: "uppercase", letterSpacing: "0.04em",
  background: "#fff", borderBottom: "1px solid #f0f0f0",
  whiteSpace: "nowrap",
}
const btnIconBlue: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  width: 32, height: 32, background: "#0176d3", color: "#fff",
  border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer", flexShrink: 0,
}
const btnIconWhite: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  width: 32, height: 32, background: "#fff", color: "#0176d3",
  border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer", flexShrink: 0,
}

/* ── Status badge colors ── */
const statusBadge = (status: Budget["status"]) => {
  const map = {
    "On Track":      { bg: "#eef4ff", color: "#014486" },
    "Over Budget":    { bg: "#ffebee", color: "#ea001e" },
    "Under Budget":   { bg: "#e8f5e9", color: "#2e844a" },
  }
  const s = map[status]
  return { padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600, background: s.bg, color: s.color }
}

export default function AnggaranPage() {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ nama: "", periode: "", anggaran: 0, keterangan: "" })
  const filtered = dummyBudgets.filter(i => !search || i.nama.toLowerCase().includes(search.toLowerCase()))
  const handleSave = () => { console.log("Save:", formData); setShowForm(false) }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>Anggaran</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Kelola anggaran dan realisasi per departemen</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <button onClick={() => setShowForm(!showForm)} style={btnIconBlue}><PlusIcon /></button>
          <button style={btnIconWhite}><RefreshIcon /></button>
          <div style={{ flex: 1 }} />
          <button style={btnIconWhite}><PrinterIcon /></button>
          <button style={btnIconWhite}><SettingsIcon /></button>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999", display: "flex" }}><SearchIcon /></span>
            <input type="text" placeholder="Ketik dan [Enter" value={search} onChange={(e) => setSearch(e.target.value)} style={{ ...inputStyle, paddingLeft: 30, width: 180 }} />
          </div>
          <span style={{ fontSize: 11, color: "#888", minWidth: 20, textAlign: "right" }}>{filtered.length}</span>
        </div>
      </div>

      {showForm && (
        <div style={{ background: "#f3f3f3", padding: "16px 20px", borderBottom: "1px solid #d8d8d8" }}>
          <div style={{ background: "#fff", borderRadius: 8, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", position: "relative", maxWidth: 500 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526", marginBottom: 16 }}>Anggaran Baru</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><label style={labelStyle}>Nama Beban *</label><input type="text" value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})} style={inputStyle} /></div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><label style={labelStyle}>Periode *</label><input type="text" value={formData.periode} onChange={(e) => setFormData({...formData, periode: e.target.value})} placeholder="Contoh: Juli 2026" style={inputStyle} /></div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><label style={labelStyle}>Anggaran *</label><input type="number" value={formData.anggaran} onChange={(e) => setFormData({...formData, anggaran: Number(e.target.value)})} style={inputStyle} /></div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}><label style={{...labelStyle, marginTop: 6}}>Keterangan</label><textarea value={formData.keterangan} onChange={(e) => setFormData({...formData, keterangan: e.target.value})} rows={2} style={{...inputStyle, resize: "vertical", height: "auto", padding: "8px 10px"}} /></div>
            </div>
            <button onClick={handleSave} style={{ position: "absolute", right: 24, top: 20, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f0f0", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer", color: "#444746" }} title="Simpan"><SaveIcon /></button>
          </div>
        </div>
      )}

      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr>
            {[{l:"Nama",w:"22%"},{l:"Periode",w:"14%"},{l:"Anggaran",w:"16%",a:"right" as const},{l:"Realisasi",w:"16%",a:"right" as const},{l:"Sisa",w:"14%",a:"right" as const},{l:"Status",w:"14%"}].map(c => <th key={c.l} style={{...thStyle, textAlign: c.a||"left", width: c.w}}>{c.l}</th>)}
          </tr></thead>
          <tbody>
            {filtered.length === 0 ? <tr><td colSpan={6} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data</td></tr> :
            filtered.map(item => (
              <tr key={item.id} style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer", fontSize: 13, color: "#001526" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f7ff")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                <td style={{ padding: "8px 12px", fontWeight: 500 }}>{item.nama}</td>
                <td style={{ padding: "8px 12px", color: "#444746" }}>{item.periode}</td>
                <td style={{ padding: "8px 12px", textAlign: "right", fontFamily: "monospace" }}>{formatIDR(item.totalAnggaran)}</td>
                <td style={{ padding: "8px 12px", textAlign: "right", fontFamily: "monospace" }}>{formatIDR(item.realisasi)}</td>
                <td style={{ padding: "8px 12px", textAlign: "right", fontFamily: "monospace", color: item.sisa > 0 ? "#2e844a" : "#ea001e" }}>{formatIDR(item.sisa)}</td>
                <td style={{ padding: "8px 12px" }}>
                  <span style={statusBadge(item.status)}>{item.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
