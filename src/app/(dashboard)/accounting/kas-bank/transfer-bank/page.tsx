"use client"

import { useState } from "react"
import { Plus, RefreshCw, Printer, Settings, Search, Filter } from "lucide-react"

interface Transfer {
  id: string; nomor: string; tanggal: string; bankKeluar: string; bankMasuk: string; keterangan: string; jumlah: number
}

const dummyData: Transfer[] = [
  { id: "1", nomor: "TRF-2026-001", tanggal: "2026-07-02", bankKeluar: "Bank BCA", bankMasuk: "Bank Mandiri", keterangan: "Transfer operasional bulanan", jumlah: 50000000 },
]

function formatIDR(n: number) { return `Rp ${n.toLocaleString("id-ID")}` }

export default function TransferBankPage() {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [filterKe, setFilterKe] = useState("semua")
  const [filterDari, setFilterDari] = useState("semua")
  const [formData, setFormData] = useState({ tanggal: "08/07/2026", nomorOtomatis: true, tipeNomor: "Bank Transfer", dariBank: "", keBank: "", jumlah: 0 })
  const filtered = dummyData.filter(i => {
    if (search && !i.keterangan.toLowerCase().includes(search.toLowerCase())) return false
    if (filterKe !== "semua" && i.bankMasuk !== filterKe) return false
    if (filterDari !== "semua" && i.bankKeluar !== filterDari) return false
    return true
  })
  const handleSave = () => { console.log("Save:", formData); setShowForm(false) }
  const selectStyle = { padding: "5px 24px 5px 8px", fontSize: 11, border: "1px solid #d8d8d8", borderRadius: 4, background: "#fff", color: "#001526", cursor: "pointer", appearance: "none" as const, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat" as const, backgroundPosition: "right 6px center" }
  const inputStyle = { padding: "6px 8px", fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 4, outline: "none", width: "100%", boxSizing: "border-box" as const }
  const labelStyle = { fontSize: 12, color: "#444746", minWidth: 130 }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div><h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Transfer Bank</h1><p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Kelola transfer antar rekening</p></div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
          <select style={selectStyle}><option>Tanggal: Semua</option></select>
          <select value={filterKe} onChange={(e) => setFilterKe(e.target.value)} style={selectStyle}><option value="semua">Ke Kas/Bank: Semua</option><option value="Bank BCA">Bank BCA</option><option value="Bank Mandiri">Bank Mandiri</option></select>
          <select value={filterDari} onChange={(e) => setFilterDari(e.target.value)} style={selectStyle}><option value="semua">Dari Kas/Bank: Semua</option><option value="Bank BCA">Bank BCA</option><option value="Bank Mandiri">Bank Mandiri</option></select>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 4, cursor: "pointer" }}><Filter size={12} /></button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <button onClick={() => setShowForm(!showForm)} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }}><Plus size={16} /></button>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}><RefreshCw size={14} /></button>
          <div style={{ flex: 1 }} />
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}><Printer size={14} /></button>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}><Settings size={14} /></button>
          <div style={{ position: "relative" }}><Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} /><input type="text" placeholder="Ketik dan [Enter" value={search} onChange={(e) => setSearch(e.target.value)} style={{ padding: "6px 10px 6px 30px", fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 6, width: 180, outline: "none" }} /></div>
          <span style={{ fontSize: 11, color: "#888" }}>{filtered.length}</span>
        </div>
      </div>

      {showForm && (
        <div style={{ background: "#f3f3f3", padding: "16px 20px", borderBottom: "1px solid #d8d8d8" }}>
          <div style={{ background: "#fff", borderRadius: 8, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", position: "relative" }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526", marginBottom: 16 }}>Data Baru</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Trans Date *</label>
                <input type="text" value={formData.tanggal} onChange={(e) => setFormData({...formData, tanggal: e.target.value})} style={{ ...inputStyle, maxWidth: 130 }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Number *</label>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div onClick={() => setFormData({...formData, nomorOtomatis: !formData.nomorOtomatis})} style={{ width: 36, height: 20, borderRadius: 10, cursor: "pointer", background: formData.nomorOtomatis ? "#0176d3" : "#ccc", position: "relative", transition: "background 0.2s", flexShrink: 0 }}><div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: formData.nomorOtomatis ? 18 : 2, transition: "left 0.2s" }} /></div>
                  <select value={formData.tipeNomor} onChange={(e) => setFormData({...formData, tipeNomor: e.target.value})} style={{ ...selectStyle, padding: "5px 28px 5px 8px" }}><option>Bank Transfer</option></select>
                </div>
              </div>
            </div>

            <div style={{ padding: "16px", border: "1px solid #e0e0e0", borderRadius: 6 }}>
              <h4 style={{ fontSize: 13, fontWeight: 600, color: "#001526", marginBottom: 14 }}>Transfer Uang</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <label style={labelStyle}>From Cash/Bank *</label>
                  <div style={{ position: "relative", flex: 1, maxWidth: 300 }}><Search size={12} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "#999" }} /><input type="text" value={formData.dariBank} onChange={(e) => setFormData({...formData, dariBank: e.target.value})} placeholder="Cari/Pilih..." style={{ ...inputStyle, paddingLeft: 26 }} /></div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <label style={labelStyle}>To Cash/Bank *</label>
                  <div style={{ position: "relative", flex: 1, maxWidth: 300 }}><Search size={12} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "#999" }} /><input type="text" value={formData.keBank} onChange={(e) => setFormData({...formData, keBank: e.target.value})} placeholder="Cari/Pilih..." style={{ ...inputStyle, paddingLeft: 26 }} /></div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <label style={labelStyle}>From Transfer Amount *</label>
                  <input type="number" value={formData.jumlah} onChange={(e) => setFormData({...formData, jumlah: Number(e.target.value)})} style={{ ...inputStyle, maxWidth: 200 }} />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
              <div style={{ border: "1px solid #d8d8d8", borderRadius: 4, padding: "8px 16px", minWidth: 150 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}><span style={{ color: "#444746" }}>Total:</span><span style={{ fontWeight: 700, fontFamily: "monospace" }}>Rp {formData.jumlah.toLocaleString("id-ID")}</span></div>
              </div>
            </div>
            <button onClick={handleSave} style={{ position: "absolute", right: 24, top: 20, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", background: "#0176d3", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }} title="Simpan"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg></button>
          </div>
        </div>
      )}

      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead><tr style={{ background: "#4a5568" }}>
            {[{l:"Nomor #",w:"12%"},{l:"Tanggal",w:"10%"},{l:"Bank (Keluar)",w:"16%"},{l:"Bank (Masuk)",w:"16%"},{l:"Keterangan",w:"22%"},{l:"Total",w:"14%",a:"right"}].map((c:any) => <th key={c.l} style={{ padding: "8px 12px", textAlign: c.a||"left", fontWeight: 600, color: "#fff", borderBottom: "1px solid #3a4150", width: c.w }}>{c.l}</th>)}
          </tr></thead>
          <tbody>
            {filtered.length === 0 ? <tr><td colSpan={6} style={{ padding: 60, textAlign: "center", color: "#888" }}>Belum ada data</td></tr> :
            filtered.map(item => (
              <tr key={item.id} style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.style.background = "#f8f9ff"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                <td style={{ padding: "8px 12px", fontFamily: "monospace", fontSize: 11, fontWeight: 500 }}>{item.nomor}</td>
                <td style={{ padding: "8px 12px", color: "#444746" }}>{item.tanggal}</td>
                <td style={{ padding: "8px 12px", color: "#c62828" }}>{item.bankKeluar}</td>
                <td style={{ padding: "8px 12px", color: "#2e7d32" }}>{item.bankMasuk}</td>
                <td style={{ padding: "8px 12px", color: "#444746" }}>{item.keterangan}</td>
                <td style={{ padding: "8px 12px", textAlign: "right", fontFamily: "monospace" }}>{formatIDR(item.jumlah)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
