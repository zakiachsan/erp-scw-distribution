"use client"

import { useState } from "react"
import { Plus, RefreshCw, Printer, Settings, Search, Filter } from "lucide-react"
import { dummyEmployeeSalaries } from "@/lib/accounting-dummy-data"

export default function GajiTunjanganPage() {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)

  const [filterTanggal] = useState("semua")
  const [filterBulan, setFilterBulan] = useState("semua")
  const [filterTahun, setFilterTahun] = useState("semua")
  const [filterStatus, setFilterStatus] = useState("semua")

  const [formData, setFormData] = useState({
    tipePembayaran: "Bulanan",
    bulan: "Juli",
    tahun: "2026",
    nomorOtomatis: true,
    tipeNomor: "Employee Payroll",
    transDate: "06/07/2026",
    dueDate: "06/07/2026",
  })

  const bulanNames = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"]

  const filtered = dummyEmployeeSalaries.filter((item) => {
    if (search && !item.nomor.toLowerCase().includes(search.toLowerCase())) return false
    if (filterStatus !== "semua" && item.status !== filterStatus) return false
    if (filterBulan !== "semua" && !item.periode.includes(filterBulan)) return false
    if (filterTahun !== "semua" && !item.periode.includes(filterTahun)) return false
    return true
  })

  const thStyle: React.CSSProperties = { fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", padding: "8px 12px", textAlign: "left", background: "#fff" }
  const tdStyle: React.CSSProperties = { padding: "8px 12px", fontSize: 13, color: "#001526" }
  const btnStyle: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", fontSize: 13, fontWeight: 600, background: "#0176d3", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }
  const inputStyle: React.CSSProperties = { height: 32, padding: "0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none" }
  const iconBtnStyle: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "transparent", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer", color: "#0176d3" }
  const selectStyle: React.CSSProperties = { height: 32, padding: "0 28px 0 10px", fontSize: 12, fontWeight: 500, border: "1px solid #d8d8d8", borderRadius: 6, background: "#fff", color: "#001526", cursor: "pointer", outline: "none", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center" }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", margin: 0 }}>Gaji & Tunjangan</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2, margin: 0 }}>Kelola data gaji dan tunjangan karyawan</p>
        </div>

        {/* Filter row */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
          <select value={filterTanggal} style={selectStyle}>
            <option value="semua">Tanggal: Semua</option>
          </select>
          <select value={filterBulan} onChange={(e) => setFilterBulan(e.target.value)} style={selectStyle}>
            <option value="semua">Bulan: Semua</option>
            {bulanNames.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          <select value={filterTahun} onChange={(e) => setFilterTahun(e.target.value)} style={selectStyle}>
            <option value="semua">Tahun: Semua</option><option value="2026">2026</option><option value="2025">2025</option>
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={selectStyle}>
            <option value="semua">Status: Semua</option><option value="Draft">Draft</option><option value="Approved">Approved</option><option value="Paid">Paid</option>
          </select>
          <button style={iconBtnStyle}><Filter size={14} /></button>
        </div>

        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <button style={btnStyle} onClick={() => setShowForm(!showForm)}><Plus size={14} /></button>
          <button style={iconBtnStyle}><RefreshCw size={14} /></button>
          <div style={{ flex: 1 }} />
          <button style={iconBtnStyle}><Printer size={14} /></button>
          <button style={iconBtnStyle}><Settings size={14} /></button>
          <div style={{ position: "relative" }}>
            <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#444746" }} />
            <input placeholder="Cari..." value={search} onChange={(e) => setSearch(e.target.value)}
              style={{ ...inputStyle, paddingLeft: 30, paddingRight: 10, width: 180 }} />
          </div>
          <span style={{ fontSize: 12, color: "#444746", minWidth: 20, textAlign: "right" }}>{filtered.length}</span>
        </div>
      </div>

      {showForm && (
        <div style={{ background: "#f8f9fa", padding: "16px 20px", borderBottom: "1px solid #ecebea" }}>
          <div style={{ border: "1px solid #ddd", borderRadius: 8, background: "#fff", padding: 20 }}>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <label style={{ fontSize: 13, color: "#444746", minWidth: 100 }}>Tipe Pembayaran</label>
                  <select value={formData.tipePembayaran} onChange={(e) => setFormData({ ...formData, tipePembayaran: e.target.value })}
                    style={{ ...selectStyle, width: 130 }}>
                    <option>Bulanan</option><option>Mingguan</option><option>Harian</option>
                  </select>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <label style={{ fontSize: 13, color: "#444746", minWidth: 100 }}>Bulan</label>
                  <select value={formData.bulan} onChange={(e) => setFormData({ ...formData, bulan: e.target.value })}
                    style={{ ...selectStyle, width: 110 }}>
                    {bulanNames.map(b => <option key={b}>{b}</option>)}
                  </select>
                  <select value={formData.tahun} onChange={(e) => setFormData({ ...formData, tahun: e.target.value })}
                    style={{ ...selectStyle, width: 80 }}>
                    <option>2026</option><option>2025</option>
                  </select>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <label style={{ fontSize: 13, color: "#444746" }}>Number *</label>
                  <div onClick={() => setFormData({ ...formData, nomorOtomatis: !formData.nomorOtomatis })}
                    style={{ width: 36, height: 20, borderRadius: 10, cursor: "pointer", position: "relative", background: formData.nomorOtomatis ? "#0176d3" : "#ccc", transition: "background 100ms" }}>
                    <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: formData.nomorOtomatis ? 18 : 2, transition: "left 100ms" }} />
                  </div>
                  <select value={formData.tipeNomor} onChange={(e) => setFormData({ ...formData, tipeNomor: e.target.value })}
                    style={{ ...selectStyle, width: 160 }}>
                    <option>Employee Payroll</option>
                  </select>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <label style={{ fontSize: 13, color: "#444746" }}>Trans Date *</label>
                  <input value={formData.transDate} onChange={(e) => setFormData({ ...formData, transDate: e.target.value })}
                    style={{ ...inputStyle, width: 100 }} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <label style={{ fontSize: 13, color: "#444746" }}>Due Date *</label>
                  <input value={formData.dueDate} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    style={{ ...inputStyle, width: 100 }} />
                </div>
              </div>
            </div>

            <div style={{ borderTop: "1px solid #ecebea", paddingTop: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ position: "relative", flex: 1, maxWidth: 250 }}>
                  <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#444746" }} />
                  <input placeholder="Cari/Pilih..." style={{ ...inputStyle, paddingLeft: 30, width: "100%" }} />
                </div>
                <button style={btnStyle}>Ambil</button>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#001526", marginLeft: 8 }}>Rincian Karyawan *</span>
              </div>

              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #ecebea" }}>
                    <th style={thStyle}>Employee Name</th>
                    <th style={thStyle}>Gross Income</th>
                    <th style={thStyle}>Tax Income</th>
                    <th style={thStyle}>Salary Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td colSpan={4} style={{ ...tdStyle, textAlign: "center", padding: "40px 12px", color: "#444746" }}>Belum ada data</td></tr>
                </tbody>
              </table>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 24, fontSize: 13, fontWeight: 600, color: "#001526", borderTop: "1px solid #ecebea", paddingTop: 8, marginTop: 0 }}>
                <span>Gross Income: <span style={{ fontWeight: 400 }}>0</span></span>
                <span>Salary Amount: <span style={{ fontWeight: 400 }}>0</span></span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ecebea" }}>
              <th style={{ ...thStyle, width: "12%" }}>Nomor #</th>
              <th style={{ ...thStyle, width: "10%" }}>Tanggal</th>
              <th style={{ ...thStyle, width: "10%" }}>Jatuh Tempo</th>
              <th style={{ ...thStyle, textAlign: "right", width: "12%" }}>Total</th>
              <th style={{ ...thStyle, width: "12%" }}>Tipe Pembayaran</th>
              <th style={{ ...thStyle, width: "10%" }}>Status</th>
              <th style={{ ...thStyle, width: "12%" }}>Periode</th>
              <th style={{ ...thStyle, width: "15%" }}>Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={8} style={{ ...tdStyle, textAlign: "center", padding: "64px 12px", color: "#444746" }}>Belum ada data</td></tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id}
                  style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer", transition: "background 100ms" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#f0f7ff"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <td style={{ ...tdStyle, fontWeight: 500, fontFamily: "monospace", color: "#001526" }}>{item.nomor}</td>
                  <td style={{ ...tdStyle, color: "#444746" }}>{item.tanggal}</td>
                  <td style={{ ...tdStyle, color: "#444746" }}>{item.jatuhTempo}</td>
                  <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace" }}>{item.total.toLocaleString("id-ID")}</td>
                  <td style={{ ...tdStyle, color: "#444746" }}>{item.tipe}</td>
                  <td>
                    <span style={{
                      display: "inline-flex", padding: "2px 10px", fontSize: 12, fontWeight: 500,
                      borderRadius: 10,
                      background: item.status === "Paid" ? "#e3f5e8" : item.status === "Approved" ? "#e3f0ff" : "#f0f0f0",
                      color: item.status === "Paid" ? "#1e7e34" : item.status === "Approved" ? "#0176d3" : "#444746",
                    }}>{item.status}</span>
                  </td>
                  <td style={{ ...tdStyle, color: "#444746" }}>{item.periode}</td>
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
