"use client"

import { useState } from "react"
import {
  Plus, RefreshCw, Download, Upload, Printer, Settings, Search,
} from "lucide-react"
import { dummyEmployees } from "@/lib/accounting-dummy-data"

type Tab = "karyawan" | "alamat" | "pajak" | "rekening"

export default function KaryawanPage() {
  const [search, setSearch] = useState("")
  const [filterPenjual, setFilterPenjual] = useState("semua")
  const [filterNonAktif, setFilterNonAktif] = useState("semua")
  const [filterStatus, setFilterStatus] = useState("semua")
  const [showForm, setShowForm] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>("karyawan")

  const [formData, setFormData] = useState({
    sapaan: "", namaLengkap: "", posisi: "", email: "", handphone: "",
    noTelpBisnis: "", noTelpRumah: "", noWhatsapp: "", website: "",
    kewarganegaraan: "Indonesia", idKaryawanOtomatis: true, tipeId: "Employee",
    tglMasuk: "06/07/2026", noKtp: "", penjual: false, catatan: "",
    jalan: "", kota: "", kodePos: "", provinsi: "", negara: "",
    dikenakanPph21: true, noNpwp: "", statusPekerja: "Pegawai Tetap",
    dikenakanPtkp: true, statusPtkp: "Tidak Kawin (Tidak ada tanggungan)",
    pphMulaiBulan: "Juli", pphMulaiTahun: "2026", penghasilanSebelumnya: "", pphSebelumnya: "",
    namaBank: "", noRekening: "", atasNamaRekening: "",
  })

  const filtered = dummyEmployees.filter((item) => {
    if (search && !item.nama.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const handleSave = () => { console.log("Save:", formData); setShowForm(false) }

  const bulanNames = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"]

  const thStyle: React.CSSProperties = { fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", padding: "8px 12px", textAlign: "left", background: "#fff" }
  const tdStyle: React.CSSProperties = { padding: "8px 12px", fontSize: 13, color: "#001526" }
  const btnStyle: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", fontSize: 13, fontWeight: 600, background: "#0176d3", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }
  const inputStyle: React.CSSProperties = { height: 32, padding: "0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none" }
  const iconBtnStyle: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "transparent", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer", color: "#0176d3" }
  const selectStyle: React.CSSProperties = { height: 32, padding: "0 28px 0 10px", fontSize: 12, fontWeight: 500, border: "1px solid #d8d8d8", borderRadius: 6, background: "#fff", color: "#001526", cursor: "pointer", outline: "none", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center" }

  const tabs: { key: Tab; label: string }[] = [
    { key: "karyawan", label: "Karyawan" },
    { key: "alamat", label: "Alamat" },
    { key: "pajak", label: "Pajak Penghasilan" },
    { key: "rekening", label: "Rekening Gaji" },
  ]

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", margin: 0 }}>Karyawan</h1>
            <p style={{ fontSize: 13, color: "#444746", marginTop: 2, margin: 0 }}>Kelola data karyawan perusahaan</p>
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
          <button style={btnStyle} onClick={() => setShowForm(!showForm)}><Plus size={14} /></button>
          <button style={iconBtnStyle}><RefreshCw size={14} /></button>
          <div style={{ flex: 1 }} />
          <button style={iconBtnStyle}><Download size={14} /></button>
          <button style={iconBtnStyle}><Upload size={14} /></button>
          <button style={iconBtnStyle}><Printer size={14} /></button>
          <button style={iconBtnStyle}><Settings size={14} /></button>
          <div style={{ position: "relative" }}>
            <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#444746" }} />
            <input placeholder="Cari..." value={search} onChange={(e) => setSearch(e.target.value)}
              style={{ ...inputStyle, paddingLeft: 30, paddingRight: 10, width: 180 }} />
          </div>
          <span style={{ fontSize: 12, color: "#444746", minWidth: 20, textAlign: "right" }}>{filtered.length}</span>
        </div>
      </div>

      {showForm && (
        <div style={{ background: "#f8f9fa", padding: "16px 20px", borderBottom: "1px solid #ecebea" }}>
          <div style={{ border: "1px solid #ddd", borderRadius: 8, background: "#fff", overflow: "hidden" }}>
            <div style={{ display: "flex", borderBottom: "1px solid #ecebea" }}>
              {tabs.map((t) => (
                <button key={t.key} onClick={() => setActiveTab(t.key)}
                  style={{
                    padding: "10px 20px", fontSize: 12, fontWeight: 500, cursor: "pointer",
                    border: "none", borderBottom: activeTab === t.key ? "2px solid #0176d3" : "2px solid transparent",
                    background: activeTab === t.key ? "#fff" : "#f3f3f3",
                    color: activeTab === t.key ? "#0176d3" : "#444746",
                    transition: "all 100ms",
                  }}>
                  {t.label}
                </button>
              ))}
            </div>

            <div style={{ padding: 20, position: "relative" }}>
              {activeTab === "karyawan" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 32px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={{ fontSize: 12, color: "#444746", minWidth: 130 }}>Nama Lengkap</label>
                      <div style={{ display: "flex", gap: 4, flex: 1 }}>
                        <select value={formData.sapaan} onChange={(e) => setFormData({ ...formData, sapaan: e.target.value })}
                          style={{ ...selectStyle, width: 70 }}>
                          <option value="">Sapaan</option><option>Tn.</option><option>Ny.</option><option>Nr.</option>
                        </select>
                        <input value={formData.namaLengkap} onChange={(e) => setFormData({ ...formData, namaLengkap: e.target.value })}
                          style={{ ...inputStyle, flex: 1, fontSize: 12 }} />
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={{ fontSize: 12, color: "#444746", minWidth: 130 }}>Posisi Jabatan</label>
                      <input value={formData.posisi} onChange={(e) => setFormData({ ...formData, posisi: e.target.value })}
                        style={{ ...inputStyle, fontSize: 12 }} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={{ fontSize: 12, color: "#444746", minWidth: 130 }}>Email</label>
                      <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{ ...inputStyle, fontSize: 12 }} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={{ fontSize: 12, color: "#444746", minWidth: 130 }}>Handphone</label>
                      <input value={formData.handphone} onChange={(e) => setFormData({ ...formData, handphone: e.target.value })}
                        style={{ ...inputStyle, fontSize: 12 }} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={{ fontSize: 12, color: "#444746", minWidth: 130 }}>No. Telp. Bisnis</label>
                      <input value={formData.noTelpBisnis} onChange={(e) => setFormData({ ...formData, noTelpBisnis: e.target.value })}
                        style={{ ...inputStyle, fontSize: 12 }} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={{ fontSize: 12, color: "#444746", minWidth: 130 }}>No. Telp. Rumah</label>
                      <input value={formData.noTelpRumah} onChange={(e) => setFormData({ ...formData, noTelpRumah: e.target.value })}
                        style={{ ...inputStyle, fontSize: 12 }} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={{ fontSize: 12, color: "#444746", minWidth: 130 }}>No. WhatsApp</label>
                      <input value={formData.noWhatsapp} onChange={(e) => setFormData({ ...formData, noWhatsapp: e.target.value })}
                        style={{ ...inputStyle, fontSize: 12 }} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={{ fontSize: 12, color: "#444746", minWidth: 130 }}>Website</label>
                      <input value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        style={{ ...inputStyle, fontSize: 12 }} />
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={{ fontSize: 12, color: "#444746", minWidth: 130 }}>Kewarganegaraan</label>
                      <select value={formData.kewarganegaraan} onChange={(e) => setFormData({ ...formData, kewarganegaraan: e.target.value })}
                        style={{ ...selectStyle, flex: 1 }}>
                        <option>Indonesia</option><option>Lainnya</option>
                      </select>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={{ fontSize: 12, color: "#444746", minWidth: 130 }}>ID Karyawan *</label>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1 }}>
                        <div onClick={() => setFormData({ ...formData, idKaryawanOtomatis: !formData.idKaryawanOtomatis })}
                          style={{ width: 36, height: 20, borderRadius: 10, cursor: "pointer", position: "relative", flexShrink: 0, background: formData.idKaryawanOtomatis ? "#0176d3" : "#ccc", transition: "background 100ms" }}>
                          <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: formData.idKaryawanOtomatis ? 18 : 2, transition: "left 100ms" }} />
                        </div>
                        <select value={formData.tipeId} onChange={(e) => setFormData({ ...formData, tipeId: e.target.value })}
                          style={{ ...selectStyle, flex: 1 }}>
                          <option>Employee</option>
                        </select>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={{ fontSize: 12, color: "#444746", minWidth: 130 }}>Tgl Masuk</label>
                      <input value={formData.tglMasuk} onChange={(e) => setFormData({ ...formData, tglMasuk: e.target.value })}
                        style={{ ...inputStyle, maxWidth: 120, fontSize: 12 }} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={{ fontSize: 12, color: "#444746", minWidth: 130 }}>No. KTP</label>
                      <input value={formData.noKtp} onChange={(e) => setFormData({ ...formData, noKtp: e.target.value })}
                        style={{ ...inputStyle, fontSize: 12 }} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={{ fontSize: 12, color: "#444746", minWidth: 130 }}>Penjual</label>
                      <input type="checkbox" checked={formData.penjual} onChange={(e) => setFormData({ ...formData, penjual: e.target.checked })}
                        style={{ width: 16, height: 16 }} />
                      <span style={{ fontSize: 12, color: "#444746" }}>Ya</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <label style={{ fontSize: 12, color: "#444746", minWidth: 130, marginTop: 6 }}>Catatan</label>
                      <textarea value={formData.catatan} onChange={(e) => setFormData({ ...formData, catatan: e.target.value })} rows={3}
                        style={{ flex: 1, padding: "6px 10px", fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none", resize: "vertical" }} />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "alamat" && (
                <div style={{ maxWidth: 500 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#001526", display: "block", marginBottom: 12 }}>Alamat</label>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <textarea value={formData.jalan} onChange={(e) => setFormData({ ...formData, jalan: e.target.value })} placeholder="Jalan" rows={3}
                      style={{ padding: "6px 10px", fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none", resize: "vertical" }} />
                    <div style={{ display: "flex", gap: 8 }}>
                      <input value={formData.kota} onChange={(e) => setFormData({ ...formData, kota: e.target.value })}
                        placeholder="Kota" style={{ ...inputStyle, fontSize: 12 }} />
                      <input value={formData.kodePos} onChange={(e) => setFormData({ ...formData, kodePos: e.target.value })}
                        placeholder="K.Pos" style={{ ...inputStyle, width: 100, fontSize: 12 }} />
                    </div>
                    <input value={formData.provinsi} onChange={(e) => setFormData({ ...formData, provinsi: e.target.value })}
                      placeholder="Provinsi" style={{ ...inputStyle, fontSize: 12 }} />
                    <input value={formData.negara} onChange={(e) => setFormData({ ...formData, negara: e.target.value })}
                      placeholder="Negara" style={{ ...inputStyle, fontSize: 12 }} />
                  </div>
                </div>
              )}

              {activeTab === "pajak" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 500 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={{ fontSize: 12, color: "#444746", minWidth: 130 }}>Dikenakan PPh 21</label>
                    <input type="checkbox" checked={formData.dikenakanPph21} onChange={(e) => setFormData({ ...formData, dikenakanPph21: e.target.checked })} style={{ width: 16, height: 16 }} />
                    <span style={{ fontSize: 12, color: "#444746" }}>Ya</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={{ fontSize: 12, color: "#444746", minWidth: 130 }}>No. NPWP</label>
                    <input value={formData.noNpwp} onChange={(e) => setFormData({ ...formData, noNpwp: e.target.value })}
                      style={{ ...inputStyle, fontSize: 12 }} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={{ fontSize: 12, color: "#444746", minWidth: 130 }}>Status Pekerja</label>
                    <select value={formData.statusPekerja} onChange={(e) => setFormData({ ...formData, statusPekerja: e.target.value })}
                      style={{ ...selectStyle, flex: 1 }}>
                      <option>Pegawai Tetap</option><option>Pegawai Tidak Tetap</option><option>Penerima Pensiun</option>
                    </select>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={{ fontSize: 12, color: "#444746", minWidth: 130 }}>Dikenakan PTKP</label>
                    <input type="checkbox" checked={formData.dikenakanPtkp} onChange={(e) => setFormData({ ...formData, dikenakanPtkp: e.target.checked })} style={{ width: 16, height: 16 }} />
                    <span style={{ fontSize: 12, color: "#444746" }}>Ya</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={{ fontSize: 12, color: "#444746", minWidth: 130 }}>Status PTKP</label>
                    <select value={formData.statusPtkp} onChange={(e) => setFormData({ ...formData, statusPtkp: e.target.value })}
                      style={{ ...selectStyle, flex: 1 }}>
                      <option>Tidak Kawin (Tidak ada tanggungan)</option>
                      <option>Tidak Kawin (1 tanggungan)</option>
                      <option>Kawin (Tidak ada tanggungan)</option>
                      <option>Kawin (1 tanggungan)</option>
                      <option>Kawin (2 tanggungan)</option>
                      <option>Kawin (3 tanggungan)</option>
                    </select>
                  </div>

                  <div style={{ borderTop: "1px solid #ecebea", paddingTop: 12, marginTop: 4 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "#001526", display: "block", marginBottom: 10 }}>Perhitungan PPh</label>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={{ fontSize: 12, color: "#444746", minWidth: 130 }}>PPh mulai dihitung</label>
                      <select value={formData.pphMulaiBulan} onChange={(e) => setFormData({ ...formData, pphMulaiBulan: e.target.value })}
                        style={{ ...selectStyle, width: 100 }}>
                        {bulanNames.map(b => <option key={b}>{b}</option>)}
                      </select>
                      <select value={formData.pphMulaiTahun} onChange={(e) => setFormData({ ...formData, pphMulaiTahun: e.target.value })}
                        style={{ ...selectStyle, width: 80 }}>
                        <option>2026</option><option>2025</option>
                      </select>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                      <label style={{ fontSize: 12, color: "#444746", minWidth: 130 }}>Penghasilan Sebelumnya</label>
                      <input value={formData.penghasilanSebelumnya} onChange={(e) => setFormData({ ...formData, penghasilanSebelumnya: e.target.value })}
                        style={{ ...inputStyle, fontSize: 12 }} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                      <label style={{ fontSize: 12, color: "#444746", minWidth: 130 }}>PPh Sebelumnya</label>
                      <input value={formData.pphSebelumnya} onChange={(e) => setFormData({ ...formData, pphSebelumnya: e.target.value })}
                        style={{ ...inputStyle, fontSize: 12 }} />
                    </div>
                    <p style={{ fontSize: 11, color: "#ea001e", marginTop: 10, lineHeight: 1.5 }}>
                      Penghasilan dan PPh sebelumnya HANYA PERLU diisi jika PPh sudah dihitung dan dibayarkan dari Januari, namun Pencatatan gaji di Accurate hanya diisi mulai bulan {formData.pphMulaiBulan} {formData.pphMulaiTahun}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "rekening" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 400 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={{ fontSize: 12, color: "#444746", minWidth: 130 }}>Nama Bank</label>
                    <div style={{ position: "relative", flex: 1 }}>
                      <Search size={12} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "#444746" }} />
                      <input value={formData.namaBank} onChange={(e) => setFormData({ ...formData, namaBank: e.target.value })}
                        placeholder="Cari/Pilih..." style={{ ...inputStyle, paddingLeft: 26, fontSize: 12 }} />
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={{ fontSize: 12, color: "#444746", minWidth: 130 }}>No Rekening</label>
                    <input value={formData.noRekening} onChange={(e) => setFormData({ ...formData, noRekening: e.target.value })}
                      style={{ ...inputStyle, fontSize: 12 }} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={{ fontSize: 12, color: "#444746", minWidth: 130 }}>Atas Nama Rekening</label>
                    <input value={formData.atasNamaRekening} onChange={(e) => setFormData({ ...formData, atasNamaRekening: e.target.value })}
                      style={{ ...inputStyle, fontSize: 12 }} />
                  </div>
                </div>
              )}

              <button onClick={handleSave}
                style={{ position: "absolute", right: 20, top: 20, width: 36, height: 36, display: "inline-flex", alignItems: "center", justifyContent: "center", background: "#f3f3f3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer", color: "#444746" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ecebea" }}>
              <th style={{ ...thStyle, width: 30 }}></th>
              <th style={{ ...thStyle, width: "14%" }}>Nama</th>
              <th style={{ ...thStyle, width: "12%" }}>Posisi Jabatan</th>
              <th style={{ ...thStyle, width: "14%" }}>Email</th>
              <th style={{ ...thStyle, width: "11%" }}>Handphone</th>
              <th style={{ ...thStyle, width: "10%" }}>ID Karyawan</th>
              <th style={{ ...thStyle, width: "10%" }}>Status Pekerja</th>
              <th style={{ ...thStyle, width: "10%" }}>Status PPh</th>
              <th style={{ ...thStyle, textAlign: "right", width: "10%" }}>Utang</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={9} style={{ ...tdStyle, textAlign: "center", padding: "64px 12px", color: "#444746" }}>Belum ada data</td></tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id}
                  style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer", transition: "background 100ms" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#f0f7ff"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <td style={tdStyle}></td>
                  <td style={{ ...tdStyle, fontWeight: 500, color: "#001526" }}>{item.nama}</td>
                  <td style={{ ...tdStyle, color: "#444746" }}>{item.posisi}</td>
                  <td style={{ ...tdStyle, color: "#444746" }}>{item.email}</td>
                  <td style={{ ...tdStyle, color: "#444746" }}>{item.hp}</td>
                  <td style={{ ...tdStyle, color: "#444746", fontFamily: "monospace" }}>{item.id}</td>
                  <td>
                    <span style={{
                      display: "inline-flex", padding: "2px 10px", fontSize: 12, fontWeight: 500,
                      borderRadius: 10,
                      background: item.statusKerja === "Tetap" ? "#e3f5e8" : item.statusKerja === "Kontrak" ? "#e3f0ff" : "#fef3e7",
                      color: item.statusKerja === "Tetap" ? "#1e7e34" : item.statusKerja === "Kontrak" ? "#0176d3" : "#e36414",
                    }}>{item.statusKerja}</span>
                  </td>
                  <td style={{ ...tdStyle, color: "#444746" }}>{item.npwp ? "Aktif" : "-"}</td>
                  <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace", color: "#444746" }}>{item.utang.toLocaleString("id-ID")}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
