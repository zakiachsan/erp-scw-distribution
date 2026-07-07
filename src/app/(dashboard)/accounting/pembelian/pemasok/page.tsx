"use client"

import { useState } from "react"
import { Plus, RefreshCw, Download, Upload, Printer, Settings, Search, Filter } from "lucide-react"
import { dummySuppliers, type Supplier } from "@/lib/accounting-dummy-data"

function formatIDR(n: number) { return `Rp ${n.toLocaleString("id-ID")}` }

type FormTab = "umum" | "kontak" | "pembelian" | "pajak" | "saldo" | "lainlain"

const thStyle: React.CSSProperties = { padding: "8px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", borderBottom: "1px solid #e0e0e0" }
const thRight: React.CSSProperties = { ...thStyle, textAlign: "right" }
const tdStyle: React.CSSProperties = { padding: "8px 12px", fontSize: 13, color: "#001526" }
const rowStyle: React.CSSProperties = { borderBottom: "1px solid #f0f0f0" }
const btnIcon: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }
const btnIconOutline: React.CSSProperties = { ...btnIcon, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8" }
const inputStyle: React.CSSProperties = { height: 32, padding: "0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none", width: "100%", boxSizing: "border-box" }
const selectStyle: React.CSSProperties = { height: 32, padding: "0 24px 0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, background: "#fff", color: "#001526", cursor: "pointer", appearance: "none" as const, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat" as const, backgroundPosition: "right 10px center" }
const labelStyle: React.CSSProperties = { fontSize: 13, color: "#444746", minWidth: 130 }
const tabStyle = (active: boolean): React.CSSProperties => ({
  padding: "10px 16px", fontSize: 13, fontWeight: active ? 600 : 400,
  background: active ? "#0176d3" : "#f5f5f5", color: active ? "#fff" : "#666",
  border: "none", borderBottom: active ? "2px solid #0176d3" : "2px solid transparent",
  cursor: "pointer"
})

const SaveIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
)

export default function PemasokPage() {
  const [search, setSearch] = useState("")
  const [filterNonAktif, setFilterNonAktif] = useState("semua")
  const [filterKategori, setFilterKategori] = useState("semua")
  const [showForm, setShowForm] = useState(false)
  const [formTab, setFormTab] = useState<FormTab>("umum")

  const filtered = dummySuppliers.filter((i: Supplier) => {
    if (search && !i.nama.toLowerCase().includes(search.toLowerCase())) return false
    if (filterKategori !== "semua" && i.kategori !== filterKategori) return false
    return true
  })

  const handleSave = () => { setShowForm(false); setFormTab("umum") }

  const tabs: { key: FormTab; label: string }[] = [
    { key: "umum", label: "Umum" }, { key: "kontak", label: "Kontak" }, { key: "pembelian", label: "Pembelian" },
    { key: "pajak", label: "Pajak" }, { key: "saldo", label: "Saldo Utang" }, { key: "lainlain", label: "Lain-lain" },
  ]

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Pemasok</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Kelola data pemasok</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
          <select value={filterNonAktif} onChange={(e) => setFilterNonAktif(e.target.value)} style={selectStyle}>
            <option value="semua">Non Aktif: Semua</option>
          </select>
          <select value={filterKategori} onChange={(e) => setFilterKategori(e.target.value)} style={selectStyle}>
            <option value="semua">Kategori: Semua</option>
            <option value="General">General</option>
            <option value="VIP">VIP</option>
          </select>
          <button style={btnIcon}><Filter size={14} /></button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <button onClick={() => { setShowForm(!showForm); setFormTab("umum") }} style={btnIcon}><Plus size={16} /></button>
          <button style={btnIconOutline}><RefreshCw size={14} /></button>
          <div style={{ flex: 1 }} />
          <button style={btnIconOutline}><Download size={14} /></button>
          <button style={btnIconOutline}><Upload size={14} /></button>
          <button style={btnIconOutline}><Printer size={14} /></button>
          <button style={btnIconOutline}><Settings size={14} /></button>
          <div style={{ position: "relative" }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
            <input type="text" placeholder="Ketik dan [Enter]" value={search} onChange={(e) => setSearch(e.target.value)} style={{ height: 32, padding: "0 10px 0 30px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, width: 200, outline: "none" }} />
          </div>
          <span style={{ fontSize: 11, color: "#888" }}>{filtered.length}</span>
        </div>
      </div>

      {showForm && (
        <div style={{ background: "#f3f3f3", padding: "16px 20px", borderBottom: "1px solid #d8d8d8" }}>
          <div style={{ background: "#fff", borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", overflow: "hidden", position: "relative" }}>
            <div style={{ display: "flex", borderBottom: "1px solid #d8d8d8" }}>
              {tabs.map(t => (
                <button key={t.key} onClick={() => setFormTab(t.key)} style={tabStyle(formTab === t.key)}>{t.label}</button>
              ))}
            </div>
            <div style={{ padding: "16px 20px" }}>
              {formTab === "umum" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#0176d3" }}>Info Umum</label>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}><label style={labelStyle}>Nama *</label><input type="text" style={inputStyle} /></div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={labelStyle}>ID Pemasok *</label>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 36, height: 20, borderRadius: 10, background: "#0176d3", position: "relative" }}><div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: 18 }} /></div>
                        <select style={selectStyle}><option>Supplier</option></select>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={labelStyle}>Kategori</label>
                      <div style={{ position: "relative", flex: 1 }}><Search size={12} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "#999" }} /><input type="text" placeholder="Cari/Pilih..." style={{ ...inputStyle, paddingLeft: 28 }} /></div>
                    </div>
                    {[{l:"No. Telp. Bisnis"},{l:"Handphone"},{l:"No. WhatsApp"},{l:"Email"},{l:"Faximili"},{l:"Website"}].map(f => (
                      <div key={f.l} style={{ display: "flex", alignItems: "center", gap: 8 }}><label style={labelStyle}>{f.l}</label><input type="text" style={inputStyle} /></div>
                    ))}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#0176d3" }}>Info Lainnya</label>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <label style={{ ...labelStyle, marginTop: 6 }}>Alamat Pembayaran</label>
                      <textarea placeholder="Jalan" rows={3} style={{ ...inputStyle, resize: "vertical", height: "auto", padding: "6px 10px" }} />
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <div style={{ flex: 1 }}><label style={{ fontSize: 11, color: "#666" }}>Kota</label><input type="text" style={inputStyle} /></div>
                      <div style={{ width: 80 }}><label style={{ fontSize: 11, color: "#666" }}>K.Pos</label><input type="text" style={inputStyle} /></div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}><label style={labelStyle}>Provinsi</label><input type="text" style={inputStyle} /></div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}><label style={labelStyle}>Negara</label><input type="text" style={inputStyle} /></div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={labelStyle}>Tipe Pemasok</label>
                      <select style={{ ...selectStyle, flex: 1 }}><option value="">— Pilih Tipe Pemasok —</option><option>Supplier</option><option>Vendor</option></select>
                    </div>
                  </div>
                </div>
              )}
              {formTab === "kontak" && (
                <div style={{ maxWidth: 500 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#001526", display: "block", marginBottom: 8 }}>Kontak</label>
                  <p style={{ fontSize: 13, color: "#888" }}>Belum ada kontak yang ditambahkan.</p>
                </div>
              )}
              {formTab === "pembelian" && (
                <div style={{ maxWidth: 500, display: "flex", flexDirection: "column", gap: 10 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#0176d3" }}>Informasi Pembelian</label>
                  {[{l:"Syarat Pembayaran"},{l:"Harga Beli"},{l:"Satuan Beli"},{l:"Minimum Pembelian"},{l:"Mata Uang"}].map(f => (
                    <div key={f.l} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={{ fontSize: 13, color: "#444746", minWidth: 130 }}>{f.l}</label>
                      <div style={{ position: "relative", flex: 1 }}>
                        <Search size={12} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
                        <input type="text" placeholder="Cari/Pilih..." style={{ ...inputStyle, paddingLeft: 28 }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {formTab === "pajak" && (
                <div style={{ maxWidth: 500, display: "flex", flexDirection: "column", gap: 10 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#0176d3" }}>Pajak</label>
                  {[{l:"No. NPWP"},{l:"Nama Wajib Pajak"},{l:"Tipe Pajak"}].map(f => (
                    <div key={f.l} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={{ fontSize: 13, color: "#444746", minWidth: 130 }}>{f.l}</label>
                      {f.l === "Tipe Pajak" ? <select style={{ ...selectStyle, flex: 1 }}><option>Default</option><option>PPN</option></select> : <input type="text" style={inputStyle} />}
                    </div>
                  ))}
                </div>
              )}
              {formTab === "saldo" && (
                <div style={{ maxWidth: 500 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#0176d3", display: "block", marginBottom: 8 }}>Saldo Utang Awal</label>
                  <p style={{ fontSize: 13, color: "#888" }}>Belum ada saldo utang awal.</p>
                </div>
              )}
              {formTab === "lainlain" && (
                <div style={{ maxWidth: 500, display: "flex", flexDirection: "column", gap: 10 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#0176d3" }}>Lain-lain</label>
                  <div><label style={{ fontSize: 13, color: "#444746", display: "block", marginBottom: 4 }}>Catatan</label><textarea rows={3} style={{ ...inputStyle, resize: "vertical", height: "auto", padding: "6px 10px" }} /></div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}><input type="checkbox" style={{ width: 16, height: 16 }} /><label style={{ fontSize: 13, color: "#444746" }}>Non Aktif</label></div>
                </div>
              )}
            </div>
            <button onClick={handleSave} style={{ position: "absolute", right: 16, top: 12, ...btnIconOutline }} title="Simpan"><SaveIcon /></button>
          </div>
        </div>
      )}

      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ background: "#fff" }}>
            <th style={thStyle}>Nama</th>
            <th style={thStyle}>ID Pemasok</th>
            <th style={thStyle}>Kategori</th>
            <th style={thStyle}>Kota</th>
            <th style={thRight}>Saldo</th>
          </tr></thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={5} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data</td></tr>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
