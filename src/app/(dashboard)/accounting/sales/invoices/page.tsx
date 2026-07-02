"use client"

import { useState, useMemo } from "react"
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
import { Input } from "@/components/ui/input"
import {
  Search,
  Plus,
  FileText,
} from "lucide-react"

interface Invoice {
  id: string
  date: string
  customer: string
  status: "Draft" | "Sent" | "Paid" | "Overdue"
  total: number
  dueDate: string
}

const invoices: Invoice[] = [
  { id: "INV.2026.06.00001", date: "2026-06-18", customer: "PT Autogloss Indonesia", status: "Draft", total: 12500000, dueDate: "2026-07-18" },
  { id: "INV.2026.06.00002", date: "2026-06-17", customer: "CV Ceramic Pro JKT", status: "Sent", total: 8750000, dueDate: "2026-07-17" },
  { id: "INV.2026.06.00003", date: "2026-06-15", customer: "PT DetailWorks BDG", status: "Paid", total: 15600000, dueDate: "2026-07-15" },
  { id: "INV.2026.06.00004", date: "2026-06-12", customer: "GlossUp Bali", status: "Paid", total: 9450000, dueDate: "2026-07-12" },
  { id: "INV.2026.06.00005", date: "2026-06-10", customer: "PT Autogloss Indonesia", status: "Paid", total: 22000000, dueDate: "2026-07-10" },
  { id: "INV.2026.06.00006", date: "2026-06-08", customer: "CV ProShine SBY", status: "Overdue", total: 6300000, dueDate: "2026-06-08" },
  { id: "INV.2026.06.00007", date: "2026-06-05", customer: "DetailPro Semarang", status: "Paid", total: 3150000, dueDate: "2026-07-05" },
  { id: "INV.2026.06.00008", date: "2026-06-03", customer: "UD Shinemax", status: "Paid", total: 4200000, dueDate: "2026-07-03" },
  { id: "INV.2026.06.00009", date: "2026-06-01", customer: "AutoCare Makassar", status: "Sent", total: 2800000, dueDate: "2026-07-01" },
  { id: "INV.2026.06.00010", date: "2026-05-28", customer: "CV Ceramic Pro JKT", status: "Paid", total: 5400000, dueDate: "2026-06-28" },
]

const statusConfig: Record<string, { className: string }> = {
  Draft: { className: "bg-gray-100 text-gray-800" },
  Sent: { className: "bg-blue-100 text-blue-800" },
  Paid: { className: "bg-emerald-100 text-emerald-800" },
  Overdue: { className: "bg-red-100 text-red-800" },
}

type FilterValue = "all" | "paid" | "unpaid" | "overdue"

const formatIDR = (val: number) =>
  `Rp ${val.toLocaleString("id-ID")}`

