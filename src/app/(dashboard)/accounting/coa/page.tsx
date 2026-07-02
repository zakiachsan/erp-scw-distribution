"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Search,
  Plus,
  BookOpen,
  Wallet,
  AlertTriangle,
  Shield,
} from "lucide-react"

type AccountType = "Aset" | "Liabilitas" | "Modal" | "Pendapatan" | "Beban"

interface COAAccount {
  id: string
  code: string
  name: string
  type: AccountType
  balance: number
  isActive: boolean
}

const formatIDR = (val: number) => {
  if (val < 0) {
    return `(${Math.abs(val).toLocaleString("id-ID")})`
  }
  return `Rp ${val.toLocaleString("id-ID")}`
}

const accountTypeConfig: Record<AccountType, { label: string; className: string }> = {
  Aset: { label: "Aset", className: "bg-blue-50 text-blue-700 border border-blue-200" },
  Liabilitas: { label: "Liabilitas", className: "bg-red-50 text-red-700 border border-red-200" },
  Modal: { label: "Modal", className: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
  Pendapatan: { label: "Pendapatan", className: "bg-purple-50 text-purple-700 border border-purple-200" },
  Beban: { label: "Beban", className: "bg-amber-50 text-amber-700 border border-amber-200" },
}

const mockCOA: COAAccount[] = [
  { id: "1", code: "1101", name: "Kas & Bank", type: "Aset", balance: 285000000, isActive: true },
  { id: "2", code: "110101", name: "Kas Kecil", type: "Aset", balance: 15000000, isActive: true },
  { id: "3", code: "110102", name: "Kas", type: "Aset", balance: 85000000, isActive: true },
  { id: "4", code: "110103", name: "Bank BCA", type: "Aset", balance: 125000000, isActive: true },
  { id: "5", code: "110104", name: "Bank Mandiri", type: "Aset", balance: 60000000, isActive: true },
  { id: "6", code: "1210", name: "Piutang Dagang", type: "Aset", balance: 178500000, isActive: true },
  { id: "7", code: "121001", name: "Piutang PT Autogloss Indonesia", type: "Aset", balance: 45000000, isActive: true },
  { id: "8", code: "121002", name: "Piutang CV Ceramic Pro JKT", type: "Aset", balance: 67500000, isActive: true },
  { id: "9", code: "121003", name: "Piutang UD Shinemax", type: "Aset", balance: -12500000, isActive: true },
  { id: "10", code: "121004", name: "Piutang PT DetailWorks BDG", type: "Aset", balance: 53500000, isActive: true },
  { id: "11", code: "1300", name: "Persediaan Barang Dagang", type: "Aset", balance: 520000000, isActive: true },
  { id: "12", code: "130001", name: "SCW Snow Foam", type: "Aset", balance: 180000000, isActive: true },
  { id: "13", code: "130002", name: "SCW Ceramic Coating", type: "Aset", balance: 125000000, isActive: true },
  { id: "14", code: "1400", name: "Aset Tetap", type: "Aset", balance: 850000000, isActive: true },
  { id: "15", code: "140001", name: "Tanah", type: "Aset", balance: 350000000, isActive: true },
  { id: "16", code: "140002", name: "Gedung", type: "Aset", balance: 250000000, isActive: true },
  { id: "17", code: "140003", name: "Peralatan", type: "Aset", balance: 120000000, isActive: true },
  { id: "18", code: "140004", name: "Kendaraan", type: "Aset", balance: 95000000, isActive: true },
  { id: "19", code: "2101", name: "Utang Dagang", type: "Liabilitas", balance: 95000000, isActive: true },
  { id: "20", code: "210101", name: "Utang ChemPro Asia", type: "Liabilitas", balance: 45000000, isActive: true },
  { id: "21", code: "210102", name: "Utang NanoTech Coatings", type: "Liabilitas", balance: 30000000, isActive: true },
  { id: "22", code: "210103", name: "Utang AutoChem Supplies", type: "Liabilitas", balance: 20000000, isActive: true },
  { id: "23", code: "2201", name: "Utang Bank", type: "Liabilitas", balance: 150000000, isActive: true },
  { id: "24", code: "220101", name: "Kredit Investasi BCA", type: "Liabilitas", balance: 100000000, isActive: true },
  { id: "25", code: "220102", name: "Kredit Modal Kerja Mandiri", type: "Liabilitas", balance: 50000000, isActive: true },
  { id: "26", code: "2301", name: "Utang Lain-lain", type: "Liabilitas", balance: 35000000, isActive: true },
  { id: "27", code: "230101", name: "Utang Pajak (PPN)", type: "Liabilitas", balance: 22500000, isActive: true },
  { id: "28", code: "230102", name: "Utang PPh 21", type: "Liabilitas", balance: 12500000, isActive: true },
  { id: "29", code: "3101", name: "Modal Disetor", type: "Modal", balance: 500000000, isActive: true },
  { id: "30", code: "310101", name: "Modal Tuan Budi", type: "Modal", balance: 350000000, isActive: true },
  { id: "31", code: "310102", name: "Modal Ny. Sari", type: "Modal", balance: 150000000, isActive: true },
  { id: "32", code: "3201", name: "Laba Ditahan", type: "Modal", balance: 214800000, isActive: true },
  { id: "33", code: "3301", name: "Laba Tahun Berjalan", type: "Modal", balance: 96000000, isActive: true },
  { id: "34", code: "4101", name: "Penjualan Produk SCW", type: "Pendapatan", balance: 785000000, isActive: true },
  { id: "35", code: "410101", name: "SCW Nano Coating 9H", type: "Pendapatan", balance: 420000000, isActive: true },
  { id: "36", code: "410102", name: "SCW Body Wash", type: "Pendapatan", balance: 185000000, isActive: true },
  { id: "37", code: "410103", name: "SCW Tire Shine", type: "Pendapatan", balance: 98000000, isActive: true },
  { id: "38", code: "410104", name: "SCW Leather Care", type: "Pendapatan", balance: 82000000, isActive: true },
  { id: "39", code: "4102", name: "Penjualan Jasa", type: "Pendapatan", balance: 175000000, isActive: false },
  { id: "40", code: "5101", name: "Harga Pokok Penjualan", type: "Beban", balance: 425000000, isActive: true },
  { id: "41", code: "6101", name: "Beban Gaji", type: "Beban", balance: 90000000, isActive: true },
  { id: "42", code: "610101", name: "Gaji Karyawan Tetap", type: "Beban", balance: 70000000, isActive: true },
  { id: "43", code: "610102", name: "Tunjangan", type: "Beban", balance: 20000000, isActive: true },
  { id: "44", code: "6201", name: "Beban Sewa", type: "Beban", balance: 180000000, isActive: true },
  { id: "45", code: "620101", name: "Sewa Gudang", type: "Beban", balance: 120000000, isActive: true },
  { id: "46", code: "620102", name: "Sewa Kantor", type: "Beban", balance: 60000000, isActive: true },
  { id: "47", code: "6301", name: "Beban Utilitas", type: "Beban", balance: 28000000, isActive: true },
  { id: "48", code: "630101", name: "Listrik & Air", type: "Beban", balance: 18000000, isActive: true },
  { id: "49", code: "630102", name: "Internet & Telepon", type: "Beban", balance: 10000000, isActive: true },
]

export default function COAPage() {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState<AccountType | "Semua">("Semua")
  const [activeTab, setActiveTab] = useState<"semua" | "aktif" | "nonaktif">("semua")

  const typeCount = useMemo(() => {
    const counts: Record<string, number> = {}
    mockCOA.forEach((a) => {
      counts[a.type] = (counts[a.type] || 0) + 1
    })
    return counts
  }, [])

  const filtered = useMemo(() => {
    return mockCOA.filter((a) => {
      const matchSearch = !search || a.code.toLowerCase().includes(search.toLowerCase()) || a.name.toLowerCase().includes(search.toLowerCase())
      const matchType = typeFilter === "Semua" || a.type === typeFilter
      const matchTab = activeTab === "semua" || (activeTab === "aktif" && a.isActive) || (activeTab === "nonaktif" && !a.isActive)
      return matchSearch && matchType && matchTab
    })
  }, [search, typeFilter, activeTab])

  const totalBalance = filtered.reduce((s, a) => s + a.balance, 0)

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>
            Akun Perkiraan
          </h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>
            Kelola chart of accounts perusahaan
          </p>
        </div>
        <Link href="/accounting/coa/create">
          <button
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "7px 14px", fontSize: 13, fontWeight: 600,
              background: "#0176d3", color: "#fff",
              border: "1px solid #0176d3", borderRadius: 6,
              cursor: "pointer", transition: "all 100ms",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#014486"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#0176d3"}
          >
            <Plus size={15} />
            Tambah Akun
          </button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { icon: BookOpen, label: "Total Akun", value: mockCOA.length, color: "text-brand", bg: "bg-brand-light", ring: true },
          { icon: Wallet, label: "Aset", value: typeCount["Aset"] || 0, color: "text-blue-600", bg: "bg-blue-50" },
          { icon: AlertTriangle, label: "Liabilitas", value: typeCount["Liabilitas"] || 0, color: "text-red-600", bg: "bg-red-50" },
          { icon: Shield, label: "Modal", value: typeCount["Modal"] || 0, color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((card) => (
          <Card key={card.label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.bg}`}>
                  <card.icon className={`h-5 w-5 ${card.color}`} />
                </div>
                <div>
                  <p style={{ fontSize: 12, color: "#444746" }}>{card.label}</p>
                  <p style={{ fontSize: 22, fontWeight: 700, color: "#001526" }}>{card.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle style={{ fontSize: 15, fontWeight: 600, color: "#001526" }}>Daftar Akun</CardTitle>
              <CardDescription style={{ fontSize: 12, color: "#444746", marginTop: 2 }}>
                {filtered.length} akun ditemukan
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              {/* Search */}
              <div style={{ position: "relative" }}>
                <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#444746" }} />
                <input
                  placeholder="Cari kode / nama akun..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    height: 32, width: 220,
                    padding: "0 10px 0 32px",
                    fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6,
                    outline: "none",
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = "#0176d3"}
                  onBlur={(e) => e.currentTarget.style.borderColor = "#d8d8d8"}
                />
              </div>
              {/* Type Filter */}
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as AccountType | "Semua")}
                style={{
                  height: 32, padding: "0 10px", fontSize: 12,
                  border: "1px solid #d8d8d8", borderRadius: 6,
                  background: "#fff", color: "#001526", outline: "none",
                }}
              >
                <option value="Semua">Semua Tipe</option>
                <option value="Aset">Aset</option>
                <option value="Liabilitas">Liabilitas</option>
                <option value="Modal">Modal</option>
                <option value="Pendapatan">Pendapatan</option>
                <option value="Beban">Beban</option>
              </select>
            </div>
          </div>
          {/* Tabs */}
          <div className="flex gap-2 mt-3">
            {[
              { key: "semua" as const, label: `Semua (${mockCOA.length})` },
              { key: "aktif" as const, label: `Aktif (${mockCOA.filter(a => a.isActive).length})` },
              { key: "nonaktif" as const, label: `Non Aktif (${mockCOA.filter(a => !a.isActive).length})` },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: "5px 12px", fontSize: 12, fontWeight: activeTab === tab.key ? 600 : 400,
                  border: "none", borderRadius: 4, cursor: "pointer",
                  background: activeTab === tab.key ? "#0176d3" : "transparent",
                  color: activeTab === tab.key ? "#fff" : "#444746",
                  transition: "all 100ms",
                }}
                onMouseEnter={(e) => { if (activeTab !== tab.key) e.currentTarget.style.background = "#f0f7ff" }}
                onMouseLeave={(e) => { if (activeTab !== tab.key) e.currentTarget.style.background = "transparent" }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #ecebea" }}>
                <th style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", padding: "8px 12px", textAlign: "left", background: "#fff" }}>Kode Perkiraan</th>
                <th style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", padding: "8px 12px", textAlign: "left", background: "#fff" }}>Nama</th>
                <th style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", padding: "8px 12px", textAlign: "left", background: "#fff" }}>Tipe Akun</th>
                <th style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", padding: "8px 12px", textAlign: "right", background: "#fff" }}>Saldo</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((account) => (
                <tr
                  key={account.id}
                  style={{ borderBottom: "1px solid #f0f0f0", opacity: account.isActive ? 1 : 0.5, cursor: "pointer", transition: "background 100ms" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#f0f7ff"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  onClick={() => window.location.href = `/accounting/coa/${account.id}`}
                >
                  <td style={{ padding: "8px 12px", fontSize: 13, fontFamily: "monospace" }}>
                    <span style={{ color: "#0176d3", cursor: "pointer" }}>{account.code}</span>
                  </td>
                  <td style={{ padding: "8px 12px", fontSize: 13, fontWeight: 500, color: "#001526" }}>{account.name}</td>
                  <td style={{ padding: "8px 12px" }}>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${accountTypeConfig[account.type].className}`}>
                      {accountTypeConfig[account.type].label}
                    </span>
                  </td>
                  <td style={{ padding: "8px 12px", fontSize: 13, fontFamily: "monospace", textAlign: "right", color: account.balance < 0 ? "#ea001e" : "#001526" }}>
                    {formatIDR(account.balance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
