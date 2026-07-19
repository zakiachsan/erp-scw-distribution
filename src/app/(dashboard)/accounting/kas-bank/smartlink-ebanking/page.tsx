"use client"

import { useState } from "react"
import { Plus, RefreshCw, Settings, Search } from "lucide-react"

// ── SLDS Shared Styles ──
const TH: React.CSSProperties = { fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", padding: "8px 12px", textAlign: "left", borderBottom: "1px solid #e0e0e0", whiteSpace: "nowrap" }
const TD: React.CSSProperties = { fontSize: 13, color: "#001526", padding: "8px 12px", borderBottom: "1px solid #f0f0f0" }
const BTN_ICON: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }
const BTN_ICON_OUTLINE: React.CSSProperties = { ...BTN_ICON, background: "#fff", color: "#0176d3", borderColor: "#d8d8d8" }
const INPUT: React.CSSProperties = { height: 32, padding: "0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none", boxSizing: "border-box" }
const SELECT: React.CSSProperties = { height: 32, padding: "0 24px 0 8px", fontSize: 11, border: "1px solid #d8d8d8", borderRadius: 6, background: "#fff", color: "#001526", cursor: "pointer", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center" }

interface SmartlinkEBanking { id: string; noRekening: string; relasiAkun: string; jenisInternetBanking: string }
const dummyData: SmartlinkEBanking[] = [
  { id: "1", noRekening: "1234567890", relasiAkun: "Bank BCA - Rekening Giro", jenisInternetBanking: "BCA KlikPay" },
  { id: "2", noRekening: "0987654321", relasiAkun: "Bank Mandiri", jenisInternetBanking: "Mandiri ClickPay" },
]

export default function SmartlinkEBankingPage() {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [filterJenis, setFilterJenis] = useState("semua")
  const [formData, setFormData] = useState({ jenisInternetBanking: "", noRekeningBank: "", relasiAkunBank: "" })

  const filtered = dummyData.filter(i => {
    if (search && !i.noRekening.includes(search) && !i.relasiAkun.toLowerCase().includes(search.toLowerCase())) return false
    if (filterJenis !== "semua" && i.jenisInternetBanking !== filterJenis) return false
    return true
  })
  const handleSave = () => { setShowForm(false) }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* ── Header ── */}
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>SmartLink e-Banking</h1>
        <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Integrasi e-banking dan autolink</p>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
          <select value={filterJenis} onChange={e => setFilterJenis(e.target.value)} style={SELECT}><option value="semua">Jenis Internet Banking: Semua</option><option value="BCA KlikPay">BCA KlikPay</option><option value="Mandiri ClickPay">Mandiri ClickPay</option><option value="BRI Internet Banking">BRI Internet Banking</option></select>
          <button style={BTN_ICON_OUTLINE}><Settings size={14} /></button>
          <div style={{ flex: 1 }} />
          <div style={{ position: "relative" }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
            <input style={{ ...INPUT, paddingLeft: 30, width: 180 }} placeholder="Cari smartlink..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <span style={{ fontSize: 11, color: "#888" }}>{filtered.length}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <button onClick={() => setShowForm(!showForm)} style={BTN_ICON}><Plus size={16} /></button>
          <button style={BTN_ICON_OUTLINE}><RefreshCw size={14} /></button>
        </div>
      </div>

      {/* ── Form ── */}
      {showForm && (
        <div style={{ background: "#f3f3f3", padding: "16px 20px", borderBottom: "1px solid #d8d8d8" }}>
          <div style={{ background: "#fff", borderRadius: 8, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", position: "relative", maxWidth: 500 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526", marginBottom: 16 }}>Internet Banking</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={{ fontSize: 13, color: "#444746", minWidth: 150 }}>Jenis Internet Banking *</label>
                <select value={formData.jenisInternetBanking} onChange={e => setFormData({...formData, jenisInternetBanking: e.target.value})} style={{ ...SELECT, flex: 1 }}><option value="">— Pilih Internet Banking —</option><option>BCA KlikPay</option><option>Mandiri ClickPay</option><option>BRI Internet Banking</option><option>BNI Internet Banking</option></select>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={{ fontSize: 13, color: "#444746", minWidth: 150 }}>No. Rekening Bank *</label>
                <input style={{ ...INPUT, flex: 1 }} value={formData.noRekeningBank} onChange={e => setFormData({...formData, noRekeningBank: e.target.value})} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={{ fontSize: 13, color: "#444746", minWidth: 150 }}>Relasi Akun Bank *</label>
                <div style={{ position: "relative", flex: 1 }}>
                  <Search size={12} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
                  <input style={{ ...INPUT, paddingLeft: 26, width: "100%" }} placeholder="Cari/Pilih Akun Perkiraan..." value={formData.relasiAkunBank} onChange={e => setFormData({...formData, relasiAkunBank: e.target.value})} />
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
            <th style={{ ...TH, width: "30%" }}>NO. REKENING BANK</th>
            <th style={{ ...TH, width: "35%" }}>RELASI AKUN BANK</th>
            <th style={{ ...TH, width: "30%" }}>JENIS INTERNET BANKING</th>
          </tr></thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={3} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data</td></tr>
            ) : filtered.map(item => (
              <tr key={item.id} style={{ cursor: "pointer" }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#f0f7ff"} onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}>
                <td style={{ ...TD, fontFamily: "monospace" }}>{item.noRekening}</td>
                <td style={TD}>{item.relasiAkun}</td>
                <td style={TD}>{item.jenisInternetBanking}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
