"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import { Suspense } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  Edit,
  Printer,
  CheckCircle2,
  Clock,
  Package,
  CreditCard,
  Circle,
  CircleDot,
  Banknote,
  Truck,
} from "lucide-react"

import WarehouseAssignmentSection from "@/components/warehouse-assignment"

/* ── Types ── */
interface Payment {
  id: string
  date: string
  type: "DP" | "Angsuran" | "Pelunasan"
  method: "Transfer" | "Tunai" | "Cek" | "GIRO"
  amount: number
  reference: string
  notes: string
  dpPercentage?: number
}

interface POData {
  id: string
  poNumber: string
  supplier: string
  supplierAddress: string
  supplierContact: string
  date: string
  expectedDelivery: string
  status: "Draft" | "Sent" | "Received" | "Partial" | "Paid"
  currency: string
  items: {
    product: string
    sku: string
    qty: number
    unitPrice: number
    total: number
  }[]
  subtotal: number
  tax: number
  shipping: number
  grandTotal: number
  payments: Payment[]
}

/* ── Sample Data ── */
const initialPaymentsPO1: Payment[] = [
  {
    id: "p1",
    date: "2025-12-12",
    type: "DP",
    method: "Transfer",
    amount: 6350700,
    reference: "TRF/BCA/20251212-001",
    notes: "DP 30%",
    dpPercentage: 30,
  },
  {
    id: "p2",
    date: "2025-12-20",
    type: "Pelunasan",
    method: "Transfer",
    amount: 14818300,
    reference: "TRF/BCA/20251220-002",
    notes: "Pelunasan setelah barang diterima",
  },
]

const poDataMap: Record<string, POData> = {
  "1": {
    id: "1",
    poNumber: "PO-2025-0042",
    supplier: "PT Autocare Indonesia",
    supplierAddress: "Jl. Industri Raya No. 88, Tangerang, Banten 15132",
    supplierContact: "Budi Santoso - +62 812-9876-5432",
    date: "2025-12-10",
    expectedDelivery: "2025-12-17",
    status: "Paid",
    currency: "IDR",
    items: [
      { product: "SCW Snow Foam", sku: "SCW-SF-001", qty: 100, unitPrice: 48000, total: 4800000 },
      { product: "SCW Shampoo Plus", sku: "SCW-SP-018", qty: 100, unitPrice: 42000, total: 4200000 },
      { product: "SCW Interior Detailer", sku: "SCW-ID-003", qty: 80, unitPrice: 52000, total: 4160000 },
      { product: "SCW Tire Gel", sku: "SCW-TG-004", qty: 60, unitPrice: 38000, total: 2280000 },
      { product: "SCW Glass Cleaner", sku: "SCW-GC-009", qty: 50, unitPrice: 35000, total: 1750000 },
      { product: "SCW Microfiber Towel", sku: "SCW-MF-015", qty: 200, unitPrice: 8000, total: 1600000 },
    ],
    subtotal: 18790000,
    tax: 1879000,
    shipping: 500000,
    grandTotal: 21169000,
    payments: initialPaymentsPO1,
  },
  "4": {
    id: "4",
    poNumber: "PO-2025-0045",
    supplier: "DetailPro Supply",
    supplierAddress: "Jl. Raya Kebayoran No. 45, Jakarta Selatan",
    supplierContact: "Dewi Sartika - +62 821-3456-7890",
    date: "2025-12-14",
    expectedDelivery: "2025-12-28",
    status: "Partial",
    currency: "IDR",
    items: [
      { product: "Microfiber Cloth 40x40", sku: "MF-40-001", qty: 500, unitPrice: 5500, total: 2750000 },
      { product: "Microfiber Cloth 60x60", sku: "MF-60-002", qty: 300, unitPrice: 8500, total: 2550000 },
      { product: "Applicator Pad Yellow", sku: "AP-YL-003", qty: 200, unitPrice: 3200, total: 640000 },
      { product: "Applicator Pad Black", sku: "AP-BL-004", qty: 200, unitPrice: 3500, total: 700000 },
    ],
    subtotal: 6640000,
    tax: 664000,
    shipping: 350000,
    grandTotal: 7654000,
    payments: [
      {
        id: "p3",
        date: "2025-12-16",
        type: "DP",
        method: "Transfer",
        amount: 2296200,
        reference: "TRF/BCA/20251216-003",
        notes: "DP 30%",
        dpPercentage: 30,
      },
    ],
  },
}

