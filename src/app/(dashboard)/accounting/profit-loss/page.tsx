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
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Download, TrendingUp, TrendingDown } from "lucide-react"

interface PLLine {
  account: string
  code: string
  amount: number
}

const revenue: PLLine[] = [
  { account: "Penjualan SCW Nano Coating 9H", code: "4101", amount: 425000000 },
  { account: "Penjualan SCW Body Wash", code: "4101", amount: 187500000 },
  { account: "Penjualan SCW Tire Shine", code: "4101", amount: 95000000 },
  { account: "Penjualan SCW Leather Care", code: "4101", amount: 67800000 },
  { account: "Penjualan SCW Detailing Spray", code: "4101", amount: 54300000 },
  { account: "Pendapatan Jasa Detailing", code: "4102", amount: 32500000 },
]

const cogs: PLLine[] = [
  { account: "Harga Pokok SCW Nano Coating", code: "5101", amount: 255000000 },
  { account: "Harga Pokok SCW Body Wash", code: "5101", amount: 112500000 },
  { account: "Harga Pokok SCW Tire Shine", code: "5101", amount: 57000000 },
  { account: "Harga Pokok SCW Leather Care", code: "5101", amount: 40680000 },
  { account: "Harga Pokok SCW Detailing Spray", code: "5101", amount: 32580000 },
  { account: "Biaya Pengiriman Produk", code: "5102", amount: 18500000 },
]

const operatingExpenses: Record<string, PLLine[]> = {
  "Personnel": [
    { account: "Gaji Karyawan Produksi", code: "6101", amount: 125000000 },
    { account: "Gaji Karyawan Kantor", code: "6101", amount: 75000000 },
    { account: "Bonus & Insentif", code: "6101", amount: 35000000 },
    { account: "BPJS Karyawan", code: "6101", amount: 18500000 },
  ],
  "Facility": [
    { account: "Sewa Gudang & Kantor", code: "6102", amount: 45000000 },
    { account: "Listrik & Air", code: "6103", amount: 12500000 },
    { account: "Internet & Telepon", code: "6103", amount: 3500000 },
    { account: "Maintenance Gedung", code: "6102", amount: 7500000 },
  ],
  "Marketing": [
    { account: "Iklan Digital & Social Media", code: "6104", amount: 15000000 },
    { account: "Event & Sponsorship", code: "6104", amount: 8500000 },
    { account: "Branding & Desain", code: "6104", amount: 5000000 },
  ],
  "Logistics": [
    { account: "Biaya Pengiriman & Freight", code: "6105", amount: 22500000 },
    { account: "Bensin & Kendaraan", code: "6105", amount: 8500000 },
  ],
  "Office": [
    { account: "Perlengkapan Kantor", code: "6106", amount: 3500000 },
    { account: "Software & Lisensi", code: "6106", amount: 7500000 },
    { account: "Audit & Konsultan", code: "6106", amount: 12000000 },
  ],
}

