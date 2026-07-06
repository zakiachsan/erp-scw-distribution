"use client"

import { useState } from "react"
import { RefreshCw, Download, Settings, Search, SlidersHorizontal } from "lucide-react"

export default function HistoriBankPage() {
  const [search, setSearch] = useState("")
  const [akunDipilih, setAkunDipilih] = useState("")
  const [tanggalAwal, setTanggalAwal] = useState("01/07/2026")
  const [tanggalAkhir, setTanggalAkhir] = useState("06/07/2026")
  const dateInputStyle = { padding: "5px 8px", fontSize: 11, border: "1px solid #d8d8d8", borderRadius: 4, outline: "none", width: 110, background: "#fff" }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div><h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Histori Bank</h1><p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Riwayat transaksi rekening bank</p></div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <div style={{ position: "relative", width: 200 }}><Search size={13} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "#999" }} /><input type="text" placeholder="Cari/Pilih..." value={akunDipilih} onChange={(e) => setAkunDipilih(e.target.value)} style={{ padding: "6px 8px 6px 28px", fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 4, width: "100%", outline: "none", boxSizing: "border-box" }} /></div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <input type="text" value={tanggalAwal} onChange={(e) => setTanggalAwal(e.target.value)} style={dateInputStyle} />
            <span style={{ fontSize: 11, color: "#666" }}>s/d</span>
            <input type="text" value={tanggalAkhir} onChange={(e) => setTanggalAkhir(e.target.value)} style={dateInputStyle} />
          </div>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 4, cursor: "pointer" }}><RefreshCw size={13} /></button>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 4, cursor: "pointer" }}><Download size={13} /></button>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 4, cursor: "pointer" }}><SlidersHorizontal size={13} /></button>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, background: "#ffc107", color: "#fff", border: "1px solid #ffc107", borderRadius: 4, cursor: "pointer" }}><Settings size={13} /></button>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead><tr style={{ background: "#4a5568" }}>
            {[{l:"Tanggal",w:"11%"},{l:"No. Sumber #",w:"11%"},{l:"No Cek #",w:"10%"},{l:"Tipe Transaksi",w:"13%"},{l:"Keterangan",w:"22%"},{l:"Mutasi",w:"12%",a:"right"},{l:"Tipe",w:"8%"},{l:"Saldo",w:"10%",a:"right"},{l:"#",w:"3%"}].map((c:any) => <th key={c.l} style={{ padding: "8px 10px", textAlign: c.a||"left", fontWeight: 600, color: "#fff", borderBottom: "1px solid #3a4150", width: c.w, fontSize: 11 }}>{c.l}</th>)}
          </tr></thead>
          <tbody><tr><td colSpan={9} style={{ padding: 60, textAlign: "center", color: "#888" }}>Belum ada data</td></tr></tbody>
        </table>
      </div>
    </div>
  )
}
