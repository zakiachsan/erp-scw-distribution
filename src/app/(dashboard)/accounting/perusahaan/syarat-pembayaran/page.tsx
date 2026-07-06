"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Plus,
  RefreshCw,
  Printer,
  Settings,
  Search,
  Filter,
} from "lucide-react"

interface SyaratPembayaran {
  id: string
  nama: string
  diskon: number
  masaDiskon: number
  masaJatuhTempo: number
  keterangan: string
  nonAktif: boolean
  default: boolean
}

const dummyData: SyaratPembayaran[] = [
  { id: "1", nama: "C.O.D", diskon: 0, masaDiskon: 0, masaJatuhTempo: 0, keterangan: "", nonAktif: false, default: true },
  { id: "2", nama: "Cicilan", diskon: 0, masaDiskon: 0, masaJatuhTempo: 0, keterangan: "", nonAktif: false, default: false },
  { id: "3", nama: "Set Manual", diskon: 0, masaDiskon: 0, masaJatuhTempo: 0, keterangan: "", nonAktif: false, default: false },
  { id: "4", nama: "net 15", diskon: 0, masaDiskon: 0, masaJatuhTempo: 15, keterangan: "", nonAktif: false, default: false },
  { id: "5", nama: "net 30", diskon: 0, masaDiskon: 0, masaJatuhTempo: 30, keterangan: "", nonAktif: false, default: false },
  { id: "6", nama: "net 45", diskon: 0, masaDiskon: 0, masaJatuhTempo: 45, keterangan: "", nonAktif: false, default: false },
  { id: "7", nama: "net 60", diskon: 0, masaDiskon: 0, masaJatuhTempo: 60, keterangan: "", nonAktif: false, default: false },
  { id: "8", nama: "net 7", diskon: 0, masaDiskon: 0, masaJatuhTempo: 7, keterangan: "", nonAktif: false, default: false },
]

