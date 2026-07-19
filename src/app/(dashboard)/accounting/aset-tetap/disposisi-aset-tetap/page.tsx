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
const labelStyle: React.CSSProperties = { fontSize: 13, color: "#444746", minWidth: 140 }
const thStyle: React.CSSProperties = { padding: "8px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", borderBottom: "1px solid #e0e0e0" }
const tdStyle: React.CSSProperties = { padding: "8px 12px", fontSize: 13, color: "#001526" }
const rowStyle: React.CSSProperties = { borderBottom: "1px solid #f0f0f0" }
const btnIcon: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }
const btnIconOutline: React.CSSProperties = { ...btnIcon, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8" }

const SaveIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
)

export default function DisposisiAsetTetapPage() {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    aset: "", penyusutanTerakhir: "07/07/2026", nilaiSisaBuku: 0,
    nomorOtomatis: true, tipeNomor: "Fixed Asset Disposition", tanggal: "07/07/2026",
    kuantitas: "", akunLabaRugi: "", lokasiAset: "", catatan: "", asetDijual: false,
  })
  const filtered: any[] = []
  const handleSave = () => { setShowForm(false) }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Disposisi Aset Tetap</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Proses disposisi/penghapusan aset</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
          <select style={selectStyle}><option>Tanggal: Semua</option></select>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <button onClick={() => setShowForm(!showForm)} style={btnIcon}><Plus size={16} /></button>
          <button style={btnIconOutline}><RefreshCw size={14} /></button>
          <div style={{ flex: 1 }} />
          <button style={btnIconOutline}><Printer size={14} /></button>
          <button style={btnIconOutline}><Settings size={14} /></button>
          <div style={{ position: "relative" }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
            <input type="text" placeholder="Cari disposisi aset tetap..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ height: 32, padding: "0 10px 0 30px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, width: 200, outline: "none" }} />
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
                <label style={labelStyle}>Aset *</label>
                <div style={{ position: "relative", flex: 1 }}>
                  <Search size={13} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
                  <input type="text" value={formData.aset} onChange={(e) => setFormData({...formData, aset: e.target.value})} placeholder="Cari/Pilih..." style={{ ...inputStyle, paddingLeft: 28 }} />
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Tanggal *</label>
                <input type="text" value={formData.tanggal} onChange={(e) => setFormData({...formData, tanggal: e.target.value})} style={{ ...inputStyle, maxWidth: 130 }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Penyusutan Terakhir</label>
                <input type="text" value={formData.penyusutanTerakhir} onChange={(e) => setFormData({...formData, penyusutanTerakhir: e.target.value})} style={{ ...inputStyle, maxWidth: 130 }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Nomor *</label>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div onClick={() => setFormData({...formData, nomorOtomatis: !formData.nomorOtomatis})} style={{ width: 36, height: 20, borderRadius: 10, cursor: "pointer", background: formData.nomorOtomatis ? "#0176d3" : "#ccc", position: "relative", flexShrink: 0 }}><div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: formData.nomorOtomatis ? 18 : 2, transition: "left 0.2s" }} /></div>
                  <select value={formData.tipeNomor} onChange={(e) => setFormData({...formData, tipeNomor: e.target.value})} style={selectStyle}><option>Fixed Asset Disposition</option></select>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Nilai Sisa Buku</label>
                <input type="number" value={formData.nilaiSisaBuku} onChange={(e) => setFormData({...formData, nilaiSisaBuku: Number(e.target.value)})} style={{ ...inputStyle, maxWidth: 120 }} />
              </div>
            </div>

            <div style={{ border: "1px solid #e0e0e0", borderRadius: 6, padding: "16px 20px", marginTop: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#0176d3"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#0176d3" }}>Informasi umum</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={{ ...labelStyle, minWidth: 130 }}>Kuantitas *</label>
                    <input type="text" value={formData.kuantitas} onChange={(e) => setFormData({...formData, kuantitas: e.target.value})} style={{ ...inputStyle, maxWidth: 80 }} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={{ ...labelStyle, minWidth: 130 }}>Akun Laba Rugi *</label>
                    <div style={{ position: "relative", flex: 1 }}>
                      <Search size={13} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
                      <input type="text" value={formData.akunLabaRugi} onChange={(e) => setFormData({...formData, akunLabaRugi: e.target.value})} placeholder="Cari/Pilih Akun Perkiraan..." style={{ ...inputStyle, paddingLeft: 28 }} />
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={{ ...labelStyle, minWidth: 130 }}>Lokasi Aset</label>
                    <div style={{ position: "relative", flex: 1 }}>
                      <Search size={13} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
                      <input type="text" value={formData.lokasiAset} onChange={(e) => setFormData({...formData, lokasiAset: e.target.value})} placeholder="Cari/Pilih..." style={{ ...inputStyle, paddingLeft: 28 }} />
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <label style={{ ...labelStyle, minWidth: 130, marginTop: 6 }}>Catatan</label>
                    <textarea value={formData.catatan} onChange={(e) => setFormData({...formData, catatan: e.target.value})} rows={3} style={{ ...inputStyle, resize: "vertical", height: "auto", padding: "6px 10px" }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <input type="checkbox" checked={formData.asetDijual} onChange={(e) => setFormData({...formData, asetDijual: e.target.checked})} style={{ width: 16, height: 16 }} />
                    <label style={{ fontSize: 13, color: "#444746" }}>Aset Dijual</label>
                    <span style={{ fontSize: 13, color: "#444746" }}>Ya</span>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={handleSave} style={{ position: "absolute", right: 24, top: 20, ...btnIconOutline }} title="Simpan"><SaveIcon /></button>
          </div>
        </div>
      )}

      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ background: "#fff" }}>
            {[{ l: "Nomor #" }, { l: "Tanggal" }, { l: "Keterangan" }, { l: "Aset Tetap" }].map(c => <th key={c.l} style={thStyle}>{c.l}</th>)}
          </tr></thead>
          <tbody><tr><td colSpan={4} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data</td></tr></tbody>
        </table>
      </div>
    </div>
  )
}
