"use client"

import { useState } from "react"
import { Plus, RefreshCw, Printer, Settings, Search, Filter } from "lucide-react"

export default function PenambahanBahanBakuPage() {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [filterTipe, setFilterTipe] = useState("semua")
  const filtered: any[] = []
  const selectStyle = { padding: "5px 24px 5px 8px", fontSize: 11, border: "1px solid #d8d8d8", borderRadius: 4, background: "#fff", color: "#001526", cursor: "pointer", appearance: "none" as const, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat" as const, backgroundPosition: "right 6px center" }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div><h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Penambahan Bahan Baku</h1><p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Catat penambahan bahan baku</p></div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
          <select style={selectStyle}><option>Tanggal: Semua</option></select>
          <select value={filterTipe} onChange={(e) => setFilterTipe(e.target.value)} style={selectStyle}><option value="semua">Tipe: Semua</option></select>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 4, cursor: "pointer" }}><Filter size={12} /></button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <button onClick={() => setShowForm(!showForm)} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }}><Plus size={16} /></button>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}><RefreshCw size={14} /></button>
          <div style={{ flex: 1 }} />
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}><Printer size={14} /></button>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}><Settings size={14} /></button>
          <div style={{ position: "relative" }}><Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} /><input type="text" placeholder="Ketik dan [Enter]" value={search} onChange={(e) => setSearch(e.target.value)} style={{ padding: "6px 10px 6px 30px", fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 6, width: 180, outline: "none" }} /></div>
          <span style={{ fontSize: 11, color: "#888" }}>{filtered.length}</span>
        </div>
      </div>

      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead><tr style={{ background: "#4a5568" }}>
            {[{l:"Nomor #",w:"14%"},{l:"Tanggal",w:"12%"},{l:"Tipe",w:"14%"},{l:"Pekerjaan Pesanan",w:"22%"},{l:"Keterangan",w:"30%"}].map((c:any) => <th key={c.l} style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "#fff", borderBottom: "1px solid #3a4150", width: c.w }}>{c.l}</th>)}
          </tr></thead>
          <tbody><tr><td colSpan={5} style={{ padding: 60, textAlign: "center", color: "#888" }}>Belum ada data</td></tr></tbody>
        </table>
      </div>
    </div>
  )
}
