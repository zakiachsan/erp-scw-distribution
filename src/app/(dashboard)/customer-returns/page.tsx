"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, RotateCcw, Search, X, Clock, CheckCircle2, Package, XCircle } from "lucide-react"

const formatIDR = (val: number) => `Rp ${val.toLocaleString("id-ID")}`

interface CustomerReturn {
  id: string
  soRef: string
  customer: string
  date: string
  reason: string
  status: "Pending Review" | "Approved" | "Rejected" | "Completed"
  items: number
  totalValue: number
}

const returns: CustomerReturn[] = [
  { id: "RTN-2026-005", soRef: "SO-2026-041", customer: "PT Autogloss Indonesia", date: "2026-06-10", reason: "Barang cacat", status: "Pending Review", items: 2, totalValue: 300000 },
  { id: "RTN-2026-004", soRef: "SO-2026-038", customer: "GlossUp Bali", date: "2026-06-05", reason: "Salah kirim", status: "Approved", items: 1, totalValue: 250000 },
  { id: "RTN-2026-003", soRef: "SO-2026-036", customer: "CV Ceramic Pro JKT", date: "2026-06-01", reason: "Rusak saat pengiriman", status: "Completed", items: 3, totalValue: 420000 },
  { id: "RTN-2026-002", soRef: "SO-2026-035", customer: "UD Shinemax", date: "2026-05-28", reason: "Tidak sesuai pesanan", status: "Rejected", items: 1, totalValue: 150000 },
  { id: "RTN-2026-001", soRef: "SO-2026-033", customer: "CV ProShine SBY", date: "2026-05-20", reason: "Barang cacat", status: "Completed", items: 2, totalValue: 195000 },
]

const statusConfig: Record<string, { className: string; icon: React.ReactNode; label: string }> = {
  "Pending Review": { className: "bg-amber-100 text-amber-800", icon: <Clock className="h-3 w-3" />, label: "Pending Review" },
  Approved:         { className: "bg-blue-100 text-blue-800",   icon: <CheckCircle2 className="h-3 w-3" />, label: "Approved" },
  Rejected:         { className: "bg-red-100 text-red-800",     icon: <XCircle className="h-3 w-3" />, label: "Rejected" },
  Completed:        { className: "bg-emerald-100 text-emerald-800", icon: <CheckCircle2 className="h-3 w-3" />, label: "Completed" },
}

export default function CustomerReturnsPage() {
  const [statusFilter, setStatusFilter] = useState("All")
  const [search, setSearch] = useState("")
  const router = useRouter()

  const filtered = useMemo(() => {
    return returns.filter((r) => {
      const matchStatus = statusFilter === "All" || r.status === statusFilter
      const matchSearch = !search ||
        r.id.toLowerCase().includes(search.toLowerCase()) ||
        r.customer.toLowerCase().includes(search.toLowerCase())
      return matchStatus && matchSearch
    })
  }, [statusFilter, search])

  const totalReturns = returns.length
  const pendingCount = returns.filter((r) => r.status === "Pending Review").length
  const completedCount = returns.filter((r) => r.status === "Completed").length

  return (
    <div className="space-y-4 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Customer Returns</h1>
          <p className="text-xs text-gray-500">Kelola retur barang dari customer</p>
        </div>
        <Link href="/customer-returns/create">
          <Button size="sm">
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Buat Retur
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                <RotateCcw className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Returns</p>
                <p className="text-2xl">{totalReturns}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-2xl">{pendingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl">{completedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {/* Filter bar */}
          <div className="flex items-center gap-3 border-b px-4 py-2.5">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Cari Return ID atau customer..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-8 pl-8 text-sm" />
            </div>
            <div className="flex items-center gap-1.5">
              {(["All", "Pending Review", "Approved", "Rejected", "Completed"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`rounded-md border px-2 py-1 text-[11px] font-medium transition-all ${
                    statusFilter === s
                      ? s === "All" ? "border-indigo-300 bg-indigo-50 text-indigo-700"
                        : "border-blue-300 bg-blue-50 text-blue-700"
                      : "border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {s === "All" ? "Semua" : s}
                </button>
              ))}
              {statusFilter !== "All" && (
                <button onClick={() => setStatusFilter("All")} className="rounded-md px-1 text-gray-400 hover:text-gray-600">
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Return ID</TableHead>
                  <TableHead>SO Ref</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Return Date</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Items</TableHead>
                  <TableHead className="text-right">Total Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-10 text-sm text-muted-foreground">
                      Tidak ada Customer Return ditemukan
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((ret) => (
                    <TableRow
                      key={ret.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => router.push(`/customer-returns/${ret.id}`)}
                    >
                      <TableCell className="text-xs font-medium text-blue-600 hover:underline">{ret.id}</TableCell>
                      <TableCell className="text-xs">
                        <Link href={`/sales/orders/${ret.soRef}`} onClick={(e) => e.stopPropagation()} className="text-blue-600 hover:underline">
                          {ret.soRef}
                        </Link>
                      </TableCell>
                      <TableCell className="text-sm">{ret.customer}</TableCell>
                      <TableCell className="text-sm">{ret.date}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{ret.reason}</TableCell>
                      <TableCell>
                        <Badge className={`${statusConfig[ret.status].className} text-[10px] flex items-center gap-1 w-fit`}>
                          {statusConfig[ret.status].icon}
                          {statusConfig[ret.status].label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-center">{ret.items}</TableCell>
                      <TableCell className="text-right text-sm">{formatIDR(ret.totalValue)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
