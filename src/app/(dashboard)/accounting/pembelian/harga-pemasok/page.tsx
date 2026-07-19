"use client"

import { useState } from "react"
import { Plus, RefreshCw, Search, Printer, Settings } from "lucide-react"

const selectStyle: React.CSSProperties = {
  height: 32, padding: "0 24px 0 10px", fontSize: 13,
  border: "1px solid #d8d8d8", borderRadius: 6,
  background: "#fff", color: "#001526", cursor: "pointer",
  appearance: "none" as const,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat" as const, backgroundPosition: "right 10px center",
}
const inputStyle: React.CSSProperties = {
  height: 32, padding: "0 10px", fontSize: 13,
  border: "1px solid #d8d8d8", borderRadius: 6,
  outline: "none", width: "100%", boxSizing: "border-box",
}
const labelStyle: React.CSSProperties = { fontSize: 13, color: "#444746", minWidth: 120 }
const thStyle: React.CSSProperties = { padding: "8px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", borderBottom: "1px solid #e0e0e0" }
const tdStyle: React.CSSProperties = { padding: "8px 12px", fontSize: 13, color: "#001526" }
const rowStyle: React.CSSProperties = { borderBottom: "1px solid #f0f0f0" }
const btnIcon: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }
const btnIconOutline: React.CSSProperties = { ...btnIcon, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8" }

const SaveIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
)

export default function HargaPemasokPage() {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [filterPemasok, setFilterPemasok] = useState("semua")
  const [formData, setFormData] = useState({
    pemasok: "", nomorOtomatis: true, tipeNomor: "Supplier Price",
    mulaiBerlaku: "07/07/2026", aturTanggalBerakhir: false,
  })
  const filtered: any[] = []
  const handleSave = () => { setShowForm(false) }

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
          <button onClick={() => setShowForm(!showForm)} style={btnIcon}><Plus size={16} /></button>
          <button style={btnIconOutline}><RefreshCw size={14} /></button>
          <div style={{ flex: 1 }} />
          <button style={btnIconOutline}><Printer size={14} /></button>
          <button style={btnIconOutline}><Settings size={14} /></button>
          <div style={{ position: "relative" }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
            <input type="text" placeholder="Cari harga pemasok..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ height: 32, padding: "0 10px 0 30px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, width: 200, outline: "none" }} />
          </div>
          <span style={{ fontSize: 11, color: "#888" }}>{filtered.length}</span>
        </div>
      </div>

      {showForm && (
        <div style={{ background: "#f3f3f3", padding: "16px 20px", borderBottom: "1px solid #d8d8d8" }}>
          <div style={{ background: "#fff", borderRadius: 8, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", position: "relative" }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526", marginBottom: 16 }}>Data Baru</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Pemasok *</label>
                <div style={{ position: "relative", flex: 1 }}>
                  <Search size={13} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
                  <input type="text" value={formData.pemasok} onChange={(e) => setFormData({...formData, pemasok: e.target.value})} placeholder="Cari/Pilih Pemasok..." style={{ ...inputStyle, paddingLeft: 28 }} />
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Nomor # *</label>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div onClick={() => setFormData({...formData, nomorOtomatis: !formData.nomorOtomatis})} style={{ width: 36, height: 20, borderRadius: 10, cursor: "pointer", background: formData.nomorOtomatis ? "#0176d3" : "#ccc", position: "relative", flexShrink: 0 }}><div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: formData.nomorOtomatis ? 18 : 2, transition: "left 0.2s" }} /></div>
                  <select value={formData.tipeNomor} onChange={(e) => setFormData({...formData, tipeNomor: e.target.value})} style={selectStyle}><option>Supplier Price</option></select>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><label style={labelStyle}>Mulai Berlaku *</label><input type="text" value={formData.mulaiBerlaku} onChange={(e) => setFormData({...formData, mulaiBerlaku: e.target.value})} style={{ ...inputStyle, maxWidth: 130 }} /></div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><input type="checkbox" checked={formData.aturTanggalBerakhir} onChange={(e) => setFormData({...formData, aturTanggalBerakhir: e.target.checked})} style={{ width: 16, height: 16 }} /><label style={{ fontSize: 13, color: "#444746" }}>Atur Tanggal Berakhir</label></div>
            </div>
            <div style={{ borderTop: "1px solid #eee", paddingTop: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ position: "relative", flex: 1, maxWidth: 250 }}>
                  <Search size={13} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
                  <input type="text" placeholder="Cari/Pilih Barang & Jasa..." style={{ ...inputStyle, paddingLeft: 28 }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#001526", marginLeft: 8 }}>Rincian Barang *</span>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginBottom: 12 }}>
                <thead><tr>
                  {["Nama Barang","Kode #","Satuan","Harga Baru"].map(h => <th key={h} style={{ ...thStyle, background: "#f5f5f5" }}>{h}</th>)}
                </tr></thead>
                <tbody><tr><td colSpan={4} style={{ padding: 30, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data</td></tr></tbody>
              </table>
            </div>
            <button onClick={handleSave} style={{ position: "absolute", right: 24, top: 20, ...btnIconOutline }} title="Simpan"><SaveIcon /></button>
          </div>
        </div>
      )}

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
