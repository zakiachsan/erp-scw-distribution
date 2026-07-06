"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Plus,
  RefreshCw,
  Printer,
  Settings,
  Search,
  Filter,
  X,
} from "lucide-react"

interface GajiEntry {
  id: string
  nomor: string
  tanggal: string
  jatuhTempo: string
  total: number
  tipePembayaran: string
  status: string
  periode: string
  keterangan: string
}

const dummyData: GajiEntry[] = []

export default function GajiTunjanganPage() {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)

  // Filters
  const [filterTanggal, setFilterTanggal] = useState("semua")
  const [filterBulan, setFilterBulan] = useState("semua")
  const [filterTahun, setFilterTahun] = useState("semua")
  const [filterStatus, setFilterStatus] = useState("semua")

  // Form state
  const [formData, setFormData] = useState({
    tipePembayaran: "Bulanan",
    bulan: "Juli",
    tahun: "2026",
    nomorOtomatis: true,
    tipeNomor: "Employee Payroll",
    transDate: "06/07/2026",
    dueDate: "06/07/2026",
  })

  const filtered = dummyData.filter((item) => {
    if (search && !item.nomor.toLowerCase().includes(search.toLowerCase())) return false
    if (filterStatus !== "semua" && item.status !== filterStatus) return false
    if (filterBulan !== "semua" && !item.periode.includes(filterBulan)) return false
    if (filterTahun !== "semua" && !item.periode.includes(filterTahun)) return false
    return true
  })

  const selectStyle = {
    padding: "5px 24px 5px 8px", fontSize: 11, fontWeight: 500,
    border: "1px solid #d8d8d8", borderRadius: 4,
    background: "#fff", color: "#001526", cursor: "pointer",
    appearance: "none" as const,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 6px center",
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>
              Gaji & Tunjangan
            </h1>
            <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>
              Kelola data gaji dan tunjangan karyawan
            </p>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
          <select value={filterTanggal} onChange={(e) => setFilterTanggal(e.target.value)} style={selectStyle}>
            <option value="semua">Tanggal: Semua</option>
          </select>
          <select value={filterBulan} onChange={(e) => setFilterBulan(e.target.value)} style={selectStyle}>
            <option value="semua">Bulan: Semua</option>
            <option value="Januari">Januari</option>
            <option value="Februari">Februari</option>
            <option value="Maret">Maret</option>
            <option value="April">April</option>
            <option value="Mei">Mei</option>
            <option value="Juni">Juni</option>
            <option value="Juli">Juli</option>
            <option value="Agustus">Agustus</option>
            <option value="September">September</option>
            <option value="Oktober">Oktober</option>
            <option value="November">November</option>
            <option value="Desember">Desember</option>
          </select>
          <select value={filterTahun} onChange={(e) => setFilterTahun(e.target.value)} style={selectStyle}>
            <option value="semua">Tahun: Semua</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={selectStyle}>
            <option value="semua">Status: Semua</option>
            <option value="Draft">Draft</option>
            <option value="Posted">Posted</option>
            <option value="Void">Void</option>
          </select>
          <button
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 28, height: 28,
              background: "#0176d3", color: "#fff",
              border: "1px solid #0176d3", borderRadius: 4,
              cursor: "pointer",
            }}
          >
            <Filter size={12} />
          </button>
        </div>

        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
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

          {/* Settings */}
          <button
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 32, height: 32,
              background: "#fff", color: "#0176d3",
              border: "1px solid #d8d8d8", borderRadius: 6,
              cursor: "pointer",
            }}
          >
            <Settings size={14} />
          </button>

          {/* Search */}
          <div style={{ position: "relative" }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
            <input
              type="text"
              placeholder="Ketik dan [Enter]"
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

          <span style={{ fontSize: 11, color: "#888", minWidth: 20, textAlign: "right" }}>
            {filtered.length}
          </span>
        </div>
      </div>

      {/* Form (collapsible) */}
      {showForm && (
        <div style={{ background: "#f3f3f3", padding: "16px 20px", borderBottom: "1px solid #d8d8d8" }}>
          <div style={{ background: "#fff", borderRadius: 8, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
            {/* Top row */}
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 16 }}>
              {/* Left: Tipe & Bulan */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <label style={{ fontSize: 11, color: "#444746", minWidth: 100 }}>Tipe Pembayaran</label>
                  <select
                    value={formData.tipePembayaran}
                    onChange={(e) => setFormData({ ...formData, tipePembayaran: e.target.value })}
                    style={{ ...selectStyle, padding: "5px 28px 5px 8px" }}
                  >
                    <option>Bulanan</option>
                    <option>Mingguan</option>
                    <option>Harian</option>
                  </select>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <label style={{ fontSize: 11, color: "#444746", minWidth: 100 }}>Bulan</label>
                  <select
                    value={formData.bulan}
                    onChange={(e) => setFormData({ ...formData, bulan: e.target.value })}
                    style={{ ...selectStyle, width: 100 }}
                  >
                    {["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"].map(b => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                  <select
                    value={formData.tahun}
                    onChange={(e) => setFormData({ ...formData, tahun: e.target.value })}
                    style={{ ...selectStyle, width: 80 }}
                  >
                    <option>2026</option>
                    <option>2025</option>
                  </select>
                </div>
              </div>

              {/* Right: Number, dates */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <label style={{ fontSize: 11, color: "#444746" }}>Number *</label>
                  <div
                    onClick={() => setFormData({ ...formData, nomorOtomatis: !formData.nomorOtomatis })}
                    style={{
                      width: 36, height: 20, borderRadius: 10, cursor: "pointer",
                      background: formData.nomorOtomatis ? "#0176d3" : "#ccc",
                      position: "relative", transition: "background 0.2s",
                    }}
                  >
                    <div style={{
                      width: 16, height: 16, borderRadius: "50%", background: "#fff",
                      position: "absolute", top: 2,
                      left: formData.nomorOtomatis ? 18 : 2,
                      transition: "left 0.2s",
                    }} />
                  </div>
                  <select
                    value={formData.tipeNomor}
                    onChange={(e) => setFormData({ ...formData, tipeNomor: e.target.value })}
                    style={{ ...selectStyle, width: 150 }}
                  >
                    <option>Employee Payroll</option>
                  </select>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <label style={{ fontSize: 11, color: "#444746" }}>Trans Date *</label>
                  <input
                    type="text"
                    value={formData.transDate}
                    onChange={(e) => setFormData({ ...formData, transDate: e.target.value })}
                    style={{ padding: "5px 8px", fontSize: 11, border: "1px solid #d8d8d8", borderRadius: 4, width: 100, outline: "none" }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <label style={{ fontSize: 11, color: "#444746" }}>Due Date *</label>
                  <input
                    type="text"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    style={{ padding: "5px 8px", fontSize: 11, border: "1px solid #d8d8d8", borderRadius: 4, width: 100, outline: "none" }}
                  />
                </div>
              </div>
            </div>

            {/* Search karyawan + table */}
            <div style={{ borderTop: "1px solid #eee", paddingTop: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ position: "relative", flex: 1, maxWidth: 250 }}>
                  <Search size={13} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
                  <input
                    type="text"
                    placeholder="Cari/Pilih..."
                    style={{
                      padding: "6px 8px 6px 28px", fontSize: 12,
                      border: "1px solid #d8d8d8", borderRadius: 4,
                      width: "100%", outline: "none", boxSizing: "border-box",
                    }}
                  />
                </div>
                <button style={{
                  padding: "5px 12px", fontSize: 11, fontWeight: 600,
                  background: "#0176d3", color: "#fff",
                  border: "1px solid #0176d3", borderRadius: 4,
                  cursor: "pointer",
                }}>
                  Ambil
                </button>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#001526", marginLeft: 8 }}>Rincian Karyawan *</span>
              </div>

              {/* Detail table */}
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, marginBottom: 12 }}>
                <thead>
                  <tr style={{ background: "#4a5568" }}>
                    {["Employee Name", "Gross Income", "Tax Income", "Salary Amount"].map((h) => (
                      <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "#fff", borderBottom: "1px solid #3a4150" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={4} style={{ padding: 40, textAlign: "center", color: "#888", fontSize: 13 }}>
                      Belum ada data
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Summary */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 24, fontSize: 12, fontWeight: 600, color: "#001526", borderTop: "1px solid #eee", paddingTop: 8 }}>
                <span>Gross Income: <span style={{ fontWeight: 400 }}>0</span></span>
                <span>Salary Amount: <span style={{ fontWeight: 400 }}>0</span></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* List Table */}
      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ background: "#4a5568" }}>
              {[
                { label: "Nomor #", width: "12%" },
                { label: "Tanggal", width: "10%" },
                { label: "Jatuh Tempo", width: "10%" },
                { label: "Total", width: "12%", align: "right" as const },
                { label: "Tipe Pembayaran", width: "12%" },
                { label: "Status", width: "10%" },
                { label: "Periode", width: "12%" },
                { label: "Keterangan", width: "15%" },
              ].map((col) => (
                <th
                  key={col.label}
                  style={{
                    padding: "8px 12px", textAlign: col.align || "left",
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
                <td colSpan={8} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>
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
                  <td style={{ padding: "8px 12px", fontWeight: 500, color: "#001526" }}>{item.nomor}</td>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.tanggal}</td>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.jatuhTempo}</td>
                  <td style={{ padding: "8px 12px", textAlign: "right", fontFamily: "monospace", color: "#444746" }}>
                    {item.total.toLocaleString("id-ID")}
                  </td>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.tipePembayaran}</td>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.status}</td>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.periode}</td>
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
