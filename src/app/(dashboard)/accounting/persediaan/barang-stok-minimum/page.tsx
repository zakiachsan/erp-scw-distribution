"use client"

import { useState } from "react"
import { dummyProducts } from "@/lib/accounting-dummy-data"

/* ── Inline SVG icons ── */
const Icon = ({ children, size = 14 }: { children: React.ReactNode; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>{children}</svg>
)
const RefreshIcon = () => <Icon><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></Icon>
const SearchIcon = () => <Icon size={13}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Icon>
const FilterIcon = () => <Icon><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></Icon>

/* ── Shared styles ── */
const inputStyle: React.CSSProperties = { height: 32, padding: "0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none", boxSizing: "border-box" }
const thStyle: React.CSSProperties = { padding: "8px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap", cursor: "pointer", userSelect: "none" }
const btnIcon: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, cursor: "pointer", flexShrink: 0 }
const btnIconWhite: React.CSSProperties = { ...btnIcon, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6 }
const btnIconAmber: React.CSSProperties = { ...btnIcon, background: "#ffc107", color: "#fff", border: "1px solid #ffc107", borderRadius: 6 }
const btnOutline: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "7px 14px", fontSize: 13, fontWeight: 600, background: "#fff", color: "#0176d3", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }

function formatIDR(n: number) { return `Rp ${n.toLocaleString("id-ID")}` }

export default function BarangStokMinimumPage() {
  const [search, setSearch] = useState("")

  const items = dummyProducts.filter(p => p.jenis === "Persediaan")
  const filtered = items.filter(i => !search || i.nama.toLowerCase().includes(search.toLowerCase()) || i.kode.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>Barang Stok Minimum</h1>
        <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Monitoring stok minimum</p>

        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12, flexWrap: "wrap" }}>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999", display: "flex" }}><SearchIcon /></span>
            <input type="text" placeholder="Cari Nama/Kode..." value={search} onChange={e => setSearch(e.target.value)} style={{ ...inputStyle, paddingLeft: 30, width: 200 }} />
          </div>
          <button style={btnIconWhite}><RefreshIcon /></button>
          <button style={btnOutline}>Pesan</button>
          <button style={btnOutline}>Minta</button>
          <div style={{ flex: 1 }} />
          <button style={btnIconAmber}><FilterIcon /></button>
        </div>
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {[
                { label: "#", width: "3%" },
                { label: "NAMA BARANG", width: "18%" },
                { label: "KODE", width: "10%" },
                { label: "SATUAN", width: "10%" },
                { label: "STOK", width: "10%", align: "right" as const },
                { label: "HARGA BELI", width: "12%", align: "right" as const },
                { label: "HARGA JUAL", width: "12%", align: "right" as const },
                { label: "STOK MIN", width: "10%", align: "right" as const },
                { label: "STATUS", width: "15%" },
              ].map(col => (
                <th key={col.label} style={{ ...thStyle, width: col.width, textAlign: col.align || "left" }}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={9} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data</td></tr>
            ) : filtered.map((item, idx) => {
              const belowMin = item.stok <= item.stokMin
              return (
                <tr key={item.id}
                  style={{
                    borderBottom: "1px solid #f0f0f0", cursor: "pointer", fontSize: 13, color: "#001526",
                    background: belowMin ? "#fff5f5" : "transparent",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = belowMin ? "#ffeaea" : "#f0f7ff")}
                  onMouseLeave={e => (e.currentTarget.style.background = belowMin ? "#fff5f5" : "transparent")}
                >
                  <td style={{ padding: "8px 12px", color: "#888" }}>{idx + 1}</td>
                  <td style={{ padding: "8px 12px", fontWeight: 500 }}>{item.nama}</td>
                  <td style={{ padding: "8px 12px" }}>{item.kode}</td>
                  <td style={{ padding: "8px 12px" }}>{item.satuan}</td>
                  <td style={{ padding: "8px 12px", textAlign: "right", color: belowMin ? "#d32f2f" : "#001526", fontWeight: belowMin ? 600 : 400 }}>{item.stok}</td>
                  <td style={{ padding: "8px 12px", textAlign: "right" }}>{formatIDR(item.hargaBeli)}</td>
                  <td style={{ padding: "8px 12px", textAlign: "right" }}>{formatIDR(item.hargaJual)}</td>
                  <td style={{ padding: "8px 12px", textAlign: "right" }}>{item.stokMin}</td>
                  <td style={{ padding: "8px 12px" }}>
                    {belowMin
                      ? <span style={{ padding: "2px 8px", borderRadius: 10, fontSize: 11, background: "#ffebee", color: "#d32f2f" }}>Di Bawah Minimum</span>
                      : <span style={{ padding: "2px 8px", borderRadius: 10, fontSize: 11, background: "#e8f5e9", color: "#2e7d32" }}>Aman</span>
                    }
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
