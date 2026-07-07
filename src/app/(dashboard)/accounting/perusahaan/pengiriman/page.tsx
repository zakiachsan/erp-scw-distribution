"use client"

import { useState } from "react"
import { Plus, RefreshCw, Download, Globe, Search, Filter } from "lucide-react"

interface Pengiriman {
  id: string; nama: string; pic: string; noTelp: string; alamat: string; kota: string; kodePos: string; provinsi: string; negara: string; nonAktif: boolean
}

const dummyData: Pengiriman[] = [
  { id: "1", nama: "JNE", pic: "Ahmad", noTelp: "021-1234567", alamat: "Jl. Raya No. 10", kota: "Jakarta", kodePos: "10110", provinsi: "DKI Jakarta", negara: "Indonesia", nonAktif: false },
  { id: "2", nama: "SiCepat", pic: "Budi", noTelp: "021-9876543", alamat: "Jl. Industri No. 20", kota: "Bandung", kodePos: "40111", provinsi: "Jawa Barat", negara: "Indonesia", nonAktif: false },
]

export default function PengirimanPage() {
  const [search, setSearch] = useState("")
  const [filterNonAktif, setFilterNonAktif] = useState("semua")
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ nama: "", pic: "", noTelp: "", alamat: "", kota: "", kodePos: "", provinsi: "", negara: "" })

  const filtered = dummyData.filter((item) => {
    if (filterNonAktif === "aktif" && item.nonAktif) return false
    if (filterNonAktif === "nonaktif" && !item.nonAktif) return false
    if (search && !item.nama.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const handleSave = () => { console.log("Save:", formData); setShowForm(false); setFormData({ nama: "", pic: "", noTelp: "", alamat: "", kota: "", kodePos: "", provinsi: "", negara: "" }) }

  const thStyle: React.CSSProperties = { fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", padding: "8px 12px", textAlign: "left", background: "#fff" }
  const tdStyle: React.CSSProperties = { padding: "8px 12px", fontSize: 13, color: "#001526" }
  const btnStyle: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", fontSize: 13, fontWeight: 600, background: "#0176d3", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }
  const inputStyle: React.CSSProperties = { height: 32, padding: "0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none" }
  const iconBtnStyle: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "transparent", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer", color: "#0176d3" }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "16px 20px 0", background: "#fff" }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", margin: 0 }}>Pengiriman</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2, margin: 0 }}>Kelola data pengiriman dan alamat</p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, paddingBottom: 12 }}>
          <div style={{ position: "relative" }}>
            <select value={filterNonAktif} onChange={(e) => setFilterNonAktif(e.target.value)}
              style={{ height: 32, padding: "0 28px 0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, background: "#fff", color: "#001526", cursor: "pointer", outline: "none", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center" }}>
              <option value="semua">Non Aktif: Semua</option>
              <option value="aktif">Non Aktif: Tidak</option>
              <option value="nonaktif">Non Aktif: Ya</option>
            </select>
          </div>
          <button style={btnStyle} onClick={() => setShowForm(!showForm)}><Plus size={14} /></button>
          <button style={iconBtnStyle}><RefreshCw size={14} /></button>
          <div style={{ flex: 1 }} />
          <button style={iconBtnStyle}><Download size={14} /></button>
          <button style={iconBtnStyle}><Globe size={14} /></button>
          <div style={{ position: "relative" }}>
            <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#444746" }} />
            <input placeholder="Ketik dan [Enter ]" value={search} onChange={(e) => setSearch(e.target.value)}
              style={{ ...inputStyle, paddingLeft: 30, paddingRight: 10, width: 180 }} />
          </div>
          <span style={{ fontSize: 12, color: "#444746", minWidth: 20, textAlign: "right" }}>{filtered.length}</span>
        </div>
      </div>

      {showForm && (
        <div style={{ background: "#f8f9fa", padding: "16px 20px", borderBottom: "1px solid #ecebea" }}>
          <div style={{ border: "1px solid #ddd", borderRadius: 8, background: "#fff", position: "relative", padding: 20, maxWidth: 600 }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: "#001526", margin: "0 0 16px" }}>Pengiriman</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={{ fontSize: 13, color: "#444746", minWidth: 120 }}>Nama <span style={{ color: "#ea001e" }}>*</span></label>
                <input value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  style={{ ...inputStyle, flex: 1 }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={{ fontSize: 13, color: "#444746", minWidth: 120 }}>PIC</label>
                <input value={formData.pic} onChange={(e) => setFormData({ ...formData, pic: e.target.value })}
                  style={{ ...inputStyle, flex: 1 }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={{ fontSize: 13, color: "#444746", minWidth: 120 }}>No. Telp</label>
                <input value={formData.noTelp} onChange={(e) => setFormData({ ...formData, noTelp: e.target.value })}
                  placeholder="___________" style={{ ...inputStyle, flex: 1 }} />
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <label style={{ fontSize: 13, color: "#444746", minWidth: 120, marginTop: 6 }}>Alamat Pengiriman</label>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                  <textarea value={formData.alamat} onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                    placeholder="Jalan" rows={3}
                    style={{ padding: "6px 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none", resize: "vertical" }} />
                  <div style={{ display: "flex", gap: 8 }}>
                    <input value={formData.kota} onChange={(e) => setFormData({ ...formData, kota: e.target.value })}
                      placeholder="Kota" style={{ ...inputStyle, flex: 1 }} />
                    <input value={formData.kodePos} onChange={(e) => setFormData({ ...formData, kodePos: e.target.value })}
                      placeholder="K.Pos" style={{ ...inputStyle, width: 100 }} />
                  </div>
                  <input value={formData.provinsi} onChange={(e) => setFormData({ ...formData, provinsi: e.target.value })}
                    placeholder="Provinsi" style={inputStyle} />
                  <input value={formData.negara} onChange={(e) => setFormData({ ...formData, negara: e.target.value })}
                    placeholder="Negara" style={inputStyle} />
                </div>
              </div>
            </div>
            <button onClick={handleSave}
              style={{ position: "absolute", right: 20, top: 20, width: 36, height: 36, display: "inline-flex", alignItems: "center", justifyContent: "center", background: "#f3f3f3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer", color: "#444746" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
            </button>
          </div>
        </div>
      )}

      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ecebea" }}>
              <th style={{ ...thStyle, width: 40 }}></th>
              <th style={{ ...thStyle, width: "15%" }}>Nama</th>
              <th style={{ ...thStyle, width: "12%" }}>PIC</th>
              <th style={{ ...thStyle, width: "12%" }}>No. Telp</th>
              <th style={{ ...thStyle, width: "35%" }}>Alamat Lengkap</th>
              <th style={{ ...thStyle, width: "10%" }}>Non Aktif</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} style={{ ...tdStyle, textAlign: "center", padding: "64px 12px", color: "#444746" }}>Belum ada data</td></tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id}
                  style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer", transition: "background 100ms" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#f0f7ff"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <td style={tdStyle}></td>
                  <td style={{ ...tdStyle, fontWeight: 500, color: "#001526" }}>{item.nama}</td>
                  <td style={{ ...tdStyle, color: "#444746" }}>{item.pic}</td>
                  <td style={{ ...tdStyle, color: "#444746" }}>{item.noTelp}</td>
                  <td style={{ ...tdStyle, color: "#444746" }}>{item.alamat}</td>
                  <td style={{ ...tdStyle, color: "#444746" }}>{item.nonAktif ? "Ya" : "Tidak"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
