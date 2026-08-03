"use client"

import { useState } from "react"
import { Plus, RefreshCw, Search, Printer } from "lucide-react"
import { dummyAssetDispositions } from "@/lib/accounting-dummy-data"

function formatIDR(n: number) { return `Rp ${n.toLocaleString('id-ID')}` }

const selectStyle: React.CSSProperties = {
  height: 32, padding: "0 24px 0 10px", fontSize: 13,
  border: "1px solid #d8d8d8", borderRadius: 6,
  background: "#fff", color: "#001526", cursor: "pointer",
  appearance: "none" as const,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat" as const, backgroundPosition: "right 10px center",
}
const thStyle: React.CSSProperties = { padding: "10px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", borderBottom: "1px solid #e0e0e0" }
const tdStyle: React.CSSProperties = { padding: "8px 12px", fontSize: 13, color: "#001526" }
const tdMono: React.CSSProperties = { ...tdStyle, fontFamily: "monospace", fontSize: 12 }
const tdRight: React.CSSProperties = { ...tdStyle, textAlign: "right", fontFamily: "monospace", fontSize: 12 }
const rowStyle: React.CSSProperties = { borderBottom: "1px solid #f0f0f0" }
const btnIcon: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }
const btnIconOutline: React.CSSProperties = { ...btnIcon, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8" }

const metodeColor: Record<string, { bg: string; fg: string }> = {
  Dijual: { bg: "#dcfce7", fg: "#15803d" },
  Dihapuskan: { bg: "#fee2e2", fg: "#b91c1c" },
  Ditukar: { bg: "#dbeafe", fg: "#1d4ed8" },
}

export default function DisposisiAsetTetapPage() {
  const [search, setSearch] = useState("")
  const [filterMetode, setFilterMetode] = useState("semua")

  const filtered = dummyAssetDispositions.filter(d => {
    if (search && !d.namaAset.toLowerCase().includes(search.toLowerCase()) && !d.kodeAset.toLowerCase().includes(search.toLowerCase())) return false
    if (filterMetode !== "semua" && d.metode !== filterMetode) return false
    return true
  })

  const totalNilaiBuku = filtered.reduce((s, d) => s + d.nilaiBuku, 0)
  const totalHargaJual = filtered.reduce((s, d) => s + d.hargaJual, 0)
  const totalSelisih = filtered.reduce((s, d) => s + d.selisih, 0)

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Disposisi Aset Tetap</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Histori penjualan, pengapusan, dan pertukaran aset tetap</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 16, marginBottom: 12 }}>
          <div style={{ background: "#fff", border: "1px solid #ecebea", borderRadius: 8, padding: "14px 16px" }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", marginBottom: 4 }}>Total Disposisi</p>
            <p style={{ fontSize: 22, fontWeight: 700, color: "#0176d3" }}>{dummyAssetDispositions.length}</p>
            <p style={{ fontSize: 11, color: "#888", marginTop: 2 }}>transaksi</p>
          </div>
          <div style={{ background: "#fff", border: "1px solid #ecebea", borderRadius: 8, padding: "14px 16px" }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", marginBottom: 4 }}>Total Nilai Buku</p>
            <p style={{ fontSize: 16, fontWeight: 700, color: "#001526" }}>{formatIDR(totalNilaiBuku)}</p>
          </div>
          <div style={{ background: "#fff", border: "1px solid #ecebea", borderRadius: 8, padding: "14px 16px" }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", marginBottom: 4 }}>Total Harga Jual</p>
            <p style={{ fontSize: 16, fontWeight: 700, color: "#059669" }}>{formatIDR(totalHargaJual)}</p>
          </div>
          <div style={{ background: "#fff", border: "1px solid #ecebea", borderRadius: 8, padding: "14px 16px" }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", marginBottom: 4 }}>Total Selisih</p>
            <p style={{ fontSize: 16, fontWeight: 700, color: totalSelisih >= 0 ? "#059669" : "#ea001e" }}>{formatIDR(totalSelisih)}</p>
            <p style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{totalSelisih >= 0 ? "Laba disposisi" : "Rugi disposisi"}</p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12, flexWrap: "wrap" }}>
          <select value={filterMetode} onChange={e => setFilterMetode(e.target.value)} style={selectStyle}>
            <option value="semua">Metode: Semua</option>
            <option value="Dijual">Dijual</option>
            <option value="Dihapuskan">Dihapuskan</option>
            <option value="Ditukar">Ditukar</option>
          </select>
          <div style={{ flex: 1 }} />
          <button style={btnIconOutline}><RefreshCw size={14} /></button>
          <button style={btnIconOutline}><Printer size={14} /></button>
          <div style={{ position: "relative" }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
            <input type="text" placeholder="Cari disposisi aset..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ height: 32, padding: "0 10px 0 30px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, width: 200, outline: "none" }} />
          </div>
          <span style={{ fontSize: 11, color: "#888", minWidth: 20, textAlign: "right" }}>{filtered.length}</span>
        </div>
      </div>

      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ background: "#fff" }}>
            {[
              { l: "#" }, { l: "Tanggal Disposisi" }, { l: "Kode Aset" }, { l: "Nama Aset" },
              { l: "Nilai Buku Saat Disposisi", align: "right" }, { l: "Harga Jual", align: "right" },
              { l: "Selisih", align: "right" }, { l: "Metode" }, { l: "Keterangan" },
            ].map(c => <th key={c.l} style={{ ...thStyle, textAlign: (c as any).align ?? "left" }}>{c.l}</th>)}
          </tr></thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={9} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data disposisi</td></tr>
            ) : filtered.map((d, idx) => {
              const mc = metodeColor[d.metode] || { bg: "#f0f0f0", fg: "#444" }
              return (
                <tr key={d.id} style={rowStyle}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "#f0f7ff"}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}
                >
                  <td style={{ ...tdStyle, color: "#444746" }}>{idx + 1}</td>
                  <td style={tdStyle}>{d.tanggal}</td>
                  <td style={{ ...tdMono, color: "#0176d3", fontWeight: 600 }}>{d.kodeAset}</td>
                  <td style={{ ...tdStyle, fontWeight: 500 }}>{d.namaAset}</td>
                  <td style={tdRight}>{formatIDR(d.nilaiBuku)}</td>
                  <td style={tdRight}>{formatIDR(d.hargaJual)}</td>
                  <td style={{ ...tdRight, color: d.selisih >= 0 ? "#059669" : "#ea001e", fontWeight: 600 }}>{formatIDR(d.selisih)}</td>
                  <td style={tdStyle}>
                    <span style={{ display: "inline-block", padding: "3px 8px", borderRadius: 4, background: mc.bg, color: mc.fg, fontSize: 11, fontWeight: 600 }}>{d.metode}</span>
                  </td>
                  <td style={{ ...tdStyle, fontSize: 12, color: "#666" }}>{d.keterangan}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
