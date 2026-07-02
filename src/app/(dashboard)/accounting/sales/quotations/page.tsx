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

interface Quotation {
  id: string
  date: string
  customer: string
  status: "Draft" | "Approved" | "Rejected" | "Expired"
  total: number
}

const quotations: Quotation[] = [
  { id: "SQ.2026.06.00001", date: "2026-06-18", customer: "PT Autogloss Indonesia", status: "Draft", total: 12500000 },
  { id: "SQ.2026.06.00002", date: "2026-06-17", customer: "CV Ceramic Pro JKT", status: "Approved", total: 8750000 },
  { id: "SQ.2026.06.00003", date: "2026-06-16", customer: "UD Shinemax", status: "Draft", total: 4200000 },
  { id: "SQ.2026.06.00004", date: "2026-06-15", customer: "PT DetailWorks BDG", status: "Approved", total: 15600000 },
  { id: "SQ.2026.06.00005", date: "2026-06-14", customer: "CV ProShine SBY", status: "Rejected", total: 6300000 },
  { id: "SQ.2026.06.00006", date: "2026-06-12", customer: "AutoCare Makassar", status: "Expired", total: 2800000 },
  { id: "SQ.2026.06.00007", date: "2026-06-10", customer: "GlossUp Bali", status: "Approved", total: 9450000 },
  { id: "SQ.2026.06.00008", date: "2026-06-08", customer: "DetailPro Semarang", status: "Draft", total: 3150000 },
  { id: "SQ.2026.06.00009", date: "2026-06-05", customer: "PT Autogloss Indonesia", status: "Approved", total: 22000000 },
  { id: "SQ.2026.06.00010", date: "2026-06-03", customer: "CV Ceramic Pro JKT", status: "Rejected", total: 7800000 },
]

const statusConfig: Record<string, { className: string }> = {
  Draft: { className: "bg-amber-100 text-amber-800" },
  Approved: { className: "bg-emerald-100 text-emerald-800" },
  Rejected: { className: "bg-red-100 text-red-800" },
  Expired: { className: "bg-gray-100 text-gray-800" },
}

type FilterValue = "all" | "approved" | "draft" | "rejected"

const formatIDR = (val: number) =>
  `Rp ${val.toLocaleString("id-ID")}`

export default function QuotationsPage() {
  const [statusFilter, setStatusFilter] = useState<FilterValue>("all")
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    return quotations.filter((q) => {
      const matchStatus =
        statusFilter === "all" ||
        (statusFilter === "approved" && q.status === "Approved") ||
        (statusFilter === "draft" && q.status === "Draft") ||
        (statusFilter === "rejected" && (q.status === "Rejected" || q.status === "Expired"))
      const matchSearch =
        !search ||
        q.id.toLowerCase().includes(search.toLowerCase()) ||
        q.customer.toLowerCase().includes(search.toLowerCase())
      return matchStatus && matchSearch
    })
  }, [statusFilter, search])

  const totalCount = quotations.length
  const approvedCount = quotations.filter((q) => q.status === "Approved").length
  const draftCount = quotations.filter((q) => q.status === "Draft").length
  const rejectedCount = quotations.filter((q) => q.status === "Rejected" || q.status === "Expired").length

  return (
    <div className="space-y-5 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Penawaran Penjualan</h1>
          <p className="text-sm text-[#706e6b] mt-0.5">
            Daftar penawaran penjualan kepada pelanggan
          </p>
        </div>
        <Link href="/accounting/sales/quotations/create">
          <Button className="bg-[#0176d3] hover:bg-[#014486] text-white h-8 text-sm px-4">
            <Plus className="mr-1.5 h-4 w-4" />
            Buat Penawaran
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
                <p className="text-[11px] uppercase tracking-wide text-[#706e6b] font-medium">Total Penawaran</p>
                <p className="text-2xl font-bold text-[#181818]">{totalCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer border border-[#e0e0e0] shadow-sm transition-all hover:shadow-md ${statusFilter === "approved" ? "ring-2 ring-[#2e844a]" : ""}`}
          onClick={() => setStatusFilter("approved")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f3f3f3]">
                <FileText className="h-5 w-5 text-[#2e844a]" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-[#706e6b] font-medium">Disetujui</p>
                <p className="text-2xl font-bold text-[#2e844a]">{approvedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer border border-[#e0e0e0] shadow-sm transition-all hover:shadow-md ${statusFilter === "draft" ? "ring-2 ring-[#d4503c]" : ""}`}
          onClick={() => setStatusFilter("draft")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f3f3f3]">
                <FileText className="h-5 w-5 text-[#d4503c]" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-[#706e6b] font-medium">Draft</p>
                <p className="text-2xl font-bold text-[#d4503c]">{draftCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer border border-[#e0e0e0] shadow-sm transition-all hover:shadow-md ${statusFilter === "rejected" ? "ring-2 ring-[#ba0517]" : ""}`}
          onClick={() => setStatusFilter("rejected")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f3f3f3]">
                <FileText className="h-5 w-5 text-[#ba0517]" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-[#706e6b] font-medium">Dibatalkan</p>
                <p className="text-2xl font-bold text-[#ba0517]">{rejectedCount}</p>
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
              <CardTitle className="text-sm font-bold text-[#181818]">Daftar Penawaran</CardTitle>
              <CardDescription className="text-[11px] text-[#706e6b]">
                {filtered.length} penawaran ditemukan
                {statusFilter !== "all" && (
                  <span className="ml-1">
                    ({statusFilter === "approved" ? "Disetujui" : statusFilter === "draft" ? "Draft" : "Dibatalkan"})
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
                  <th className="px-4 py-3 text-[11px] uppercase tracking-wider font-bold text-[#706e6b] text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 px-4">
                      <p className="text-[13px] text-[#706e6b]">Tidak ada penawaran ditemukan</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((q) => (
                    <tr
                      key={q.id}
                      className="border-b border-[#f0f0f0] cursor-pointer hover:bg-[#f0f7ff] transition-colors"
                      onClick={() => window.location.href = `/accounting/sales/quotations/${q.id}`}
                    >
                      <td className="px-4 py-3 text-[13px]">
                        <span className="text-[#0176d3] hover:underline">{q.id}</span>
                      </td>
                      <td className="px-4 py-3 text-[13px] text-[#706e6b]">{q.date}</td>
                      <td className="px-4 py-3 text-[13px]">
                        <span className="text-[#0176d3] hover:underline">{q.customer}</span>
                      </td>
                      <td className="px-4 py-3 text-[13px]">
                        <Badge variant="outline" className={`border-0 ${statusConfig[q.status].className} text-[11px] font-medium px-2 py-0.5`}>
                          {q.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-[13px] text-right font-medium text-[#181818]">{formatIDR(q.total)}</td>
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
