"use client"

import { useState } from "react"
import {
  Plus,
  RefreshCw,
  Download,
  Upload,
  Printer,
  Settings,
  Search,
  Filter,
} from "lucide-react"

interface Akun {
  kode: string
  nama: string
  tipeAkun: string
  saldo: number
  nonAktif: boolean
  isHeader: boolean
}

const dummyData: Akun[] = [
  { kode: "1101", nama: "Kas & Bank", tipeAkun: "Kas & Bank", saldo: 0, nonAktif: false, isHeader: true },
  { kode: "110101", nama: "Kas Kecil", tipeAkun: "Kas & Bank", saldo: 0, nonAktif: false, isHeader: false },
  { kode: "110102", nama: "Bank", tipeAkun: "Kas & Bank", saldo: 0, nonAktif: false, isHeader: false },
  { kode: "1102", nama: "Setara Kas", tipeAkun: "Kas & Bank", saldo: 0, nonAktif: false, isHeader: true },
  { kode: "110201", nama: "Deposito Bank", tipeAkun: "Kas & Bank", saldo: 0, nonAktif: false, isHeader: false },
  { kode: "1103", nama: "Receivable", tipeAkun: "Piutang Usaha", saldo: 0, nonAktif: false, isHeader: true },
  { kode: "110301", nama: "Account Receivable IDR", tipeAkun: "Piutang Usaha", saldo: 0, nonAktif: false, isHeader: false },
  { kode: "110302", nama: "Purchase Down Payment IDR", tipeAkun: "Piutang Usaha", saldo: 0, nonAktif: false, isHeader: false },
  { kode: "1104", nama: "Persediaan", tipeAkun: "Persediaan", saldo: 0, nonAktif: false, isHeader: true },
  { kode: "110401", nama: "Persediaan", tipeAkun: "Persediaan", saldo: 0, nonAktif: false, isHeader: false },
  { kode: "110402", nama: "Persediaan Terkirim", tipeAkun: "Persediaan", saldo: 0, nonAktif: false, isHeader: false },
  { kode: "110403", nama: "Persediaan Dalam Proses", tipeAkun: "Persediaan", saldo: 0, nonAktif: false, isHeader: false },
  { kode: "1105", nama: "Aset Lancar Lainnya", tipeAkun: "Aset Lancar Lainnya", saldo: 0, nonAktif: false, isHeader: true },
  { kode: "110501", nama: "Perlengkapan Kantor", tipeAkun: "Aset Lancar Lainnya", saldo: 0, nonAktif: false, isHeader: false },
  { kode: "110502", nama: "Sewa Gedung Dibayar Dimuka", tipeAkun: "Aset Lancar Lainnya", saldo: 0, nonAktif: false, isHeader: false },
  { kode: "2101", nama: "Utang Usaha", tipeAkun: "Utang Usaha", saldo: 0, nonAktif: false, isHeader: true },
  { kode: "210101", nama: "Account Payable IDR", tipeAkun: "Utang Usaha", saldo: 0, nonAktif: false, isHeader: false },
  { kode: "210102", nama: "Purchase Down Payment IDR", tipeAkun: "Utang Usaha", saldo: 0, nonAktif: false, isHeader: false },
  { kode: "3101", nama: "Modal Disetor", tipeAkun: "Modal", saldo: 0, nonAktif: false, isHeader: true },
  { kode: "3102", nama: "Laba Ditahan", tipeAkun: "Modal", saldo: 0, nonAktif: false, isHeader: true },
  { kode: "4101", nama: "Penjualan Produk", tipeAkun: "Penjualan", saldo: 0, nonAktif: false, isHeader: true },
  { kode: "4102", nama: "Pendapatan Jasa", tipeAkun: "Penjualan", saldo: 0, nonAktif: false, isHeader: true },
  { kode: "5101", nama: "Beban Gaji", tipeAkun: "Beban Gaji", saldo: 0, nonAktif: false, isHeader: true },
  { kode: "5102", nama: "Beban Sewa", tipeAkun: "Beban Sewa", saldo: 0, nonAktif: false, isHeader: true },
  { kode: "5103", nama: "Beban Listrik", tipeAkun: "Beban Utilitas", saldo: 0, nonAktif: false, isHeader: true },
  { kode: "5104", nama: "Beban ATK", tipeAkun: "Beban/perlengkapan", saldo: 0, nonAktif: false, isHeader: true },
  { kode: "5105", nama: "Beban Marketing", tipeAkun: "Beban Pemasaran", saldo: 0, nonAktif: false, isHeader: true },
  { kode: "6101", nama: "Pendapatan Bunga Bank", tipeAkun: "Pendapatan Lain-lain", saldo: 0, nonAktif: false, isHeader: true },
  { kode: "6102", nama: "Pendapatan Selisih Kurs", tipeAkun: "Pendapatan Lain-lain", saldo: 0, nonAktif: false, isHeader: true },
  { kode: "7101", nama: "Beban Bunga Bank", tipeAkun: "Beban Lain-lain", saldo: 0, nonAktif: false, isHeader: true },
  { kode: "7102", nama: "Beban Selisih Kurs", tipeAkun: "Beban Lain-lain", saldo: 0, nonAktif: false, isHeader: true },
  { kode: "8101", nama: "Beban Pajak Penghasilan", tipeAkun: "Beban Pajak", saldo: 0, nonAktif: false, isHeader: true },
]

