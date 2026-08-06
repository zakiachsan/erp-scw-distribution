"use client"

import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { dummySuppliers } from "@/lib/accounting-dummy-data"
import { BuatBaruModal } from "@/components/accounting/buat-baru-modal"

const SUPPLIER_OPTIONS = dummySuppliers.map((s) => ({ value: s.nama, label: s.nama }))

const selectStyle: React.CSSProperties = {
  height: 32, padding: "0 24px 0 10px", fontSize: 13,
  border: "1px solid #d8d8d8", borderRadius: 6,
  background: "#fff", color: "#001526", cursor: "pointer",
  appearance: "none" as const,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat" as const, backgroundPosition: "right 10px center",
}
const thStyle: React.CSSProperties = { padding: "8px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", borderBottom: "1px solid #e0e0e0" }
const thRight: React.CSSProperties = { ...thStyle, textAlign: "right" }
const tdStyle: React.CSSProperties = { padding: "8px 12px", fontSize: 13, color: "#001526" }
const tdMono: React.CSSProperties = { ...tdStyle, fontFamily: "monospace", fontSize: 12 }
const rowStyle: React.CSSProperties = { borderBottom: "1px solid #f0f0f0" }

export default function UangMukaPembelianPage() {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [filterStatus, setFilterStatus] = useState("semua")
  const [items] = useState<{ id: string; nomor: string; noFaktur: string; tanggal: string; pemasok: string; keterangan: string; status: string; total: number }[]>([])
  const filtered = items.filter(i => {
    if (search && !i.nomor.toLowerCase().includes(search.toLowerCase())) return false
    if (filterStatus !== "semua" && i.status !== filterStatus) return false
    return true
  })
  function formatIDR(n: number) { return n === 0 ? "-" : `Rp ${n.toLocaleString("id-ID")}` }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Uang Muka Pembelian</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Catat uang muka ke pemasok</p>
        </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12, flexWrap: "wrap" }}>
            <select style={selectStyle}><option>Tanggal: Semua</option></select>
            <select style={selectStyle}><option>Pemasok: Semua</option></select>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={selectStyle}>
            <option value="semua">Status: Semua</option><option>Draft</option><option>Approved</option>
            </select>
            <div style={{ flex: 1 }} />
            <div style={{ position: "relative" }}>
              <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
              <input type="text" placeholder="Cari uang muka pembelian..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ height: 32, padding: "0 10px 0 30px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, width: 200, outline: "none" }} />
            </div>
              <button
                onClick={() => setShowForm(true)}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 32, padding: "0 14px", fontSize: 13, fontWeight: 600, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }}
              >
                <Plus size={14} /> Buat Baru
              </button>
            <span style={{ fontSize: 11, color: "#888", minWidth: 20, textAlign: "right" }}>{filtered.length}</span>
          </div>
      </div>

            <BuatBaruModal
        key={String(showForm)}
        open={showForm}
        onOpenChange={setShowForm}
        title="Buat Uang Muka Pembelian"
        subtitle="Uang muka ke pemasok sebelum barang diterima"
        fields={[
          { key: "pemasok", label: "Pemasok", type: "combobox", options: SUPPLIER_OPTIONS, required: true, placeholder: "Cari/Pilih Pemasok..." },
          { key: "formNo", label: "Form No", type: "text", placeholder: "Otomatis" },
          { key: "tanggal", label: "Tanggal", type: "date", defaultValue: "2026-07-07", required: true },
          { key: "downPayment", label: "Down Payment", type: "money", defaultValue: 0, required: true },
          { key: "keterangan", label: "Keterangan", type: "textarea", placeholder: "Catatan uang muka..." },
        ]}
        onSave={() => setShowForm(false)}
      />

      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ background: "#fff" }}>
            <th style={thStyle}>Nomor #</th>
            <th style={thStyle}>No Faktur #</th>
            <th style={thStyle}>Tanggal</th>
            <th style={thStyle}>Pemasok</th>
            <th style={thStyle}>Keterangan</th>
            <th style={thStyle}>Status</th>
            <th style={thRight}>Total</th>
          </tr></thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data</td></tr>
            ) : filtered.map(item => (
              <tr key={item.id} style={rowStyle}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#f0f7ff"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
              >
                <td style={tdMono}>{item.nomor}</td>
                <td style={tdMono}>{item.noFaktur}</td>
                <td style={tdStyle}>{item.tanggal}</td>
                <td style={tdStyle}>{item.pemasok}</td>
                <td style={tdStyle}>{item.keterangan}</td>
                <td style={tdStyle}>{item.status}</td>
                <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace" }}>{formatIDR(item.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
