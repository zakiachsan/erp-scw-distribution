"use client"

import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { dummySuppliers, dummyProducts } from "@/lib/accounting-dummy-data"
import { BuatBaruModal } from "@/components/accounting/buat-baru-modal"

const SUPPLIER_OPTIONS = dummySuppliers.map((s) => ({ value: s.nama, label: s.nama }))
const PRODUCT_OPTIONS = dummyProducts.map((p) => ({ value: p.id, label: p.nama, kode: p.kode, harga: p.hargaJual }))

const selectStyle: React.CSSProperties = {
  height: 32, padding: "0 24px 0 10px", fontSize: 13,
  border: "1px solid #d8d8d8", borderRadius: 6,
  background: "#fff", color: "#001526", cursor: "pointer",
  appearance: "none" as const,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat" as const, backgroundPosition: "right 10px center",
}
const thStyle: React.CSSProperties = { padding: "8px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", borderBottom: "1px solid #e0e0e0" }


export default function HargaPemasokPage() {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [filterPemasok, setFilterPemasok] = useState("semua")
  const filtered: any[] = []

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Harga Pemasok</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Kelola harga dari pemasok</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
          <select style={selectStyle}><option>Tanggal: Semua</option></select>
          <select value={filterPemasok} onChange={(e) => setFilterPemasok(e.target.value)} style={selectStyle}><option value="semua">Pemasok: Semua</option></select>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <div style={{ flex: 1 }} />
          <div style={{ position: "relative" }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
            <input type="text" placeholder="Cari harga pemasok..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ height: 32, padding: "0 10px 0 30px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, width: 200, outline: "none" }} />
          </div>
          <button
            onClick={() => setShowForm(true)}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 32, padding: "0 14px", fontSize: 13, fontWeight: 600, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }}
          >
            <Plus size={14} /> Buat Baru
          </button>
          <span style={{ fontSize: 11, color: "#888" }}>{filtered.length}</span>
        </div>
      </div>

            <BuatBaruModal
        key={String(showForm)}
        open={showForm}
        onOpenChange={setShowForm}
        title="Buat Harga Pemasok"
        subtitle="Atur harga beli per pemasok"
        fields={[
          { key: "pemasok", label: "Pemasok", type: "combobox", options: SUPPLIER_OPTIONS, required: true, placeholder: "Cari/Pilih Pemasok..." },
          { key: "tipeNomor", label: "Tipe Nomor", type: "select", options: [{ value: "Supplier Price", label: "Supplier Price" }], defaultValue: "Supplier Price" },
          { key: "mulaiBerlaku", label: "Mulai Berlaku", type: "date", defaultValue: "2026-07-07", required: true },
          { key: "berakhir", label: "Berakhir", type: "date" },
        ]}
        itemFields={[
          { key: "qty", label: "Qty", type: "number", defaultValue: 1 },
          { key: "harga", label: "Harga", type: "money", defaultValue: 0 },
        ]}
        itemProducts={PRODUCT_OPTIONS}
        onSave={() => setShowForm(false)}
      />

      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ background: "#fff" }}>
            {[{ l: "Nomor #" }, { l: "Mulai Berlaku" }, { l: "Pemasok" }, { l: "Keterangan" }, { l: "Tanggal Berakhir" }].map(c => <th key={c.l} style={thStyle}>{c.l}</th>)}
          </tr></thead>
          <tbody><tr><td colSpan={5} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data</td></tr></tbody>
        </table>
      </div>
    </div>
  )
}
