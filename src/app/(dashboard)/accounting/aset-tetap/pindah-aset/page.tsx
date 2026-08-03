"use client"

import { useState } from "react"
import { RefreshCw, Search, Printer } from "lucide-react"
import { dummyAssetTransfers } from "@/lib/accounting-dummy-data"

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
const rowStyle: React.CSSProperties = { borderBottom: "1px solid #f0f0f0" }
const btnIcon: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }
const btnIconOutline: React.CSSProperties = { ...btnIcon, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8" }

export default function PindahAsetPage() {
  const [search, setSearch] = useState("")
  const [filterLokasi, setFilterLokasi] = useState("semua")

  const filtered = dummyAssetTransfers.filter(t => {
    if (search && !t.namaAset.toLowerCase().includes(search.toLowerCase()) && !t.kodeAset.toLowerCase().includes(search.toLowerCase())) return false
    if (filterLokasi !== "semua" && !t.lokasiAsal.includes(filterLokasi) && !t.lokasiTujuan.includes(filterLokasi)) return false
    return true
  })

  const allLokasi = Array.from(new Set([
    ...dummyAssetTransfers.map(t => t.lokasiAsal),
    ...dummyAssetTransfers.map(t => t.lokasiTujuan),
  ]))

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Pindah Aset</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Histori perpindahan lokasi aset tetap antar gudang/kantor</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 16, marginBottom: 12 }}>
          <div style={{ background: "#fff", border: "1px solid #ecebea", borderRadius: 8, padding: "14px 16px" }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", marginBottom: 4 }}>Total Pemindahan</p>
            <p style={{ fontSize: 22, fontWeight: 700, color: "#0176d3" }}>{dummyAssetTransfers.length}</p>
            <p style={{ fontSize: 11, color: "#888", marginTop: 2 }}>transaksi pindah</p>
          </div>
          <div style={{ background: "#fff", border: "1px solid #ecebea", borderRadius: 8, padding: "14px 16px" }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", marginBottom: 4 }}>Aset Dipindahkan</p>
            <p style={{ fontSize: 22, fontWeight: 700, color: "#001526" }}>{new Set(dummyAssetTransfers.map(t => t.kodeAset)).size}</p>
            <p style={{ fontSize: 11, color: "#888", marginTop: 2 }}>aset unik</p>
          </div>
          <div style={{ background: "#fff", border: "1px solid #ecebea", borderRadius: 8, padding: "14px 16px" }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", marginBottom: 4 }}>Lokasi Aktif</p>
            <p style={{ fontSize: 22, fontWeight: 700, color: "#7c3aed" }}>{allLokasi.length}</p>
            <p style={{ fontSize: 11, color: "#888", marginTop: 2 }}>lokasi terlibat</p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12, flexWrap: "wrap" }}>
          <select value={filterLokasi} onChange={e => setFilterLokasi(e.target.value)} style={selectStyle}>
            <option value="semua">Lokasi: Semua</option>
            {allLokasi.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <div style={{ flex: 1 }} />
          <button style={btnIconOutline}><RefreshCw size={14} /></button>
          <button style={btnIconOutline}><Printer size={14} /></button>
          <div style={{ position: "relative" }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
            <input type="text" placeholder="Cari pindah aset..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ height: 32, padding: "0 10px 0 30px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, width: 200, outline: "none" }} />
          </div>
          <span style={{ fontSize: 11, color: "#888", minWidth: 20, textAlign: "right" }}>{filtered.length}</span>
        </div>
      </div>

      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ background: "#fff" }}>
            {[
              { l: "#" }, { l: "Tanggal Pindah" }, { l: "Kode Aset" }, { l: "Nama Aset" },
              { l: "Lokasi Asal" }, { l: "Lokasi Tujuan" }, { l: "Penanggung Jawab" }, { l: "Keterangan" },
            ].map(c => <th key={c.l} style={thStyle}>{c.l}</th>)}
          </tr></thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={8} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>Belum ada data pemindahan</td></tr>
            ) : filtered.map((t, idx) => (
              <tr key={t.id} style={rowStyle}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "#f0f7ff"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}
              >
                <td style={{ ...tdStyle, color: "#444746" }}>{idx + 1}</td>
                <td style={tdStyle}>{t.tanggal}</td>
                <td style={{ ...tdMono, color: "#0176d3", fontWeight: 600 }}>{t.kodeAset}</td>
                <td style={{ ...tdStyle, fontWeight: 500 }}>{t.namaAset}</td>
                <td style={{ ...tdStyle, color: "#ea001e" }}>{t.lokasiAsal}</td>
                <td style={{ ...tdStyle, color: "#059669", fontWeight: 500 }}>{t.lokasiTujuan}</td>
                <td style={{ ...tdStyle, fontSize: 12 }}>{t.penanggungJawab}</td>
                <td style={{ ...tdStyle, fontSize: 12, color: "#666" }}>{t.keterangan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
