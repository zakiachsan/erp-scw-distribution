"use client"

import { useState } from "react"
import { RefreshCw, Search, Filter } from "lucide-react"

export default function BarangStokMinimumPage() {
  const [search, setSearch] = useState("")
  const [searchPemasok, setSearchPemasok] = useState("")
  const [searchGudang, setSearchGudang] = useState("")

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div><h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Barang Stok Minimum</h1><p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Monitoring stok minimum</p></div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12, flexWrap: "wrap" }}>
          <div style={{ position: "relative", width: 180 }}><Search size={13} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "#999" }} /><input type="text" placeholder="Cari/Pilih Pemasok.." value={searchPemasok} onChange={(e) => setSearchPemasok(e.target.value)} style={{ padding: "6px 8px 6px 28px", fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 4, width: "100%", outline: "none", boxSizing: "border-box" }} /></div>
          <div style={{ position: "relative", width: 180 }}><Search size={13} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "#999" }} /><input type="text" placeholder="Cari/Pilih Gudang.." value={searchGudang} onChange={(e) => setSearchGudang(e.target.value)} style={{ padding: "6px 8px 6px 28px", fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 4, width: "100%", outline: "none", boxSizing: "border-box" }} /></div>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 4, cursor: "pointer" }}><RefreshCw size={13} /></button>
          <button style={{ padding: "6px 14px", fontSize: 11, fontWeight: 600, background: "#fff", color: "#0176d3", border: "1px solid #0176d3", borderRadius: 4, cursor: "pointer" }}>Pesan</button>
          <button style={{ padding: "6px 14px", fontSize: 11, fontWeight: 600, background: "#fff", color: "#0176d3", border: "1px solid #0176d3", borderRadius: 4, cursor: "pointer" }}>Minta</button>
          <div style={{ flex: 1 }} />
          <div style={{ position: "relative", width: 200 }}><Search size={13} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "#999" }} /><input type="text" placeholder="Cari Nama/Kode Barang..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ padding: "6px 8px 6px 28px", fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 4, width: "100%", outline: "none", boxSizing: "border-box" }} /></div>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, background: "#ffc107", color: "#fff", border: "1px solid #ffc107", borderRadius: 4, cursor: "pointer" }}><Filter size={13} /></button>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
          <thead><tr style={{ background: "#4a5568" }}>
            <th style={{ padding: "8px 10px", textAlign: "left", fontWeight: 600, color: "#fff", borderBottom: "1px solid #3a4150", width: "3%" }}></th>
            {[{l:"Pemasok",w:"12%"},{l:"Nama Barang",w:"18%"},{l:"Kode Barang",w:"10%"},{l:"Satuan",w:"8%"},{l:"Stok tersedia",w:"10%"},{l:"Dipesan",w:"10%"},{l:"Diminta",w:"10%"},{l:"Batas Minimum Stok",w:"12%"}].map((c:any) => <th key={c.l} style={{ padding: "6px 8px", textAlign: c.l==="Stok tersedia"||c.l==="Dipesan"||c.l==="Diminta"||c.l==="Batas Minimum Stok"?"right":"left", fontWeight: 600, color: "#fff", borderBottom: "1px solid #3a4150", width: c.w }}>{c.l}</th>)}
          </tr></thead>
          <tbody><tr><td colSpan={9} style={{ padding: 60, textAlign: "center", color: "#888" }}>Belum ada data</td></tr></tbody>
        </table>
      </div>
    </div>
  )
}
