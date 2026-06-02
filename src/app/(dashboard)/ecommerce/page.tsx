"use client"

import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ShoppingBag,
  ShoppingCart,
  DollarSign,
  Users,
  TrendingUp,
  ArrowRight,
  Package,
  ClipboardList,
} from "lucide-react"

const stats = [
  {
    title: "Total Orders",
    value: "156",
    change: "+23 this week",
    icon: ShoppingCart,
    color: "text-blue-600 bg-blue-50",
  },
  {
    title: "Revenue",
    value: "Rp 18.5M",
    change: "+12% vs last month",
    icon: DollarSign,
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    title: "Products Listed",
    value: "24",
    change: "6 categories",
    icon: Package,
    color: "text-violet-600 bg-violet-50",
  },
  {
    title: "Active Customers",
    value: "89",
    change: "+12 new this month",
    icon: Users,
    color: "text-orange-600 bg-orange-50",
  },
]

const recentOrders = [
  { id: "ECO-2026-0156", customer: "Ahmad Fauzi", items: 3, total: "Rp 425.000", status: "Paid" },
  { id: "ECO-2026-0155", customer: "Siti Nurhaliza", items: 1, total: "Rp 450.000", status: "Pending" },
  { id: "ECO-2026-0154", customer: "Budi Hartono", items: 5, total: "Rp 875.000", status: "Shipped" },
  { id: "ECO-2026-0153", customer: "Rina Wijaya", items: 2, total: "Rp 210.000", status: "Paid" },
  { id: "ECO-2026-0152", customer: "Dedi Kurniawan", items: 4, total: "Rp 680.000", status: "Delivered" },
]

const quickActions = [
  { label: "Product Catalog", href: "/ecommerce/products", icon: ShoppingBag, color: "bg-blue-50 text-blue-600" },
  { label: "View Orders", href: "/ecommerce/orders", icon: ClipboardList, color: "bg-emerald-50 text-emerald-600" },
  { label: "Open Store", href: "/commerce", icon: ShoppingCart, color: "bg-orange-50 text-orange-600", external: true },
]

const statusColors: Record<string, string> = {
  Paid: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Shipped: "bg-blue-100 text-blue-700",
  Delivered: "bg-slate-100 text-slate-700",
}

export default function EcommerceDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">WebCommerce Dashboard</h1>
          <p className="text-muted-foreground">
            Kelola toko online, produk, dan order dari customer
          </p>
        </div>
        <Link
          href="/commerce"
          target="_blank"
          className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 transition-colors"
        >
          Buka Toko
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {quickActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  target={action.external ? "_blank" : undefined}
                  className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                >
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${action.color}`}>
                    <action.icon className="h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    {action.label}
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-muted-foreground">{order.customer} · {order.items} items</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.total}</p>
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[order.status] || ""}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
