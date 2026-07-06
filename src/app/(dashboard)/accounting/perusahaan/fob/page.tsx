"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Plus,
  RefreshCw,
  Printer,
  Search,
} from "lucide-react"

interface FOBItem {
  id: string
  nama: string
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

  const handleSave = () => {
    console.log("Save:", formData)
    setShowForm(false)
    setFormData({ nama: "" })
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: "16px 20px 0", background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>
              FOB
            </h1>
            <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>
              Kelola pengaturan Free On Board
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, paddingBottom: 12 }}>
          {/* Add */}
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 32, height: 32,
              background: "#0176d3", color: "#fff",
              border: "1px solid #0176d3", borderRadius: 6,
              cursor: "pointer",
            }}
          >
            <Plus size={16} />
          </button>

          {/* Refresh */}
          <button
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 32, height: 32,
              background: "#fff", color: "#0176d3",
              border: "1px solid #d8d8d8", borderRadius: 6,
              cursor: "pointer",
            }}
          >
            <RefreshCw size={14} />
          </button>

          <div style={{ flex: 1 }} />

          {/* Printer */}
          <button
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 32, height: 32,
              background: "#fff", color: "#0176d3",
              border: "1px solid #d8d8d8", borderRadius: 6,
              cursor: "pointer",
            }}
          >
            <Printer size={14} />
          </button>

          {/* Search */}
          <div style={{ position: "relative" }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
            <input
              type="text"
              placeholder="Ketik dan [Enter"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && setSearch(search)}
              style={{
                padding: "6px 10px 6px 30px", fontSize: 12,
                border: "1px solid #d8d8d8", borderRadius: 6,
                width: 180, outline: "none",
              }}
            />
          </div>

          {/* Row count */}
          <span style={{ fontSize: 11, color: "#888", minWidth: 20, textAlign: "right" }}>
            {filtered.length}
          </span>
        </div>
      </div>

      {/* Form (collapsible) */}
      {showForm && (
        <div style={{ background: "#f3f3f3", padding: "16px 20px", borderBottom: "1px solid #d8d8d8" }}>
          <div style={{ background: "#fff", borderRadius: 8, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", position: "relative", maxWidth: 500 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526", marginBottom: 16 }}>FOB</h3>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <label style={{ fontSize: 12, color: "#444746", minWidth: 60 }}>Nama <span style={{ color: "red" }}>*</span></label>
              <input
                type="text"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                style={{
                  flex: 1, maxWidth: 300, padding: "6px 8px", fontSize: 12,
                  border: "1px solid #d8d8d8", borderRadius: 4,
                  outline: "none",
                }}
              />
            </div>

            {/* Save button */}
            <button
              onClick={handleSave}
              style={{
                position: "absolute", right: 24, top: 20,
                width: 36, height: 36,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "#f0f0f0", border: "1px solid #d8d8d8", borderRadius: 4,
                cursor: "pointer", color: "#444746",
              }}
              title="Simpan"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ background: "#4a5568" }}>
              <th
                style={{
                  padding: "8px 12px", textAlign: "left",
                  fontWeight: 600, color: "#fff", borderBottom: "1px solid #3a4150",
                  whiteSpace: "nowrap",
                }}
              >
                Nama
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>
                  Belum ada data
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr
                  key={item.id}
                  style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#f8f9ff"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <td style={{ padding: "8px 12px", fontWeight: 500, color: "#001526" }}>{item.nama}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
