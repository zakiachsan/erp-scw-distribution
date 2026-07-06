"use client"

import { useState } from "react"
import {
  RefreshCw,
  Download,
  ArrowLeftRight,
  Settings,
  Search,
} from "lucide-react"

interface HistoriAkun {
  id: string
  tanggal: string
  noSumber: string
  tipeTransaksi: string
  keterangan: string
  mutasi: number
  tipe: string
  saldo: number
}

const dummyData: HistoriAkun[] = []

export default function HistoriAkunPage() {
  const [search, setSearch] = useState("")
  const [tanggalAwal, setTanggalAwal] = useState("01/07/2026")
  const [tanggalAkhir, setTanggalAkhir] = useState("06/07/2026")
  const [akunDipilih, setAkunDipilih] = useState("")

  const filtered = dummyData.filter((item) => {
    if (search && !item.keterangan.toLowerCase().includes(search.toLowerCase()) && !item.noSumber.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const selectStyle = {
    padding: "5px 24px 5px 8px", fontSize: 11, border: "1px solid #d8d8d8", borderRadius: 4,
    background: "#fff", color: "#001526", cursor: "pointer", appearance: "none" as const,
  }

  const dateInputStyle = {
    padding: "5px 8px", fontSize: 11, border: "1px solid #d8d8d8", borderRadius: 4,
    outline: "none", width: 110, background: "#fff",
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>Histori Akun</h1>
            <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Riwayat transaksi per akun perkiraan</p>
          </div>
        </div>

        {/* Search + Date Range + Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          {/* Search akun */}
          <div style={{ position: "relative", width: 200 }}>
            <Search size={13} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
            <input
              type="text"
              placeholder="Cari/Pilih..."
              value={akunDipilih}
              onChange={(e) => setAkunDipilih(e.target.value)}
              style={{ padding: "6px 8px 6px 28px", fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 4, width: "100%", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          {/* Date range */}
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <input type="text" value={tanggalAwal} onChange={(e) => setTanggalAwal(e.target.value)} style={dateInputStyle} />
            <span style={{ fontSize: 11, color: "#666" }}>s/d</span>
            <input type="text" value={tanggalAkhir} onChange={(e) => setTanggalAkhir(e.target.value)} style={dateInputStyle} />
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: 4 }}>
            <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 4, cursor: "pointer" }}>
              <RefreshCw size={13} />
            </button>
            <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 4, cursor: "pointer" }}>
              <Download size={13} />
            </button>
            <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 4, cursor: "pointer" }}>
              <ArrowLeftRight size={13} />
            </button>
            <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, background: "#ffc107", color: "#fff", border: "1px solid #ffc107", borderRadius: 4, cursor: "pointer" }}>
              <Settings size={13} />
            </button>
          </div>

          <div style={{ flex: 1 }} />
          <span style={{ fontSize: 11, color: "#888", minWidth: 20, textAlign: "right" }}>{filtered.length}</span>
        </div>
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ background: "#4a5568" }}>
              {[
                { label: "Tanggal", width: "12%" },
                { label: "No. Sumber #", width: "13%" },
                { label: "Tipe Transaksi", width: "14%" },
                { label: "Keterangan", width: "25%" },
                { label: "Mutasi", width: "12%", align: "right" as const },
                { label: "Tipe", width: "10%" },
                { label: "Saldo", width: "12%", align: "right" as const },
              ].map((col) => (
                <th key={col.label} style={{ padding: "8px 12px", textAlign: col.align || "left", fontWeight: 600, color: "#fff", borderBottom: "1px solid #3a4150", whiteSpace: "nowrap", width: col.width, cursor: "pointer", userSelect: "none" }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>
                  Belum ada data
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.style.background = "#f8f9ff"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.tanggal}</td>
                  <td style={{ padding: "8px 12px", fontFamily: "monospace", fontSize: 11, color: "#0176d3" }}>{item.noSumber}</td>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.tipeTransaksi}</td>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.keterangan}</td>
                  <td style={{ padding: "8px 12px", textAlign: "right", fontFamily: "monospace" }}>
                    {item.mutasi > 0 ? <span style={{ color: "#2e7d32" }}>Rp {item.mutasi.toLocaleString("id-ID")}</span> : item.mutasi < 0 ? <span style={{ color: "#c62828" }}>(Rp {Math.abs(item.mutasi).toLocaleString("id-ID")})</span> : <span>-</span>}
                  </td>
                  <td style={{ padding: "8px 12px", color: "#444746" }}>{item.tipe}</td>
                  <td style={{ padding: "8px 12px", textAlign: "right", fontFamily: "monospace", fontWeight: 600, color: "#001526" }}>Rp {item.saldo.toLocaleString("id-ID")}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
