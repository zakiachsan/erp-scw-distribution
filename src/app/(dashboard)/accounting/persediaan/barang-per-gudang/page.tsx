"use client"

import { useState } from "react"
import { RefreshCw, Search } from "lucide-react"

export default function BarangPerGudangPage() {
  const [searchBarang, setSearchBarang] = useState("")
  const [tanggal, setTanggal] = useState("07/07/2026")

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div><h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Barang Per Gudang</h1><p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Stok barang per gudang</p></div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12, flexWrap: "wrap" }}>
          <select style={{ padding: "5px 24px 5px 8px", fontSize: 11, border: "1px solid #d8d8d8", borderRadius: 4, background: "#fff", color: "#001526", cursor: "pointer", appearance: "none" as const }}><option>Barang</option></select>
          <div style={{ position: "relative", width: 200 }}><Search size={13} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "#999" }} /><input type="text" placeholder="Cari/Pilih Barang" value={searchBarang} onChange={(e) => setSearchBarang(e.target.value)} style={{ padding: "6px 8px 6px 28px", fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 4, width: "100%", outline: "none", boxSizing: "border-box" }} /></div>
          <input type="text" value={tanggal} onChange={(e) => setTanggal(e.target.value)} style={{ padding: "5px 8px", fontSize: 11, border: "1px solid #d8d8d8", borderRadius: 4, width: 110, outline: "none" }} />
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 4, cursor: "pointer" }}><RefreshCw size={13} /></button>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 4, cursor: "pointer" }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></button>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead><tr style={{ background: "#4a5568" }}>
            {[{l:"Gudang",w:"25%"},{l:"Kuantitas Multi Satuan",w:"25%"},{l:"Stok dapat dijual",w:"25%"},{l:"Alamat",w:"20%"}].map((c:any) => <th key={c.l} style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "#fff", borderBottom: "1px solid #3a4150", width: c.w }}>{c.l}</th>)}
          </tr></thead>
          <tbody><tr><td colSpan={4} style={{ padding: 60, textAlign: "center", color: "#888" }}>Belum ada data</td></tr></tbody>
        </table>
      </div>
    </div>
  )
}
