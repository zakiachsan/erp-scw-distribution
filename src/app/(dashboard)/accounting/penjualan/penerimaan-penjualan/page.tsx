"use client"

import { useState } from "react"
import { Plus, RefreshCw, Printer, Settings, Search, Filter } from "lucide-react"
import { dummyPayments, type Payment } from "@/lib/accounting-dummy-data"

function formatIDR(n: number) { return `Rp ${n.toLocaleString("id-ID")}` }

const thStyle: React.CSSProperties = { padding: "6px 8px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", borderBottom: "1px solid #e0e0e0" }
const thRight: React.CSSProperties = { ...thStyle, textAlign: "right" }
const tdStyle: React.CSSProperties = { padding: "6px 8px", fontSize: 13, color: "#001526" }
const rowStyle: React.CSSProperties = { borderBottom: "1px solid #f0f0f0" }
const btnIcon: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }
const btnIconOutline: React.CSSProperties = { ...btnIcon, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8" }
const inputStyle: React.CSSProperties = { height: 32, padding: "0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none", width: "100%", boxSizing: "border-box" }
const selectStyle: React.CSSProperties = { height: 32, padding: "0 24px 0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, background: "#fff", color: "#001526", cursor: "pointer", appearance: "none" as const, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat" as const, backgroundPosition: "right 10px center" }
const labelStyle: React.CSSProperties = { fontSize: 13, color: "#444746", minWidth: 100 }

export default function PenerimaanPenjualanPage() {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [filterMetode, setFilterMetode] = useState("semua")
  const [formData, setFormData] = useState({
    receiveFrom: "", bank: "", paymentAmount: 0,
    voucherOtomatis: true, tipeVoucher: "Bank", paymentDate: "06/07/2026",
  })

  const filtered = dummyPayments.filter((i: Payment) => {
    if (i.tipe !== "penerimaan") return false
    if (search && !i.keterangan.toLowerCase().includes(search.toLowerCase()) && !i.pelanggan?.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const handleSave = () => { setShowForm(false) }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Penerimaan Penjualan</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Catat penerimaan pembayaran dari pelanggan</p>
        </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12, flexWrap: "wrap" }}>
            <select style={selectStyle}><option>Tanggal: Semua</option></select>
            <select value={filterMetode} onChange={(e) => setFilterMetode(e.target.value)} style={selectStyle}>
            <option value="semua">Metode Bayar: Semua</option>
            <option>Cash</option>
            <option>Transfer Bank</option>
            <option>Cek/Giro</option>
            </select>
            <select style={selectStyle}><option>Bank: Semua</option></select>
            <select style={selectStyle}><option>Tanggal Cek: Semua</option></select>
            <select style={selectStyle}><option>Terima dari: Semua</option></select>
            <div style={{ flex: 1 }} />
            <div style={{ position: "relative" }}>
              <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
              <input type="text" placeholder="Cari penerimaan penjualan..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ height: 32, padding: "0 10px 0 30px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, width: 200, outline: "none" }} />
            </div>
            <span style={{ fontSize: 11, color: "#888", minWidth: 20, textAlign: "right" }}>{filtered.length}</span>
          </div>
      </div>

      {showForm && (
        <div style={{ background: "#f3f3f3", padding: "16px 20px", borderBottom: "1px solid #d8d8d8" }}>
          <div style={{ background: "#fff", borderRadius: 8, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", position: "relative" }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526", marginBottom: 16 }}>Data Baru</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px", marginBottom: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <label style={labelStyle}>Receive From *</label>
                  <div style={{ position: "relative", flex: 1 }}>
                    <Search size={12} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
                    <input type="text" value={formData.receiveFrom} onChange={(e) => setFormData({...formData, receiveFrom: e.target.value})} placeholder="Cari/Pilih Pelanggan..." style={{ ...inputStyle, paddingLeft: 28 }} />
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <label style={labelStyle}>Bank *</label>
                  <div style={{ position: "relative", flex: 1 }}>
                    <Search size={12} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
                    <input type="text" placeholder="Cari/Pilih..." style={{ ...inputStyle, paddingLeft: 28 }} />
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <label style={labelStyle}>Payment Amount</label>
                  <input type="number" value={formData.paymentAmount} onChange={(e) => setFormData({...formData, paymentAmount: Number(e.target.value)})} style={{ ...inputStyle, maxWidth: 150 }} />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <label style={labelStyle}>Voucher No *</label>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div onClick={() => setFormData({...formData, voucherOtomatis: !formData.voucherOtomatis})} style={{ width: 36, height: 20, borderRadius: 10, cursor: "pointer", background: formData.voucherOtomatis ? "#0176d3" : "#ccc", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
                      <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: formData.voucherOtomatis ? 18 : 2, transition: "left 0.2s" }} />
                    </div>
                    <select value={formData.tipeVoucher} onChange={(e) => setFormData({...formData, tipeVoucher: e.target.value})} style={selectStyle}><option>Bank</option><option>Cash</option></select>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <label style={labelStyle}>Payment Date *</label>
                  <input type="text" value={formData.paymentDate} onChange={(e) => setFormData({...formData, paymentDate: e.target.value})} style={{ ...inputStyle, maxWidth: 130 }} />
                </div>
              </div>
            </div>

            <div style={{ borderTop: "1px solid #eee", paddingTop: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ position: "relative", flex: 1, maxWidth: 250 }}>
                  <Search size={13} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
                  <input type="text" placeholder="Cari/Pilih..." style={{ ...inputStyle, paddingLeft: 28 }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#001526", marginLeft: 8 }}>Faktur *</span>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginBottom: 12 }}>
                <thead><tr>
                  {["Invoice No","Invoice Date","Total Invoice","Owing","Pay","Discount","Payment"].map(h => <th key={h} style={h === "Total Invoice" || h === "Owing" || h === "Pay" || h === "Discount" || h === "Payment" ? thRight : thStyle}>{h}</th>)}
                </tr></thead>
                <tbody><tr><td colSpan={7} style={{ padding: 30, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data</td></tr></tbody>
              </table>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 24, fontSize: 13, borderTop: "1px solid #eee", paddingTop: 8 }}>
                <span>Payment Amount: <b>0</b></span><span>Invoice Paid: <b>0</b></span>
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
            <th style={{ ...thStyle, width: 30 }}></th>
            <th style={thStyle}>Nomor #</th>
            <th style={thStyle}>Tanggal</th>
            <th style={thStyle}>No. Cek</th>
            <th style={thStyle}>Tanggal Cek</th>
            <th style={thStyle}>Pelanggan</th>
            <th style={thStyle}>Bank</th>
            <th style={thStyle}>Keterangan</th>
            <th style={thStyle}>Pakai Kredit</th>
            <th style={thRight}>Nilai Pembayaran</th>
          </tr></thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={10} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data</td></tr>
            ) : filtered.map((item: Payment) => (
              <tr key={item.id} style={rowStyle}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "#f0f7ff"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}
              >
                <td style={tdStyle}></td>
                <td style={{ ...tdStyle, fontFamily: "monospace", fontSize: 12, fontWeight: 500 }}>{item.nomor}</td>
                <td style={{ ...tdStyle, color: "#444746" }}>{item.tanggal}</td>
                <td style={tdStyle}>{item.noCek}</td>
                <td style={{ ...tdStyle, color: "#444746" }}>{item.tanggal}</td>
                <td style={{ ...tdStyle, fontWeight: 500 }}>{item.pelanggan || "-"}</td>
                <td style={tdStyle}>{item.kasBank}</td>
                <td style={{ ...tdStyle, color: "#444746" }}>{item.keterangan}</td>
                <td style={tdStyle}>-</td>
                <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace", color: "#2e844a" }}>{formatIDR(item.nilai)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
