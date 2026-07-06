"use client"

import { useState } from "react"
import {
  RefreshCw,
  Settings,
  Search,
} from "lucide-react"

interface LogAktifitas {
  id: string
  noNama: string
  tglTransaksi: string
  tipeTindakan: string
  tipeTransaksi: string
  tanggal: string
  pengguna: string
  email: string
  alamatIp: string
}

const dummyData: LogAktifitas[] = [
  {
    id: "1",
    noNama: "-",
    tglTransaksi: "",
    tipeTindakan: "Buat",
    tipeTransaksi: "Preferensi",
    tanggal: "05 Jul 2026 17:19:46",
    pengguna: "David",
    email: "dronell1990@gmail.com",
    alamatIp: "61.8.213.70",
  },
  {
    id: "2",
    noNama: "INV-2026-001",
    tglTransaksi: "05 Jul 2026",
    tipeTindakan: "Ubah",
    tipeTransaksi: "Invoice Penjualan",
    tanggal: "05 Jul 2026 16:45:12",
    pengguna: "Admin",
    email: "admin@scw.co.id",
    alamatIp: "103.28.12.55",
  },
  {
    id: "3",
    noNama: "Karyawan-003",
    tglTransaksi: "",
    tipeTindakan: "Hapus",
    tipeTransaksi: "Karyawan",
    tanggal: "05 Jul 2026 15:30:00",
    pengguna: "Admin",
    email: "admin@scw.co.id",
    alamatIp: "103.28.12.55",
  },
  {
    id: "4",
    noNama: "PO-2026-0089",
    tglTransaksi: "04 Jul 2026",
    tipeTindakan: "Buat",
    tipeTransaksi: "Purchase Order",
    tanggal: "04 Jul 2026 14:22:33",
    pengguna: "Rina",
    email: "rina@scw.co.id",
    alamatIp: "103.28.12.60",
  },
  {
    id: "5",
    noNama: "-",
    tglTransaksi: "",
    tipeTindakan: "Buat",
    tipeTransaksi: "Kontak",
    tanggal: "04 Jul 2026 10:15:00",
    pengguna: "David",
    email: "dronell1990@gmail.com",
    alamatIp: "61.8.213.70",
  },
]

