"use client"

import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { BuatBaruModal } from "@/components/accounting/buat-baru-modal"

const thStyle: React.CSSProperties = { padding: "8px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", borderBottom: "1px solid #e0e0e0" }
const tdStyle: React.CSSProperties = { padding: "8px 12px", fontSize: 13, color: "#001526" }
const rowStyle: React.CSSProperties = { borderBottom: "1px solid #f0f0f0" }


interface Kategori { id: string; nama: string; default: boolean }
const dummyData: Kategori[] = [{ id: "1", nama: "General", default: true }]

export default function KategoriPemasokPage() {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const filtered = dummyData.filter(i => !search || i.nama.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Kategori Pemasok</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Kelola kategori pemasok</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <div style={{ flex: 1 }} />
          <div style={{ position: "relative" }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
            <input type="text" placeholder="Cari kategori pemasok..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ height: 32, padding: "0 10px 0 30px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, width: 200, outline: "none" }} />
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
        title="Buat Kategori Pemasok"
        subtitle="Kelompokkan pemasok berdasarkan kategori"
        fields={[
          { key: "nama", label: "Nama Kategori", type: "text", required: true, placeholder: "Contoh: General, VIP..." },
          { key: "kategoriDefault", label: "Kategori Default", type: "checkbox", defaultValue: 1 },
          { key: "subKategori", label: "Sub Kategori", type: "checkbox" },
        ]}
        onSave={() => setShowForm(false)}
      />

      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ background: "#fff" }}>
            <th style={thStyle}>Nama Kategori</th>
            <th style={thStyle}>Kategori Default</th>
          </tr></thead>
          <tbody>
            {filtered.map(item => (
              <tr key={item.id} style={rowStyle}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "#f0f7ff"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}
              >
                <td style={{ ...tdStyle, fontWeight: 500 }}>{item.nama}</td>
                <td style={{ ...tdStyle, color: "#444746" }}>{item.default ? "Ya" : "Tidak"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
