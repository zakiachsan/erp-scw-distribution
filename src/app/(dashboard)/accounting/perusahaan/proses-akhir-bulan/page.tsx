"use client"

import { useState } from "react"
import { Plus, RefreshCw, Settings, Search } from "lucide-react"
import { dummyEndOfMonthProcesses } from "@/lib/accounting-dummy-data"

interface KursMataUang {
  id: string; nama: string; nilaiTukar: number
}

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

  const [bulan, setBulan] = useState("Januari")
  const [tahun, setTahun] = useState("2026")
  const [kurs, setKurs] = useState<KursMataUang[]>(defaultKurs)

  const filtered = dummyEndOfMonthProcesses.filter((item) => {
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

  const bulanList = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"]

  const thStyle: React.CSSProperties = { fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", padding: "8px 12px", textAlign: "left", background: "#fff" }
  const tdStyle: React.CSSProperties = { padding: "8px 12px", fontSize: 13, color: "#001526" }
  const btnStyle: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", fontSize: 13, fontWeight: 600, background: "#0176d3", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }
  const inputStyle: React.CSSProperties = { height: 32, padding: "0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none" }
  const iconBtnStyle: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "transparent", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer", color: "#0176d3" }
  const selectStyle: React.CSSProperties = { height: 32, padding: "0 28px 0 10px", fontSize: 13, fontWeight: 500, border: "1px solid #d8d8d8", borderRadius: 6, background: "#fff", color: "#001526", cursor: "pointer", outline: "none", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center" }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: "16px 20px 0", background: "#fff" }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", margin: 0 }}>Proses Akhir Bulan</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2, margin: 0 }}>Proses penutupan buku akhir bulan dan kurs mata uang</p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
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

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <button style={btnStyle} onClick={() => setShowForm(!showForm)}><Plus size={14} /></button>
          <button style={iconBtnStyle}><RefreshCw size={14} /></button>
          <div style={{ flex: 1 }} />
          <button style={iconBtnStyle}><Settings size={14} /></button>
          <div style={{ position: "relative" }}>
            <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#444746" }} />
            <input placeholder="Cari proses akhir bulan..." value={search} onChange={(e) => setSearch(e.target.value)}
              style={{ ...inputStyle, paddingLeft: 30, paddingRight: 10, width: 180 }} />
          </div>
          <span style={{ fontSize: 12, color: "#444746", minWidth: 20, textAlign: "right" }}>{filtered.length}</span>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ background: "#f8f9fa", padding: "16px 20px", borderBottom: "1px solid #ecebea" }}>
          <div style={{ border: "1px solid #ddd", borderRadius: 8, background: "#fff", position: "relative", padding: 20 }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: "#001526", margin: "0 0 16px" }}>Data Baru</h3>

            <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={{ fontSize: 13, color: "#444746" }}>Bulan <span style={{ color: "#ea001e" }}>*</span></label>
                <select value={bulan} onChange={(e) => setBulan(e.target.value)} style={selectStyle}>
                  {bulanList.map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={{ fontSize: 13, color: "#444746" }}>Tahun</label>
                <input value={tahun} onChange={(e) => setTahun(e.target.value)}
                  style={{ ...inputStyle, width: 80 }} />
              </div>
            </div>

            <div style={{ borderTop: "1px solid #ecebea", paddingTop: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div style={{ width: 20, height: 20, background: "#0176d3", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                </div>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#032d60" }}>
                    <th style={{ fontSize: 12, fontWeight: 600, color: "#fff", textAlign: "left", padding: "8px 12px", width: 50 }}></th>
                    <th style={{ fontSize: 12, fontWeight: 600, color: "#fff", textAlign: "left", padding: "8px 12px" }}>Nama Mata Uang</th>
                    <th style={{ fontSize: 12, fontWeight: 600, color: "#fff", textAlign: "right", padding: "8px 12px" }}>Nilai Tukar</th>
                  </tr>
                </thead>
                <tbody>
                  {kurs.map((item) => (
                    <tr key={item.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <td style={{ padding: "6px 12px" }}>
                        <div style={{ width: 18, height: 18, background: "#f3f3f3", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="#666"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
                        </div>
                      </td>
                      <td style={{ fontSize: 13, fontWeight: 500, color: "#001526", padding: "6px 12px" }}>{item.nama}</td>
                      <td style={{ padding: "6px 12px", textAlign: "right" }}>
                        <input type="number" value={item.nilaiTukar} onChange={(e) => handleKursChange(item.id, e.target.value)}
                          style={{ height: 28, width: 100, padding: "0 8px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none", textAlign: "right" }} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
              <button onClick={handleProses}
                style={{ ...btnStyle, background: "#2e844a" }}>Proses</button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ecebea" }}>
              <th style={{ ...thStyle, width: "30%" }}>Nama</th>
              <th style={{ ...thStyle, width: "25%" }}>Tanggal Input</th>
              <th style={{ ...thStyle, width: "45%" }}>Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={3} style={{ ...tdStyle, textAlign: "center", padding: "64px 12px", color: "#444746" }}>Belum ada data</td></tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id}
                  style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer", transition: "background 100ms" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#f0f7ff"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <td style={{ ...tdStyle, fontWeight: 500, color: "#001526" }}>{item.nama}</td>
                  <td style={{ ...tdStyle, color: "#444746" }}>{item.tanggalInput}</td>
                  <td style={{ ...tdStyle, color: "#444746" }}>{item.keterangan}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
