"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  Package,
  AlertTriangle,
} from "lucide-react"

const formatIDR = (val: number) => `Rp ${val.toLocaleString("id-ID")}`

interface ReturnItem {
  name: string
  sku: string
  qty: number
  condition: "Good" | "Damaged" | "Defective"
  unitPrice: number
}

interface ReturnDetail {
  id: string
  soRef: string
  customer: string
  customerAddress: string
  date: string
  reason: string
  status: "Pending Review" | "Approved" | "Rejected" | "Completed"
  items: ReturnItem[]
  resolutionType: "Refund" | "Replacement" | "Credit Note" | null
  resolvedBy: string | null
  resolvedDate: string | null
  notes: string | null
  rejectionReason: string | null
}

const statusConfig: Record<string, { className: string; icon: React.ReactNode; label: string }> = {
  "Pending Review": { className: "bg-amber-100 text-amber-800", icon: <Clock className="h-3 w-3" />, label: "Pending Review" },
  Approved:         { className: "bg-blue-100 text-blue-800",   icon: <CheckCircle2 className="h-3 w-3" />, label: "Approved" },
  Rejected:         { className: "bg-red-100 text-red-800",     icon: <XCircle className="h-3 w-3" />, label: "Rejected" },
  Completed:        { className: "bg-emerald-100 text-emerald-800", icon: <CheckCircle2 className="h-3 w-3" />, label: "Completed" },
}

const conditionConfig: Record<string, { className: string; label: string }> = {
  Good:      { className: "bg-emerald-100 text-emerald-800", label: "Good" },
  Damaged:   { className: "bg-amber-100 text-amber-800",     label: "Damaged" },
  Defective: { className: "bg-red-100 text-red-800",         label: "Defective" },
}

const resolutionConfig: Record<string, { className: string; label: string }> = {
  Refund:       { className: "bg-indigo-100 text-indigo-800", label: "Refund" },
  Replacement:  { className: "bg-blue-100 text-blue-800",     label: "Replacement" },
  "Credit Note": { className: "bg-violet-100 text-violet-800", label: "Credit Note" },
}

const mockReturns: Record<string, ReturnDetail> = {
  "RTN-2026-005": {
    id: "RTN-2026-005", soRef: "SO-2026-041", customer: "PT Autogloss Indonesia",
    customerAddress: "Jl. Alternatif Cibinong No. 88, Bogor",
    date: "2026-06-10", reason: "Barang cacat",
    status: "Pending Review",
    items: [
      { name: "SCW Snow Foam", sku: "SCW-SF-001", qty: 1, condition: "Damaged", unitPrice: 150000 },
      { name: "SCW Ceramic Coating", sku: "SCW-CC-002", qty: 1, condition: "Damaged", unitPrice: 150000 },
    ],
    resolutionType: null, resolvedBy: null, resolvedDate: null, notes: null, rejectionReason: null,
  },
  "RTN-2026-004": {
    id: "RTN-2026-004", soRef: "SO-2026-038", customer: "GlossUp Bali",
    customerAddress: "Jl. Sunset Road No. 88, Seminyak, Bali",
    date: "2026-06-05", reason: "Salah kirim",
    status: "Approved",
    items: [
      { name: "SCW Ceramic Coating", sku: "SCW-CC-002", qty: 1, condition: "Good", unitPrice: 250000 },
    ],
    resolutionType: "Replacement", resolvedBy: null, resolvedDate: null, notes: "", rejectionReason: null,
  },
  "RTN-2026-003": {
    id: "RTN-2026-003", soRef: "SO-2026-036", customer: "CV Ceramic Pro JKT",
    customerAddress: "Jl. Panjang No. 12, Jakarta Barat",
    date: "2026-06-01", reason: "Rusak saat pengiriman",
    status: "Completed",
    items: [
      { name: "SCW Snow Foam", sku: "SCW-SF-001", qty: 2, condition: "Damaged", unitPrice: 150000 },
      { name: "SCW Interior Detailer", sku: "SCW-ID-003", qty: 1, condition: "Damaged", unitPrice: 120000 },
    ],
    resolutionType: "Refund", resolvedBy: "Rina Finance", resolvedDate: "2026-06-05", notes: "Refund sudah diproses ke rekening customer", rejectionReason: null,
  },
  "RTN-2026-002": {
    id: "RTN-2026-002", soRef: "SO-2026-035", customer: "UD Shinemax",
    customerAddress: "Jl. Raya Bandung No. 456, Bandung",
    date: "2026-05-28", reason: "Tidak sesuai pesanan",
    status: "Rejected",
    items: [
      { name: "SCW Tire Gel", sku: "SCW-TG-004", qty: 1, condition: "Good", unitPrice: 150000 },
    ],
    resolutionType: null, resolvedBy: "Rina Finance", resolvedDate: "2026-05-30", notes: null, rejectionReason: "Barang sesuai dengan pesanan, tidak ditemukan kesalahan dari pihak SCW",
  },
  "RTN-2026-001": {
    id: "RTN-2026-001", soRef: "SO-2026-033", customer: "CV ProShine SBY",
    customerAddress: "Jl. Rungkut Mapan Utara No. 10, Surabaya",
    date: "2026-05-20", reason: "Barang cacat",
    status: "Completed",
    items: [
      { name: "SCW Polish Compound", sku: "SCW-PC-007", qty: 1, condition: "Defective", unitPrice: 180000 },
      { name: "SCW Glass Cleaner", sku: "SCW-GC-009", qty: 1, condition: "Damaged", unitPrice: 85000 },
    ],
    resolutionType: "Credit Note", resolvedBy: "Rina Finance", resolvedDate: "2026-05-25", notes: "Credit note senilai Rp 265.000 diterbitkan", rejectionReason: null,
  },
}