function formatIDR(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`
}

export default function ProfitLossPage() {
  const [period, setPeriod] = useState("2026-06")

  const totalRevenue = revenue.reduce((sum, r) => sum + r.amount, 0)
  const totalCOGS = cogs.reduce((sum, c) => sum + c.amount, 0)
  const grossProfit = totalRevenue - totalCOGS
  const grossProfitMargin = ((grossProfit / totalRevenue) * 100).toFixed(1)

  let totalOpex = 0
  const opexByCategory: Record<string, { items: PLLine[]; total: number }> = {}
  for (const [category, items] of Object.entries(operatingExpenses)) {
    const total = items.reduce((sum, i) => sum + i.amount, 0)
    opexByCategory[category] = { items, total }
    totalOpex += total
  }

  const netProfit = grossProfit - totalOpex
  const netProfitMargin = ((netProfit / totalRevenue) * 100).toFixed(1)

  const periodLabel =
    period === "2026-06"
      ? "Juni 2026"
      : period === "2026-05"
      ? "Mei 2026"
      : period === "q2"
      ? "Q2 2026"
      : "2026 YTD"

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Profit & Loss Statement
          </h1>
          <p className="text-slate-500">
            Laba rugi SCW Distribution - Laporan kinerja keuangan
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={period} onValueChange={(v) => setPeriod(v ?? '')}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2026-06">Juni 2026</SelectItem>
              <SelectItem value="2026-05">Mei 2026</SelectItem>
              <SelectItem value="q2">Q2 2026</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <p className="text-sm text-slate-500">Total Revenue</p>
            <p className="text-xl font-bold text-blue-600">
              {formatIDR(totalRevenue)}
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-indigo-500">
          <CardContent className="p-4">
            <p className="text-sm text-slate-500">Gross Profit</p>
            <p className="text-xl font-bold text-indigo-600">
              {formatIDR(grossProfit)}
            </p>
            <p className="text-xs text-slate-400">Margin: {grossProfitMargin}%</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-4">
            <p className="text-sm text-slate-500">Operating Expenses</p>
            <p className="text-xl font-bold text-amber-600">
              {formatIDR(totalOpex)}
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <p className="text-sm text-slate-500">Net Profit</p>
            <p className={`text-xl font-bold ${netProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
              {formatIDR(netProfit)}
            </p>
            <p className="text-xs text-slate-400">Margin: {netProfitMargin}%</p>
          </CardContent>
        </Card>
      </div>

      {/* P&L Statement */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">SCW Distribution</CardTitle>
          <CardDescription className="text-base font-medium text-slate-700">
            Laporan Laba Rugi (Profit & Loss Statement)
          </CardDescription>
          <p className="text-sm text-slate-500">
            Periode: {periodLabel}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Revenue */}
          <div>
            <h2 className="text-lg font-bold text-blue-700 mb-3 border-b-2 border-blue-200 pb-1">
              REVENUE (Pendapatan)
            </h2>
            <Table>
              <TableBody>
                {revenue.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="pl-8 text-slate-600">{item.account}</TableCell>
                    <TableCell className="text-right font-mono">{formatIDR(item.amount)}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="border-t border-slate-300 bg-blue-50">
                  <TableCell className="pl-8 font-bold text-slate-700">Total Revenue</TableCell>
                  <TableCell className="text-right font-mono font-bold text-blue-700">
                    {formatIDR(totalRevenue)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* COGS */}
          <div>
            <h2 className="text-lg font-bold text-indigo-700 mb-3 border-b-2 border-indigo-200 pb-1">
              COST OF GOODS SOLD (Harga Pokok Penjualan)
            </h2>
            <Table>
              <TableBody>
                {cogs.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="pl-8 text-slate-600">{item.account}</TableCell>
                    <TableCell className="text-right font-mono">{formatIDR(item.amount)}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="border-t border-slate-300 bg-indigo-50">
                  <TableCell className="pl-8 font-bold text-slate-700">Total COGS</TableCell>
                  <TableCell className="text-right font-mono font-bold text-indigo-700">
                    {formatIDR(totalCOGS)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Gross Profit */}
          <div className="border-t-2 border-green-300 bg-green-50 rounded-lg p-3">
            <div className="flex justify-between">
              <span className="font-bold text-green-800 text-lg">GROSS PROFIT</span>
              <span className="font-mono font-bold text-green-800 text-lg">{formatIDR(grossProfit)}</span>
            </div>
            <div className="text-right text-sm text-green-600">
              Gross Margin: {grossProfitMargin}%
            </div>
          </div>

          {/* Operating Expenses */}
          <div>
            <h2 className="text-lg font-bold text-amber-700 mb-3 border-b-2 border-amber-200 pb-1">
              OPERATING EXPENSES (Biaya Operasional)
            </h2>
            {Object.entries(opexByCategory).map(([category, { items, total }]) => (
              <div key={category} className="mb-4">
                <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-2">
                  {category}
                </h3>
                <Table>
                  <TableBody>
                    {items.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="pl-8 text-slate-600">{item.account}</TableCell>
                        <TableCell className="text-right font-mono">{formatIDR(item.amount)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="border-b border-slate-200">
                      <TableCell className="pl-8 font-medium text-slate-500 italic">
                        Subtotal {category}
                      </TableCell>
                      <TableCell className="text-right font-mono font-medium text-slate-600">
                        {formatIDR(total)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            ))}
            <div className="border-t border-slate-300 bg-amber-50 rounded-lg p-3">
              <div className="flex justify-between">
                <span className="font-bold text-amber-800">Total Operating Expenses</span>
                <span className="font-mono font-bold text-amber-800">{formatIDR(totalOpex)}</span>
              </div>
            </div>
          </div>

          {/* Net Profit */}
          <div className={`border-t-2 rounded-lg p-4 ${netProfit >= 0 ? "border-t-green-400 bg-green-100" : "border-t-red-400 bg-red-100"}`}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {netProfit >= 0 ? (
                  <TrendingUp className="h-6 w-6 text-green-700" />
                ) : (
                  <TrendingDown className="h-6 w-6 text-red-700" />
                )}
                <span className={`font-bold text-xl ${netProfit >= 0 ? "text-green-800" : "text-red-800"}`}>
                  NET PROFIT (Laba Bersih)
                </span>
              </div>
              <span className={`font-mono font-bold text-xl ${netProfit >= 0 ? "text-green-800" : "text-red-800"}`}>
                {formatIDR(netProfit)}
              </span>
            </div>
            <div className={`text-right text-sm mt-1 ${netProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
              Net Profit Margin: {netProfitMargin}%
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
