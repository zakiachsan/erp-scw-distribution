"use client"

import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { dummySuppliers, type Supplier } from "@/lib/accounting-dummy-data"
import { BuatBaruModal } from "@/components/accounting/buat-baru-modal"

const KATEGORI_OPTIONS = [{ value: "General", label: "General" }, { value: "VIP", label: "VIP" }, { value: "Default", label: "Default" }]

function formatIDR(n: number) { return `Rp ${n.toLocaleString("id-ID")}` }


const thStyle: React.CSSProperties = { padding: "8px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", borderBottom: "1px solid #e0e0e0" }
const thRight: React.CSSProperties = { ...thStyle, textAlign: "right" }
const tdStyle: React.CSSProperties = { padding: "8px 12px", fontSize: 13, color: "#001526" }
const rowStyle: React.CSSProperties = { borderBottom: "1px solid #f0f0f0" }
const selectStyle: React.CSSProperties = { height: 32, padding: "0 24px 0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, background: "#fff", color: "#001526", cursor: "pointer", appearance: "none" as const, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat" as const, backgroundPosition: "right 10px center" }


export default function PemasokPage() {
  const [search, setSearch] = useState("")
  const [filterNonAktif, setFilterNonAktif] = useState("semua")
  const [filterKategori, setFilterKategori] = useState("semua")
  const [showForm, setShowForm] = useState(false)

  const filtered = dummySuppliers.filter((i: Supplier) => {
    if (search && !i.nama.toLowerCase().includes(search.toLowerCase())) return false
    if (filterKategori !== "semua" && i.kategori !== filterKategori) return false
    return true
  })



  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Pemasok</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Kelola data pemasok</p>
        </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12, flexWrap: "wrap" }}>
            <select value={filterNonAktif} onChange={(e) => setFilterNonAktif(e.target.value)} style={selectStyle}>
            <option value="semua">Non Aktif: Semua</option>
            </select>
            <select value={filterKategori} onChange={(e) => setFilterKategori(e.target.value)} style={selectStyle}>
            <option value="semua">Kategori: Semua</option>
            <option value="General">General</option>
            <option value="VIP">VIP</option>
            </select>
            <div style={{ flex: 1 }} />
            <div style={{ position: "relative" }}>
              <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
              <input type="text" placeholder="Cari pemasok..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ height: 32, padding: "0 10px 0 30px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, width: 200, outline: "none" }} />
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
        title="Buat Pemasok"
        subtitle="Data master pemasok baru"
        fields={[
          { key: "nama", label: "Nama", type: "text", required: true, placeholder: "Nama pemasok..." },
          { key: "idPemasok", label: "ID Pemasok", type: "text", placeholder: "Otomatis" },
          { key: "kategori", label: "Kategori", type: "combobox", options: KATEGORI_OPTIONS, placeholder: "Cari/Pilih..." },
          { key: "tipePemasok", label: "Tipe Pemasok", type: "select", options: [{ value: "Supplier", label: "Supplier" }, { value: "Vendor", label: "Vendor" }], defaultValue: "Supplier" },
          { key: "noTelp", label: "No. Telp. Bisnis", type: "text", placeholder: "021-xxxxxxx" },
          { key: "handphone", label: "Handphone", type: "text", placeholder: "08xx-xxxx-xxxx" },
          { key: "noWA", label: "No. WhatsApp", type: "text", placeholder: "08xx-xxxx-xxxx" },
          { key: "email", label: "Email", type: "text", placeholder: "email@perusahaan.com" },
          { key: "fax", label: "Faximili", type: "text" },
          { key: "website", label: "Website", type: "text" },
          { key: "syaratPembayaran", label: "Syarat Pembayaran", type: "select", options: [{ value: "COD", label: "COD" }, { value: "Net 7", label: "Net 7" }, { value: "Net 15", label: "Net 15" }, { value: "Net 30", label: "Net 30" }, { value: "Net 45", label: "Net 45" }], defaultValue: "Net 30" },
          { key: "mataUang", label: "Mata Uang", type: "select", options: [{ value: "IDR", label: "IDR" }, { value: "USD", label: "USD" }, { value: "SGD", label: "SGD" }], defaultValue: "IDR" },
          { key: "alamat", label: "Alamat Pembayaran", type: "textarea", placeholder: "Alamat lengkap..." },
          { key: "kota", label: "Kota", type: "text" },
          { key: "kPos", label: "Kode Pos", type: "text" },
          { key: "provinsi", label: "Provinsi", type: "text" },
          { key: "negara", label: "Negara", type: "text", defaultValue: "Indonesia" },
          { key: "npwp", label: "No. NPWP", type: "text", placeholder: "00.000.000.0-000.000" },
          { key: "tipePajak", label: "Tipe Pajak", type: "select", options: [{ value: "Default", label: "Default" }, { value: "PPN", label: "PPN" }], defaultValue: "Default" },
          { key: "catatan", label: "Catatan", type: "textarea", placeholder: "Catatan internal..." },
          { key: "nonAktif", label: "Non Aktif", type: "checkbox" },
        ]}
        onSave={() => setShowForm(false)}
      />

      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ background: "#fff" }}>
            <th style={thStyle}>Nama</th>
            <th style={thStyle}>ID Pemasok</th>
            <th style={thStyle}>Kategori</th>
            <th style={thStyle}>Kota</th>
            <th style={thRight}>Saldo</th>
            <th style={thStyle}>DP &amp; Pelunasan</th>
          </tr></thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data</td></tr>
            ) : filtered.map((item: Supplier) => (
              <tr key={item.id} style={rowStyle}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "#f0f7ff"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}
              >
                <td style={{ ...tdStyle, fontWeight: 500 }}>{item.nama}</td>
                <td style={{ ...tdStyle, fontFamily: "monospace", fontSize: 12 }}>{item.idPemasok}</td>
                <td style={tdStyle}>
                  <span style={{ padding: "2px 8px", borderRadius: 3, fontSize: 11, fontWeight: 600, background: item.kategori === "VIP" ? "#eef4ff" : "#f5f5f5", color: item.kategori === "VIP" ? "#0176d3" : "#444746" }}>{item.kategori}</span>
                </td>
                <td style={{ ...tdStyle, color: "#444746" }}>{item.kota}</td>
                <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace" }}>{formatIDR(item.saldo)}</td>
                {/* A3 — DP & Pelunasan panel (mirror of Purchasing > Suppliers) */}
                <td style={tdStyle}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2, fontSize: 11 }}>
                    <span>
                      <span style={{ color: "#666" }}>DP: </span>
                      <span style={{ fontFamily: "monospace", color: "#0d7a3d", fontWeight: 600 }}>
                        {(item as any).dpPaid ? formatIDR((item as any).dpPaid) : "—"}
                      </span>
                    </span>
                    <span>
                      <span style={{ color: "#666" }}>Sisa: </span>
                      <span style={{ fontFamily: "monospace", color: (item as any).totalInvoice - (item as any).dpPaid > 0 ? "#b95000" : "#888", fontWeight: 600 }}>
                        {(item as any).totalInvoice && (item as any).totalInvoice > 0
                          ? formatIDR((item as any).totalInvoice - ((item as any).dpPaid ?? 0))
                          : "—"}
                      </span>
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
