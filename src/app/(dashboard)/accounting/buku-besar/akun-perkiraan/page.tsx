"use client"

import { useState } from "react"
import { dummyAccounts, Account } from "@/lib/accounting-dummy-data"

type FormTab = "informasi" | "saldo" | "lainlain"

/* ── Inline SVG icons (SLDS-sized, no lucide-react) ── */
const Icon = ({ children, size = 14 }: { children: React.ReactNode; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>{children}</svg>
)
const PlusIcon           = () => <Icon size={16}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Icon>
const RefreshIcon        = () => <Icon><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></Icon>
const DownloadIcon       = () => <Icon><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></Icon>
const UploadIcon         = () => <Icon><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></Icon>
const PrinterIcon        = () => <Icon><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 12H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2"/><rect x="6" y="14" width="12" height="8"/></Icon>
const SettingsIcon       = () => <Icon><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></Icon>
const SearchIcon         = () => <Icon size={13}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Icon>
const FilterIcon         = () => <Icon><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></Icon>
const SaveIcon           = () => <Icon size={16}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></Icon>

/* ── Shared styles ── */
const selectStyle: React.CSSProperties = {
  height: 32, padding: "0 28px 0 10px", fontSize: 13,
  border: "1px solid #d8d8d8", borderRadius: 6,
  background: "#fff", color: "#001526", cursor: "pointer",
  appearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 8px center",
}
const inputStyle: React.CSSProperties = {
  height: 32, padding: "0 10px", fontSize: 13,
  border: "1px solid #d8d8d8", borderRadius: 6,
  outline: "none", width: "100%", boxSizing: "border-box",
}
const labelStyle: React.CSSProperties = { fontSize: 13, color: "#444746", minWidth: 130 }
const thStyle: React.CSSProperties = {
  padding: "8px 12px", textAlign: "left",
  fontSize: 11, fontWeight: 600, color: "#444746",
  textTransform: "uppercase", letterSpacing: "0.04em",
  background: "#fff", borderBottom: "1px solid #f0f0f0",
  whiteSpace: "nowrap", cursor: "pointer", userSelect: "none",
}
const btnPrimary: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  padding: "7px 14px", fontSize: 13, fontWeight: 600,
  background: "#0176d3", color: "#fff",
  border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer",
}
const btnIcon: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  width: 32, height: 32, cursor: "pointer", flexShrink: 0,
}
const btnIconBlue: React.CSSProperties = { ...btnIcon, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6 }
const btnIconWhite: React.CSSProperties = { ...btnIcon, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6 }

