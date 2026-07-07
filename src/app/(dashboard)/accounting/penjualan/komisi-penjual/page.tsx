"use client"

import { useState } from "react"
import { Plus, RefreshCw, Printer, Settings, Search } from "lucide-react"
import { dummyCommissions, type Commission } from "@/lib/accounting-dummy-data"

const thStyle: React.CSSProperties = { padding: "8px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", borderBottom: "1px solid #e0e0e0" }
const tdStyle: React.CSSProperties = { padding: "8px 12px", fontSize: 13, color: "#001526" }
const rowStyle: React.CSSProperties = { borderBottom: "1px solid #f0f0f0" }
const btnIcon: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }
const btnIconOutline: React.CSSProperties = { ...btnIcon, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8" }
const inputStyle: React.CSSProperties = { height: 32, padding: "0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none", width: "100%", boxSizing: "border-box" }
const selectStyle: React.CSSProperties = { height: 32, padding: "0 24px 0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, background: "#fff", color: "#001526", cursor: "pointer", appearance: "none" as const, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat" as const, backgroundPosition: "right 10px center" }
const labelStyle: React.CSSProperties = { fontSize: 13, color: "#444746", minWidth: 180 }

export default function KomisiPenjualPage() {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    komisiBerlaku: "selamanya", namaPerhitungan: "", berlakuKe: "semua", urutan: ["pertama"],
    komisiBarang: "Semua Barang", dariPemasok: "Semua Pemasok", syaratPerhitungan: "tanpa",
    nilaiPenjualanMin: "", nilaiPenjualanMax: "", kuantitasMin: "", kuantitasMax: "", kuantitasPer: "",
    tipeKomisi: "persentase", persentase: "", dariNilai: "Nilai Penjualan",
  })

  const filtered = dummyCommissions.filter((i: Commission) => {
    if (search && !i.nama.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const handleSave = () => { setShowForm(false) }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Komisi Penjual</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Hitung dan kelola komisi sales</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <button onClick={() => setShowForm(!showForm)} style={btnIcon}><Plus size={16} /></button>
          <button style={btnIconOutline}><RefreshCw size={14} /></button>
          <div style={{ flex: 1 }} />
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
          <div style={{ background: "#fff", borderRadius: 8, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", position: "relative" }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526", marginBottom: 16 }}>Data Baru</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 600 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#001526", display: "block", marginBottom: 6 }}>Komisi Berlaku</label>
                <div style={{ display: "flex", gap: 16 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13 }}><input type="radio" name="berlaku" checked={formData.komisiBerlaku === "selamanya"} onChange={() => setFormData({...formData, komisiBerlaku:"selamanya"})} /> Selamanya</label>
                  <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13 }}><input type="radio" name="berlaku" checked={formData.komisiBerlaku === "periode"} onChange={() => setFormData({...formData, komisiBerlaku:"periode"})} /> Periode Tertentu</label>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Nama perhitungan komisi *</label>
                <input type="text" value={formData.namaPerhitungan} onChange={(e) => setFormData({...formData, namaPerhitungan: e.target.value})} style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#001526", display: "block", marginBottom: 6 }}>Berlaku ke Tenaga Penjual *</label>
                <div style={{ display: "flex", gap: 16 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13 }}><input type="radio" name="berlaku2" checked={formData.berlakuKe === "semua"} onChange={() => setFormData({...formData, berlakuKe:"semua"})} /> Semua</label>
                  <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13 }}><input type="radio" name="berlaku2" checked={formData.berlakuKe === "tertentu"} onChange={() => setFormData({...formData, berlakuKe:"tertentu"})} /> Tertentu</label>
                </div>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#001526", display: "block", marginBottom: 6 }}>Diberikan pada penjual urutan *</label>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {["Pertama","Kedua","Ketiga","Keempat","Kelima"].map((u) => (
                    <label key={u} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13 }}>
                      <input type="checkbox" checked={formData.urutan.includes(u.toLowerCase())} onChange={() => {
                        const ur = [...formData.urutan];
                        ur.includes(u.toLowerCase()) ? ur.splice(ur.indexOf(u.toLowerCase()),1) : ur.push(u.toLowerCase());
                        setFormData({...formData, urutan: ur});
                      }} /> {u}
                    </label>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Komisi berlaku untuk barang *</label>
                <select value={formData.komisiBarang} onChange={(e) => setFormData({...formData, komisiBarang: e.target.value})} style={{ ...selectStyle, flex: 1 }}><option>Semua Barang</option><option>Barang Tertentu</option></select>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Dari pemasok utama *</label>
                <select value={formData.dariPemasok} onChange={(e) => setFormData({...formData, dariPemasok: e.target.value})} style={{ ...selectStyle, flex: 1 }}><option>Semua Pemasok</option><option>Pemasok Tertentu</option></select>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#001526", display: "block", marginBottom: 6 }}>Dengan syarat perhitungan *</label>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13 }}><input type="radio" name="syarat" checked={formData.syaratPerhitungan === "tanpa"} onChange={() => setFormData({...formData, syaratPerhitungan:"tanpa"})} /> Tanpa batasan dan syarat</label>
                  <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13 }}><input type="radio" name="syarat" checked={formData.syaratPerhitungan === "nilai"} onChange={() => setFormData({...formData, syaratPerhitungan:"nilai"})} /> Nilai Penjualan antara <input type="text" style={{ ...inputStyle, width: 80, flex: "none" }} /> s/d <input type="text" style={{ ...inputStyle, width: 80, flex: "none" }} /></label>
                  <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13 }}><input type="radio" name="syarat" checked={formData.syaratPerhitungan === "kuantitas"} onChange={() => setFormData({...formData, syaratPerhitungan:"kuantitas"})} /> Kuantitas penjualan antara <input type="text" style={{ ...inputStyle, width: 80, flex: "none" }} /> s/d <input type="text" style={{ ...inputStyle, width: 80, flex: "none" }} /></label>
                  <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13 }}><input type="radio" name="syarat" checked={formData.syaratPerhitungan === "perunit"} onChange={() => setFormData({...formData, syaratPerhitungan:"perunit"})} /> Kuantitas terjual per <input type="text" style={{ ...inputStyle, width: 60, flex: "none" }} /> Unit (Berlaku kelipatan)</label>
                </div>
              </div>
              <div style={{ borderTop: "1px solid #eee", paddingTop: 12 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#001526", display: "block", marginBottom: 6 }}>Akan mendapat komisi *</label>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <select value={formData.tipeKomisi} onChange={(e) => setFormData({...formData, tipeKomisi: e.target.value})} style={{ ...selectStyle, width: 130 }}><option value="persentase">Persentase</option><option value="fixed">Fixed Amount</option></select>
                  <input type="text" value={formData.persentase} onChange={(e) => setFormData({...formData, persentase: e.target.value})} style={{ ...inputStyle, maxWidth: 80 }} />
                  <span style={{ fontSize: 13, color: "#444746" }}>% dari</span>
                  <select value={formData.dariNilai} onChange={(e) => setFormData({...formData, dariNilai: e.target.value})} style={{ ...selectStyle, flex: 1 }}><option>Nilai Penjualan</option><option>Harga Jual</option></select>
                </div>
              </div>
            </div>
            <button onClick={handleSave} style={{ position: "absolute", right: 24, top: 20, ...btnIcon }} title="Simpan">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
            </button>
          </div>
        </div>
      )}

      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ background: "#fff" }}>
            <th style={thStyle}>Catatan</th>
            <th style={thStyle}>Nama</th>
            <th style={thStyle}>Periode Berlaku</th>
          </tr></thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={3} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data</td></tr>
            ) : filtered.map((item: Commission) => (
              <tr key={item.id} style={rowStyle}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "#f0f7ff"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}
              >
                <td style={{ ...tdStyle, color: "#444746" }}>{item.catatan}</td>
                <td style={{ ...tdStyle, fontWeight: 500 }}>{item.nama}</td>
                <td style={{ ...tdStyle, color: "#444746" }}>{item.periode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
