"use client"

import React from "react"
import {
  TrendingUp,
  ShoppingCart,
  AlertTriangle,
  Truck,
  Package,
  FileText,
  Users,
  BarChart3,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const salesData = [
  { month: "Jan", sales: 1800000, target: 2000000 },
  { month: "Feb", sales: 2100000, target: 2200000 },
  { month: "Mar", sales: 1950000, target: 2100000 },
  { month: "Apr", sales: 2400000, target: 2300000 },
  { month: "May", sales: 2200000, target: 2400000 },
  { month: "Jun", sales: 2400000, target: 2500000 },
]

const recentActivities = [
  {
    id: 1,
    action: "Purchase Order #PO-2024-0156 created",
    user: "Budi Santoso",
    time: "2 minutes ago",
    type: "purchase",
  },
  {
    id: 2,
    action: "Stock alert: Nano Ceramic Coating (5L) below minimum",
    user: "System",
    time: "15 minutes ago",
    type: "alert",
  },
  {
    id: 3,
    action: "Sales Order #SO-2024-0892 completed",
    user: "Rina Wijaya",
    time: "1 hour ago",
    type: "sale",
  },
  {
    id: 4,
    action: "Shipment #SHP-2024-0234 dispatched via JNE",
    user: "Dedi Kurniawan",
    time: "2 hours ago",
    type: "shipping",
  },
  {
    id: 5,
    action: "New customer registered: AutoDetail Bandung",
    user: "System",
    time: "3 hours ago",
    type: "customer",
  },
]

const statCards = [
  {
    title: "Total Sales",
    value: "Rp 2.4M",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: TrendingUp,
    description: "vs last month",
  },
  {
    title: "Pending PO",
    value: "12",
    change: "+3",
    changeType: "neutral" as const,
    icon: ShoppingCart,
    description: "awaiting approval",
  },
  {
    title: "Low Stock Alerts",
    value: "5",
    change: "+2",
    changeType: "negative" as const,
    icon: AlertTriangle,
    description: "items below minimum",
  },
  {
    title: "Pending Shipments",
    value: "8",
    change: "-1",
    changeType: "positive" as const,
    icon: Truck,
    description: "ready to ship",
  },
]

const quickActions = [
  { label: "New Sales Order", icon: FileText, href: "/sales/orders/create" },
  { label: "Create PO", icon: ShoppingCart, href: "/purchasing/create" },
  { label: "Check Inventory", icon: Package, href: "/inventory" },
  { label: "View Reports", icon: BarChart3, href: "/accounting/profit-loss" },
]

function getActivityIcon(type: string) {
  switch (type) {
    case "purchase":
      return <ShoppingCart className="h-4 w-4 text-blue-500" />
    case "alert":
      return <AlertTriangle className="h-4 w-4 text-amber-500" />
    case "sale":
      return <TrendingUp className="h-4 w-4 text-green-500" />
    case "shipping":
      return <Truck className="h-4 w-4 text-purple-500" />
    case "customer":
      return <Users className="h-4 w-4 text-indigo-500" />
    default:
      return <Package className="h-4 w-4 text-gray-500" />
  }
}

function getActivityBadge(type: string) {
  switch (type) {
    case "purchase":
      return <Badge variant="secondary">PO</Badge>
    case "alert":
      return <Badge variant="destructive">Alert</Badge>
    case "sale":
      return <Badge variant="default">Sale</Badge>
    case "shipping":
      return <Badge variant="secondary">Ship</Badge>
    case "customer":
      return <Badge variant="outline">New</Badge>
    default:
      return <Badge variant="outline">Info</Badge>
  }
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s what&apos;s happening with SCW Distribution today.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50">
                    <Icon className="h-6 w-6 text-indigo-600" />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm">
                  <span
                    className={
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : stat.changeType === "negative"
                          ? "text-red-600"
                          : "text-muted-foreground"
                    }
                  >
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground">{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Chart & Activities Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Sales Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Sales Trend</CardTitle>
            <CardDescription>Monthly sales performance for 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="month"
                    className="text-xs"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <YAxis
                    className="text-xs"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                    tickFormatter={(value) =>
                      `Rp ${(value / 1000000).toFixed(1)}M`
                    }
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value, name) => [
                      `Rp ${(Number(value) / 1000000).toFixed(2)}M`,
                      name === "sales" ? "Actual Sales" : "Target",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="target"
                    stroke="#94a3b8"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    fill="url(#targetGradient)"
                    name="target"
                  />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#6366f1"
                    strokeWidth={2}
                    fill="url(#salesGradient)"
                    name="sales"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activities</CardTitle>
            <CardDescription>Latest system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                >
                  <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-snug">
                      {activity.action}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {activity.user}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                  {getActivityBadge(activity.type)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
          <CardDescription>Frequently used operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <a
                  key={action.label}
                  href={action.href}
                  className="flex flex-col items-center gap-2 rounded-lg border py-4 px-3 text-sm font-medium hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 transition-colors text-muted-foreground"
                >
                  <Icon className="h-5 w-5" />
                  <span>{action.label}</span>
                </a>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
