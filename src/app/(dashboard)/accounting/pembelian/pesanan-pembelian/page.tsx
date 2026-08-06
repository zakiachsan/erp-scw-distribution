"use client"

/* INTEGRASI: Halaman ini terhubung dengan modul Purchasing (ERP).
   Data dummy mereferensikan PO-2025-xxx dari purchasing.
   Jika edit, jaga cross-reference ke modul Purchasing. */

import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { dummyPurchaseOrders, dummySuppliers, dummyProducts } from "@/lib/accounting-dummy-data"
import { BuatBaruModal } from "@/components/accounting/buat-baru-modal"

const SUPPLIER_OPTIONS = dummySuppliers.map((s) => ({ value: s.nama, label: s.nama }))
const PRODUCT_OPTIONS = dummyProducts.map((p) => ({ value: p.id, label: p.nama, kode: p.kode, harga: p.hargaJual }))
const ERP_PO_REFS = ["PO-2025-0042", "PO-2025-0044", "PO-2025-0045"]
const ERP_PO_LINKS: Record<string, string> = {
  "PO-2025-0042": "/purchasing/1",
  "PO-2025-0044": "/purchasing/0",
  "PO-2025-0045": "/purchasing/4",
}

function formatIDR(n: number) { return `Rp ${n.toLocaleString("id-ID")}` }

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

function statusBadge(s: string) {
  const colors: Record<string, { bg: string; fg: string }> = {
    Draft: { bg: "#fff3e0", fg: "#e65100" },
    Approved: { bg: "#e3f2fd", fg: "#1565c0" },
    Received: { bg: "#e8f5e9", fg: "#2e7d32" },
    Billed: { bg: "#f3e5f5", fg: "#7b1fa2" },
  }
  const c = colors[s] || { bg: "#f5f5f5", fg: "#666" }
  return <span style={{ padding: "2px 8px", borderRadius: 10, fontSize: 11, background: c.bg, color: c.fg }}>{s}</span>
}

export default function PesananPembelianPage() {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [filterStatus, setFilterStatus] = useState("semua")
  const filtered = dummyPurchaseOrders.filter(i => {
    if (search && !i.nomor.toLowerCase().includes(search.toLowerCase()) && !i.pemasok.toLowerCase().includes(search.toLowerCase())) return false
    if (filterStatus !== "semua" && i.status !== filterStatus) return false
    return true
  })

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Pesanan Pembelian</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Kelola pesanan pembelian ke pemasok</p>
        </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12, flexWrap: "wrap" }}>
            <select style={selectStyle}><option>Tanggal: Semua</option></select>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={selectStyle}>
            <option value="semua">Status: Semua</option>
            <option>Draft</option><option>Approved</option><option>Received</option><option>Billed</option>
            </select>
            <div style={{ flex: 1 }} />
            <div style={{ position: "relative" }}>
              <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
              <input type="text" placeholder="Cari pesanan pembelian..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ height: 32, padding: "0 10px 0 30px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, width: 200, outline: "none" }} />
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
        title="Buat Pesanan Pembelian"
        subtitle="Pesanan baru akan berstatus Draft"
        fields={[
          { key: "pemasok", label: "Pemasok", type: "combobox", options: SUPPLIER_OPTIONS, required: true, placeholder: "Cari/Pilih Pemasok..." },
          { key: "nomor", label: "Nomor", type: "text", placeholder: "Otomatis" },
          { key: "tanggal", label: "Tanggal", type: "date", defaultValue: "2026-07-07", required: true },
          { key: "keterangan", label: "Keterangan", type: "textarea", placeholder: "Catatan pesanan..." },
        ]}
        itemFields={[
          { key: "qty", label: "Qty", type: "number", defaultValue: 1 },
          { key: "harga", label: "Harga", type: "number", defaultValue: 0 },
        ]}
        itemProducts={PRODUCT_OPTIONS}
        onSave={() => setShowForm(false)}
      />

      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ background: "#fff" }}>
            <th style={thStyle}>Nomor #</th>
            <th style={thStyle}>Ref. ERP</th>
            <th style={thStyle}>Tanggal</th>
            <th style={thStyle}>Pemasok</th>
            <th style={thStyle}>Keterangan</th>
            <th style={thStyle}>Status</th>
            <th style={thRight}>Total</th>
          </tr></thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data</td></tr>
            ) : filtered.map((item, idx) => (
              <tr key={item.id} style={rowStyle}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#f0f7ff"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
              >
                <td style={tdMono}>{item.nomor}</td>
                <td style={{ ...tdMono, fontSize: 11 }}>
                  <a href={ERP_PO_LINKS[ERP_PO_REFS[idx % ERP_PO_REFS.length]]} style={{ color: "#0176d3", textDecoration: "none", fontWeight: 600 }}>
                    {ERP_PO_REFS[idx % ERP_PO_REFS.length]}
                  </a>
                </td>
                <td style={tdStyle}>{item.tanggal}</td>
                <td style={tdStyle}>{item.pemasok}</td>
                <td style={tdStyle}>{item.keterangan}</td>
                <td style={tdStyle}>{statusBadge(item.status)}</td>
                <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace" }}>{formatIDR(item.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