const defaultPO: POData = {
  id: "0",
  poNumber: "PO-2025-0044",
  supplier: "NanoTech Coatings",
  supplierAddress: "78 Innovation Drive, Singapore 138632",
  supplierContact: "James Chen - +65 9123-4567",
  date: "2025-12-13",
  expectedDelivery: "2026-01-05",
  status: "Sent",
  currency: "USD",
  items: [
    { product: "SCW Ceramic Coating", sku: "SCW-CC-002", qty: 100, unitPrice: 14.1, total: 1410 },
    { product: "SCW Iron Decontamination", sku: "SCW-IL-017", qty: 50, unitPrice: 8.5, total: 425 },
  ],
  subtotal: 1835,
  tax: 0,
  shipping: 320,
  grandTotal: 2155,
  payments: [],
}

const statusConfig: Record<string, { label: string; className: string }> = {
  Draft: { label: "Draft", className: "bg-gray-100 text-gray-800" },
  Sent: { label: "Sent", className: "bg-blue-100 text-blue-800" },
  Received: { label: "Received", className: "bg-amber-100 text-amber-800" },
  Partial: { label: "Partial", className: "bg-cyan-100 text-cyan-800" },
  Paid: { label: "Paid", className: "bg-emerald-100 text-emerald-800" },
}

const timelineColorConfig: Record<string, Record<string, string>> = {
  created: { completed: "bg-gray-100 text-gray-600", current: "bg-gray-100 text-gray-600", pending: "bg-gray-100 text-gray-400", border: "bg-gray-200" },
  sent: { completed: "bg-blue-100 text-blue-600", current: "bg-blue-100 text-blue-600", pending: "bg-gray-100 text-gray-400", border: "bg-blue-200" },
  received: { completed: "bg-amber-100 text-amber-600", current: "bg-amber-100 text-amber-600", pending: "bg-gray-100 text-gray-400", border: "bg-amber-200" },
  paid: { completed: "bg-emerald-100 text-emerald-600", current: "bg-emerald-100 text-emerald-600", pending: "bg-gray-100 text-gray-400", border: "bg-emerald-200" },
}

function generateOrderTimeline(status: string, date: string) {
  const events = [
    { key: "created" as const, label: "PO Created", date },
    { key: "sent" as const, label: "PO Sent to Supplier", date },
    { key: "received" as const, label: "Goods Received", date },
  ]
  const steps = ["Ready to Pay", "Sent", "Received", "Partial", "Paid"]
  const idx = steps.indexOf(status)
  // Received: visible when status is Received, Partial, or Paid
  const receivedDone = idx >= 2
  return events.map((event, i) => {
    if (event.key === "received") {
      if (receivedDone) return { ...event, status: "completed" as const }
      return { ...event, status: "pending" as const }
    }
    if (i < idx && i < 2) return { ...event, status: "completed" as const }
    if (i === idx && i < 2) return { ...event, status: "current" as const }
    return { ...event, status: "pending" as const }
  })
}

const formatIDR = (val: number) => `Rp ${val.toLocaleString("id-ID")}`

function formatCurrency(amount: number, currency: string) {
  if (currency === "USD") {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)
  }
  return formatIDR(amount)
}

/* ── Util ── */
const today = () => new Date().toISOString().split("T")[0]

