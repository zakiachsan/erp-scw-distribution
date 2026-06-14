"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
import {
  ArrowLeft,
  CreditCard,
  ShoppingCart,
  Star,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

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
  Paid: { className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" },
  Pending: { className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" },
  Overdue: { className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
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
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Link href="/sales/customers">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl  tracking-tight">{customerData.name}</h1>
          <p className="text-muted-foreground">{customerData.company}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Customer Info Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Email</span>
                <span>{customerData.email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Phone</span>
                <span>{customerData.phone}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Address</span>
                <span className="text-right text-xs">{customerData.address}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sales Person</span>
                <span>{customerData.salesPerson}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Join Date</span>
                <span>{customerData.joinDate}</span>
              </div>
            </div>
            <div className="pt-2 border-t">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-4 w-4 text-indigo-600" />
                <span className="text-sm font-medium">Tier Status</span>
              </div>
              <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400 text-sm">
                {customerData.tier} - 12% Discount
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Credit Tracking */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Credit Tracking</CardTitle>
            <CardDescription>Current credit utilization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border p-3">
                <p className="text-sm text-muted-foreground">Credit Limit</p>
                <p className="text-xl ">Rp {(customerData.creditLimit / 1000000).toFixed(0)}M</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-sm text-muted-foreground">Used Credit</p>
                <p className="text-xl  text-amber-600">
                  Rp {((customerData.creditLimit - customerData.remainingCredit) / 1000000).toFixed(0)}M
                </p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-sm text-muted-foreground">Remaining</p>
                <p className="text-xl  text-emerald-600">
                  Rp {(customerData.remainingCredit / 1000000).toFixed(0)}M
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Used: {creditUsedPercent.toFixed(0)}%</span>
                <span>Available: {(100 - creditUsedPercent).toFixed(0)}%</span>
              </div>
              <Progress value={creditUsedPercent} className="h-3" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tiering Discount Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-indigo-600" />
            <CardTitle>Tiering Discount Status</CardTitle>
          </div>
          <CardDescription>
            Total purchase: Rp {(customerData.totalPurchase / 1000000).toFixed(0)}M — Current tier: {customerData.tier}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-4">
            {tierDiscounts.map((tier) => (
              <div
                key={tier.tier}
                className={`rounded-lg border p-3 text-center ${
                  customerData.tier === tier.tier
                    ? "border-indigo-500 ring-2 ring-indigo-200 dark:ring-indigo-800"
                    : ""
                }`}
              >
                <Badge variant="outline" className={tier.color}>{tier.tier}</Badge>
                <p className="mt-2 text-xs text-muted-foreground">Min: {tier.minPurchase}</p>
                <p className="text-lg ">{tier.discount}</p>
                {customerData.tier === tier.tier && (
                  <Badge className="mt-1 bg-indigo-600 text-white">Current</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Purchase History */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SO Number</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchaseHistory.map((purchase) => (
                <TableRow key={purchase.id}>
                  <TableCell className="font-sans text-xs">{purchase.id}</TableCell>
                  <TableCell>{purchase.date}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{purchase.items}</TableCell>
                  <TableCell className="text-right font-medium">
                    Rp {(purchase.total / 1000000).toFixed(1)}M
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusConfig[purchase.status as keyof typeof statusConfig].className}>
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
