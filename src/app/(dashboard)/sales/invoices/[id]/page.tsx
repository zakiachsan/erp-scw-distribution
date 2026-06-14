"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Printer,
  Download,
  Send,
  CheckCircle2,
  Clock,
} from "lucide-react"
import Link from "next/link"

const invoiceData = {
  id: "INV-2026-036",
  soRef: "SO-2026-043",
  issueDate: "2026-05-28",
  dueDate: "2026-06-11",
  status: "Paid",
  customer: {
    name: "UD Shinemax",
    address: "Jl. Raya Bandung No. 456, Bandung",
    phone: "0813-9876-5432",
    email: "info@shinemax.co.id",
  },
  items: [
    { name: "SCW Snow Foam", sku: "SCW-SF-001", qty: 20, price: 150000, discount: 12000, total: 2760000 },
    { name: "SCW Interior Detailer", sku: "SCW-ID-003", qty: 10, price: 120000, discount: 9600, total: 1104000 },
    { name: "SCW Tire Gel", sku: "SCW-TG-004", qty: 8, price: 95000, discount: 7600, total: 699200 },
  ],
  subtotal: 4500000,
  discount: 289600,
  tax: 0,
  total: 4210400,
  paymentMethod: "Bank Transfer - BCA",
  paymentDate: "2026-06-05",
  notes: "Thank you for your business! Discount applied based on Gold tier.",
}

const statusConfig = {
  Draft: { label: "Draft", className: "bg-gray-100 text-gray-800" },
  Sent: { label: "Sent", className: "bg-blue-100 text-blue-800" },
  Paid: { label: "Paid", className: "bg-emerald-100 text-emerald-800" },
  Overdue: { label: "Overdue", className: "bg-red-100 text-red-800" },
}

export default function InvoiceDetailPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/sales/invoices">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl  tracking-tight">{invoiceData.id}</h1>
            <p className="text-muted-foreground">SO Reference: {invoiceData.soRef}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            PDF
          </Button>
          {invoiceData.status !== "Paid" && (
            <Button onClick={() => alert("Invoice berhasil dikirim!")}>
              <Send className="mr-2 h-4 w-4" />
              Send Invoice
            </Button>
          )}
        </div>
      </div>

      {/* Printable Invoice Layout */}
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-xs  text-white">
                  SCW
                </div>
                <div>
                  <p className="text-lg ">SCW Distribution</p>
                  <p className="text-xs text-muted-foreground">Car Detailing & Coating Products</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Jl. Industri Raya No. 123<br />
                Jakarta Utara, 14310<br />
                info@scw-distribution.co.id
              </p>
            </div>
            <div className="text-right">
              <h2 className="text-2xl  text-indigo-600">INVOICE</h2>
              <p className="font-sans text-lg mt-1">{invoiceData.id}</p>
              <Badge variant="outline" className={`mt-2 ${(statusConfig as Record<string, { label: string; className: string }>)[invoiceData.status]?.className ?? ""}`}>
                {invoiceData.status === "Paid" && <CheckCircle2 className="mr-1 h-3 w-3" />}
                {invoiceData.status !== "Paid" && <Clock className="mr-1 h-3 w-3" />}
                {(statusConfig as Record<string, { label: string; className: string }>)[invoiceData.status]?.label ?? invoiceData.status}
              </Badge>
            </div>
          </div>

          {/* Bill To & Dates */}
          <div className="grid gap-8 mb-8 md:grid-cols-2">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Bill To</p>
              <p className="font-semibold">{invoiceData.customer.name}</p>
              <p className="text-sm text-muted-foreground">{invoiceData.customer.address}</p>
              <p className="text-sm text-muted-foreground">{invoiceData.customer.phone}</p>
              <p className="text-sm text-muted-foreground">{invoiceData.customer.email}</p>
            </div>
            <div className="text-right">
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Issue Date:</span>
                  <span>{invoiceData.issueDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Due Date:</span>
                  <span>{invoiceData.dueDate}</span>
                </div>
                {invoiceData.paymentDate && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Payment Date:</span>
                    <span className="text-emerald-600">{invoiceData.paymentDate}</span>
                  </div>
                )}
                {invoiceData.paymentMethod && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Payment:</span>
                    <span>{invoiceData.paymentMethod}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Line Items */}
          <table className="w-full mb-6">
            <thead>
              <tr className="border-b">
                <th className="pb-2 text-left text-xs font-medium text-muted-foreground uppercase">Item</th>
                <th className="pb-2 text-right text-xs font-medium text-muted-foreground uppercase w-16">Qty</th>
                <th className="pb-2 text-right text-xs font-medium text-muted-foreground uppercase w-24">Price</th>
                <th className="pb-2 text-right text-xs font-medium text-muted-foreground uppercase w-24">Discount</th>
                <th className="pb-2 text-right text-xs font-medium text-muted-foreground uppercase w-28">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-3">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.sku}</p>
                  </td>
                  <td className="py-3 text-right text-sm">{item.qty}</td>
                  <td className="py-3 text-right text-sm">Rp {item.price.toLocaleString()}</td>
                  <td className="py-3 text-right text-sm text-emerald-600">-Rp {item.discount.toLocaleString()}</td>
                  <td className="py-3 text-right text-sm font-medium">Rp {item.total.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-72 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>Rp {invoiceData.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tier Discount</span>
                <span className="text-emerald-600">-Rp {invoiceData.discount.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between  text-lg">
                <span>Total</span>
                <span className="text-indigo-600">Rp {invoiceData.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {invoiceData.notes && (
            <div className="mt-8 rounded-lg bg-muted/50 p-4">
              <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Notes</p>
              <p className="text-sm">{invoiceData.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
