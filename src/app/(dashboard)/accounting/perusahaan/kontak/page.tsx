"use client"

import { useState } from "react"
import {
  RefreshCw,
  Printer,
  Settings,
  Search,
  Plus,
} from "lucide-react"

interface Kontak {
  id: string
  namaLengkap: string
  tipe: string
  perusahaan: string
  handphone: string
  email: string
}

const dummyData: Kontak[] = []

export default function KontakPage() {
  const [search, setSearch] = useState("")
  const [filterTipe, setFilterTipe] = useState("semua")
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    namaLengkap: "",
    tipe: "",
    perusahaan: "",
    handphone: "",
    email: "",
    alamat: "",
    kota: "",
    kodePos: "",
    provinsi: "",
    negara: "",
    catatan: "",
  })

  const filtered = dummyData.filter((item) => {
    if (search && !item.namaLengkap.toLowerCase().includes(search.toLowerCase())) return false
    if (filterTipe !== "semua" && item.tipe !== filterTipe) return false
    return true
  })

  const handleSave = () => {
    console.log("Save:", formData)
    setShowForm(false)
    setFormData({ namaLengkap: "", tipe: "", perusahaan: "", handphone: "", email: "", alamat: "", kota: "", kodePos: "", provinsi: "", negara: "", catatan: "" })
  }

  const selectStyle = {
    padding: "5px 24px 5px 8px", fontSize: 11, fontWeight: 500 as const,
    border: "1px solid #d8d8d8", borderRadius: 4,
    background: "#fff", color: "#001526", cursor: "pointer",
    appearance: "none" as const,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat" as const,
    backgroundPosition: "right 6px center",
  }

  const inputStyle = {
    padding: "6px 8px", fontSize: 12,
    border: "1px solid #d8d8d8", borderRadius: 4,
    outline: "none", width: "100%", boxSizing: "border-box" as const,
  }

  const labelStyle = { fontSize: 12, color: "#444746", minWidth: 120 }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>Kontak</h1>
            <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Kelola kontak pelanggan, supplier, dan mitra</p>
          </div>
        </div>

        {/* Filter + Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          {/* Filter Tipe */}
          <select value={filterTipe} onChange={(e) => setFilterTipe(e.target.value)} style={selectStyle}>
            <option value="semua">Tipe: Semua</option>
            <option value="Pelanggan">Pelanggan</option>
            <option value="Supplier">Supplier</option>
            <option value="Mitra">Mitra</option>
            <option value="Lainnya">Lainnya</option>
          </select>

          {/* Refresh */}
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}>
            <RefreshCw size={13} />
          </button>

          <div style={{ flex: 1 }} />

          {/* Printer */}
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}>
            <Printer size={13} />
          </button>

          {/* Settings */}
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}>
            <Settings size={13} />
          </button>

          {/* Search */}
          <div style={{ position: "relative" }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
            <input type="text" placeholder="Ketik dan [Enter" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && setSearch(search)} style={{ padding: "6px 10px 6px 30px", fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 6, width: 180, outline: "none" }} />
          </div>

          <span style={{ fontSize: 11, color: "#888", minWidth: 20, textAlign: "right" }}>{filtered.length}</span>
        </div>
      </div>

      {/* Form (collapsible) */}
      {showForm && (
        <div style={{ background: "#f3f3f3", padding: "16px 20px", borderBottom: "1px solid #d8d8d8" }}>
          <div style={{ background: "#fff", borderRadius: 8, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", position: "relative", maxWidth: 600 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526", marginBottom: 16 }}>Kontak Baru</h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Nama Lengkap</label>
                <input type="text" value={formData.namaLengkap} onChange={(e) => setFormData({ ...formData, namaLengkap: e.target.value })} style={inputStyle} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Tipe</label>
                <select value={formData.tipe} onChange={(e) => setFormData({ ...formData, tipe: e.target.value })} style={{ ...selectStyle, flex: 1 }}>
                  <option value="">Pilih Tipe</option>
                  <option>Pelanggan</option>
                  <option>Supplier</option>
                  <option>Mitra</option>
                  <option>Lainnya</option>
                </select>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Perusahaan</label>
                <input type="text" value={formData.perusahaan} onChange={(e) => setFormData({ ...formData, perusahaan: e.target.value })} style={inputStyle} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Handphone</label>
                <input type="text" value={formData.handphone} onChange={(e) => setFormData({ ...formData, handphone: e.target.value })} style={inputStyle} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, gridColumn: "span 2" }}>
                <label style={labelStyle}>Email</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={inputStyle} />
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, gridColumn: "span 2" }}>
                <label style={{ ...labelStyle, marginTop: 6 }}>Alamat</label>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                  <textarea value={formData.alamat} onChange={(e) => setFormData({ ...formData, alamat: e.target.value })} placeholder="Jalan" rows={2} style={{ ...inputStyle, resize: "vertical" }} />
                  <div style={{ display: "flex", gap: 8 }}>
                    <input type="text" value={formData.kota} onChange={(e) => setFormData({ ...formData, kota: e.target.value })} placeholder="Kota" style={inputStyle} />
                    <input type="text" value={formData.kodePos} onChange={(e) => setFormData({ ...formData, kodePos: e.target.value })} placeholder="K.Pos" style={{ ...inputStyle, width: 80, flex: "none" }} />
                  </div>
                  <input type="text" value={formData.provinsi} onChange={(e) => setFormData({ ...formData, provinsi: e.target.value })} placeholder="Provinsi" style={inputStyle} />
                  <input type="text" value={formData.negara} onChange={(e) => setFormData({ ...formData, negara: e.target.value })} placeholder="Negara" style={inputStyle} />
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, gridColumn: "span 2" }}>
                <label style={{ ...labelStyle, marginTop: 6 }}>Catatan</label>
                <textarea value={formData.catatan} onChange={(e) => setFormData({ ...formData, catatan: e.target.value })} rows={2} style={{ ...inputStyle, resize: "vertical" }} />
              </div>
            </div>

            {/* Save */}
            <button onClick={handleSave} style={{ position: "absolute", right: 24, top: 20, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f0f0", border: "1px solid #d8d8d8", borderRadius: 4, cursor: "pointer", color: "#444746" }} title="Simpan">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
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
                { label: "Nama Lengkap", width: "22%" },
                { label: "Tipe", width: "12%" },
                { label: "Perusahaan", width: "22%" },
                { label: "Handphone", width: "15%" },
                { label: "Email", width: "20%" },
              ].map((col) => (
                <th key={col.label} style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "#fff", borderBottom: "1px solid #3a4150", whiteSpace: "nowrap", width: col.width, cursor: "pointer", userSelect: "none" }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={5} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data</td></tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.style.background = "#f8f9ff"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "8px 12px", fontWeight: 500, color: "#001526" }}>{item.namaLengkap}</td>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.tipe}</td>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.perusahaan}</td>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.handphone}</td>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.email}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