type FormTab = "informasi" | "saldo" | "lainlain"

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

  const filtered = dummyData.filter((item) => {
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

  const labelStyle = { fontSize: 12, color: "#444746", minWidth: 130 }

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
            <option value="Piutang Usaha">Piutang Usaha</option>
            <option value="Persediaan">Persediaan</option>
            <option value="Aset Lancar Lainnya">Aset Lancar Lainnya</option>
            <option value="Utang Usaha">Utang Usaha</option>
            <option value="Modal">Modal</option>
            <option value="Penjualan">Penjualan</option>
            <option value="Beban Gaji">Beban Gaji</option>
            <option value="Beban Sewa">Beban Sewa</option>
          </select>
        </div>

        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }}>
            <Filter size={14} />
          </button>
          <button onClick={() => { setShowForm(!showForm); setFormTab("informasi") }} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }}>
            <Plus size={16} />
          </button>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }}>
            <RefreshCw size={14} />
          </button>
          <div style={{ flex: 1 }} />
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}><Download size={14} /></button>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}><Upload size={14} /></button>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}><Printer size={14} /></button>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}><Settings size={14} /></button>
          <div style={{ position: "relative" }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
            <input type="text" placeholder="Ketik dan [Enter" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && setSearch(search)} style={{ padding: "6px 10px 6px 30px", fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 6, width: 180, outline: "none" }} />
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
                    padding: "10px 20px", fontSize: 12, fontWeight: formTab === t.key ? 600 : 400,
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
                        style={{ ...selectStyle, flex: 1, padding: "6px 28px 6px 8px" }}
                      >
                        <option>Kas & Bank</option>
                        <option>Piutang Usaha</option>
                        <option>Persediaan</option>
                        <option>Aset Lancar Lainnya</option>
                        <option>Utang Usaha</option>
                        <option>Modal</option>
                        <option>Penjualan</option>
                        <option>Beban Gaji</option>
                        <option>Beban Sewa</option>
                        <option>Beban Utilitas</option>
                        <option>Pendapatan Lain-lain</option>
                        <option>Beban Lain-lain</option>
                      </select>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <input type="checkbox" checked={formData.subAkun} onChange={(e) => setFormData({ ...formData, subAkun: e.target.checked })} style={{ width: 16, height: 16 }} />
                      <label style={{ fontSize: 12, color: "#444746" }}>Sub Akun</label>
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
                        <span style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", fontSize: 12, color: "#999" }}>Rp</span>
                        <input
                          type="number"
                          value={formData.saldoAwal}
                          onChange={(e) => setFormData({ ...formData, saldoAwal: Number(e.target.value) })}
                          style={{ ...inputStyle, paddingLeft: 28, border: "1px solid #90caf9" }}
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
                      <label style={{ fontSize: 12, color: "#444746", display: "block", marginBottom: 6 }}>Catatan</label>
                      <textarea
                        value={formData.catatan}
                        onChange={(e) => setFormData({ ...formData, catatan: e.target.value })}
                        rows={4}
                        style={{ ...inputStyle, resize: "vertical", border: "1px solid #90caf9" }}
                      />
                    </div>
                    <div style={{ borderTop: "1px solid #eee", paddingTop: 12 }}>
                      <label style={{ fontSize: 12, fontWeight: 600, color: "#001526", display: "block", marginBottom: 8 }}>Akses Pengguna</label>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <input type="checkbox" checked={formData.semuaPengguna} onChange={(e) => setFormData({ ...formData, semuaPengguna: e.target.checked })} style={{ width: 16, height: 16 }} />
                        <label style={{ fontSize: 12, color: "#444746" }}>Semua Pengguna</label>
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
                background: "#f0f0f0", border: "1px solid #d8d8d8", borderRadius: 4,
                cursor: "pointer", color: "#444746",
              }}
              title="Simpan"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
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
                { label: "Kode Perkiraan", width: "18%" },
                { label: "Nama", width: "40%" },
                { label: "Tipe Akun", width: "22%" },
                { label: "Saldo", width: "14%", align: "right" as const },
              ].map((col) => (
                <th
                  key={col.label}
                  style={{
                    padding: "8px 12px", textAlign: col.align || "left",
                    fontWeight: 600, color: "#fff", borderBottom: "1px solid #3a4150",
                    whiteSpace: "nowrap", width: col.width,
                    cursor: "pointer", userSelect: "none",
                  }}
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
                    background: item.isHeader ? "#fafafa" : "transparent",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#f0f7ff"}
                  onMouseLeave={(e) => e.currentTarget.style.background = item.isHeader ? "#fafafa" : "transparent"}
                >
                  <td style={{
                    padding: "8px 12px",
                    fontFamily: "monospace", fontSize: 11,
                    fontWeight: item.isHeader ? 600 : 400,
                    color: "#001526",
                    paddingLeft: item.isHeader ? 12 : 28,
                  }}>
                    {item.kode}
                  </td>
                  <td style={{
                    padding: "8px 12px",
                    fontWeight: item.isHeader ? 600 : 400,
                    color: "#001526",
                  }}>
                    {item.nama}
                  </td>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>
                    {item.tipeAkun}
                  </td>
                  <td style={{
                    padding: "8px 12px",
                    textAlign: "right",
                    fontFamily: "monospace",
                    color: "#444746",
                  }}>
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
