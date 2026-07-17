"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
import {
  Search,
  FileText,
  Package,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react"
import { inboundPOSources } from "@/lib/warehouse-store"

interface AllocationItem {
  locationId: string
  rackId: string
  qty: string
  status: string
}

interface POReport {
  poId: string
  poNumber: string
  supplier: string
  totalItems: number
  putawayStatus: string
  damagedCount: number
  rtlUpdated: boolean
  hologramApplied: boolean
}

export default function ReportsPage() {
  const [mounted, setMounted] = useState(false)
  const [search, setSearch] = useState("")
  const [reports, setReports] = useState<POReport[]>([])

  useEffect(() => {
    setMounted(true)

    // Sample report data with all the fields the user requested
    const sampleReports: POReport[] = inboundPOSources.map((po) => {
      const stored = localStorage.getItem("scw-warehouse-allocations")
      let damagedCount = 0
      let putawayStatus = "Not Started"
      let locations: string[] = []

      if (stored) {
        try {
          const allAllocs = JSON.parse(stored)
          const allocData = allAllocs[po.id] || allAllocs[po.id.replace("po-", "po-00")]
          if (allocData) {
            const allAllocsList: AllocationItem[] = Object.values(allocData.items || {}).flat()
            const assigned = allAllocsList.filter((a) => a.rackId && parseInt(a.qty) > 0)
            const damaged = allAllocsList.filter((a) => a.status === "Rusak/Cacat")

            damagedCount = damaged.length
            locations = [...new Set(assigned.map((a) => a.locationId))]

            if (assigned.length > 0) {
              putawayStatus = allAllocsList.every((a) => a.rackId || a.status === "Rusak/Cacat")
                ? "Complete"
                : assigned.length > 0 ? "Partial" : "Pending"
            }
          }
        } catch {}
      }

      // Sample flags (in real app these would come from a backend)
      const rtlUpdated = po.id === "po-001" || po.id === "po-005"
      const hologramApplied = po.id === "po-001"

      return {
        poId: po.id,
        poNumber: po.poNumber,
        supplier: po.supplier,
        totalItems: po.items.length,
        putawayStatus,
        damagedCount,
        rtlUpdated,
        hologramApplied,
      }
    })

    setReports(sampleReports)
  }, [])

  const filtered = reports.filter(
    (r) =>
      r.poNumber.toLowerCase().includes(search.toLowerCase()) ||
      r.supplier.toLowerCase().includes(search.toLowerCase())
  )

  if (!mounted) {
    return (
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inventory Reports</h1>
          <p className="text-muted-foreground">Memuat...</p>
        </div>
      </div>
    )
  }

  const totalPOs = reports.length
  const withDamage = reports.filter((r) => r.damagedCount > 0).length
  const completePutaway = reports.filter((r) => r.putawayStatus === "Complete").length

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Inventory Reports</h1>
        <p className="text-muted-foreground">
          Ringkasan lengkap PO, putaway, inventory, dan kondisi barang
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                <FileText className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Total PO</p>
                <p className="text-lg font-semibold">{totalPOs}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                <CheckCircle2 className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Putaway Complete</p>
                <p className="text-lg font-semibold">{completePutaway}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Dengan Kerusakan</p>
                <p className="text-lg font-semibold">{withDamage}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Laporan Inventory per PO</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari PO atau supplier..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">Tidak ada data laporan.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>PO Number</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead className="text-center">Items</TableHead>
                    <TableHead>Putaway</TableHead>
                    <TableHead className="text-center">Damaged</TableHead>
                    <TableHead className="text-center">PRTL</TableHead>
                    <TableHead className="text-center">Stiker</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((report) => (
                    <TableRow key={report.poId}>
                      <TableCell>
                        <Link
                          href={`/inventory/reports/${report.poId}`}
                          className="text-blue-600 hover:underline font-sans font-medium text-sm"
                        >
                          {report.poNumber}
                        </Link>
                      </TableCell>
                      <TableCell className="text-sm">{report.supplier}</TableCell>
                      <TableCell className="text-center text-sm">{report.totalItems}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            report.putawayStatus === "Complete"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : report.putawayStatus === "Partial"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-slate-50 text-slate-600 border-slate-200"
                          }`}
                        >
                          {report.putawayStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {report.damagedCount > 0 ? (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs">
                            <AlertTriangle className="mr-1 h-3 w-3" />
                            {report.damagedCount}
                          </Badge>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {report.rtlUpdated ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" />
                        ) : (
                          <Clock className="h-4 w-4 text-muted-foreground/50 mx-auto" />
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {report.hologramApplied ? (
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                            ✓ Tempel
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200 text-xs">
                            ✗ Belum
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
