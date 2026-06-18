"use client"

export const dynamic = "force-dynamic"


import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
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
  Edit,
  Printer,
  CheckCircle2,
  Clock,
  Send,
  Package,
  CreditCard,
} from "lucide-react"

interface POData {
  id: string
  poNumber: string
  supplier: string
  supplierAddress: string
  supplierContact: string
  date: string
  expectedDelivery: string
  status: "Draft" | "Sent" | "Received" | "Paid"
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
  invoiceNumber?: string
  paymentDate?: string
  paymentMethod?: string
}

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
    invoiceNumber: "INV-ACI-2025-0156",
    paymentDate: "2025-12-15",
    paymentMethod: "Bank Transfer (BCA)",
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
}

const statusConfig = {
  Draft: { label: "Draft", className: "bg-gray-100 text-gray-800" },
  Sent: { label: "Sent", className: "bg-blue-100 text-blue-800" },
  Received: { label: "Received", className: "bg-amber-100 text-amber-800" },
  Paid: { label: "Paid", className: "bg-emerald-100 text-emerald-800" },
}

const timelineColorConfig = {
  created: {
    completed: "bg-gray-100 text-gray-600",
    current: "bg-gray-100 text-gray-600",
    pending: "bg-gray-100 text-gray-400",
    border: "bg-gray-200",
  },
  sent: {
    completed: "bg-blue-100 text-blue-600",
    current: "bg-blue-100 text-blue-600",
    pending: "bg-gray-100 text-gray-400",
    border: "bg-blue-200",
  },
  received: {
    completed: "bg-amber-100 text-amber-600",
    current: "bg-amber-100 text-amber-600",
    pending: "bg-gray-100 text-gray-400",
    border: "bg-amber-200",
  },
  paid: {
    completed: "bg-emerald-100 text-emerald-600",
    current: "bg-emerald-100 text-emerald-600",
    pending: "bg-gray-100 text-gray-400",
    border: "bg-emerald-200",
  },
}

function generateTimeline(status: "Draft" | "Sent" | "Received" | "Paid", date: string) {
  const events = [
    { key: "created" as const, label: "PO Created", date },
    { key: "sent" as const, label: "PO Sent to Supplier", date },
    { key: "received" as const, label: "Goods Received", date },
    { key: "paid" as const, label: "Payment Processed", date },
  ]

  const statusIndex = { Draft: 0, Sent: 1, Received: 2, Paid: 3 }[status]

  return events.map((event, i) => {
    if (i < statusIndex) return { ...event, status: "completed" as const }
    if (i === statusIndex) return { ...event, status: "current" as const }
    return { ...event, status: "pending" as const }
  })
}

function formatCurrency(amount: number, currency: string) {
  if (currency === "USD") {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)
  }
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(amount)
}

export default function PurchaseOrderDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const id = params.id as string
  const statusOverride = searchParams.get("status") as POData["status"] | null
  const poBase = poDataMap[id] || defaultPO
  const po: POData = statusOverride && statusConfig[statusOverride]
    ? { ...poBase, status: statusOverride }
    : poBase

  const cfg = statusConfig[po.status]

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/purchasing">
            <Button variant="ghost" size="icon-sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">{po.poNumber}</h1>
              <Badge variant="outline" className={cfg.className}>
                {cfg.label}
              </Badge>
            </div>
            <p className="text-muted-foreground">{po.supplier}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline">
            <Send className="mr-2 h-4 w-4" />
            Send
          </Button>
          <Button onClick={() => alert("Edit mode akan tersedia setelah integrasi database")}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Purchase Order Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">PO Number</p>
                  <p className="font-sans font-medium">{po.poNumber}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{po.date}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Supplier</p>
                  <p className="font-medium">{po.supplier}</p>
                  <p className="text-xs text-muted-foreground">{po.supplierContact}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Expected Delivery</p>
                  <p className="font-medium">{po.expectedDelivery}</p>
                </div>
                <div className="col-span-2 space-y-1">
                  <p className="text-sm text-muted-foreground">Supplier Address</p>
                  <p className="text-sm">{po.supplierAddress}</p>
                </div>
              </div>
            </CardContent>
          </Card>

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
                  {po.items.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{item.product}</TableCell>
                      <TableCell className="font-sans text-xs">{item.sku}</TableCell>
                      <TableCell className="text-right">{item.qty}</TableCell>
                      <TableCell className="text-right font-sans">
                        {formatCurrency(item.unitPrice, po.currency)}
                      </TableCell>
                      <TableCell className="text-right font-sans font-bold">
                        {formatCurrency(item.total, po.currency)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="border-t-2">
                    <TableCell colSpan={4} className="text-right font-medium">
                      Subtotal
                    </TableCell>
                    <TableCell className="text-right font-sans font-bold">
                      {formatCurrency(po.subtotal, po.currency)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={4} className="text-right text-muted-foreground">
                      Tax (PPN 10%)
                    </TableCell>
                    <TableCell className="text-right font-sans">
                      {formatCurrency(po.tax, po.currency)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={4} className="text-right text-muted-foreground">
                      Shipping
                    </TableCell>
                    <TableCell className="text-right font-sans">
                      {formatCurrency(po.shipping, po.currency)}
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-t-2 bg-muted/50 font-bold">
                    <TableCell colSpan={4} className="text-right">
                      Grand Total
                    </TableCell>
                    <TableCell className="text-right font-sans text-lg">
                      {formatCurrency(po.grandTotal, po.currency)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {po.invoiceNumber && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-indigo-600" />
                  Invoice & Payment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Invoice Number</p>
                    <p className="font-sans font-medium">{po.invoiceNumber}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Payment Date</p>
                    <p className="font-medium">{po.paymentDate}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Payment Method</p>
                    <p className="font-medium">{po.paymentMethod}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-indigo-600" />
                Status Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(() => {
                  const timeline = generateTimeline(po.status, po.date)
                  return timeline.map((step, i) => {
                    const colors = timelineColorConfig[step.key][step.status]
                    const borderColor = timelineColorConfig[step.key].border
                    return (
                      <div key={step.key} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-full ${colors}`}>
                            {step.status === "completed" ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : (
                              <Clock className="h-4 w-4" />
                            )}
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

          <Card>
            <CardHeader>
              <CardTitle>Quick Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Items</span>
                <span className="font-bold">{po.items.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Qty</span>
                <span className="font-bold">
                  {po.items.reduce((sum, item) => sum + item.qty, 0)}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Grand Total</span>
                <span className="font-bold">
                  {formatCurrency(po.grandTotal, po.currency)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
