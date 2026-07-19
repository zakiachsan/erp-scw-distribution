"use client"

import { useState } from "react"
import { Plus, RefreshCw, Printer, Settings, Search, Filter } from "lucide-react"

interface SyaratPembayaran {
  id: string; nama: string; diskon: number; masaDiskon: number; masaJatuhTempo: number; keterangan: string; nonAktif: boolean; default: boolean
}

const dummyData: SyaratPembayaran[] = [
  { id: "1", nama: "C.O.D", diskon: 0, masaDiskon: 0, masaJatuhTempo: 0, keterangan: "", nonAktif: false, default: true },
  { id: "2", nama: "Cicilan", diskon: 0, masaDiskon: 0, masaJatuhTempo: 0, keterangan: "", nonAktif: false, default: false },
  { id: "3", nama: "Set Manual", diskon: 0, masaDiskon: 0, masaJatuhTempo: 0, keterangan: "", nonAktif: false, default: false },
  { id: "4", nama: "net 15", diskon: 0, masaDiskon: 0, masaJatuhTempo: 15, keterangan: "", nonAktif: false, default: false },
  { id: "5", nama: "net 30", diskon: 0, masaDiskon: 0, masaJatuhTempo: 30, keterangan: "", nonAktif: false, default: false },
  { id: "6", nama: "net 45", diskon: 0, masaDiskon: 0, masaJatuhTempo: 45, keterangan: "", nonAktif: false, default: false },
  { id: "7", nama: "net 60", diskon: 0, masaDiskon: 0, masaJatuhTempo: 60, keterangan: "", nonAktif: false, default: false },
  { id: "8", nama: "net 7", diskon: 0, masaDiskon: 0, masaJatuhTempo: 7, keterangan: "", nonAktif: false, default: false },
]

