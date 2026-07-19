"use client"

import { useState } from "react"
import { Plus, RefreshCw, Printer, Settings, Search, Filter } from "lucide-react"
import { dummyDeliveryOrders, type DeliveryOrder } from "@/lib/accounting-dummy-data"

const thStyle: React.CSSProperties = { padding: "8px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", borderBottom: "1px solid #e0e0e0" }
const tdStyle: React.CSSProperties = { padding: "8px 12px", fontSize: 13, color: "#001526" }
const rowStyle: React.CSSProperties = { borderBottom: "1px solid #f0f0f0" }
const btnIcon: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }
const btnIconOutline: React.CSSProperties = { ...btnIcon, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8" }
const inputStyle: React.CSSProperties = { height: 32, padding: "0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none", width: "100%", boxSizing: "border-box" }
const selectStyle: React.CSSProperties = { height: 32, padding: "0 24px 0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, background: "#fff", color: "#001526", cursor: "pointer", appearance: "none" as const, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat" as const, backgroundPosition: "right 10px center" }
const labelStyle: React.CSSProperties = { fontSize: 13, color: "#444746", minWidth: 100 }

export default function PengirimanPesananPage() {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [filterStatus, setFilterStatus] = useState("semua")
  const [formData, setFormData] = useState({ pelanggan: "", tanggal: "06/07/2026", pengiriman: "" })

  const filtered = dummyDeliveryOrders.filter((i: DeliveryOrder) => {
    if (search && !i.pelanggan.toLowerCase().includes(search.toLowerCase())) return false
    if (filterStatus !== "semua" && i.status !== filterStatus) return false
    return true
  })

  const handleSave = () => { setShowForm(false) }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Pengiriman Pesanan</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Proses pengiriman pesanan penjualan</p>
        </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12, flexWrap: "wrap" }}>
            <select style={selectStyle}><option>Tanggal: Semua</option></select>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={selectStyle}>
            <option value="semua">Status: Semua</option>
            <option value="Draft">Draft</option>
            <option value="Dikirim">Dikirim</option>
            <option value="Delivered">Delivered</option>
            </select>
            <select style={selectStyle}><option>Pengiriman: Semua</option></select>
            <select style={selectStyle}><option>Kirim ke: Semua</option></select>
            <div style={{ flex: 1 }} />
            <div style={{ position: "relative" }}>
              <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
              <input type="text" placeholder="Cari pengiriman pesanan..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ height: 32, padding: "0 10px 0 30px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, width: 200, outline: "none" }} />
            </div>
            <span style={{ fontSize: 11, color: "#888", minWidth: 20, textAlign: "right" }}>{filtered.length}</span>
          </div>
      </div>

      {showForm && (
        <div style={{ background: "#f3f3f3", padding: "16px 20px", borderBottom: "1px solid #d8d8d8" }}>
          <div style={{ background: "#fff", borderRadius: 8, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", position: "relative" }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526", marginBottom: 16 }}>Data Baru</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Send to *</label>
                <div style={{ position: "relative", flex: 1 }}>
                  <Search size={12} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
                  <input type="text" value={formData.pelanggan} onChange={(e) => setFormData({...formData, pelanggan: e.target.value})} placeholder="Cari/Pilih Pelanggan..." style={{ ...inputStyle, paddingLeft: 28 }} />
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Date *</label>
                <input type="text" value={formData.tanggal} onChange={(e) => setFormData({...formData, tanggal: e.target.value})} style={{ ...inputStyle, maxWidth: 130 }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Shipment</label>
                <div style={{ position: "relative", flex: 1 }}>
                  <Search size={12} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
                  <input type="text" value={formData.pengiriman} onChange={(e) => setFormData({...formData, pengiriman: e.target.value})} placeholder="Cari/Pilih..." style={{ ...inputStyle, paddingLeft: 28 }} />
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button style={btnIconOutline}>Ambil ▾</button>
                <button style={btnIconOutline}>Faktur</button>
              </div>
            </div>
            <div style={{ borderTop: "1px solid #eee", paddingTop: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ position: "relative", flex: 1, maxWidth: 250 }}>
                  <Search size={13} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
                  <input type="text" placeholder="Cari/Pilih Barang & Jasa..." style={{ ...inputStyle, paddingLeft: 28 }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#001526", marginLeft: 8 }}>Rincian Barang *</span>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginBottom: 12 }}>
                <thead><tr>
                  {["Item Name","Code#","Quantity","Unit"].map(h => <th key={h} style={thStyle}>{h}</th>)}
                </tr></thead>
                <tbody><tr><td colSpan={4} style={{ padding: 30, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data</td></tr></tbody>
              </table>
            </div>
            <button onClick={handleSave} style={{ position: "absolute", right: 24, top: 20, ...btnIcon }} title="Simpan">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
            </button>
          </div>
        </div>
      )}

      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ background: "#fff" }}>
            <th style={thStyle}>Nomor #</th>
            <th style={thStyle}>Tanggal</th>
            <th style={thStyle}>Pelanggan</th>
            <th style={thStyle}>Pengiriman</th>
            <th style={thStyle}>Keterangan</th>
            <th style={thStyle}>Status</th>
          </tr></thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data</td></tr>
            ) : filtered.map((item: DeliveryOrder) => (
              <tr key={item.id} style={rowStyle}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "#f0f7ff"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}
              >
                <td style={{ ...tdStyle, fontFamily: "monospace", fontSize: 12, fontWeight: 500 }}>{item.nomor}</td>
                <td style={{ ...tdStyle, color: "#444746" }}>{item.tanggal}</td>
                <td style={{ ...tdStyle, fontWeight: 500 }}>{item.pelanggan}</td>
                <td style={tdStyle}>{item.pengiriman}</td>
                <td style={{ ...tdStyle, color: "#444746" }}>{item.keterangan}</td>
                <td style={tdStyle}><span style={{ padding: "2px 8px", borderRadius: 3, fontSize: 11, fontWeight: 600, background: item.status === "Dikirim" ? "#e8f5e9" : "#fff3e0", color: item.status === "Dikirim" ? "#2e844a" : "#fe9339" }}>{item.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
