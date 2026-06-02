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
  Filter,
  Calendar,
  BookOpen,
} from "lucide-react"

interface JournalEntry {
  id: string
  date: string
  reference: string
  account: string
  accountName: string
  description: string
  debit: number
  credit: number
  status: "Posted" | "Draft" | "Pending" | "Reversed"
}

const journalEntries: JournalEntry[] = [
  {
    id: "JE-2026-00187",
    date: "2026-06-02",
    reference: "INV-2026-0312",
    account: "1101",
    accountName: "Kas",
    description: "Pembayaran Invoice PT Maju Jaya - SCW Nano Coating 9H",
    debit: 45000000,
    credit: 0,
    status: "Posted",
  },
  {
    id: "JE-2026-00186",
    date: "2026-06-01",
    reference: "PO-2026-0089",
    account: "2101",
    accountName: "Utang Usaha",
    description: "Pembelian bahan baku coating dari ChemPro Asia",
    debit: 0,
    credit: 28500000,
    status: "Posted",
  },
  {
    id: "JE-2026-00185",
    date: "2026-06-01",
    reference: "SAL-2026-006",
    account: "5101",
    accountName: "Gaji Karyawan",
    description: "Gaji bulanan tim produksi SCW",
    debit: 125000000,
    credit: 0,
    status: "Pending",
  },
  {
    id: "JE-2026-00184",
    date: "2026-05-31",
    reference: "EXP-2026-0045",
    account: "6102",
    accountName: "Sewa Gudang",
    description: "Sewa gudang warehouse Surabaya Mei 2026",
    debit: 15000000,
    credit: 0,
    status: "Posted",
  },
  {
    id: "JE-2026-00183",
    date: "2026-05-30",
    reference: "REV-2026-0078",
    account: "4101",
    accountName: "Penjualan Produk",
    description: "Penjualan SCW Body Wash & SCW Tire Shine ke Toko Onderdil",
    debit: 0,
    credit: 67800000,
    status: "Posted",
  },
  {
    id: "JE-2026-00182",
    date: "2026-05-30",
    reference: "INV-2026-0310",
    account: "1101",
    accountName: "Kas",
    description: "Pembayaran invoice dari SPBU Jaya Abadi",
    debit: 32500000,
    credit: 0,
    status: "Posted",
  },
  {
    id: "JE-2026-00181",
    date: "2026-05-29",
    reference: "PUR-2026-0044",
    account: "6101",
    accountName: "Harga Pokok Penjualan",
    description: "Pembelian SCW Nano Coating 9H untuk stok gudang",
    debit: 85000000,
    credit: 0,
    status: "Posted",
  },
  {
    id: "JE-2026-00180",
    date: "2026-05-29",
    reference: "EXP-2026-0043",
    account: "6103",
    accountName: "Listrik & Air",
    description: "Tagihan listrik & air gudang Mei 2026",
    debit: 3750000,
    credit: 0,
    status: "Posted",
  },
  {
    id: "JE-2026-00179",
    date: "2026-05-28",
    reference: "TRF-2026-0032",
    account: "1102",
    accountName: "Bank BCA",
    description: "Transfer masuk dari distributor Bandung",
    debit: 56200000,
    credit: 0,
    status: "Draft",
  },
  {
    id: "JE-2026-00178",
    date: "2026-05-28",
    reference: "ADJ-2026-0012",
    account: "1201",
    accountName: "Persediaan Barang",
    description: "Penyesuaian stok SCW Body Polish",
    debit: 12000000,
    credit: 0,
    status: "Reversed",
  },
  {
    id: "JE-2026-00177",
    date: "2026-05-27",
    reference: "REV-2026-0075",
    account: "4101",
    accountName: "Penjualan Produk",
    description: "Penjualan SCW Leather Care ke bengkel premium",
    debit: 0,
    credit: 24300000,
    status: "Posted",
  },
  {
    id: "JE-2026-00176",
    date: "2026-05-27",
    reference: "EXP-2026-0042",
    account: "6104",
    accountName: "Marketing & Promosi",
    description: "Biaya iklan Instagram SCW detailing products",
    debit: 5000000,
    credit: 0,
    status: "Posted",
  },
]

function formatIDR(amount: number): string {
  if (amount === 0) return "-"
  return `Rp ${amount.toLocaleString("id-ID")}`
}

const accounts = [
  "All Accounts",
  "1101 - Kas",
  "1102 - Bank BCA",
  "1201 - Persediaan Barang",
  "2101 - Utang Usaha",
  "4101 - Penjualan Produk",
  "5101 - Gaji Karyawan",
  "6101 - Harga Pokok Penjualan",
  "6102 - Sewa Gudang",
  "6103 - Listrik & Air",
  "6104 - Marketing & Promosi",
]

const statuses = ["All Status", "Posted", "Draft", "Pending", "Reversed"]

export default function JournalPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Status")
  const [accountFilter, setAccountFilter] = useState("All Accounts")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  const filteredEntries = useMemo(() => {
    return journalEntries.filter((entry) => {
      const matchesSearch =
        entry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.id.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus =
        statusFilter === "All Status" || entry.status === statusFilter

      const matchesAccount =
        accountFilter === "All Accounts" ||
        `${entry.account} - ${entry.accountName}` === accountFilter

      const matchesDateFrom = !dateFrom || entry.date >= dateFrom
      const matchesDateTo = !dateTo || entry.date <= dateTo

      return (
        matchesSearch &&
        matchesStatus &&
        matchesAccount &&
        matchesDateFrom &&
        matchesDateTo
      )
    })
  }, [searchQuery, statusFilter, accountFilter, dateFrom, dateTo])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Journal Entries
          </h1>
          <p className="text-slate-500">
            Daftar entri jurnal akuntansi SCW Distribution
          </p>
        </div>
        <Link href="/accounting/journal/create">
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="mr-2 h-4 w-4" />
            New Entry
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 text-slate-400 -translate-y-1/2" />
              <Input
                placeholder="Search entries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-slate-400" />
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                placeholder="From"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">to</span>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                placeholder="To"
              />
            </div>
            <Select value={accountFilter} onValueChange={(v) => setAccountFilter(v ?? '')}>
              <SelectTrigger>
                <SelectValue placeholder="Account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((acc) => (
                  <SelectItem key={acc} value={acc}>
                    {acc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? '')}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-indigo-600" />
            Journal Entries ({filteredEntries.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Debit</TableHead>
                <TableHead className="text-right">Credit</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="text-slate-600">{entry.date}</TableCell>
                  <TableCell className="font-mono text-sm font-medium">
                    {entry.reference}
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {entry.account} - {entry.accountName}
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate text-slate-600">
                    {entry.description}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {formatIDR(entry.debit)}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {formatIDR(entry.credit)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        entry.status === "Posted"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : entry.status === "Pending"
                          ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                          : entry.status === "Draft"
                          ? "bg-slate-100 text-slate-700 hover:bg-slate-100"
                          : "bg-red-100 text-red-700 hover:bg-red-100"
                      }
                    >
                      {entry.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {filteredEntries.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                    No journal entries found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
