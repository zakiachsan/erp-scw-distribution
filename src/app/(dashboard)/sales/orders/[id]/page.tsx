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
  FileText,
  DollarSign,
  CheckCircle2,
  Clock,
  Package,
  Truck,
  Printer,
  Download,
} from "lucide-react"

const formatIDR = (val: number) => `Rp ${val.toLocaleString("id-ID")}`

interface OrderItem {
  productName: string
  sku: string
  category: string
  qty: number
  unitPrice: number
  discount: number
}

interface SalesOrderDetail {
  id: string
  quotationRef: string
  customer: string
  customerType: "Reseller" | "Dealer" | "Workshop"
  customerAddress: string
  customerPhone: string
  date: string
  status: "Draft" | "Confirmed" | "Processing" | "Approved" | "Packing" | "Shipped" | "Completed"
  paymentStatus: "Unpaid" | "Partial" | "Paid"
  paymentVerifiedBy: string | null
  paymentVerifiedDate: string | null
  packingSlipNo: string | null
  notes: string
  items: OrderItem[]
}

const statusConfig: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
  Draft:     { label: "Draft", className: "bg-gray-100 text-gray-800", icon: <Clock className="h-3 w-3" /> },
  Confirmed: { label: "Confirmed", className: "bg-blue-100 text-blue-800", icon: <CheckCircle2 className="h-3 w-3" /> },
  Processing:{ label: "Processing", className: "bg-amber-100 text-amber-800", icon: <Clock className="h-3 w-3" /> },
  Approved:  { label: "Approved", className: "bg-emerald-100 text-emerald-800", icon: <CheckCircle2 className="h-3 w-3" /> },
  Packing:   { label: "Packing", className: "bg-violet-100 text-violet-800", icon: <Package className="h-3 w-3" /> },
  Shipped:   { label: "Shipped", className: "bg-cyan-100 text-cyan-800", icon: <Truck className="h-3 w-3" /> },
  Completed: { label: "Completed", className: "bg-emerald-100 text-emerald-800", icon: <CheckCircle2 className="h-3 w-3" /> },
}

const paymentConfig: Record<string, { className: string; label: string }> = {
  Unpaid:  { className: "bg-red-100 text-red-800", label: "Unpaid" },
  Partial: { className: "bg-amber-100 text-amber-800", label: "Partial" },
  Paid:    { className: "bg-emerald-100 text-emerald-800", label: "Paid" },
}

const flowSteps = [
  { key: "Draft",      label: "Draft", desc: "SO dibuat" },
  { key: "Confirmed",  label: "Confirmed", desc: "SO dikonfirmasi" },
  { key: "Processing", label: "Payment Verified", desc: "Finance & Accounting verifikasi bayar" },
  { key: "Approved",   label: "Finance Approved", desc: "Pembayaran diterima" },
  { key: "Packing",    label: "Warehouse Packing", desc: "Gudang siapkan barang + Packing Slip" },
  { key: "Shipped",    label: "Shipped", desc: "Barang dikirim" },
  { key: "Completed",  label: "Completed", desc: "Selesai" },
]

