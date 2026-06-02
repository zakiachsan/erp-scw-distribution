"use client"

import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Package,
  ShoppingCart,
  Truck,
  Box,
  AlertTriangle,
  Clock,
  CheckCircle,
  ArrowRight,
} from "lucide-react"

const stats = [
  {
    title: "Total Products",
    value: "18",
    icon: Package,
    color: "text-blue-600 bg-blue-50",
  },
  {
    title: "Pending PO",
    value: "12",
    icon: ShoppingCart,
    color: "text-amber-600 bg-amber-50",
  },
  {
    title: "Ready to Ship",
    value: "8",
    icon: Truck,
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    title: "Low Stock Items",
    value: "5",
    icon: AlertTriangle,
    color: "text-red-600 bg-red-50",
  },
]

const quickActions = [
  { label: "Product List", href: "/inventory", icon: Package, color: "bg-blue-50 text-blue-600" },
  { label: "Create PO", href: "/purchasing/create", icon: ShoppingCart, color: "bg-amber-50 text-amber-600" },
  { label: "Packing Queue", href: "/packing", icon: Box, color: "bg-purple-50 text-purple-600" },
  { label: "Shipments", href: "/shipping", icon: Truck, color: "bg-emerald-50 text-emerald-600" },
]

const recentActivities = [
  { user: "Budi Santoso", action: "PO #PO-2026-0156 diterima", time: "2 jam lalu", type: "PO" },
  { user: "Dedi Kurniawan", action: "Stock opname Rak A-01 selesai", time: "3 jam lalu", type: "Stock" },
  { user: "Sari Dewi", action: "Packing order #ORD-2026-089 selesai", time: "4 jam lalu", type: "Pack" },
  { user: "System", action: "Low stock alert: Ceramic Coating", time: "5 jam lalu", type: "Alert" },
  { user: "Eko Prasetyo", action: "PO #PO-2026-0155 dikirim supplier", time: "6 jam lalu", type: "Ship" },
]

export default function OperasionalDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Operasional Dashboard</h1>
        <p className="text-muted-foreground">
          Ringkasan operasional gudang, pembelian, dan logistik
        </p>
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
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
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

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <div className="mt-0.5">
                    {activity.type === "Alert" ? (
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                    ) : activity.type === "PO" ? (
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Clock className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.user}</p>
                    <p className="text-muted-foreground">{activity.action}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
