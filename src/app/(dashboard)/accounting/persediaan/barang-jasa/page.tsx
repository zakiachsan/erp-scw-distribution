"use client"

import { useState } from "react"
import { dummyProducts } from "@/lib/accounting-dummy-data"

type FormTab = "umum" | "harga" | "stok" | "gudang" | "gambar" | "lainnya"

/* ── Inline SVG icons ── */
const Icon = ({ children, size = 14 }: { children: React.ReactNode; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>{children}</svg>
)
const PlusIcon = () => <Icon size={16}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Icon>
const RefreshIcon = () => <Icon><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></Icon>
const SearchIcon = () => <Icon size={13}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Icon>
const FilterIcon = () => <Icon><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></Icon>

/* ── Shared styles ── */
const selectStyle: React.CSSProperties = { height: 32, padding: "0 28px 0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, background: "#fff", color: "#001526", cursor: "pointer", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center" }
const inputStyle: React.CSSProperties = { height: 32, padding: "0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none", width: "100%", boxSizing: "border-box" }
const labelStyle: React.CSSProperties = { fontSize: 13, color: "#444746", minWidth: 100 }
const thStyle: React.CSSProperties = { padding: "8px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap", cursor: "pointer", userSelect: "none" }
const btnIcon: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, cursor: "pointer", flexShrink: 0 }
const btnIconBlue: React.CSSProperties = { ...btnIcon, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6 }
const btnIconWhite: React.CSSProperties = { ...btnIcon, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6 }
const btnPrimary: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "7px 14px", fontSize: 13, fontWeight: 600, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }

function formatIDR(n: number) { return `Rp ${n.toLocaleString("id-ID")}` }

