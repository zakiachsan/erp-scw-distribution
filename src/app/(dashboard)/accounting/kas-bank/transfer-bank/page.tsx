"use client"

import { useState } from "react"
import { Plus, RefreshCw, Printer, Settings, Search, Filter } from "lucide-react"

// ── SLDS Shared Styles ──
const TH: React.CSSProperties = { fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", padding: "8px 12px", textAlign: "left", borderBottom: "1px solid #e0e0e0", whiteSpace: "nowrap" }
const TD: React.CSSProperties = { fontSize: 13, color: "#001526", padding: "8px 12px", borderBottom: "1px solid #f0f0f0" }
const BTN_ICON: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }
const BTN_ICON_OUTLINE: React.CSSProperties = { ...BTN_ICON, background: "#fff", color: "#0176d3", borderColor: "#d8d8d8" }
const INPUT: React.CSSProperties = { height: 32, padding: "0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none", boxSizing: "border-box" }
const SELECT: React.CSSProperties = { height: 32, padding: "0 24px 0 8px", fontSize: 11, border: "1px solid #d8d8d8", borderRadius: 6, background: "#fff", color: "#001526", cursor: "pointer", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center" }

interface Transfer { id: string; nomor: string; tanggal: string; bankKeluar: string; bankMasuk: string; keterangan: string; jumlah: number }
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
  const handleSave = () => { setShowForm(false) }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* ── Header ── */}
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Transfer Bank</h1>
        <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Kelola transfer antar rekening</p>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
          <select style={SELECT}><option>Tanggal: Semua</option></select>
          <select value={filterKe} onChange={e => setFilterKe(e.target.value)} style={SELECT}><option value="semua">Ke Kas/Bank: Semua</option><option value="Bank BCA">Bank BCA</option><option value="Bank Mandiri">Bank Mandiri</option></select>
          <select value={filterDari} onChange={e => setFilterDari(e.target.value)} style={SELECT}><option value="semua">Dari Kas/Bank: Semua</option><option value="Bank BCA">Bank BCA</option><option value="Bank Mandiri">Bank Mandiri</option></select>
          <button style={BTN_ICON}><Filter size={14} /></button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <button onClick={() => setShowForm(!showForm)} style={BTN_ICON}><Plus size={16} /></button>
          <button style={BTN_ICON_OUTLINE}><RefreshCw size={14} /></button>
          <div style={{ flex: 1 }} />
          <button style={BTN_ICON_OUTLINE}><Printer size={14} /></button>
          <button style={BTN_ICON_OUTLINE}><Settings size={14} /></button>
          <div style={{ position: "relative" }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
            <input style={{ ...INPUT, paddingLeft: 30, width: 180 }} placeholder="Ketik dan [Enter]" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <span style={{ fontSize: 11, color: "#888" }}>{filtered.length}</span>
        </div>
      </div>

      {/* ── Form ── */}
      {showForm && (
        <div style={{ background: "#f3f3f3", padding: "16px 20px", borderBottom: "1px solid #d8d8d8" }}>
          <div style={{ background: "#fff", borderRadius: 8, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", position: "relative" }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526", marginBottom: 16 }}>Data Baru</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={{ fontSize: 13, color: "#444746", minWidth: 130 }}>Trans Date *</label>
                <input style={{ ...INPUT, maxWidth: 130 }} value={formData.tanggal} onChange={e => setFormData({...formData, tanggal: e.target.value})} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={{ fontSize: 13, color: "#444746", minWidth: 130 }}>Number *</label>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div onClick={() => setFormData({...formData, nomorOtomatis: !formData.nomorOtomatis})} style={{ width: 36, height: 20, borderRadius: 10, cursor: "pointer", background: formData.nomorOtomatis ? "#0176d3" : "#ccc", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
                    <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: formData.nomorOtomatis ? 18 : 2, transition: "left 0.2s" }} />
                  </div>
                  <select value={formData.tipeNomor} onChange={e => setFormData({...formData, tipeNomor: e.target.value})} style={SELECT}><option>Bank Transfer</option></select>
                </div>
              </div>
            </div>

            <div style={{ padding: "16px", border: "1px solid #e0e0e0", borderRadius: 6 }}>
              <h4 style={{ fontSize: 13, fontWeight: 600, color: "#001526", marginBottom: 14 }}>Transfer Uang</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <label style={{ fontSize: 13, color: "#444746", minWidth: 130 }}>From Cash/Bank *</label>
                  <div style={{ position: "relative", flex: 1, maxWidth: 300 }}>
                    <Search size={12} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
                    <input style={{ ...INPUT, paddingLeft: 26, width: "100%" }} placeholder="Cari/Pilih..." value={formData.dariBank} onChange={e => setFormData({...formData, dariBank: e.target.value})} />
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <label style={{ fontSize: 13, color: "#444746", minWidth: 130 }}>To Cash/Bank *</label>
                  <div style={{ position: "relative", flex: 1, maxWidth: 300 }}>
                    <Search size={12} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
                    <input style={{ ...INPUT, paddingLeft: 26, width: "100%" }} placeholder="Cari/Pilih..." value={formData.keBank} onChange={e => setFormData({...formData, keBank: e.target.value})} />
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <label style={{ fontSize: 13, color: "#444746", minWidth: 130 }}>From Transfer Amount *</label>
                  <input type="number" style={{ ...INPUT, maxWidth: 200 }} value={formData.jumlah} onChange={e => setFormData({...formData, jumlah: Number(e.target.value)})} />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
              <div style={{ border: "1px solid #d8d8d8", borderRadius: 6, padding: "8px 16px", minWidth: 150 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: "#444746" }}>Total:</span>
                  <span style={{ fontWeight: 700, fontFamily: "monospace" }}>{formatIDR(formData.jumlah)}</span>
                </div>
              </div>
            </div>
            <button onClick={handleSave} style={{ position: "absolute", right: 24, top: 20, ...BTN_ICON }} title="Simpan">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
            </button>
          </div>
        </div>
      )}

      {/* ── Table ── */}
      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr>
            <th style={{ ...TH, width: "12%" }}>NOMOR #</th>
            <th style={{ ...TH, width: "10%" }}>TANGGAL</th>
            <th style={{ ...TH, width: "16%" }}>BANK (KELUAR)</th>
            <th style={{ ...TH, width: "16%" }}>BANK (MASUK)</th>
            <th style={{ ...TH, width: "22%" }}>KETERANGAN</th>
            <th style={{ ...TH, width: "14%", textAlign: "right" }}>TOTAL</th>
          </tr></thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data</td></tr>
            ) : filtered.map(item => (
              <tr key={item.id} style={{ cursor: "pointer" }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#f0f7ff"} onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}>
                <td style={{ ...TD, fontFamily: "monospace", fontWeight: 500 }}>{item.nomor}</td>
                <td style={{ ...TD, color: "#444746" }}>{item.tanggal}</td>
                <td style={{ ...TD, color: "#ea001e" }}>{item.bankKeluar}</td>
                <td style={{ ...TD, color: "#2e844a" }}>{item.bankMasuk}</td>
                <td style={{ ...TD, color: "#444746" }}>{item.keterangan}</td>
                <td style={{ ...TD, textAlign: "right", fontFamily: "monospace" }}>{formatIDR(item.jumlah)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
