"use client"

/* INTEGRASI: Halaman ini terhubung dengan modul Inventory/Operational (ERP).
   Data produk dari dummyProducts (shared dengan operasional).
   Jika edit, jaga referensi ke data produk. */

import { useState } from "react"
import { dummyProducts } from "@/lib/accounting-dummy-data"

/* ── Inline SVG icons ── */
const Icon = ({ children, size = 14 }: { children: React.ReactNode; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>{children}</svg>
)
const PlusIcon = () => <Icon size={16}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Icon>
const RefreshIcon = () => <Icon><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></Icon>
const SearchIcon = () => <Icon size={13}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Icon>

/* ── Shared styles ── */
const inputStyle: React.CSSProperties = { height: 32, padding: "0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none", width: "100%", boxSizing: "border-box" }
const selectStyle: React.CSSProperties = { height: 32, padding: "0 28px 0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, background: "#fff", color: "#001526", cursor: "pointer", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center" }
const labelStyle: React.CSSProperties = { fontSize: 13, color: "#444746", minWidth: 120 }
const thStyle: React.CSSProperties = { padding: "8px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap", cursor: "pointer", userSelect: "none" }
const btnIcon: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, cursor: "pointer", flexShrink: 0 }
const btnIconBlue: React.CSSProperties = { ...btnIcon, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6 }
const btnIconWhite: React.CSSProperties = { ...btnIcon, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6 }
const btnPrimary: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "7px 14px", fontSize: 13, fontWeight: 600, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }

type AdjustmentType = "Penambahan" | "Pengurangan" | "Atur Stok"

interface AdjustmentItem { id: string; nomor: string; tanggal: string; tipe: AdjustmentType; barang: string; qty: number; keterangan: string }

const typeColors: Record<AdjustmentType, { bg: string; fg: string }> = {
  "Penambahan": { bg: "#e8f5e9", fg: "#2e7d32" },
  "Pengurangan": { bg: "#ffebee", fg: "#c62828" },
  "Atur Stok": { bg: "#e3f2fd", fg: "#1565c0" },
}

