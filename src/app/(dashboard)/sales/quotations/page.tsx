"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, FileText, Search, X } from "lucide-react"

const formatIDR = (val: number) => `Rp ${val.toLocaleString("id-ID")}`

interface Quotation {
  id: string
  customer: string
  date: string
  validUntil: string
  status: "Draft" | "Sent" | "Accepted" | "Rejected" | "Expired"
  total: number
  items: number
  paymentTerms: string
  customerType: "Reseller" | "Dealer" | "Workshop"
  deliveryMethod: string
  isTaxable: boolean
}

const quotations: Quotation[] = [
  { id: "QUO-2026-012", customer: "PT Autogloss Indonesia", date: "2026-06-15", validUntil: "2026-07-15", status: "Draft", total: 8500000, items: 2, paymentTerms: "Net 30", customerType: "Dealer", deliveryMethod: "JNE", isTaxable: true },
  { id: "QUO-2026-011", customer: "CV Ceramic Pro JKT", date: "2026-06-12", validUntil: "2026-07-12", status: "Sent", total: 6200000, items: 3, paymentTerms: "Net 14", customerType: "Workshop", deliveryMethod: "J&T Express", isTaxable: true },
  { id: "QUO-2026-010", customer: "UD Shinemax", date: "2026-06-10", validUntil: "2026-07-10", status: "Accepted", total: 4500000, items: 2, paymentTerms: "Net 30", customerType: "Reseller", deliveryMethod: "Cargo", isTaxable: true },
  { id: "QUO-2026-009", customer: "PT DetailWorks BDG", date: "2026-06-08", validUntil: "2026-07-08", status: "Sent", total: 7200000, items: 1, paymentTerms: "Net 30", customerType: "Workshop", deliveryMethod: "Kurir Instant", isTaxable: false },
  { id: "QUO-2026-008", customer: "PT Autogloss Indonesia", date: "2026-06-05", validUntil: "2026-07-05", status: "Accepted", total: 8500000, items: 2, paymentTerms: "Net 14", customerType: "Dealer", deliveryMethod: "Cargo", isTaxable: true },
  { id: "QUO-2026-007", customer: "CV ProShine SBY", date: "2026-06-03", validUntil: "2026-07-03", status: "Expired", total: 5800000, items: 3, paymentTerms: "Net 30", customerType: "Reseller", deliveryMethod: "TIKI", isTaxable: true },
  { id: "QUO-2026-006", customer: "AutoCare Makassar", date: "2026-06-01", validUntil: "2026-07-01", status: "Rejected", total: 3200000, items: 1, paymentTerms: "Net 30", customerType: "Dealer", deliveryMethod: "JNE", isTaxable: false },
  { id: "QUO-2026-005", customer: "GlossUp Bali", date: "2026-05-28", validUntil: "2026-06-28", status: "Accepted", total: 6200000, items: 2, paymentTerms: "Net 14", customerType: "Workshop", deliveryMethod: "Kurir Instant", isTaxable: true },
  { id: "QUO-2026-004", customer: "DetailPro Semarang", date: "2026-05-25", validUntil: "2026-06-25", status: "Expired", total: 2800000, items: 1, paymentTerms: "Net 30", customerType: "Reseller", deliveryMethod: "J&T Express", isTaxable: true },
  { id: "QUO-2026-003", customer: "CV Ceramic Pro JKT", date: "2026-05-22", validUntil: "2026-06-22", status: "Accepted", total: 4100000, items: 2, paymentTerms: "Net 30", customerType: "Workshop", deliveryMethod: "Cargo", isTaxable: true },
]

const statusConfig: Record<string, { className: string }> = {
  Draft: { className: "bg-gray-100 text-gray-800" },
  Sent: { className: "bg-blue-100 text-blue-800" },
  Accepted: { className: "bg-emerald-100 text-emerald-800" },
  Rejected: { className: "bg-red-100 text-red-800" },
  Expired: { className: "bg-amber-100 text-amber-800" },
}