export default function LogAktifitasPage() {
  const [search, setSearch] = useState("")
  const [filterTanggal, setFilterTanggal] = useState("semua")
  const [filterTglTransaksi, setFilterTglTransaksi] = useState("semua")
  const [filterTipeTransaksi, setFilterTipeTransaksi] = useState("semua")
  const [filterPengguna, setFilterPengguna] = useState("semua")
  const [filterTipeTindakan, setFilterTipeTindakan] = useState("semua")

  const filtered = dummyData.filter((item) => {
    if (search) {
      const q = search.toLowerCase()
      if (!item.noNama.toLowerCase().includes(q) && !item.pengguna.toLowerCase().includes(q) && !item.email.toLowerCase().includes(q) && !item.tipeTransaksi.toLowerCase().includes(q)) return false
    }
    if (filterTipeTransaksi !== "semua" && item.tipeTransaksi !== filterTipeTransaksi) return false
    if (filterPengguna !== "semua" && item.pengguna !== filterPengguna) return false
    if (filterTipeTindakan !== "semua" && item.tipeTindakan !== filterTipeTindakan) return false
    return true
  })

  const selectStyle = {
    padding: "5px 24px 5px 8px", fontSize: 11, fontWeight: 500 as const,
    border: "1px solid #d8d8d8", borderRadius: 4,
    background: "#fff", color: "#001526", cursor: "pointer",
    appearance: "none" as const,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat" as const,
    backgroundPosition: "right 6px center",
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>Log Aktifitas</h1>
            <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Riwayat aktifitas dan audit trail</p>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
          <select value={filterTanggal} onChange={(e) => setFilterTanggal(e.target.value)} style={selectStyle}>
            <option value="semua">Tanggal: Semua</option>
          </select>
          <select value={filterTglTransaksi} onChange={(e) => setFilterTglTransaksi(e.target.value)} style={selectStyle}>
            <option value="semua">Tgl Transaksi: Semua</option>
          </select>
          <select value={filterTipeTransaksi} onChange={(e) => setFilterTipeTransaksi(e.target.value)} style={selectStyle}>
            <option value="semua">Tipe Transaksi: Semua</option>
            <option value="Invoice Penjualan">Invoice Penjualan</option>
            <option value="Purchase Order">Purchase Order</option>
            <option value="Preferensi">Preferensi</option>
            <option value="Karyawan">Karyawan</option>
            <option value="Kontak">Kontak</option>
            <option value="Jurnal">Jurnal</option>
          </select>
          <select value={filterPengguna} onChange={(e) => setFilterPengguna(e.target.value)} style={selectStyle}>
            <option value="semua">Pengguna: Semua</option>
            <option value="Admin">Admin</option>
            <option value="David">David</option>
            <option value="Rina">Rina</option>
          </select>
          <select value={filterTipeTindakan} onChange={(e) => setFilterTipeTindakan(e.target.value)} style={selectStyle}>
            <option value="semua">Tipe Tindakan: Semua</option>
            <option value="Buat">Buat</option>
            <option value="Ubah">Ubah</option>
            <option value="Hapus">Hapus</option>
          </select>
        </div>

        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: "50%", cursor: "pointer" }}>
            <RefreshCw size={13} />
          </button>
          <div style={{ flex: 1 }} />
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }}>
            <Settings size={13} />
          </button>
          <div style={{ position: "relative" }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
            <input type="text" placeholder="Ketik dan [Enter" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && setSearch(search)} style={{ padding: "6px 10px 6px 30px", fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 6, width: 180, outline: "none" }} />
          </div>
          <span style={{ fontSize: 11, color: "#888", minWidth: 20, textAlign: "right" }}>1</span>
        </div>
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
          <thead>
            <tr style={{ background: "#1565c0" }}>
              {[
                { label: "No/Nama", width: "10%" },
                { label: "Tgl Transaksi", width: "10%" },
                { label: "Tipe Tindakan", width: "10%" },
                { label: "Tipe Transaksi", width: "14%" },
                { label: "Tanggal", width: "18%" },
                { label: "Pengguna", width: "10%" },
                { label: "Email", width: "18%" },
                { label: "Alamat IP", width: "12%" },
              ].map((col) => (
                <th key={col.label} style={{ padding: "8px 10px", textAlign: "left", fontWeight: 600, color: "#fff", borderBottom: "1px solid #0d47a1", whiteSpace: "nowrap", width: col.width, cursor: "pointer", userSelect: "none" }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={8} style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>Tidak ada data</td></tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.style.background = "#f8f9ff"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "8px 10px", color: "#444746" }}>{item.noNama}</td>
                  <td style={{ padding: "8px 10px", color: "#444746" }}>{item.tglTransaksi || "-"}</td>
                  <td style={{ padding: "8px 10px" }}>
                    <span style={{ padding: "2px 8px", borderRadius: 3, fontSize: 10, fontWeight: 600,
                      background: item.tipeTindakan === "Buat" ? "#e8f5e9" : item.tipeTindakan === "Ubah" ? "#fff3e0" : "#ffebee",
                      color: item.tipeTindakan === "Buat" ? "#2e7d32" : item.tipeTindakan === "Ubah" ? "#e65100" : "#c62828",
                    }}>
                      {item.tipeTindakan}
                    </span>
                  </td>
                  <td style={{ padding: "8px 10px", color: "#444746" }}>{item.tipeTransaksi}</td>
                  <td style={{ padding: "8px 10px", color: "#666", fontFamily: "monospace", fontSize: 10 }}>{item.tanggal}</td>
                  <td style={{ padding: "8px 10px", color: "#001526", fontWeight: 500 }}>{item.pengguna}</td>
                  <td style={{ padding: "8px 10px", color: "#444746", fontSize: 10 }}>{item.email}</td>
                  <td style={{ padding: "8px 10px", color: "#666", fontFamily: "monospace", fontSize: 10 }}>{item.alamatIp}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