const orders: Record<string, SalesOrderDetail> = {
  "SO-2026-045": {
    id: "SO-2026-045", quotationRef: "QUO-2026-012", customer: "PT Autogloss Indonesia",
    customerType: "Dealer", customerAddress: "Jl. Alternatif Cibinong No. 88, Bogor", customerPhone: "021-87654321",
    date: "2026-06-15", status: "Confirmed", paymentStatus: "Unpaid", paymentVerifiedBy: null, paymentVerifiedDate: null, packingSlipNo: null,
    notes: "Kirim ke gudang utama",
    items: [
      { productName: "SCW Snow Foam", sku: "SCW-SF-001", category: "Exterior Care", qty: 20, unitPrice: 150000, discount: 20 },
      { productName: "SCW Interior Detailer", sku: "SCW-ID-003", category: "Interior Care", qty: 50, unitPrice: 120000, discount: 18 },
    ],
  },
  "SO-2026-044": {
    id: "SO-2026-044", quotationRef: "QUO-2026-011", customer: "CV Ceramic Pro JKT",
    customerType: "Workshop", customerAddress: "Jl. Panjang No. 12, Jakarta Barat", customerPhone: "021-54321098",
    date: "2026-06-12", status: "Processing", paymentStatus: "Partial", paymentVerifiedBy: null, paymentVerifiedDate: null, packingSlipNo: null,
    notes: "DP 50% sudah dibayar, sisa tunggu pelunasan",
    items: [
      { productName: "SCW Ceramic Coating", sku: "SCW-CC-002", category: "Coating & Protection", qty: 10, unitPrice: 250000, discount: 15 },
    ],
  },
  "SO-2026-043": {
    id: "SO-2026-043", quotationRef: "QUO-2026-010", customer: "UD Shinemax",
    customerType: "Reseller", customerAddress: "Jl. Raya Bandung No. 456, Bandung", customerPhone: "022-76543210",
    date: "2026-06-10", status: "Packing", paymentStatus: "Paid", paymentVerifiedBy: "Rina Finance", paymentVerifiedDate: "2026-06-13", packingSlipNo: "PS-2026-0089",
    notes: "Pengiriman via Cargo",
    items: [
      { productName: "SCW Snow Foam", sku: "SCW-SF-001", category: "Exterior Care", qty: 5, unitPrice: 150000, discount: 15 },
      { productName: "SCW Interior Detailer", sku: "SCW-ID-003", category: "Interior Care", qty: 8, unitPrice: 120000, discount: 12 },
      { productName: "SCW Tire Gel", sku: "SCW-TG-004", category: "Wheel & Tire", qty: 10, unitPrice: 95000, discount: 12 },
    ],
  },
  "SO-2026-042": {
    id: "SO-2026-042", quotationRef: "QUO-2026-009", customer: "PT DetailWorks BDG",
    customerType: "Workshop", customerAddress: "Jl. Soekarno-Hatta No. 789, Bandung", customerPhone: "022-65432109",
    date: "2026-06-08", status: "Approved", paymentStatus: "Paid", paymentVerifiedBy: "Rina Finance", paymentVerifiedDate: "2026-06-11", packingSlipNo: null,
    notes: "",
    items: [
      { productName: "SCW Ceramic Coating", sku: "SCW-CC-002", category: "Coating & Protection", qty: 15, unitPrice: 250000, discount: 8 },
    ],
  },
}

