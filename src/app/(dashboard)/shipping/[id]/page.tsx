"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Truck,
  MapPin,
  Package,
  CheckCircle2,
  Clock,
  Circle,
  Copy,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"

const shipmentData = {
  id: "SHP-001",
  soRef: "SO-2026-045",
  status: "Ready to Ship",
  createdAt: "2026-06-01 14:30",
  courier: {
    type: "JNE",
    name: "JNE Regular",
    trackingNumber: "JNE1234567890",
    cost: 35000,
    estDelivery: "3-5 business days",
  },
  customer: {
    name: "PT Autogloss Indonesia",
    address: "Jl. Raya Bekasi No. 123, RT 01/RW 05, Jakarta Timur 13410",
    phone: "0812-3456-7890",
  },
  items: [
    { name: "SCW Snow Foam", qty: 20, weight: "0.5 kg/pcs" },
    { name: "SCW Ceramic Coating", qty: 10, weight: "0.8 kg/pcs" },
  ],
  totalWeight: "15 kg",
  timeline: [
    { status: "Order Created", date: "2026-06-01 14:30", completed: true },
    { status: "Packing Started", date: "2026-06-01 15:00", completed: true },
    { status: "Packing Completed", date: "2026-06-01 16:30", completed: true },
    { status: "Ready to Ship", date: "2026-06-01 17:00", completed: true },
    { status: "Shipped", date: "", completed: false },
    { status: "Out for Delivery", date: "", completed: false },
    { status: "Delivered", date: "", completed: false },
  ],
}

const statusConfig: Record<string, { label: string; className: string }> = {
  "Ready to Ship": { label: "Ready to Ship", className: "bg-blue-100 text-blue-800" },
  Shipped: { label: "Shipped", className: "bg-indigo-100 text-indigo-800" },
  Delivered: { label: "Delivered", className: "bg-emerald-100 text-emerald-800" },
}

export default function ShipmentDetailPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/shipping">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{shipmentData.id}</h1>
            <p className="text-muted-foreground">SO Reference: {shipmentData.soRef}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={statusConfig[shipmentData.status].className}>
            {shipmentData.status}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Status Timeline */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-indigo-600" />
              Status Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {shipmentData.timeline.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1">
                    {step.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-300" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${step.completed ? "" : "text-muted-foreground"}`}>
                      {step.status}
                    </p>
                    {step.date && (
                      <p className="text-xs text-muted-foreground">{step.date}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Courier Info */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-indigo-600" />
              Courier Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border p-4 space-y-2">
                <p className="text-xs text-muted-foreground uppercase">Courier</p>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-800">{shipmentData.courier.type}</Badge>
                  <span className="font-medium">{shipmentData.courier.name}</span>
                </div>
              </div>
              <div className="rounded-lg border p-4 space-y-2">
                <p className="text-xs text-muted-foreground uppercase">Est. Delivery</p>
                <p className="font-medium">{shipmentData.courier.estDelivery}</p>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Tracking Number</p>
                  <p className="font-sans text-lg font-bold">{shipmentData.courier.trackingNumber}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Track
                  </Button>
                </div>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground uppercase mb-2">Ship To</p>
                <p className="font-medium">{shipmentData.customer.name}</p>
                <p className="text-sm text-muted-foreground">{shipmentData.customer.address}</p>
                <p className="text-sm text-muted-foreground">{shipmentData.customer.phone}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase mb-2">Shipment Cost</p>
                <p className="text-2xl font-bold">Rp {shipmentData.courier.cost.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-indigo-600" />
            Shipped Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <div className="grid grid-cols-4 gap-4 p-4 bg-muted/50 text-xs font-medium text-muted-foreground uppercase">
              <div>Item</div>
              <div className="text-right">Qty</div>
              <div className="text-right">Weight/Unit</div>
              <div className="text-right">Total Weight</div>
            </div>
            {shipmentData.items.map((item, idx) => (
              <div key={idx} className="grid grid-cols-4 gap-4 p-4 border-t text-sm">
                <div className="font-medium">{item.name}</div>
                <div className="text-right">{item.qty}</div>
                <div className="text-right text-muted-foreground">{item.weight}</div>
                <div className="text-right">{item.weight}</div>
              </div>
            ))}
            <div className="grid grid-cols-4 gap-4 p-4 border-t font-bold">
              <div>Total Weight</div>
              <div></div>
              <div></div>
              <div className="text-right">{shipmentData.totalWeight}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
