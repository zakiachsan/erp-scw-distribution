"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
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
  AlertTriangle,
  Package,
  CheckCircle2,
  Clock,
  RotateCcw,
  RefreshCw,
} from "lucide-react"
import { useWarehouseStore } from "@/lib/warehouse-store"

interface AllocationItem {
  locationId: string
  rackId: string
  qty: string
  status: string
}

interface DamagedItemDetail {
  productName: string
  sku: string
  qty: number
  locationName: string
  rackName: string
  claimStatus: string
  notes: string
}

const CLAIM_STATUSES = [
  "Open",
  "Under Review",
  "Refund",
  "Replacement",
  "Resolved",
] as const

type ClaimStatus = (typeof CLAIM_STATUSES)[number]

const statusConfig: Record<ClaimStatus, { label: string; className: string; icon: typeof Clock }> = {
  Open: { label: "Open", className: "bg-blue-50 text-blue-700 border-blue-200", icon: Clock },
  "Under Review": { label: "Under Review", className: "bg-amber-50 text-amber-700 border-amber-200", icon: RefreshCw },
  Refund: { label: "Refund", className: "bg-purple-50 text-purple-700 border-purple-200", icon: RotateCcw },
  Replacement: { label: "Replacement", className: "bg-cyan-50 text-cyan-700 border-cyan-200", icon: Package },
  Resolved: { label: "Resolved", className: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: CheckCircle2 },
}

export default function DamagedDetailPage() {
  const params = useParams()
  const poId = String(params?.poId ?? "")
  const [mounted, setMounted] = useState(false)
  const [damagedItems, setDamagedItems] = useState<DamagedItemDetail[]>([])
  const [poNumber, setPoNumber] = useState("")
  const [supplier, setSupplier] = useState("")
  const { locations, racks } = useWarehouseStore()

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("scw-warehouse-allocations")
    if (!stored) return

    try {
      const allAllocs = JSON.parse(stored)
      const poData = allAllocs[poId]
      if (!poData) return

      setPoNumber(poData.poNumber || "")
      setSupplier(poData.supplier || "")

      const items: DamagedItemDetail[] = []
      for (const [itemName, allocs] of Object.entries(poData.items as Record<string, AllocationItem[]>)) {
        for (const alloc of allocs) {
          if (alloc.status === "Rusak/Cacat" && parseInt(alloc.qty) > 0) {
            const location = locations.find((l) => l.id === alloc.locationId)
            const rack = racks.find((r) => r.id === alloc.rackId)
            const claimKey = `claim_${poId}_${itemName}`
            const savedClaim = localStorage.getItem(claimKey)
            const claim = savedClaim ? JSON.parse(savedClaim) : { status: "Open", notes: "" }
            items.push({
              productName: itemName,
              sku: "",
              qty: parseInt(alloc.qty),
              locationName: location?.name || alloc.locationId,
              rackName: rack?.name || alloc.rackId || "—",
              claimStatus: claim.status,
              notes: claim.notes,
            })
          }
        }
      }
      setDamagedItems(items)
    } catch {}
  }, [poId, locations, racks])

  const updateClaimStatus = (productName: string, newStatus: string) => {
    setDamagedItems((prev) => {
      const updated = prev.map((item) =>
        item.productName === productName ? { ...item, claimStatus: newStatus } : item
      )
      // Persist to localStorage
      const claimKey = `claim_${poId}_${productName}`
      localStorage.setItem(claimKey, JSON.stringify({ status: newStatus, notes: "" }))
      return updated
    })
  }

  if (!mounted) {
    return (
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Damaged Items</h1>
          <p className="text-muted-foreground">Memuat...</p>
        </div>
      </div>
    )
  }

  const statusCounts = CLAIM_STATUSES.map((s) => ({
    status: s,
    count: damagedItems.filter((item) => item.claimStatus === s).length,
  }))

  return (
    <div className="space-y-6 p-6">
      {/* Back */}
      <Link href="/inventory/damaged" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Damaged Items
      </Link>

      {/* Header */}
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-sans font-medium text-xs text-muted-foreground">{poNumber}</span>
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                <AlertTriangle className="mr-1 h-3 w-3" />
                {damagedItems.length} Damaged Items
              </Badge>
            </div>
            <CardTitle>{supplier}</CardTitle>
          </div>
        </CardHeader>
      </Card>

      {/* Status Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {statusCounts.map((s) => {
          const cfg = statusConfig[s.status as ClaimStatus]
          const Icon = cfg.icon
          return (
            <Card key={s.status}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    s.status === "Open" ? "bg-blue-50" :
                    s.status === "Under Review" ? "bg-amber-50" :
                    s.status === "Refund" ? "bg-purple-50" :
                    s.status === "Replacement" ? "bg-cyan-50" :
                    "bg-emerald-50"
                  }`}>
                    <Icon className={`h-5 w-5 ${
                      s.status === "Open" ? "text-blue-500" :
                      s.status === "Under Review" ? "text-amber-500" :
                      s.status === "Refund" ? "text-purple-500" :
                      s.status === "Replacement" ? "text-cyan-500" :
                      "text-emerald-500"
                    }`} />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{cfg.label}</p>
                    <p className="text-lg font-semibold">{s.count}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Items Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Detail Barang Rusak/Cacat</CardTitle>
        </CardHeader>
        <CardContent>
          {damagedItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
              <AlertTriangle className="h-12 w-12 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">Tidak ada barang rusak untuk PO ini.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produk</TableHead>
                  <TableHead className="text-right">Qty Rusak</TableHead>
                  <TableHead>Gudang</TableHead>
                  <TableHead>Rak</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {damagedItems.map((item, i) => {
                  const cfg = statusConfig[item.claimStatus as ClaimStatus] || statusConfig.Open
                  return (
                    <TableRow key={i}>
                      <TableCell className="text-sm font-medium">{item.productName}</TableCell>
                      <TableCell className="text-right text-sm font-medium">{item.qty}</TableCell>
                      <TableCell className="text-sm">{item.locationName}</TableCell>
                      <TableCell className="text-sm">{item.rackName}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-xs ${cfg.className}`}>
                          {item.claimStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {CLAIM_STATUSES.filter((s) => s !== item.claimStatus).slice(0, 2).map((nextStatus) => (
                            <Button
                              key={nextStatus}
                              variant="outline"
                              size="sm"
                              className="h-7 text-xs"
                              onClick={() => updateClaimStatus(item.productName, nextStatus)}
                            >
                              {nextStatus}
                            </Button>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
