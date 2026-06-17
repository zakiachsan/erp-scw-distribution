"use client"

import React, { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AlertTriangle, DollarSign, CreditCard, ArrowLeft, FileText, CheckCircle2, Package } from "lucide-react"
import Link from "next/link"

const formatIDR = (val: number) => `Rp ${val.toLocaleString("id-ID")}`

// ── Products (from operasional module) ──
const products = [
  { id: "P01", sku: "SCW-SF-001", name: "SCW Snow Foam", price: 150000, unit: "pcs" },
  { id: "P02", sku: "SCW-CC-002", name: "SCW Ceramic Coating", price: 250000, unit: "pcs" },
  { id: "P03", sku: "SCW-ID-003", name: "SCW Interior Detailer", price: 120000, unit: "pcs" },
  { id: "P04", sku: "SCW-TG-004", name: "SCW Tire Gel", price: 95000, unit: "pcs" },
  { id: "P05", sku: "SCW-SW-008", name: "SCW Spray Wax", price: 110000, unit: "pcs" },
  { id: "P06", sku: "SCW-GC-009", name: "SCW Glass Cleaner", price: 85000, unit: "pcs" },
  { id: "P07", sku: "SCW-PC-007", name: "SCW Polish Compound", price: 180000, unit: "pcs" },
  { id: "P08", sku: "SCW-SP-018", name: "SCW Shampoo Plus", price: 90000, unit: "pcs" },
  { id: "P09", sku: "SCW-IL-017", name: "SCW Iron Decontamination", price: 135000, unit: "pcs" },
  { id: "P10", sku: "SCW-AW-011", name: "SCW All Purpose Cleaner", price: 105000, unit: "pcs" },
]

// ── PO Data ──
const tierDiscountMap: Record<string, number> = { Bronze: 0.02, Silver: 0.05, Gold: 0.08, Platinum: 0.12 }
const statusConfig: Record<string, { label: string; className: string }> = {
  Draft: { label: "Draft", className: "bg-gray-100 text-gray-800" },
  Confirmed: { label: "Confirmed", className: "bg-blue-100 text-blue-800" },
  Processing: { label: "Processing", className: "bg-amber-100 text-amber-800" },
  Shipped: { label: "Shipped", className: "bg-violet-100 text-violet-800" },
  Completed: { label: "Completed", className: "bg-emerald-100 text-emerald-800" },
}

interface POItem {
  productId: string
  qty: number
  price: number
  discount: number
}

interface PO {
  id: string
  customer: string
  companyId: string
  date: string
  status: "Draft" | "Confirmed" | "Processing" | "Shipped" | "Completed"
  items: POItem[]
  notes: string
}

const purchaseOrders: PO[] = [
  {
    id: "SO-2026-045", customer: "PT Autogloss Indonesia", companyId: "C001", date: "2026-06-01", status: "Confirmed", notes: "Kirim ke gudang utama",
    items: [
      { productId: "P01", qty: 10, price: 150000, discount: 18000 },
      { productId: "P02", qty: 5, price: 250000, discount: 30000 },
    ],
  },
  {
    id: "SO-2026-044", customer: "CV Ceramic Pro JKT", companyId: "C002", date: "2026-05-30", status: "Processing", notes: "",
    items: [
      { productId: "P02", qty: 10, price: 250000, discount: 20000 },
    ],
  },
  {
    id: "SO-2026-043", customer: "UD Shinemax", companyId: "C003", date: "2026-05-28", status: "Shipped", notes: "Pengiriman via JNE",
    items: [
      { productId: "P01", qty: 5, price: 150000, discount: 12000 },
      { productId: "P03", qty: 8, price: 120000, discount: 9600 },
      { productId: "P04", qty: 10, price: 95000, discount: 7600 },
    ],
  },
  {
    id: "SO-2026-042", customer: "PT DetailWorks BDG", companyId: "C004", date: "2026-05-25", status: "Completed", notes: "",
    items: [
      { productId: "P02", qty: 15, price: 250000, discount: 18750 },
    ],
  },
  {
    id: "SO-2026-041", customer: "PT Autogloss Indonesia", companyId: "C001", date: "2026-05-20", status: "Completed", notes: "Repeat order",
    items: [
      { productId: "P01", qty: 20, price: 150000, discount: 24000 },
      { productId: "P05", qty: 10, price: 110000, discount: 10560 },
    ],
  },
  {
    id: "SO-2026-040", customer: "CV ProShine SBY", companyId: "C005", date: "2026-05-18", status: "Shipped", notes: "",
    items: [
      { productId: "P06", qty: 15, price: 85000, discount: 6375 },
      { productId: "P07", qty: 8, price: 180000, discount: 14400 },
    ],
  },
  {
    id: "SO-2026-039", customer: "AutoCare Makassar", companyId: "C006", date: "2026-05-15", status: "Draft", notes: "Menunggu konfirmasi",
    items: [
      { productId: "P08", qty: 20, price: 90000, discount: 3600 },
    ],
  },
  {
    id: "SO-2026-038", customer: "GlossUp Bali", companyId: "C007", date: "2026-05-12", status: "Completed", notes: "",
    items: [
      { productId: "P02", qty: 8, price: 250000, discount: 24000 },
      { productId: "P04", qty: 12, price: 95000, discount: 13680 },
    ],
  },
  {
    id: "SO-2026-037", customer: "DetailPro Semarang", companyId: "C008", date: "2026-05-10", status: "Completed", notes: "",
    items: [
      { productId: "P01", qty: 10, price: 150000, discount: 6000 },
    ],
  },
  {
    id: "SO-2026-036", customer: "CV Ceramic Pro JKT", companyId: "C002", date: "2026-05-08", status: "Completed", notes: "",
    items: [
      { productId: "P03", qty: 10, price: 120000, discount: 9600 },
      { productId: "P10", qty: 8, price: 105000, discount: 8400 },
    ],
  },
]

