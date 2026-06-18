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
  BookOpen,
  Filter,
  Calendar,
} from "lucide-react"

interface JournalEntry {
  id: string
  number: string
  date: string
  description: string
  totalDebit: number
  totalCredit: number
  status: "Diterbitkan" | "Draft" | "Dibatalkan"
  type: string
  lines: {
    account: string
    accountName: string
    debit: number
    credit: number
  }[]
}

const journalEntries: JournalEntry[] = [
  {
    id: "JE-001",
    number: "JV.2026.06.00001",
    date: "2026-06-02",
    description: "Pembayaran Invoice PT Maju Jaya - SCW Nano Coating 9H",
    totalDebit: 45000000,
    totalCredit: 45000000,
    status: "Diterbitkan",
    type: "Pembayaran",
    lines: [
      { account: "1101", accountName: "Kas", debit: 45000000, credit: 0 },
      { account: "4101", accountName: "Penjualan Produk", debit: 0, credit: 45000000 },
    ],
  },
  {
    id: "JE-002",
    number: "JV.2026.06.00002",
    date: "2026-06-01",
    description: "Pembelian bahan baku coating dari ChemPro Asia",
    totalDebit: 28500000,
    totalCredit: 28500000,
    status: "Diterbitkan",
    type: "Pembelian",
    lines: [
      { account: "5101", accountName: "Harga Pokok Penjualan", debit: 28500000, credit: 0 },
      { account: "2101", accountName: "Utang Usaha", debit: 0, credit: 28500000 },
    ],
  },
  {
    id: "JE-003",
    number: "JV.2026.06.00003",
    date: "2026-06-01",
    description: "Gaji bulanan tim produksi SCW",
    totalDebit: 125000000,
    totalCredit: 125000000,
    status: "Diterbitkan",
    type: "Biaya Operasional",
    lines: [
      { account: "6101", accountName: "Gaji Karyawan", debit: 125000000, credit: 0 },
      { account: "1101", accountName: "Kas", debit: 0, credit: 125000000 },
    ],
  },
  {
    id: "JE-004",
    number: "JV.2026.05.00004",
    date: "2026-05-31",
    description: "Sewa gudang warehouse Surabaya Mei 2026",
    totalDebit: 15000000,
    totalCredit: 15000000,
    status: "Diterbitkan",
    type: "Biaya Operasional",
    lines: [
      { account: "6102", accountName: "Sewa Gudang", debit: 15000000, credit: 0 },
      { account: "1102", accountName: "Bank BCA", debit: 0, credit: 15000000 },
    ],
  },
  {
    id: "JE-005",
    number: "JV.2026.05.00005",
    date: "2026-05-30",
    description: "Penjualan SCW Body Wash & SCW Tire Shine ke Toko Onderdil",
    totalDebit: 67800000,
    totalCredit: 67800000,
    status: "Draft",
    type: "Penjualan",
    lines: [
      { account: "1102", accountName: "Bank BCA", debit: 67800000, credit: 0 },
      { account: "4101", accountName: "Penjualan Produk", debit: 0, credit: 67800000 },
    ],
  },
  {
    id: "JE-006",
    number: "JV.2026.05.00006",
    date: "2026-05-30",
    description: "Pembayaran invoice dari SPBU Jaya Abadi",
    totalDebit: 32500000,
    totalCredit: 32500000,
    status: "Diterbitkan",
    type: "Pembayaran",
    lines: [
      { account: "1101", accountName: "Kas", debit: 32500000, credit: 0 },
      { account: "1202", accountName: "Piutang Usaha", debit: 0, credit: 32500000 },
    ],
  },
  {
    id: "JE-007",
    number: "JV.2026.05.00007",
    date: "2026-05-29",
    description: "Pembelian SCW Nano Coating 9H untuk stok gudang",
    totalDebit: 85000000,
    totalCredit: 85000000,
    status: "Draft",
    type: "Pembelian",
    lines: [
      { account: "1201", accountName: "Persediaan Barang", debit: 85000000, credit: 0 },
      { account: "2101", accountName: "Utang Usaha", debit: 0, credit: 85000000 },
    ],
  },
  {
    id: "JE-008",
    number: "JV.2026.05.00008",
    date: "2026-05-28",
    description: "Penyesuaian stok SCW Body Polish",
    totalDebit: 12000000,
    totalCredit: 12000000,
    status: "Dibatalkan",
    type: "Penyesuaian",
    lines: [
      { account: "1201", accountName: "Persediaan Barang", debit: 12000000, credit: 0 },
      { account: "6101", accountName: "Harga Pokok Penjualan", debit: 0, credit: 12000000 },
    ],
  },
]