export default function SyaratPembayaranPage() {
  const [search, setSearch] = useState("")
  const [filterNonAktif, setFilterNonAktif] = useState("semua")
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    nama: "",
    diskon: 0,
    masaDiskon: 0,
    masaJatuhTempo: 0,
    keterangan: "",
    default: false,
  })

  const filtered = dummyData.filter((item) => {
    if (filterNonAktif === "aktif" && item.nonAktif) return false
    if (filterNonAktif === "nonaktif" && !item.nonAktif) return false
    if (search && !item.nama.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const handleSave = () => {
    // TODO: integrate with API
    console.log("Save:", formData)
    setShowForm(false)
    setFormData({ nama: "", diskon: 0, masaDiskon: 0, masaJatuhTempo: 0, keterangan: "", default: false })
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: "16px 20px 0", background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>
              Syarat Pembayaran
            </h1>
            <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>
              Kelola syarat dan termin pembayaran
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, paddingBottom: 12 }}>
          {/* Filter Non Aktif */}
          <div style={{ position: "relative" }}>
            <select
              value={filterNonAktif}
              onChange={(e) => setFilterNonAktif(e.target.value)}
              style={{
                padding: "6px 28px 6px 10px", fontSize: 12, fontWeight: 500,
                border: "1px solid #d8d8d8", borderRadius: 6,
                background: "#fff", color: "#001526", cursor: "pointer",
                appearance: "none",
              }}
            >
              <option value="semua">Non Aktif: Semua</option>
              <option value="aktif">Non Aktif: Tidak</option>
              <option value="nonaktif">Non Aktif: Ya</option>
            </select>
            <Filter size={12} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", color: "#666", pointerEvents: "none" }} />
          </div>

          {/* Add Button */}
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              padding: "6px 12px", fontSize: 12, fontWeight: 600,
              background: "#0176d3", color: "#fff",
              border: "1px solid #0176d3", borderRadius: 6,
              cursor: "pointer",
            }}
          >
            <Plus size={14} />
          </button>

          {/* Refresh */}
          <button
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 32, height: 32,
              background: "#fff", color: "#0176d3",
              border: "1px solid #d8d8d8", borderRadius: 6,
              cursor: "pointer",
            }}
          >
            <RefreshCw size={14} />
          </button>

          <div style={{ flex: 1 }} />

          {/* Printer */}
          <button
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 32, height: 32,
              background: "#fff", color: "#0176d3",
              border: "1px solid #d8d8d8", borderRadius: 6,
              cursor: "pointer",
            }}
          >
            <Printer size={14} />
          </button>

          {/* Settings */}
          <button
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 32, height: 32,
              background: "#fff", color: "#0176d3",
              border: "1px solid #d8d8d8", borderRadius: 6,
              cursor: "pointer",
            }}
          >
            <Settings size={14} />
          </button>

          {/* Search */}
          <div style={{ position: "relative" }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
            <input
              type="text"
              placeholder="Ketik dan [Enter ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && setSearch(search)}
              style={{
                padding: "6px 10px 6px 30px", fontSize: 12,
                border: "1px solid #d8d8d8", borderRadius: 6,
                width: 180, outline: "none",
              }}
            />
          </div>

          {/* Row count */}
          <span style={{ fontSize: 11, color: "#888", minWidth: 20, textAlign: "right" }}>
            {filtered.length}
          </span>
        </div>
      </div>

      {/* Form (collapsible) */}
      {showForm && (
        <div style={{ background: "#f3f3f3", padding: "16px 20px", borderBottom: "1px solid #d8d8d8" }}>
          <div style={{ background: "#fff", borderRadius: 8, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", position: "relative" }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526", marginBottom: 16 }}>Syarat Pembayaran</h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px", maxWidth: 500 }}>
              {/* Jika membayar antara */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={{ fontSize: 12, color: "#444746", minWidth: 140 }}>Jika membayar antara</label>
                <input
                  type="number"
                  value={formData.masaDiskon}
                  onChange={(e) => setFormData({ ...formData, masaDiskon: Number(e.target.value) })}
                  style={{
                    width: 60, padding: "6px 8px", fontSize: 12,
                    border: "1px solid #d8d8d8", borderRadius: 4,
                    outline: "none",
                  }}
                />
                <span style={{ fontSize: 12, color: "#444746" }}>Hari</span>
              </div>

              {/* Akan mendapat diskon */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={{ fontSize: 12, color: "#444746", minWidth: 140 }}>Akan mendapat diskon</label>
                <input
                  type="number"
                  value={formData.diskon}
                  onChange={(e) => setFormData({ ...formData, diskon: Number(e.target.value) })}
                  style={{
                    width: 60, padding: "6px 8px", fontSize: 12,
                    border: "1px solid #d8d8d8", borderRadius: 4,
                    outline: "none",
                  }}
                />
                <span style={{ fontSize: 12, color: "#444746" }}>%</span>
              </div>

              {/* Masa Jatuh Tempo */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={{ fontSize: 12, color: "#444746", minWidth: 140 }}>Masa Jatuh Tempo</label>
                <input
                  type="number"
                  value={formData.masaJatuhTempo}
                  onChange={(e) => setFormData({ ...formData, masaJatuhTempo: Number(e.target.value) })}
                  style={{
                    width: 60, padding: "6px 8px", fontSize: 12,
                    border: "1px solid #d8d8d8", borderRadius: 4,
                    outline: "none",
                  }}
                />
                <span style={{ fontSize: 12, color: "#444746" }}>Hari</span>
              </div>

              {/* Nama */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={{ fontSize: 12, color: "#444746", minWidth: 140 }}>Nama</label>
                <input
                  type="text"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  style={{
                    width: 160, padding: "6px 8px", fontSize: 12,
                    border: "1px solid #d8d8d8", borderRadius: 4,
                    outline: "none",
                  }}
                />
              </div>

              {/* Keterangan */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, gridColumn: "span 2" }}>
                <label style={{ fontSize: 12, color: "#444746", minWidth: 140, marginTop: 6 }}>Keterangan</label>
                <textarea
                  value={formData.keterangan}
                  onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                  rows={3}
                  style={{
                    width: 300, padding: "6px 8px", fontSize: 12,
                    border: "1px solid #d8d8d8", borderRadius: 4,
                    outline: "none", resize: "vertical",
                  }}
                />
              </div>

              {/* Default */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={{ fontSize: 12, color: "#444746", minWidth: 140 }}>Default Syarat Pembayaran</label>
                <input
                  type="checkbox"
                  checked={formData.default}
                  onChange={(e) => setFormData({ ...formData, default: e.target.checked })}
                  style={{ width: 16, height: 16, cursor: "pointer" }}
                />
                <span style={{ fontSize: 12, color: "#444746" }}>Ya</span>
              </div>
            </div>

            {/* Save button */}
            <button
              onClick={handleSave}
              style={{
                position: "absolute", right: 24, top: 20,
                width: 36, height: 36,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "#f0f0f0", border: "1px solid #d8d8d8", borderRadius: 4,
                cursor: "pointer", color: "#444746",
              }}
              title="Simpan"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              {[
                { label: "Nama", width: "15%" },
                { label: "Diskon (%)", width: "10%", align: "right" as const },
                { label: "Masa Diskon (hari)", width: "12%", align: "right" as const },
                { label: "Masa Jatuh Tempo (hari)", width: "14%", align: "right" as const },
                { label: "Keterangan", width: "20%" },
                { label: "Non Aktif", width: "10%", align: "center" as const },
                { label: "Default", width: "10%", align: "center" as const },
              ].map((col) => (
                <th
                  key={col.label}
                  style={{
                    padding: "8px 12px", textAlign: col.align || "left",
                    fontWeight: 600, color: "#444746", borderBottom: "1px solid #e5e5e5",
                    whiteSpace: "nowrap", cursor: "pointer", userSelect: "none",
                  }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr
                key={item.id}
                style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer" }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#f8f9ff"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                <td style={{ padding: "8px 12px", fontWeight: 500, color: "#001526" }}>{item.nama}</td>
                <td style={{ padding: "8px 12px", textAlign: "right", color: "#444746" }}>{item.diskon}</td>
                <td style={{ padding: "8px 12px", textAlign: "right", color: "#444746" }}>{item.masaDiskon}</td>
                <td style={{ padding: "8px 12px", textAlign: "right", color: "#444746" }}>{item.masaJatuhTempo}</td>
                <td style={{ padding: "8px 12px", color: "#444746" }}>{item.keterangan || ""}</td>
                <td style={{ padding: "8px 12px", textAlign: "center", color: "#444746" }}>{item.nonAktif ? "Ya" : "Tidak"}</td>
                <td style={{ padding: "8px 12px", textAlign: "center", color: "#444746" }}>{item.default ? "Ya" : "Tidak"}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} style={{ padding: 40, textAlign: "center", color: "#888" }}>
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
