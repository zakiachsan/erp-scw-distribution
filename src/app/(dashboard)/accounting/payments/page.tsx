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
  Landmark,
} from "lucide-react"

interface Payment {
  id: string
  date: string
  cashBank: string
  description: string
  amount: number
  status: "Lunas" | "Pending" | "Dibatalkan"
}

const payments: Payment[] = [
  { id: "PB.2026.06.00001", date: "2026-06-15", cashBank: "Bank BCA", description: "Pembayaran invoice PT Autogloss Indonesia", amount: 45000000, status: "Lunas" },
  { id: "PB.2026.06.00002", date: "2026-06-12", cashBank: "Bank Mandiri", description: "Pembelian bahan baku coating dari ChemPro Asia", amount: 28500000, status: "Lunas" },
  { id: "PB.2026.06.00003", date: "2026-06-10", cashBank: "Kas", description: "Gaji bulanan tim produksi SCW", amount: 125000000, status: "Lunas" },
  { id: "PB.2026.05.00004", date: "2026-05-31", cashBank: "Bank BCA", description: "Sewa gudang warehouse Surabaya Mei 2026", amount: 15000000, status: "Lunas" },
  { id: "PB.2026.05.00005", date: "2026-05-28", cashBank: "Kas", description: "Biaya operasional kantor SCW", amount: 8200000, status: "Pending" },
  { id: "PB.2026.05.00006", date: "2026-05-25", cashBank: "Bank Mandiri", description: "Pembayaran supplier PT ChemPro Asia batch kedua", amount: 67800000, status: "Lunas" },
  { id: "PB.2026.05.00007", date: "2026-05-20", cashBank: "Bank BCA", description: "Pembelian peralatan produksi coating line", amount: 85000000, status: "Dibatalkan" },
]

const statusConfig: Record<string, { className: string }> = {
  Lunas: { className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" },
  Pending: { className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" },
  Dibatalkan: { className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
}

type FilterValue = "all" | "lunas" | "pending" | "dibatalkan"

const formatIDR = (val: number) =>
  `Rp ${val.toLocaleString("id-ID")}`

export default function PaymentsPage() {
  const [statusFilter, setStatusFilter] = useState<FilterValue>("all")
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    return payments.filter((p) => {
      const matchStatus =
        statusFilter === "all" ||
        (statusFilter === "lunas" && p.status === "Lunas") ||
        (statusFilter === "pending" && p.status === "Pending") ||
        (statusFilter === "dibatalkan" && p.status === "Dibatalkan")
      const matchSearch =
        !search ||
        p.id.toLowerCase().includes(search.toLowerCase()) ||
        p.cashBank.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      return matchStatus && matchSearch
    })
  }, [statusFilter, search])

  const totalCount = payments.length
  const lunasCount = payments.filter((p) => p.status === "Lunas").length
  const pendingCount = payments.filter((p) => p.status === "Pending").length
  const dibatalkanCount = payments.filter((p) => p.status === "Dibatalkan").length

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pembayaran</h1>
          <p className="text-muted-foreground">
            Daftar pembayaran kas & bank SCW Distribution
          </p>
        </div>
        <Link href="/accounting/payments/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Pembayaran
          </Button>
        </Link>
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
                <Landmark className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Pembayaran</p>
                <p className="text-2xl font-bold">{totalCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-shadow hover:shadow-md ${statusFilter === "lunas" ? "ring-2 ring-emerald-500" : ""}`}
          onClick={() => setStatusFilter("lunas")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <Landmark className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Lunas</p>
                <p className="text-2xl font-bold text-emerald-600">{lunasCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-shadow hover:shadow-md ${statusFilter === "pending" ? "ring-2 ring-amber-500" : ""}`}
          onClick={() => setStatusFilter("pending")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                <Landmark className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-shadow hover:shadow-md ${statusFilter === "dibatalkan" ? "ring-2 ring-red-500" : ""}`}
          onClick={() => setStatusFilter("dibatalkan")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                <Landmark className="h-5 w-5 text-red-600" />
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
              <CardTitle>Daftar Pembayaran</CardTitle>
              <CardDescription>
                {filtered.length} pembayaran ditemukan
                {statusFilter !== "all" && (
                  <span className="ml-1 capitalize">
                    ({statusFilter === "lunas" ? "Lunas" : statusFilter === "pending" ? "Pending" : "Dibatalkan"})
                  </span>
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
                  placeholder="Cari nomor / kas / keterangan..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-64 pl-9"
                />
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
                <TableHead>Kas/Bank</TableHead>
                <TableHead>Keterangan</TableHead>
                <TableHead className="text-right">Nilai</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12">
                    <p className="text-muted-foreground">Tidak ada pembayaran ditemukan</p>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((p) => (
                  <TableRow key={p.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell>
                      <Link
                        href={`/accounting/payments/${p.id}`}
                        className="text-primary hover:underline"
                      >
                        {p.id}
                      </Link>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{p.date}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{p.cashBank}</Badge>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/accounting/payments/${p.id}`}
                        className="text-primary hover:underline"
                      >
                        {p.description}
                      </Link>
                    </TableCell>
                    <TableCell className="text-right font-medium">{formatIDR(p.amount)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