export default function BarangDanJasaPage() {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [formTab, setFormTab] = useState<FormTab>("umum")
  const [filterJenis, setFilterJenis] = useState("semua")

  const filtered = dummyProducts.filter(i => {
    if (search && !i.nama.toLowerCase().includes(search.toLowerCase()) && !i.kode.toLowerCase().includes(search.toLowerCase())) return false
    if (filterJenis !== "semua" && i.jenis !== filterJenis) return false
    return true
  })

  const formTabs: { key: FormTab; label: string }[] = [
    { key: "umum", label: "Umum" },
    { key: "harga", label: "Harga" },
    { key: "stok", label: "Stok" },
    { key: "gudang", label: "Gudang" },
    { key: "gambar", label: "Gambar" },
    { key: "lainnya", label: "Lainnya" },
  ]

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>Barang & Jasa</h1>
        <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Kelola data barang dan jasa</p>

        {/* Filters */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
          <select style={selectStyle}><option>Non Aktif: Semua</option></select>
          <select value={filterJenis} onChange={e => setFilterJenis(e.target.value)} style={selectStyle}>
            <option value="semua">Jenis: Semua</option>
            <option>Persediaan</option>
            <option>Jasa</option>
            <option>Aset</option>
          </select>
          <select style={selectStyle}><option>Kategori: Semua</option></select>
        </div>

        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <button style={btnIconBlue}><FilterIcon /></button>
          <button onClick={() => { setShowForm(!showForm); setFormTab("umum") }} style={btnIconBlue}><PlusIcon /></button>
          <button style={btnIconWhite}><RefreshIcon /></button>
          <div style={{ flex: 1 }} />
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999", display: "flex" }}><SearchIcon /></span>
            <input type="text" placeholder="Cari..." value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === "Enter" && setSearch(search)} style={{ ...inputStyle, paddingLeft: 30, width: 200, height: 32 }} />
          </div>
          <span style={{ fontSize: 11, color: "#888", minWidth: 20, textAlign: "right" }}>{filtered.length}</span>
        </div>
      </div>

      {/* Form (6 tabs) */}
      {showForm && (
        <div style={{ background: "#f3f3f3", padding: "16px 20px", borderBottom: "1px solid #d8d8d8" }}>
          <div style={{ background: "#fff", borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", overflow: "hidden" }}>
            {/* Sub-tabs */}
            <div style={{ display: "flex", borderBottom: "1px solid #d8d8d8" }}>
              {formTabs.map(t => (
                <button
                  key={t.key}
                  onClick={() => setFormTab(t.key)}
                  style={{
                    padding: "10px 16px", fontSize: 13, fontWeight: formTab === t.key ? 600 : 400,
                    background: formTab === t.key ? "#fff" : "#f5f5f5",
                    color: formTab === t.key ? "#001526" : "#666",
                    border: "none", borderBottom: formTab === t.key ? "2px solid #e91e63" : "2px solid transparent",
                    cursor: "pointer",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div style={{ padding: "20px 24px" }}>
              {formTab === "umum" && (
                <div style={{ maxWidth: 600, padding: "16px", border: "1px solid #e0e0e0", borderRadius: 6 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={labelStyle}>Nama *</label>
                      <input style={inputStyle} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={labelStyle}>Jenis</label>
                      <select style={{ ...selectStyle, flex: 1 }}><option>Persediaan</option><option>Jasa</option><option>Aset</option></select>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={labelStyle}>Kode *</label>
                      <input style={inputStyle} placeholder="Otomatis" />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={labelStyle}>Satuan</label>
                      <input style={inputStyle} />
                    </div>
                  </div>
                </div>
              )}

              {formTab === "harga" && (
                <div style={{ maxWidth: 600, padding: "16px", border: "1px solid #e0e0e0", borderLeft: "3px solid #0176d3", borderRadius: 6 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={labelStyle}>Harga Beli</label>
                      <input style={{ ...inputStyle, border: "1px solid #90caf9" }} type="number" />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={labelStyle}>Harga Jual</label>
                      <input style={{ ...inputStyle, border: "1px solid #90caf9" }} type="number" />
                    </div>
                  </div>
                </div>
              )}

              {formTab === "stok" && (
                <div style={{ maxWidth: 600, padding: "16px", border: "1px solid #e0e0e0", borderLeft: "3px solid #0176d3", borderRadius: 6 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={labelStyle}>Stok Awal</label>
                      <input style={{ ...inputStyle, border: "1px solid #90caf9" }} type="number" />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={labelStyle}>Stok Minimum</label>
                      <input style={{ ...inputStyle, border: "1px solid #90caf9" }} type="number" />
                    </div>
                  </div>
                </div>
              )}

              {formTab === "gudang" && (
                <div style={{ maxWidth: 600, padding: "16px", border: "1px solid #e0e0e0", borderRadius: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={labelStyle}>Gudang Default</label>
                    <select style={{ ...selectStyle, flex: 1 }}>
                      <option>Gudang Pusat</option>
                      <option>Gudang Bandung</option>
                      <option>Gudang Surabaya</option>
                    </select>
                  </div>
                </div>
              )}

              {formTab === "gambar" && (
                <div style={{ maxWidth: 600, padding: "16px", border: "1px solid #e0e0e0", borderRadius: 6 }}>
                  <p style={{ fontSize: 13, color: "#888" }}>Upload gambar produk (JPG/PNG)</p>
                </div>
              )}

              {formTab === "lainnya" && (
                <div style={{ maxWidth: 600, padding: "16px", border: "1px solid #e0e0e0", borderRadius: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={labelStyle}>Catatan</label>
                    <textarea style={{ ...inputStyle, resize: "vertical", height: 80, padding: "8px 10px" }} />
                  </div>
                </div>
              )}
            </div>

            {/* Save */}
            <div style={{ display: "flex", justifyContent: "flex-end", padding: "0 24px 16px" }}>
              <button style={btnPrimary} onClick={() => setShowForm(false)}>Simpan</button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {[
                { label: "#", width: "30px" },
                { label: "NAMA BARANG", width: "22%" },
                { label: "KODE", width: "12%" },
                { label: "JENIS", width: "12%" },
                { label: "SATUAN", width: "10%" },
                { label: "HARGA BELI", width: "12%", align: "right" as const },
                { label: "HARGA JUAL", width: "12%", align: "right" as const },
                { label: "STOK", width: "8%", align: "right" as const },
              ].map(col => (
                <th key={col.label} style={{ ...thStyle, width: col.width, textAlign: col.align || "left" }}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={8} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data</td></tr>
            ) : filtered.map((item, idx) => (
              <tr key={item.id} style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer", fontSize: 13, color: "#001526" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#f0f7ff")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <td style={{ padding: "8px 12px", color: "#888" }}>{idx + 1}</td>
                <td style={{ padding: "8px 12px", fontWeight: 500 }}>{item.nama}</td>
                <td style={{ padding: "8px 12px" }}>{item.kode}</td>
                <td style={{ padding: "8px 12px" }}>{item.jenis}</td>
                <td style={{ padding: "8px 12px" }}>{item.satuan}</td>
                <td style={{ padding: "8px 12px", textAlign: "right" }}>{formatIDR(item.hargaBeli)}</td>
                <td style={{ padding: "8px 12px", textAlign: "right" }}>{formatIDR(item.hargaJual)}</td>
                <td style={{ padding: "8px 12px", textAlign: "right" }}>{item.stok}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
