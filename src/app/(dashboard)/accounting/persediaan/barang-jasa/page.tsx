"use client"

import { useState } from "react"
import { Plus, RefreshCw, Printer, Settings, Search, Filter, Download } from "lucide-react"

interface Barang { id: string; nama: string; kode: string; jenis: string; satuan: string; stokPenggunaan: number; stokDijual: number }
const dummyData: Barang[] = []
type FormTab = "umum" | "penjualan" | "stok" | "akun" | "gambar" | "lainlain"

export default function BarangDanJasaPage() {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [formTab, setFormTab] = useState<FormTab>("umum")
  const [filterJenis, setFilterJenis] = useState("semua")
  const [filterKategori, setFilterKategori] = useState("semua")
  const [filterMerek, setFilterMerek] = useState("semua")
  const filtered = dummyData.filter(i => !search || i.nama.toLowerCase().includes(search.toLowerCase()))
  const handleSave = () => { setShowForm(false); setFormTab("umum") }
  const selectStyle = { padding: "5px 24px 5px 8px", fontSize: 11, border: "1px solid #d8d8d8", borderRadius: 4, background: "#fff", color: "#001526", cursor: "pointer", appearance: "none" as const, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat" as const, backgroundPosition: "right 6px center" }
  const inputStyle = { padding: "6px 8px", fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 4, outline: "none", width: "100%", boxSizing: "border-box" as const }
  const labelStyle = { fontSize: 12, color: "#444746", minWidth: 140 }
  const tabs: { key: FormTab; label: string }[] = [
    { key: "umum", label: "Umum" }, { key: "penjualan", label: "Penjualan / Pembelian" },
    { key: "stok", label: "Stok" }, { key: "akun", label: "Akun" },
    { key: "gambar", label: "Gambar" }, { key: "lainlain", label: "Lain-lain" },
  ]

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div><h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Barang & Jasa</h1><p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Kelola data barang dan jasa</p></div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
          <select style={selectStyle}><option>Non Aktif: Semua</option></select>
          <select value={filterJenis} onChange={(e) => setFilterJenis(e.target.value)} style={selectStyle}><option value="semua">Jenis Barang: Semua</option><option>Persediaan</option><option>Jasa</option><option>Aset</option></select>
          <select value={filterKategori} onChange={(e) => setFilterKategori(e.target.value)} style={selectStyle}><option value="semua">Kategori Barang: Semua</option><option>General</option></select>
          <select value={filterMerek} onChange={(e) => setFilterMerek(e.target.value)} style={selectStyle}><option value="semua">Merek Barang: Semua</option></select>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 4, cursor: "pointer" }}><Filter size={12} /></button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <button onClick={() => { setShowForm(!showForm); setFormTab("umum") }} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }}><Plus size={16} /></button>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}><Printer size={14} /></button>
          <div style={{ flex: 1 }} />
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}><Download size={14} /></button>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}><RefreshCw size={14} /></button>
          <div style={{ position: "relative" }}><Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} /><input type="text" placeholder="Ketik dan [Enter]" value={search} onChange={(e) => setSearch(e.target.value)} style={{ padding: "6px 10px 6px 30px", fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 6, width: 180, outline: "none" }} /></div>
          <span style={{ fontSize: 11, color: "#888" }}>{filtered.length}</span>
        </div>
      </div>

      {showForm && (
        <div style={{ background: "#f3f3f3", padding: "16px 20px", borderBottom: "1px solid #d8d8d8" }}>
          <div style={{ background: "#fff", borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", overflow: "hidden", position: "relative" }}>
            <div style={{ display: "flex", borderBottom: "1px solid #d8d8d8" }}>
              {tabs.map(t => <button key={t.key} onClick={() => setFormTab(t.key)} style={{ padding: "10px 16px", fontSize: 11, fontWeight: formTab === t.key ? 600 : 400, background: formTab === t.key ? "#fff" : "#f5f5f5", color: formTab === t.key ? "#001526" : "#666", border: "none", borderBottom: formTab === t.key ? "2px solid #0176d3" : "2px solid transparent", cursor: "pointer" }}>{t.label}</button>)}
            </div>
            <div style={{ padding: "16px 20px" }}>
              {formTab === "umum" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "#0176d3", display: "block", marginBottom: 10 }}>Informasi Barang & Jasa</label>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      <div><label style={{ fontSize: 11, color: "#444746", display: "block", marginBottom: 2 }}>Nama Barang *</label><input type="text" style={{ ...inputStyle, border: "1px solid #90caf9" }} /></div>
                      <div><label style={{ fontSize: 11, color: "#444746", display: "block", marginBottom: 2 }}>Kategori Barang</label><div style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ padding: "2px 6px", background: "#e3f2fd", borderRadius: 3, fontSize: 11, color: "#1565c0" }}>General <span style={{ cursor: "pointer" }}>×</span></span></div></div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}><label style={{ fontSize: 11, color: "#444746", minWidth: 100 }}>Jenis Barang ⓘ</label><select style={{ ...selectStyle, flex: 1 }}><option>Persediaan</option><option>Jasa</option><option>Aset</option></select></div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}><label style={{ fontSize: 11, color: "#444746", minWidth: 100 }}>Kode Barang *</label><div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 36, height: 20, borderRadius: 10, background: "#0176d3", position: "relative" }}><div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: 18 }} /></div><select style={{ ...selectStyle }}><option>Item</option></select></div></div>
                      <div><label style={{ fontSize: 11, color: "#444746", display: "block", marginBottom: 2 }}>UPC/Barcode ⓘ</label><input type="text" style={inputStyle} /></div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}><label style={{ fontSize: 11, color: "#444746", minWidth: 100 }}>Satuan *</label><div style={{ position: "relative", flex: 1 }}><Search size={11} style={{ position: "absolute", left: 6, top: "50%", transform: "translateY(-50%)", color: "#999" }} /><input type="text" placeholder="Cari/Pilih..." style={{ ...inputStyle, paddingLeft: 24 }} /></div></div>
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "#0176d3", display: "block", marginBottom: 10 }}>Informasi Lainnya</label>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}><label style={{ fontSize: 11, color: "#444746", minWidth: 100 }}>Merek Barang</label><div style={{ position: "relative", flex: 1 }}><Search size={11} style={{ position: "absolute", left: 6, top: "50%", transform: "translateY(-50%)", color: "#999" }} /><input type="text" placeholder="Cari/Pilih Merek..." style={{ ...inputStyle, paddingLeft: 24 }} /></div></div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}><label style={{ fontSize: 11, color: "#444746" }}>Aktifkan No. Seri/Produksi</label><div style={{ width: 36, height: 20, borderRadius: 10, background: "#ccc", position: "relative" }}><div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: 2 }} /></div></div>
                    </div>
                  </div>
                </div>
              )}
              {formTab === "penjualan" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 24px" }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "#0176d3", display: "block", marginBottom: 10 }}>Informasi Penjualan</label>
                    {[{l:"Default Diskon (%)"},{l:"Def. Hrg. Jual Satuan #1"},{l:"Minimum Jual"}].map(f => <div key={f.l} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}><label style={{ fontSize: 11, color: "#444746", minWidth: 130 }}>{f.l}</label><input type="text" style={{ ...inputStyle, maxWidth: 120 }} /></div>)}
                    <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, marginTop: 6 }}><input type="checkbox" style={{ width: 14, height: 14 }} /> Menerapkan Harga / Diskon Grosir ⓘ</label>
                    <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, marginTop: 4 }}><input type="checkbox" style={{ width: 14, height: 14 }} /> Substitusi dengan ⓘ</label>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "#0176d3", display: "block", marginBottom: 10 }}>Informasi Pembelian</label>
                    {[{l:"Pemasok Utama",search:true},{l:"Satuan Beli",search:true},{l:"Harga Beli",prefix:"Rp.",search:true},{l:"Minimum Beli"},{l:"Batas Minimum Stok"}].map(f => <div key={f.l} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}><label style={{ fontSize: 11, color: "#444746", minWidth: 120 }}>{f.l}</label>{f.search ? <div style={{ position: "relative", flex: 1 }}><Search size={11} style={{ position: "absolute", left: 6, top: "50%", transform: "translateY(-50%)", color: "#999" }} /><input type="text" placeholder="Cari/Pilih..." style={{ ...inputStyle, paddingLeft: 24 }} /></div> : <div style={{ display: "flex", alignItems: "center", gap: 4, flex: 1 }}>{f.prefix && <span style={{ fontSize: 11, color: "#999" }}>{f.prefix}</span>}<input type="text" style={{ ...inputStyle, maxWidth: 120 }} /></div>}</div>)}
                    <div style={{ borderTop: "1px solid #eee", paddingTop: 10, marginTop: 10 }}>
                      <label style={{ fontSize: 12, fontWeight: 600, color: "#0176d3", display: "block", marginBottom: 8 }}>Pajak Penjualan dan Pembelian</label>
                      {[{l:"Ref Kode Pajak"},{l:"PPN"},{l:"PPh"}].map(f => <div key={f.l} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}><label style={{ fontSize: 11, color: "#444746", minWidth: 120 }}>{f.l}</label><div style={{ position: "relative", flex: 1 }}><Search size={11} style={{ position: "absolute", left: 6, top: "50%", transform: "translateY(-50%)", color: "#999" }} /><input type="text" placeholder="Cari/Pilih..." style={{ ...inputStyle, paddingLeft: 24 }} /></div></div>)}
                    </div>
                  </div>
                </div>
              )}
              {formTab === "stok" && (
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#001526" }}>Stok Awal</span>
                      <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, background: "#0176d3", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}><Plus size={12} /></button>
                    </div>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                      <thead><tr style={{ background: "#4a5568" }}>
                        {["Tanggal","Kuantitas","Satuan","Biaya Satuan","Gudang"].map(h => <th key={h} style={{ padding: "6px 8px", textAlign: "left", fontWeight: 600, color: "#fff", borderBottom: "1px solid #3a4150" }}>{h}</th>)}
                      </tr></thead>
                      <tbody><tr><td colSpan={5} style={{ padding: 24, textAlign: "center", color: "#888" }}>Belum ada data</td></tr></tbody>
                    </table>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "#0176d3", display: "block", marginBottom: 10 }}>Stok (Semua Gudang)</label>
                    {[{l:"Kuantitas"},{l:"Nilai Satuan"},{l:"Beban Pokok"}].map(f => <div key={f.l} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}><label style={{ fontSize: 11, color: "#444746", minWidth: 100 }}>{f.l}</label><input type="number" defaultValue={0} style={{ ...inputStyle, maxWidth: 100 }} /></div>)}
                  </div>
                </div>
              )}
              {formTab === "akun" && (
                <div style={{ maxWidth: 500 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#0176d3", display: "block", marginBottom: 10 }}>Akun Perkiraan</label>
                  {[{l:"Persediaan",v:"[110401] Persediaan"},{l:"Penjualan",v:"[4000001] Penjualan"},{l:"Retur Penjualan",v:"[4000003] Retur Penjualan"},{l:"Diskon Penjualan",v:"[4000004] Diskon Penjualan"},{l:"Barang Terkirim",v:"[110402] Persediaan Terkirim"},{l:"Beban Pokok Penjualan",v:"[5101] Beban Pokok Penjualan"},{l:"Retur Pembelian",v:"[110401] Persediaan"},{l:"Pembelian Belum Tertagih",v:"[2102003] Hutang Pembelian Belum Ditagih"}].map(f => (
                    <div key={f.l} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <label style={{ fontSize: 11, color: "#444746", minWidth: 150 }}>{f.l}</label>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, flex: 1 }}><span style={{ padding: "2px 6px", background: "#e3f2fd", borderRadius: 3, fontSize: 11, color: "#1565c0" }}>{f.v} <span style={{ cursor: "pointer" }}>×</span></span></div>
                    </div>
                  ))}
                  <p style={{ fontSize: 10, color: "#d32f2f", marginTop: 10 }}>* Akun-akun yang dapat dipilih sesuai dengan akun-akun yang dimasukkan pada formulir Preferensi bagian akun default barang</p>
                </div>
              )}
              {formTab === "gambar" && (
                <div style={{ padding: 20, textAlign: "center" }}>
                  <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#0176d3", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}><Plus size={16} /></button>
                  <p style={{ fontSize: 11, color: "#888", marginTop: 8 }}>Belum ada gambar</p>
                </div>
              )}
              {formTab === "lainlain" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "#0176d3", display: "block", marginBottom: 8 }}>Info Lainnya</label>
                    <div><label style={{ fontSize: 11, color: "#444746", display: "block", marginBottom: 2 }}>Catatan</label><textarea rows={4} style={{ ...inputStyle, resize: "vertical", border: "1px solid #90caf9" }} /></div>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "#0176d3", display: "block", marginBottom: 8 }}>Dimensi & Berat</label>
                    {[{l:"Panjang (cm)"},{l:"Lebar (cm)"},{l:"Tinggi (cm)"},{l:"Berat (gr)"}].map(f => <div key={f.l} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}><label style={{ fontSize: 11, color: "#444746", minWidth: 100 }}>{f.l}</label><input type="number" style={{ ...inputStyle, maxWidth: 100 }} /></div>)}
                  </div>
                </div>
              )}
            </div>
            <button onClick={handleSave} style={{ position: "absolute", right: 16, top: 12, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f0f0", border: "1px solid #d8d8d8", borderRadius: 4, cursor: "pointer", color: "#444746" }} title="Simpan"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg></button>
          </div>
        </div>
      )}

      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead><tr style={{ background: "#4a5568" }}>
            {[{l:"",w:"30px"},{l:"Nama Barang",w:"20%"},{l:"Kode Barang",w:"14%"},{l:"Jenis Barang",w:"14%"},{l:"Satuan",w:"10%"},{l:"Kts (Sedang Penggunaan)",w:"16%",a:"right"},{l:"Stok dapat dijual",w:"14%",a:"right"}].map((c:any) => <th key={c.l||"x"} style={{ padding: "8px 10px", textAlign: c.a||"left", fontWeight: 600, color: "#fff", borderBottom: "1px solid #3a4150", width: c.w, fontSize: 11 }}>{c.l}</th>)}
          </tr></thead>
          <tbody><tr><td colSpan={7} style={{ padding: 60, textAlign: "center", color: "#888" }}>Belum ada data</td></tr></tbody>
        </table>
      </div>
    </div>
  )
}