export default function SyaratPembayaranPage() {
  const [search, setSearch] = useState("")
  const [filterNonAktif, setFilterNonAktif] = useState("semua")
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ nama: "", diskon: 0, masaDiskon: 0, masaJatuhTempo: 0, keterangan: "", default: false })

  const filtered = dummyData.filter((item) => {
    if (filterNonAktif === "aktif" && item.nonAktif) return false
    if (filterNonAktif === "nonaktif" && !item.nonAktif) return false
    if (search && !item.nama.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const handleSave = () => { console.log("Save:", formData); setShowForm(false); setFormData({ nama: "", diskon: 0, masaDiskon: 0, masaJatuhTempo: 0, keterangan: "", default: false }) }

  const thStyle: React.CSSProperties = { fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", padding: "8px 12px", textAlign: "left", background: "#fff" }
  const tdStyle: React.CSSProperties = { padding: "8px 12px", fontSize: 13, color: "#001526" }
  const btnStyle: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", fontSize: 13, fontWeight: 600, background: "#0176d3", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }
  const inputStyle: React.CSSProperties = { height: 32, padding: "0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none" }
  const iconBtnStyle: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "transparent", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer", color: "#0176d3" }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: "16px 20px 0", background: "#fff" }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", margin: 0 }}>Syarat Pembayaran</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2, margin: 0 }}>Kelola syarat dan termin pembayaran</p>
        </div>

        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, paddingBottom: 12 }}>
          <div style={{ position: "relative" }}>
            <select value={filterNonAktif} onChange={(e) => setFilterNonAktif(e.target.value)}
              style={{ height: 32, padding: "0 28px 0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, background: "#fff", color: "#001526", cursor: "pointer", outline: "none", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center" }}>
              <option value="semua">Non Aktif: Semua</option>
              <option value="aktif">Non Aktif: Tidak</option>
              <option value="nonaktif">Non Aktif: Ya</option>
            </select>
          </div>

          <button style={btnStyle} onClick={() => setShowForm(!showForm)}>
            <Plus size={14} />
          </button>
          <button style={iconBtnStyle}>
            <RefreshCw size={14} />
          </button>
          <div style={{ flex: 1 }} />
          <button style={iconBtnStyle}>
            <Printer size={14} />
          </button>
          <button style={iconBtnStyle}>
            <Settings size={14} />
          </button>
          <div style={{ position: "relative" }}>
            <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#444746" }} />
            <input placeholder="Cari..." value={search} onChange={(e) => setSearch(e.target.value)}
              style={{ ...inputStyle, paddingLeft: 30, paddingRight: 10, width: 180 }} />
          </div>
          <span style={{ fontSize: 12, color: "#444746", minWidth: 20, textAlign: "right" }}>{filtered.length}</span>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ background: "#f8f9fa", padding: "16px 20px", borderBottom: "1px solid #ecebea" }}>
          <div style={{ border: "1px solid #ddd", borderRadius: 8, background: "#fff", position: "relative", padding: 20 }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: "#001526", margin: "0 0 16px" }}>Syarat Pembayaran</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px", maxWidth: 520 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={{ fontSize: 13, color: "#444746", minWidth: 140 }}>Jika membayar antara</label>
                <input type="number" value={formData.masaDiskon} onChange={(e) => setFormData({ ...formData, masaDiskon: Number(e.target.value) })}
                  style={{ ...inputStyle, width: 60 }} />
                <span style={{ fontSize: 13, color: "#444746" }}>Hari</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={{ fontSize: 13, color: "#444746", minWidth: 140 }}>Akan mendapat diskon</label>
                <input type="number" value={formData.diskon} onChange={(e) => setFormData({ ...formData, diskon: Number(e.target.value) })}
                  style={{ ...inputStyle, width: 60 }} />
                <span style={{ fontSize: 13, color: "#444746" }}>%</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={{ fontSize: 13, color: "#444746", minWidth: 140 }}>Masa Jatuh Tempo</label>
                <input type="number" value={formData.masaJatuhTempo} onChange={(e) => setFormData({ ...formData, masaJatuhTempo: Number(e.target.value) })}
                  style={{ ...inputStyle, width: 60 }} />
                <span style={{ fontSize: 13, color: "#444746" }}>Hari</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={{ fontSize: 13, color: "#444746", minWidth: 140 }}>Nama</label>
                <input value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  style={{ ...inputStyle, width: 160 }} />
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, gridColumn: "span 2" }}>
                <label style={{ fontSize: 13, color: "#444746", minWidth: 140, marginTop: 6 }}>Keterangan</label>
                <textarea value={formData.keterangan} onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })} rows={3}
                  style={{ width: 300, padding: "6px 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none", resize: "vertical" }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={{ fontSize: 13, color: "#444746", minWidth: 140 }}>Default Syarat Pembayaran</label>
                <input type="checkbox" checked={formData.default} onChange={(e) => setFormData({ ...formData, default: e.target.checked })}
                  style={{ width: 16, height: 16, cursor: "pointer" }} />
                <span style={{ fontSize: 13, color: "#444746" }}>Ya</span>
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
              <th style={{ ...thStyle, width: "15%" }}>Nama</th>
              <th style={{ ...thStyle, textAlign: "right", width: "10%" }}>Diskon (%)</th>
              <th style={{ ...thStyle, textAlign: "right", width: "12%" }}>Masa Diskon (hari)</th>
              <th style={{ ...thStyle, textAlign: "right", width: "14%" }}>Masa Jatuh Tempo (hari)</th>
              <th style={{ ...thStyle, width: "20%" }}>Keterangan</th>
              <th style={{ ...thStyle, textAlign: "center", width: "10%" }}>Non Aktif</th>
              <th style={{ ...thStyle, textAlign: "center", width: "10%" }}>Default</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7} style={{ ...tdStyle, textAlign: "center", padding: "40px 12px", color: "#444746" }}>Tidak ada data</td></tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id}
                  style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer", transition: "background 100ms" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#f0f7ff"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <td style={{ ...tdStyle, fontWeight: 500, color: "#001526" }}>{item.nama}</td>
                  <td style={{ ...tdStyle, textAlign: "right", color: "#444746" }}>{item.diskon}</td>
                  <td style={{ ...tdStyle, textAlign: "right", color: "#444746" }}>{item.masaDiskon}</td>
                  <td style={{ ...tdStyle, textAlign: "right", color: "#444746" }}>{item.masaJatuhTempo}</td>
                  <td style={{ ...tdStyle, color: "#444746" }}>{item.keterangan || ""}</td>
                  <td style={{ ...tdStyle, textAlign: "center", color: "#444746" }}>{item.nonAktif ? "Ya" : "Tidak"}</td>
                  <td style={{ ...tdStyle, textAlign: "center" }}>
                    {item.default ? (
                      <span style={{ display: "inline-flex", padding: "2px 10px", fontSize: 12, fontWeight: 500, background: "#e3f0ff", color: "#0176d3", borderRadius: 10 }}>Ya</span>
                    ) : "Tidak"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
