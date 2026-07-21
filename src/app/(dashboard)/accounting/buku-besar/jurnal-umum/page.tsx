"use client"

import { Fragment, useState } from "react"
import { dummyJournalEntries, JournalEntry } from "@/lib/accounting-dummy-data"
import { JournalDetailPanel } from "@/components/accounting/journal-detail-panel"

/* ── Inline SVG icons ── */
const Icon = ({ children, size = 14 }: { children: React.ReactNode; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>{children}</svg>
)
const PlusIcon      = () => <Icon size={16}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Icon>
const RefreshIcon   = () => <Icon><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></Icon>
const DownloadIcon  = () => <Icon><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></Icon>
const SettingsIcon  = () => <Icon><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></Icon>
const SearchIcon    = () => <Icon size={13}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Icon>
const FilterIcon    = () => <Icon><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></Icon>
const SaveIcon      = () => <Icon size={16}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></Icon>

/* ── Shared styles ── */
const selectStyle: React.CSSProperties = {
  height: 32, padding: "0 28px 0 10px", fontSize: 13,
  border: "1px solid #d8d8d8", borderRadius: 6,
  background: "#fff", color: "#001526", cursor: "pointer",
  appearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center",
}
const inputStyle: React.CSSProperties = {
  height: 32, padding: "0 10px", fontSize: 13,
  border: "1px solid #d8d8d8", borderRadius: 6,
  outline: "none", width: "100%", boxSizing: "border-box",
}
const labelStyle: React.CSSProperties = { fontSize: 13, color: "#444746", minWidth: 120 }
const thStyle: React.CSSProperties = {
  padding: "8px 12px", textAlign: "left",
  fontSize: 11, fontWeight: 600, color: "#444746",
  textTransform: "uppercase", letterSpacing: "0.04em",
  background: "#fff", borderBottom: "1px solid #f0f0f0",
  whiteSpace: "nowrap", cursor: "pointer", userSelect: "none",
}
const btnIconBlue: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  width: 32, height: 32, background: "#0176d3", color: "#fff",
  border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer", flexShrink: 0,
}
const btnIconWhite: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  width: 32, height: 32, background: "#fff", color: "#0176d3",
  border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer", flexShrink: 0,
}

