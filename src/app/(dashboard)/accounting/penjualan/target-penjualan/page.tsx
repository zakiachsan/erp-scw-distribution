"use client"

import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { BuatBaruModal } from "@/components/accounting/buat-baru-modal"
import { dummyProducts } from "@/lib/accounting-dummy-data"

const thStyle: React.CSSProperties = { padding: "8px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", borderBottom: "1px solid #e0e0e0" }
const tdStyle: React.CSSProperties = { padding: "8px 12px", fontSize: 13, color: "#001526" }
const rowStyle: React.CSSProperties = { borderBottom: "1px solid #f0f0f0" }

const PRODUCT_OPTIONS = dummyProducts.map((p) => ({ value: p.id, label: p.nama, kode: p.kode, harga: p.hargaJual }))

 interface SaleTarget { id: string; dariTanggal: string; sdTanggal: string; nama: string }
const dummyTargets: SaleTarget[] = [
  { id: "tgt-1", dariTanggal: "2026-07-01", sdTanggal: "2026-07-31", nama: "Target Juli 2026" },
  { id: "tgt-2", dariTanggal: "2026-06-01", sdTanggal: "2026-06-30", nama: "Target Juni 2026" },
]

export default function TargetPenjualanPage() {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)

  const filtered = dummyTargets.filter((i: SaleTarget) => {
    if (search && !i.nama.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Target Penjualan</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Kelola target penjualan per periode</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12, flexWrap: "wrap" }}>
          <div style={{ flex: 1 }} />
          <div style={{ position: "relative" }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
            <input type="text" placeholder="Cari target..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ height: 32, padding: "0 10px 0 30px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, width: 200, outline: "none" }} />
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
        title="Buat Target Penjualan"
        subtitle="Target penjualan per periode"
        fields={[
          { key: "nama", label: "Nama Target", type: "text", required: true, placeholder: "Contoh: Target Juli 2026" },
          { key: "tipeTarget", label: "Tipe Target", type: "select", options: [{ value: "Per Barang", label: "Per Barang" }, { value: "Per Pelanggan", label: "Per Pelanggan" }, { value: "Per Penjual", label: "Per Penjual" }], defaultValue: "Per Barang" },
          { key: "dariTanggal", label: "Dari Tanggal", type: "date", defaultValue: "2026-07-01" },
          { key: "sdtanggal", label: "S/d Tanggal", type: "date", defaultValue: "2026-07-31", required: true },
        ]}
        itemFields={[
          { key: "qty", label: "Kuantitas", type: "number", defaultValue: 1 },
          { key: "nilai", label: "Nilai", type: "money", defaultValue: 0 },
        ]}
        itemProducts={PRODUCT_OPTIONS}
        onSave={() => setShowForm(false)}
      />

      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ background: "#fff" }}>
            <th style={thStyle}>Dari Tanggal</th>
            <th style={thStyle}>S/d Tanggal</th>
            <th style={thStyle}>Nama</th>
          </tr></thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={3} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data</td></tr>
            ) : filtered.map((item: SaleTarget) => (
              <tr key={item.id} style={rowStyle}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "#f0f7ff"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}
              >
                <td style={{ ...tdStyle, color: "#444746" }}>{item.dariTanggal}</td>
                <td style={{ ...tdStyle, color: "#444746" }}>{item.sdTanggal}</td>
                <td style={{ ...tdStyle, fontWeight: 500 }}>{item.nama}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
