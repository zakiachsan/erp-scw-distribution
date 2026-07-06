"use client"

import { useState } from "react"
import {
  RefreshCw,
  Search,
  Plus,
} from "lucide-react"

interface TransaksiFavorit {
  id: string
  namaFavorit: string
  tipeTransaksi: string
  daftarPengguna: string
}

const dummyData: TransaksiFavorit[] = []

export default function TransaksiFavoritPage() {
  const [search, setSearch] = useState("")
  const [filterTipe, setFilterTipe] = useState("semua")
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    namaFavorit: "",
    tipeTransaksi: "",
    daftarPengguna: "",
    keterangan: "",
  })

  const filtered = dummyData.filter((item) => {
    if (search && !item.namaFavorit.toLowerCase().includes(search.toLowerCase())) return false
    if (filterTipe !== "semua" && item.tipeTransaksi !== filterTipe) return false
    return true
  })

  const handleSave = () => {
    console.log("Save:", formData)
    setShowForm(false)
    setFormData({ namaFavorit: "", tipeTransaksi: "", daftarPengguna: "", keterangan: "" })
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
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>Transaksi Favorit</h1>
            <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Kelola transaksi favorit dan template</p>
          </div>
        </div>

        {/* Filter + Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <select value={filterTipe} onChange={(e) => setFilterTipe(e.target.value)} style={selectStyle}>
            <option value="semua">Tipe Transaksi: Semua</option>
            <option value="Invoice Penjualan">Invoice Penjualan</option>
            <option value="Quotation Penjualan">Quotation Penjualan</option>
            <option value="Invoice Pembelian">Invoice Pembelian</option>
            <option value="Receipt">Receipt</option>
            <option value="Payment">Payment</option>
            <option value="Journal">Journal</option>
          </select>

          <button onClick={() => setShowForm(!showForm)} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }}>
            <Plus size={14} />
          </button>

          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}>
            <RefreshCw size={13} />
          </button>

          <div style={{ flex: 1 }} />

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
          <div style={{ background: "#fff", borderRadius: 8, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", position: "relative", maxWidth: 500 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526", marginBottom: 16 }}>Transaksi Favorit Baru</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Nama Favorit</label>
                <input type="text" value={formData.namaFavorit} onChange={(e) => setFormData({ ...formData, namaFavorit: e.target.value })} style={inputStyle} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Tipe Transaksi</label>
                <select value={formData.tipeTransaksi} onChange={(e) => setFormData({ ...formData, tipeTransaksi: e.target.value })} style={{ ...selectStyle, flex: 1 }}>
                  <option value="">Pilih Tipe</option>
                  <option>Invoice Penjualan</option>
                  <option>Quotation Penjualan</option>
                  <option>Invoice Pembelian</option>
                  <option>Receipt</option>
                  <option>Payment</option>
                  <option>Journal</option>
                </select>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Daftar Pengguna</label>
                <input type="text" value={formData.daftarPengguna} onChange={(e) => setFormData({ ...formData, daftarPengguna: e.target.value })} placeholder="Pisahkan dengan koma" style={inputStyle} />
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <label style={{ ...labelStyle, marginTop: 6 }}>Keterangan</label>
                <textarea value={formData.keterangan} onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })} rows={2} style={{ ...inputStyle, resize: "vertical" }} />
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
                { label: "", width: "40px" },
                { label: "Nama Favorit", width: "30%" },
                { label: "Tipe Transaksi", width: "30%" },
                { label: "Daftar Pengguna", width: "25%" },
              ].map((col) => (
                <th key={col.label || "no"} style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "#fff", borderBottom: "1px solid #3a4150", whiteSpace: "nowrap", width: col.width }}>
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
                  <td style={{ padding: "8px 12px" }}></td>
                  <td style={{ padding: "8px 12px", fontWeight: 500, color: "#001526" }}>{item.namaFavorit}</td>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.tipeTransaksi}</td>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.daftarPengguna}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
