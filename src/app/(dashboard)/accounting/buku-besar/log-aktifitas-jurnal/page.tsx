"use client"

import { useState } from "react"
import { dummyJournalEntries, JournalEntry } from "@/lib/accounting-dummy-data"

/* ── Inline SVG icons ── */
const Icon = ({ children, size = 14 }: { children: React.ReactNode; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>{children}</svg>
)
const RefreshIcon   = () => <Icon><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></Icon>
const SettingsIcon  = () => <Icon><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></Icon>
const SearchIcon    = () => <Icon size={13}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Icon>

/* ── Shared styles ── */
const inputStyle: React.CSSProperties = {
  height: 32, padding: "0 10px", fontSize: 13,
  border: "1px solid #d8d8d8", borderRadius: 6,
  outline: "none", boxSizing: "border-box",
}
const thStyle: React.CSSProperties = {
  padding: "8px 12px", textAlign: "left",
  fontSize: 11, fontWeight: 600, color: "#444746",
  textTransform: "uppercase", letterSpacing: "0.04em",
  background: "#fff", borderBottom: "1px solid #f0f0f0",
  whiteSpace: "nowrap", cursor: "pointer", userSelect: "none",
}
const btnIconWhite: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  width: 32, height: 32, background: "#fff", color: "#0176d3",
  border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer", flexShrink: 0,
}

export default function LogAktifitasJurnalPage() {
  const [search, setSearch] = useState("")

  const filtered = dummyJournalEntries.filter((item) => {
    if (search) {
      const q = search.toLowerCase()
      return item.nomor.toLowerCase().includes(q) || item.noTrans.toLowerCase().includes(q) || item.tipeTransaksi.toLowerCase().includes(q)
    }
    return true
  })

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>Log Aktifitas Jurnal</h1>
            <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Riwayat aktifitas jurnal akuntansi</p>
          </div>
        </div>

        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <button style={btnIconWhite}><RefreshIcon /></button>
          <div style={{ flex: 1 }} />
          <button style={btnIconWhite}><SettingsIcon /></button>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999", display: "flex" }}><SearchIcon /></span>
            <input
              type="text"
              placeholder="Ketik dan [Enter"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && setSearch(search)}
              style={{ ...inputStyle, paddingLeft: 30, width: 180 }}
            />
          </div>
          <span style={{ fontSize: 11, color: "#888", minWidth: 20, textAlign: "right" }}>{filtered.length}</span>
        </div>
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {[
                { label: "Tanggal", width: "20%" },
                { label: "Nomor #", width: "20%" },
                { label: "No. Trans #", width: "20%" },
                { label: "Tipe Transaksi", width: "30%" },
              ].map((col) => (
                <th key={col.label} style={{ ...thStyle, width: col.width }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>
                  Belum ada data
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer", fontSize: 13, color: "#001526" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f7ff")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.tanggal}</td>
                  <td style={{ padding: "8px 12px", fontFamily: "monospace", fontWeight: 500 }}>{item.nomor}</td>
                  <td style={{ padding: "8px 12px", color: "#0176d3" }}>{item.noTrans}</td>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.tipeTransaksi}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