const defaultReturn: ReturnDetail = {
  id: "RTN-2026-005", soRef: "SO-2026-041", customer: "PT Autogloss Indonesia",
  customerAddress: "Jl. Alternatif Cibinong No. 88, Bogor",
  date: "2026-06-10", reason: "Barang cacat",
  status: "Pending Review",
  items: [
    { name: "SCW Snow Foam", sku: "SCW-SF-001", qty: 1, condition: "Damaged", unitPrice: 150000 },
    { name: "SCW Ceramic Coating", sku: "SCW-CC-002", qty: 1, condition: "Damaged", unitPrice: 150000 },
  ],
  resolutionType: null, resolvedBy: null, resolvedDate: null, notes: null, rejectionReason: null,
}

export default function CustomerReturnDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)
  const data = mockReturns[id] || { ...defaultReturn, id }
  const [status, setStatus] = useState(data.status)

  const subtotal = data.items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0)

  const handleApprove = () => {
    setStatus("Approved")
  }

  const handleReject = () => {
    setStatus("Rejected")
  }

  return (
    <div className="space-y-4 p-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/customer-returns" className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-gray-900">{data.id}</h1>
              <Badge className={`${statusConfig[status].className} flex items-center gap-1`}>
                {statusConfig[status].icon}
                {statusConfig[status].label}
              </Badge>
            </div>
            <p className="text-xs text-gray-500">
              dari <Link href={`/sales/orders/${data.soRef}`} className="text-blue-600 hover:underline">{data.soRef}</Link>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {status === "Pending Review" && (
            <>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={handleApprove}>
                <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                Approve
              </Button>
              <Button size="sm" variant="destructive" onClick={handleReject}>
                <XCircle className="mr-1.5 h-3.5 w-3.5" />
                Reject
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Return Info */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Info Retur</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tanggal Retur</span>
              <span>{data.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Alasan Retur</span>
              <span>{data.reason}</span>
            </div>
            {data.resolutionType && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Tipe Resolusi</span>
                <Badge className={resolutionConfig[data.resolutionType].className}>
                  {resolutionConfig[data.resolutionType].label}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Customer Info */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Detail Customer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5 text-sm">
            <div className="font-medium">{data.customer}</div>
            <div className="text-muted-foreground text-xs">{data.customerAddress}</div>
          </CardContent>
        </Card>
      </div>

      {/* Resolution / Rejection Info */}
      {status === "Completed" && data.resolvedBy && (
        <Card className="border-emerald-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Info Resolusi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Status</span>
              <Badge className="bg-emerald-100 text-emerald-800">Completed</Badge>
            </div>
            {data.resolutionType && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Tipe Resolusi</span>
                <Badge className={resolutionConfig[data.resolutionType].className}>
                  {resolutionConfig[data.resolutionType].label}
                </Badge>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Diproses oleh</span>
              <span className="font-medium">{data.resolvedBy}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tanggal Resolusi</span>
              <span>{data.resolvedDate}</span>
            </div>
            {data.notes && (
              <div className="mt-2 rounded-lg bg-slate-50 p-3 text-xs">
                <span className="text-muted-foreground">Catatan: </span>{data.notes}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {status === "Rejected" && (
        <Card className="border-red-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-600" />
              Info Penolakan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Status</span>
              <Badge className="bg-red-100 text-red-800">Rejected</Badge>
            </div>
            {data.resolvedBy && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ditolak oleh</span>
                <span className="font-medium">{data.resolvedBy}</span>
              </div>
            )}
            {data.resolvedDate && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tanggal Penolakan</span>
                <span>{data.resolvedDate}</span>
              </div>
            )}
            {data.rejectionReason && (
              <div className="mt-2 rounded-lg bg-red-50 p-3 text-xs text-red-700">
                <span className="font-medium">Alasan Penolakan: </span>{data.rejectionReason}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {status === "Approved" && data.notes && (
        <Card className="border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              Info Persetujuan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Status</span>
              <Badge className="bg-blue-100 text-blue-800">Approved</Badge>
            </div>
            <div className="mt-2 rounded-lg bg-blue-50 p-3 text-xs text-blue-700">
              {data.notes}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Returned Items Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Barang yang Diretur</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Produk</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead className="text-center">Qty</TableHead>
                  <TableHead className="text-center">Kondisi</TableHead>
                  <TableHead className="text-right">Harga Satuan</TableHead>
                  <TableHead className="text-right">Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.items.map((item, idx) => {
                  const lineSubtotal = item.unitPrice * item.qty
                  const cond = conditionConfig[item.condition]
                  return (
                    <TableRow key={idx}>
                      <TableCell className="text-xs text-muted-foreground">{idx + 1}</TableCell>
                      <TableCell className="text-sm">{item.name}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{item.sku}</TableCell>
                      <TableCell className="text-sm text-center">{item.qty}</TableCell>
                      <TableCell className="text-center">
                        <Badge className={`${cond.className} text-[10px]`}>{cond.label}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-right">{formatIDR(item.unitPrice)}</TableCell>
                      <TableCell className="text-sm text-right font-medium">{formatIDR(lineSubtotal)}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <div className="flex justify-end">
        <Card className="w-80">
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Jumlah Item Diretur</span>
              <span>{data.items.reduce((sum, i) => sum + i.qty, 0)} pcs</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-semibold text-base">
              <span>Total Nilai Retur</span>
              <span className="text-blue-600">{formatIDR(subtotal)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
