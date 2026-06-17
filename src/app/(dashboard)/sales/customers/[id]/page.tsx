"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowLeft, Star, TrendingUp } from "lucide-react"
import Link from "next/link"

const formatIDR = (val: number) => `Rp ${val.toLocaleString("id-ID")}`

const customerData = {
  id: "C001",
  name: "Budi Santoso",
  company: "PT Autogloss Indonesia",
  email: "budi@autogloss.co.id",
  phone: "0812-3456-7890",
  address: "Jl. Raya Bekasi No. 123, Jakarta Timur",
  creditLimit: 50000000,
  remainingCredit: 32000000,
  tier: "Platinum",
  totalPurchase: 85000000,
  joinDate: "2024-03-15",
  salesPerson: "Rahman Hakim",
}

const purchaseHistory = [
  { id: "SO-2026-041", date: "2026-05-28", items: "SCW Snow Foam x20, SCW Ceramic Coating x10", total: 8500000, status: "Paid" },
  { id: "SO-2026-038", date: "2026-05-15", items: "SCW Interior Detailer x15, SCW Tire Gel x25", total: 6200000, status: "Paid" },
  { id: "SO-2026-032", date: "2026-05-02", items: "SCW Spray Wax x30, SCW Glass Cleaner x20", total: 5800000, status: "Paid" },
  { id: "SO-2026-025", date: "2026-04-18", items: "SCW Ceramic Coating x5, SCW Polish Compound x10", total: 7200000, status: "Paid" },
  { id: "SO-2026-019", date: "2026-04-05", items: "SCW Snow Foam x50, SCW Shampoo Plus x30", total: 12000000, status: "Paid" },
]

const statusConfig = {
  Paid: { className: "bg-emerald-100 text-emerald-800" },
  Pending: { className: "bg-amber-100 text-amber-800" },
  Overdue: { className: "bg-red-100 text-red-800" },
}

const creditUsedPercent = ((customerData.creditLimit - customerData.remainingCredit) / customerData.creditLimit) * 100

const tierDiscounts = [
  { tier: "Bronze", minPurchase: "Rp 10M", discount: "2%", color: "bg-orange-100 text-orange-800" },
  { tier: "Silver", minPurchase: "Rp 25M", discount: "5%", color: "bg-gray-100 text-gray-800" },
  { tier: "Gold", minPurchase: "Rp 50M", discount: "8%", color: "bg-yellow-100 text-yellow-800" },
  { tier: "Platinum", minPurchase: "Rp 75M", discount: "12%", color: "bg-indigo-100 text-indigo-800" },
]

export default function CustomerDetailPage() {
  return (
    <div className="space-y-4 p-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/sales/customers">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-lg font-bold text-gray-900">{customerData.name}</h1>
          <p className="text-xs text-gray-500">{customerData.company}</p>
        </div>
      </div>

      {/* Top Row: Customer Info + Credit Tracking */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Customer Information */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Email</span>
              <span>{customerData.email}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Phone</span>
              <span>{customerData.phone}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Address</span>
              <span className="text-right max-w-[250px]">{customerData.address}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Sales Person</span>
              <span>{customerData.salesPerson}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Join Date</span>
              <span>{customerData.joinDate}</span>
            </div>
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Tier</span>
                <Badge className="text-[10px] bg-indigo-100 text-indigo-800">
                  {customerData.tier} — {customerData.tier === "Platinum" ? "12%" : customerData.tier === "Gold" ? "8%" : customerData.tier === "Silver" ? "5%" : "2%"} diskon
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Credit Tracking */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Credit Tracking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-lg border p-2">
                <p className="text-[10px] text-muted-foreground">Credit Limit</p>
                <p className="text-xs font-semibold">{formatIDR(customerData.creditLimit)}</p>
              </div>
              <div className="rounded-lg border p-2">
                <p className="text-[10px] text-muted-foreground">Used</p>
                <p className="text-xs font-semibold">{formatIDR(customerData.creditLimit - customerData.remainingCredit)}</p>
              </div>
              <div className="rounded-lg border p-2">
                <p className="text-[10px] text-muted-foreground">Remaining</p>
                <p className="text-xs font-semibold">{formatIDR(customerData.remainingCredit)}</p>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>Used: {creditUsedPercent.toFixed(0)}%</span>
                <span>Available: {(100 - creditUsedPercent).toFixed(0)}%</span>
              </div>
              <Progress value={creditUsedPercent} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tiering Discount */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-indigo-600" />
              <CardTitle className="text-sm">Tiering Discount</CardTitle>
            </div>
            <span className="text-xs text-muted-foreground">Total: {formatIDR(customerData.totalPurchase)}</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2">
            {tierDiscounts.map((tier) => (
              <div
                key={tier.tier}
                className={`rounded-lg border p-2 text-center ${
                  customerData.tier === tier.tier
                    ? "border-indigo-500 ring-1 ring-indigo-200"
                    : ""
                }`}
              >
                <Badge variant="outline" className={`text-[10px] ${tier.color}`}>{tier.tier}</Badge>
                <p className="text-[10px] text-muted-foreground mt-1">Min: {tier.minPurchase}</p>
                <p className="text-xs font-bold">{tier.discount}</p>
                {customerData.tier === tier.tier && (
                  <Badge className="mt-1 text-[10px] bg-indigo-600 text-white">Current</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Purchase History */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Purchase History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>PO Number</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchaseHistory.map((purchase) => (
                <TableRow key={purchase.id}>
                  <TableCell className="font-mono text-xs">{purchase.id}</TableCell>
                  <TableCell className="text-xs">{purchase.date}</TableCell>
                  <TableCell className="text-xs text-muted-foreground max-w-[250px] truncate">{purchase.items}</TableCell>
                  <TableCell className="text-xs text-right">{formatIDR(purchase.total)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-[10px] ${statusConfig[purchase.status as keyof typeof statusConfig].className}`}>
                      {purchase.status}
                    </Badge>
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
