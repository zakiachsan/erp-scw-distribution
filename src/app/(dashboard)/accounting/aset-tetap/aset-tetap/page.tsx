"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Plus, RefreshCw, Search, Printer, Settings, ChevronDown, X } from "lucide-react"
import { dummyFixedAssets, dummyAssetCategories, dummyWarehouses, dummyAccounts, type FixedAsset } from "@/lib/accounting-dummy-data"

function formatIDR(n: number) { return `Rp ${n.toLocaleString('id-ID')}` }

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

// Filter akun: only Aset Tetap accounts
const akunAsetOptions = dummyAccounts.filter(a => a.tipeAkun === "Aset Tetap").map(a => ({ value: `${a.kode} - ${a.nama}`, label: `${a.kode} - ${a.nama}` }))
const akunAkumulasiOptions = dummyAccounts.filter(a => a.tipeAkun === "Aset Tetap" && a.nama.toLowerCase().includes("akum")).map(a => ({ value: `${a.kode} - ${a.nama}`, label: `${a.kode} - ${a.nama}` }))
const akunBebanOptions = dummyAccounts.filter(a => a.tipeAkun === "Beban" && a.nama.toLowerCase().includes("penyusutan")).map(a => ({ value: `${a.kode} - ${a.nama}`, label: `${a.kode} - ${a.nama}` }))
// Akun Pengeluaran: distinct from the 3 depreciation akun — any Beban account
const akunPengeluaranOptions = dummyAccounts.filter(a => a.tipeAkun === "Beban").map(a => ({ value: `${a.kode} - ${a.nama}`, label: `${a.kode} - ${a.nama}` }))

