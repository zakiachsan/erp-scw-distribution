"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
  Truck,
  Package,
  MapPin,
  ArrowUpDown,
} from "lucide-react"

/* ── Types ── */
interface LogisticItem {
  id: string
  poNumber: string
  poId: string
  courier: string
  trackingNumber: string
  status: "Booked" | "Picked Up" | "In Transit" | "Delivered"
  shippingDate: string
  estimatedDelivery: string
  destination: string
  totalItems: number
}

/* ── Initial Data ── */
const initialData: LogisticItem[] = [
  {
    id: "lg1",
    poNumber: "PO-2025-0042",
    poId: "1",
    courier: "JNE",
    trackingNumber: "JNE287654123",
    status: "Delivered",
    shippingDate: "2025-12-12",
    estimatedDelivery: "2025-12-15",
    destination: "Tangerang, Banten",
    totalItems: 6,
  },
  {
    id: "lg2",
    poNumber: "PO-2025-0045",
    poId: "4",
    courier: "SiCepat",
    trackingNumber: "SCP481276543",
    status: "In Transit",
    shippingDate: "2025-12-16",
    estimatedDelivery: "2025-12-20",
    destination: "Jakarta Selatan",
    totalItems: 4,
  },
  {
    id: "lg3",
    poNumber: "PO-2025-0043",
    poId: "2",
    courier: "J&T Express",
    trackingNumber: "JT583726194",
    status: "Delivered",
    shippingDate: "2025-12-14",
    estimatedDelivery: "2025-12-16",
    destination: "Tangerang, Banten",
    totalItems: 3,
  },
  {
    id: "lg4",
    poNumber: "PO-2025-0049",
    poId: "8",
    courier: "DHL",
    trackingNumber: "DHL9988776655",
    status: "Picked Up",
    shippingDate: "2025-12-18",
    estimatedDelivery: "2025-12-28",
    destination: "Singapore",
    totalItems: 4,
  },
]

const statusConfig: Record<string, { label: string; className: string }> = {
  Booked: { label: "Booked", className: "bg-blue-50 text-blue-700 border-blue-200" },
  "Picked Up": { label: "Picked Up", className: "bg-amber-50 text-amber-700 border-amber-200" },
  "In Transit": { label: "In Transit", className: "bg-cyan-50 text-cyan-700 border-cyan-200" },
  Delivered: { label: "Delivered", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
}

export default function LogisticPage() {
  const [data] = useState<LogisticItem[]>(initialData)
  const [search, setSearch] = useState("")
  const [sortField, setSortField] = useState<keyof LogisticItem>("shippingDate")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc")

  const filtered = useMemo(() => {
    if (!search) return data
    const q = search.toLowerCase()
    return data.filter(
      (item) =>
        item.poNumber.toLowerCase().includes(q) ||
        item.courier.toLowerCase().includes(q) ||
        item.trackingNumber.toLowerCase().includes(q) ||
        item.destination.toLowerCase().includes(q)
    )
  }, [data, search])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const aVal = a[sortField]
      const bVal = b[sortField]
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
      }
      return sortDir === "asc" ? Number(aVal) - Number(bVal) : Number(bVal) - Number(aVal)
    })
  }, [filtered, sortField, sortDir])

  const toggleSort = (field: keyof LogisticItem) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortField(field)
      setSortDir("asc")
    }
  }

  const stats = {
    total: data.length,
    inTransit: data.filter((d) => d.status === "In Transit" || d.status === "Picked Up").length,
    delivered: data.filter((d) => d.status === "Delivered").length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Logistic</h1>
        <p className="text-muted-foreground">Informasi pengiriman kurir untuk Purchase Orders</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Total Shipment</p>
                <p className="mt-1 text-lg font-semibold">{stats.total}</p>
              </div>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-indigo-50">
                <Truck className="h-4 w-4 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">In Transit</p>
                <p className="mt-1 text-lg font-semibold">{stats.inTransit}</p>
              </div>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-cyan-50">
                <Package className="h-4 w-4 text-cyan-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Delivered</p>
                <p className="mt-1 text-lg font-semibold">{stats.delivered}</p>
              </div>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-emerald-50">
                <MapPin className="h-4 w-4 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">Daftar Pengiriman</CardTitle>
            <CardDescription>Semua pengiriman yang terhubung dengan Purchase Orders</CardDescription>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari pengiriman..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <button className="flex items-center gap-1 font-medium" onClick={() => toggleSort("courier")}>
                    Courier <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead>PO</TableHead>
                <TableHead>Tracking</TableHead>
                <TableHead>
                  <button className="flex items-center gap-1 font-medium" onClick={() => toggleSort("shippingDate")}>
                    Ship Date <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead>Est. Delivery</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                    Tidak ada data pengiriman.
                  </TableCell>
                </TableRow>
              )}
              {sorted.map((item) => {
                const cfg = statusConfig[item.status]
                return (
                  <TableRow key={item.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{item.courier}</TableCell>
                    <TableCell>
                      <Link
                        href={`/purchasing/${item.poId}?status=${item.status === "Delivered" ? "Paid" : "Partial"}`}
                        className="text-blue-600 hover:underline font-sans font-medium text-sm"
                      >
                        {item.poNumber}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link href={`/purchasing/logistic/${item.id}`} className="text-blue-600 hover:underline font-sans font-medium text-sm">
                        {item.trackingNumber}
                      </Link>
                    </TableCell>
                    <TableCell className="text-xs">{new Date(item.shippingDate).toLocaleDateString("id-ID")}</TableCell>
                    <TableCell className="text-xs">{new Date(item.estimatedDelivery).toLocaleDateString("id-ID")}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{item.destination}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cfg.className}>
                        {cfg.label}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
