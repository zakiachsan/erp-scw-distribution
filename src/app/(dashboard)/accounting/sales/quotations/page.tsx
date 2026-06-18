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

interface Quotation {
  id: string
  date: string
  customer: string
  status: "Draft" | "Approved" | "Rejected" | "Expired"
  total: number
}

const quotations: Quotation[] = [
  { id: "SQ.2026.06.00001", date: "2026-06-18", customer: "PT Autogloss Indonesia", status: "Draft", total: 12500000 },
  { id: "SQ.2026.06.00002", date: "2026-06-17", customer: "CV Ceramic Pro JKT", status: "Approved", total: 8750000 },
  { id: "SQ.2026.06.00003", date: "2026-06-16", customer: "UD Shinemax", status: "Draft", total: 4200000 },
  { id: "SQ.2026.06.00004", date: "2026-06-15", customer: "PT DetailWorks BDG", status: "Approved", total: 15600000 },
  { id: "SQ.2026.06.00005", date: "2026-06-14", customer: "CV ProShine SBY", status: "Rejected", total: 6300000 },
  { id: "SQ.2026.06.00006", date: "2026-06-12", customer: "AutoCare Makassar", status: "Expired", total: 2800000 },
  { id: "SQ.2026.06.00007", date: "2026-06-10", customer: "GlossUp Bali", status: "Approved", total: 9450000 },
  { id: "SQ.2026.06.00008", date: "2026-06-08", customer: "DetailPro Semarang", status: "Draft", total: 3150000 },
  { id: "SQ.2026.06.00009", date: "2026-06-05", customer: "PT Autogloss Indonesia", status: "Approved", total: 22000000 },
  { id: "SQ.2026.06.00010", date: "2026-06-03", customer: "CV Ceramic Pro JKT", status: "Rejected", total: 7800000 },
]

const statusConfig: Record<string, { className: string }> = {
  Draft: { className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" },
  Approved: { className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" },
  Rejected: { className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
  Expired: { className: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400" },
}

type FilterValue = "all" | "approved" | "draft" | "rejected"

const formatIDR = (val: number) =>
  `Rp ${val.toLocaleString("id-ID")}`

export default function QuotationsPage() {
  const [statusFilter, setStatusFilter] = useState<FilterValue>("all")
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    return quotations.filter((q) => {
      const matchStatus =
        statusFilter === "all" ||
        (statusFilter === "approved" && q.status === "Approved") ||
        (statusFilter === "draft" && q.status === "Draft") ||
        (statusFilter === "rejected" && (q.status === "Rejected" || q.status === "Expired"))
      const matchSearch =
        !search ||
        q.id.toLowerCase().includes(search.toLowerCase()) ||
        q.customer.toLowerCase().includes(search.toLowerCase())
      return matchStatus && matchSearch
    })
  }, [statusFilter, search])

  const totalCount = quotations.length
  const approvedCount = quotations.filter((q) => q.status === "Approved").length
  const draftCount = quotations.filter((q) => q.status === "Draft").length
  const rejectedCount = quotations.filter((q) => q.status === "Rejected" || q.status === "Expired").length

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Penawaran Penjualan</h1>
          <p className="text-muted-foreground">
            Daftar penawaran penjualan kepada pelanggan
          </p>
        </div>
        <Link href="/accounting/sales/quotations/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Buat Penawaran
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
                <p className="text-sm text-muted-foreground">Total Penawaran</p>
                <p className="text-2xl font-bold">{totalCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-shadow hover:shadow-md ${statusFilter === "approved" ? "ring-2 ring-emerald-500" : ""}`}
          onClick={() => setStatusFilter("approved")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <FileText className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Disetujui</p>
                <p className="text-2xl font-bold text-emerald-600">{approvedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-shadow hover:shadow-md ${statusFilter === "draft" ? "ring-2 ring-amber-500" : ""}`}
          onClick={() => setStatusFilter("draft")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                <FileText className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Draft</p>
                <p className="text-2xl font-bold text-amber-600">{draftCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-shadow hover:shadow-md ${statusFilter === "rejected" ? "ring-2 ring-red-500" : ""}`}
          onClick={() => setStatusFilter("rejected")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                <FileText className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Dibatalkan</p>
                <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
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
              <CardTitle>Daftar Penawaran</CardTitle>
              <CardDescription>
                {filtered.length} penawaran ditemukan
                {statusFilter !== "all" && (
                  <span className="ml-1 capitalize">
                    ({statusFilter === "approved" ? "Disetujui" : statusFilter === "draft" ? "Draft" : "Dibatalkan"})
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
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12">
                    <p className="text-muted-foreground">Tidak ada penawaran ditemukan</p>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((q) => (
                  <TableRow key={q.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell>
                      <Link
                        href={`/accounting/sales/quotations/${q.id}`}
                        className="text-primary hover:underline"
                      >
                        {q.id}
                      </Link>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{q.date}</TableCell>
                    <TableCell>
                      <Link
                        href={`/accounting/sales/quotations/${q.id}`}
                        className="text-primary hover:underline"
                      >
                        {q.customer}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusConfig[q.status].className}>
                        {q.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">{formatIDR(q.total)}</TableCell>
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
