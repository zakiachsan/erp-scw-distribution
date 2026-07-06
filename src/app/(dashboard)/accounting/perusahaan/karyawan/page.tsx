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

interface Karyawan {
  id: string
  nama: string
  posisi: string
  email: string
  handphone: string
  idKaryawan: string
  statusPekerja: string
  statusPph: string
  utang: number
}

const dummyData: Karyawan[] = []

type Tab = "karyawan" | "alamat" | "pajak" | "rekening"

export default function KaryawanPage() {
  const [search, setSearch] = useState("")
  const [filterPenjual, setFilterPenjual] = useState("semua")
  const [filterNonAktif, setFilterNonAktif] = useState("semua")
  const [filterStatus, setFilterStatus] = useState("semua")
  const [showForm, setShowForm] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>("karyawan")

  const [formData, setFormData] = useState({
    // Karyawan
    sapaan: "",
    namaLengkap: "",
    posisi: "",
    email: "",
    handphone: "",
    noTelpBisnis: "",
    noTelpRumah: "",
    noWhatsapp: "",
    website: "",
    kewarganegaraan: "Indonesia",
    idKaryawanOtomatis: true,
    tipeId: "Employee",
    tglMasuk: "06/07/2026",
    noKtp: "",
    penjual: false,
    catatan: "",
    // Alamat
    jalan: "",
    kota: "",
    kodePos: "",
    provinsi: "",
    negara: "",
    // Pajak
    dikenakanPph21: true,
    noNpwp: "",
    statusPekerja: "Pegawai Tetap",
    dikenakanPtkp: true,
    statusPtkp: "Tidak Kawin (Tidak ada tanggungan)",
    pphMulaiBulan: "Juli",
    pphMulaiTahun: "2026",
    penghasilanSebelumnya: "",
    pphSebelumnya: "",
    // Rekening
    namaBank: "",
    noRekening: "",
    atasNamaRekening: "",
  })

  const filtered = dummyData.filter((item) => {
    if (search && !item.nama.toLowerCase().includes(search.toLowerCase())) return false
    if (filterPenjual !== "semua") return false
    if (filterNonAktif === "aktif" && false) return false
    if (filterStatus !== "semua" && item.statusPekerja !== filterStatus) return false
    return true
  })

  const handleSave = () => {
    console.log("Save:", formData)
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

  const labelStyle = { fontSize: 12, color: "#444746", minWidth: 130 }

  const tabs: { key: Tab; label: string }[] = [
    { key: "karyawan", label: "Karyawan" },
    { key: "alamat", label: "Alamat" },
    { key: "pajak", label: "Pajak Penghasilan" },
    { key: "rekening", label: "Rekening Gaji" },
  ]

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>Karyawan</h1>
            <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Kelola data karyawan perusahaan</p>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
          <select value={filterPenjual} onChange={(e) => setFilterPenjual(e.target.value)} style={selectStyle}>
            <option value="semua">Penjual: Semua</option>
            <option value="ya">Penjual: Ya</option>
            <option value="tidak">Penjual: Tidak</option>
          </select>
          <select value={filterNonAktif} onChange={(e) => setFilterNonAktif(e.target.value)} style={selectStyle}>
            <option value="semua">Non Aktif: Semua</option>
            <option value="aktif">Non Aktif: Tidak</option>
            <option value="nonaktif">Non Aktif: Ya</option>
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={selectStyle}>
            <option value="semua">Status Pekerja: Semua</option>
            <option value="Pegawai Tetap">Pegawai Tetap</option>
            <option value="Kontrak">Kontrak</option>
            <option value="Freelance">Freelance</option>
          </select>
        </div>

        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <button onClick={() => setShowForm(!showForm)} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }}>
            <Plus size={16} />
          </button>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}>
            <RefreshCw size={14} />
          </button>
          <div style={{ flex: 1 }} />
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}><Download size={14} /></button>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}><Upload size={14} /></button>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}><Printer size={14} /></button>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}><Settings size={14} /></button>
          <div style={{ position: "relative" }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
            <input type="text" placeholder="Ketik dan [Enter]" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && setSearch(search)} style={{ padding: "6px 10px 6px 30px", fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 6, width: 180, outline: "none" }} />
          </div>
          <span style={{ fontSize: 11, color: "#888", minWidth: 20, textAlign: "right" }}>{filtered.length}</span>
        </div>
      </div>

      {/* Form (collapsible) */}
      {showForm && (
        <div style={{ background: "#f3f3f3", padding: "16px 20px", borderBottom: "1px solid #d8d8d8" }}>
          <div style={{ background: "#fff", borderRadius: 8, padding: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", overflow: "hidden" }}>
            {/* Sub-tabs */}
            <div style={{ display: "flex", borderBottom: "1px solid #d8d8d8" }}>
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  style={{
                    padding: "10px 20px", fontSize: 12, fontWeight: activeTab === t.key ? 600 : 400,
                    background: activeTab === t.key ? "#e91e63" : "#f5f5f5",
                    color: activeTab === t.key ? "#fff" : "#444746",
                    border: "none", borderBottom: activeTab === t.key ? "2px solid #e91e63" : "2px solid transparent",
                    cursor: "pointer", transition: "all 0.15s",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div style={{ padding: "20px 24px", position: "relative" }}>
              {/* Tab: Karyawan */}
              {activeTab === "karyawan" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 32px" }}>
                  {/* Left column */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={labelStyle}>Nama Lengkap</label>
                      <div style={{ display: "flex", gap: 4, flex: 1 }}>
                        <select value={formData.sapaan} onChange={(e) => setFormData({ ...formData, sapaan: e.target.value })} style={{ ...selectStyle, width: 70 }}>
                          <option value="">Sapaan</option>
                          <option>Tn.</option>
                          <option>Ny.</option>
                          <option>Nr.</option>
                        </select>
                        <input type="text" value={formData.namaLengkap} onChange={(e) => setFormData({ ...formData, namaLengkap: e.target.value })} style={{ ...inputStyle, flex: 1 }} />
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={labelStyle}>Posisi Jabatan</label>
                      <input type="text" value={formData.posisi} onChange={(e) => setFormData({ ...formData, posisi: e.target.value })} style={inputStyle} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={labelStyle}>Email</label>
                      <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={inputStyle} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={labelStyle}>Handphone</label>
                      <input type="text" value={formData.handphone} onChange={(e) => setFormData({ ...formData, handphone: e.target.value })} style={inputStyle} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={labelStyle}>No. Telp. Bisnis</label>
                      <input type="text" value={formData.noTelpBisnis} onChange={(e) => setFormData({ ...formData, noTelpBisnis: e.target.value })} style={inputStyle} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={labelStyle}>No. Telp. Rumah</label>
                      <input type="text" value={formData.noTelpRumah} onChange={(e) => setFormData({ ...formData, noTelpRumah: e.target.value })} style={inputStyle} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={labelStyle}>No. WhatsApp</label>
                      <input type="text" value={formData.noWhatsapp} onChange={(e) => setFormData({ ...formData, noWhatsapp: e.target.value })} style={inputStyle} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={labelStyle}>Website</label>
                      <input type="text" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} style={inputStyle} />
                    </div>
                  </div>

                  {/* Right column */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={labelStyle}>Kewarganegaraan</label>
                      <select value={formData.kewarganegaraan} onChange={(e) => setFormData({ ...formData, kewarganegaraan: e.target.value })} style={{ ...selectStyle, flex: 1 }}>
                        <option>Indonesia</option>
                        <option>Lainnya</option>
                      </select>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={labelStyle}>ID Karyawan *</label>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1 }}>
                        <div onClick={() => setFormData({ ...formData, idKaryawanOtomatis: !formData.idKaryawanOtomatis })} style={{ width: 36, height: 20, borderRadius: 10, cursor: "pointer", background: formData.idKaryawanOtomatis ? "#0176d3" : "#ccc", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
                          <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: formData.idKaryawanOtomatis ? 18 : 2, transition: "left 0.2s" }} />
                        </div>
                        <select value={formData.tipeId} onChange={(e) => setFormData({ ...formData, tipeId: e.target.value })} style={{ ...selectStyle, flex: 1 }}>
                          <option>Employee</option>
                        </select>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={labelStyle}>Tgl Masuk</label>
                      <input type="text" value={formData.tglMasuk} onChange={(e) => setFormData({ ...formData, tglMasuk: e.target.value })} style={{ ...inputStyle, maxWidth: 120 }} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={labelStyle}>No. KTP</label>
                      <input type="text" value={formData.noKtp} onChange={(e) => setFormData({ ...formData, noKtp: e.target.value })} style={inputStyle} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={labelStyle}>Penjual</label>
                      <input type="checkbox" checked={formData.penjual} onChange={(e) => setFormData({ ...formData, penjual: e.target.checked })} style={{ width: 16, height: 16 }} />
                      <span style={{ fontSize: 12, color: "#444746" }}>Ya</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <label style={{ ...labelStyle, marginTop: 6 }}>Catatan</label>
                      <textarea value={formData.catatan} onChange={(e) => setFormData({ ...formData, catatan: e.target.value })} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Alamat */}
              {activeTab === "alamat" && (
                <div style={{ maxWidth: 500 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#001526", display: "block", marginBottom: 12 }}>Alamat</label>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <textarea value={formData.jalan} onChange={(e) => setFormData({ ...formData, jalan: e.target.value })} placeholder="Jalan" rows={3} style={{ ...inputStyle, resize: "vertical" }} />
                    <div style={{ display: "flex", gap: 8 }}>
                      <input type="text" value={formData.kota} onChange={(e) => setFormData({ ...formData, kota: e.target.value })} placeholder="Kota" style={inputStyle} />
                      <input type="text" value={formData.kodePos} onChange={(e) => setFormData({ ...formData, kodePos: e.target.value })} placeholder="K.Pos" style={{ ...inputStyle, width: 100, flex: "none" }} />
                    </div>
                    <input type="text" value={formData.provinsi} onChange={(e) => setFormData({ ...formData, provinsi: e.target.value })} placeholder="Provinsi" style={inputStyle} />
                    <input type="text" value={formData.negara} onChange={(e) => setFormData({ ...formData, negara: e.target.value })} placeholder="Negara" style={inputStyle} />
                  </div>
                </div>
              )}

              {/* Tab: Pajak Penghasilan */}
              {activeTab === "pajak" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 500 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={labelStyle}>Dikenakan PPh 21</label>
                    <input type="checkbox" checked={formData.dikenakanPph21} onChange={(e) => setFormData({ ...formData, dikenakanPph21: e.target.checked })} style={{ width: 16, height: 16 }} />
                    <span style={{ fontSize: 12, color: "#444746" }}>Ya</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={labelStyle}>No. NPWP</label>
                    <input type="text" value={formData.noNpwp} onChange={(e) => setFormData({ ...formData, noNpwp: e.target.value })} style={inputStyle} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={labelStyle}>Status Pekerja</label>
                    <select value={formData.statusPekerja} onChange={(e) => setFormData({ ...formData, statusPekerja: e.target.value })} style={{ ...selectStyle, flex: 1 }}>
                      <option>Pegawai Tetap</option>
                      <option>Pegawai Tidak Tetap</option>
                      <option>Penerima Pensiun</option>
                    </select>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={labelStyle}>Dikenakan PTKP</label>
                    <input type="checkbox" checked={formData.dikenakanPtkp} onChange={(e) => setFormData({ ...formData, dikenakanPtkp: e.target.checked })} style={{ width: 16, height: 16 }} />
                    <span style={{ fontSize: 12, color: "#444746" }}>Ya</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={labelStyle}>Status PTKP</label>
                    <select value={formData.statusPtkp} onChange={(e) => setFormData({ ...formData, statusPtkp: e.target.value })} style={{ ...selectStyle, flex: 1 }}>
                      <option>Tidak Kawin (Tidak ada tanggungan)</option>
                      <option>Tidak Kawin (1 tanggungan)</option>
                      <option>Kawin (Tidak ada tanggungan)</option>
                      <option>Kawin (1 tanggungan)</option>
                      <option>Kawin (2 tanggungan)</option>
                      <option>Kawin (3 tanggungan)</option>
                    </select>
                  </div>

                  {/* Perhitungan PPh */}
                  <div style={{ borderTop: "1px solid #eee", paddingTop: 12, marginTop: 4 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "#001526", display: "block", marginBottom: 10 }}>Perhitungan PPh</label>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={labelStyle}>PPh mulai dihitung</label>
                      <select value={formData.pphMulaiBulan} onChange={(e) => setFormData({ ...formData, pphMulaiBulan: e.target.value })} style={{ ...selectStyle, width: 100 }}>
                        {["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"].map(b => <option key={b}>{b}</option>)}
                      </select>
                      <select value={formData.pphMulaiTahun} onChange={(e) => setFormData({ ...formData, pphMulaiTahun: e.target.value })} style={{ ...selectStyle, width: 80 }}>
                        <option>2026</option>
                        <option>2025</option>
                      </select>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                      <label style={labelStyle}>Penghasilan Sebelumnya</label>
                      <input type="text" value={formData.penghasilanSebelumnya} onChange={(e) => setFormData({ ...formData, penghasilanSebelumnya: e.target.value })} style={inputStyle} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                      <label style={labelStyle}>PPh Sebelumnya</label>
                      <input type="text" value={formData.pphSebelumnya} onChange={(e) => setFormData({ ...formData, pphSebelumnya: e.target.value })} style={inputStyle} />
                    </div>
                    <p style={{ fontSize: 11, color: "#d32f2f", marginTop: 10, lineHeight: 1.4 }}>
                      Penghasilan dan PPh sebelumnya HANYA PERLU diisi jika PPh sudah dihitung dan dibayarkan dari Januari, namun Pencatatan gaji di Accurate hanya diisi mulai bulan {formData.pphMulaiBulan} {formData.pphMulaiTahun}
                    </p>
                  </div>
                </div>
              )}

              {/* Tab: Rekening Gaji */}
              {activeTab === "rekening" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 400 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={labelStyle}>Nama Bank</label>
                    <div style={{ position: "relative", flex: 1 }}>
                      <Search size={12} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
                      <input type="text" value={formData.namaBank} onChange={(e) => setFormData({ ...formData, namaBank: e.target.value })} placeholder="Cari/Pilih..." style={{ ...inputStyle, paddingLeft: 26 }} />
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={labelStyle}>No Rekening</label>
                    <input type="text" value={formData.noRekening} onChange={(e) => setFormData({ ...formData, noRekening: e.target.value })} style={inputStyle} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={labelStyle}>Atas Nama Rekening</label>
                    <input type="text" value={formData.atasNamaRekening} onChange={(e) => setFormData({ ...formData, atasNamaRekening: e.target.value })} style={inputStyle} />
                  </div>
                </div>
              )}

              {/* Save button */}
              <button onClick={handleSave} style={{ position: "absolute", right: 24, top: 20, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f0f0", border: "1px solid #d8d8d8", borderRadius: 4, cursor: "pointer", color: "#444746" }} title="Simpan">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ background: "#4a5568" }}>
              {[
                { label: "", width: "30px" },
                { label: "Nama", width: "14%" },
                { label: "Posisi Jabatan", width: "12%" },
                { label: "Email", width: "14%" },
                { label: "Handphone", width: "11%" },
                { label: "ID Karyawan", width: "10%" },
                { label: "Status Pekerja", width: "10%" },
                { label: "Status PPh", width: "10%" },
                { label: "Utang", width: "10%", align: "right" as const },
              ].map((col) => (
                <th key={col.label || "no"} style={{ padding: "8px 12px", textAlign: col.align || "left", fontWeight: 600, color: "#fff", borderBottom: "1px solid #3a4150", whiteSpace: "nowrap", width: col.width }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={9} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data</td></tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.style.background = "#f8f9ff"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "8px 12px" }}></td>
                  <td style={{ padding: "8px 12px", fontWeight: 500, color: "#001526" }}>{item.nama}</td>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.posisi}</td>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.email}</td>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.handphone}</td>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.idKaryawan}</td>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.statusPekerja}</td>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.statusPph}</td>
                  <td style={{ padding: "8px 12px", textAlign: "right", fontFamily: "monospace", color: "#444746" }}>{item.utang.toLocaleString("id-ID")}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
