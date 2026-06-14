"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
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
import { Download, FileText } from "lucide-react"

interface BalanceSheetItem {
  account: string
  code: string
  amount: number
}

const currentAssets: BalanceSheetItem[] = [
  { account: "Kas", code: "1101", amount: 125000000 },
  { account: "Bank BCA", code: "1102", amount: 180000000 },
  { account: "Bank Mandiri", code: "1103", amount: 45000000 },
  { account: "Piutang Usaha", code: "1202", amount: 67800000 },
  { account: "Persediaan Barang", code: "1201", amount: 185000000 },
  { account: "Perlengkapan Kantor", code: "1301", amount: 12500000 },
]

const fixedAssets: BalanceSheetItem[] = [
  { account: "Tanah", code: "1401", amount: 450000000 },
  { account: "Gedung", code: "1402", amount: 320000000 },
  { account: "Peralatan Produksi", code: "1403", amount: 175000000 },
  { account: "Kendaraan", code: "1404", amount: 95000000 },
]

const liabilities: BalanceSheetItem[] = [
  { account: "Utang Usaha", code: "2101", amount: 42000000 },
  { account: "Utang Bank", code: "2102", amount: 75000000 },
  { account: "PPh Terutang", code: "2201", amount: 18500000 },
  { account: "Utang Gaji", code: "2103", amount: 12500000 },
]

const equity: BalanceSheetItem[] = [
  { account: "Modal Disetor", code: "3101", amount: 500000000 },
  { account: "Laba Ditahan", code: "3201", amount: 214800000 },
  { account: "Laba Tahun Berjalan", code: "3301", amount: 96000000 },
]

