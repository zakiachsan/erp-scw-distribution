"use client"

import { useState } from "react"
import {
  RefreshCw,
  Settings,
  Search,
} from "lucide-react"

interface LogJurnal {
  id: string
  tanggal: string
  nomor: string
  noTrans: string
  tipeTransaksi: string
}

const dummyData: LogJurnal[] = []

export default function LogAktifitasJurnalPage() {
  const [search, setSearch] = useState("")

  const filtered = dummyData.filter((item) => {
    if (search) {
      const q = search.toLowerCase()
      return item.nomor.toLowerCase().includes(q) || item.noTrans.toLowerCase().includes(q) || item.tipeTransaksi.toLowerCase().includes(q)
    }
    return true
  })

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>Log Aktifitas Jurnal</h1>
            <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Riwayat aktifitas jurnal akuntansi</p>
          </div>
        </div>

        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}>
            <RefreshCw size={14} />
          </button>
          <div style={{ flex: 1 }} />
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}>
            <Settings size={14} />
          </button>
          <div style={{ position: "relative" }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
            <input
              type="text"
              placeholder="Ketik dan [Enter"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && setSearch(search)}
              style={{ padding: "6px 10px 6px 30px", fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 6, width: 180, outline: "none" }}
            />
          </div>
          <span style={{ fontSize: 11, color: "#888", minWidth: 20, textAlign: "right" }}>{filtered.length}</span>
        </div>
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ background: "#4a5568" }}>
              {[
                { label: "Tanggal", width: "20%" },
                { label: "Nomor #", width: "20%" },
                { label: "No. Trans #", width: "20%" },
                { label: "Tipe Transaksi", width: "30%" },
              ].map((col) => (
                <th key={col.label} style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "#fff", borderBottom: "1px solid #3a4150", whiteSpace: "nowrap", width: col.width, cursor: "pointer", userSelect: "none" }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>
                  Belum ada data
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.style.background = "#f8f9ff"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.tanggal}</td>
                  <td style={{ padding: "8px 12px", fontFamily: "monospace", fontSize: 11, fontWeight: 500, color: "#001526" }}>{item.nomor}</td>
                  <td style={{ padding: "8px 12px", color: "#0176d3" }}>{item.noTrans}</td>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.tipeTransaksi}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
