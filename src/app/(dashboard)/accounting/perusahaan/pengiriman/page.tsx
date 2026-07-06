"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Plus,
  RefreshCw,
  Download,
  Globe,
  Search,
  Filter,
} from "lucide-react"

interface Pengiriman {
  id: string
  nama: string
  pic: string
  noTelp: string
  alamat: string
  kota: string
  kodePos: string
  provinsi: string
  negara: string
  nonAktif: boolean
}

const dummyData: Pengiriman[] = []

export default function PengirimanPage() {
  const [search, setSearch] = useState("")
  const [filterNonAktif, setFilterNonAktif] = useState("semua")
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    nama: "",
    pic: "",
    noTelp: "",
    alamat: "",
    kota: "",
    kodePos: "",
    provinsi: "",
    negara: "",
  })

  const filtered = dummyData.filter((item) => {
    if (filterNonAktif === "aktif" && item.nonAktif) return false
    if (filterNonAktif === "nonaktif" && !item.nonAktif) return false
    if (search && !item.nama.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const handleSave = () => {
    console.log("Save:", formData)
    setShowForm(false)
    setFormData({ nama: "", pic: "", noTelp: "", alamat: "", kota: "", kodePos: "", provinsi: "", negara: "" })
  }

  const inputStyle = {
    width: "100%",
    padding: "6px 8px",
    fontSize: 12,
    border: "1px solid #d8d8d8",
    borderRadius: 4,
    outline: "none",
    boxSizing: "border-box" as const,
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: "16px 20px 0", background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>
              Pengiriman
            </h1>
            <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>
              Kelola data pengiriman dan alamat
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, paddingBottom: 12 }}>
          {/* Filter */}
          <div style={{ position: "relative" }}>
            <select
              value={filterNonAktif}
              onChange={(e) => setFilterNonAktif(e.target.value)}
              style={{
                padding: "6px 28px 6px 10px", fontSize: 12, fontWeight: 500,
                border: "1px solid #d8d8d8", borderRadius: 6,
                background: "#fff", color: "#001526", cursor: "pointer",
                appearance: "none",
              }}
            >
              <option value="semua">Non Aktif: Semua</option>
              <option value="aktif">Non Aktif: Tidak</option>
              <option value="nonaktif">Non Aktif: Ya</option>
            </select>
            <Filter size={12} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", color: "#666", pointerEvents: "none" }} />
          </div>

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

          {/* Download */}
          <button
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 32, height: 32,
              background: "#fff", color: "#0176d3",
              border: "1px solid #d8d8d8", borderRadius: 6,
              cursor: "pointer",
            }}
          >
            <Download size={14} />
          </button>

          {/* Globe */}
          <button
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 32, height: 32,
              background: "#fff", color: "#0176d3",
              border: "1px solid #d8d8d8", borderRadius: 6,
              cursor: "pointer",
            }}
          >
            <Globe size={14} />
          </button>

          {/* Search */}
          <div style={{ position: "relative" }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
            <input
              type="text"
              placeholder="Ketik dan [Enter ]"
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
          <div style={{ background: "#fff", borderRadius: 8, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", position: "relative", maxWidth: 600 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526", marginBottom: 16 }}>Pengiriman</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Nama */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={{ fontSize: 12, color: "#444746", minWidth: 120 }}>Nama <span style={{ color: "red" }}>*</span></label>
                <input
                  type="text"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  style={inputStyle}
                />
              </div>

              {/* PIC */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={{ fontSize: 12, color: "#444746", minWidth: 120 }}>PIC</label>
                <input
                  type="text"
                  value={formData.pic}
                  onChange={(e) => setFormData({ ...formData, pic: e.target.value })}
                  style={inputStyle}
                />
              </div>

              {/* No. Telp */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={{ fontSize: 12, color: "#444746", minWidth: 120 }}>No. Telp</label>
                <input
                  type="text"
                  value={formData.noTelp}
                  onChange={(e) => setFormData({ ...formData, noTelp: e.target.value })}
                  placeholder="___________"
                  style={inputStyle}
                />
              </div>

              {/* Alamat Pengiriman */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <label style={{ fontSize: 12, color: "#444746", minWidth: 120, marginTop: 6 }}>Alamat Pengiriman</label>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                  <textarea
                    value={formData.alamat}
                    onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                    placeholder="Jalan"
                    rows={3}
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                  <div style={{ display: "flex", gap: 8 }}>
                    <input
                      type="text"
                      value={formData.kota}
                      onChange={(e) => setFormData({ ...formData, kota: e.target.value })}
                      placeholder="Kota"
                      style={inputStyle}
                    />
                    <input
                      type="text"
                      value={formData.kodePos}
                      onChange={(e) => setFormData({ ...formData, kodePos: e.target.value })}
                      placeholder="K.Pos"
                      style={{ ...inputStyle, width: 100 }}
                    />
                  </div>
                  <input
                    type="text"
                    value={formData.provinsi}
                    onChange={(e) => setFormData({ ...formData, provinsi: e.target.value })}
                    placeholder="Provinsi"
                    style={inputStyle}
                  />
                  <input
                    type="text"
                    value={formData.negara}
                    onChange={(e) => setFormData({ ...formData, negara: e.target.value })}
                    placeholder="Negara"
                    style={inputStyle}
                  />
                </div>
              </div>
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
              {[
                { label: "", width: "40px" },
                { label: "Nama", width: "15%" },
                { label: "PIC", width: "12%" },
                { label: "No. Telp", width: "12%" },
                { label: "Alamat Lengkap", width: "35%" },
                { label: "Non Aktif", width: "10%" },
              ].map((col) => (
                <th
                  key={col.label || "no"}
                  style={{
                    padding: "8px 12px", textAlign: "left",
                    fontWeight: 600, color: "#fff", borderBottom: "1px solid #3a4150",
                    whiteSpace: "nowrap", cursor: "pointer", userSelect: "none",
                    width: col.width,
                  }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>
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
                  <td style={{ padding: "8px 12px" }}></td>
                  <td style={{ padding: "8px 12px", fontWeight: 500, color: "#001526" }}>{item.nama}</td>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.pic}</td>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.noTelp}</td>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.alamat}</td>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.nonAktif ? "Ya" : "Tidak"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
