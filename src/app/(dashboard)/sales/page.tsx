"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  TrendingUp,
  DollarSign,
  Users,
  ShoppingCart,
  FileText,
  Truck,
  ArrowRight,
  Calendar,
} from "lucide-react"
import Link from "next/link"

const pipelineStages = [
  { stage: "Estimate", count: 12, value: 45000000, color: "bg-blue-100 text-blue-700", icon: FileText, href: "/sales/pipeline" },
  { stage: "Sales Order", count: 8, value: 32000000, color: "bg-indigo-100 text-indigo-700", icon: ShoppingCart, href: "/sales/pipeline" },
  { stage: "Invoice", count: 5, value: 18500000, color: "bg-violet-100 text-violet-700", icon: FileText, href: "/sales/invoices" },
  { stage: "Shipped", count: 15, value: 67000000, color: "bg-emerald-100 text-emerald-700", icon: Truck, href: "/shipping" },
]

const topCustomers = [
  { rank: 1, name: "AutoGloss Detailing Studio", company: "PT Autogloss Indonesia", totalPurchase: 85000000, orders: 24 },
  { rank: 2, name: "Ceramic Pro Jakarta", company: "CV Ceramic Pro JKT", totalPurchase: 62000000, orders: 18 },
  { rank: 3, name: " shineMax Car Wash", company: "UD Shinemax", totalPurchase: 45000000, orders: 15 },
  { rank: 4, name: "DetailWorks Bandung", company: "PT DetailWorks BDG", totalPurchase: 38000000, orders: 12 },
  { rank: 5, name: "ProShine Surabaya", company: "CV ProShine SBY", totalPurchase: 29000000, orders: 9 },
]

const monthlySummary = {
  totalSales: 162500000,
  totalOrders: 40,
  avgOrderValue: 4062500,
  growthPercent: 12.5,
}

export default function SalesDashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl  tracking-tight">Sales Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your sales pipeline and performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            This Month
          </Button>
        </div>
      </div>

      {/* Monthly Summary Cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        <Card>
          <CardContent className="flex h-full items-center gap-2 p-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
              <DollarSign className="h-4 w-4 text-indigo-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Total Sales</p>
              <p className="text-lg  lg:text-xl">Rp {(monthlySummary.totalSales / 1000000).toFixed(1)}M</p>
              <p className="text-[10px] text-emerald-600">+{monthlySummary.growthPercent}% vs last month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex h-full items-center gap-2 p-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <ShoppingCart className="h-4 w-4 text-blue-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Total Orders</p>
              <p className="text-lg  lg:text-xl">{monthlySummary.totalOrders}</p>
              <p className="text-[10px] text-emerald-600">+8 vs last month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex h-full items-center gap-2 p-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30">
              <TrendingUp className="h-4 w-4 text-violet-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Avg Order Value</p>
              <p className="text-lg  lg:text-xl">Rp {(monthlySummary.avgOrderValue / 1000000).toFixed(1)}M</p>
              <p className="text-[10px] text-transparent">+0 vs last month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex h-full items-center gap-2 p-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
              <Users className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Active Customers</p>
              <p className="text-lg  lg:text-xl">32</p>
              <p className="text-[10px] text-emerald-600">+3 new this month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline View */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Pipeline</CardTitle>
          <CardDescription>Current pipeline stage distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {pipelineStages.map((stage, idx) => {
              const Icon = stage.icon
              const isLast = idx === pipelineStages.length - 1
              return (
                <Link key={stage.stage} href={stage.href} className="flex items-center gap-2 lg:gap-3">
                    <div className={`flex-1 rounded-xl border p-4 ${stage.color} cursor-pointer hover:shadow-md transition-shadow`}>
                    <div className="flex items-center justify-between">
                      <Icon className="h-5 w-5" />
                      <span className="text-2xl ">{stage.count}</span>
                    </div>
                    <p className="mt-2 text-sm font-medium">{stage.stage}</p>
                    <p className="text-xs opacity-75">Rp {(stage.value / 1000000).toFixed(1)}M</p>
                  </div>
                  {!isLast && (
                    <ArrowRight className="hidden h-5 w-5 shrink-0 text-muted-foreground lg:block" />
                  )}
                </Link>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Top 5 Customers */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Top 5 Customers</CardTitle>
              <CardDescription>By total purchase value this month</CardDescription>
            </div>
            <Link href="/sales/customers">
              <Button variant="outline" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="text-right">Orders</TableHead>
                <TableHead className="text-right">Total Purchase</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topCustomers.map((customer) => (
                <TableRow key={customer.rank}>
                  <TableCell>
                    <Badge variant="outline" className="bg-indigo-100 text-indigo-700">
                      {customer.rank}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell className="text-muted-foreground">{customer.company}</TableCell>
                  <TableCell className="text-right">{customer.orders}</TableCell>
                  <TableCell className="text-right font-medium">
                    Rp {(customer.totalPurchase / 1000000).toFixed(0)}M
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
