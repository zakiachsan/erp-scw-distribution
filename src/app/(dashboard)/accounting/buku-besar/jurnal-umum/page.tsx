"use client"

import { useState } from "react"
import {
  Plus,
  RefreshCw,
  Download,
  Settings,
  Search,
  Filter,
} from "lucide-react"

interface Jurnal {
  id: string
  nomor: string
  noTrans: string
  tanggal: string
  keterangan: string
  total: number
}

const dummyData: Jurnal[] = []

export default function JurnalUmumPage() {
  const [search, setSearch] = useState("")
  const [filterTanggal, setFilterTanggal] = useState("semua")
  const [filterTipe, setFilterTipe] = useState("semua")
  const [showForm, setShowForm] = useState(false)

  const [formData, setFormData] = useState({
    tanggal: "06/07/2026",
    nomorOtomatis: true,
    tipeNomor: "Journal Voucher",
    tipeTransaksi: "Jurnal Umum",
    keterangan: "",
  })

  // Detail jurnal
  const [detailRows, setDetailRows] = useState<{ akun: string; namaAkun: string; debit: number; kredit: number }[]>([])

  const filtered = dummyData.filter((item) => {
    if (search && !item.nomor.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const totalDebit = detailRows.reduce((sum, r) => sum + r.debit, 0)
  const totalKredit = detailRows.reduce((sum, r) => sum + r.kredit, 0)

  const handleSave = () => {
    console.log("Save:", { ...formData, detail: detailRows })
    setShowForm(false)
  }

  const selectStyle = {
    padding: "5px 24px 5px 8px", fontSize: 11, fontWeight: 500 as const,
    border: "1px solid #d8d8d8", borderRadius: 4,
    background: "#fff", color: "#001526", cursor: "pointer",
    appearance: "none" as const,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat" as const,
    backgroundPosition: "right 6px center",
  }

  const inputStyle = {
    padding: "6px 8px", fontSize: 12,
    border: "1px solid #d8d8d8", borderRadius: 4,
    outline: "none", width: "100%", boxSizing: "border-box" as const,
  }

  const labelStyle = { fontSize: 12, color: "#444746", minWidth: 120 }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>Jurnal Umum</h1>
            <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Pencatatan jurnal umum dan entri akuntansi</p>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
          <select value={filterTanggal} onChange={(e) => setFilterTanggal(e.target.value)} style={selectStyle}>
            <option value="semua">Tanggal: Semua</option>
          </select>
          <select value={filterTipe} onChange={(e) => setFilterTipe(e.target.value)} style={selectStyle}>
            <option value="semua">Tipe Transaksi: Semua</option>
            <option value="Jurnal Umum">Jurnal Umum</option>
            <option value="Jurnal Penyesuaian">Jurnal Penyesuaian</option>
            <option value="Jurnal Penutup">Jurnal Penutup</option>
          </select>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 4, cursor: "pointer" }}>
            <Filter size={12} />
          </button>
        </div>

        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <button onClick={() => { setShowForm(!showForm); setDetailRows([]) }} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }}>
            <Plus size={16} />
          </button>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}>
            <RefreshCw size={14} />
          </button>
          <div style={{ flex: 1 }} />
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}><Download size={14} /></button>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}><Settings size={14} /></button>
          <div style={{ position: "relative" }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
            <input type="text" placeholder="Ketik dan [Enter:..." value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && setSearch(search)} style={{ padding: "6px 10px 6px 30px", fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 6, width: 180, outline: "none" }} />
          </div>
          <span style={{ fontSize: 11, color: "#888", minWidth: 20, textAlign: "right" }}>{filtered.length}</span>
        </div>
      </div>

      {/* Form (collapsible) */}
      {showForm && (
        <div style={{ background: "#f3f3f3", padding: "16px 20px", borderBottom: "1px solid #d8d8d8" }}>
          <div style={{ background: "#fff", borderRadius: 8, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", position: "relative" }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526", marginBottom: 16 }}>Data Baru</h3>

            {/* Top fields */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px 20px", marginBottom: 16 }}>
              {/* Date */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Date *</label>
                <input type="text" value={formData.tanggal} onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })} style={{ ...inputStyle, maxWidth: 130 }} />
              </div>

              {/* Number */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Number *</label>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div onClick={() => setFormData({ ...formData, nomorOtomatis: !formData.nomorOtomatis })} style={{ width: 36, height: 20, borderRadius: 10, cursor: "pointer", background: formData.nomorOtomatis ? "#0176d3" : "#ccc", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
                    <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: formData.nomorOtomatis ? 18 : 2, transition: "left 0.2s" }} />
                  </div>
                  <select value={formData.tipeNomor} onChange={(e) => setFormData({ ...formData, tipeNomor: e.target.value })} style={{ ...selectStyle, padding: "5px 28px 5px 8px" }}>
                    <option>Journal Voucher</option>
                  </select>
                </div>
              </div>

              {/* Transaction Type */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Transaction Type</label>
                <input type="text" value={formData.tipeTransaksi} readOnly style={{ ...inputStyle, background: "#f5f5f5", color: "#666", cursor: "default" }} />
              </div>
            </div>

            {/* Ambil + Save buttons */}
            <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
              <button style={{ padding: "5px 14px", fontSize: 11, fontWeight: 600, background: "#f0f0f0", color: "#444746", border: "1px solid #d8d8d8", borderRadius: 4, cursor: "pointer" }}>Ambil</button>
            </div>

            {/* Detail jurnal */}
            <div style={{ borderTop: "1px solid #eee", paddingTop: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ position: "relative", flex: 1, maxWidth: 250 }}>
                  <Search size={13} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
                  <input type="text" placeholder="Cari/Pilih Akun Perkiraan..." style={{ padding: "6px 8px 6px 28px", fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 4, width: "100%", outline: "none", boxSizing: "border-box" }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#001526", marginLeft: 8 }}>Rincian Jurnal *</span>
              </div>

              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, marginBottom: 12 }}>
                <thead>
                  <tr style={{ background: "#4a5568" }}>
                    <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "#fff", borderBottom: "1px solid #3a4150", width: "40px" }}></th>
                    <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "#fff", borderBottom: "1px solid #3a4150" }}>Account No</th>
                    <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "#fff", borderBottom: "1px solid #3a4150" }}>Account Name</th>
                    <th style={{ padding: "8px 12px", textAlign: "right", fontWeight: 600, color: "#fff", borderBottom: "1px solid #3a4150" }}>Debit</th>
                    <th style={{ padding: "8px 12px", textAlign: "right", fontWeight: 600, color: "#fff", borderBottom: "1px solid #3a4150" }}>Kredit</th>
                  </tr>
                </thead>
                <tbody>
                  {detailRows.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ padding: 40, textAlign: "center", color: "#888", fontSize: 13 }}>
                        Belum ada data
                      </td>
                    </tr>
                  ) : (
                    detailRows.map((row, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #f0f0f0" }}>
                        <td style={{ padding: "6px 12px", color: "#999" }}>☰</td>
                        <td style={{ padding: "6px 12px", fontFamily: "monospace", fontSize: 11 }}>{row.akun}</td>
                        <td style={{ padding: "6px 12px" }}>{row.namaAkun}</td>
                        <td style={{ padding: "6px 12px", textAlign: "right", fontFamily: "monospace" }}>{row.debit > 0 ? `Rp ${row.debit.toLocaleString("id-ID")}` : "-"}</td>
                        <td style={{ padding: "6px 12px", textAlign: "right", fontFamily: "monospace" }}>{row.kredit > 0 ? `Rp ${row.kredit.toLocaleString("id-ID")}` : "-"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {/* Totals */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{ border: "1px solid #d8d8d8", borderRadius: 4, padding: "8px 16px", display: "flex", flexDirection: "column", gap: 4, minWidth: 200 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                    <span style={{ color: "#444746" }}>Total Debit:</span>
                    <span style={{ fontWeight: 600, fontFamily: "monospace" }}>Rp {totalDebit.toLocaleString("id-ID")}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                    <span style={{ color: "#444746" }}>Total Credit:</span>
                    <span style={{ fontWeight: 600, fontFamily: "monospace" }}>Rp {totalKredit.toLocaleString("id-ID")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Save */}
            <button onClick={handleSave} style={{ position: "absolute", right: 24, top: 20, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f0f0", border: "1px solid #d8d8d8", borderRadius: 4, cursor: "pointer", color: "#444746" }} title="Simpan">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ background: "#4a5568" }}>
              {[
                { label: "Nomor #", width: "14%" },
                { label: "No. Trans #", width: "14%" },
                { label: "Tanggal", width: "12%" },
                { label: "Keterangan", width: "40%" },
                { label: "Total", width: "14%", align: "right" as const },
              ].map((col) => (
                <th key={col.label} style={{ padding: "8px 12px", textAlign: col.align || "left", fontWeight: 600, color: "#fff", borderBottom: "1px solid #3a4150", whiteSpace: "nowrap", width: col.width, cursor: "pointer", userSelect: "none" }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={5} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data</td></tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.style.background = "#f8f9ff"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "8px 12px", fontFamily: "monospace", fontSize: 11, fontWeight: 500, color: "#001526" }}>{item.nomor}</td>
                  <td style={{ padding: "8px 12px", color: "#0176d3" }}>{item.noTrans}</td>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.tanggal}</td>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.keterangan}</td>
                  <td style={{ padding: "8px 12px", textAlign: "right", fontFamily: "monospace" }}>Rp {item.total.toLocaleString("id-ID")}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