export default function QuotationListPage() {
  const [quotationList, setQuotationList] = useState(quotations)
  const [statusFilter, setStatusFilter] = useState("All")
  const [search, setSearch] = useState("")
  const router = useRouter()

  const filtered = useMemo(() => {
    return quotationList.filter((q) => {
      const matchStatus = statusFilter === "All" || q.status === statusFilter
      const matchSearch = !search ||
        q.id.toLowerCase().includes(search.toLowerCase()) ||
        q.customer.toLowerCase().includes(search.toLowerCase())
      return matchStatus && matchSearch
    })
  }, [statusFilter, search, quotationList])

  const totalValue = filtered.reduce((sum, q) => sum + q.total, 0)
  const pendingCount = quotationList.filter((q) => ["Draft", "Sent"].includes(q.status)).length
  const acceptedCount = quotationList.filter((q) => q.status === "Accepted").length

  return (
    <div className="space-y-4 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Quotation</h1>
          <p className="text-xs text-gray-500">Kelola penawaran harga kepada customer sebelum Purchase Order</p>
        </div>
        <Link href="/sales/quotations/create">
          <Button size="sm">
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Buat Quotation
          </Button>
        </Link>
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
                <p className="text-sm text-muted-foreground">Total Quotation</p>
                <p className="text-2xl">{formatIDR(totalValue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending (Draft/Sent)</p>
                <p className="text-2xl">{pendingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <FileText className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Accepted</p>
                <p className="text-2xl text-emerald-600">{acceptedCount}</p>
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
              <Input placeholder="Cari quotation number atau customer..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-8 pl-8 text-sm" />
            </div>
            <div className="flex items-center gap-1.5">
              {(["All", "Draft", "Sent", "Accepted", "Rejected", "Expired"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`rounded-md border px-2 py-1 text-[11px] font-medium transition-all ${
                    statusFilter === s
                      ? s === "All" ? "border-indigo-300 bg-indigo-50 text-indigo-700"
                        : s === "Draft" ? "border-gray-300 bg-gray-100 text-gray-700"
                        : s === "Sent" ? "border-blue-300 bg-blue-50 text-blue-700"
                        : s === "Accepted" ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                        : s === "Rejected" ? "border-red-300 bg-red-50 text-red-700"
                        : "border-amber-300 bg-amber-50 text-amber-700"
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
                  <TableHead>Quotation #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Pengiriman</TableHead>
                  <TableHead>Pajak</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-10 text-sm text-muted-foreground">
                      Tidak ada quotation ditemukan
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((q) => (
                    <TableRow
                      key={q.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => router.push(`/sales/quotations/${q.id}`)}
                    >
                      <TableCell className="text-xs font-medium text-blue-600 hover:underline">{q.id}</TableCell>
                      <TableCell className="text-sm">{q.customer}</TableCell>
                      <TableCell><Badge variant="outline" className="text-[10px]">{q.customerType}</Badge></TableCell>
                      <TableCell className="text-sm">{q.items} produk</TableCell>
                      <TableCell className="text-xs">{q.deliveryMethod}</TableCell>
                      <TableCell className="text-xs">{q.isTaxable ? "PPN" : "Non-Pajak"}</TableCell>
                      <TableCell>
                        <select
                          value={q.status}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => {
                            const newStatus = e.target.value as Quotation["status"]
                            setQuotationList((prev) =>
                              prev.map((x) => (x.id === q.id ? { ...x, status: newStatus } : x))
                            )
                          }}
                          className={`cursor-pointer rounded-full border-0 px-2 py-0.5 text-xs font-medium outline-none transition-colors hover:opacity-80 ${statusConfig[q.status].className}`}
                        >
                          <option value="Draft">Draft</option>
                          <option value="Sent">Sent</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Rejected">Rejected</option>
                          <option value="Expired">Expired</option>
                        </select>
                      </TableCell>
                      <TableCell className="text-right text-sm">{formatIDR(q.total)}</TableCell>
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
