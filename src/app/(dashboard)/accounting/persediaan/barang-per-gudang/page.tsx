"use client"

import { useState } from "react"
import { dummyProducts, dummyWarehouses } from "@/lib/accounting-dummy-data"

/* ── Inline SVG icons ── */
const Icon = ({ children, size = 14 }: { children: React.ReactNode; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>{children}</svg>
)
const RefreshIcon = () => <Icon><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></Icon>
const SearchIcon = () => <Icon size={13}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Icon>

/* ── Shared styles ── */
const selectStyle: React.CSSProperties = { height: 32, padding: "0 28px 0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, background: "#fff", color: "#001526", cursor: "pointer", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center" }
const inputStyle: React.CSSProperties = { height: 32, padding: "0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none", boxSizing: "border-box" }
const thStyle: React.CSSProperties = { padding: "8px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap", cursor: "pointer", userSelect: "none" }
const btnIcon: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, cursor: "pointer", flexShrink: 0 }
const btnIconWhite: React.CSSProperties = { ...btnIcon, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6 }

export default function BarangPerGudangPage() {
  const [search, setSearch] = useState("")
  const [selectedProduct, setSelectedProduct] = useState("")

  const products = dummyProducts.filter(p => p.jenis === "Persediaan")
  const warehouses = dummyWarehouses

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>Barang Per Gudang</h1>
        <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Stok barang per gudang</p>

        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12, flexWrap: "wrap" }}>
          <select value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)} style={{ ...selectStyle, minWidth: 200 }}>
            <option value="">Pilih Barang</option>
            {products.map(p => <option key={p.id} value={p.id}>{p.nama}</option>)}
          </select>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999", display: "flex" }}><SearchIcon /></span>
            <input type="text" placeholder="Cari Barang..." value={search} onChange={e => setSearch(e.target.value)} style={{ ...inputStyle, paddingLeft: 30, width: 200 }} />
          </div>
          <input style={{ ...inputStyle, width: 110 }} defaultValue="07/07/2026" />
          <button style={btnIconWhite}><RefreshIcon /></button>
        </div>
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {[
                { label: "GUDANG", width: "30%" },
                { label: "STOK TERSEDIA", width: "25%" },
                { label: "STOK DAPAT DIJUAL", width: "20%" },
                { label: "ALAMAT", width: "25%" },
              ].map(col => (
                <th key={col.label} style={{ ...thStyle, width: col.width }}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {selectedProduct ? (
              warehouses.map((wh, idx) => {
                const product = products.find(p => p.id === selectedProduct)
                const distributedStock = product ? Math.floor(product.stok / warehouses.length) * (idx === 0 ? 2 : 1) : 0
                return (
                  <tr key={wh.id} style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer", fontSize: 13, color: "#001526" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#f0f7ff")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "8px 12px", fontWeight: 500 }}>{wh.nama}</td>
                    <td style={{ padding: "8px 12px" }}>{distributedStock}</td>
                    <td style={{ padding: "8px 12px" }}>{distributedStock}</td>
                    <td style={{ padding: "8px 12px" }}>{wh.alamat}</td>
                  </tr>
                )
              })
            ) : (
              <tr><td colSpan={4} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>Pilih barang untuk melihat stok per gudang</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
