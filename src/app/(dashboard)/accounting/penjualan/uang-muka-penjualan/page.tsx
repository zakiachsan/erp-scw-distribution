"use client"

import { useState } from "react"
import { Plus, RefreshCw, Printer, Settings, Search, Filter, Download } from "lucide-react"

export default function UangMukaPenjualanPage() {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [filterStatus, setFilterStatus] = useState("semua")
  const [formData, setFormData] = useState({ pelanggan: "", tanggal: "06/07/2026", nomorOtomatis: true, tipeNomor: "Sales Invoice", downPayment: 0, poNo: "", pajak: "inclusive" })
  const filtered: any[] = []
  const handleSave = () => { setShowForm(false) }
  const selectStyle = { padding: "5px 24px 5px 8px", fontSize: 11, border: "1px solid #d8d8d8", borderRadius: 4, background: "#fff", color: "#001526", cursor: "pointer", appearance: "none" as const, backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'10\' height=\'6\'%3E%3Cpath d=\'M0 0l5 6 5-6z\' fill=\'%23666\'/%3E%3C/svg%3E")', backgroundRepeat: "no-repeat" as const, backgroundPosition: "right 6px center" }
  const inputStyle = { padding: "6px 8px", fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 4, outline: "none", width: "100%", boxSizing: "border-box" as const }
  const labelStyle = { fontSize: 12, color: "#444746", minWidth: 100 }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div><h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Uang Muka Penjualan</h1><p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Catat uang muka dari pelanggan</p></div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
          <select style={selectStyle}><option>Tanggal: Semua</option></select>
          <select style={selectStyle}><option>Pelanggan: Semua</option></select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={selectStyle}><option value="semua">Status: Semua</option><option>Draft</option><option>Approved</option></select>
          <select style={selectStyle}><option>Sudah dicetak: Semua</option></select>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 4, cursor: "pointer" }}><Filter size={12} /></button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <button onClick={() => setShowForm(!showForm)} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }}><Plus size={16} /></button>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}><RefreshCw size={14} /></button>
          <div style={{ flex: 1 }} />
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}><Download size={14} /></button>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}><Printer size={14} /></button>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}><Settings size={14} /></button>
          <div style={{ position: "relative" }}><Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} /><input type="text" placeholder="Ketik dan [Enter]" value={search} onChange={(e) => setSearch(e.target.value)} style={{ padding: "6px 10px 6px 30px", fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 6, width: 180, outline: "none" }} /></div>
          <span style={{ fontSize: 11, color: "#888" }}>{filtered.length}</span>
        </div>
      </div>

      {showForm && (
        <div style={{ background: "#f3f3f3", padding: "16px 20px", borderBottom: "1px solid #d8d8d8" }}>
          <div style={{ background: "#fff", borderRadius: 8, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", position: "relative" }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526", marginBottom: 16 }}>Data Baru</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><label style={labelStyle}>Customer *</label><div style={{ position: "relative", flex: 1 }}><Search size={12} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "#999" }} /><input type="text" value={formData.pelanggan} onChange={(e) => setFormData({...formData, pelanggan: e.target.value})} placeholder="Cari/Pilih Pelanggan..." style={{ ...inputStyle, paddingLeft: 26 }} /></div></div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><label style={labelStyle}>Invoice No *</label><div style={{ display: "flex", alignItems: "center", gap: 6 }}><div onClick={() => setFormData({...formData, nomorOtomatis: !formData.nomorOtomatis})} style={{ width: 36, height: 20, borderRadius: 10, cursor: "pointer", background: formData.nomorOtomatis ? "#0176d3" : "#ccc", position: "relative", transition: "background 0.2s", flexShrink: 0 }}><div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: formData.nomorOtomatis ? 18 : 2, transition: "left 0.2s" }} /></div><select value={formData.tipeNomor} onChange={(e) => setFormData({...formData, tipeNomor: e.target.value})} style={{ ...selectStyle }}><option>Sales Invoice</option></select></div></div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><label style={labelStyle}>Date *</label><input type="text" value={formData.tanggal} onChange={(e) => setFormData({...formData, tanggal: e.target.value})} style={{ ...inputStyle, maxWidth: 130 }} /></div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><button style={{ padding: "5px 14px", fontSize: 11, fontWeight: 600, background: "#f0f0f0", color: "#444746", border: "1px solid #d8d8d8", borderRadius: 4, cursor: "pointer" }}>Proses ▾</button></div>
            </div>

            <div style={{ border: "1px solid #e0e0e0", borderRadius: 6, padding: "12px 16px", marginTop: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <div style={{ width: 20, height: 20, background: "#0176d3", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="12" height="12" viewBox="0 0 24 24" fill="white"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg></div>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#0176d3" }}>Uang Muka</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}><label style={labelStyle}>Down Payment *</label><input type="number" value={formData.downPayment} onChange={(e) => setFormData({...formData, downPayment: Number(e.target.value)})} style={{ ...inputStyle, maxWidth: 150 }} /></div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}><label style={labelStyle}>PO No</label><input type="text" value={formData.poNo} onChange={(e) => setFormData({...formData, poNo: e.target.value})} style={inputStyle} /></div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}><label style={labelStyle}>Pajak</label><div style={{ display: "flex", gap: 12 }}><label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12 }}><input type="radio" name="pajak" checked={formData.pajak === "taxable"} onChange={() => setFormData({...formData, pajak: "taxable"})} /> Taxable</label><label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12 }}><input type="radio" name="pajak" checked={formData.pajak === "inclusive"} onChange={() => setFormData({...formData, pajak: "inclusive"})} /> Total Inclusive tax</label></div></div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
              <div style={{ border: "1px solid #d8d8d8", borderRadius: 4, padding: "8px 16px", minWidth: 200 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}><span style={{ color: "#444746" }}>Sub Total:</span><span style={{ fontWeight: 600 }}>0</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 700 }}><span>Total:</span><span>0</span></div>
              </div>
            </div>
            <button onClick={handleSave} style={{ position: "absolute", right: 24, top: 20, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", background: "#0176d3", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg></button>
          </div>
        </div>
      )}

      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead><tr style={{ background: "#4a5568" }}>
            {[{l:"",w:"30px"},{l:"Nomor #",w:"10%"},{l:"Tanggal",w:"9%"},{l:"Pelanggan",w:"18%"},{l:"Keterangan",w:"18%"},{l:"Status",w:"10%"},{l:"Tipe ID Wajib",w:"10%"},{l:"Umur (hr)",w:"8%"},{l:"Total",w:"12%",a:"right"}].map((c:any) => <th key={c.l||"x"} style={{ padding: "8px 10px", textAlign: c.a||"left", fontWeight: 600, color: "#fff", borderBottom: "1px solid #3a4150", width: c.w, fontSize: 11 }}>{c.l}</th>)}
          </tr></thead>
          <tbody><tr><td colSpan={9} style={{ padding: 60, textAlign: "center", color: "#888" }}>Belum ada data</td></tr></tbody>
        </table>
      </div>
    </div>
  )
}
