"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DollarSign, CreditCard, Banknote, Search, X } from "lucide-react"

const formatIDR = (val: number) => `Rp ${val.toLocaleString("id-ID")}`

interface Payment {
  id: string
  customer: string
  invoice: string
  amount: number
  date: string
  status: "Completed" | "Pending" | "Failed"
  method: "Transfer" | "Cash" | "Credit Card"
}

const initialPayments: Payment[] = [
  { id: "PAY-2026-012", customer: "PT Autogloss Indonesia", invoice: "INV-2026-034", amount: 8500000, date: "2026-06-02", status: "Completed", method: "Transfer" },
  { id: "PAY-2026-011", customer: "CV Ceramic Pro JKT", invoice: "INV-2026-037", amount: 3100000, date: "2026-06-01", status: "Pending", method: "Credit Card" },
  { id: "PAY-2026-010", customer: "UD Shinemax", invoice: "INV-2026-036", amount: 4500000, date: "2026-05-30", status: "Completed", method: "Transfer" },
  { id: "PAY-2026-009", customer: "PT DetailWorks BDG", invoice: "INV-2026-035", amount: 7200000, date: "2026-05-28", status: "Completed", method: "Cash" },
  { id: "PAY-2026-008", customer: "PT Autogloss Indonesia", invoice: "INV-2026-034", amount: 8500000, date: "2026-05-25", status: "Completed", method: "Transfer" },
  { id: "PAY-2026-007", customer: "CV ProShine SBY", invoice: "INV-2026-033", amount: 2900000, date: "2026-05-22", status: "Failed", method: "Credit Card" },
  { id: "PAY-2026-006", customer: "GlossUp Bali", invoice: "INV-2026-032", amount: 6200000, date: "2026-05-20", status: "Completed", method: "Transfer" },
  { id: "PAY-2026-005", customer: "DetailPro Semarang", invoice: "INV-2026-031", amount: 2800000, date: "2026-05-18", status: "Completed", method: "Cash" },
]

const statusConfig: Record<string, { className: string }> = {
  Completed: { className: "bg-emerald-100 text-emerald-800" },
  Pending: { className: "bg-yellow-100 text-yellow-800" },
  Failed: { className: "bg-red-100 text-red-800" },
}

// ── Main Page ──
export default function PaymentsPage() {
  const [payments] = useState<Payment[]>(initialPayments)
  const [statusFilter, setStatusFilter] = useState("All")
  const [search, setSearch] = useState("")

  const filtered = payments.filter((p) => {
    const matchStatus = statusFilter === "All" || p.status === statusFilter
    const matchSearch = !search ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.customer.toLowerCase().includes(search.toLowerCase()) ||
      p.invoice.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0)
  const completedAmount = payments
    .filter((p) => p.status === "Completed")
    .reduce((sum, p) => sum + p.amount, 0)
  const pendingAmount = payments
    .filter((p) => p.status === "Pending")
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl tracking-tight">Payments</h1>
          <p className="text-muted-foreground">
            Riwayat pembayaran dari customer (read-only — dikelola oleh Accounting & Finance)
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                <DollarSign className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Payments</p>
                <p className="text-2xl">{formatIDR(totalAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <Banknote className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl text-emerald-600">{formatIDR(completedAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
                <CreditCard className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl text-yellow-600">{formatIDR(pendingAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payments Table */}
      <Card>
        <CardContent className="p-0">
          {/* Filter bar */}
          <div className="flex items-center gap-3 border-b px-4 py-2.5">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Cari payment ID / customer / invoice..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-8 pl-8 text-sm" />
            </div>
            <div className="flex items-center gap-1.5">
              {(["All", "Completed", "Pending", "Failed"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`rounded-md border px-2 py-1 text-[11px] font-medium transition-all ${
                    statusFilter === s
                      ? s === "All" ? "border-indigo-300 bg-indigo-50 text-indigo-700"
                        : s === "Completed" ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                        : s === "Pending" ? "border-yellow-300 bg-yellow-50 text-yellow-700"
                        : "border-red-300 bg-red-50 text-red-700"
                      : "border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {s === "All" ? "Semua" : s}
                </button>
              ))}
              {statusFilter !== "All" && (
                <button onClick={() => setStatusFilter("All")} className="rounded-md px-1 text-gray-400 hover:text-gray-600">
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Invoice</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-sm text-muted-foreground">
                      Tidak ada pembayaran ditemukan
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="text-xs">{payment.id}</TableCell>
                      <TableCell>{payment.customer}</TableCell>
                      <TableCell className="text-xs">{payment.invoice}</TableCell>
                      <TableCell className="text-right">{formatIDR(payment.amount)}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${statusConfig[payment.status].className}`}
                        >
                          {payment.status}
                        </span>
                      </TableCell>
                      <TableCell><Badge variant="outline">{payment.method}</Badge></TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