export default function AkunPerkiraanPage() {
  const [search, setSearch] = useState("")
  const [filterNonAktif, setFilterNonAktif] = useState("semua")
  const [filterTipe, setFilterTipe] = useState("semua")
  const [showForm, setShowForm] = useState(false)
  const [formTab, setFormTab] = useState<FormTab>("informasi")

  const [formData, setFormData] = useState({
    tipeAkun: "Kas & Bank",
    subAkun: false,
    kodePerkiraan: "",
    nama: "",
    saldoAwal: 0,
    perTanggal: "01/07/2026",
    catatan: "",
    semuaPengguna: true,
  })

  const filtered = dummyAccounts.filter((item) => {
    if (filterNonAktif === "aktif" && item.nonAktif) return false
    if (filterNonAktif === "nonaktif" && !item.nonAktif) return false
    if (filterTipe !== "semua" && item.tipeAkun !== filterTipe) return false
    if (search && !item.nama.toLowerCase().includes(search.toLowerCase()) && !item.kode.includes(search)) return false
    return true
  })

  const handleSave = () => {
    console.log("Save:", formData)
    setShowForm(false)
    setFormTab("informasi")
  }

  const formTabs: { key: FormTab; label: string }[] = [
    { key: "informasi", label: "Informasi Umum" },
    { key: "saldo", label: "Saldo" },
    { key: "lainlain", label: "Lain-lain" },
  ]

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>Akun Perkiraan</h1>
            <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Chart of Accounts</p>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
          <select value={filterNonAktif} onChange={(e) => setFilterNonAktif(e.target.value)} style={selectStyle}>
            <option value="semua">Non Aktif: Semua</option>
            <option value="aktif">Non Aktif: Tidak</option>
            <option value="nonaktif">Non Aktif: Ya</option>
          </select>
          <select value={filterTipe} onChange={(e) => setFilterTipe(e.target.value)} style={selectStyle}>
            <option value="semua">Tipe Akun: Semua</option>
            <option value="Kas & Bank">Kas & Bank</option>
            <option value="Piutang">Piutang</option>
            <option value="Persediaan">Persediaan</option>
            <option value="Aset Lancar Lainnya">Aset Lancar Lainnya</option>
            <option value="Aset Tetap">Aset Tetap</option>
            <option value="Kewajiban">Kewajiban</option>
            <option value="Modal">Modal</option>
            <option value="Pendapatan">Pendapatan</option>
            <option value="Beban">Beban</option>
            <option value="Beban Lain-lain">Beban Lain-lain</option>
          </select>
        </div>

        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <button style={btnIconBlue}><FilterIcon /></button>
          <button onClick={() => { setShowForm(!showForm); setFormTab("informasi") }} style={btnIconBlue}><PlusIcon /></button>
          <button style={btnIconWhite}><RefreshIcon /></button>
          <div style={{ flex: 1 }} />
          <button style={btnIconWhite}><DownloadIcon /></button>
          <button style={btnIconWhite}><UploadIcon /></button>
          <button style={btnIconWhite}><PrinterIcon /></button>
          <button style={btnIconWhite}><SettingsIcon /></button>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999", display: "flex" }}><SearchIcon /></span>
            <input type="text" placeholder="Ketik dan [Enter" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && setSearch(search)} style={{ ...inputStyle, paddingLeft: 30, width: 180, height: 32 }} />
          </div>
          <span style={{ fontSize: 11, color: "#888", minWidth: 20, textAlign: "right" }}>{filtered.length}</span>
        </div>
      </div>

      {/* Form (collapsible) */}
      {showForm && (
        <div style={{ background: "#f3f3f3", padding: "16px 20px", borderBottom: "1px solid #d8d8d8" }}>
          <div style={{ background: "#fff", borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", overflow: "hidden", position: "relative" }}>
            {/* Sub-tabs */}
            <div style={{ display: "flex", borderBottom: "1px solid #d8d8d8" }}>
              {formTabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setFormTab(t.key)}
                  style={{
                    padding: "10px 20px", fontSize: 13, fontWeight: formTab === t.key ? 600 : 400,
                    background: formTab === t.key ? "#fff" : "#f5f5f5",
                    color: formTab === t.key ? "#001526" : "#666",
                    border: "none", borderBottom: formTab === t.key ? "2px solid #e91e63" : "2px solid transparent",
                    cursor: "pointer",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div style={{ padding: "20px 24px" }}>
              {/* Tab: Informasi Umum */}
              {formTab === "informasi" && (
                <div style={{ maxWidth: 500, padding: "16px", border: "1px solid #e0e0e0", borderRadius: 6 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={labelStyle}>Tipe Akun</label>
                      <select
                        value={formData.tipeAkun}
                        onChange={(e) => setFormData({ ...formData, tipeAkun: e.target.value })}
                        style={{ ...selectStyle, flex: 1 }}
                      >
                        <option>Kas & Bank</option>
                        <option>Piutang</option>
                        <option>Persediaan</option>
                        <option>Aset Lancar Lainnya</option>
                        <option>Aset Tetap</option>
                        <option>Kewajiban</option>
                        <option>Modal</option>
                        <option>Pendapatan</option>
                        <option>Beban</option>
                        <option>Beban Lain-lain</option>
                      </select>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <input type="checkbox" checked={formData.subAkun} onChange={(e) => setFormData({ ...formData, subAkun: e.target.checked })} style={{ width: 16, height: 16 }} />
                      <label style={{ fontSize: 13, color: "#444746" }}>Sub Akun</label>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={labelStyle}>Kode Perkiraan *</label>
                      <input type="text" value={formData.kodePerkiraan} onChange={(e) => setFormData({ ...formData, kodePerkiraan: e.target.value })} style={{ ...inputStyle, maxWidth: 150 }} />
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <label style={labelStyle}>Nama *</label>
                        <input type="text" value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} style={inputStyle} />
                      </div>
                      <p style={{ fontSize: 11, color: "#999", fontStyle: "italic", marginTop: 4, marginLeft: 138 }}>Contoh: BCA a/c XXX-XXX, dll</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Saldo */}
              {formTab === "saldo" && (
                <div style={{ maxWidth: 500, padding: "16px", border: "1px solid #e0e0e0", borderLeft: "3px solid #0176d3", borderRadius: 6 }}>
                  <h4 style={{ fontSize: 13, fontWeight: 600, color: "#001526", marginBottom: 14 }}>Saldo Awal</h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={{ ...labelStyle, textAlign: "right" }}>Nilai</label>
                      <div style={{ position: "relative", flex: 1, maxWidth: 200 }}>
                        <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: "#999" }}>Rp</span>
                        <input
                          type="number"
                          value={formData.saldoAwal}
                          onChange={(e) => setFormData({ ...formData, saldoAwal: Number(e.target.value) })}
                          style={{ ...inputStyle, paddingLeft: 32, border: "1px solid #90caf9" }}
                        />
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={{ ...labelStyle, textAlign: "right" }}>per Tgl</label>
                      <input
                        type="text"
                        value={formData.perTanggal}
                        onChange={(e) => setFormData({ ...formData, perTanggal: e.target.value })}
                        style={{ ...inputStyle, maxWidth: 150 }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Lain-lain */}
              {formTab === "lainlain" && (
                <div style={{ maxWidth: 500, padding: "16px", border: "1px solid #e0e0e0", borderRadius: 6 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <div>
                      <label style={{ fontSize: 13, color: "#444746", display: "block", marginBottom: 6 }}>Catatan</label>
                      <textarea
                        value={formData.catatan}
                        onChange={(e) => setFormData({ ...formData, catatan: e.target.value })}
                        rows={4}
                        style={{ ...inputStyle, resize: "vertical", border: "1px solid #90caf9", height: "auto", padding: "8px 10px" }}
                      />
                    </div>
                    <div style={{ borderTop: "1px solid #eee", paddingTop: 12 }}>
                      <label style={{ fontSize: 13, fontWeight: 600, color: "#001526", display: "block", marginBottom: 8 }}>Akses Pengguna</label>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <input type="checkbox" checked={formData.semuaPengguna} onChange={(e) => setFormData({ ...formData, semuaPengguna: e.target.checked })} style={{ width: 16, height: 16 }} />
                        <label style={{ fontSize: 13, color: "#444746" }}>Semua Pengguna</label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Save button */}
            <button
              onClick={handleSave}
              style={{
                position: "absolute", right: 16, top: 50,
                width: 36, height: 36,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "#f0f0f0", border: "1px solid #d8d8d8", borderRadius: 6,
                cursor: "pointer", color: "#444746",
              }}
              title="Simpan"
            >
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
              {[
                { label: "Kode Perkiraan", width: "18%" },
                { label: "Nama", width: "40%" },
                { label: "Tipe Akun", width: "22%" },
                { label: "Saldo", width: "14%", align: "right" as const },
              ].map((col) => (
                <th
                  key={col.label}
                  style={{ ...thStyle, textAlign: col.align || "left", width: col.width }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>
                  Belum ada data
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr
                  key={item.kode}
                  style={{
                    borderBottom: "1px solid #f0f0f0",
                    cursor: "pointer",
                    fontSize: 13, color: "#001526",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f7ff")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "8px 12px", fontFamily: "monospace", fontSize: 13, color: "#001526" }}>
                    {item.kode}
                  </td>
                  <td style={{ padding: "8px 12px", fontWeight: 500, color: "#001526" }}>
                    {item.nama}
                  </td>
                  <td style={{ padding: "8px 12px", color: "#444746", fontSize: 13 }}>
                    {item.tipeAkun}
                  </td>
                  <td style={{ padding: "8px 12px", textAlign: "right", fontFamily: "monospace", fontSize: 13, color: "#444746" }}>
                    {item.saldo.toLocaleString("id-ID")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
