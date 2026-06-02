"use client"

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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Crown,
  ShoppingCart,
  DollarSign,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

interface TopCustomer {
  rank: number
  name: string
  company: string
  totalPurchase: number
  ordersCount: number
  avgOrderValue: number
  lastPurchase: string
  trend: "up" | "down" | "stable"
  trendPercent: number
  tier: string
}

const topCustomers: TopCustomer[] = [
  { rank: 1, name: "Budi Santoso", company: "PT Autogloss Indonesia", totalPurchase: 85000000, ordersCount: 24, avgOrderValue: 3541667, lastPurchase: "2026-05-28", trend: "up", trendPercent: 15, tier: "Platinum" },
  { rank: 2, name: "Maya Putri", company: "GlossUp Bali", totalPurchase: 72000000, ordersCount: 20, avgOrderValue: 3600000, lastPurchase: "2026-05-22", trend: "up", trendPercent: 22, tier: "Platinum" },
  { rank: 3, name: "Andi Pratama", company: "CV Ceramic Pro JKT", totalPurchase: 62000000, ordersCount: 18, avgOrderValue: 3444444, lastPurchase: "2026-05-25", trend: "stable", trendPercent: 2, tier: "Gold" },
  { rank: 4, name: "Rina Wijaya", company: "UD Shinemax", totalPurchase: 45000000, ordersCount: 15, avgOrderValue: 3000000, lastPurchase: "2026-05-20", trend: "down", trendPercent: -8, tier: "Gold" },
  { rank: 5, name: "Dedi Kurniawan", company: "PT DetailWorks BDG", totalPurchase: 38000000, ordersCount: 12, avgOrderValue: 3166667, lastPurchase: "2026-05-15", trend: "up", trendPercent: 10, tier: "Silver" },
  { rank: 6, name: "Sari Dewi", company: "CV ProShine SBY", totalPurchase: 29000000, ordersCount: 9, avgOrderValue: 3222222, lastPurchase: "2026-05-10", trend: "down", trendPercent: -5, tier: "Silver" },
  { rank: 7, name: "Hendra Gunawan", company: "AutoCare Makassar", totalPurchase: 18000000, ordersCount: 6, avgOrderValue: 3000000, lastPurchase: "2026-04-30", trend: "up", trendPercent: 18, tier: "Bronze" },
  { rank: 8, name: "Rizky Firmansyah", company: "DetailPro Semarang", totalPurchase: 15000000, ordersCount: 5, avgOrderValue: 3000000, lastPurchase: "2026-05-18", trend: "stable", trendPercent: 0, tier: "Bronze" },
]

const trendIcons = {
  up: { icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-100" },
  down: { icon: TrendingDown, color: "text-red-600", bg: "bg-red-100" },
  stable: { icon: Minus, color: "text-gray-600", bg: "bg-gray-100" },
}

const tierConfig: Record<string, { className: string }> = {
  Bronze: { className: "bg-orange-100 text-orange-800" },
  Silver: { className: "bg-gray-100 text-gray-800" },
  Gold: { className: "bg-yellow-100 text-yellow-800" },
  Platinum: { className: "bg-indigo-100 text-indigo-800" },
}

export default function MostBuyPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Link href="/sales">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Most-Buy Customers</h1>
          <p className="text-muted-foreground">
            Ranked list of top customers by purchase frequency and value
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                <Crown className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Top Customer</p>
                <p className="text-xl font-bold">{topCustomers[0].name}</p>
                <p className="text-xs text-muted-foreground">{topCustomers[0].company}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <DollarSign className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Value (Top 8)</p>
                <p className="text-2xl font-bold">
                  Rp {(topCustomers.reduce((sum, c) => sum + c.totalPurchase, 0) / 1000000).toFixed(0)}M
                </p>
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
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">
                  {topCustomers.reduce((sum, c) => sum + c.ordersCount, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ranked Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Ranking</CardTitle>
          <CardDescription>Sorted by total purchase value</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead className="text-right">Orders</TableHead>
                <TableHead className="text-right">Avg Order</TableHead>
                <TableHead className="text-right">Total Purchase</TableHead>
                <TableHead className="text-right">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topCustomers.map((customer) => {
                const trendInfo = trendIcons[customer.trend]
                const TrendIcon = trendInfo.icon
                return (
                  <TableRow key={customer.rank}>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {customer.rank <= 3 && (
                          <Crown className={`h-4 w-4 ${customer.rank === 1 ? "text-yellow-500" : customer.rank === 2 ? "text-gray-400" : "text-orange-400"}`} />
                        )}
                        <span className="font-bold">{customer.rank}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{customer.company}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={tierConfig[customer.tier].className}>
                        {customer.tier}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{customer.ordersCount}</TableCell>
                    <TableCell className="text-right text-sm">
                      Rp {(customer.avgOrderValue / 1000000).toFixed(1)}M
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      Rp {(customer.totalPurchase / 1000000).toFixed(0)}M
                    </TableCell>
                    <TableCell className="text-right">
                      <div className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${trendInfo.bg} ${trendInfo.color}`}>
                        <TrendIcon className="h-3 w-3" />
                        {customer.trendPercent > 0 ? "+" : ""}{customer.trendPercent}%
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
