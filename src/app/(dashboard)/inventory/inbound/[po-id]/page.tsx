"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowLeft,
  Package,
  Truck,
  MapPin,
  Building2,
  Calendar,
  Hash,
} from "lucide-react"
import WarehouseAssignmentSection from "@/components/warehouse-assignment"
import { inboundPOSources, useWarehouseStore } from "@/lib/warehouse-store"

/* ── Types ── */
interface LogisticItem {
  id: string
  poNumber: string
  poId: string
  courier: string
  trackingNumber: string
  status: "Booked" | "Picked Up" | "In Transit" | "Delivered"
  destination: string
}

/* ── Status config ── */
const putawayStatusConfig: Record<
  string,
  { label: string; className: string }
> = {
  "Pending Putaway": {
    label: "Pending Putaway",
    className: "bg-red-50 text-red-700 border-red-200",
  },
  "Partial Putaway": {
    label: "Partial Putaway",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  "Putaway Complete": {
    label: "Putaway Complete",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
}

const logisticStatusConfig: Record<
  string,
  { label: string; className: string }
> = {
  Booked: {
    label: "Booked",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  "Picked Up": {
    label: "Picked Up",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  "In Transit": {
    label: "In Transit",
    className: "bg-cyan-50 text-cyan-700 border-cyan-200",
  },
  Delivered: {
    label: "Delivered",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
}

function getLogisticData(): Record<string, LogisticItem> {
  if (typeof window === "undefined") return {}
  const stored = localStorage.getItem("scw-logistic-data")
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {}
  }
  return {
    lg1: {
      id: "lg1",
      poNumber: "PO-2025-0042",
      poId: "1",
      courier: "JNE",
      trackingNumber: "JNE287654123",
      status: "Delivered",
      destination: "Tangerang, Banten",
    },
    lg3: {
      id: "lg3",
      poNumber: "PO-2025-0043",
      poId: "2",
      courier: "J&T Express",
      trackingNumber: "JT583726194",
      status: "Delivered",
      destination: "Tangerang, Banten",
    },
  }
}

export default function InboundDetailPage() {
  const params = useParams()
  const poId = String(params?.["po-id"] ?? "")

  const [mounted, setMounted] = useState(false)
  const [logisticMap, setLogisticMap] = useState<
    Record<string, LogisticItem>
  >({})

  const { inboundReceipts } = useWarehouseStore()

  useEffect(() => {
    setMounted(true)
    setLogisticMap(getLogisticData())
  }, [])

  /* ── Find PO source ── */
  const poSource = inboundPOSources.find((p) => p.id === poId)

  if (!mounted) {
    return (
      <div className="space-y-6">
        <div className="inline-flex items-center gap-1 text-sm text-muted-foreground">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </div>
        <Card>
          <CardContent className="p-8 text-center text-sm text-muted-foreground">
            Memuat...
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!poSource) {
    return (
      <div className="space-y-6">
        <Link
          href="/inventory/inbound"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>
        <Card>
          <CardContent className="p-8 text-center text-sm text-muted-foreground">
            Purchase order tidak ditemukan.
          </CardContent>
        </Card>
      </div>
    )
  }

  /* ── Determine putaway status ── */
  const receipt = inboundReceipts.find((r) => r.poId === poId)
  const totalItems = poSource.items.length
  let putawayStatus = "Pending Putaway"

  if (receipt) {
    const assignedCount = receipt.items.filter((i) => i.rackId).length
    if (assignedCount === totalItems) {
      putawayStatus = "Putaway Complete"
    } else if (assignedCount > 0) {
      putawayStatus = "Partial Putaway"
    }
  }

  const putawayCfg = putawayStatusConfig[putawayStatus]

  /* ── Find matching logistic ── */
  let logistic: LogisticItem | undefined
  if (mounted) {
    // Try numeric poId formats: extract number from po-0XX
    const numericId = poId.replace("po-00", "").replace("po-0", "")
    logistic = Object.values(logisticMap).find(
      (l) => l.poId === numericId || l.poId === poId
    )
  }

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/inventory/inbound"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Inbound
      </Link>

      {/* Header */}
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <span className="font-sans font-medium text-xs text-muted-foreground">
                {poSource.poNumber}
              </span>
              <Badge variant="outline" className={putawayCfg.className}>
                {putawayCfg.label}
              </Badge>
            </div>
            <CardTitle className="text-lg">{poSource.supplier}</CardTitle>
          </div>
        </CardHeader>
      </Card>

      {/* Two-column layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* PO Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Package className="h-4 w-4 text-indigo-600" />
                Informasi PO
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">PO Number</p>
                  <p className="font-medium">{poSource.poNumber}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Supplier</p>
                  <p className="font-medium">{poSource.supplier}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Ship Date</p>
                  <p className="text-sm">
                    {poSource.shipDate
                      ? new Date(poSource.shipDate).toLocaleDateString("id-ID")
                      : "—"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">
                    Expected Arrival
                  </p>
                  <p className="text-sm">
                    {poSource.expectedArrival
                      ? new Date(poSource.expectedArrival).toLocaleDateString(
                          "id-ID"
                        )
                      : "—"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Logistics Information */}
          {logistic && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Truck className="h-4 w-4 text-indigo-600" />
                  Informasi Logistik
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Courier</p>
                    <p className="font-medium">{logistic.courier}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                      Tracking Number
                    </p>
                    <p className="text-sm font-medium text-primary">
                      {logistic.trackingNumber}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Status</p>
                    <Badge
                      variant="outline"
                      className={
                        logisticStatusConfig[logistic.status]?.className || ""
                      }
                    >
                      {logistic.status}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Destination</p>
                    <p className="text-sm">{logistic.destination}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

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
                {poSource.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-1.5 border-b last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.sku}
                      </p>
                    </div>
                    <span className="text-sm font-medium">
                      ×{item.orderedQty}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <WarehouseAssignmentSection poId={poId} poNumber={poSource.poNumber} />
        </div>
      </div>
    </div>
  )
}
