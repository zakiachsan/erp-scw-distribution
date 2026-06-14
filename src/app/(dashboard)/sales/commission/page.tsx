"use client"

import { useState } from "react"
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
import {
  Calendar,
  DollarSign,
  TrendingUp,
  Award,
} from "lucide-react"

interface SalesPerson {
  id: string
  name: string
  zone: string
  totalSales: number
  totalCommission: number
  rate: number
  ordersCount: number
  topProduct: string
}

const salesPersons: SalesPerson[] = [
  { id: "SP01", name: "Rahman Hakim", zone: "Jakarta & Tangerang", totalSales: 85000000, totalCommission: 4250000, rate: 5, ordersCount: 24, topProduct: "SCW Ceramic Coating" },
  { id: "SP02", name: "Dewi Lestari", zone: "Bandung & Cimahi", totalSales: 62000000, totalCommission: 3100000, rate: 5, ordersCount: 18, topProduct: "SCW Snow Foam" },
  { id: "SP03", name: "Fajar Nugroho", zone: "Surabaya & Sidoarjo", totalSales: 45000000, totalCommission: 2700000, rate: 6, ordersCount: 15, topProduct: "SCW Spray Wax" },
  { id: "SP04", name: "Siti Rahma", zone: "Makassar & Gowa", totalSales: 38000000, totalCommission: 2280000, rate: 6, ordersCount: 12, topProduct: "SCW Interior Detailer" },
  { id: "SP05", name: "Andi Prasetyo", zone: "Semarang & Solo", totalSales: 29000000, totalCommission: 1450000, rate: 5, ordersCount: 9, topProduct: "SCW Tire Gel" },
]

const periods = ["June 2026", "May 2026", "April 2026", "Q2 2026"]

export default function CommissionPage() {
  const [period, setPeriod] = useState("June 2026")

  // Auto-calculated from paid invoices — komisi = totalSales × rate / 100
  const calculatedCommission = salesPersons.map((sp) => ({
    ...sp,
    calculatedCommission: sp.totalSales * sp.rate / 100,
  }))

  const totalSales = salesPersons.reduce((sum, sp) => sum + sp.totalSales, 0)
  const totalCommission = salesPersons.reduce((sum, sp) => sum + sp.totalCommission, 0)

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl  tracking-tight">Commission Report</h1>
          <p className="text-muted-foreground">
            Track sales commission by sales person and period
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={(v) => setPeriod(v ?? "all")}>
            <SelectTrigger className="w-44">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {periods.map((p) => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => alert("Export akan tersedia setelah integrasi dengan database")}>Export</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                <DollarSign className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Sales ({period})</p>
                <p className="text-2xl ">Rp {(totalSales / 1000000).toFixed(0)}M</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Commission</p>
                <p className="text-2xl  text-emerald-600">Rp {(totalCommission / 1000000).toFixed(1)}M</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                <Award className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Top Performer</p>
                <p className="text-xl ">{salesPersons[0].name}</p>
                <p className="text-xs text-muted-foreground">{salesPersons[0].zone}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Commission Table */}
      <Card>
        <CardHeader>
          <CardTitle>Commission Breakdown</CardTitle>
          <CardDescription>Detailed commission per sales person — {period}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sales Person</TableHead>
                <TableHead>Zone</TableHead>
                <TableHead className="text-right">Orders</TableHead>
                <TableHead className="text-right">Total Sales</TableHead>
                <TableHead className="text-right">Rate</TableHead>
                <TableHead className="text-right">Commission</TableHead>
                <TableHead>Top Product</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesPersons.map((sp) => (
                <TableRow key={sp.id}>
                  <TableCell className="font-medium">{sp.name}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{sp.zone}</TableCell>
                  <TableCell className="text-right">{sp.ordersCount}</TableCell>
                  <TableCell className="text-right font-medium">
                    Rp {(sp.totalSales / 1000000).toFixed(0)}M
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline">{sp.rate}%</Badge>
                  </TableCell>
                  <TableCell className="text-right  text-emerald-600">
                    Rp {(sp.totalCommission / 1000000).toFixed(1)}M
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-indigo-50 text-indigo-700">{sp.topProduct}</Badge>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="border-t-2">
                <TableCell colSpan={3} className="">Total</TableCell>
                <TableCell className="text-right ">Rp {(totalSales / 1000000).toFixed(0)}M</TableCell>
                <TableCell></TableCell>
                <TableCell className="text-right  text-emerald-600 text-lg">
                  Rp {(totalCommission / 1000000).toFixed(1)}M
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Komisi otomatis dihitung dari total invoice yang sudah dibayar (Paid) × rate komisi per sales.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
