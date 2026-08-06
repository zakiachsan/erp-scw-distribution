"use client"

import { useState } from "react"
import { Plus, RefreshCw, Printer, Settings, Search, Filter, Download, ArrowLeft } from "lucide-react"
import { dummySalesOrders, type SalesOrder, dummyCustomers, dummyProducts } from "@/lib/accounting-dummy-data"
import { JournalDetailPanel } from "@/components/accounting/journal-detail-panel"
import { BuatBaruModal } from "@/components/accounting/buat-baru-modal"

const CUSTOMER_OPTIONS = dummyCustomers.map((c) => ({ value: c.nama, label: c.nama }))
const PRODUCT_OPTIONS = dummyProducts.map((p) => ({ value: p.id, label: p.nama, kode: p.kode, harga: p.hargaJual }))

const thStyle: React.CSSProperties = { padding: "8px 10px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", borderBottom: "1px solid #e0e0e0" }
const thRight: React.CSSProperties = { ...thStyle, textAlign: "right" }
const tdStyle: React.CSSProperties = { padding: "8px 10px", fontSize: 13, color: "#001526" }
const rowStyle: React.CSSProperties = { borderBottom: "1px solid #f0f0f0" }
const btnIcon: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }
const btnIconOutline: React.CSSProperties = { ...btnIcon, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8" }
const inputStyle: React.CSSProperties = { height: 32, padding: "0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none", width: "100%", boxSizing: "border-box" }
const selectStyle: React.CSSProperties = { height: 32, padding: "0 24px 0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, background: "#fff", color: "#001526", cursor: "pointer", appearance: "none" as const, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat" as const, backgroundPosition: "right 10px center" }
const labelStyle: React.CSSProperties = { fontSize: 13, color: "#444746", minWidth: 100 }

export default function FakturPenjualanPage() {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [filterStatus, setFilterStatus] = useState("semua")
  const [formData, setFormData] = useState({ pelanggan: "", tanggal: "2026-07-06", nomorOtomatis: true, tipeNomor: "Sales Invoice" })
  const [selected, setSelected] = useState<SalesOrder | null>(null)

  const filtered = dummySalesOrders.filter((i: SalesOrder) => {
    if (search && !i.pelanggan.toLowerCase().includes(search.toLowerCase())) return false
    if (filterStatus !== "semua" && i.status !== filterStatus) return false
    return true
  })

  const handleSave = () => { setShowForm(false) }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Faktur Penjualan</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Buat dan kelola faktur/invoice penjualan</p>
        </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12, flexWrap: "wrap" }}>
            <button onClick={() => setShowForm(true)} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "0 14px", height: 32, fontSize: 13, fontWeight: 600, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }}>
              <Plus size={14} /> Buat Baru
            </button>
            <select style={selectStyle}><option>Tanggal: Semua</option></select>
            <select style={selectStyle}><option>Pelanggan: Semua</option></select>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={selectStyle}>
            <option value="semua">Status: Semua</option>
            <option value="Draft">Draft</option>
            <option value="Approved">Approved</option>
            <option value="Invoiced">Invoiced</option>
            </select>
            <select style={selectStyle}><option>Sudah dicetak: Semua</option></select>
            <div style={{ flex: 1 }} />
            <div style={{ position: "relative" }}>
              <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
              <input type="text" placeholder="Cari faktur penjualan..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ height: 32, padding: "0 10px 0 30px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, width: 200, outline: "none" }} />
            </div>
            <span style={{ fontSize: 11, color: "#888", minWidth: 20, textAlign: "right" }}>{filtered.length}</span>
          </div>
      </div>

      <BuatBaruModal
        key={String(showForm)}
        open={showForm}
        onOpenChange={setShowForm}
        title="Buat Faktur Penjualan"
        subtitle="Faktur baru akan berstatus Draft"
        fields={[
          { key: "pelanggan", label: "Pelanggan", type: "combobox", options: CUSTOMER_OPTIONS, required: true, placeholder: "Cari/Pilih Pelanggan..." },
          { key: "tanggal", label: "Tanggal", type: "date", required: true, defaultValue: "2026-07-06" },
          { key: "tipeNomor", label: "Tipe Nomor", type: "select", defaultValue: "Sales Invoice", options: [
            { value: "Sales Invoice", label: "Sales Invoice" },
          ]},
          { key: "keterangan", label: "Keterangan", type: "textarea", placeholder: "Catatan faktur..." },
        ]}
        itemFields={[
          { key: "nama", label: "Nama Barang", type: "text" },
          { key: "qty", label: "Qty", type: "number" },
          { key: "harga", label: "Harga", type: "number" },
        ]}
        itemProducts={PRODUCT_OPTIONS}
        onSave={() => setShowForm(false)}
      />

      {showForm && (
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: -1 }}>
          <span style={{ display: "none" }}>placeholder</span>
        </div>
      )}

      {/* Detail view */}
      {selected ? (
        <div style={{ flex: 1, overflow: "auto", background: "#fff", padding: "16px 20px" }}>
          <button onClick={() => setSelected(null)} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#0176d3", background: "none", border: "none", cursor: "pointer", marginBottom: 16, padding: 0 }}>
            <ArrowLeft size={14} /> Kembali ke daftar
          </button>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: "#001526", margin: 0 }}>{selected.nomor}</h2>
              <p style={{ fontSize: 13, color: "#444746", margin: "2px 0 0" }}>{selected.pelanggan} — {selected.tanggal}</p>
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 10, background: selected.status === "Approved" ? "#e6f7e6" : selected.status === "Draft" ? "#f5f5f5" : "#e0f0ff", color: selected.status === "Approved" ? "#1a7a1a" : selected.status === "Draft" ? "#666" : "#0176d3" }}>
              {selected.status}
            </span>
          </div>

          {/* Items table */}
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 20 }}>
            <thead><tr>
              <th style={thStyle}>Barang / Jasa</th>
              <th style={thStyle}>Kode</th>
              <th style={{ ...thRight, width: 70 }}>Qty</th>
              <th style={{ ...thStyle, width: 70 }}>Satuan</th>
              <th style={{ ...thRight, width: 120 }}>Harga</th>
              <th style={{ ...thRight, width: 120 }}>Diskon</th>
              <th style={{ ...thRight, width: 130 }}>Total</th>
            </tr></thead>
            <tbody>
              {selected.items.map((item, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <td style={{ padding: "8px 10px", fontSize: 13, color: "#001526" }}>{item.namaBarang}</td>
                  <td style={{ padding: "8px 10px", fontSize: 12, fontFamily: "monospace", color: "#888" }}>{item.kodeBarang}</td>
                  <td style={{ padding: "8px 10px", fontSize: 13, textAlign: "right" }}>{item.qty}</td>
                  <td style={{ padding: "8px 10px", fontSize: 13, color: "#666" }}>{item.satuan}</td>
                  <td style={{ padding: "8px 10px", fontSize: 13, textAlign: "right", fontFamily: "monospace" }}>Rp {item.harga.toLocaleString("id-ID")}</td>
                  <td style={{ padding: "8px 10px", fontSize: 13, textAlign: "right", fontFamily: "monospace", color: item.diskon > 0 ? "#c00" : "#888" }}>{item.diskon > 0 ? `Rp ${item.diskon.toLocaleString("id-ID")}` : "-"}</td>
                  <td style={{ padding: "8px 10px", fontSize: 13, textAlign: "right", fontFamily: "monospace", fontWeight: 600 }}>Rp {item.total.toLocaleString("id-ID")}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ borderTop: "2px solid #e0e0e0", background: "#f8f9fa" }}>
                <td colSpan={6} style={{ padding: "8px 10px", fontSize: 13, fontWeight: 700, textAlign: "right", color: "#444746" }}>TOTAL</td>
                <td style={{ padding: "8px 10px", fontSize: 14, fontWeight: 700, textAlign: "right", fontFamily: "monospace", color: "#001526" }}>Rp {selected.total.toLocaleString("id-ID")}</td>
              </tr>
            </tfoot>
          </table>

          {/* Rincian Jurnal */}
          <JournalDetailPanel sourceId={selected.id} />
        </div>
      ) : (
        /* List view */
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
                <tr><td colSpan={6} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data</td></tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} onClick={() => setSelected(item)} style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer", fontSize: 13, color: "#001526" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f7ff")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                    <td style={{ padding: "8px 10px", fontFamily: "monospace", fontWeight: 500, color: "#0176d3" }}>{item.nomor}</td>
                    <td style={{ padding: "8px 10px", color: "#444746" }}>{item.tanggal}</td>
                    <td style={{ padding: "8px 10px" }}>{item.pelanggan}</td>
                    <td style={{ padding: "8px 10px", color: "#444746" }}>{item.keterangan}</td>
                    <td style={{ padding: "8px 10px" }}>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 10, background: item.status === "Approved" ? "#e6f7e6" : item.status === "Draft" ? "#f5f5f5" : "#e0f0ff", color: item.status === "Approved" ? "#1a7a1a" : item.status === "Draft" ? "#666" : "#0176d3" }}>{item.status}</span>
                    </td>
                    <td style={{ padding: "8px 10px", textAlign: "right", fontFamily: "monospace", fontWeight: 600 }}>Rp {item.total.toLocaleString("id-ID")}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
