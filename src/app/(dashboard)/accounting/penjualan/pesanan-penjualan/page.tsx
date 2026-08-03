"use client"

/* INTEGRASI: Halaman ini terhubung dengan modul Sales (ERP).
   Data dummy mereferensikan SO-2026-xxx dari sales/orders.
   Jika edit, jaga cross-reference ke modul Sales. */

import { useState } from "react"
import { Plus, RefreshCw, Printer, Settings, Search, Filter, Download, Link2 } from "lucide-react"
import { dummySalesOrders, type SalesOrder } from "@/lib/accounting-dummy-data"
import { BuatBaruModal } from "@/components/accounting/buat-baru-modal"

function formatIDR(n: number) { return `Rp ${n.toLocaleString("id-ID")}` }

const thStyle: React.CSSProperties = { padding: "8px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", borderBottom: "1px solid #e0e0e0" }
const thRight: React.CSSProperties = { ...thStyle, textAlign: "right" }
const tdStyle: React.CSSProperties = { padding: "8px 12px", fontSize: 13, color: "#001526" }
const rowStyle: React.CSSProperties = { borderBottom: "1px solid #f0f0f0" }
const btnIcon: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }
const btnIconOutline: React.CSSProperties = { ...btnIcon, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8" }
const inputStyle: React.CSSProperties = { height: 32, padding: "0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none", width: "100%", boxSizing: "border-box" }
const selectStyle: React.CSSProperties = { height: 32, padding: "0 24px 0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, background: "#fff", color: "#001526", cursor: "pointer", appearance: "none" as const, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat" as const, backgroundPosition: "right 10px center" }
const labelStyle: React.CSSProperties = { fontSize: 13, color: "#444746", minWidth: 100 }

export default function PesananPenjualanPage() {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [filterStatus, setFilterStatus] = useState("semua")
  const [formData, setFormData] = useState({ pelanggan: "", tanggal: "06/07/2026", nomorOtomatis: true, tipeNomor: "Sales Order" })

  const filtered = dummySalesOrders.filter((i: SalesOrder) => {
    if (search && !i.pelanggan.toLowerCase().includes(search.toLowerCase())) return false
    if (filterStatus !== "semua" && i.status !== filterStatus) return false
    return true
  })

  const handleSave = () => { setShowForm(false) }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        {/* ERP Integration Banner */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", marginBottom: 10, background: "#eef4ff", border: "1px solid #c2dbf5", borderRadius: 6 }}>
          <Link2 size={14} style={{ color: "#0176d3", flexShrink: 0 }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: "#0176d3" }}>Data terhubung dengan modul Sales ERP</span>
          <span style={{ fontSize: 11, color: "#444746", marginLeft: 4 }}>— Nomor SO disinkronkan otomatis dari modul operasional (contoh: SO-2026-045, SO-2026-046)</span>
        </div>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Pesanan Penjualan</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Kelola pesanan penjualan dari pelanggan</p>
        </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12, flexWrap: "wrap" }}>
            <button onClick={() => setShowForm(true)} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "0 14px", height: 32, fontSize: 13, fontWeight: 600, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }}>
              <Plus size={14} /> Buat Baru
            </button>
            <select style={selectStyle}><option>Tanggal: Semua</option></select>
            <select style={selectStyle}><option>Dipesan oleh: Semua</option></select>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={selectStyle}>
            <option value="semua">Status: Semua</option>
            <option value="Draft">Draft</option>
            <option value="Approved">Approved</option>
            <option value="Shipped">Shipped</option>
            </select>
            <select style={selectStyle}><option>Sudah dicetak: Semua</option></select>
            <div style={{ flex: 1 }} />
            <div style={{ position: "relative" }}>
              <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
              <input type="text" placeholder="Cari pesanan penjualan..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ height: 32, padding: "0 10px 0 30px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, width: 200, outline: "none" }} />
            </div>
            <span style={{ fontSize: 11, color: "#888", minWidth: 20, textAlign: "right" }}>{filtered.length}</span>
          </div>
      </div>

      <BuatBaruModal
        open={showForm}
        onOpenChange={setShowForm}
        title="Buat Pesanan Penjualan"
        subtitle="Pesanan baru akan berstatus Draft"
        fields={[
          { key: "pelanggan", label: "Pelanggan", type: "select", required: true, options: [
            { value: "PT Maju Bersama", label: "PT Maju Bersama" },
            { value: "CV Karya Mandiri", label: "CV Karya Mandiri" },
            { value: "UD Sukses Selalu", label: "UD Sukses Selalu" },
            { value: "PT Teknindo Solusi", label: "PT Teknindo Solusi" },
            { value: "Toko Berkah Abadi", label: "Toko Berkah Abadi" },
          ]},
          { key: "tanggal", label: "Tanggal", type: "date", required: true, defaultValue: "06/07/2026" },
          { key: "tipeNomor", label: "Tipe Nomor", type: "select", defaultValue: "Sales Order", options: [
            { value: "Sales Order", label: "Sales Order" },
          ]},
          { key: "keterangan", label: "Keterangan", type: "textarea", placeholder: "Catatan tambahan..." },
        ]}
        itemFields={[
          { key: "nama", label: "Nama Barang", type: "text" },
          { key: "qty", label: "Qty", type: "number" },
          { key: "harga", label: "Harga", type: "number" },
        ]}
        onSave={() => setShowForm(false)}
      />

      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ background: "#fff" }}>
            <th style={thStyle}>Nomor #</th>
            <th style={thStyle}>Ref. ERP</th>
            <th style={thStyle}>Tanggal</th>
            <th style={thStyle}>Pelanggan</th>
            <th style={thStyle}>Keterangan</th>
            <th style={thStyle}>Status</th>
            <th style={thRight}>Total</th>
          </tr></thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7} style={{ padding: 60, textAlign: "center", color: "#ea001e", fontSize: 13 }}>Belum ada data</td></tr>
            ) : filtered.map((item: SalesOrder, idx: number) => (
              <tr key={item.id} style={rowStyle}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "#f0f7ff"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}
              >
                <td style={{ ...tdStyle, fontFamily: "monospace", fontSize: 12 }}>{item.nomor}</td>
                <td style={{ ...tdStyle, fontFamily: "monospace", fontSize: 11, color: "#0176d3" }}>SO-2026-{String(45 + idx).padStart(3, "0")}</td>
                <td style={{ ...tdStyle, color: "#444746" }}>{item.tanggal}</td>
                <td style={{ ...tdStyle, fontWeight: 500 }}>{item.pelanggan}</td>
                <td style={{ ...tdStyle, color: "#444746" }}>{item.keterangan}</td>
                <td style={tdStyle}><span style={{ padding: "2px 8px", borderRadius: 3, fontSize: 11, fontWeight: 600, background: item.status === "Approved" ? "#e8f5e9" : item.status === "Shipped" ? "#eef4ff" : "#fff3e0", color: item.status === "Approved" ? "#2e844a" : item.status === "Shipped" ? "#0176d3" : "#fe9339" }}>{item.status}</span></td>
                <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace" }}>{formatIDR(item.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
