"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, RefreshCw, Download, Upload, Printer, Settings, Search, Filter } from "lucide-react"
import { dummyFixedAssets, type FixedAsset } from "@/lib/accounting-dummy-data"

function formatIDR(n: number) { return `Rp ${n.toLocaleString("id-ID")}` }

const thStyle: React.CSSProperties = { padding: "8px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", borderBottom: "1px solid #e0e0e0" }
const thRight: React.CSSProperties = { ...thStyle, textAlign: "right" }
const tdStyle: React.CSSProperties = { padding: "8px 12px", fontSize: 13, color: "#001526" }
const tdMono: React.CSSProperties = { ...tdStyle, fontFamily: "monospace", fontSize: 12 }
const rowStyle: React.CSSProperties = { borderBottom: "1px solid #f0f0f0" }
const btnIcon: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }
const btnIconOutline: React.CSSProperties = { ...btnIcon, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8" }
const inputStyle: React.CSSProperties = { height: 32, padding: "0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none", width: "100%", boxSizing: "border-box" }
const selectStyle: React.CSSProperties = { height: 32, padding: "0 24px 0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, background: "#fff", color: "#001526", cursor: "pointer", appearance: "none" as const, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat" as const, backgroundPosition: "right 10px center" }
const labelStyle: React.CSSProperties = { fontSize: 13, color: "#444746", minWidth: 190 }

const SaveIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
)

export default function AsetTetapPage() {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [filterKategori, setFilterKategori] = useState("semua")
  const [formData, setFormData] = useState({
    nama: "", kodeOtomatis: true, tanggalBeli: "07/07/2026", tanggalPakai: "07/07/2026",
    asetTidakBerwujud: false, metodePenyusutan: "Metode Garis Lurus",
    akunAset: "1501 - Peralatan Kantor", akunAkumulasi: "1502 - Akum. Penyusutan Peralatan", akunBeban: "6101 - Beban Penyusutan",
    kuantitas: 1, umurTahun: "5", umurBulan: "0", rasio: 20, nilaiSisa: 0,
  })

  // Auto-calculate rasio from umur
  const totalBulan = (parseInt(formData.umurTahun) || 0) * 12 + (parseInt(formData.umurBulan) || 0)
  const rasioOtomatis = totalBulan > 0 ? Math.round((1 / totalBulan) * 12 * 100) : 0

  const filtered = dummyFixedAssets.filter(i => !search || i.nama.toLowerCase().includes(search.toLowerCase()))
  const handleSave = () => { setShowForm(false) }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Aset Tetap</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Kelola data aset tetap</p>
        </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12, flexWrap: "wrap" }}>
            <select value={filterKategori} onChange={(e) => setFilterKategori(e.target.value)} style={selectStyle}>
            <option value="semua">Kategori Aset: Semua</option>
            </select>
            <div style={{ flex: 1 }} />
            <div style={{ position: "relative" }}>
              <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
              <input type="text" placeholder="Cari aset tetap..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ height: 32, padding: "0 10px 0 30px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, width: 200, outline: "none" }} />
            </div>
            <span style={{ fontSize: 11, color: "#888", minWidth: 20, textAlign: "right" }}>{filtered.length}</span>
          </div>
      </div>

      {showForm && (
        <div style={{ background: "#f3f3f3", padding: "16px 20px", borderBottom: "1px solid #d8d8d8" }}>
          <div style={{ background: "#fff", borderRadius: 8, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", position: "relative" }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526", marginBottom: 16 }}>Data Baru</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Nama *</label>
                <input type="text" value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})} style={{ ...inputStyle, border: "1px solid #90caf9" }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Kuantitas *</label>
                <input type="number" value={formData.kuantitas} onChange={(e) => setFormData({...formData, kuantitas: Number(e.target.value)})} style={{ ...inputStyle, maxWidth: 80 }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Kode Aset *</label>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div onClick={() => setFormData({...formData, kodeOtomatis: !formData.kodeOtomatis})} style={{ width: 36, height: 20, borderRadius: 10, cursor: "pointer", background: formData.kodeOtomatis ? "#0176d3" : "#ccc", position: "relative", flexShrink: 0 }}><div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: formData.kodeOtomatis ? 18 : 2, transition: "left 0.2s" }} /></div>
                  <select style={selectStyle}><option>Fixed Asset</option></select>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Umur Aset * (Tahun/Bulan)</label>
                <input type="text" value={formData.umurTahun} onChange={(e) => setFormData({...formData, umurTahun: e.target.value})} placeholder="Tahun" style={{ ...inputStyle, maxWidth: 60 }} />
                <span style={{ fontSize: 11, color: "#999" }}>-</span>
                <input type="text" value={formData.umurBulan} onChange={(e) => setFormData({...formData, umurBulan: e.target.value})} placeholder="Bulan" style={{ ...inputStyle, maxWidth: 60 }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Tanggal Beli *</label>
                <input type="text" value={formData.tanggalBeli} onChange={(e) => setFormData({...formData, tanggalBeli: e.target.value})} style={{ ...inputStyle, maxWidth: 130 }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Rasio Penyusutan *</label>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <input type="number" value={rasioOtomatis} disabled style={{ ...inputStyle, maxWidth: 80, background: "#f5f5f5", color: "#666" }} />
                  <span style={{ fontSize: 11, color: "#999" }}>% / tahun</span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Tanggal Pakai *</label>
                <input type="text" value={formData.tanggalPakai} onChange={(e) => setFormData({...formData, tanggalPakai: e.target.value})} style={{ ...inputStyle, maxWidth: 130 }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Nilai Sisa *</label>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ fontSize: 11, color: "#999" }}>Rp</span>
                  <input type="number" value={formData.nilaiSisa} onChange={(e) => setFormData({...formData, nilaiSisa: Number(e.target.value)})} style={{ ...inputStyle, maxWidth: 120 }} />
                </div>
              </div>
            </div>

            <div style={{ border: "1px solid #e0e0e0", borderRadius: 6, padding: "16px 20px", marginTop: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#0176d3"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/></svg>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#0176d3" }}>Informasi umum</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <input type="checkbox" checked={formData.asetTidakBerwujud} onChange={(e) => setFormData({...formData, asetTidakBerwujud: e.target.checked})} style={{ width: 16, height: 16 }} />
                    <label style={{ fontSize: 13, color: "#444746" }}>Aset Tidak Berwujud *</label>
                    <span style={{ fontSize: 13, color: "#444746" }}>Ya</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={{ ...labelStyle, minWidth: 160 }}>Metode Penyusutan *</label>
                    <select value={formData.metodePenyusutan} onChange={(e) => setFormData({...formData, metodePenyusutan: e.target.value})} style={{ ...selectStyle, flex: 1 }}>
                      <option>Metode Garis Lurus</option>
                      <option>Metode Saldo Menurun</option>
                    </select>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={{ ...labelStyle, minWidth: 160 }}>Akun Aset *</label>
                    <select value={formData.akunAset} onChange={(e) => setFormData({...formData, akunAset: e.target.value})} style={{ ...selectStyle, flex: 1 }}>
                      <option value="">Pilih Akun Aset...</option>
                      <option value="1501 - Peralatan Kantor">1501 - Peralatan Kantor</option>
                      <option value="1502 - Kendaraan">1502 - Kendaraan</option>
                      <option value="1503 - Inventaris">1503 - Inventaris</option>
                      <option value="1504 - Gedung">1504 - Gedung</option>
                      <option value="1505 - Tanah">1505 - Tanah</option>
                    </select>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={{ ...labelStyle, minWidth: 160 }}>Akun Akumulasi Penyusutan *</label>
                    <select value={formData.akunAkumulasi} onChange={(e) => setFormData({...formData, akunAkumulasi: e.target.value})} style={{ ...selectStyle, flex: 1 }}>
                      <option value="">Pilih Akun Akumulasi...</option>
                      <option value="1601 - Akum. Penyusutan Peralatan">1601 - Akum. Penyusutan Peralatan</option>
                      <option value="1602 - Akum. Penyusutan Kendaraan">1602 - Akum. Penyusutan Kendaraan</option>
                      <option value="1603 - Akum. Penyusutan Inventaris">1603 - Akum. Penyusutan Inventaris</option>
                      <option value="1604 - Akum. Penyusutan Gedung">1604 - Akum. Penyusutan Gedung</option>
                    </select>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={{ ...labelStyle, minWidth: 160 }}>Akun Beban Penyusutan *</label>
                    <select value={formData.akunBeban} onChange={(e) => setFormData({...formData, akunBeban: e.target.value})} style={{ ...selectStyle, flex: 1 }}>
                      <option value="">Pilih Akun Beban...</option>
                      <option value="6101 - Beban Penyusutan Peralatan">6101 - Beban Penyusutan Peralatan</option>
                      <option value="6102 - Beban Penyusutan Kendaraan">6102 - Beban Penyusutan Kendaraan</option>
                      <option value="6103 - Beban Penyusutan Inventaris">6103 - Beban Penyusutan Inventaris</option>
                      <option value="6104 - Beban Penyusutan Gedung">6104 - Beban Penyusutan Gedung</option>
                    </select>
                  </div>
                </div>
                <div />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12, gap: 24 }}>
              <div style={{ textAlign: "right", borderRight: "1px solid #d8d8d8", paddingRight: 16 }}>
                <div style={{ fontSize: 11, color: "#888" }}>Total Aset</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#001526" }}>{formatIDR(0)}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, color: "#888" }}>Nilai Buku</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#001526" }}>{formatIDR(0)}</div>
              </div>
            </div>

            <button onClick={handleSave} style={{ position: "absolute", right: 24, top: 20, ...btnIconOutline }} title="Simpan"><SaveIcon /></button>
          </div>
        </div>
      )}

      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ background: "#fff" }}>
            {[
              { label: "#", align: "left" as const },
              { label: "Nomor #", align: "left" as const },
              { label: "Nama Aset", align: "left" as const },
              { label: "Kategori", align: "left" as const },
              { label: "Tanggal Beli", align: "left" as const },
              { label: "Harga Perolehan", align: "right" as const },
              { label: "Nilai Buku", align: "right" as const },
            ].map(col => (
              <th key={col.label} style={{ ...thStyle, textAlign: col.align }}>{col.label}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data</td></tr>
            ) : filtered.map((item, idx) => (
              <tr key={item.id} style={rowStyle}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "#f0f7ff"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}
              >
                <td style={{ ...tdStyle, color: "#444746" }}>{idx + 1}</td>
                <td style={{ ...tdMono, color: "#0176d3", cursor: "pointer" }}><Link href={`/accounting/aset-tetap/aset-tetap/${item.id}`} style={{ color: "#0176d3", textDecoration: "none" }}>{item.nomor}</Link></td>
                <td style={{ ...tdStyle, fontWeight: 500 }}>{item.nama}</td>
                <td style={{ ...tdStyle, color: "#444746" }}>{item.kategori}</td>
                <td style={tdStyle}>{item.tanggalBeli}</td>
                <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace" }}>{formatIDR(item.totalNilai)}</td>
                <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace" }}>{formatIDR(item.nilaiBuku)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
