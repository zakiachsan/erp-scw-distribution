"use client"

import { useState } from "react"
import Link from "next/link"
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
  BookOpen,
  ArrowLeftRight,
  Clock,
  DollarSign,
  Plus,
  FileText,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  Banknote,
  Receipt,
} from "lucide-react"

const summaryCards = [
  {
    title: "Total Debit (Bulan Ini)",
    value: "Rp 285.450.000",
    description: "127 transaksi",
    icon: TrendingUp,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Total Credit (Bulan Ini)",
    value: "Rp 285.450.000",
    description: "127 transaksi",
    icon: TrendingDown,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    title: "Pending Entries",
    value: "8",
    description: "Menunggu approval",
    icon: Clock,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  {
    title: "Approved Entries",
    value: "119",
    description: "Bulan ini",
    icon: CheckCircle2,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
]

const recentEntries = [
  {
    id: "JE-2026-00187",
    date: "2026-06-02",
    reference: "INV-2026-0312",
    account: "1101 - Kas",
    description: "Pembayaran Invoice PT Maju Jaya - SCW Nano Coating 9H",
    debit: 45000000,
    credit: 0,
    status: "Approved",
  },
  {
    id: "JE-2026-00186",
    date: "2026-06-01",
    reference: "PO-2026-0089",
    account: "2101 - Utang Usaha",
    description: "Pembelian bahan baku coating dari ChemPro Asia",
    debit: 0,
    credit: 28500000,
    status: "Approved",
  },
  {
    id: "JE-2026-00185",
    date: "2026-06-01",
    reference: "SAL-2026-006",
    account: "5101 - Gaji Karyawan",
    description: "Gaji bulanan tim produksi SCW",
    debit: 125000000,
    credit: 0,
    status: "Pending",
  },
  {
    id: "JE-2026-00184",
    date: "2026-05-31",
    reference: "EXP-2026-0045",
    account: "6102 - Sewa Gudang",
    description: "Sewa gudang warehouse Surabaya Mei 2026",
    debit: 15000000,
    credit: 0,
    status: "Approved",
  },
  {
    id: "JE-2026-00183",
    date: "2026-05-30",
    reference: "REV-2026-0078",
    account: "4101 - Penjualan Produk",
    description: "Penjualan SCW Body Wash & SCW Tire Shine ke Toko Onderdil",
    debit: 0,
    credit: 67800000,
    status: "Approved",
  },
]

function formatIDR(amount: number): string {
  if (amount === 0) return "-"
  return `Rp ${amount.toLocaleString("id-ID")}`
}

export default function AccountingDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Accounting Dashboard
          </h1>
          <p className="text-slate-500">
            Ringkasan keuangan dan jurnal SCW Distribution
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/accounting/journal/create">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="mr-2 h-4 w-4" />
              New Journal Entry
            </Button>
          </Link>
          <Link href="/accounting/reconciliation">
            <Button variant="outline">
              <ArrowLeftRight className="mr-2 h-4 w-4" />
              Reconciliation
            </Button>
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <Card key={card.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {card.value}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {card.description}
                  </p>
                </div>
                <div className={`rounded-full p-3 ${card.bgColor}`}>
                  <card.icon className={`h-5 w-5 ${card.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <Link href="/accounting/journal/create">
              <div className="flex flex-col items-center gap-2 rounded-lg border p-4 hover:bg-indigo-50 transition-colors cursor-pointer">
                <BookOpen className="h-8 w-8 text-indigo-600" />
                <span className="text-sm font-medium text-slate-700">
                  New Journal
                </span>
              </div>
            </Link>
            <Link href="/accounting/reconciliation">
              <div className="flex flex-col items-center gap-2 rounded-lg border p-4 hover:bg-indigo-50 transition-colors cursor-pointer">
                <ArrowLeftRight className="h-8 w-8 text-indigo-600" />
                <span className="text-sm font-medium text-slate-700">
                  Reconciliation
                </span>
              </div>
            </Link>
            <Link href="/accounting/balance-sheet">
              <div className="flex flex-col items-center gap-2 rounded-lg border p-4 hover:bg-indigo-50 transition-colors cursor-pointer">
                <FileText className="h-8 w-8 text-indigo-600" />
                <span className="text-sm font-medium text-slate-700">
                  Balance Sheet
                </span>
              </div>
            </Link>
            <Link href="/accounting/profit-loss">
              <div className="flex flex-col items-center gap-2 rounded-lg border p-4 hover:bg-indigo-50 transition-colors cursor-pointer">
                <Receipt className="h-8 w-8 text-indigo-600" />
                <span className="text-sm font-medium text-slate-700">
                  P&L Statement
                </span>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Journal Entries */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Recent Journal Entries</CardTitle>
            <CardDescription>5 entri jurnal terbaru</CardDescription>
          </div>
          <Link href="/accounting/journal">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Entry ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Debit</TableHead>
                <TableHead className="text-right">Credit</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-sans text-sm font-medium">
                    {entry.id}
                  </TableCell>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell className="text-slate-600">
                    {entry.reference}
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate text-slate-600">
                    {entry.description}
                  </TableCell>
                  <TableCell className="text-right font-sans">
                    {formatIDR(entry.debit)}
                  </TableCell>
                  <TableCell className="text-right font-sans">
                    {formatIDR(entry.credit)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        entry.status === "Approved" ? "default" : "secondary"
                      }
                      className={
                        entry.status === "Approved"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                      }
                    >
                      {entry.status}
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
