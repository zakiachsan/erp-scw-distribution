"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, ShoppingCart, Search, X } from "lucide-react"

const formatIDR = (val: number) => `Rp ${val.toLocaleString("id-ID")}`

interface SalesOrder {
  id: string
  customer: string
  date: string
  status: "Draft" | "Confirmed" | "Processing" | "Shipped" | "Completed"
  total: number
}

const orders: SalesOrder[] = [
  { id: "SO-2026-045", customer: "PT Autogloss Indonesia", date: "2026-06-01", status: "Confirmed", total: 8500000 },
  { id: "SO-2026-044", customer: "CV Ceramic Pro JKT", date: "2026-05-30", status: "Processing", total: 6200000 },
  { id: "SO-2026-043", customer: "UD Shinemax", date: "2026-05-28", status: "Shipped", total: 4500000 },
  { id: "SO-2026-042", customer: "PT DetailWorks BDG", date: "2026-05-25", status: "Completed", total: 7200000 },
  { id: "SO-2026-041", customer: "PT Autogloss Indonesia", date: "2026-05-20", status: "Completed", total: 8500000 },
  { id: "SO-2026-040", customer: "CV ProShine SBY", date: "2026-05-18", status: "Shipped", total: 5800000 },
  { id: "SO-2026-039", customer: "AutoCare Makassar", date: "2026-05-15", status: "Draft", total: 3200000 },
  { id: "SO-2026-038", customer: "GlossUp Bali", date: "2026-05-12", status: "Completed", total: 6200000 },
  { id: "SO-2026-037", customer: "DetailPro Semarang", date: "2026-05-10", status: "Completed", total: 2800000 },
  { id: "SO-2026-036", customer: "CV Ceramic Pro JKT", date: "2026-05-08", status: "Completed", total: 4100000 },
]

const statusConfig: Record<string, { className: string }> = {
  Draft: { className: "bg-gray-100 text-gray-800" },
  Confirmed: { className: "bg-blue-100 text-blue-800" },
  Processing: { className: "bg-amber-100 text-amber-800" },
  Shipped: { className: "bg-violet-100 text-violet-800" },
  Completed: { className: "bg-emerald-100 text-emerald-800" },
}

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
        o.customer.toLowerCase().includes(search.toLowerCase())
      return matchStatus && matchSearch
    })
  }, [statusFilter, search, orderList])

  const totalValue = filtered.reduce((sum, o) => sum + o.total, 0)
  const pendingCount = orderList.filter((o) => ["Draft", "Confirmed", "Processing"].includes(o.status)).length

  return (
    <div className="space-y-4 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Purchase Orders</h1>
          <p className="text-xs text-gray-500">Manage purchase orders and track fulfillment status</p>
        </div>
        <Link href="/sales/orders/create">
          <Button size="sm">
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Create PO
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
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl">{filtered.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <ShoppingCart className="h-5 w-5 text-emerald-600" />
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
                <ShoppingCart className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl">{pendingCount}</p>
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
              <Input placeholder="Cari PO number atau customer..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-8 pl-8 text-sm" />
            </div>
            <div className="flex items-center gap-1.5">
              {(["All", "Draft", "Confirmed", "Processing", "Shipped", "Completed"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`rounded-md border px-2 py-1 text-[11px] font-medium transition-all ${
                    statusFilter === s
                      ? s === "All" ? "border-indigo-300 bg-indigo-50 text-indigo-700"
                        : s === "Draft" ? "border-gray-300 bg-gray-100 text-gray-700"
                        : s === "Confirmed" ? "border-blue-300 bg-blue-50 text-blue-700"
                        : s === "Processing" ? "border-amber-300 bg-amber-50 text-amber-700"
                        : s === "Shipped" ? "border-violet-300 bg-violet-50 text-violet-700"
                        : "border-emerald-300 bg-emerald-50 text-emerald-700"
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
                  <TableHead>PO Number</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-sm text-muted-foreground">
                      Tidak ada PO ditemukan
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((order) => (
                    <TableRow
                      key={order.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => router.push(`/sales/orders/${order.id}`)}
                    >
                      <TableCell className="text-xs">{order.id}</TableCell>
                      <TableCell className="text-sm">{order.customer}</TableCell>
                      <TableCell className="text-sm">{order.date}</TableCell>
                      <TableCell>
                        <select
                          value={order.status}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => {
                            const newStatus = e.target.value as SalesOrder["status"]
                            setOrderList((prev) =>
                              prev.map((o) => (o.id === order.id ? { ...o, status: newStatus } : o))
                            )
                          }}
                          className={`cursor-pointer rounded-full border-0 px-2 py-0.5 text-xs font-medium outline-none transition-colors hover:opacity-80 ${statusConfig[order.status].className}`}
                        >
                          <option value="Draft">Draft</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Completed">Completed</option>
                        </select>
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
