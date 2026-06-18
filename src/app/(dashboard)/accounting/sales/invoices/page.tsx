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
  FileText,
} from "lucide-react"

interface Invoice {
  id: string
  date: string
  customer: string
  status: "Draft" | "Sent" | "Paid" | "Overdue"
  total: number
  dueDate: string
}

const invoices: Invoice[] = [
  { id: "INV.2026.06.00001", date: "2026-06-18", customer: "PT Autogloss Indonesia", status: "Draft", total: 12500000, dueDate: "2026-07-18" },
  { id: "INV.2026.06.00002", date: "2026-06-17", customer: "CV Ceramic Pro JKT", status: "Sent", total: 8750000, dueDate: "2026-07-17" },
  { id: "INV.2026.06.00003", date: "2026-06-15", customer: "PT DetailWorks BDG", status: "Paid", total: 15600000, dueDate: "2026-07-15" },
  { id: "INV.2026.06.00004", date: "2026-06-12", customer: "GlossUp Bali", status: "Paid", total: 9450000, dueDate: "2026-07-12" },
  { id: "INV.2026.06.00005", date: "2026-06-10", customer: "PT Autogloss Indonesia", status: "Paid", total: 22000000, dueDate: "2026-07-10" },
  { id: "INV.2026.06.00006", date: "2026-06-08", customer: "CV ProShine SBY", status: "Overdue", total: 6300000, dueDate: "2026-06-08" },
  { id: "INV.2026.06.00007", date: "2026-06-05", customer: "DetailPro Semarang", status: "Paid", total: 3150000, dueDate: "2026-07-05" },
  { id: "INV.2026.06.00008", date: "2026-06-03", customer: "UD Shinemax", status: "Paid", total: 4200000, dueDate: "2026-07-03" },
  { id: "INV.2026.06.00009", date: "2026-06-01", customer: "AutoCare Makassar", status: "Sent", total: 2800000, dueDate: "2026-07-01" },
  { id: "INV.2026.06.00010", date: "2026-05-28", customer: "CV Ceramic Pro JKT", status: "Paid", total: 5400000, dueDate: "2026-06-28" },
]

const statusConfig: Record<string, { className: string }> = {
  Draft: { className: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400" },
  Sent: { className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
  Paid: { className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" },
  Overdue: { className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
}

type FilterValue = "all" | "paid" | "unpaid" | "overdue"

const formatIDR = (val: number) =>
  `Rp ${val.toLocaleString("id-ID")}`

export default function InvoicesPage() {
  const [statusFilter, setStatusFilter] = useState<FilterValue>("all")
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    return invoices.filter((i) => {
      const matchStatus =
        statusFilter === "all" ||
        (statusFilter === "paid" && i.status === "Paid") ||
        (statusFilter === "unpaid" && (i.status === "Draft" || i.status === "Sent")) ||
        (statusFilter === "overdue" && i.status === "Overdue")
      const matchSearch =
        !search ||
        i.id.toLowerCase().includes(search.toLowerCase()) ||
        i.customer.toLowerCase().includes(search.toLowerCase())
      return matchStatus && matchSearch
    })
  }, [statusFilter, search])

  const totalCount = invoices.length
  const paidCount = invoices.filter((i) => i.status === "Paid").length
  const unpaidCount = invoices.filter((i) => i.status === "Draft" || i.status === "Sent").length
  const overdueCount = invoices.filter((i) => i.status === "Overdue").length

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Faktur Penjualan</h1>
          <p className="text-muted-foreground">
            Daftar faktur penjualan dan pelunasan
          </p>
        </div>
        <Link href="/accounting/sales/invoices/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Buat Faktur
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
                <FileText className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Faktur</p>
                <p className="text-2xl font-bold">{totalCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-shadow hover:shadow-md ${statusFilter === "paid" ? "ring-2 ring-emerald-500" : ""}`}
          onClick={() => setStatusFilter("paid")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <FileText className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Lunas</p>
                <p className="text-2xl font-bold text-emerald-600">{paidCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-shadow hover:shadow-md ${statusFilter === "unpaid" ? "ring-2 ring-amber-500" : ""}`}
          onClick={() => setStatusFilter("unpaid")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                <FileText className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Belum Lunas</p>
                <p className="text-2xl font-bold text-amber-600">{unpaidCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-shadow hover:shadow-md ${statusFilter === "overdue" ? "ring-2 ring-red-500" : ""}`}
          onClick={() => setStatusFilter("overdue")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                <FileText className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Jatuh Tempo</p>
                <p className="text-2xl font-bold text-red-600">{overdueCount}</p>
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
              <CardTitle>Daftar Faktur</CardTitle>
              <CardDescription>
                {filtered.length} faktur ditemukan
                {statusFilter !== "all" && (
                  <span className="ml-1 capitalize">
                    ({statusFilter === "paid" ? "Lunas" : statusFilter === "unpaid" ? "Belum Lunas" : "Jatuh Tempo"})
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
                  placeholder="Cari nomor / pelanggan..."
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
                <TableHead>Pelanggan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Jatuh Tempo</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12">
                    <p className="text-muted-foreground">Tidak ada faktur ditemukan</p>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((inv) => (
                  <TableRow key={inv.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell>
                      <Link
                        href={`/accounting/sales/invoices/${inv.id}`}
                        className="text-primary hover:underline"
                      >
                        {inv.id}
                      </Link>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{inv.date}</TableCell>
                    <TableCell>
                      <Link
                        href={`/accounting/sales/invoices/${inv.id}`}
                        className="text-primary hover:underline"
                      >
                        {inv.customer}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusConfig[inv.status].className}>
                        {inv.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{inv.dueDate}</TableCell>
                    <TableCell className="text-right font-medium">{formatIDR(inv.total)}</TableCell>
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
