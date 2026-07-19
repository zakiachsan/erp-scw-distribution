"use client"

import { useState } from "react"
import { RefreshCw, Printer, Settings, Search, Plus } from "lucide-react"
import { dummyContacts } from "@/lib/accounting-dummy-data"

export default function KontakPage() {
  const [search, setSearch] = useState("")
  const [filterTipe, setFilterTipe] = useState("semua")
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    namaLengkap: "", tipe: "", perusahaan: "", handphone: "", email: "",
    alamat: "", kota: "", kodePos: "", provinsi: "", negara: "", catatan: "",
  })

  const filtered = dummyContacts.filter((item) => {
    if (search && !item.nama.toLowerCase().includes(search.toLowerCase())) return false
    if (filterTipe !== "semua" && item.tipe !== filterTipe) return false
    return true
  })

  const handleSave = () => {
    console.log("Save:", formData)
    setShowForm(false)
    setFormData({ namaLengkap: "", tipe: "", perusahaan: "", handphone: "", email: "", alamat: "", kota: "", kodePos: "", provinsi: "", negara: "", catatan: "" })
  }

  const thStyle: React.CSSProperties = { fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", padding: "8px 12px", textAlign: "left", background: "#fff" }
  const tdStyle: React.CSSProperties = { padding: "8px 12px", fontSize: 13, color: "#001526" }
  const btnStyle: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", fontSize: 13, fontWeight: 600, background: "#0176d3", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }
  const inputStyle: React.CSSProperties = { height: 32, padding: "0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none" }
  const iconBtnStyle: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "transparent", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer", color: "#0176d3" }
  const selectStyle: React.CSSProperties = { height: 32, padding: "0 28px 0 10px", fontSize: 13, fontWeight: 500, border: "1px solid #d8d8d8", borderRadius: 6, background: "#fff", color: "#001526", cursor: "pointer", outline: "none", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center" }

  const badgeStyle = (tipe: string): React.CSSProperties => ({
    display: "inline-flex", padding: "2px 10px", fontSize: 12, fontWeight: 500, borderRadius: 10,
    background: tipe === "Customer" ? "#e3f0ff" : tipe === "Supplier" ? "#d3f5e0" : "#f3f3f3",
    color: tipe === "Customer" ? "#0176d3" : tipe === "Supplier" ? "#2e844a" : "#444746",
  })

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: "16px 20px 0", background: "#fff" }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", margin: 0 }}>Kontak</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2, margin: 0 }}>Kelola kontak pelanggan, supplier, dan mitra</p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <select value={filterTipe} onChange={(e) => setFilterTipe(e.target.value)} style={selectStyle}>
            <option value="semua">Tipe: Semua</option>
            <option value="Customer">Customer</option>
            <option value="Supplier">Supplier</option>
            <option value="Other">Other</option>
          </select>

          <button style={btnStyle} onClick={() => setShowForm(!showForm)}><Plus size={14} /></button>
          <button style={iconBtnStyle}><RefreshCw size={14} /></button>

          <div style={{ flex: 1 }} />
          <button style={iconBtnStyle}><Printer size={14} /></button>
          <button style={iconBtnStyle}><Settings size={14} /></button>
          <div style={{ position: "relative" }}>
            <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#444746" }} />
            <input placeholder="Cari kontak..." value={search} onChange={(e) => setSearch(e.target.value)}
              style={{ ...inputStyle, paddingLeft: 30, paddingRight: 10, width: 180 }} />
          </div>
          <span style={{ fontSize: 12, color: "#444746", minWidth: 20, textAlign: "right" }}>{filtered.length}</span>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ background: "#f8f9fa", padding: "16px 20px", borderBottom: "1px solid #ecebea" }}>
          <div style={{ border: "1px solid #ddd", borderRadius: 8, background: "#fff", position: "relative", padding: 20, maxWidth: 600 }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: "#001526", margin: "0 0 16px" }}>Kontak Baru</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={{ fontSize: 13, color: "#444746", minWidth: 120 }}>Nama Lengkap</label>
                <input value={formData.namaLengkap} onChange={(e) => setFormData({ ...formData, namaLengkap: e.target.value })}
                  style={inputStyle} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={{ fontSize: 13, color: "#444746", minWidth: 120 }}>Tipe</label>
                <select value={formData.tipe} onChange={(e) => setFormData({ ...formData, tipe: e.target.value })}
                  style={{ ...selectStyle, flex: 1 }}>
                  <option value="">Pilih Tipe</option>
                  <option>Customer</option><option>Supplier</option><option>Other</option>
                </select>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={{ fontSize: 13, color: "#444746", minWidth: 120 }}>Perusahaan</label>
                <input value={formData.perusahaan} onChange={(e) => setFormData({ ...formData, perusahaan: e.target.value })}
                  style={inputStyle} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={{ fontSize: 13, color: "#444746", minWidth: 120 }}>Handphone</label>
                <input value={formData.handphone} onChange={(e) => setFormData({ ...formData, handphone: e.target.value })}
                  style={inputStyle} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, gridColumn: "span 2" }}>
                <label style={{ fontSize: 13, color: "#444746", minWidth: 120 }}>Email</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={inputStyle} />
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, gridColumn: "span 2" }}>
                <label style={{ fontSize: 13, color: "#444746", minWidth: 120, marginTop: 6 }}>Alamat</label>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                  <textarea value={formData.alamat} onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                    placeholder="Jalan" rows={2}
                    style={{ padding: "6px 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none", resize: "vertical" }} />
                  <div style={{ display: "flex", gap: 8 }}>
                    <input value={formData.kota} onChange={(e) => setFormData({ ...formData, kota: e.target.value })}
                      placeholder="Kota" style={inputStyle} />
                    <input value={formData.kodePos} onChange={(e) => setFormData({ ...formData, kodePos: e.target.value })}
                      placeholder="K.Pos" style={{ ...inputStyle, width: 80, flexShrink: 0 }} />
                  </div>
                  <input value={formData.provinsi} onChange={(e) => setFormData({ ...formData, provinsi: e.target.value })}
                    placeholder="Provinsi" style={inputStyle} />
                  <input value={formData.negara} onChange={(e) => setFormData({ ...formData, negara: e.target.value })}
                    placeholder="Negara" style={inputStyle} />
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, gridColumn: "span 2" }}>
                <label style={{ fontSize: 13, color: "#444746", minWidth: 120, marginTop: 6 }}>Catatan</label>
                <textarea value={formData.catatan} onChange={(e) => setFormData({ ...formData, catatan: e.target.value })}
                  rows={2} style={{ flex: 1, padding: "6px 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none", resize: "vertical" }} />
              </div>
            </div>
            <button onClick={handleSave}
              style={{ position: "absolute", right: 20, top: 20, width: 36, height: 36, display: "inline-flex", alignItems: "center", justifyContent: "center", background: "#f3f3f3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer", color: "#444746" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ecebea" }}>
              <th style={{ ...thStyle, width: "22%" }}>Nama Lengkap</th>
              <th style={{ ...thStyle, width: "12%" }}>Tipe</th>
              <th style={{ ...thStyle, width: "22%" }}>Perusahaan</th>
              <th style={{ ...thStyle, width: "15%" }}>Handphone</th>
              <th style={{ ...thStyle, width: "29%" }}>Email</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={5} style={{ ...tdStyle, textAlign: "center", padding: "64px 12px", color: "#444746" }}>Belum ada data</td></tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id}
                  style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer", transition: "background 100ms" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#f0f7ff"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <td style={{ ...tdStyle, fontWeight: 500, color: "#001526" }}>{item.nama}</td>
                  <td style={tdStyle}><span style={badgeStyle(item.tipe)}>{item.tipe}</span></td>
                  <td style={{ ...tdStyle, color: "#444746" }}>{item.perusahaan}</td>
                  <td style={{ ...tdStyle, color: "#444746" }}>{item.hp}</td>
                  <td style={{ ...tdStyle, color: "#444746" }}>{item.email}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
