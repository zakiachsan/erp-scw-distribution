"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
  Eye,
  ShoppingCart,
  ClipboardList,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react"

interface Order {
  id: string
  customer: string
  email: string
  items: number
  total: number
  status: "pending" | "processing" | "shipped" | "completed" | "cancelled"
  payment: string
  date: string
}

const orders: Order[] = [
  { id: "ECO-2026-0156", customer: "Ahmad Fauzi", email: "ahmad@gmail.com", items: 3, total: 425000, status: "pending", payment: "Bank Transfer", date: "2026-06-01" },
  { id: "ECO-2026-0155", customer: "Siti Nurhaliza", email: "siti@gmail.com", items: 1, total: 450000, status: "pending", payment: "GoPay", date: "2026-06-01" },
  { id: "ECO-2026-0154", customer: "Budi Hartono", email: "budi@outlook.com", items: 5, total: 875000, status: "processing", payment: "Bank Transfer", date: "2026-05-30" },
  { id: "ECO-2026-0153", customer: "Rina Wijaya", email: "rina@yahoo.com", items: 2, total: 210000, status: "processing", payment: "Credit Card", date: "2026-05-29" },
  { id: "ECO-2026-0152", customer: "Dedi Kurniawan", email: "dedi@gmail.com", items: 4, total: 680000, status: "shipped", payment: "Bank Transfer", date: "2026-05-28" },
  { id: "ECO-2026-0151", customer: "Maya Putri", email: "maya@gmail.com", items: 2, total: 320000, status: "shipped", payment: "OVO", date: "2026-05-27" },
  { id: "ECO-2026-0150", customer: "Hendra Gunawan", email: "hendra@gmail.com", items: 6, total: 950000, status: "completed", payment: "Bank Transfer", date: "2026-05-25" },
  { id: "ECO-2026-0149", customer: "Rizky Firmansyah", email: "rizky@gmail.com", items: 1, total: 85000, status: "completed", payment: "GoPay", date: "2026-05-24" },
  { id: "ECO-2026-0148", customer: "Anisa Rahmawati", email: "anisa@gmail.com", items: 3, total: 540000, status: "completed", payment: "Bank Transfer", date: "2026-05-22" },
  { id: "ECO-2026-0147", customer: "Fajar Nugroho", email: "fajar@gmail.com", items: 2, total: 275000, status: "cancelled", payment: "Credit Card", date: "2026-05-20" },
  { id: "ECO-2026-0146", customer: "Dewi Lestari", email: "dewi@gmail.com", items: 4, total: 615000, status: "cancelled", payment: "Bank Transfer", date: "2026-05-18" },
  { id: "ECO-2026-0145", customer: "Arif Setiawan", email: "arif@gmail.com", items: 1, total: 399000, status: "completed", payment: "OVO", date: "2026-05-15" },
]

const formatRupiah = (amount: number) =>
  `Rp ${amount.toLocaleString("id-ID")}`

const statusConfig: Record<string, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" },
  processing: { label: "Diproses", className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
  shipped: { label: "Dikirim", className: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400" },
  completed: { label: "Selesai", className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" },
  cancelled: { label: "Dibatalkan", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
}

const statusTabs = [
  { key: "all", label: "Semua", icon: ClipboardList },
  { key: "pending", label: "Pending", icon: Clock },
  { key: "processing", label: "Diproses", icon: ShoppingCart },
  { key: "shipped", label: "Dikirim", icon: Truck },
  { key: "completed", label: "Selesai", icon: CheckCircle },
  { key: "cancelled", label: "Dibatalkan", icon: XCircle },
]

export default function OrdersPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.customer.toLowerCase().includes(search.toLowerCase())
      const matchesStatus =
        statusFilter === "all" || o.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [search, statusFilter])

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: orders.length }
    orders.forEach((o) => {
      counts[o.status] = (counts[o.status] || 0) + 1
    })
    return counts
  }, [])

  const totalRevenue = filtered.reduce((sum, o) => sum + o.total, 0)

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">
            Kelola pesanan dari pelanggan WebCommerce
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30">
                <ClipboardList className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Selesai</p>
                <p className="text-2xl font-bold">{statusCounts.completed || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">{formatRupiah(totalRevenue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Tabs */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            {statusTabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.key}
                  onClick={() => setStatusFilter(tab.key)}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                    statusFilter === tab.key
                      ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {statusCounts[tab.key] || 0}
                  </Badge>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari order atau pelanggan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Daftar Orders ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Pelanggan</TableHead>
                <TableHead className="text-center">Items</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Pembayaran</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-sans text-sm font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">{order.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">{order.items} item</Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatRupiah(order.total)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusConfig[order.status].className}>
                      {statusConfig[order.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{order.payment}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{order.date}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/ecommerce/orders/${order.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    Tidak ada order ditemukan
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
