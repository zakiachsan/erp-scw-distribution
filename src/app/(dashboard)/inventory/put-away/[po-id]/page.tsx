"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Package,
  Warehouse,
} from "lucide-react"
import { inboundPOSources } from "@/lib/warehouse-store"
import WarehouseAssignmentSection from "@/components/warehouse-assignment"

export default function PutAwayDetailPage() {
  const params = useParams()
  const poId = String(params?.["po-id"] ?? "")

  // Dual-format ID lookup
  const po = inboundPOSources.find((p) => p.id === poId) ||
    inboundPOSources.find((p) => p.id === `po-00${poId}`)

  if (!po) {
    return (
      <div className="space-y-6 p-6">
        <Link href="/inventory/put-away" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>
        <Card>
          <CardContent className="p-8 text-center text-sm text-muted-foreground">
            Data PO tidak ditemukan.
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Back */}
      <Link href="/inventory/put-away" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Put Away
      </Link>

      {/* Header */}
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-sans font-medium text-xs text-muted-foreground">{po.poNumber}</span>
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                <Warehouse className="mr-1 h-3 w-3" />
                Put Away
              </Badge>
            </div>
            <CardTitle>{po.supplier}</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              {po.items.length} item · Ship: {po.shipDate} · ETA: {po.expectedArrival}
            </p>
          </div>
        </CardHeader>
      </Card>

      {/* Warehouse Assignment - full width at top */}
      <WarehouseAssignmentSection
        poId={po.id}
        poNumber={po.poNumber}
      />

      {/* Two-column layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Package className="h-4 w-4 text-indigo-600" />
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {po.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 border-b last:border-0">
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.sku}</p>
                    </div>
                    <span className="text-sm font-medium">×{item.orderedQty}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Shipment Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Ship Date</p>
                <p className="text-sm">{po.shipDate}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Expected Arrival</p>
                <p className="text-sm">{po.expectedArrival}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
