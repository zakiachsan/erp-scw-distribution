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
  FileText,
  Package,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Warehouse,
  MapPin,
  StickyNote,
  Stamp,
  ClipboardCheck,
} from "lucide-react"
import { inboundPOSources } from "@/lib/warehouse-store"

interface AllocationItem {
  locationId: string
  rackId: string
  qty: string
  status: string
}

export default function ReportDetailPage() {
  const params = useParams()
  const poId = String(params?.poId ?? "")
  const [mounted, setMounted] = useState(false)
  const [allocItems, setAllocItems] = useState<{ name: string; sku: string; qty: number; location: string; rack: string; status: string }[]>([])
  const [damagedItems, setDamagedItems] = useState<{ name: string; qty: number; location: string; rack: string }[]>([])
  const [locations, setLocations] = useState<string[]>([])
  const [rtlUpdated, setRtlUpdated] = useState(false)
  const [hologramApplied, setHologramApplied] = useState(false)

  const po = inboundPOSources.find((p) => p.id === poId) ||
    inboundPOSources.find((p) => p.id === `po-00${poId}`)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("scw-warehouse-allocations")
    if (!stored) return

    try {
      const allAllocs = JSON.parse(stored)
      const allocData = allAllocs[poId] || allAllocs[poId.replace("po-", "po-00")]
      if (!allocData) return

      const locMap: Record<string, string> = {
        "loc-1": "Gudang Utama", "loc-2": "Gudang Cabang", "loc-3": "Gudang Display",
      }
      const rackMap: Record<string, string> = {
        "1": "Rak A-01", "2": "Rak A-02", "3": "Rak A-03", "4": "Rak B-01",
        "5": "Rak B-02", "6": "Rak C-01", "7": "Rak C-02", "8": "Rak D-01",
        "9": "Rak D-02", "10": "Rak E-01", "11": "Rak F-01", "12": "Rak F-02",
      }

      const allocated: typeof allocItems = []
      const damaged: typeof damagedItems = []
      const locs = new Set<string>()

      for (const [itemName, allocs] of Object.entries(allocData.items as Record<string, AllocationItem[]>)) {
        for (const alloc of allocs) {
          const qty = parseInt(alloc.qty)
          if (qty <= 0) continue
          const locName = locMap[alloc.locationId] || alloc.locationId
          const rackName = rackMap[alloc.rackId] || alloc.rackId || "—"
          locs.add(locName)

          if (alloc.status === "Rusak/Cacat") {
            damaged.push({ name: itemName, qty, location: locName, rack: rackName })
          } else {
            allocated.push({ name: itemName, sku: "", qty, location: locName, rack: rackName, status: alloc.status })
          }
        }
      }
      setAllocItems(allocated)
      setDamagedItems(damaged)
      setLocations([...locs])
      setRtlUpdated(poId === "po-001" || poId === "po-005")
      setHologramApplied(poId === "po-001")
    } catch {}
  }, [poId])

  if (!mounted || !po) {
    return (
      <div className="space-y-6 p-6">
        <Link href="/inventory/reports" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>
        <Card>
          <CardContent className="p-8 text-center text-sm text-muted-foreground">
            Data tidak ditemukan.
          </CardContent>
        </Card>
      </div>
    )
  }

  // Sample data
  const hasInvoice = poId === "po-001" || poId === "po-002" || poId === "po-004"
  const invoiceNumber = hasInvoice ? `INV-${po.poNumber.replace("PO-", "")}` : "—"

  const totalAllocated = allocItems.reduce((sum, item) => sum + item.qty, 0)
  const totalDamaged = damagedItems.reduce((sum, item) => sum + item.qty, 0)

  return (
    <div className="space-y-6 p-6">
      {/* Back */}
      <Link href="/inventory/reports" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Reports
      </Link>

      {/* Header */}
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-sans font-medium text-xs text-muted-foreground">{po.poNumber}</span>
              <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                <FileText className="mr-1 h-3 w-3" />
                Inventory Report
              </Badge>
            </div>
            <CardTitle>{po.supplier}</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              {po.items.length} items · Ship: {po.shipDate} · ETA: {po.expectedArrival}
            </p>
          </div>
        </CardHeader>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                <Package className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Total Ordered</p>
                <p className="text-lg font-semibold">{po.items.reduce((s, i) => s + i.orderedQty, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                <Warehouse className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">In Storage</p>
                <p className="text-lg font-semibold">{totalAllocated}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Damaged</p>
                <p className="text-lg font-semibold">{totalDamaged}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
                <MapPin className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Locations</p>
                <p className="text-lg font-semibold">{locations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Items in Storage */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Warehouse className="h-4 w-4 text-indigo-600" />
                Items in Storage
              </CardTitle>
            </CardHeader>
            <CardContent>
              {allocItems.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">Belum ada item yang di-putaway.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produk</TableHead>
                      <TableHead className="text-right">Qty</TableHead>
                      <TableHead>Gudang</TableHead>
                      <TableHead>Rak</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allocItems.map((item, i) => (
                      <TableRow key={i}>
                        <TableCell className="text-sm font-medium">{item.name}</TableCell>
                        <TableCell className="text-right text-sm">{item.qty}</TableCell>
                        <TableCell className="text-sm">{item.location}</TableCell>
                        <TableCell className="text-sm">{item.rack}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`text-xs ${
                            item.status === "Sudah Diopname"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-blue-50 text-blue-700 border-blue-200"
                          }`}>
                            {item.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Damaged Items */}
          {damagedItems.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  Damaged Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produk</TableHead>
                      <TableHead className="text-right">Qty</TableHead>
                      <TableHead>Gudang</TableHead>
                      <TableHead>Rak</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {damagedItems.map((item, i) => (
                      <TableRow key={i}>
                        <TableCell className="text-sm font-medium">{item.name}</TableCell>
                        <TableCell className="text-right text-sm">{item.qty}</TableCell>
                        <TableCell className="text-sm">{item.location}</TableCell>
                        <TableCell className="text-sm">{item.rack}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs">
                            Rusak/Cacat
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Additional Info */}
        <div className="space-y-6">
          {/* Invoice PO */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-indigo-600" />
                Invoice PO
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">No. Invoice</span>
                <span className="text-sm font-medium">{invoiceNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Total</span>
                <span className="text-sm font-semibold">Rp {po.items.reduce((s, i) => s + (i.total || i.orderedQty * 0), 0).toLocaleString("id-ID")}</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Item Invoice</p>
                <div className="space-y-1.5">
                  {po.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground truncate">{item.name}</span>
                      <span className="font-medium shrink-0 ml-2">×{item.orderedQty}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Locations */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-indigo-600" />
                Lokasi Gudang & Rak
              </CardTitle>
            </CardHeader>
            <CardContent>
              {locations.length === 0 ? (
                <p className="text-xs text-muted-foreground">Belum ada lokasi.</p>
              ) : (
                <div className="space-y-2">
                  {locations.map((loc) => (
                    <div key={loc} className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                      <Warehouse className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{loc}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* PRTL */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <ClipboardCheck className="h-4 w-4 text-indigo-600" />
                Update PRTL
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Status PRTL</span>
                {rtlUpdated ? (
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                    <CheckCircle2 className="mr-1 h-3 w-3" /> Sudah Update
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
                    <Clock className="mr-1 h-3 w-3" /> Belum Update
                  </Badge>
                )}
              </div>
              {!rtlUpdated && (
                <Button size="sm" className="w-full" onClick={() => setRtlUpdated(true)}>
                  <ClipboardCheck className="mr-1.5 h-3.5 w-3.5" />
                  Tandai Sudah Update PRTL
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Hologram Sticker */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Stamp className="h-4 w-4 text-indigo-600" />
                Stiker Hologram SCW
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Status Stiker</span>
                {hologramApplied ? (
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                    <CheckCircle2 className="mr-1 h-3 w-3" /> Sudah Tempel
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200 text-xs">
                    <Clock className="mr-1 h-3 w-3" /> Belum Tempel
                  </Badge>
                )}
              </div>
              {!hologramApplied && (
                <Button size="sm" className="w-full" onClick={() => setHologramApplied(true)}>
                  <Stamp className="mr-1.5 h-3.5 w-3.5" />
                  Tandai Sudah Tempel Stiker
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
