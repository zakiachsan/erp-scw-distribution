"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Search,
  AlertTriangle,
  Package,
  Warehouse,
} from "lucide-react"
import { useWarehouseStore } from "@/lib/warehouse-store"

interface AllocationItem {
  locationId: string
  rackId: string
  qty: string
  status: string
}

interface DamagedItem {
  poId: string
  poNumber: string
  supplier: string
  productName: string
  sku: string
  qty: number
  locationName: string
  rackName: string
}

export default function DamagedItemsPage() {
  const [mounted, setMounted] = useState(false)
  const [search, setSearch] = useState("")
  const [damagedItems, setDamagedItems] = useState<DamagedItem[]>([])
  const { locations, racks } = useWarehouseStore()

  useEffect(() => {
    setMounted(true)

    // Seed sample data if localStorage is empty
    const stored = localStorage.getItem("scw-warehouse-allocations")
    if (!stored || JSON.parse(stored).length === 0) {
      const sampleData = {
        "po-001": {
          poNumber: "PO-2026-0051",
          supplier: "PT Autocare Indonesia",
          items: {
            "SCW Snow Foam": [
              { locationId: "loc-1", rackId: "1", qty: "45", status: "Sudah Diopname" },
              { locationId: "loc-1", rackId: "1", qty: "3", status: "Rusak/Cacat" },
            ],
            "SCW Shampoo Plus": [
              { locationId: "loc-1", rackId: "3", qty: "28", status: "Sudah Diopname" },
              { locationId: "loc-1", rackId: "3", qty: "2", status: "Rusak/Cacat" },
            ],
            "SCW Microfiber Towel": [
              { locationId: "loc-2", rackId: "8", qty: "95", status: "Baru Diterima" },
              { locationId: "loc-2", rackId: "8", qty: "5", status: "Rusak/Cacat" },
            ],
          },
          updatedAt: Date.now() - 86400000,
        },
        "po-002": {
          poNumber: "PO-2026-0052",
          supplier: "ChemPro Asia",
          items: {
            "SCW Ceramic Coating": [
              { locationId: "loc-1", rackId: "2", qty: "18", status: "Sudah Diopname" },
              { locationId: "loc-1", rackId: "2", qty: "2", status: "Rusak/Cacat" },
            ],
            "SCW Spray Wax": [
              { locationId: "loc-1", rackId: "2", qty: "38", status: "Baru Diterima" },
              { locationId: "loc-1", rackId: "2", qty: "2", status: "Rusak/Cacat" },
            ],
          },
          updatedAt: Date.now() - 43200000,
        },
        "po-005": {
          poNumber: "PO-2026-0055",
          supplier: "PT Autocare Indonesia",
          items: {
            "SCW Polish Compound": [
              { locationId: "loc-1", rackId: "7", qty: "33", status: "Sudah Diopname" },
              { locationId: "loc-1", rackId: "7", qty: "2", status: "Rusak/Cacat" },
            ],
          },
          updatedAt: Date.now() - 3600000,
        },
      }
      localStorage.setItem("scw-warehouse-allocations", JSON.stringify(sampleData))
    }

    const rawData = localStorage.getItem("scw-warehouse-allocations")
    if (!rawData) return

    try {
      const allAllocs = JSON.parse(rawData)
      const items: DamagedItem[] = []

      for (const [poId, data] of Object.entries(allAllocs)) {
        const poData = data as { poNumber: string; supplier: string; items: Record<string, AllocationItem[]> }
        for (const [itemName, allocs] of Object.entries(poData.items)) {
          for (const alloc of allocs) {
            if (alloc.status === "Rusak/Cacat" && parseInt(alloc.qty) > 0) {
              const location = locations.find((l) => l.id === alloc.locationId)
              const rack = racks.find((r) => r.id === alloc.rackId)
              items.push({
                poId,
                poNumber: poData.poNumber,
                supplier: poData.supplier,
                productName: itemName,
                sku: "",
                qty: parseInt(alloc.qty),
                locationName: location?.name || alloc.locationId,
                rackName: rack?.name || alloc.rackId || "—",
              })
            }
          }
        }
      }

      setDamagedItems(items)
    } catch {}
  }, [locations, racks])

  const filtered = damagedItems.filter((item) =>
    item.productName.toLowerCase().includes(search.toLowerCase()) ||
    item.poNumber.toLowerCase().includes(search.toLowerCase()) ||
    item.supplier.toLowerCase().includes(search.toLowerCase())
  )

  const totalDamaged = damagedItems.length
  const totalQty = damagedItems.reduce((sum, item) => sum + item.qty, 0)

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

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Damaged Items</h1>
        <p className="text-muted-foreground">
          Barang yang teridentifikasi rusak atau cacat dari proses putaway
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Total Damaged</p>
                <p className="text-lg font-semibold">{totalDamaged}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
                <Package className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Total Qty</p>
                <p className="text-lg font-semibold">{totalQty}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                <Warehouse className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">PO Terdampak</p>
                <p className="text-lg font-semibold">{new Set(damagedItems.map((d) => d.poId)).size}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Daftar Barang Rusak/Cacat</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari produk, PO, supplier..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
              <AlertTriangle className="h-12 w-12 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">
                {damagedItems.length === 0
                  ? "Belum ada barang yang teridentifikasi rusak/cacat."
                  : "Tidak ada data yang cocok dengan pencarian."}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PO Number</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Produk</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead>Gudang</TableHead>
                  <TableHead>Rak</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Link
                        href={`/inventory/damaged/${item.poId}`}
                        className="text-blue-600 hover:underline font-sans font-medium text-sm"
                      >
                        {item.poNumber}
                      </Link>
                    </TableCell>
                    <TableCell className="text-sm">{item.supplier}</TableCell>
                    <TableCell className="text-sm font-medium">{item.productName}</TableCell>
                    <TableCell className="text-right text-sm font-medium">{item.qty}</TableCell>
                    <TableCell className="text-sm">{item.locationName}</TableCell>
                    <TableCell className="text-sm">{item.rackName}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        Rusak/Cacat
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
