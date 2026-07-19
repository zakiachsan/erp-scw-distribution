"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
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
  CheckCircle2,
  XCircle,
  Printer,
  ShoppingCart,
  Download,
  Truck,
  Percent,
} from "lucide-react"
import Link from "next/link"

const formatIDR = (val: number) => `Rp ${val.toLocaleString("id-ID")}`

// Mock quotation detail data
const quotationData: Record<string, {
  id: string
  customer: string
  customerId: string
  customerType: "Reseller" | "Dealer" | "Workshop"
  customerAddress: string
  customerPhone: string
  customerEmail: string
  customerNpwp: string
  date: string
  validUntil: string
  status: "Draft" | "Sent" | "Accepted" | "Rejected" | "Expired"
  paymentTerms: string
  deliveryMethod: string
  deliveryEst: string
  isTaxable: boolean
  notes: string
  items: { name: string; sku: string; category: string; qty: number; price: number; discount: number; unit: string }[]
  soRef?: string
}> = {
  "QUO-2026-012": {
    id: "QUO-2026-012",
    customer: "PT Autogloss Indonesia",
    customerId: "C001",
    customerType: "Dealer",
    customerAddress: "Jl. Alternatif Cibinong No. 88, Bogor",
    customerPhone: "021-87654321",
    customerEmail: "sales@autogloss.co.id",
    customerNpwp: "01.234.567.8-012.000",
    date: "2026-06-15",
    validUntil: "2026-07-15",
    status: "Draft",
    paymentTerms: "Net 30",
    deliveryMethod: "JNE",
    deliveryEst: "2-3 hari",
    isTaxable: true,
    notes: "Harga sudah termasuk pengiriman ke gudang PT Autogloss",
    items: [
      { name: "SCW Snow Foam", sku: "SCW-SF-001", category: "Exterior Care", qty: 20, price: 150000, discount: 20, unit: "pcs" },
      { name: "SCW Interior Detailer", sku: "SCW-ID-003", category: "Interior Care", qty: 50, price: 120000, discount: 18, unit: "pcs" },
    ],
    soRef: undefined,
  },
  "QUO-2026-010": {
    id: "QUO-2026-010",
    customer: "UD Shinemax",
    customerId: "C003",
    customerType: "Reseller",
    customerAddress: "Jl. Raya Bandung No. 456, Bandung",
    customerPhone: "022-76543210",
    customerEmail: "info@shinemax.co.id",
    customerNpwp: "03.456.789.0-014.000",
    date: "2026-06-10",
    validUntil: "2026-07-10",
    status: "Accepted",
    paymentTerms: "Net 30",
    deliveryMethod: "Cargo (Truk/Container)",
    deliveryEst: "3-7 hari",
    isTaxable: true,
    notes: "Bulk order untuk bulan Juli",
    items: [
      { name: "SCW Snow Foam", sku: "SCW-SF-001", category: "Exterior Care", qty: 5, price: 150000, discount: 15, unit: "pcs" },
      { name: "SCW Interior Detailer", sku: "SCW-ID-003", category: "Interior Care", qty: 8, price: 120000, discount: 12, unit: "pcs" },
      { name: "SCW Tire Gel", sku: "SCW-TG-004", category: "Wheel & Tire", qty: 10, price: 95000, discount: 12, unit: "pcs" },
    ],
    soRef: "SO-2026-043",
  },
}

const statusConfig: Record<string, { className: string; label: string }> = {
  Draft: { className: "bg-gray-100 text-gray-800", label: "Draft" },
  Sent: { className: "bg-blue-100 text-blue-800", label: "Sent" },
  Accepted: { className: "bg-emerald-100 text-emerald-800", label: "Accepted" },
  Rejected: { className: "bg-red-100 text-red-800", label: "Rejected" },
  Expired: { className: "bg-amber-100 text-amber-800", label: "Expired" },
}

