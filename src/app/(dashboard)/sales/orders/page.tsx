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
import { Plus, Eye, Filter, ShoppingCart } from "lucide-react"

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

const statusConfig = {
  Draft: { label: "Draft", className: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400" },
  Confirmed: { label: "Confirmed", className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
  Processing: { label: "Processing", className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" },
  Shipped: { label: "Shipped", className: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400" },
  Completed: { label: "Completed", className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" },
}

export default function SalesOrdersPage() {
  const [statusFilter, setStatusFilter] = useState("All")

  const filtered = useMemo(() => {
    return orders.filter((o) => statusFilter === "All" || o.status === statusFilter)
  }, [statusFilter])

  const totalValue = filtered.reduce((sum, o) => sum + o.total, 0)

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl tracking-tight">Sales Orders</h1>
          <p className="text-muted-foreground">
            Manage sales orders and track fulfillment status
          </p>
        </div>
        <Link href="/sales/orders/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Sales Order
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
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
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
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
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                <ShoppingCart className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Orders</p>
                <p className="text-2xl">
                  {orders.filter((o) => ["Draft", "Confirmed", "Processing"].includes(o.status)).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Order List</CardTitle>
              <CardDescription>
                {filtered.length} order{filtered.length !== 1 ? "s" : ""} found
              </CardDescription>
            </div>
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "All")}>
              <SelectTrigger className="w-44">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Confirmed">Confirmed</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Shipped">Shipped</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SO Number</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-sans text-xs">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusConfig[order.status].className}>
                      {statusConfig[order.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{formatIDR(order.total)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon-sm">
                      <Eye className="h-4 w-4" />
                    </Button>
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
