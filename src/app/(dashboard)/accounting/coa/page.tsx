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
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Search,
  Plus,
  BookOpen,
  Filter,
  Wallet,
  AlertTriangle,
  Shield,
} from "lucide-react"

// ── Types ──
type AccountType = "Aset" | "Liabilitas" | "Modal" | "Pendapatan" | "Beban"

interface COAAccount {
  id: string
  code: string
  name: string
  type: AccountType
  balance: number
  isActive: boolean
}

// ── Format helpers ──
const formatIDR = (val: number) => {
  if (val < 0) {
    return `(${Math.abs(val).toLocaleString("id-ID")})`
  }
  return `Rp ${val.toLocaleString("id-ID")}`
}

// ── Account type config ──
const accountTypeConfig: Record<AccountType, { label: string; className: string }> = {
  Aset: { label: "Aset", className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
  Liabilitas: { label: "Liabilitas", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
  Modal: { label: "Modal", className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" },
  Pendapatan: { label: "Pendapatan", className: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400" },
  Beban: { label: "Beban", className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" },
}

// ── Mock COA Data (Indonesian standard) ──
const mockCOA: COAAccount[] = [
  // === ASET LANCAR ===
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

  // === LIABILITAS ===
  { id: "19", code: "2101", name: "Utang Dagang", type: "Liabilitas", balance: 95000000, isActive: true },
  { id: "20", code: "210101", name: "Utang ChemPro Asia", type: "Liabilitas", balance: 45000000, isActive: true },
  { id: "21", code: "210102", name: "Utang NanoTech Coatings", type: "Liabilitas", balance: 30000000, isActive: true },
  { id: "22", code: "210103", name: "Utang AutoChem Supplies", type: "Liabilitas", balance: 20000000, isActive: true },
  { id: "23", code: "2201", name: "Utang Bank", type: "Liabilitas", balance: 150000000, isActive: true },
  { id: "24", code: "220101", name: "Kredit Investasi BCA", type: "Liabilitas", balance: 100000000, isActive: true },
  { id: "25", code: "220102", name: "Kredit Modal Kerja Mandiri", type: "Liabilitas", balance: 50000000, isActive: true },
  { id: "26", code: "2301", name: "Utang Lain-lain", type: "Liabilitas", balance: 35000000, isActive: true },
  { id: "27", code: "230101", name: "Utang Pajak (PPN)", type: "Liabilitas", balance: 22500000, isActive: true },
  { id: "28", code: "230102", name: "Utang Gaji", type: "Liabilitas", balance: 12500000, isActive: true },

  // === MODAL (EKUITAS) ===
  { id: "29", code: "3100", name: "Modal", type: "Modal", balance: 500000000, isActive: true },
  { id: "30", code: "310001", name: "Modal Disetor", type: "Modal", balance: 500000000, isActive: true },
  { id: "31", code: "3200", name: "Laba Ditahan", type: "Modal", balance: 325000000, isActive: true },
  { id: "32", code: "320001", name: "Laba Ditahan Tahun Lalu", type: "Modal", balance: 185000000, isActive: true },
  { id: "33", code: "320002", name: "Laba Tahun Berjalan", type: "Modal", balance: 140000000, isActive: true },

  // === PENDAPATAN ===
  { id: "34", code: "4101", name: "Penjualan Produk", type: "Pendapatan", balance: 425000000, isActive: true },
  { id: "35", code: "410101", name: "Penjualan Snow Foam", type: "Pendapatan", balance: 175000000, isActive: true },
  { id: "36", code: "410102", name: "Penjualan Ceramic Coating", type: "Pendapatan", balance: 135000000, isActive: true },
  { id: "37", code: "4201", name: "Pendapatan Jasa", type: "Pendapatan", balance: 15000000, isActive: true },

  // === BEBAN ===
  { id: "38", code: "5101", name: "Harga Pokok Penjualan", type: "Beban", balance: 285000000, isActive: true },
  { id: "39", code: "6101", name: "Beban Gaji", type: "Beban", balance: 125000000, isActive: true },
  { id: "40", code: "610101", name: "Gaji Karyawan", type: "Beban", balance: 90000000, isActive: true },
  { id: "41", code: "610102", name: "Tunjangan", type: "Beban", balance: 20000000, isActive: true },
  { id: "42", code: "6201", name: "Beban Sewa", type: "Beban", balance: 180000000, isActive: true },
  { id: "43", code: "620101", name: "Sewa Gudang", type: "Beban", balance: 120000000, isActive: true },
  { id: "44", code: "620102", name: "Sewa Kantor", type: "Beban", balance: 60000000, isActive: true },
  { id: "45", code: "6301", name: "Beban Utilitas", type: "Beban", balance: 28000000, isActive: false },
  { id: "46", code: "630101", name: "Listrik & Air", type: "Beban", balance: 18000000, isActive: true },
  { id: "47", code: "630102", name: "Internet & Telepon", type: "Beban", balance: 10000000, isActive: true },
  { id: "48", code: "6401", name: "Beban Marketing", type: "Beban", balance: 42000000, isActive: true },
  { id: "49", code: "6501", name: "Beban Transport & Kirim", type: "Beban", balance: 65000000, isActive: true },
]

const typeFilterOptions = ["Semua", "Aset", "Liabilitas", "Modal", "Pendapatan", "Beban"]

export default function COAPage() {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("Semua")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all")

  const filtered = useMemo(() => {
    return mockCOA.filter((acc) => {
      const matchesSearch =
        acc.name.toLowerCase().includes(search.toLowerCase()) ||
        acc.code.toLowerCase().includes(search.toLowerCase())
      const matchesType = typeFilter === "Semua" || acc.type === typeFilter
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && acc.isActive) ||
        (statusFilter === "inactive" && !acc.isActive)
      return matchesSearch && matchesType && matchesStatus
    })
  }, [search, typeFilter, statusFilter])

  const totalAccounts = mockCOA.length
  const asetCount = mockCOA.filter((a) => a.type === "Aset").length
  const liabilitasCount = mockCOA.filter((a) => a.type === "Liabilitas").length
  const modalCount = mockCOA.filter((a) => a.type === "Modal").length
  const activeCount = mockCOA.filter((a) => a.isActive).length
  const inactiveCount = mockCOA.filter((a) => !a.isActive).length

  const summaryCards = [
    { label: "Total Akun", count: totalAccounts, filter: "Semua", icon: BookOpen, iconBg: "flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30", iconColor: "h-5 w-5 text-indigo-600" },
    { label: "Aset", count: asetCount, filter: "Aset", icon: Wallet, iconBg: "flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30", iconColor: "h-5 w-5 text-blue-600" },
    { label: "Liabilitas", count: liabilitasCount, filter: "Liabilitas", icon: AlertTriangle, iconBg: "flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30", iconColor: "h-5 w-5 text-red-600" },
    { label: "Modal", count: modalCount, filter: "Modal", icon: Shield, iconBg: "flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30", iconColor: "h-5 w-5 text-emerald-600" },
  ]

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Akun Perkiraan</h1>
          <p className="text-muted-foreground">
            Kelola chart of accounts perusahaan
          </p>
        </div>
        <Link href="/accounting/coa/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Akun
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        {summaryCards.map((card) => (
          <Card
            key={card.label}
            className={`cursor-pointer transition-shadow hover:shadow-md ${
              typeFilter === card.filter ? "ring-2 ring-indigo-500" : ""
            }`}
            onClick={() => setTypeFilter(card.filter)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={card.iconBg}>
                  <card.icon className={card.iconColor} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{card.label}</p>
                  <p className="text-2xl font-bold">{card.count}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Daftar Akun</CardTitle>
              <CardDescription>
                {filtered.length} akun ditemukan
                {typeFilter !== "Semua" && (
                  <span className="ml-1">({typeFilter})</span>
                )}
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              {typeFilter !== "Semua" && (
                <Button variant="outline" size="sm" onClick={() => setTypeFilter("Semua")}>
                  Clear filter
                </Button>
              )}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Cari kode / nama akun..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-64 pl-9"
                />
              </div>
              <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v ?? "Semua")}>
                <SelectTrigger className="w-40">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Tipe Akun" />
                </SelectTrigger>
                <SelectContent>
                  {typeFilterOptions.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Status filter buttons with counts */}
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => setStatusFilter("all")}
              className={`rounded-md border px-3 py-1 text-xs font-medium transition-all ${
                statusFilter === "all"
                  ? "border-indigo-300 bg-indigo-50 text-indigo-700"
                  : "border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
            >
              Semua ({totalAccounts})
            </button>
            <button
              onClick={() => setStatusFilter("active")}
              className={`rounded-md border px-3 py-1 text-xs font-medium transition-all ${
                statusFilter === "active"
                  ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                  : "border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
            >
              Aktif ({activeCount})
            </button>
            <button
              onClick={() => setStatusFilter("inactive")}
              className={`rounded-md border px-3 py-1 text-xs font-medium transition-all ${
                statusFilter === "inactive"
                  ? "border-red-300 bg-red-50 text-red-700"
                  : "border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
            >
              Non Aktif ({inactiveCount})
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Kode Perkiraan</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead className="w-[120px]">Tipe Akun</TableHead>
                <TableHead className="w-[180px] text-right">Saldo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="py-10 text-center text-xs text-muted-foreground">
                    Tidak ada akun ditemukan
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((acc) => {
                  const cfg = accountTypeConfig[acc.type]
                  return (
                    <TableRow key={acc.id} className={!acc.isActive ? "opacity-50" : ""}>
                      <TableCell className="font-sans text-xs">
                        <Link
                          href={`/accounting/coa/${acc.id}`}
                          className="text-primary hover:underline"
                        >
                          {acc.code}
                        </Link>
                      </TableCell>
                      <TableCell className="font-medium">
                        <Link
                          href={`/accounting/coa/${acc.id}`}
                          className="text-primary hover:underline"
                        >
                          {acc.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cfg.className}>
                          {cfg.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={`font-sans text-xs font-medium ${
                            acc.balance < 0
                              ? "text-red-600"
                              : "text-slate-700"
                          }`}
                        >
                          {formatIDR(acc.balance)}
                        </span>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