export default function QuotationDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const data = quotationData[id] || {
    id,
    customer: "PT Autogloss Indonesia",
    customerId: "C001",
    customerType: "Dealer" as const,
    customerAddress: "Jl. Alternatif Cibinong No. 88, Bogor",
    customerPhone: "021-87654321",
    customerEmail: "sales@autogloss.co.id",
    customerNpwp: "01.234.567.8-012.000",
    date: "2026-06-15",
    validUntil: "2026-07-15",
    status: "Draft" as const,
    paymentTerms: "Net 30",
    deliveryMethod: "JNE",
    deliveryEst: "2-3 hari",
    isTaxable: true,
    notes: "",
    items: [
      { name: "SCW Snow Foam", sku: "SCW-SF-001", category: "Exterior Care", qty: 20, price: 150000, discount: 20, unit: "pcs" },
      { name: "SCW Interior Detailer", sku: "SCW-ID-003", category: "Interior Care", qty: 50, price: 120000, discount: 18, unit: "pcs" },
    ],
  }

  const [status, setStatus] = useState(data.status)

  const subtotal = data.items.reduce((sum, item) => {
    const lineTotal = item.price * item.qty
    const discountAmount = lineTotal * (item.discount / 100)
    return sum + (lineTotal - discountAmount)
  }, 0)

  const taxAmount = data.isTaxable ? subtotal * 0.11 : 0
  const total = subtotal + taxAmount

  const handleConvertToPO = () => {
    alert(`Quotation ${data.id} berhasil dikonversi ke Purchase Order!`)
    router.push("/sales/orders")
  }

  return (
    <div className="space-y-4 p-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/sales/quotations" className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-gray-900">{data.id}</h1>
              <Badge className={statusConfig[status].className}>{statusConfig[status].label}</Badge>
            </div>
            <p className="text-xs text-gray-500">Quotation untuk {data.customer}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="mr-1.5 h-3.5 w-3.5" />
            Print
          </Button>
          <Button variant="outline" size="sm" onClick={() => alert("PDF Quotation berhasil didownload!")}>
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Download PDF
          </Button>
          {status === "Sent" && (
            <>
              <Button size="sm" variant="outline" className="border-red-300 text-red-600 hover:bg-red-50" onClick={() => { setStatus("Rejected"); alert("Quotation ditolak") }}>
                <XCircle className="mr-1.5 h-3.5 w-3.5" />
                Tolak
              </Button>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={() => { setStatus("Accepted"); alert("Quotation diterima!") }}>
                <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                Terima
              </Button>
            </>
          )}
          {status === "Accepted" && !data.soRef && (
            <Button size="sm" onClick={handleConvertToPO}>
              <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
              Konversi ke PO
            </Button>
          )}
        </div>
      </div>

      {/* Row 1: Customer Info + Quotation Info */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Customer Detail */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Detail Customer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="font-medium">{data.customer}</div>
            <div className="text-muted-foreground text-xs">{data.customerAddress}</div>
            <div className="text-xs">Telp: {data.customerPhone}</div>
            <div className="text-xs">Email: {data.customerEmail}</div>
            <div className="text-xs">NPWP: {data.customerNpwp}</div>
            <div className="pt-2 flex gap-2">
              <Badge variant="outline">{data.customerType}</Badge>
              <Badge variant="outline">{data.customerId}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Quotation Info */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Info Quotation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tanggal</span>
              <span>{data.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Valid Until</span>
              <span>{data.validUntil}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Syarat Pembayaran</span>
              <span className="font-medium">{data.paymentTerms}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Pengiriman</span>
              <span className="flex items-center gap-1">
                <Truck className="h-3 w-3" />
                {data.deliveryMethod} ({data.deliveryEst})
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Pajak</span>
              <Badge variant={data.isTaxable ? "default" : "secondary"}>
                {data.isTaxable ? "PPN 11%" : "Non-Pajak"}
              </Badge>
            </div>
            {data.soRef && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">SO Reference</span>
                <Link href={`/sales/orders/${data.soRef}`} className="text-blue-600 hover:underline font-medium text-sm">
                  {data.soRef}
                </Link>
              </div>
            )}
            {data.notes && (
              <div className="mt-2 rounded-lg bg-slate-50 p-3 text-xs">
                <span className="text-muted-foreground">Catatan: </span>{data.notes}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tiering Discount Info */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardContent className="p-3 flex items-center gap-3">
          <Percent className="h-4 w-4 text-blue-600 shrink-0" />
          <div className="text-xs">
            <span className="font-medium text-blue-800">Tiering Discount ({data.customerType}): </span>
            <span className="text-blue-700">Discount per kategori produk berdasarkan tipe customer {data.customerType}</span>
          </div>
        </CardContent>
      </Card>

      {/* Items Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Rincian Produk / Jasa</CardTitle>
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
                  const lineTotal = item.price * item.qty
                  const discountAmount = lineTotal * (item.discount / 100)
                  const lineSubtotal = lineTotal - discountAmount

                  return (
                    <TableRow key={idx}>
                      <TableCell className="text-xs text-muted-foreground">{idx + 1}</TableCell>
                      <TableCell className="text-sm">{item.name}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{item.sku}</TableCell>
                      <TableCell><Badge variant="outline" className="text-[10px]">{item.category}</Badge></TableCell>
                      <TableCell className="text-sm text-center">{item.qty} {item.unit}</TableCell>
                      <TableCell className="text-sm text-right">{formatIDR(item.price)}</TableCell>
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
              <span>{data.isTaxable ? formatIDR(taxAmount) : "-"}</span>
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
