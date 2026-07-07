"use client"

import { useState } from "react"
import { RefreshCw, Settings, Search } from "lucide-react"

interface LogAktifitas {
  id: string; noNama: string; tglTransaksi: string; tipeTindakan: string; tipeTransaksi: string
  tanggal: string; pengguna: string; email: string; alamatIp: string
}

const dummyData: LogAktifitas[] = [
  { id: "1", noNama: "-", tglTransaksi: "", tipeTindakan: "Buat", tipeTransaksi: "Preferensi", tanggal: "05 Jul 2026 17:19:46", pengguna: "David", email: "dronell1990@gmail.com", alamatIp: "61.8.213.70" },
  { id: "2", noNama: "INV-2026-001", tglTransaksi: "05 Jul 2026", tipeTindakan: "Ubah", tipeTransaksi: "Invoice Penjualan", tanggal: "05 Jul 2026 16:45:12", pengguna: "Admin", email: "admin@scw.co.id", alamatIp: "103.28.12.55" },
  { id: "3", noNama: "Karyawan-003", tglTransaksi: "", tipeTindakan: "Hapus", tipeTransaksi: "Karyawan", tanggal: "05 Jul 2026 15:30:00", pengguna: "Admin", email: "admin@scw.co.id", alamatIp: "103.28.12.55" },
  { id: "4", noNama: "PO-2026-0089", tglTransaksi: "04 Jul 2026", tipeTindakan: "Buat", tipeTransaksi: "Purchase Order", tanggal: "04 Jul 2026 14:22:33", pengguna: "Rina", email: "rina@scw.co.id", alamatIp: "103.28.12.60" },
  { id: "5", noNama: "-", tglTransaksi: "", tipeTindakan: "Buat", tipeTransaksi: "Kontak", tanggal: "04 Jul 2026 10:15:00", pengguna: "David", email: "dronell1990@gmail.com", alamatIp: "61.8.213.70" },
]

export default function LogAktifitasPage() {
  const [search, setSearch] = useState("")
  const [filterTanggal] = useState("semua")
  const [filterTglTransaksi] = useState("semua")
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

  const thStyle: React.CSSProperties = { fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", padding: "6px 10px", textAlign: "left", background: "#fff" }
  const tdStyle: React.CSSProperties = { padding: "6px 10px", fontSize: 13, color: "#001526" }
  const inputStyle: React.CSSProperties = { height: 32, padding: "0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none" }
  const iconBtnStyle: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "transparent", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer", color: "#0176d3" }
  const selectStyle: React.CSSProperties = { height: 32, padding: "0 28px 0 10px", fontSize: 13, fontWeight: 500, border: "1px solid #d8d8d8", borderRadius: 6, background: "#fff", color: "#001526", cursor: "pointer", outline: "none", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center" }

  const badgeStyle = (tindakan: string): React.CSSProperties => ({
    display: "inline-flex", padding: "2px 8px", fontSize: 11, fontWeight: 500, borderRadius: 10,
    background: tindakan === "Buat" ? "#d3f5e0" : tindakan === "Ubah" ? "#fff3d6" : "#fde4e4",
    color: tindakan === "Buat" ? "#2e844a" : tindakan === "Ubah" ? "#8b6100" : "#ea001e",
  })

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: "16px 20px 0", background: "#fff" }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", margin: 0 }}>Log Aktifitas</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2, margin: 0 }}>Riwayat aktifitas dan audit trail</p>
        </div>

        {/* Filters row 1 */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
          <select value={filterTanggal} style={selectStyle}><option value="semua">Tanggal: Semua</option></select>
          <select value={filterTglTransaksi} style={selectStyle}><option value="semua">Tgl Transaksi: Semua</option></select>
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
            <option value="Admin">Admin</option><option value="David">David</option><option value="Rina">Rina</option>
          </select>
          <select value={filterTipeTindakan} onChange={(e) => setFilterTipeTindakan(e.target.value)} style={selectStyle}>
            <option value="semua">Tipe Tindakan: Semua</option>
            <option value="Buat">Buat</option><option value="Ubah">Ubah</option><option value="Hapus">Hapus</option>
          </select>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <button style={iconBtnStyle}><RefreshCw size={14} /></button>
          <div style={{ flex: 1 }} />
          <button style={iconBtnStyle}><Settings size={14} /></button>
          <div style={{ position: "relative" }}>
            <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#444746" }} />
            <input placeholder="Ketik dan [Enter" value={search} onChange={(e) => setSearch(e.target.value)}
              style={{ ...inputStyle, paddingLeft: 30, paddingRight: 10, width: 180 }} />
          </div>
          <span style={{ fontSize: 12, color: "#444746", minWidth: 20, textAlign: "right" }}>{filtered.length}</span>
        </div>
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ecebea" }}>
              <th style={{ ...thStyle, width: "10%" }}>No/Nama</th>
              <th style={{ ...thStyle, width: "10%" }}>Tgl Transaksi</th>
              <th style={{ ...thStyle, width: "10%" }}>Tipe Tindakan</th>
              <th style={{ ...thStyle, width: "14%" }}>Tipe Transaksi</th>
              <th style={{ ...thStyle, width: "18%" }}>Tanggal</th>
              <th style={{ ...thStyle, width: "10%" }}>Pengguna</th>
              <th style={{ ...thStyle, width: "18%" }}>Email</th>
              <th style={{ ...thStyle, width: "10%" }}>Alamat IP</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={8} style={{ ...tdStyle, textAlign: "center", padding: "64px 12px", color: "#444746" }}>Tidak ada data</td></tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id}
                  style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer", transition: "background 100ms" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#f0f7ff"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <td style={{ ...tdStyle, color: "#444746" }}>{item.noNama}</td>
                  <td style={{ ...tdStyle, color: "#444746" }}>{item.tglTransaksi || "-"}</td>
                  <td style={tdStyle}><span style={badgeStyle(item.tipeTindakan)}>{item.tipeTindakan}</span></td>
                  <td style={{ ...tdStyle, color: "#444746" }}>{item.tipeTransaksi}</td>
                  <td style={{ ...tdStyle, color: "#706e6b", fontSize: 12, fontFamily: "monospace" }}>{item.tanggal}</td>
                  <td style={{ ...tdStyle, fontWeight: 500, color: "#001526" }}>{item.pengguna}</td>
                  <td style={{ ...tdStyle, color: "#444746", fontSize: 12 }}>{item.email}</td>
                  <td style={{ ...tdStyle, color: "#706e6b", fontSize: 12, fontFamily: "monospace" }}>{item.alamatIp}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
