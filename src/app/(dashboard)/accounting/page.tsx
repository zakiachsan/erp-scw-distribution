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
    color: "text-brand",
    bgColor: "bg-brand-light",
  },
  {
    title: "Total Credit (Bulan Ini)",
    value: "Rp 285.450.000",
    description: "127 transaksi",
    icon: TrendingDown,
    color: "text-brand",
    bgColor: "bg-brand-light",
  },
  {
    title: "Pending Entries",
    value: "8",
    description: "Menunggu approval",
    icon: Clock,
    color: "text-slds-warning",
    bgColor: "bg-amber-50",
  },
  {
    title: "Approved Entries",
    value: "119",
    description: "Bulan ini",
    icon: CheckCircle2,
    color: "text-slds-success",
    bgColor: "bg-green-50",
  },
]

const recentEntries = [
  { id: "JE-2026-00187", date: "2026-06-02", reference: "INV-2026-0312", account: "1101 - Kas", description: "Pembayaran Invoice PT Maju Jaya - SCW Nano Coating 9H", debit: 45000000, credit: 0, status: "Approved" },
  { id: "JE-2026-00186", date: "2026-06-01", reference: "PO-2026-0089", account: "2101 - Utang Usaha", description: "Pembelian bahan baku coating dari ChemPro Asia", debit: 0, credit: 28500000, status: "Approved" },
  { id: "JE-2026-00185", date: "2026-06-01", reference: "SAL-2026-006", account: "5101 - Gaji Karyawan", description: "Gaji bulanan tim produksi SCW", debit: 125000000, credit: 0, status: "Pending" },
  { id: "JE-2026-00184", date: "2026-05-31", reference: "EXP-2026-0045", account: "6102 - Sewa Gudang", description: "Sewa gudang warehouse Surabaya Mei 2026", debit: 15000000, credit: 0, status: "Approved" },
  { id: "JE-2026-00183", date: "2026-05-30", reference: "REV-2026-0078", account: "4101 - Penjualan Produk", description: "Penjualan SCW Body Wash & SCW Tire Shine ke Toko Onderdil", debit: 0, credit: 67800000, status: "Approved" },
]

function formatIDR(amount: number): string {
  if (amount === 0) return "-"
  return `Rp ${amount.toLocaleString("id-ID")}`
}

const statusBadge = (status: string) => {
  switch (status) {
    case "Approved":
      return <Badge className="bg-slds-success/10 text-slds-success border-0 text-xs font-medium">{status}</Badge>
    case "Pending":
      return <Badge className="bg-slds-warning/10 text-amber-700 border border-amber-200 text-xs font-medium">{status}</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function AccountingDashboardPage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>
            Accounting Dashboard
          </h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>
            Ringkasan keuangan dan jurnal SCW Distribution
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/accounting/journal/create">
            <button
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "7px 14px", fontSize: 13, fontWeight: 600,
                background: "#0176d3", color: "#fff",
                border: "1px solid #0176d3", borderRadius: 6,
                cursor: "pointer", transition: "all 100ms",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#014486"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#0176d3"}
            >
              <Plus size={15} />
              New Journal Entry
            </button>
          </Link>
          <Link href="/accounting/reconciliation">
            <button
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "7px 14px", fontSize: 13, fontWeight: 500,
                background: "#fff", color: "#0176d3",
                border: "1px solid #d8d8d8", borderRadius: 6,
                cursor: "pointer", transition: "all 100ms",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#f0f7ff"; e.currentTarget.style.borderColor = "#0176d3" }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#d8d8d8" }}
            >
              <ArrowLeftRight size={15} />
              Reconciliation
            </button>
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <Card key={card.title}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    {card.title}
                  </p>
                  <p style={{ fontSize: 22, fontWeight: 700, color: "#001526", marginTop: 4 }}>
                    {card.value}
                  </p>
                  <p style={{ fontSize: 11, color: "#444746", marginTop: 2 }}>
                    {card.description}
                  </p>
                </div>
                <div className={`rounded-lg p-3 ${card.bgColor}`}>
                  <card.icon className={`h-5 w-5 ${card.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle style={{ fontSize: 15, fontWeight: 600, color: "#001526" }}>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { icon: BookOpen, label: "New Journal", href: "/accounting/journal/create" },
              { icon: ArrowLeftRight, label: "Reconciliation", href: "/accounting/reconciliation" },
              { icon: FileText, label: "Balance Sheet", href: "/accounting/balance-sheet" },
              { icon: Receipt, label: "P&L Statement", href: "/accounting/profit-loss" },
            ].map((action) => (
              <Link key={action.label} href={action.href}>
                <div
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
                    padding: 16, border: "1px solid #ecebea", borderRadius: 8,
                    cursor: "pointer", transition: "all 100ms",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#eef4ff"; e.currentTarget.style.borderColor = "#0176d3" }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "#ecebea" }}
                >
                  <action.icon size={28} style={{ color: "#0176d3" }} />
                  <span style={{ fontSize: 13, fontWeight: 500, color: "#001526" }}>{action.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Journal Entries */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle style={{ fontSize: 15, fontWeight: 600, color: "#001526" }}>Recent Journal Entries</CardTitle>
            <CardDescription style={{ fontSize: 12, color: "#444746", marginTop: 2 }}>5 entri jurnal terbaru</CardDescription>
          </div>
          <Link href="/accounting/journal">
            <button
              style={{
                padding: "6px 14px", fontSize: 12, fontWeight: 500,
                background: "#fff", color: "#0176d3",
                border: "1px solid #d8d8d8", borderRadius: 6,
                cursor: "pointer", transition: "all 100ms",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#eef4ff"; e.currentTarget.style.borderColor = "#0176d3" }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#d8d8d8" }}
            >
              View All
            </button>
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Entry ID</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Date</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Reference</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Description</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", textAlign: "right" }}>Debit</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", textAlign: "right" }}>Credit</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentEntries.map((entry) => (
                <TableRow key={entry.id} className="border-b border-[#f0f0f0]">
                  <TableCell style={{ fontSize: 13, fontWeight: 500, color: "#001526" }}>{entry.id}</TableCell>
                  <TableCell style={{ fontSize: 13, color: "#444746" }}>{entry.date}</TableCell>
                  <TableCell style={{ fontSize: 13, color: "#0176d3" }}>{entry.reference}</TableCell>
                  <TableCell style={{ fontSize: 13, color: "#444746", maxWidth: 300 }} className="truncate">{entry.description}</TableCell>
                  <TableCell style={{ fontSize: 13, fontFamily: "monospace", textAlign: "right", color: entry.debit > 0 ? "#001526" : "#444746" }}>
                    {formatIDR(entry.debit)}
                  </TableCell>
                  <TableCell style={{ fontSize: 13, fontFamily: "monospace", textAlign: "right", color: entry.credit > 0 ? "#001526" : "#444746" }}>
                    {formatIDR(entry.credit)}
                  </TableCell>
                  <TableCell>{statusBadge(entry.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
