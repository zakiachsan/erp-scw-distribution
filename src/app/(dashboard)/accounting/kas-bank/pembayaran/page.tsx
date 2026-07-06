"use client"

import { useState } from "react"
import { Plus, RefreshCw, Printer, Settings, Search, Filter, Download } from "lucide-react"

interface Pembayaran {
  id: string; nomor: string; tanggal: string; kasBank: string; noCek: string; keterangan: string; nilai: number
}

const dummyData: Pembayaran[] = [
  { id: "1", nomor: "PAY-2026-001", tanggal: "2026-07-01", kasBank: "Bank BCA", noCek: "-", keterangan: "Pembayaran ChemPro Asia - Bahan baku coating", nilai: 28500000 },
  { id: "2", nomor: "PAY-2026-002", tanggal: "2026-07-03", kasBank: "Bank Mandiri", noCek: "G-001234", keterangan: "Giro ke PT Maju Jaya", nilai: 15000000 },
  { id: "3", nomor: "PAY-2026-003", tanggal: "2026-07-05", kasBank: "Kas", noCek: "-", keterangan: "Pembayaran listrik bulan Juni", nilai: 3500000 },
]

function formatIDR(n: number) { return `Rp ${n.toLocaleString("id-ID")}` }

export default function PembayaranPage() {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [filterTanggal, setFilterTanggal] = useState("semua")
  const [filterKasBank, setFilterKasBank] = useState("semua")

  const [formData, setFormData] = useState({
    cashBank: "", voucherOtomatis: true, tipeVoucher: "Bank", tanggal: "06/07/2026",
  })

  const filtered = dummyData.filter(i => {
    if (search && !i.keterangan.toLowerCase().includes(search.toLowerCase()) && !i.nomor.toLowerCase().includes(search.toLowerCase())) return false
    if (filterKasBank !== "semua" && i.kasBank !== filterKasBank) return false
    return true
  })

  const handleSave = () => { console.log("Save:", formData); setShowForm(false) }

  const selectStyle = { padding: "5px 24px 5px 8px", fontSize: 11, border: "1px solid #d8d8d8", borderRadius: 4, background: "#fff", color: "#001526", cursor: "pointer", appearance: "none" as const,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat" as const, backgroundPosition: "right 6px center" }
  const inputStyle = { padding: "6px 8px", fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 4, outline: "none", width: "100%", boxSizing: "border-box" as const }
  const labelStyle = { fontSize: 12, color: "#444746", minWidth: 100 }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div><h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Pembayaran</h1><p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Catat dan kelola pembayaran keluar</p></div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
          <select value={filterTanggal} onChange={(e) => setFilterTanggal(e.target.value)} style={selectStyle}><option value="semua">Tanggal: Semua</option></select>
          <select value={filterKasBank} onChange={(e) => setFilterKasBank(e.target.value)} style={selectStyle}><option value="semua">Kas/Bank: Semua</option><option value="Bank BCA">Bank BCA</option><option value="Bank Mandiri">Bank Mandiri</option><option value="Kas">Kas</option></select>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 4, cursor: "pointer" }}><Filter size={12} /></button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <button onClick={() => setShowForm(!showForm)} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }}><Plus size={16} /></button>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}><RefreshCw size={14} /></button>
          <div style={{ flex: 1 }} />
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}><Download size={14} /></button>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}><Printer size={14} /></button>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}><Settings size={14} /></button>
          <div style={{ position: "relative" }}><Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} /><input type="text" placeholder="Ketik dan [Enter..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ padding: "6px 10px 6px 30px", fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 6, width: 180, outline: "none" }} /></div>
          <span style={{ fontSize: 11, color: "#888" }}>{filtered.length}</span>
        </div>
      </div>

      {showForm && (
        <div style={{ background: "#f3f3f3", padding: "16px 20px", borderBottom: "1px solid #d8d8d8" }}>
          <div style={{ background: "#fff", borderRadius: 8, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", position: "relative" }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526", marginBottom: 16 }}>Data Baru</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Cash/Bank *</label>
                <div style={{ position: "relative", flex: 1 }}><Search size={12} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "#999" }} /><input type="text" value={formData.cashBank} onChange={(e) => setFormData({...formData, cashBank: e.target.value})} placeholder="Cari/Pilih..." style={{ ...inputStyle, paddingLeft: 26 }} /></div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Voucher Type</label>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div onClick={() => setFormData({...formData, voucherOtomatis: !formData.voucherOtomatis})} style={{ width: 36, height: 20, borderRadius: 10, cursor: "pointer", background: formData.voucherOtomatis ? "#0176d3" : "#ccc", position: "relative", transition: "background 0.2s", flexShrink: 0 }}><div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: formData.voucherOtomatis ? 18 : 2, transition: "left 0.2s" }} /></div>
                  <select value={formData.tipeVoucher} onChange={(e) => setFormData({...formData, tipeVoucher: e.target.value})} style={{ ...selectStyle, padding: "5px 28px 5px 8px" }}><option>Bank</option><option>Cash</option></select>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Date *</label>
                <input type="text" value={formData.tanggal} onChange={(e) => setFormData({...formData, tanggal: e.target.value})} style={{ ...inputStyle, maxWidth: 130 }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button style={{ padding: "5px 14px", fontSize: 11, fontWeight: 600, background: "#f0f0f0", color: "#444746", border: "1px solid #d8d8d8", borderRadius: 4, cursor: "pointer" }}>Ambil ▾</button>
              </div>
            </div>

            <div style={{ borderTop: "1px solid #eee", paddingTop: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ position: "relative", flex: 1, maxWidth: 250 }}><Search size={13} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "#999" }} /><input type="text" placeholder="Cari/Pilih Akun Perkiraan..." style={{ padding: "6px 8px 6px 28px", fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 4, width: "100%", outline: "none", boxSizing: "border-box" }} /></div>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#001526", marginLeft: 8 }}>Rincian Pembayaran *</span>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, marginBottom: 12 }}>
                <thead><tr style={{ background: "#4a5568" }}>
                  <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "#fff", borderBottom: "1px solid #3a4150", width: "40px" }}></th>
                  <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "#fff", borderBottom: "1px solid #3a4150" }}>Account</th>
                  <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "#fff", borderBottom: "1px solid #3a4150" }}>Account Name</th>
                  <th style={{ padding: "8px 12px", textAlign: "right", fontWeight: 600, color: "#fff", borderBottom: "1px solid #3a4150" }}>Amount</th>
                </tr></thead>
                <tbody><tr><td colSpan={4} style={{ padding: 40, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data</td></tr></tbody>
              </table>
              <div style={{ display: "flex", justifyContent: "flex-end", fontSize: 12, fontWeight: 600, borderTop: "1px solid #eee", paddingTop: 8 }}>
                <span>Amount: <span style={{ fontWeight: 700 }}>0</span></span>
              </div>
            </div>
            <button onClick={handleSave} style={{ position: "absolute", right: 24, top: 20, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", background: "#0176d3", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }} title="Simpan"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg></button>
          </div>
        </div>
      )}

      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead><tr style={{ background: "#4a5568" }}>
            {[{l:"",w:"30px"},{l:"Nomor #",w:"12%"},{l:"Tanggal",w:"10%"},{l:"Kas/Bank",w:"14%"},{l:"No Cek #",w:"10%"},{l:"Keterangan",w:"28%"},{l:"Nilai",w:"14%",a:"right"}].map((c:any) => <th key={c.l||"x"} style={{ padding: "8px 12px", textAlign: c.a||"left", fontWeight: 600, color: "#fff", borderBottom: "1px solid #3a4150", width: c.w }}>{c.l}</th>)}
          </tr></thead>
          <tbody>
            {filtered.length === 0 ? <tr><td colSpan={7} style={{ padding: 60, textAlign: "center", color: "#888" }}>Belum ada data</td></tr> :
            filtered.map(item => (
              <tr key={item.id} style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.style.background = "#f8f9ff"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                <td style={{ padding: "8px 12px" }}></td>
                <td style={{ padding: "8px 12px", fontFamily: "monospace", fontSize: 11, fontWeight: 500 }}>{item.nomor}</td>
                <td style={{ padding: "8px 12px", color: "#444746" }}>{item.tanggal}</td>
                <td style={{ padding: "8px 12px" }}>{item.kasBank}</td>
                <td style={{ padding: "8px 12px", color: "#444746" }}>{item.noCek}</td>
                <td style={{ padding: "8px 12px", color: "#444746" }}>{item.keterangan}</td>
                <td style={{ padding: "8px 12px", textAlign: "right", fontFamily: "monospace", color: "#c62828" }}>{formatIDR(item.nilai)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