interface SearchableSelectProps {
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
  placeholder?: string
  width?: number | string
}
function SearchableSelect({ value, onChange, options, placeholder = "Pilih...", width }: SearchableSelectProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState(value)
  const filtered = useMemo(() => {
    if (!query) return options
    const q = query.toLowerCase()
    return options.filter(o => o.label.toLowerCase().includes(q))
  }, [query, options])
  return (
    <div style={{ position: "relative", flex: 1, maxWidth: width }}>
      <div style={{ position: "relative" }}>
        <Search size={13} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "#999", pointerEvents: "none" }} />
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder={placeholder}
          style={{ ...inputStyle, paddingLeft: 28, paddingRight: 28 }}
        />
        <ChevronDown size={13} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", color: "#999", pointerEvents: "none" }} />
      </div>
      {open && (
        <div style={{
          position: "absolute", top: 34, left: 0, right: 0, maxHeight: 220, overflowY: "auto",
          background: "#fff", border: "1px solid #d8d8d8", borderRadius: 6,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)", zIndex: 10,
        }}>
          {filtered.length === 0 ? (
            <div style={{ padding: 12, fontSize: 12, color: "#888", textAlign: "center" }}>Tidak ada hasil</div>
          ) : filtered.slice(0, 50).map((o) => (
            <div
              key={o.value}
              onMouseDown={() => { onChange(o.value); setQuery(o.label); setOpen(false) }}
              style={{ padding: "8px 10px", fontSize: 13, cursor: "pointer", borderBottom: "1px solid #f5f5f5", background: value === o.value ? "#f0f7ff" : "transparent" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#f0f7ff")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = value === o.value ? "#f0f7ff" : "transparent")}
            >
              {o.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const SaveIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
)

export default function AsetTetapPage() {
  const [tab, setTab] = useState<"daftar" | "disposisi">("daftar")
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [filterKategori, setFilterKategori] = useState("semua")
  const [assets, setAssets] = useState<FixedAsset[]>(dummyFixedAssets)
  const [formData, setFormData] = useState({
    nama: "", kodeOtomatis: true, tanggalBeli: "07/07/2026", tanggalPakai: "07/07/2026",
    asetTidakBerwujud: false, metodePenyusutan: "Metode Garis Lurus",
    akunAset: "120301 - Kendaraan Operasional", akunAkumulasi: "120302 - Akumulasi Penyusutan Kendaraan", akunBeban: "500401 - Beban Transportasi",
    akunPengeluaran: "500101 - Beban Gaji Karyawan",
    kuantitas: 1, umurTahun: "5", umurBulan: "0", rasio: 20, nilaiSisa: 0,
    hargaPerolehan: 0, kategori: "Kendaraan",
    lokasiAwal: "Gudang Pusat", catatan: "",
  })

  // Auto-calculate rasio from umur
  const totalBulan = (parseInt(formData.umurTahun) || 0) * 12 + (parseInt(formData.umurBulan) || 0)
  const rasioOtomatis = totalBulan > 0 ? Math.round((1 / totalBulan) * 12 * 100) : 0

  const filtered = assets.filter(a => {
    if (tab === "disposisi" && a.status !== "Disposed") return false
    if (tab === "daftar" && a.status !== "Aktif") return false
    if (search && !a.nama.toLowerCase().includes(search.toLowerCase())) return false
    if (filterKategori !== "semua" && a.kategori !== filterKategori) return false
    return true
  })

  const handleSave = () => {
    const totalNilai = formData.hargaPerolehan * formData.kuantitas
    const totalBulan2 = (parseInt(formData.umurTahun) || 0) * 12 + (parseInt(formData.umurBulan) || 0)
    const penyusutanBulanan = totalBulan2 > 0 ? Math.round((formData.hargaPerolehan - formData.nilaiSisa) / totalBulan2) : 0
    const newAsset: FixedAsset = {
      id: `fa-new-${Date.now()}`,
      nomor: `FA-${String(assets.length + 1).padStart(3, "0")}`,
      nama: formData.nama || "Aset Baru",
      kategori: formData.kategori,
      tanggalBeli: formData.tanggalBeli,
      kuantitas: formData.kuantitas,
      hargaPerolehan: formData.hargaPerolehan,
      totalNilai,
      nilaiBuku: totalNilai,
      umurEkonomis: parseInt(formData.umurTahun) || 5,
      metodePenyusutan: formData.metodePenyusutan,
      penyusutanBulanan,
      status: "Aktif",
      lokasi: formData.lokasiAwal,
      catatan: formData.catatan,
    }
    setAssets([...assets, newAsset])
    setShowForm(false)
    setFormData({ ...formData, nama: "", hargaPerolehan: 0, kuantitas: 1, catatan: "" })
  }

  // Build kategori options from real dummy data
  const kategoriOptions = useMemo(() => {
    const set = new Set<string>(dummyAssetCategories.map(c => c.nama))
    return Array.from(set)
  }, [])

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Aset Tetap</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Kelola data aset tetap</p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", alignItems: "center", gap: 0, marginTop: 16, borderBottom: "1px solid #e0e0e0" }}>
          <button
            onClick={() => setTab("daftar")}
            style={{
              padding: "10px 18px", fontSize: 13, fontWeight: 600,
              color: tab === "daftar" ? "#0176d3" : "#444746",
              background: "transparent", border: "none", cursor: "pointer",
              borderBottom: tab === "daftar" ? "2px solid #0176d3" : "2px solid transparent",
              marginBottom: -1,
            }}
          >
            Daftar
            <span style={{ marginLeft: 8, fontSize: 11, color: tab === "daftar" ? "#0176d3" : "#888", background: tab === "daftar" ? "#e8f1fb" : "#f0f0f0", padding: "2px 8px", borderRadius: 10 }}>
              {assets.filter(a => a.status === "Aktif").length}
            </span>
          </button>
          <button
            onClick={() => setTab("disposisi")}
            style={{
              padding: "10px 18px", fontSize: 13, fontWeight: 600,
              color: tab === "disposisi" ? "#0176d3" : "#444746",
              background: "transparent", border: "none", cursor: "pointer",
              borderBottom: tab === "disposisi" ? "2px solid #0176d3" : "2px solid transparent",
              marginBottom: -1,
            }}
          >
            Disposisi
            <span style={{ marginLeft: 8, fontSize: 11, color: tab === "disposisi" ? "#0176d3" : "#888", background: tab === "disposisi" ? "#e8f1fb" : "#f0f0f0", padding: "2px 8px", borderRadius: 10 }}>
              {assets.filter(a => a.status === "Disposed").length}
            </span>
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12, flexWrap: "wrap" }}>
          <button onClick={() => setShowForm(!showForm)} style={{ ...btnIcon, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, padding: "0 12px", width: "auto", fontSize: 13, fontWeight: 600, gap: 6 }}><Plus size={14} /> Tambah Aset Baru</button>
          <select value={filterKategori} onChange={(e) => setFilterKategori(e.target.value)} style={selectStyle}>
            <option value="semua">Kategori Aset: Semua</option>
            {kategoriOptions.map(k => <option key={k} value={k}>{k}</option>)}
          </select>
          <div style={{ flex: 1 }} />
          <button style={btnIconOutline} title="Refresh"><RefreshCw size={14} /></button>
          <button style={btnIconOutline} title="Print"><Printer size={14} /></button>
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
            <button onClick={() => setShowForm(false)} style={{ position: "absolute", right: 12, top: 12, background: "transparent", border: "none", cursor: "pointer", color: "#999" }}><X size={16} /></button>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526", marginBottom: 16 }}>Data Baru</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Nama *</label>
                <input type="text" value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})} style={{ ...inputStyle, border: "1px solid #90caf9" }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Kategori *</label>
                <select value={formData.kategori} onChange={(e) => setFormData({...formData, kategori: e.target.value})} style={{ ...selectStyle, flex: 1 }}>
                  {kategoriOptions.map(k => <option key={k} value={k}>{k}</option>)}
                </select>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={labelStyle}>Harga Perolehan *</label>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ fontSize: 11, color: "#999" }}>Rp</span>
                  <input type="number" value={formData.hargaPerolehan} onChange={(e) => setFormData({...formData, hargaPerolehan: Number(e.target.value)})} style={{ ...inputStyle, maxWidth: 150 }} />
                </div>
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

            {/* Informasi umum panel — 3 akun depreciation fields as searchable dropdowns */}
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
                    <SearchableSelect value={formData.akunAset} onChange={(v) => setFormData({...formData, akunAset: v})} options={akunAsetOptions} placeholder="Cari akun aset..." />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={{ ...labelStyle, minWidth: 160 }}>Akun Akumulasi Penyusutan *</label>
                    <SearchableSelect value={formData.akunAkumulasi} onChange={(v) => setFormData({...formData, akunAkumulasi: v})} options={akunAkumulasiOptions} placeholder="Cari akun akumulasi..." />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={{ ...labelStyle, minWidth: 160 }}>Akun Beban Penyusutan *</label>
                    <SearchableSelect value={formData.akunBeban} onChange={(v) => setFormData({...formData, akunBeban: v})} options={akunBebanOptions} placeholder="Cari akun beban..." />
                  </div>
                </div>
                <div />
              </div>
            </div>

            {/* Info lainnya panel */}
            <div style={{ border: "1px solid #e0e0e0", borderRadius: 6, padding: "16px 20px", marginTop: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#0176d3"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#0176d3" }}>Info lainnya</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={{ ...labelStyle, minWidth: 160 }}>Kategori Aset *</label>
                    <select value={formData.kategori} onChange={(e) => setFormData({...formData, kategori: e.target.value})} style={{ ...selectStyle, flex: 1 }}>
                      {kategoriOptions.map(k => <option key={k} value={k}>{k}</option>)}
                    </select>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={{ ...labelStyle, minWidth: 160 }}>Lokasi Awal Aset *</label>
                    <select value={formData.lokasiAwal} onChange={(e) => setFormData({...formData, lokasiAwal: e.target.value})} style={{ ...selectStyle, flex: 1 }}>
                      {dummyWarehouses.map(w => <option key={w.id} value={w.nama}>{w.nama}</option>)}
                      <option value="Kantor Pusat">Kantor Pusat</option>
                      <option value="Workshop Bandung">Workshop Bandung</option>
                      <option value="Workshop Jakarta">Workshop Jakarta</option>
                      <option value="Surabaya">Surabaya</option>
                    </select>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <label style={{ ...labelStyle, minWidth: 160, marginTop: 6 }}>Catatan</label>
                    <textarea value={formData.catatan} onChange={(e) => setFormData({...formData, catatan: e.target.value})} rows={3} style={{ ...inputStyle, resize: "vertical", height: "auto", padding: "6px 10px", flex: 1 }} placeholder="Catatan tambahan untuk aset ini..." />
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={{ ...labelStyle, minWidth: 160 }}>Akun Pengeluaran</label>
                    <SearchableSelect value={formData.akunPengeluaran} onChange={(v) => setFormData({...formData, akunPengeluaran: v})} options={akunPengeluaranOptions} placeholder="Cari akun beban..." />
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12, gap: 24 }}>
              <div style={{ textAlign: "right", borderRight: "1px solid #d8d8d8", paddingRight: 16 }}>
                <div style={{ fontSize: 11, color: "#888" }}>Total Aset</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#001526" }}>{formatIDR(formData.hargaPerolehan * formData.kuantitas)}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, color: "#888" }}>Nilai Buku</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#001526" }}>{formatIDR(formData.hargaPerolehan * formData.kuantitas - formData.nilaiSisa)}</div>
              </div>
            </div>

            <button onClick={handleSave} style={{ position: "absolute", right: 44, top: 20, ...btnIconOutline }} title="Simpan"><SaveIcon /></button>
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
              { label: "Lokasi", align: "left" as const },
              { label: "Tanggal Beli", align: "left" as const },
              { label: "Harga Perolehan", align: "right" as const },
              { label: "Nilai Buku", align: "right" as const },
              ...(tab === "disposisi" ? [{ label: "Catatan", align: "left" as const }] : []),
            ].map(col => (
              <th key={col.label} style={{ ...thStyle, textAlign: col.align }}>{col.label}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={tab === "disposisi" ? 9 : 8} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>{tab === "disposisi" ? "Belum ada aset yang didisposisi" : "Belum ada data"}</td></tr>
            ) : filtered.map((item, idx) => (
              <tr key={item.id} style={rowStyle}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "#f0f7ff"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}
              >
                <td style={{ ...tdStyle, color: "#444746" }}>{idx + 1}</td>
                <td style={{ ...tdMono, color: "#0176d3", cursor: "pointer" }}><Link href={`/accounting/aset-tetap/aset-tetap/${item.id}`} style={{ color: "#0176d3", textDecoration: "none" }}>{item.nomor}</Link></td>
                <td style={{ ...tdStyle, fontWeight: 500 }}>{item.nama}</td>
                <td style={{ ...tdStyle, color: "#444746" }}>{item.kategori}</td>
                <td style={{ ...tdStyle, color: "#444746", fontSize: 12 }}>{item.lokasi ?? "-"}</td>
                <td style={tdStyle}>{item.tanggalBeli}</td>
                <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace" }}>{formatIDR(item.totalNilai)}</td>
                <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace", color: item.status === "Disposed" ? "#999" : "#001526" }}>{formatIDR(item.nilaiBuku)}</td>
                {tab === "disposisi" && (
                  <td style={{ ...tdStyle, fontSize: 11, color: "#666", maxWidth: 240 }}>{item.catatan ?? "-"}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