function formatIDR(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`
}

export default function BalanceSheetPage() {
  const [asOfMonth, setAsOfMonth] = useState("2026-06")

  const totalCurrentAssets = currentAssets.reduce((sum, a) => sum + a.amount, 0)
  const totalFixedAssets = fixedAssets.reduce((sum, a) => sum + a.amount, 0)
  const totalAssets = totalCurrentAssets + totalFixedAssets

  const totalLiabilities = liabilities.reduce((sum, a) => sum + a.amount, 0)
  const totalEquity = equity.reduce((sum, a) => sum + a.amount, 0)
  const totalLiabilitiesAndEquity = totalLiabilities + totalEquity

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Balance Sheet
          </h1>
          <p className="text-slate-500">
            Neraca keuangan SCW Distribution - Laporan posisi keuangan
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={asOfMonth} onValueChange={(v) => setAsOfMonth(v ?? '')}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2026-06">Juni 2026</SelectItem>
              <SelectItem value="2026-05">Mei 2026</SelectItem>
              <SelectItem value="2026-04">April 2026</SelectItem>
              <SelectItem value="2026-03">Maret 2026</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <p className="text-sm text-slate-500">Total Assets</p>
            <p className="text-xl font-bold text-blue-600">
              {formatIDR(totalAssets)}
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-4">
            <p className="text-sm text-slate-500">Total Liabilities</p>
            <p className="text-xl font-bold text-amber-600">
              {formatIDR(totalLiabilities)}
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <p className="text-sm text-slate-500">Total Equity</p>
            <p className="text-xl font-bold text-green-600">
              {formatIDR(totalEquity)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Balance Sheet Statement */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">SCW Distribution</CardTitle>
          <CardDescription className="text-base font-medium text-slate-700">
            Neraca (Balance Sheet)
          </CardDescription>
          <p className="text-sm text-slate-500">
            Per 30 Juni 2026
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* ASSETS */}
          <div>
            <h2 className="text-lg font-bold text-blue-700 mb-3 border-b-2 border-blue-200 pb-1">
              ASSETS
            </h2>

            {/* Current Assets */}
            <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-2">
              Current Assets
            </h3>
            <Table>
              <TableBody>
                {currentAssets.map((item) => (
                  <TableRow key={item.code}>
                    <TableCell className="pl-8 text-slate-600">
                      {item.account}
                    </TableCell>
                    <TableCell className="text-right font-sans">
                      {formatIDR(item.amount)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="border-t border-slate-300 bg-blue-50">
                  <TableCell className="pl-8 font-bold text-slate-700">
                    Total Current Assets
                  </TableCell>
                  <TableCell className="text-right font-sans font-bold text-blue-700">
                    {formatIDR(totalCurrentAssets)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            {/* Fixed Assets */}
            <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-2 mt-4">
              Fixed Assets (Non-Current)
            </h3>
            <Table>
              <TableBody>
                {fixedAssets.map((item) => (
                  <TableRow key={item.code}>
                    <TableCell className="pl-8 text-slate-600">
                      {item.account}
                    </TableCell>
                    <TableCell className="text-right font-sans">
                      {formatIDR(item.amount)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="border-t border-slate-300 bg-blue-50">
                  <TableCell className="pl-8 font-bold text-slate-700">
                    Total Fixed Assets
                  </TableCell>
                  <TableCell className="text-right font-sans font-bold text-blue-700">
                    {formatIDR(totalFixedAssets)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div className="border-t-2 border-blue-300 bg-blue-100 rounded-lg p-3 mt-3">
              <div className="flex justify-between">
                <span className="font-bold text-blue-800 text-lg">
                  TOTAL ASSETS
                </span>
                <span className="font-sans font-bold text-blue-800 text-lg">
                  {formatIDR(totalAssets)}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* LIABILITIES */}
          <div>
            <h2 className="text-lg font-bold text-amber-700 mb-3 border-b-2 border-amber-200 pb-1">
              LIABILITIES
            </h2>
            <Table>
              <TableBody>
                {liabilities.map((item) => (
                  <TableRow key={item.code}>
                    <TableCell className="pl-8 text-slate-600">
                      {item.account}
                    </TableCell>
                    <TableCell className="text-right font-sans">
                      {formatIDR(item.amount)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="border-t border-slate-300 bg-amber-50">
                  <TableCell className="pl-8 font-bold text-slate-700">
                    Total Liabilities
                  </TableCell>
                  <TableCell className="text-right font-sans font-bold text-amber-700">
                    {formatIDR(totalLiabilities)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* EQUITY */}
          <div>
            <h2 className="text-lg font-bold text-green-700 mb-3 border-b-2 border-green-200 pb-1">
              EQUITY
            </h2>
            <Table>
              <TableBody>
                {equity.map((item) => (
                  <TableRow key={item.code}>
                    <TableCell className="pl-8 text-slate-600">
                      {item.account}
                    </TableCell>
                    <TableCell className="text-right font-sans">
                      {formatIDR(item.amount)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="border-t border-slate-300 bg-green-50">
                  <TableCell className="pl-8 font-bold text-slate-700">
                    Total Equity
                  </TableCell>
                  <TableCell className="text-right font-sans font-bold text-green-700">
                    {formatIDR(totalEquity)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="border-t-2 border-slate-300 bg-slate-100 rounded-lg p-3">
            <div className="flex justify-between">
              <span className="font-bold text-slate-800 text-lg">
                TOTAL LIABILITIES & EQUITY
              </span>
              <span className="font-sans font-bold text-slate-800 text-lg">
                {formatIDR(totalLiabilitiesAndEquity)}
              </span>
            </div>
          </div>

          {/* Verification */}
          <div className={`text-center p-3 rounded-lg ${totalAssets === totalLiabilitiesAndEquity ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
            {totalAssets === totalLiabilitiesAndEquity ? (
              <p className="font-medium">
                ✓ Assets = Liabilities + Equity — Neraca seimbang
              </p>
            ) : (
              <p className="font-medium">
                ✗ Neraca tidak seimbang! Selisih: {formatIDR(Math.abs(totalAssets - totalLiabilitiesAndEquity))}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