const transactionTypes = [
  "Semua",
  "Penjualan",
  "Pembelian",
  "Pembayaran",
  "Biaya Operasional",
  "Penyesuaian",
]

function formatIDR(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export default function JournalPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "Diterbitkan" | "Draft" | "Dibatalkan">("all")
  const [typeFilter, setTypeFilter] = useState("Semua")
  const [dateFilter, setDateFilter] = useState("Semua")

  const filtered = useMemo(() => {
    return journalEntries.filter((entry) => {
      const matchesSearch =
        entry.description.toLowerCase().includes(search.toLowerCase()) ||
        entry.number.toLowerCase().includes(search.toLowerCase())
      const matchesStatus =
        statusFilter === "all" || entry.status === statusFilter
      const matchesType =
        typeFilter === "Semua" || entry.type === typeFilter
      const matchesDate =
        dateFilter === "Semua" || entry.date.startsWith(dateFilter)
      return matchesSearch && matchesStatus && matchesType && matchesDate
    })
  }, [search, statusFilter, typeFilter, dateFilter])

  const totalCount = journalEntries.length
  const diterbitkanCount = journalEntries.filter((e) => e.status === "Diterbitkan").length
  const draftCount = journalEntries.filter((e) => e.status === "Draft").length
  const dibatalkanCount = journalEntries.filter((e) => e.status === "Dibatalkan").length

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Jurnal Umum</h1>
          <p className="text-muted-foreground">
            Daftar semua jurnal transaksi akuntansi
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card
          className={`cursor-pointer transition-shadow hover:shadow-md ${statusFilter === "all" ? "ring-2 ring-indigo-500" : ""}`}
          onClick={() => setStatusFilter("all")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                <BookOpen className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Jurnal</p>
                <p className="text-2xl font-bold">{totalCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-shadow hover:shadow-md ${statusFilter === "Diterbitkan" ? "ring-2 ring-emerald-500" : ""}`}
          onClick={() => setStatusFilter("Diterbitkan")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <BookOpen className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Diterbitkan</p>
                <p className="text-2xl font-bold text-emerald-600">{diterbitkanCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-shadow hover:shadow-md ${statusFilter === "Draft" ? "ring-2 ring-amber-500" : ""}`}
          onClick={() => setStatusFilter("Draft")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                <BookOpen className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Draft</p>
                <p className="text-2xl font-bold text-amber-600">{draftCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-shadow hover:shadow-md ${statusFilter === "Dibatalkan" ? "ring-2 ring-red-500" : ""}`}
          onClick={() => setStatusFilter("Dibatalkan")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                <BookOpen className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Dibatalkan</p>
                <p className="text-2xl font-bold text-red-600">{dibatalkanCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Daftar Jurnal</CardTitle>
              <CardDescription>
                {filtered.length} jurnal ditemukan
                {statusFilter !== "all" && (
                  <span className="ml-1">({statusFilter})</span>
                )}
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              {statusFilter !== "all" && (
                <Button variant="outline" size="sm" onClick={() => setStatusFilter("all")}>
                  Clear filter
                </Button>
              )}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Cari nomor jurnal atau keterangan..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-64 pl-9"
                />
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <Select value={dateFilter} onValueChange={(v) => setDateFilter(v ?? "Semua")}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Tanggal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Semua">Semua Tanggal</SelectItem>
                    <SelectItem value="2026-06">Juni 2026</SelectItem>
                    <SelectItem value="2026-05">Mei 2026</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v ?? "Semua")}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Tipe Transaksi" />
                  </SelectTrigger>
                  <SelectContent>
                    {transactionTypes.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nomor #</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Keterangan</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((entry) => (
                <TableRow
                  key={entry.id}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-sans text-xs">
                    <Link
                      href={`/accounting/journal/${entry.id}`}
                      className="text-primary hover:underline"
                    >
                      {entry.number}
                    </Link>
                  </TableCell>
                  <TableCell>{formatDate(entry.date)}</TableCell>
                  <TableCell>
                    <div className="max-w-[300px]">
                      <span className="text-sm line-clamp-1">{entry.description}</span>
                      <span className="text-xs text-muted-foreground">
                        {entry.lines[0]?.account} - {entry.lines[0]?.accountName}
                        {entry.lines.length > 1 && ` +${entry.lines.length - 1} baris`}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{entry.type}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {formatIDR(entry.totalDebit)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        entry.status === "Diterbitkan"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : entry.status === "Draft"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }
                    >
                      {entry.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