export default function InvoicesPage() {
  const [statusFilter, setStatusFilter] = useState<FilterValue>("all")
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    return invoices.filter((i) => {
      const matchStatus =
        statusFilter === "all" ||
        (statusFilter === "paid" && i.status === "Paid") ||
        (statusFilter === "unpaid" && (i.status === "Draft" || i.status === "Sent")) ||
        (statusFilter === "overdue" && i.status === "Overdue")
      const matchSearch =
        !search ||
        i.id.toLowerCase().includes(search.toLowerCase()) ||
        i.customer.toLowerCase().includes(search.toLowerCase())
      return matchStatus && matchSearch
    })
  }, [statusFilter, search])

  const totalCount = invoices.length
  const paidCount = invoices.filter((i) => i.status === "Paid").length
  const unpaidCount = invoices.filter((i) => i.status === "Draft" || i.status === "Sent").length
  const overdueCount = invoices.filter((i) => i.status === "Overdue").length

  return (
    <div className="space-y-5 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Faktur Penjualan</h1>
          <p className="text-sm text-[#706e6b] mt-0.5">
            Daftar faktur penjualan dan pelunasan
          </p>
        </div>
        <Link href="/accounting/sales/invoices/create">
          <Button className="bg-[#0176d3] hover:bg-[#014486] text-white h-8 text-sm px-4">
            <Plus className="mr-1.5 h-4 w-4" />
            Buat Faktur
          </Button>
        </Link>
      </div>

      {/* Summary Cards - SLDS style */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card
          className={`cursor-pointer border border-[#e0e0e0] shadow-sm transition-all hover:shadow-md ${statusFilter === "all" ? "ring-2 ring-[#0176d3]" : ""}`}
          onClick={() => setStatusFilter("all")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f3f3f3]">
                <FileText className="h-5 w-5 text-[#0176d3]" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-[#706e6b] font-medium">Total Faktur</p>
                <p className="text-2xl font-bold text-[#181818]">{totalCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer border border-[#e0e0e0] shadow-sm transition-all hover:shadow-md ${statusFilter === "paid" ? "ring-2 ring-[#2e844a]" : ""}`}
          onClick={() => setStatusFilter("paid")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f3f3f3]">
                <FileText className="h-5 w-5 text-[#2e844a]" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-[#706e6b] font-medium">Lunas</p>
                <p className="text-2xl font-bold text-[#2e844a]">{paidCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer border border-[#e0e0e0] shadow-sm transition-all hover:shadow-md ${statusFilter === "unpaid" ? "ring-2 ring-[#d4503c]" : ""}`}
          onClick={() => setStatusFilter("unpaid")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f3f3f3]">
                <FileText className="h-5 w-5 text-[#d4503c]" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-[#706e6b] font-medium">Belum Lunas</p>
                <p className="text-2xl font-bold text-[#d4503c]">{unpaidCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer border border-[#e0e0e0] shadow-sm transition-all hover:shadow-md ${statusFilter === "overdue" ? "ring-2 ring-[#ba0517]" : ""}`}
          onClick={() => setStatusFilter("overdue")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f3f3f3]">
                <FileText className="h-5 w-5 text-[#ba0517]" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-[#706e6b] font-medium">Jatuh Tempo</p>
                <p className="text-2xl font-bold text-[#ba0517]">{overdueCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table Card */}
      <Card className="border border-[#e0e0e0] shadow-sm">
        <CardHeader className="px-4 py-3 border-b border-[#e0e0e0]">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-bold text-[#181818]">Daftar Faktur</CardTitle>
              <CardDescription className="text-[11px] text-[#706e6b]">
                {filtered.length} faktur ditemukan
                {statusFilter !== "all" && (
                  <span className="ml-1">
                    ({statusFilter === "paid" ? "Lunas" : statusFilter === "unpaid" ? "Belum Lunas" : "Jatuh Tempo"})
                  </span>
                )}
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              {statusFilter !== "all" && (
                <Button variant="outline" size="sm" onClick={() => setStatusFilter("all")} className="h-8 text-xs">
                  Clear filter
                </Button>
              )}
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#706e6b]" />
                <Input
                  placeholder="Cari nomor / pelanggan..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-8 pl-8 w-64 text-[13px] border-[#e0e0e0]"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#f0f0f0] bg-white">
                  <th className="px-4 py-3 text-[11px] uppercase tracking-wider font-bold text-[#706e6b] text-left">Nomor #</th>
                  <th className="px-4 py-3 text-[11px] uppercase tracking-wider font-bold text-[#706e6b] text-left">Tanggal</th>
                  <th className="px-4 py-3 text-[11px] uppercase tracking-wider font-bold text-[#706e6b] text-left">Pelanggan</th>
                  <th className="px-4 py-3 text-[11px] uppercase tracking-wider font-bold text-[#706e6b] text-left">Status</th>
                  <th className="px-4 py-3 text-[11px] uppercase tracking-wider font-bold text-[#706e6b] text-left">Jatuh Tempo</th>
                  <th className="px-4 py-3 text-[11px] uppercase tracking-wider font-bold text-[#706e6b] text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 px-4">
                      <p className="text-[13px] text-[#706e6b]">Tidak ada faktur ditemukan</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((inv) => (
                    <tr
                      key={inv.id}
                      className="border-b border-[#f0f0f0] cursor-pointer hover:bg-[#f0f7ff] transition-colors"
                      onClick={() => window.location.href = `/accounting/sales/invoices/${inv.id}`}
                    >
                      <td className="px-4 py-3 text-[13px]">
                        <span className="text-[#0176d3] hover:underline">{inv.id}</span>
                      </td>
                      <td className="px-4 py-3 text-[13px] text-[#706e6b]">{inv.date}</td>
                      <td className="px-4 py-3 text-[13px]">
                        <span className="text-[#0176d3] hover:underline">{inv.customer}</span>
                      </td>
                      <td className="px-4 py-3 text-[13px]">
                        <Badge variant="outline" className={`border-0 ${statusConfig[inv.status].className} text-[11px] font-medium px-2 py-0.5`}>
                          {inv.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-[13px] text-[#706e6b]">{inv.dueDate}</td>
                      <td className="px-4 py-3 text-[13px] text-right font-medium text-[#181818]">{formatIDR(inv.total)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
