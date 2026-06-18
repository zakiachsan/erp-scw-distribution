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
  Receipt,
  Filter,
} from "lucide-react"

interface ReceiptItem {
  id: string
  number: string
  date: string
  cashBank: string
  description: string
  amount: number
  status: "Lunas" | "Pending" | "Dibatalkan"
}

const mockReceipts: ReceiptItem[] = [
  { id: "R-001", number: "PT.2026.06.00001", date: "2026-06-15", cashBank: "Bank BCA", description: "Pembayaran dari PT Maju Jaya - Invoice SCW Nano Coating 9H", amount: 45000000, status: "Lunas" },
  { id: "R-002", number: "PT.2026.06.00002", date: "2026-06-12", cashBank: "Bank Mandiri", description: "Pembayaran dari SPBU Jaya Abadi - SCW Body Wash", amount: 32500000, status: "Lunas" },
  { id: "R-003", number: "PT.2026.06.00003", date: "2026-06-10", cashBank: "Kas", description: "Penjualan tunai SCW Tire Shine ke Toko Onderdil", amount: 12000000, status: "Lunas" },
  { id: "R-004", number: "PT.2026.05.00004", date: "2026-05-31", cashBank: "Bank BCA", description: "Pembayaran dari AutoCare Indonesia", amount: 67800000, status: "Pending" },
  { id: "R-005", number: "PT.2026.05.00005", date: "2026-05-28", cashBank: "Kas", description: "Penjualan tunai SCW Body Polish", amount: 5500000, status: "Dibatalkan" },
  { id: "R-006", number: "PT.2026.05.00006", date: "2026-05-25", cashBank: "Bank Mandiri", description: "Setoran penjualan SCW Distribution Mei", amount: 98000000, status: "Lunas" },
]

const statusOptions = ["All", "Lunas", "Pending", "Dibatalkan"]
const cashBankOptions = ["All", "Kas", "Bank BCA", "Bank Mandiri"]

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

export default function ReceiptsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "Lunas" | "Pending" | "Dibatalkan">("all")
  const [cashBankFilter, setCashBankFilter] = useState("All")

  const filtered = useMemo(() => {
    return mockReceipts.filter((r) => {
      const matchesSearch =
        r.description.toLowerCase().includes(search.toLowerCase()) ||
        r.number.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === "all" || r.status === statusFilter
      const matchesCashBank = cashBankFilter === "All" || r.cashBank === cashBankFilter
      return matchesSearch && matchesStatus && matchesCashBank
    })
  }, [search, statusFilter, cashBankFilter])

  const totalReceipts = mockReceipts.length
  const lunasCount = mockReceipts.filter((r) => r.status === "Lunas").length
  const pendingCount = mockReceipts.filter((r) => r.status === "Pending").length
  const dibatalkanCount = mockReceipts.filter((r) => r.status === "Dibatalkan").length

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Penerimaan</h1>
          <p className="text-muted-foreground">
            Daftar penerimaan kas & bank SCW Distribution
          </p>
        </div>
        <Link href="/accounting/receipts/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Penerimaan
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
                <Receipt className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Penerimaan</p>
                <p className="text-2xl font-bold">{totalReceipts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-shadow hover:shadow-md ${statusFilter === "Lunas" ? "ring-2 ring-emerald-500" : ""}`}
          onClick={() => setStatusFilter("Lunas")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <Receipt className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Lunas</p>
                <p className="text-2xl font-bold text-emerald-600">{lunasCount}</p>
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
                <Receipt className="h-5 w-5 text-amber-600" />
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
                <Receipt className="h-5 w-5 text-red-600" />
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
              <CardTitle>Daftar Penerimaan</CardTitle>
              <CardDescription>
                {filtered.length} penerimaan ditemukan
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
              <Select value={cashBankFilter} onValueChange={(v) => setCashBankFilter(v ?? "All")}>
                <SelectTrigger className="w-40">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Kas/Bank" />
                </SelectTrigger>
                <SelectContent>
                  {cashBankOptions.map((opt) => (
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
                <TableHead className="w-[140px]">Kas/Bank</TableHead>
                <TableHead>Keterangan</TableHead>
                <TableHead className="w-[160px] text-right">Nilai</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-sans text-xs">
                    <Link
                      href={`/accounting/receipts/${r.id}`}
                      className="text-primary hover:underline"
                    >
                      {r.number}
                    </Link>
                  </TableCell>
                  <TableCell>{formatDate(r.date)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{r.cashBank}</Badge>
                  </TableCell>
                  <TableCell className="max-w-[250px] truncate">{r.description}</TableCell>
                  <TableCell className="text-right font-sans text-sm font-medium">
                    {formatIDR(r.amount)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        r.status === "Lunas"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : r.status === "Pending"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }
                    >
                      {r.status}
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