export default function JurnalUmumPage() {
  const [search, setSearch] = useState("")
  const [filterTanggal, setFilterTanggal] = useState("semua")
  const [filterTipe, setFilterTipe] = useState("semua")
  const [showForm, setShowForm] = useState(false)
  const [selected, setSelected] = useState<JournalEntry | null>(null)

  const [formData, setFormData] = useState({
    tanggal: "06/07/2026",
    nomorOtomatis: true,
    tipeNomor: "Journal Voucher",
    tipeTransaksi: "Jurnal Umum",
    keterangan: "",
  })

  const [detailRows, setDetailRows] = useState<{ akun: string; namaAkun: string; debit: number; kredit: number }[]>([])

  const filtered = dummyJournalEntries.filter((item) => {
    if (search && !item.nomor.toLowerCase().includes(search.toLowerCase())) return false
    if (filterTipe !== "semua" && item.tipeTransaksi !== filterTipe) return false
    return true
  })

  const totalDebit = detailRows.reduce((sum, r) => sum + r.debit, 0)
  const totalKredit = detailRows.reduce((sum, r) => sum + r.kredit, 0)

  const handleSave = () => {
    console.log("Save:", { ...formData, detail: detailRows })
    setShowForm(false)
  }

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
            <option value="Penyesuaian">Penyesuaian</option>
            <option value="Penutup">Penutup</option>
          </select>
          <button style={btnIconBlue}><FilterIcon /></button>
        </div>

        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <button onClick={() => { setShowForm(!showForm); setDetailRows([]) }} style={btnIconBlue}><PlusIcon /></button>
          <button style={btnIconWhite}><RefreshIcon /></button>
          <div style={{ flex: 1 }} />
          <button style={btnIconWhite}><DownloadIcon /></button>
          <button style={btnIconWhite}><SettingsIcon /></button>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999", display: "flex" }}><SearchIcon /></span>
            <input type="text" placeholder="Cari..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ ...inputStyle, paddingLeft: 30, width: 180, height: 32 }} />
          </div>
          <span style={{ fontSize: 11, color: "#888", minWidth: 20, textAlign: "right" }}>{filtered.length}</span>
        </div>
      </div>

      {/* Form (collapsible) */}
      {showForm && (
        <div style={{ background: "#f3f3f3", padding: "16px 20px", borderBottom: "1px solid #d8d8d8" }}>
          <div style={{ background: "#fff", borderRadius: 8, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", position: "relative" }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526", marginBottom: 16 }}>Data Baru</h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px 20px", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Date *</label>
                <input type="text" value={formData.tanggal} onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })} style={{ ...inputStyle, maxWidth: 130 }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Number *</label>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div onClick={() => setFormData({ ...formData, nomorOtomatis: !formData.nomorOtomatis })} style={{ width: 36, height: 20, borderRadius: 10, cursor: "pointer", background: formData.nomorOtomatis ? "#0176d3" : "#ccc", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
                    <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: formData.nomorOtomatis ? 18 : 2, transition: "left 0.2s" }} />
                  </div>
                  <select value={formData.tipeNomor} onChange={(e) => setFormData({ ...formData, tipeNomor: e.target.value })} style={selectStyle}>
                    <option>Journal Voucher</option>
                  </select>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Transaction Type</label>
                <input type="text" value={formData.tipeTransaksi} readOnly style={{ ...inputStyle, background: "#f5f5f5", color: "#666", cursor: "default" }} />
              </div>
            </div>

            <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
              <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "7px 14px", fontSize: 13, fontWeight: 600, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}>Ambil</button>
            </div>

            <div style={{ borderTop: "1px solid #eee", paddingTop: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ position: "relative", flex: 1, maxWidth: 250 }}>
                  <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999", display: "flex" }}><SearchIcon /></span>
                  <input type="text" placeholder="Cari/Pilih Akun Perkiraan..." style={{ ...inputStyle, paddingLeft: 28 }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#001526", marginLeft: 8 }}>Rincian Jurnal *</span>
              </div>

              <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 12 }}>
                <thead>
                  <tr>
                    <th style={{ ...thStyle, width: "40px" }}></th>
                    <th style={thStyle}>Account No</th>
                    <th style={thStyle}>Account Name</th>
                    <th style={{ ...thStyle, textAlign: "right" }}>Debit</th>
                    <th style={{ ...thStyle, textAlign: "right" }}>Kredit</th>
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
                      <tr key={i} style={{ borderBottom: "1px solid #f0f0f0", fontSize: 13, color: "#001526" }}>
                        <td style={{ padding: "6px 12px", color: "#999" }}>&#9776;</td>
                        <td style={{ padding: "6px 12px", fontFamily: "monospace" }}>{row.akun}</td>
                        <td style={{ padding: "6px 12px" }}>{row.namaAkun}</td>
                        <td style={{ padding: "6px 12px", textAlign: "right", fontFamily: "monospace" }}>{row.debit > 0 ? `Rp ${row.debit.toLocaleString("id-ID")}` : "-"}</td>
                        <td style={{ padding: "6px 12px", textAlign: "right", fontFamily: "monospace" }}>{row.kredit > 0 ? `Rp ${row.kredit.toLocaleString("id-ID")}` : "-"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{ border: "1px solid #d8d8d8", borderRadius: 6, padding: "8px 16px", display: "flex", flexDirection: "column", gap: 4, minWidth: 200 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                    <span style={{ color: "#444746" }}>Total Debit:</span>
                    <span style={{ fontWeight: 600, fontFamily: "monospace" }}>Rp {totalDebit.toLocaleString("id-ID")}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                    <span style={{ color: "#444746" }}>Total Credit:</span>
                    <span style={{ fontWeight: 600, fontFamily: "monospace" }}>Rp {totalKredit.toLocaleString("id-ID")}</span>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={handleSave} style={{ position: "absolute", right: 24, top: 20, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f0f0", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer", color: "#444746" }} title="Simpan">
              <SaveIcon />
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ ...thStyle, width: 36 }}></th>
              {[
                { label: "Nomor #", width: "14%" },
                { label: "No. Trans #", width: "14%" },
                { label: "Tanggal", width: "12%" },
                { label: "Keterangan", width: "40%" },
                { label: "Total", width: "14%", align: "right" as const },
              ].map((col) => (
                <th key={col.label} style={{ ...thStyle, textAlign: col.align || "left", width: col.width }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data</td></tr>
            ) : (
              filtered.map((item) => {
                const isOpen = selected?.id === item.id
                return (
                  <Fragment key={item.id}>
                    <tr
                      onClick={() => setSelected(isOpen ? null : item)}
                      style={{
                        borderBottom: isOpen ? "none" : "1px solid #f0f0f0", cursor: "pointer", fontSize: 13, color: "#001526",
                        background: isOpen ? "#e8f2fc" : "transparent",
                        transition: "background 0.15s ease",
                      }}
                      onMouseEnter={(e) => { if (!isOpen) e.currentTarget.style.background = "#f0f7ff" }}
                      onMouseLeave={(e) => { if (!isOpen) e.currentTarget.style.background = "transparent" }}
                    >
                      <td style={{ padding: "8px 0 8px 12px", width: 36 }}>
                        <span style={{
                          display: "inline-flex", alignItems: "center", justifyContent: "center",
                          width: 20, height: 20, borderRadius: 4, color: isOpen ? "#0176d3" : "#999",
                          background: isOpen ? "#dbeafe" : "transparent",
                          transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                          transition: "transform 0.2s ease, background 0.2s ease, color 0.2s ease",
                        }}>
                          <Icon size={13}><polyline points="9 18 15 12 9 6" /></Icon>
                        </span>
                      </td>
                      <td style={{ padding: "8px 12px", fontFamily: "monospace", fontWeight: 500 }}>{item.nomor}</td>
                      <td style={{ padding: "8px 12px", color: "#0176d3" }}>{item.noTrans}</td>
                      <td style={{ padding: "8px 12px", color: "#444746" }}>{item.tanggal}</td>
                      <td style={{ padding: "8px 12px", color: "#444746" }}>{item.keterangan}</td>
                      <td style={{ padding: "8px 12px", textAlign: "right", fontFamily: "monospace" }}>Rp {item.total.toLocaleString("id-ID")}</td>
                    </tr>

                    {/* Expandable Rincian Jurnal — inline right below the selected row */}
                    {isOpen && (
                      <tr style={{ background: "#f7fafd", borderBottom: "1px solid #e0e0e0" }}>
                        <td colSpan={6} style={{ padding: "14px 20px 18px 48px" }}>
                          <JournalDetailPanel sourceId={item.id} title={`Rincian Jurnal — ${item.nomor}`} />
                        </td>
                      </tr>
                    )}
                  </Fragment>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