/* ── Main Content ── */
function PurchaseOrderDetailContent() {
  const params = useParams()
  const searchParams = useSearchParams()
  const id = params.id as string
  const statusOverride = searchParams.get("status") as POData["status"] | null

  const [data, setData] = useState<POData>(() => {
    const base = poDataMap[id] || defaultPO
    return statusOverride ? { ...base, status: statusOverride } : base
  })

  const [payDialogOpen, setPayDialogOpen] = useState(false)
  const [payForm, setPayForm] = useState({
    type: "DP" as Payment["type"],
    method: "Transfer" as Payment["method"],
    amount: "",
    date: today(),
    reference: "",
    notes: "",
  })

  const totalPaid = data.payments.reduce((sum, p) => sum + p.amount, 0)
  const remaining = Math.max(0, data.grandTotal - totalPaid)
  const paidPercent = data.grandTotal > 0 ? Math.round((totalPaid / data.grandTotal) * 100) : 0

  // Derive payment status from payments
  const paymentStatus: "Unpaid" | "Partial" | "Paid" =
    totalPaid <= 0
      ? "Unpaid"
      : totalPaid >= data.grandTotal
        ? "Paid"
        : "Partial"

  const cfg = statusConfig[data.status] || statusConfig.Draft

  const handleRecordPayment = () => {
    const amount = parseInt(payForm.amount.replace(/\D/g, "")) || 0
    if (amount <= 0) return

    const newPay: Payment = {
      id: `pay-${Date.now()}`,
      date: payForm.date,
      type: payForm.type,
      method: payForm.method,
      amount,
      reference: payForm.reference,
      notes: payForm.notes,
    }

    setData((prev) => ({
      ...prev,
      payments: [...prev.payments, newPay].sort((a, b) => a.date.localeCompare(b.date)),
    }))

    setPayDialogOpen(false)
    setPayForm({ type: "DP", method: "Transfer", amount: "", date: today(), reference: "", notes: "" })
  }

  const rem = data.grandTotal - totalPaid

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/purchasing">
            <Button variant="ghost" size="icon-sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">{data.poNumber}</h1>
              <Badge variant="outline" className={cfg.className}>
                {cfg.label}
              </Badge>
            </div>
            <p className="text-muted-foreground">{data.supplier}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {paymentStatus !== "Paid" && (
            <Button onClick={() => setPayDialogOpen(true)}>
              <Banknote className="mr-2 h-4 w-4" />
              Record Payment
            </Button>
          )}
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </div>

      {/* Warehouse Assignment - top, full width */}
      {data.status === "Received" && (
        <WarehouseAssignmentSection
          poId={data.id}
          poNumber={data.poNumber}
          poItems={data.items}
        />
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* PO Details */}
          <Card>
            <CardHeader>
              <CardTitle>Purchase Order Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">PO Number</p>
                  <p className="font-sans font-medium">{data.poNumber}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{data.date}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Supplier</p>
                  <p className="font-medium">{data.supplier}</p>
                  <p className="text-xs text-muted-foreground">{data.supplierContact}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Expected Delivery</p>
                  <p className="font-medium">{data.expectedDelivery}</p>
                </div>
                <div className="col-span-2 space-y-1">
                  <p className="text-sm text-muted-foreground">Supplier Address</p>
                  <p className="text-sm">{data.supplierAddress}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Status Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Banknote className="h-4 w-4 text-indigo-600" />
                Payment Status
              </CardTitle>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                paymentStatus === "Paid" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                paymentStatus === "Partial" ? "bg-cyan-50 text-cyan-700 border-cyan-200" :
                "bg-amber-50 text-amber-700 border-amber-200"
              }`}>
                {paymentStatus === "Paid" ? "Lunas" : paymentStatus === "Partial" ? "Sebagian" : "Belum Dibayar"}
              </span>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Grand Total</p>
                  <p className="text-lg font-bold mt-1">{formatCurrency(data.grandTotal, data.currency)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Dibayar</p>
                  <p className="text-lg font-bold text-emerald-600 mt-1">{formatCurrency(totalPaid, data.currency)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Sisa</p>
                  <p className={`text-lg font-bold mt-1 ${paymentStatus === "Paid" ? "text-emerald-600" : "text-amber-600"}`}>
                    {paymentStatus === "Paid" ? "✓ Lunas" : formatCurrency(remaining, data.currency)}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Progress Pembayaran</span>
                  <span className="font-semibold">{paidPercent}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full transition-all duration-500 ${
                      paymentStatus === "Paid" ? "bg-emerald-500" : "bg-cyan-500"
                    }`}
                    style={{ width: `${Math.min(100, paidPercent)}%` }}
                  />
                </div>
                {data.payments.length > 0 && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    {data.payments.filter(p => p.type === "DP").length > 0 && (
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0">DP {data.payments.filter(p => p.type === "DP")[0]?.dpPercentage || ""}%</Badge>
                    )}
                    <span>{data.payments.length}x pembayaran</span>
                  </div>
                )}
              </div>

              {/* Payment History inside Status */}
              {data.payments.length > 0 && (
                <div className="mt-6 pt-4 border-t">
                  <div className="flex items-center gap-2 mb-3">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Riwayat Pembayaran</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b text-xs text-muted-foreground">
                          <th className="text-left pb-2 font-medium">Tanggal</th>
                          <th className="text-left pb-2 font-medium">Tipe</th>
                          <th className="text-left pb-2 font-medium">Metode</th>
                          <th className="text-right pb-2 font-medium">Jumlah</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {data.payments.map((p) => (
                          <tr key={p.id}>
                            <td className="py-2 text-xs">{new Date(p.date).toLocaleDateString("id-ID")}</td>
                            <td className="py-2">
                              <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${
                                p.type === "DP" ? "bg-blue-50 text-blue-700 border-blue-200" :
                                p.type === "Angsuran" ? "bg-amber-50 text-amber-700 border-amber-200" :
                                "bg-emerald-50 text-emerald-700 border-emerald-200"
                              }`}>
                                {p.type}{p.type === "DP" && p.dpPercentage ? ` (${p.dpPercentage}%)` : ""}
                              </Badge>
                            </td>
                            <td className="py-2 text-xs text-muted-foreground">{p.method}</td>
                            <td className="py-2 text-right font-sans font-medium text-xs">{formatCurrency(p.amount, data.currency)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-t font-semibold text-xs">
                          <td colSpan={3} className="pt-2 text-muted-foreground">Total</td>
                          <td className="pt-2 text-right">{formatCurrency(totalPaid, data.currency)}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-4 w-4 text-indigo-600" />
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead className="text-right">Unit Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.items.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{item.product}</TableCell>
                      <TableCell className="font-sans text-xs">{item.sku}</TableCell>
                      <TableCell className="text-right">{item.qty}</TableCell>
                      <TableCell className="text-right font-sans">{formatCurrency(item.unitPrice, data.currency)}</TableCell>
                      <TableCell className="text-right font-sans font-bold">{formatCurrency(item.total, data.currency)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="border-t-2">
                    <TableCell colSpan={4} className="text-right font-medium">Subtotal</TableCell>
                    <TableCell className="text-right font-sans font-bold">{formatCurrency(data.subtotal, data.currency)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={4} className="text-right text-muted-foreground">Tax (PPN 10%)</TableCell>
                    <TableCell className="text-right font-sans">{formatCurrency(data.tax, data.currency)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={4} className="text-right text-muted-foreground">Shipping</TableCell>
                    <TableCell className="text-right font-sans">{formatCurrency(data.shipping, data.currency)}</TableCell>
                  </TableRow>
                  <TableRow className="border-t-2 bg-muted/50 font-bold">
                    <TableCell colSpan={4} className="text-right">Grand Total</TableCell>
                    <TableCell className="text-right font-sans text-lg">{formatCurrency(data.grandTotal, data.currency)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Order Timeline */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Package className="h-4 w-4 text-indigo-600" />
                Order Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(() => {
                  const timeline = generateOrderTimeline(data.status, data.date)
                  return timeline.map((step, i) => {
                    const colors = timelineColorConfig[step.key]?.[step.status] || "bg-gray-100 text-gray-400"
                    const borderColor = timelineColorConfig[step.key]?.border || "bg-gray-200"
                    return (
                      <div key={step.key} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-full ${colors}`}>
                            {step.status === "completed" ? <CheckCircle2 className="h-4 w-4" /> :
                             step.status === "current" ? <CircleDot className="h-4 w-4" /> :
                             <Circle className="h-4 w-4" />}
                          </div>
                          {i < timeline.length - 1 && (
                            <div className={`w-0.5 flex-1 ${step.status === "completed" ? borderColor : "bg-gray-200"}`} />
                          )}
                        </div>
                        <div className="pb-4">
                          <p className="text-sm font-medium">{step.label}</p>
                          <p className="text-xs text-muted-foreground">{step.date}</p>
                        </div>
                      </div>
                    )
                  })
                })()}
              </div>
            </CardContent>
          </Card>

          {/* Payment Timeline */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Banknote className="h-4 w-4 text-indigo-600" />
                Payment Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(() => {
                  const steps = [
                    { key: "unpaid", label: "Belum Dibayar" },
                    { key: "partial", label: "Pembayaran Sebagian" },
                    { key: "paid", label: "Lunas" },
                  ]
                  const ps = paymentStatus
                  const pColors: Record<string, string> = {
                    unpaid: "bg-slate-100 text-slate-600",
                    partial: "bg-cyan-100 text-cyan-600",
                    paid: "bg-emerald-100 text-emerald-600",
                  }
                  const pBorders: Record<string, string> = {
                    unpaid: "bg-slate-200",
                    partial: "bg-cyan-200",
                    paid: "bg-emerald-200",
                  }
                  const keys: string[] = ["Unpaid", "Partial", "Paid"]
                  const curIdx = keys.indexOf(ps)

                  return steps.map((step, i) => {
                    const isDone = i < curIdx
                    const isCurrent = i === curIdx
                    const colors = isDone ? pColors[step.key] : isCurrent ? pColors[step.key] : "bg-gray-100 text-gray-400"
                    const borderColor = isDone ? pBorders[step.key] : "bg-gray-200"
                    return (
                      <div key={step.key} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-full ${colors}`}>
                            {isDone ? <CheckCircle2 className="h-4 w-4" /> :
                             isCurrent ? <CircleDot className="h-4 w-4" /> :
                             <Circle className="h-4 w-4" />}
                          </div>
                          {i < steps.length - 1 && (
                            <div className={`w-0.5 flex-1 ${isDone ? borderColor : "bg-gray-200"}`} />
                          )}
                        </div>
                        <div className="pb-4">
                          <p className={`text-sm font-medium ${isDone || isCurrent ? "text-foreground" : "text-muted-foreground"}`}>
                            {step.label}
                          </p>
                          {isCurrent && ps === "Partial" && (
                            <p className="text-xs text-muted-foreground">{paidPercent}% paid</p>
                          )}
                          {isDone && ps === "Paid" && (
                            <p className="text-xs text-emerald-600 font-medium">Complete</p>
                          )}
                        </div>
                      </div>
                    )
                  })
                })()}
              </div>
            </CardContent>
          </Card>

          {/* Logistic / Courier Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Truck className="h-4 w-4 text-indigo-600" />
                Logistic
              </CardTitle>
            </CardHeader>
            <CardContent>
              {(() => {
                const allLogistic = typeof window !== "undefined" ? (() => {
                  const stored = localStorage.getItem("scw-logistic-data")
                  if (stored) {
                    try {
                      const map = JSON.parse(stored)
                      return Object.values(map).filter((l: any) => l.poId === data.id)
                    } catch { return [] }
                  }
                  return []
                })() : []
                return allLogistic.length > 0 ? (
                  <div className="space-y-2">
                    {allLogistic.map((lg: any) => (
                      <Link key={lg.id} href={`/purchasing/logistic/${lg.id}`} className="block p-3 bg-muted/30 rounded-lg border hover:bg-muted/50 transition">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">{lg.courier}</p>
                            <p className="text-xs text-muted-foreground">{lg.trackingNumber}</p>
                          </div>
                          <Badge variant="outline" className={
                            lg.status === "Delivered" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                            lg.status === "In Transit" ? "bg-cyan-50 text-cyan-700 border-cyan-200" :
                            lg.status === "Picked Up" ? "bg-amber-50 text-amber-700 border-amber-200" :
                            "bg-blue-50 text-blue-700 border-blue-200"
                          }>{lg.status}</Badge>
                        </div>
                      </Link>
                    ))}
                    <CourierInputModal poId={data.id} poNumber={data.poNumber} />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">Belum ada pengiriman.</p>
                    <CourierInputModal poId={data.id} poNumber={data.poNumber} />
                  </div>
                )
              })()}
            </CardContent>
          </Card>

        </div>
      </div>

      {/* Record Payment Dialog */}
      <Dialog open={payDialogOpen} onOpenChange={setPayDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Record Payment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Payment Type</Label>
                <select
                  value={payForm.type}
                  onChange={(e) => setPayForm((prev) => ({ ...prev, type: e.target.value as Payment["type"] }))}
                  className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="DP">DP (Uang Muka)</option>
                  <option value="Angsuran">Angsuran</option>
                  <option value="Pelunasan">Pelunasan</option>
                </select>
              </div>
              <div>
                <Label>Method</Label>
                <select
                  value={payForm.method}
                  onChange={(e) => setPayForm((prev) => ({ ...prev, method: e.target.value as Payment["method"] }))}
                  className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="Transfer">Transfer</option>
                  <option value="Tunai">Tunai</option>
                  <option value="Cek">Cek</option>
                  <option value="GIRO">GIRO</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Amount</Label>
                <Input
                  value={payForm.amount}
                  onChange={(e) => setPayForm((prev) => ({ ...prev, amount: e.target.value }))}
                  placeholder="Rp"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Date</Label>
                <Input
                  type="date"
                  value={payForm.date}
                  onChange={(e) => setPayForm((prev) => ({ ...prev, date: e.target.value }))}
                  className="mt-1"
                />
              </div>
            </div>

            {rem > 0 && payForm.type === "Pelunasan" && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
                Sisa pembayaran: <span className="font-bold">{formatCurrency(rem, data.currency)}</span>
                <Button
                  variant="link"
                  className="text-blue-700 text-xs p-0 h-auto ml-2"
                  onClick={() => setPayForm((prev) => ({ ...prev, amount: String(rem) }))}
                >
                  [Isi otomatis]
                </Button>
              </div>
            )}

            <div>
              <Label>Reference</Label>
              <Input
                value={payForm.reference}
                onChange={(e) => setPayForm((prev) => ({ ...prev, reference: e.target.value }))}
                placeholder="Nomor referensi transfer"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Notes</Label>
              <Input
                value={payForm.notes}
                onChange={(e) => setPayForm((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder="Catatan (opsional)"
                className="mt-1"
              />
            </div>

            {/* Quick fill amounts */}
            {rem > 0 && payForm.type === "Pelunasan" && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
                Sisa pembayaran: <span className="font-bold">{formatCurrency(rem, data.currency)}</span>
                <Button
                  variant="link"
                  className="text-blue-700 text-xs p-0 h-auto ml-2"
                  onClick={() => setPayForm((prev) => ({ ...prev, amount: String(rem) }))}
                >
                  [Isi otomatis]
                </Button>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPayDialogOpen(false)}>Batal</Button>
            <Button onClick={handleRecordPayment}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

/* ── Courier Input Modal Component ── */
function CourierInputModal({ poId, poNumber }: { poId: string; poNumber: string }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    courier: "",
    trackingNumber: "",
    destination: "",
    shippingDate: new Date().toISOString().split("T")[0],
    estimatedDelivery: "",
    weight: "",
    cost: "",
    currency: "IDR" as string,
  })

  const handleSave = () => {
    if (!form.courier || !form.trackingNumber) return
    const newId = `lg-${Date.now()}`
    const newItem = {
      id: newId,
      poNumber,
      poId,
      courier: form.courier,
      trackingNumber: form.trackingNumber,
      status: "Booked" as const,
      shippingDate: form.shippingDate,
      estimatedDelivery: form.estimatedDelivery || form.shippingDate,
      destination: form.destination || "—",
      totalItems: 0,
      weight: form.weight || "—",
      cost: parseInt(form.cost.replace(/\D/g, "")) || 0,
      currency: form.currency,
    }
    const stored = localStorage.getItem("scw-logistic-data")
    const map = stored ? JSON.parse(stored) : {}
    map[newId] = newItem
    localStorage.setItem("scw-logistic-data", JSON.stringify(map))
    setOpen(false)
    setForm({ courier: "", trackingNumber: "", destination: "", shippingDate: new Date().toISOString().split("T")[0], estimatedDelivery: "", weight: "", cost: "", currency: "IDR" })
    window.location.reload()
  }

  return (
    <>
      <Button variant="outline" size="sm" className="w-full" onClick={() => setOpen(true)}>
        <Truck className="mr-1.5 h-3.5 w-3.5" /> Assign Courier
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Assign Courier — {poNumber}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div>
              <Label>Courier *</Label>
              <Input value={form.courier} onChange={(e) => setForm((p) => ({ ...p, courier: e.target.value }))} placeholder="JNE / SiCepat / DHL" className="mt-1" />
            </div>
            <div>
              <Label>Tracking Number *</Label>
              <Input value={form.trackingNumber} onChange={(e) => setForm((p) => ({ ...p, trackingNumber: e.target.value }))} placeholder="Nomor resi" className="mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Ship Date</Label>
                <Input type="date" value={form.shippingDate} onChange={(e) => setForm((p) => ({ ...p, shippingDate: e.target.value }))} className="mt-1" />
              </div>
              <div>
                <Label>Est. Delivery</Label>
                <Input type="date" value={form.estimatedDelivery} onChange={(e) => setForm((p) => ({ ...p, estimatedDelivery: e.target.value }))} className="mt-1" />
              </div>
            </div>
            <div>
              <Label>Destination</Label>
              <Input value={form.destination} onChange={(e) => setForm((p) => ({ ...p, destination: e.target.value }))} placeholder="Kota tujuan" className="mt-1" />
            </div>
            <div>
              <Label>Weight</Label>
              <Input value={form.weight} onChange={(e) => setForm((p) => ({ ...p, weight: e.target.value }))} placeholder="Contoh: 5 kg" className="mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Shipping Cost</Label>
                <Input value={form.cost} onChange={(e) => setForm((p) => ({ ...p, cost: e.target.value }))} placeholder="100000" className="mt-1" />
              </div>
              <div>
                <Label>Currency</Label>
                <select value={form.currency} onChange={(e) => setForm((p) => ({ ...p, currency: e.target.value }))}
                  className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="IDR">IDR (Rp)</option>
                  <option value="USD">USD ($)</option>
                  <option value="SGD">SGD (S$)</option>
                  <option value="MYR">MYR (RM)</option>
                  <option value="JPY">JPY (¥)</option>
                  <option value="CNY">CNY (¥)</option>
                  <option value="KRW">KRW (₩)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Batal</Button>
            <Button onClick={handleSave}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

/* ── Page Wrapper ── */
function PurchaseOrderDetailPage() {
  return (
    <Suspense>
      <PurchaseOrderDetailContent />
    </Suspense>
  )
}

export default PurchaseOrderDetailPage