export default function SalesOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)
  const data = orders[id] || {
    id, quotationRef: "QUO-2026-012", customer: "PT Autogloss Indonesia",
    customerType: "Dealer" as const, customerAddress: "Jl. Alternatif Cibinong No. 88, Bogor", customerPhone: "021-87654321",
    date: "2026-06-15", status: "Confirmed" as const, paymentStatus: "Unpaid" as const, paymentVerifiedBy: null, paymentVerifiedDate: null, packingSlipNo: null,
    notes: "",
    items: [
      { productName: "SCW Snow Foam", sku: "SCW-SF-001", category: "Exterior Care", qty: 20, unitPrice: 150000, discount: 20 },
      { productName: "SCW Interior Detailer", sku: "SCW-ID-003", category: "Interior Care", qty: 50, unitPrice: 120000, discount: 18 },
    ],
  }

  const [status, setStatus] = useState(data.status)

  const subtotal = data.items.reduce((sum, item) => {
    const lineTotal = item.unitPrice * item.qty
    const discountAmount = lineTotal * (item.discount / 100)
    return sum + (lineTotal - discountAmount)
  }, 0)

  const taxAmount = subtotal * 0.11
  const total = subtotal + taxAmount

  const currentStepIndex = flowSteps.findIndex((s) => s.key === status)

  return (
    <div className="space-y-4 p-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/sales/orders" className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-gray-900">{data.id}</h1>
              <Badge className={`${statusConfig[status].className} flex items-center gap-1`}>
                {statusConfig[status].icon}
                {statusConfig[status].label}
              </Badge>
              <Badge className={`${paymentConfig[data.paymentStatus].className}`}>
                {paymentConfig[data.paymentStatus].label}
              </Badge>
            </div>
            <p className="text-xs text-gray-500">
              dari <Link href={`/sales/quotations/${data.quotationRef}`} className="text-blue-600 hover:underline">{data.quotationRef}</Link>
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="mr-1.5 h-3.5 w-3.5" />
            Print
          </Button>
          <Button variant="outline" size="sm" onClick={() => alert("PDF berhasil didownload!")}>
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Flow Steps */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-1">
            {flowSteps.map((step, idx) => {
              const isCompleted = idx < currentStepIndex
              const isCurrent = idx === currentStepIndex
              return (
                <React.Fragment key={step.key}>
                  <div className={`flex flex-col items-center gap-1 flex-1 ${isCompleted ? "text-emerald-600" : isCurrent ? "text-blue-600" : "text-gray-400"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${isCompleted ? "bg-emerald-100 text-emerald-600" : isCurrent ? "bg-blue-100 text-blue-600 ring-2 ring-blue-300" : "bg-gray-100 text-gray-400"}`}>
                      {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
                    </div>
                    <span className="text-[10px] font-medium text-center leading-tight">{step.label}</span>
                    <span className="text-[9px] text-muted-foreground text-center leading-tight hidden md:block">{step.desc}</span>
                  </div>
                  {idx < flowSteps.length - 1 && (
                    <div className={`h-0.5 flex-1 max-w-8 ${idx < currentStepIndex ? "bg-emerald-300" : "bg-gray-200"}`} />
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Info Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Customer */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Detail Customer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5 text-sm">
            <div className="font-medium">{data.customer}</div>
            <div className="text-muted-foreground text-xs">{data.customerAddress}</div>
            <div className="text-xs">Telp: {data.customerPhone}</div>
            <div className="pt-1"><Badge variant="outline">{data.customerType}</Badge></div>
          </CardContent>
        </Card>

        {/* Order Info */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Info Sales Order</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tanggal</span>
              <span>{data.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Quotation Ref</span>
              <Link href={`/sales/quotations/${data.quotationRef}`} className="text-blue-600 hover:underline font-medium text-sm">
                {data.quotationRef}
              </Link>
            </div>
            {data.notes && (
              <div className="mt-2 rounded-lg bg-slate-50 p-3 text-xs">
                <span className="text-muted-foreground">Catatan: </span>{data.notes}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Payment & Warehouse Info */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Payment Status */}
        <Card className={data.paymentStatus === "Paid" ? "border-emerald-200" : data.paymentStatus === "Partial" ? "border-amber-200" : "border-red-200"}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Status Pembayaran
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Payment Status</span>
              <Badge className={paymentConfig[data.paymentStatus].className}>{paymentConfig[data.paymentStatus].label}</Badge>
            </div>
            {data.paymentVerifiedBy && (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Diverifikasi oleh</span>
                  <span className="font-medium">{data.paymentVerifiedBy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tanggal Verifikasi</span>
                  <span>{data.paymentVerifiedDate}</span>
                </div>
              </>
            )}
            {data.paymentStatus !== "Paid" && (
              <div className="mt-2 rounded-lg bg-amber-50 p-2 text-[10px] text-amber-700">
                ⚠️ Pembayaran harus lunasi & diverifikasi Finance sebelum masuk ke Warehouse.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Warehouse / Packing */}
        <Card className={data.packingSlipNo ? "border-violet-200" : "border-gray-200"}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Package className="h-4 w-4" />
              Warehouse & Packing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {data.packingSlipNo ? (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Packing Slip #</span>
                  <span className="font-medium text-violet-600">{data.packingSlipNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge className="bg-violet-100 text-violet-800">Siap Kirim</Badge>
                </div>
                <Button size="sm" variant="outline" className="mt-2 w-full" onClick={() => alert("Print Packing Slip")}>
                  <Printer className="mr-1.5 h-3.5 w-3.5" />
                  Print Packing Slip
                </Button>
              </>
            ) : (
              <div className="text-muted-foreground text-xs py-4 text-center">
                {status === "Approved" || status === "Packing" || status === "Shipped" || status === "Completed"
                  ? "Menunggu gudang menerbitkan Packing Slip"
                  : "Packing Slip akan terbit setelah pembayaran diverifikasi Finance & Accounting"}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Items Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Rincian Produk</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Produk</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead className="text-center">Qty</TableHead>
                  <TableHead className="text-right">Harga</TableHead>
                  <TableHead className="text-center">Disc</TableHead>
                  <TableHead className="text-right">Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.items.map((item, idx) => {
                  const lineTotal = item.unitPrice * item.qty
                  const discountAmount = lineTotal * (item.discount / 100)
                  const lineSubtotal = lineTotal - discountAmount
                  return (
                    <TableRow key={idx}>
                      <TableCell className="text-xs text-muted-foreground">{idx + 1}</TableCell>
                      <TableCell className="text-sm">{item.productName}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{item.sku}</TableCell>
                      <TableCell><Badge variant="outline" className="text-[10px]">{item.category}</Badge></TableCell>
                      <TableCell className="text-sm text-center">{item.qty}</TableCell>
                      <TableCell className="text-sm text-right">{formatIDR(item.unitPrice)}</TableCell>
                      <TableCell className="text-sm text-center">{item.discount > 0 ? `${item.discount}%` : "-"}</TableCell>
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
          <CardContent className="p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatIDR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">PPN (11%)</span>
              <span>{formatIDR(taxAmount)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold text-base">
              <span>Total</span>
              <span className="text-blue-600">{formatIDR(total)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
