"use client"

import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { BuatBaruModal } from "@/components/accounting/buat-baru-modal"
import { dummyProducts } from "@/lib/accounting-dummy-data"

const thStyle: React.CSSProperties = { padding: "8px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", borderBottom: "1px solid #e0e0e0" }
const tdStyle: React.CSSProperties = { padding: "8px 12px", fontSize: 13, color: "#001526" }
const rowStyle: React.CSSProperties = { borderBottom: "1px solid #f0f0f0" }

const PRODUCT_OPTIONS = dummyProducts.map((p) => ({ value: p.id, label: p.nama, kode: p.kode, harga: p.hargaJual }))
const KATEGORI_OPTIONS = ["General", "VIP"].map((k) => ({ value: k, label: k }))

interface PenyesuaianHarga { id: string; nomor: string; kategori: string; tipe: string; mulaiBerlaku: string }
const dummyPenyesuaian: PenyesuaianHarga[] = [
  { id: "adj-1", nomor: "ADJ/2026/07/001", kategori: "General", tipe: "Harga", mulaiBerlaku: "2026-07-01" },
  { id: "adj-2", nomor: "ADJ/2026/07/002", kategori: "VIP", tipe: "Diskon", mulaiBerlaku: "2026-07-15" },
]

export default function PenyesuaianHargaDiskonPage() {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)

  const filtered = dummyPenyesuaian.filter((i: PenyesuaianHarga) => {
    if (search && !i.nomor.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Penyesuaian Harga & Diskon</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Atur harga dan diskon untuk kategori penjualan</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12, flexWrap: "wrap" }}>
          <div style={{ flex: 1 }} />
          <div style={{ position: "relative" }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
            <input type="text" placeholder="Cari penyesuaian..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ height: 32, padding: "0 10px 0 30px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, width: 200, outline: "none" }} />
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

      {/* ── Modal Buat Baru — konsisten + dropdown + item berfungsi ── */}
      <BuatBaruModal
        key={String(showForm)}
        open={showForm}
        onOpenChange={setShowForm}
        title="Buat Penyesuaian Harga & Diskon"
        subtitle="Penyesuaian harga/diskon per kategori penjualan"
        fields={[
          { key: "kategoriPenjualan", label: "Kategori Penjualan", type: "combobox", options: KATEGORI_OPTIONS, required: true, placeholder: "Cari/Pilih..." },
          { key: "tipePenyesuaian", label: "Tipe Penyesuaian", type: "select", options: [{ value: "Harga", label: "Harga" }, { value: "Diskon", label: "Diskon" }], defaultValue: "Harga" },
          { key: "mulaiBerlaku", label: "Mulai Berlaku", type: "date", defaultValue: "2026-07-01", required: true },
        ]}
        itemFields={[
          { key: "hargaBaru", label: "Harga Baru", type: "money", defaultValue: 0 },
        ]}
        itemProducts={PRODUCT_OPTIONS}
        onSave={() => setShowForm(false)}
      />

      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ background: "#fff" }}>
            <th style={thStyle}>Nomor #</th>
            <th style={thStyle}>Kategori</th>
            <th style={thStyle}>Tipe</th>
            <th style={thStyle}>Mulai Berlaku</th>
          </tr></thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={4} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data</td></tr>
            ) : filtered.map((item: PenyesuaianHarga) => (
              <tr key={item.id} style={rowStyle}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "#f0f7ff"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}
              >
                <td style={{ ...tdStyle, fontFamily: "monospace", fontSize: 12, fontWeight: 500 }}>{item.nomor}</td>
                <td style={{ ...tdStyle, fontWeight: 500 }}>{item.kategori}</td>
                <td style={tdStyle}>{item.tipe}</td>
                <td style={{ ...tdStyle, color: "#444746" }}>{item.mulaiBerlaku}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
