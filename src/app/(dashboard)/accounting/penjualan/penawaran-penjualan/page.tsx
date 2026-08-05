"use client"

import { useState } from "react"
import { Plus, RefreshCw, Printer, Settings, Search, Filter, Download } from "lucide-react"
import { dummySalesOrders, type SalesOrder } from "@/lib/accounting-dummy-data"
import { BuatBaruModal } from "@/components/accounting/buat-baru-modal"

function formatIDR(n: number) { return `Rp ${n.toLocaleString("id-ID")}` }

// SLDS design tokens
const thStyle: React.CSSProperties = { padding: "8px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", borderBottom: "1px solid #e0e0e0" }
const thRight: React.CSSProperties = { ...thStyle, textAlign: "right" }
const tdStyle: React.CSSProperties = { padding: "8px 12px", fontSize: 13, color: "#001526" }
const rowStyle: React.CSSProperties = { borderBottom: "1px solid #f0f0f0" }
const btnPrimary: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "7px 14px", fontSize: 13, fontWeight: 600, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }
const btnOutline: React.CSSProperties = { ...btnPrimary, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8" }
const btnIcon: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }
const btnIconOutline: React.CSSProperties = { ...btnIcon, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8" }
const inputStyle: React.CSSProperties = { height: 32, padding: "0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none", width: "100%", boxSizing: "border-box" }
const selectStyle: React.CSSProperties = { height: 32, padding: "0 24px 0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, background: "#fff", color: "#001526", cursor: "pointer", appearance: "none" as const, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat" as const, backgroundPosition: "right 10px center" }
const labelStyle: React.CSSProperties = { fontSize: 13, color: "#444746", minWidth: 100 }
const statusBadge = (status: string) => ({ padding: "2px 8px", borderRadius: 3, fontSize: 11, fontWeight: 600, background: status === "Approved" ? "#e8f5e9" : "#fff3e0", color: status === "Approved" ? "#2e844a" : "#fe9339" })

export default function PenawaranPenjualanPage() {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [filterTanggal, setFilterTanggal] = useState("semua")
  const [filterDipesan, setFilterDipesan] = useState("semua")
  const [filterStatus, setFilterStatus] = useState("semua")
  const [filterCetak, setFilterCetak] = useState("semua")
  const [formData, setFormData] = useState({ pelanggan: "", tanggal: "2026-07-06", nomorOtomatis: true, tipeNomor: "Sales Quotation" })

  const filtered = dummySalesOrders.filter((i: SalesOrder) => {
    if (search && !i.pelanggan.toLowerCase().includes(search.toLowerCase())) return false
    if (filterStatus !== "semua" && i.status !== filterStatus) return false
    return true
  })

  const handleSave = () => { console.log("Save:", formData); setShowForm(false) }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Penawaran Penjualan</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Buat dan kelola penawaran harga ke pelanggan</p>
        </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12, flexWrap: "wrap" }}>
            <button onClick={() => setShowForm(true)} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "0 14px", height: 32, fontSize: 13, fontWeight: 600, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }}>
              <Plus size={14} /> Buat Baru
            </button>
            <select value={filterTanggal} onChange={(e) => setFilterTanggal(e.target.value)} style={selectStyle}>
            <option value="semua">Tanggal: Semua</option>
            </select>
            <select value={filterDipesan} onChange={(e) => setFilterDipesan(e.target.value)} style={selectStyle}>
            <option value="semua">Dipesan oleh: Semua</option>
            </select>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={selectStyle}>
            <option value="semua">Status: Semua</option>
            <option value="Draft">Draft</option>
            <option value="Approved">Approved</option>
            </select>
            <select value={filterCetak} onChange={(e) => setFilterCetak(e.target.value)} style={selectStyle}>
            <option value="semua">Sudah dicetak: Semua</option>
            </select>
            <div style={{ flex: 1 }} />
            <div style={{ position: "relative" }}>
              <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
              <input type="text" placeholder="Cari penawaran penjualan..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ height: 32, padding: "0 10px 0 30px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, width: 200, outline: "none" }} />
            </div>
            <span style={{ fontSize: 11, color: "#888", minWidth: 20, textAlign: "right" }}>{filtered.length}</span>
          </div>
      </div>

      <BuatBaruModal
        open={showForm}
        onOpenChange={setShowForm}
        title="Buat Penawaran Penjualan"
        subtitle="Penawaran baru akan berstatus Draft"
        fields={[
          { key: "pelanggan", label: "Pelanggan", type: "select", required: true, options: [
            { value: "PT Maju Bersama", label: "PT Maju Bersama" },
            { value: "CV Karya Mandiri", label: "CV Karya Mandiri" },
            { value: "UD Sukses Selalu", label: "UD Sukses Selalu" },
            { value: "PT Teknindo Solusi", label: "PT Teknindo Solusi" },
            { value: "Toko Berkah Abadi", label: "Toko Berkah Abadi" },
          ]},
          { key: "tanggal", label: "Tanggal", type: "date", required: true, defaultValue: "06/07/2026" },
          { key: "tipeNomor", label: "Tipe Nomor", type: "select", defaultValue: "Sales Quotation", options: [
            { value: "Sales Quotation", label: "Sales Quotation" },
          ]},
          { key: "keterangan", label: "Keterangan", type: "textarea", placeholder: "Catatan penawaran..." },
        ]}
        itemFields={[
          { key: "nama", label: "Nama Barang", type: "text" },
          { key: "qty", label: "Qty", type: "number" },
          { key: "harga", label: "Harga", type: "number" },
        ]}
        onSave={() => setShowForm(false)}
      />

      {showForm && (
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: -1 }}>
          <span style={{ display: "none" }}>placeholder-back-compat</span>
        </div>
      )}

      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ background: "#fff" }}>
            <th style={thStyle}>Nomor #</th>
            <th style={thStyle}>Tanggal</th>
            <th style={thStyle}>Pelanggan</th>
            <th style={thStyle}>Keterangan</th>
            <th style={thStyle}>Status</th>
            <th style={thRight}>Total</th>
          </tr></thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: 60, textAlign: "center", color: "#ea001e", fontSize: 13 }}>Belum ada data</td></tr>
            ) : filtered.map((item: SalesOrder) => (
              <tr key={item.id} style={rowStyle}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "#f0f7ff"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}
              >
                <td style={{ ...tdStyle, fontFamily: "monospace", fontSize: 12, fontWeight: 500 }}>{item.nomor}</td>
                <td style={{ ...tdStyle, color: "#444746" }}>{item.tanggal}</td>
                <td style={{ ...tdStyle, fontWeight: 500 }}>{item.pelanggan}</td>
                <td style={{ ...tdStyle, color: "#444746" }}>{item.keterangan}</td>
                <td style={tdStyle}><span style={statusBadge(item.status)}>{item.status}</span></td>
                <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace" }}>{formatIDR(item.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
