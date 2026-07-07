"use client"

import { useState } from "react"
import { RefreshCw, Search, Plus } from "lucide-react"

interface TransaksiFavorit {
  id: string; namaFavorit: string; tipeTransaksi: string; daftarPengguna: string
}

const dummyData: TransaksiFavorit[] = [
  { id: "1", namaFavorit: "Invoice Penjualan Reguler", tipeTransaksi: "Invoice Penjualan", daftarPengguna: "Semua" },
  { id: "2", namaFavorit: "Pembayaran Sewa Bulanan", tipeTransaksi: "Payment", daftarPengguna: "Admin" },
  { id: "3", namaFavorit: "Quotation Proyek", tipeTransaksi: "Quotation Penjualan", daftarPengguna: "Sales" },
  { id: "4", namaFavorit: "Jurnal Penyesuaian", tipeTransaksi: "Journal", daftarPengguna: "Accounting" },
]

export default function TransaksiFavoritPage() {
  const [search, setSearch] = useState("")
  const [filterTipe, setFilterTipe] = useState("semua")
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    namaFavorit: "", tipeTransaksi: "", daftarPengguna: "", keterangan: "",
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
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", margin: 0 }}>Transaksi Favorit</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2, margin: 0 }}>Kelola transaksi favorit dan template</p>
        </div>

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

          <button style={btnStyle} onClick={() => setShowForm(!showForm)}><Plus size={14} /></button>
          <button style={iconBtnStyle}><RefreshCw size={14} /></button>

          <div style={{ flex: 1 }} />
          <div style={{ position: "relative" }}>
            <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#444746" }} />
            <input placeholder="Ketik dan [Enter" value={search} onChange={(e) => setSearch(e.target.value)}
              style={{ ...inputStyle, paddingLeft: 30, paddingRight: 10, width: 180 }} />
          </div>
          <span style={{ fontSize: 12, color: "#444746", minWidth: 20, textAlign: "right" }}>{filtered.length}</span>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ background: "#f8f9fa", padding: "16px 20px", borderBottom: "1px solid #ecebea" }}>
          <div style={{ border: "1px solid #ddd", borderRadius: 8, background: "#fff", position: "relative", padding: 20, maxWidth: 500 }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: "#001526", margin: "0 0 16px" }}>Transaksi Favorit Baru</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={{ fontSize: 13, color: "#444746", minWidth: 120 }}>Nama Favorit</label>
                <input value={formData.namaFavorit} onChange={(e) => setFormData({ ...formData, namaFavorit: e.target.value })}
                  style={{ ...inputStyle, flex: 1 }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={{ fontSize: 13, color: "#444746", minWidth: 120 }}>Tipe Transaksi</label>
                <select value={formData.tipeTransaksi} onChange={(e) => setFormData({ ...formData, tipeTransaksi: e.target.value })}
                  style={{ ...selectStyle, flex: 1 }}>
                  <option value="">Pilih Tipe</option>
                  <option>Invoice Penjualan</option><option>Quotation Penjualan</option>
                  <option>Invoice Pembelian</option><option>Receipt</option>
                  <option>Payment</option><option>Journal</option>
                </select>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={{ fontSize: 13, color: "#444746", minWidth: 120 }}>Daftar Pengguna</label>
                <input value={formData.daftarPengguna} onChange={(e) => setFormData({ ...formData, daftarPengguna: e.target.value })}
                  placeholder="Pisahkan dengan koma" style={{ ...inputStyle, flex: 1 }} />
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <label style={{ fontSize: 13, color: "#444746", minWidth: 120, marginTop: 6 }}>Keterangan</label>
                <textarea value={formData.keterangan} onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
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
              <th style={{ ...thStyle, width: 40 }}></th>
              <th style={{ ...thStyle, width: "30%" }}>Nama Favorit</th>
              <th style={{ ...thStyle, width: "30%" }}>Tipe Transaksi</th>
              <th style={{ ...thStyle, width: "calc(70% - 40px)" }}>Daftar Pengguna</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={4} style={{ ...tdStyle, textAlign: "center", padding: "64px 12px", color: "#444746" }}>Belum ada data</td></tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id}
                  style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer", transition: "background 100ms" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#f0f7ff"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <td style={tdStyle}></td>
                  <td style={{ ...tdStyle, fontWeight: 500, color: "#001526" }}>{item.namaFavorit}</td>
                  <td style={{ ...tdStyle, color: "#444746" }}>{item.tipeTransaksi}</td>
                  <td style={{ ...tdStyle, color: "#444746" }}>{item.daftarPengguna}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
