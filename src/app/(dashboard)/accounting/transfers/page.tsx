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
  ArrowRightLeft,
  Filter,
} from "lucide-react"

interface Transfer {
  id: string
  number: string
  date: string
  fromBank: string
  toBank: string
  description: string
  amount: number
  status: "Berhasil" | "Pending" | "Dibatalkan"
}

const mockTransfers: Transfer[] = [
  { id: "T-001", number: "TF.2026.06.00001", date: "2026-06-15", fromBank: "Bank BCA", toBank: "Bank Mandiri", description: "Transfer operasional ke rekening kerja", amount: 50000000, status: "Berhasil" },
  { id: "T-002", number: "TF.2026.06.00002", date: "2026-06-12", fromBank: "Bank Mandiri", toBank: "Bank BCA", description: "Transfer pembayaran supplier batch kedua", amount: 28500000, status: "Berhasil" },
  { id: "T-003", number: "TF.2026.06.00003", date: "2026-06-10", fromBank: "Bank BCA", toBank: "Kas", description: "Setor tunai untuk operasional harian", amount: 15000000, status: "Berhasil" },
  { id: "T-004", number: "TF.2026.05.00004", date: "2026-05-31", fromBank: "Kas", toBank: "Bank BCA", description: "Setoran kas ke rekening BCA", amount: 32500000, status: "Pending" },
  { id: "T-005", number: "TF.2026.05.00005", date: "2026-05-28", fromBank: "Bank BCA", toBank: "Bank Mandiri", description: "Transfer pembayaran gaji karyawan", amount: 125000000, status: "Dibatalkan" },
  { id: "T-006", number: "TF.2026.05.00006", date: "2026-05-25", fromBank: "Bank Mandiri", toBank: "Bank BCA", description: "Transfer dana investasi peralatan", amount: 85000000, status: "Berhasil" },
]

const bankOptions = ["All", "Kas", "Bank BCA", "Bank Mandiri"]

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

export default function TransfersPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "Berhasil" | "Pending" | "Dibatalkan">("all")
  const [bankFilter, setBankFilter] = useState("All")

  const filtered = useMemo(() => {
    return mockTransfers.filter((t) => {
      const matchesSearch =
        t.description.toLowerCase().includes(search.toLowerCase()) ||
        t.number.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === "all" || t.status === statusFilter
      const matchesBank = bankFilter === "All" || t.fromBank === bankFilter || t.toBank === bankFilter
      return matchesSearch && matchesStatus && matchesBank
    })
  }, [search, statusFilter, bankFilter])

  const totalTransfers = mockTransfers.length
  const berhasilCount = mockTransfers.filter((t) => t.status === "Berhasil").length
  const pendingCount = mockTransfers.filter((t) => t.status === "Pending").length
  const dibatalkanCount = mockTransfers.filter((t) => t.status === "Dibatalkan").length

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transfer Bank</h1>
          <p className="text-muted-foreground">
            Daftar transfer antar rekening bank SCW Distribution
          </p>
        </div>
        <Link href="/accounting/transfers/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Transfer
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card
          className={`cursor-pointer transition-shadow hover:shadow-md ${statusFilter === "all" ? "ring-2 ring-indigo-500" : ""}`}
          onClick={() => setStatusFilter("all")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                <ArrowRightLeft className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Transfer</p>
                <p className="text-2xl font-bold">{totalTransfers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-shadow hover:shadow-md ${statusFilter === "Berhasil" ? "ring-2 ring-emerald-500" : ""}`}
          onClick={() => setStatusFilter("Berhasil")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <ArrowRightLeft className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Berhasil</p>
                <p className="text-2xl font-bold text-emerald-600">{berhasilCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-shadow hover:shadow-md ${statusFilter === "Pending" ? "ring-2 ring-amber-500" : ""}`}
          onClick={() => setStatusFilter("Pending")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                <ArrowRightLeft className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
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
                <ArrowRightLeft className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Dibatalkan</p>
                <p className="text-2xl font-bold text-red-600">{dibatalkanCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Daftar Transfer</CardTitle>
              <CardDescription>
                {filtered.length} transfer ditemukan
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
                  placeholder="Cari nomor atau keterangan..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-64 pl-9"
                />
              </div>
              <Select value={bankFilter} onValueChange={(v) => setBankFilter(v ?? "All")}>
                <SelectTrigger className="w-40">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Bank" />
                </SelectTrigger>
                <SelectContent>
                  {bankOptions.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Nomor #</TableHead>
                <TableHead className="w-[120px]">Tanggal</TableHead>
                <TableHead className="w-[130px]">Dari Bank</TableHead>
                <TableHead className="w-[130px]">Ke Bank</TableHead>
                <TableHead>Keterangan</TableHead>
                <TableHead className="w-[160px] text-right">Total</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-sans text-xs">
                    <Link
                      href={`/accounting/transfers/${t.id}`}
                      className="text-primary hover:underline"
                    >
                      {t.number}
                    </Link>
                  </TableCell>
                  <TableCell>{formatDate(t.date)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{t.fromBank}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{t.toBank}</Badge>
                  </TableCell>
                  <TableCell className="max-w-[250px] truncate">{t.description}</TableCell>
                  <TableCell className="text-right font-sans text-sm font-medium">
                    {formatIDR(t.amount)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        t.status === "Berhasil"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : t.status === "Pending"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }
                    >
                      {t.status}
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