export default function PenyesuaianPersediaanPage() {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [items, setItems] = useState<AdjustmentItem[]>([])
  const [formData, setFormData] = useState({
    tanggal: "07/07/2026",
    tipe: "Penambahan" as AdjustmentType,
    barangId: "",
    qty: 0,
    keterangan: "",
  })

  const filtered = items.filter(i => !search || i.nomor.toLowerCase().includes(search.toLowerCase()) || i.barang.toLowerCase().includes(search.toLowerCase()))

  const handleSave = () => {
    const product = dummyProducts.find(p => p.id === formData.barangId)
    const newItem: AdjustmentItem = {
      id: `adj-${Date.now()}`,
      nomor: `ADJ/2026/07/${String(items.length + 1).padStart(3, "0")}`,
      tanggal: formData.tanggal,
      tipe: formData.tipe,
      barang: product ? product.nama : "-",
      qty: formData.qty,
      keterangan: formData.keterangan || `${formData.tipe} stok`,
    }
    setItems([...items, newItem])
    setShowForm(false)
    setFormData({ tanggal: "07/07/2026", tipe: "Penambahan", barangId: "", qty: 0, keterangan: "" })
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>Penyesuaian Persediaan</h1>
        <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Penyesuaian stok barang</p>

        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <button onClick={() => setShowForm(!showForm)} style={btnIconBlue}><PlusIcon /></button>
          <button style={btnIconWhite}><RefreshIcon /></button>
          <div style={{ flex: 1 }} />
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999", display: "flex" }}><SearchIcon /></span>
            <input type="text" placeholder="Cari..." value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === "Enter" && setSearch(search)} style={{ ...inputStyle, paddingLeft: 30, width: 200, height: 32 }} />
          </div>
          <span style={{ fontSize: 11, color: "#888", minWidth: 20, textAlign: "right" }}>{filtered.length}</span>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ background: "#f3f3f3", padding: "16px 20px", borderBottom: "1px solid #d8d8d8" }}>
          <div style={{ background: "#fff", borderRadius: 8, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", maxWidth: 600 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526", marginBottom: 16 }}>Data Baru</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Tipe Penyesuaian *</label>
                <div style={{ display: "flex", gap: 6 }}>
                  {(["Penambahan", "Pengurangan", "Atur Stok"] as AdjustmentType[]).map(t => (
                    <button
                      key={t}
                      onClick={() => setFormData({ ...formData, tipe: t })}
                      style={{
                        padding: "6px 14px", fontSize: 12, fontWeight: 600, borderRadius: 6, cursor: "pointer",
                        border: formData.tipe === t ? `2px solid ${typeColors[t].fg}` : "1px solid #d8d8d8",
                        background: formData.tipe === t ? typeColors[t].bg : "#fff",
                        color: formData.tipe === t ? typeColors[t].fg : "#666",
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <label style={labelStyle}>Tanggal *</label>
                  <input type="text" value={formData.tanggal} onChange={e => setFormData({ ...formData, tanggal: e.target.value })} style={{ ...inputStyle, width: 130 }} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <label style={labelStyle}>Nomor Adjustment *</label>
                  <input style={{ ...inputStyle, background: "#f5f5f5", color: "#666" }} value="Otomatis" disabled />
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Barang *</label>
                <select value={formData.barangId} onChange={e => setFormData({ ...formData, barangId: e.target.value })} style={{ ...selectStyle, flex: 1 }}>
                  <option value="">Pilih Barang...</option>
                  {dummyProducts.filter(p => p.jenis === "Persediaan").map(p => (
                    <option key={p.id} value={p.id}>{p.kode} - {p.nama} (Stok: {p.stok})</option>
                  ))}
                </select>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>{formData.tipe === "Atur Stok" ? "Stok Baru *" : "Jumlah *"}</label>
                <input type="number" value={formData.qty} onChange={e => setFormData({ ...formData, qty: Number(e.target.value) })} style={{ ...inputStyle, maxWidth: 120 }} />
                <span style={{ fontSize: 11, color: "#999" }}>
                  {formData.tipe === "Penambahan" ? "+ tambah stok" : formData.tipe === "Pengurangan" ? "- kurangi stok" : "= set stok persis"}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Keterangan</label>
                <input type="text" value={formData.keterangan} onChange={e => setFormData({ ...formData, keterangan: e.target.value })} placeholder="Alasan penyesuaian" style={inputStyle} />
              </div>
            </div>
            <div style={{ marginTop: 14 }}>
              <button style={btnPrimary} onClick={handleSave}>Simpan</button>
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
                { label: "NOMOR #", width: "16%" },
                { label: "TANGGAL", width: "12%" },
                { label: "TIPE", width: "12%" },
                { label: "BARANG", width: "25%" },
                { label: "QTY", width: "8%", align: "right" as const },
                { label: "KETERANGAN", width: "27%" },
              ].map(col => (
                <th key={col.label} style={{ ...thStyle, width: col.width, textAlign: col.align || "left" }}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data</td></tr>
            ) : filtered.map(item => (
              <tr key={item.id} style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer", fontSize: 13, color: "#001526" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#f0f7ff")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <td style={{ padding: "8px 12px" }}>{item.nomor}</td>
                <td style={{ padding: "8px 12px" }}>{item.tanggal}</td>
                <td style={{ padding: "8px 12px" }}>
                  <span style={{ padding: "2px 8px", borderRadius: 10, fontSize: 11, background: typeColors[item.tipe].bg, color: typeColors[item.tipe].fg }}>{item.tipe}</span>
                </td>
                <td style={{ padding: "8px 12px" }}>{item.barang}</td>
                <td style={{ padding: "8px 12px", textAlign: "right", fontFamily: "monospace" }}>{item.tipe === "Pengurangan" ? `-${item.qty}` : item.qty}</td>
                <td style={{ padding: "8px 12px" }}>{item.keterangan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
