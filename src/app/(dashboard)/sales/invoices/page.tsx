"use client"

import { useState, useMemo } from "react"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Search,
  FileText,
  DollarSign,
  X,
} from "lucide-react"

interface Invoice {
  id: string
  soRef: string
  customer: string
  status: "Draft" | "Sent" | "Paid" | "Overdue"
  amount: number
  dueDate: string
  issueDate: string
}

const invoices: Invoice[] = [
  { id: "INV-2026-038", soRef: "SO-2026-045", customer: "PT Autogloss Indonesia", status: "Draft", amount: 8500000, dueDate: "2026-06-15", issueDate: "2026-06-01" },
  { id: "INV-2026-037", soRef: "SO-2026-044", customer: "CV Ceramic Pro JKT", status: "Sent", amount: 6200000, dueDate: "2026-06-13", issueDate: "2026-05-30" },
  { id: "INV-2026-036", soRef: "SO-2026-043", customer: "UD Shinemax", status: "Paid", amount: 4500000, dueDate: "2026-06-11", issueDate: "2026-05-28" },
  { id: "INV-2026-035", soRef: "SO-2026-042", customer: "PT DetailWorks BDG", status: "Paid", amount: 7200000, dueDate: "2026-06-08", issueDate: "2026-05-25" },
  { id: "INV-2026-034", soRef: "SO-2026-041", customer: "PT Autogloss Indonesia", status: "Paid", amount: 8500000, dueDate: "2026-06-03", issueDate: "2026-05-20" },
  { id: "INV-2026-033", soRef: "SO-2026-040", customer: "CV ProShine SBY", status: "Overdue", amount: 5800000, dueDate: "2026-05-28", issueDate: "2026-05-18" },
  { id: "INV-2026-032", soRef: "SO-2026-038", customer: "GlossUp Bali", status: "Paid", amount: 6200000, dueDate: "2026-05-25", issueDate: "2026-05-12" },
  { id: "INV-2026-031", soRef: "SO-2026-037", customer: "DetailPro Semarang", status: "Paid", amount: 2800000, dueDate: "2026-05-23", issueDate: "2026-05-10" },
]

const statusConfig = {
  Draft: { label: "Draft", className: "bg-gray-100 text-gray-800" },
  Sent: { label: "Sent", className: "bg-blue-100 text-blue-800" },
  Paid: { label: "Paid", className: "bg-emerald-100 text-emerald-800" },
  Overdue: { label: "Overdue", className: "bg-red-100 text-red-800" },
}

const formatIDR = (val: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(val)

export default function InvoiceListPage() {
  const [statusFilter, setStatusFilter] = useState("All")
  const [search, setSearch] = useState("")
  const [invoiceList, setInvoiceList] = useState(invoices)

  const filtered = useMemo(() => {
    return invoiceList.filter((i) => {
      const matchStatus = statusFilter === "All" || i.status === statusFilter
      const matchSearch = !search ||
        i.id.toLowerCase().includes(search.toLowerCase()) ||
        i.customer.toLowerCase().includes(search.toLowerCase()) ||
        i.soRef.toLowerCase().includes(search.toLowerCase())
      return matchStatus && matchSearch
    })
  }, [statusFilter, search, invoiceList])

  const totalAmount = filtered.reduce((sum, i) => sum + i.amount, 0)
  const paidAmount = invoiceList.filter((i) => i.status === "Paid").reduce((sum, i) => sum + i.amount, 0)
  const overdueAmount = invoiceList.filter((i) => i.status === "Overdue").reduce((sum, i) => sum + i.amount, 0)

  return (
    <div className="space-y-4 p-6">
      {/* Header */}
      <div>
        <h1 className="text-lg font-bold text-gray-900">Invoices</h1>
        <p className="text-xs text-gray-500">Riwayat invoice dari Purchase Orders</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                <FileText className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Invoices</p>
                <p className="text-2xl">{formatIDR(totalAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <DollarSign className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Paid</p>
                <p className="text-2xl text-emerald-600">{formatIDR(paidAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                <DollarSign className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-2xl text-red-600">{formatIDR(overdueAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {/* Filter bar */}
          <div className="flex items-center gap-3 border-b px-4 py-2.5">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Cari invoice / PO / customer..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-8 pl-8 text-sm" />
            </div>
            <div className="flex items-center gap-1.5">
              {(["All", "Draft", "Sent", "Paid", "Overdue"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`rounded-md border px-2 py-1 text-[11px] font-medium transition-all ${
                    statusFilter === s
                      ? s === "All" ? "border-indigo-300 bg-indigo-50 text-indigo-700"
                        : s === "Paid" ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                        : s === "Overdue" ? "border-red-300 bg-red-50 text-red-700"
                        : s === "Sent" ? "border-blue-300 bg-blue-50 text-blue-700"
                        : "border-gray-300 bg-gray-50 text-gray-700"
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
          <table className="w-full">
            <thead>
              <tr className="border-b bg-slate-50 text-left text-xs font-medium text-slate-500">
                <th className="px-3 py-2 w-32">Invoice #</th>
                <th className="px-3 py-2 w-32">PO Ref</th>
                <th className="px-3 py-2">Customer</th>
                <th className="px-3 py-2">Issue Date</th>
                <th className="px-3 py-2">Due Date</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2 text-right w-36">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-3 py-10 text-center text-sm text-muted-foreground">
                    Tidak ada invoice ditemukan
                  </td>
                </tr>
              ) : (
                filtered.map((inv) => (
                  <tr
                    key={inv.id}
                    className="border-b last:border-0 hover:bg-slate-50/50 transition-colors cursor-pointer"
                    onClick={() => window.location.href = `/sales/invoices/${inv.id}`}
                  >
                    <td className="px-3 py-2 text-sm">{inv.id}</td>
                    <td className="px-3 py-2 text-sm">{inv.soRef}</td>
                    <td className="px-3 py-2 text-sm">{inv.customer}</td>
                    <td className="px-3 py-2 text-sm text-muted-foreground">{inv.issueDate}</td>
                    <td className="px-3 py-2 text-sm text-muted-foreground">{inv.dueDate}</td>
                    <td className="px-3 py-2">
                      <select
                        value={inv.status}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                          const newStatus = e.target.value as Invoice["status"]
                          setInvoiceList((prev) =>
                            prev.map((x) => (x.id === inv.id ? { ...x, status: newStatus } : x))
                          )
                        }}
                        className={`cursor-pointer rounded-full border-0 px-2 py-0.5 text-xs font-medium outline-none transition-colors hover:opacity-80 ${statusConfig[inv.status].className}`}
                      >
                        <option value="Draft">Draft</option>
                        <option value="Sent">Sent</option>
                        <option value="Paid">Paid</option>
                        <option value="Overdue">Overdue</option>
                      </select>
                    </td>
                    <td className="px-3 py-2 text-sm text-right font-medium">{formatIDR(inv.amount)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
