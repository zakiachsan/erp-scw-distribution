"use client"

import { useState } from "react"
import {
  RefreshCw,
  Settings,
  Search,
} from "lucide-react"

interface TransaksiBerulang {
  id: string
  kategori: string
  nama: string
  tipeTransaksi: string
  status: string
}

const dummyData: TransaksiBerulang[] = []

export default function TransaksiBerulangPage() {
  const [search, setSearch] = useState("")
  const [filterKategori, setFilterKategori] = useState("semua")
  const [filterTipe, setFilterTipe] = useState("semua")
  const [filterStatus, setFilterStatus] = useState("semua")
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    kategori: "",
    nama: "",
    tipeTransaksi: "",
    keterangan: "",
  })

  const filtered = dummyData.filter((item) => {
    if (search && !item.nama.toLowerCase().includes(search.toLowerCase())) return false
    if (filterKategori !== "semua" && item.kategori !== filterKategori) return false
    if (filterTipe !== "semua" && item.tipeTransaksi !== filterTipe) return false
    if (filterStatus !== "semua" && item.status !== filterStatus) return false
    return true
  })

  const handleSave = () => {
    console.log("Save:", formData)
    setShowForm(false)
    setFormData({ kategori: "", nama: "", tipeTransaksi: "", keterangan: "" })
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
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>Transaksi Berulang</h1>
            <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Kelola transaksi yang berulang secara otomatis</p>
          </div>
        </div>

        {/* Search bar (wide) */}
        <div style={{ marginTop: 10 }}>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder=""
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%", padding: "7px 10px", fontSize: 12,
                border: "1px solid #d8d8d8", borderRadius: 4,
                outline: "none", boxSizing: "border-box",
              }}
            />
          </div>
        </div>

        {/* Filters + Action row */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
          <select value={filterKategori} onChange={(e) => setFilterKategori(e.target.value)} style={selectStyle}>
            <option value="semua">Kategori: Semua</option>
            <option value="Penjualan">Penjualan</option>
            <option value="Pembelian">Pembelian</option>
            <option value="Pembayaran">Pembayaran</option>
            <option value="Penerimaan">Penerimaan</option>
          </select>
          <select value={filterTipe} onChange={(e) => setFilterTipe(e.target.value)} style={selectStyle}>
            <option value="semua">Tipe Transaksi: Semua</option>
            <option value="Invoice">Invoice</option>
            <option value="Quotation">Quotation</option>
            <option value="Receipt">Receipt</option>
            <option value="Payment">Payment</option>
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={selectStyle}>
            <option value="semua">Status: Semua</option>
            <option value="Aktif">Aktif</option>
            <option value="Non Aktif">Non Aktif</option>
          </select>

          <div style={{ flex: 1 }} />

          {/* Refresh */}
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}>
            <RefreshCw size={13} />
          </button>

          {/* Settings */}
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}>
            <Settings size={13} />
          </button>

          {/* Jalankan button */}
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: "6px 14px", fontSize: 12, fontWeight: 600,
              background: "#e65100", color: "#fff",
              border: "1px solid #e65100", borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Jalankan
          </button>

          {/* Search */}
          <div style={{ position: "relative" }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
            <input
              type="text"
              placeholder="Ketik dan [Enter]"
              style={{
                padding: "6px 10px 6px 30px", fontSize: 12,
                border: "1px solid #d8d8d8", borderRadius: 6,
                width: 160, outline: "none",
              }}
            />
          </div>

          <span style={{ fontSize: 11, color: "#888", minWidth: 20, textAlign: "right" }}>{filtered.length}</span>
        </div>
      </div>

      {/* Form (collapsible) */}
      {showForm && (
        <div style={{ background: "#f3f3f3", padding: "16px 20px", borderBottom: "1px solid #d8d8d8" }}>
          <div style={{ background: "#fff", borderRadius: 8, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", position: "relative", maxWidth: 500 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526", marginBottom: 16 }}>Transaksi Berulang Baru</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Kategori</label>
                <select value={formData.kategori} onChange={(e) => setFormData({ ...formData, kategori: e.target.value })} style={{ ...selectStyle, flex: 1 }}>
                  <option value="">Pilih Kategori</option>
                  <option>Penjualan</option>
                  <option>Pembelian</option>
                  <option>Pembayaran</option>
                  <option>Penerimaan</option>
                </select>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Nama</label>
                <input type="text" value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} style={inputStyle} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Tipe Transaksi</label>
                <select value={formData.tipeTransaksi} onChange={(e) => setFormData({ ...formData, tipeTransaksi: e.target.value })} style={{ ...selectStyle, flex: 1 }}>
                  <option value="">Pilih Tipe</option>
                  <option>Invoice</option>
                  <option>Quotation</option>
                  <option>Receipt</option>
                  <option>Payment</option>
                </select>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <label style={{ ...labelStyle, marginTop: 6 }}>Keterangan</label>
                <textarea value={formData.keterangan} onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
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
                { label: "Kategori", width: "20%" },
                { label: "Nama", width: "30%" },
                { label: "Tipe Transaksi", width: "25%" },
                { label: "Status", width: "15%" },
              ].map((col) => (
                <th key={col.label} style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "#fff", borderBottom: "1px solid #3a4150", whiteSpace: "nowrap", width: col.width, cursor: "pointer", userSelect: "none" }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={4} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data</td></tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.style.background = "#f8f9ff"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.kategori}</td>
                  <td style={{ padding: "8px 12px", fontWeight: 500, color: "#001526" }}>{item.nama}</td>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.tipeTransaksi}</td>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