// Only POs that are Confirmed or beyond can be invoiced
const invoiceableStatuses = ["Confirmed", "Processing", "Shipped", "Completed"]

export default function CreateInvoicePage() {
  const [selectedPOId, setSelectedPOId] = useState("")
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split("T")[0])
  const [paymentTerms, setPaymentTerms] = useState("")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const selectedPO = useMemo(() => purchaseOrders.find((po) => po.id === selectedPOId) || null, [selectedPOId])

  const poItems = useMemo(() => {
    if (!selectedPO) return []
    return selectedPO.items.map((item) => {
      const product = products.find((p) => p.id === item.productId)
      return {
        ...item,
        productName: product?.name || "Unknown",
        sku: product?.sku || "-",
        unit: product?.unit || "pcs",
        subtotal: (item.price - item.discount) * item.qty,
      }
    })
  }, [selectedPO])

  const subtotal = poItems.reduce((sum, i) => sum + i.price * i.qty, 0)
  const totalDiscount = poItems.reduce((sum, i) => sum + i.discount * i.qty, 0)
  const total = subtotal - totalDiscount

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPO) return
    setIsSubmitting(true)
    setTimeout(() => {
      setSubmitted(true)
      setIsSubmitting(false)
    }, 1000)
  }

  const invoiceablePOs = purchaseOrders.filter((po) => invoiceableStatuses.includes(po.status))

  if (submitted) {
    return (
      <div className="space-y-4">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Create Invoice</h1>
          <p className="text-xs text-gray-500">Buat invoice dari Purchase Order</p>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-7 w-7 text-emerald-600" />
            </div>
            <h2 className="mb-1 text-lg font-semibold">Invoice Created!</h2>
            <p className="mb-1 text-sm text-muted-foreground">
              Invoice untuk <strong>{selectedPO?.customer}</strong> dari PO <strong>{selectedPO?.id}</strong>
            </p>
            <p className="mb-5 text-lg font-bold">{formatIDR(total)}</p>
            <div className="flex gap-2">
              <Link href="/sales/invoices">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                  Kembali
                </Button>
              </Link>
              <Button size="sm" onClick={() => { setSubmitted(false); setSelectedPOId(""); setPaymentTerms(""); setNotes("") }}>
                Buat Invoice Lain
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link href="/sales/invoices" className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Create Invoice</h1>
            <p className="text-xs text-gray-500">Buat invoice dari Purchase Order</p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          {/* Main */}
          <div className="space-y-4">
            {/* Select PO */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Pilih Purchase Order
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedPOId} onValueChange={(v) => setSelectedPOId(v ?? "")}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih PO yang mau di-invoice..." />
                  </SelectTrigger>
                  <SelectContent>
                    {invoiceablePOs.map((po) => {
                      const st = statusConfig[po.status]
                      return (
                        <SelectItem key={po.id} value={po.id}>
                          <span className="flex items-center gap-2">
                            <span className="text-xs">{po.id}</span>
                            <span>—</span>
                            <span>{po.customer}</span>
                            <Badge variant="outline" className={`text-[10px] px-1 py-0 ${st.className}`}>{st.label}</Badge>
                          </span>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* PO Details */}
            {selectedPO && (
              <>
                {/* PO Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Detail PO — {selectedPO.id}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground">Customer</p>
                        <p className="font-medium">{selectedPO.customer}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Tanggal PO</p>
                        <p>{selectedPO.date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Status</p>
                        <Badge variant="outline" className={statusConfig[selectedPO.status].className}>
                          {statusConfig[selectedPO.status].label}
                        </Badge>
                      </div>
                      {selectedPO.notes && (
                        <div>
                          <p className="text-xs text-muted-foreground">Catatan PO</p>
                          <p className="text-xs">{selectedPO.notes}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Product Items */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Produk yang Dibeli
                    </CardTitle>
                    <CardDescription>Item dari PO ini akan masuk ke invoice</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-slate-50 text-left text-xs font-medium text-slate-500">
                          <th className="px-3 py-2">Produk</th>
                          <th className="px-3 py-2">SKU</th>
                          <th className="px-3 py-2 text-right">Harga</th>
                          <th className="px-3 py-2 text-center">Qty</th>
                          <th className="px-3 py-2 text-right">Disc/Unit</th>
                          <th className="px-3 py-2 text-right">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {poItems.map((item, i) => (
                          <tr key={i} className="border-b last:border-0">
                            <td className="px-3 py-2 text-xs font-medium">{item.productName}</td>
                            <td className="px-3 py-2 text-xs text-muted-foreground ">{item.sku}</td>
                            <td className="px-3 py-2 text-xs text-right">{formatIDR(item.price)}</td>
                            <td className="px-3 py-2 text-xs text-center">{item.qty} {item.unit}</td>
                            <td className="px-3 py-2 text-xs text-right text-emerald-600">-{formatIDR(item.discount)}</td>
                            <td className="px-3 py-2 text-xs text-right font-medium">{formatIDR(item.subtotal)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-t">
                          <td colSpan={5} className="px-3 py-2 text-xs text-right text-muted-foreground">Subtotal</td>
                          <td className="px-3 py-2 text-xs text-right font-medium">{formatIDR(subtotal)}</td>
                        </tr>
                        <tr>
                          <td colSpan={5} className="px-3 py-2 text-xs text-right text-muted-foreground">Diskon</td>
                          <td className="px-3 py-2 text-xs text-right text-emerald-600">-{formatIDR(totalDiscount)}</td>
                        </tr>
                        <tr className="border-t font-semibold">
                          <td colSpan={5} className="px-3 py-2 text-sm text-right">Total</td>
                          <td className="px-3 py-2 text-sm text-right">{formatIDR(total)}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </CardContent>
                </Card>

                {/* Invoice Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Data Invoice</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Tanggal Invoice</Label>
                        <Input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} className="h-8 text-sm" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Payment Terms</Label>
                        <Input placeholder="e.g. Net 30, COD" value={paymentTerms} onChange={(e) => setPaymentTerms(e.target.value)} className="h-8 text-sm" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Catatan</Label>
                      <Textarea placeholder="Catatan invoice..." rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} className="text-sm" />
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex justify-end gap-2">
                  <Link href="/sales/invoices">
                    <Button type="button" variant="outline" size="sm">Batal</Button>
                  </Link>
                  <Button type="submit" size="sm" disabled={!selectedPO || isSubmitting}>
                    {isSubmitting ? "Membuat..." : "Buat Invoice"}
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Ringkasan Invoice
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedPO ? (
                  <>
                    <div>
                      <p className="text-xs text-muted-foreground">PO Number</p>
                      <p className="text-sm font-medium">{selectedPO.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Customer</p>
                      <p className="text-sm font-medium">{selectedPO.customer}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Jumlah Item</p>
                      <p className="text-sm">{poItems.length} produk</p>
                    </div>
                    <div className="border-t pt-3 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>{formatIDR(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Diskon</span>
                        <span className="text-emerald-600">-{formatIDR(totalDiscount)}</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold border-t pt-2">
                        <span>Total Invoice</span>
                        <span>{formatIDR(total)}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="py-8 text-center">
                    <FileText className="mx-auto mb-2 h-8 w-8 text-muted-foreground/40" />
                    <p className="text-xs text-muted-foreground">Pilih PO terlebih dahulu</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </form>
  )
}
