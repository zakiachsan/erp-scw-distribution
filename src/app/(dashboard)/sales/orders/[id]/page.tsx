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
import { ArrowLeft, FileText, Plus, DollarSign, CheckCircle2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const formatIDR = (val: number) => `Rp ${val.toLocaleString("id-ID")}`

interface OrderItem {
  productName: string
  sku: string
  qty: number
  unitPrice: number
  discount: number
}

interface SalesOrderDetail {
  id: string
  customer: string
  date: string
  status: "Draft" | "Confirmed" | "Processing" | "Shipped" | "Completed"
  tier: "Bronze" | "Silver" | "Gold" | "Platinum"
  notes: string
  items: OrderItem[]
  pipelineId: string | null
}

const tierDiscounts: Record<string, number> = {
  Bronze: 0.02,
  Silver: 0.05,
  Gold: 0.08,
  Platinum: 0.12,
}

const statusConfig: Record<string, { label: string; className: string }> = {
  Draft: { label: "Draft", className: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400" },
  Confirmed: { label: "Confirmed", className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
  Processing: { label: "Processing", className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" },
  Shipped: { label: "Shipped", className: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400" },
  Completed: { label: "Completed", className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" },
}

const orders: SalesOrderDetail[] = [
  {
    id: "SO-2026-045",
    customer: "PT Autogloss Indonesia",
    date: "2026-06-01",
    status: "Confirmed",
    tier: "Gold",
    notes: "Kirim ke gudang utama",
    items: [
      { productName: "SCW Snow Foam", sku: "SCW-SF-001", qty: 10, unitPrice: 150000, discount: 0 },
      { productName: "SCW Ceramic Coating", sku: "SCW-CC-002", qty: 5, unitPrice: 250000, discount: 0 },
    ],
    pipelineId: "PL-001",
  },
  {
    id: "SO-2026-044",
    customer: "CV Ceramic Pro JKT",
    date: "2026-05-30",
    status: "Processing",
    tier: "Silver",
    notes: "",
    items: [
      { productName: "SCW Ceramic Coating", sku: "SCW-CC-002", qty: 10, unitPrice: 250000, discount: 0 },
    ],
    pipelineId: "PL-002",
  },
  {
    id: "SO-2026-043",
    customer: "UD Shinemax",
    date: "2026-05-28",
    status: "Shipped",
    tier: "Bronze",
    notes: "Pengiriman via JNE",
    items: [
      { productName: "SCW Snow Foam", sku: "SCW-SF-001", qty: 5, unitPrice: 150000, discount: 0 },
      { productName: "SCW Interior Detailer", sku: "SCW-ID-003", qty: 8, unitPrice: 120000, discount: 0 },
      { productName: "SCW Tire Gel", sku: "SCW-TG-004", qty: 10, unitPrice: 95000, discount: 0 },
    ],
    pipelineId: null,
  },
  {
    id: "SO-2026-042",
    customer: "PT DetailWorks BDG",
    date: "2026-05-25",
    status: "Completed",
    tier: "Platinum",
    notes: "",
    items: [
      { productName: "SCW Ceramic Coating", sku: "SCW-CC-002", qty: 15, unitPrice: 250000, discount: 0 },
    ],
    pipelineId: "PL-004",
  },
  {
    id: "SO-2026-041",
    customer: "PT Autogloss Indonesia",
    date: "2026-05-20",
    status: "Completed",
    tier: "Gold",
    notes: "Repeat order",
    items: [
      { productName: "SCW Snow Foam", sku: "SCW-SF-001", qty: 20, unitPrice: 150000, discount: 0 },
      { productName: "SCW Spray Wax", sku: "SCW-SW-005", qty: 10, unitPrice: 110000, discount: 0 },
    ],
    pipelineId: null,
  },
  {
    id: "SO-2026-040",
    customer: "CV ProShine SBY",
    date: "2026-05-18",
    status: "Shipped",
    tier: "Silver",
    notes: "",
    items: [
      { productName: "SCW Glass Cleaner", sku: "SCW-GC-006", qty: 15, unitPrice: 85000, discount: 0 },
      { productName: "SCW Polish Compound", sku: "SCW-PC-007", qty: 8, unitPrice: 180000, discount: 0 },
    ],
    pipelineId: null,
  },
  {
    id: "SO-2026-039",
    customer: "AutoCare Makassar",
    date: "2026-05-15",
    status: "Draft",
    tier: "Bronze",
    notes: "Menunggu konfirmasi",
    items: [
      { productName: "SCW Shampoo Plus", sku: "SCW-SP-008", qty: 20, unitPrice: 90000, discount: 0 },
    ],
    pipelineId: null,
  },
  {
    id: "SO-2026-038",
    customer: "GlossUp Bali",
    date: "2026-05-12",
    status: "Completed",
    tier: "Silver",
    notes: "",
    items: [
      { productName: "SCW Ceramic Coating", sku: "SCW-CC-002", qty: 8, unitPrice: 250000, discount: 0 },
      { productName: "SCW Tire Gel", sku: "SCW-TG-004", qty: 12, unitPrice: 95000, discount: 0 },
    ],
    pipelineId: null,
  },
  {
    id: "SO-2026-037",
    customer: "DetailPro Semarang",
    date: "2026-05-10",
    status: "Completed",
    tier: "Bronze",
    notes: "",
    items: [
      { productName: "SCW Snow Foam", sku: "SCW-SF-001", qty: 10, unitPrice: 150000, discount: 0 },
    ],
    pipelineId: null,
  },
  {
    id: "SO-2026-036",
    customer: "CV Ceramic Pro JKT",
    date: "2026-05-08",
    status: "Completed",
    tier: "Silver",
    notes: "",
    items: [
      { productName: "SCW Interior Detailer", sku: "SCW-ID-003", qty: 10, unitPrice: 120000, discount: 0 },
      { productName: "SCW All Purpose Cleaner", sku: "SCW-APC-009", qty: 8, unitPrice: 105000, discount: 0 },
    ],
    pipelineId: null,
  },
]

export default function SalesOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = React.use(params)
  const [order] = useState<SalesOrderDetail | undefined>(() => orders.find((o) => o.id === id))

  if (!order) {
    return (
      <div className="space-y-6 p-6">
        <Link href="/sales/orders">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Button>
        </Link>
        <Card>
          <CardContent className="p-6 text-center text-sm text-muted-foreground">
            Order not found.
          </CardContent>
        </Card>
      </div>
    )
  }

  const subtotal = order.items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0)
  const discountRate = tierDiscounts[order.tier]
  const tierDiscount = Math.round(subtotal * discountRate)
  const total = subtotal - tierDiscount

  // Invoice state
  const [invoices, setInvoices] = useState<{ id: string; date: string; amount: number; status: string }[]>(() => {
    // Seed some invoices for certain POs
    if (order.id === "SO-2026-042") return [{ id: "INV-2026-035", date: "2026-05-25", amount: 7200000, status: "Paid" }]
    if (order.id === "SO-2026-041") return [{ id: "INV-2026-034", date: "2026-05-20", amount: 8500000, status: "Paid" }]
    if (order.id === "SO-2026-038") return [{ id: "INV-2026-032", date: "2026-05-12", amount: 6200000, status: "Paid" }]
    if (order.id === "SO-2026-037") return [{ id: "INV-2026-031", date: "2026-05-10", amount: 2800000, status: "Paid" }]
    return []
  })
  const [showCreateInv, setShowCreateInv] = useState(false)
  const [invDate, setInvDate] = useState(new Date().toISOString().split("T")[0])
  const [invTerms, setInvTerms] = useState("")
  const [invCreated, setInvCreated] = useState(false)

  const hasInvoice = invoices.length > 0
  const canCreateInvoice = !hasInvoice && order.status !== "Draft"

  const handleCreateInvoice = () => {
    const newInv = {
      id: `INV-2026-${String(39 + invoices.length).padStart(3, "0")}`,
      date: invDate,
      amount: total,
      status: "Draft",
    }
    setInvoices([...invoices, newInv])
    setShowCreateInv(false)
    setInvCreated(true)
    setTimeout(() => setInvCreated(false), 3000)
  }

  return (
    <div className="space-y-4 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/sales/orders">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-gray-900">{order.id}</h1>
              <Badge variant="outline" className={`text-[10px] ${statusConfig[order.status].className}`}>
                {statusConfig[order.status].label}
              </Badge>
              {order.pipelineId && (
                <Link href={`/sales/pipeline/${order.pipelineId}`}>
                  <Badge variant="outline" className="text-[10px] bg-indigo-50 text-indigo-700 border-indigo-200 cursor-pointer hover:bg-indigo-100 transition-colors">
                    Lihat Deal →
                  </Badge>
                </Link>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{order.customer} · {order.date}</p>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.sku}>
                  <TableCell className="text-sm">{item.productName}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{item.sku}</TableCell>
                  <TableCell className="text-right text-sm">{item.qty}</TableCell>
                  <TableCell className="text-right text-sm">{formatIDR(item.unitPrice)}</TableCell>
                  <TableCell className="text-right text-sm">{formatIDR(item.qty * item.unitPrice)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Notes + Summary Side by Side */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <FileText className="h-4 w-4" />
              Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {order.notes ? (
              <p className="text-sm text-muted-foreground">{order.notes}</p>
            ) : (
              <p className="text-xs text-muted-foreground italic">No notes</p>
            )}
          </CardContent>
        </Card>

        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatIDR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Tier Discount ({order.tier} — {(discountRate * 100).toFixed(0)}%)
              </span>
              <span className="text-emerald-600">-{formatIDR(tierDiscount)}</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Total</span>
                <span className="font-medium">{formatIDR(total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoice Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-indigo-500" />
              <CardTitle className="text-sm">Invoice</CardTitle>
              {hasInvoice && (
                <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700">
                  {invoices.length} invoice
                </Badge>
              )}
            </div>
            {canCreateInvoice && (
              <Button size="sm" onClick={() => setShowCreateInv(true)}>
                <Plus className="h-3.5 w-3.5 mr-1" />
                Buat Invoice
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {invCreated && (
            <div className="mb-3 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
              Invoice berhasil dibuat!
            </div>
          )}
          {invoices.length > 0 ? (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-slate-50 text-left text-xs font-medium text-slate-500">
                  <th className="px-3 py-2">No. Invoice</th>
                  <th className="px-3 py-2">Tanggal</th>
                  <th className="px-3 py-2 text-right">Jumlah</th>
                  <th className="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id} className="border-b last:border-0">
                    <td className="px-3 py-2 font-mono text-xs">{inv.id}</td>
                    <td className="px-3 py-2 text-xs text-muted-foreground">{inv.date}</td>
                    <td className="px-3 py-2 text-xs text-right font-medium">{formatIDR(inv.amount)}</td>
                    <td className="px-3 py-2">
                      <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${
                        inv.status === "Paid" ? "bg-emerald-50 text-emerald-700" :
                        inv.status === "Sent" ? "bg-blue-50 text-blue-700" :
                        inv.status === "Overdue" ? "bg-red-50 text-red-700" :
                        "bg-gray-100 text-gray-700"
                      }`}>
                        {inv.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-6 text-center">
              <DollarSign className="mx-auto mb-2 h-8 w-8 text-muted-foreground/30" />
              <p className="text-xs text-muted-foreground">
                {order.status === "Draft"
                  ? "Konfirmasi PO terlebih dahulu untuk membuat invoice"
                  : "Belum ada invoice. Klik \"Buat Invoice\" untuk membuat invoice dari PO ini."
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Invoice Dialog */}
      <Dialog open={showCreateInv} onOpenChange={setShowCreateInv}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Buat Invoice</DialogTitle>
            <DialogDescription>
              Buat invoice untuk PO {order.id} — {order.customer}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="rounded-lg border bg-slate-50 p-3 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">PO Number</span>
                <span className="font-mono font-medium">{order.id}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Customer</span>
                <span>{order.customer}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Items</span>
                <span>{order.items.length} produk</span>
              </div>
              <div className="flex justify-between text-sm font-bold border-t pt-2">
                <span>Total</span>
                <span>{formatIDR(total)}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Tanggal Invoice</Label>
                <Input type="date" value={invDate} onChange={(e) => setInvDate(e.target.value)} className="h-8 text-sm" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Payment Terms</Label>
                <Input placeholder="e.g. Net 30" value={invTerms} onChange={(e) => setInvTerms(e.target.value)} className="h-8 text-sm" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setShowCreateInv(false)}>Batal</Button>
            <Button size="sm" onClick={handleCreateInvoice}>
              <DollarSign className="h-3.5 w-3.5 mr-1" />
              Buat Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
