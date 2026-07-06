"use client"

import { useState } from "react"
import {
  Plus,
  RefreshCw,
  Settings,
  Search,
} from "lucide-react"

interface ProsesAkhirBulan {
  id: string
  nama: string
  tanggalInput: string
  keterangan: string
}

interface KursMataUang {
  id: string
  nama: string
  nilaiTukar: number
}

const dummyData: ProsesAkhirBulan[] = []

const defaultKurs: KursMataUang[] = [
  { id: "1", nama: "Indonesian Rupiah", nilaiTukar: 1 },
  { id: "2", nama: "US Dollar", nilaiTukar: 15800 },
  { id: "3", nama: "Singapore Dollar", nilaiTukar: 11800 },
]

export default function ProsesAkhirBulanPage() {
  const [search, setSearch] = useState("")
  const [filterBulan, setFilterBulan] = useState("semua")
  const [filterTahun, setFilterTahun] = useState("semua")
  const [showForm, setShowForm] = useState(false)

  // Form state
  const [bulan, setBulan] = useState("Januari")
  const [tahun, setTahun] = useState("2026")
  const [kurs, setKurs] = useState<KursMataUang[]>(defaultKurs)

  const filtered = dummyData.filter((item) => {
    if (search && !item.nama.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const handleProses = () => {
    console.log("Proses Akhir Bulan:", { bulan, tahun, kurs })
    alert(`Proses akhir bulan ${bulan} ${tahun} berhasil dijalankan!`)
    setShowForm(false)
  }

  const handleKursChange = (id: string, value: string) => {
    setKurs(kurs.map(k => k.id === id ? { ...k, nilaiTukar: Number(value) || 0 } : k))
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

  const bulanList = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"]

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>Proses Akhir Bulan</h1>
            <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Proses penutupan buku akhir bulan dan kurs mata uang</p>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
          <select value={filterBulan} onChange={(e) => setFilterBulan(e.target.value)} style={selectStyle}>
            <option value="semua">Bulan: Semua</option>
            {bulanList.map(b => <option key={b} value={b}>Bulan: {b}</option>)}
          </select>
          <select value={filterTahun} onChange={(e) => setFilterTahun(e.target.value)} style={selectStyle}>
            <option value="semua">Tahun: Semua</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
          </select>
        </div>

        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <button onClick={() => setShowForm(!showForm)} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }}>
            <Plus size={16} />
          </button>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}>
            <RefreshCw size={14} />
          </button>
          <div style={{ flex: 1 }} />
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}>
            <Settings size={14} />
          </button>
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
          <div style={{ background: "#fff", borderRadius: 8, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", position: "relative" }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526", marginBottom: 16 }}>Data Baru</h3>

            {/* Bulan & Tahun */}
            <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={{ fontSize: 12, color: "#444746" }}>Bulan <span style={{ color: "red" }}>*</span></label>
                <select value={bulan} onChange={(e) => setBulan(e.target.value)} style={{ ...selectStyle, padding: "6px 28px 6px 8px" }}>
                  {bulanList.map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={{ fontSize: 12, color: "#444746" }}>Tahun</label>
                <input type="text" value={tahun} onChange={(e) => setTahun(e.target.value)} style={{ padding: "6px 8px", fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 4, width: 80, outline: "none" }} />
              </div>
            </div>

            {/* Kurs Mata Uang */}
            <div style={{ borderTop: "1px solid #eee", paddingTop: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div style={{ width: 20, height: 20, background: "#e91e63", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                </div>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr style={{ background: "#4a5568" }}>
                    <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "#fff", borderBottom: "1px solid #3a4150", width: "50px" }}></th>
                    <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "#fff", borderBottom: "1px solid #3a4150" }}>Nama Mata Uang</th>
                    <th style={{ padding: "8px 12px", textAlign: "right", fontWeight: 600, color: "#fff", borderBottom: "1px solid #3a4150" }}>Nilai Tukar</th>
                  </tr>
                </thead>
                <tbody>
                  {kurs.map((item) => (
                    <tr key={item.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <td style={{ padding: "8px 12px" }}>
                        <div style={{ width: 20, height: 20, background: "#f5f5f5", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="#666"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
                        </div>
                      </td>
                      <td style={{ padding: "8px 12px", fontWeight: 500, color: "#001526" }}>{item.nama}</td>
                      <td style={{ padding: "8px 12px", textAlign: "right" }}>
                        <input
                          type="number"
                          value={item.nilaiTukar}
                          onChange={(e) => handleKursChange(item.id, e.target.value)}
                          style={{ width: 100, padding: "4px 8px", fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 4, textAlign: "right", outline: "none" }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Save */}
            <button onClick={handleProses} style={{ position: "absolute", right: 24, top: 20, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f0f0", border: "1px solid #d8d8d8", borderRadius: 4, cursor: "pointer", color: "#444746" }} title="Proses">
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
                { label: "Nama", width: "30%" },
                { label: "Tanggal Input", width: "25%" },
                { label: "Keterangan", width: "35%" },
              ].map((col) => (
                <th key={col.label} style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "#fff", borderBottom: "1px solid #3a4150", whiteSpace: "nowrap", width: col.width, cursor: "pointer", userSelect: "none" }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={3} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data</td></tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.style.background = "#f8f9ff"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "8px 12px", fontWeight: 500, color: "#001526" }}>{item.nama}</td>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.tanggalInput}</td>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.keterangan}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
