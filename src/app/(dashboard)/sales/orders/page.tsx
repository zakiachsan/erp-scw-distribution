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
import { Plus, ShoppingCart, Search, X, Clock, CheckCircle2, Package, Truck } from "lucide-react"

const formatIDR = (val: number) => `Rp ${val.toLocaleString("id-ID")}`

interface SalesOrder {
  id: string
  quotationRef: string
  customer: string
  date: string
  status: "Draft" | "Confirmed" | "Processing" | "Approved" | "Packing" | "Shipped" | "Completed"
  total: number
  paymentStatus: "Unpaid" | "Partial" | "Paid"
}

const orders: SalesOrder[] = [
  { id: "SO-2026-045", quotationRef: "QUO-2026-012", customer: "PT Autogloss Indonesia", date: "2026-06-15", status: "Confirmed", total: 8500000, paymentStatus: "Unpaid" },
  { id: "SO-2026-044", quotationRef: "QUO-2026-011", customer: "CV Ceramic Pro JKT", date: "2026-06-12", status: "Processing", total: 6200000, paymentStatus: "Partial" },
  { id: "SO-2026-043", quotationRef: "QUO-2026-010", customer: "UD Shinemax", date: "2026-06-10", status: "Packing", total: 4500000, paymentStatus: "Paid" },
  { id: "SO-2026-042", quotationRef: "QUO-2026-009", customer: "PT DetailWorks BDG", date: "2026-06-08", status: "Approved", total: 7200000, paymentStatus: "Paid" },
  { id: "SO-2026-041", quotationRef: "QUO-2026-008", customer: "PT Autogloss Indonesia", date: "2026-06-05", status: "Shipped", total: 8500000, paymentStatus: "Paid" },
  { id: "SO-2026-040", quotationRef: "QUO-2026-007", customer: "CV ProShine SBY", date: "2026-06-03", status: "Completed", total: 5800000, paymentStatus: "Paid" },
  { id: "SO-2026-039", quotationRef: "QUO-2026-006", customer: "AutoCare Makassar", date: "2026-06-01", status: "Draft", total: 3200000, paymentStatus: "Unpaid" },
  { id: "SO-2026-038", quotationRef: "QUO-2026-005", customer: "GlossUp Bali", date: "2026-05-28", status: "Completed", total: 6200000, paymentStatus: "Paid" },
  { id: "SO-2026-037", quotationRef: "QUO-2026-004", customer: "DetailPro Semarang", date: "2026-05-25", status: "Completed", total: 2800000, paymentStatus: "Paid" },
  { id: "SO-2026-036", quotationRef: "QUO-2026-003", customer: "CV Ceramic Pro JKT", date: "2026-05-22", status: "Completed", total: 4100000, paymentStatus: "Paid" },
]

const statusConfig: Record<string, { className: string; icon: React.ReactNode; label: string }> = {
  Draft:     { className: "bg-gray-100 text-gray-800",   icon: <Clock className="h-3 w-3" />, label: "Draft" },
  Confirmed: { className: "bg-blue-100 text-blue-800",   icon: <CheckCircle2 className="h-3 w-3" />, label: "Confirmed" },
  Processing:{ className: "bg-amber-100 text-amber-800", icon: <Clock className="h-3 w-3" />, label: "Processing" },
  Approved:  { className: "bg-emerald-100 text-emerald-800", icon: <CheckCircle2 className="h-3 w-3" />, label: "Approved" },
  Packing:   { className: "bg-violet-100 text-violet-800", icon: <Package className="h-3 w-3" />, label: "Packing" },
  Shipped:   { className: "bg-cyan-100 text-cyan-800",   icon: <Truck className="h-3 w-3" />, label: "Shipped" },
  Completed: { className: "bg-emerald-100 text-emerald-800", icon: <CheckCircle2 className="h-3 w-3" />, label: "Completed" },
}

const paymentConfig: Record<string, { className: string }> = {
  Unpaid:  { className: "bg-red-100 text-red-800" },
  Partial: { className: "bg-amber-100 text-amber-800" },
  Paid:    { className: "bg-emerald-100 text-emerald-800" },
}

// Flow steps
const flowSteps = [
  { key: "Draft",      label: "Draft" },
  { key: "Confirmed",  label: "Confirmed" },
  { key: "Processing", label: "Payment Verified" },
  { key: "Approved",   label: "Finance Approved" },
  { key: "Packing",    label: "Warehouse Packing" },
  { key: "Shipped",    label: "Shipped" },
  { key: "Completed",  label: "Completed" },
]

export default function SalesOrdersPage() {
  const [orderList, setOrderList] = useState(orders)
  const [statusFilter, setStatusFilter] = useState("All")
  const [search, setSearch] = useState("")
  const router = useRouter()

  const filtered = useMemo(() => {
    return orderList.filter((o) => {
      const matchStatus = statusFilter === "All" || o.status === statusFilter
      const matchSearch = !search ||
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.customer.toLowerCase().includes(search.toLowerCase()) ||
        o.quotationRef.toLowerCase().includes(search.toLowerCase())
      return matchStatus && matchSearch
    })
  }, [statusFilter, search, orderList])

  const totalValue = filtered.reduce((sum, o) => sum + o.total, 0)
  const pendingCount = orderList.filter((o) => ["Draft", "Confirmed", "Processing"].includes(o.status)).length
  const packingCount = orderList.filter((o) => o.status === "Packing").length

  return (
    <div className="space-y-4 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Sales Orders</h1>
          <p className="text-xs text-gray-500">Kelola sales order dari quotation hingga pengiriman</p>
        </div>
        <Link href="/sales/orders/create">
          <Button size="sm">
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Buat Sales Order
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                <ShoppingCart className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl">{formatIDR(totalValue)}</p>
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
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl">{pendingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100">
                <Package className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Packing</p>
                <p className="text-2xl">{packingCount}</p>
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
              <Input placeholder="Cari SO number, quotation, atau customer..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-8 pl-8 text-sm" />
            </div>
            <div className="flex items-center gap-1.5">
              {(["All", "Draft", "Confirmed", "Processing", "Approved", "Packing", "Shipped", "Completed"] as const).map((s) => (
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
                  <TableHead>SO Number</TableHead>
                  <TableHead>Quotation Ref</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-sm text-muted-foreground">
                      Tidak ada Sales Order ditemukan
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((order) => (
                    <TableRow
                      key={order.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => router.push(`/sales/orders/${order.id}`)}
                    >
                      <TableCell className="text-xs font-medium text-blue-600 hover:underline">{order.id}</TableCell>
                      <TableCell className="text-xs">
                        <Link href={`/sales/quotations/${order.quotationRef}`} onClick={(e) => e.stopPropagation()} className="text-blue-600 hover:underline">
                          {order.quotationRef}
                        </Link>
                      </TableCell>
                      <TableCell className="text-sm">{order.customer}</TableCell>
                      <TableCell className="text-sm">{order.date}</TableCell>
                      <TableCell>
                        <Badge className={`${statusConfig[order.status].className} text-[10px] flex items-center gap-1 w-fit`}>
                          {statusConfig[order.status].icon}
                          {statusConfig[order.status].label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${paymentConfig[order.paymentStatus].className} text-[10px]`}>
                          {order.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-sm">{formatIDR(order.total)}</TableCell>
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
