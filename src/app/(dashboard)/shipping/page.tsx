"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Plus,
  Eye,
  Filter,
  Truck,
  Package,
  Clock,
} from "lucide-react"

interface ShipmentOrder {
  id: string
  soRef: string
  customer: string
  address: string
  courierType: "JNE" | "SiCepat" | "J&T" | "GrabExpress" | "Internal"
  items: string
  weight: string
  status: "Pending" | "Packing" | "Ready to Ship" | "Shipped"
  createdAt: string
}

const shipmentOrders: ShipmentOrder[] = [
  { id: "SHP-001", soRef: "SO-2026-045", customer: "PT Autogloss Indonesia", address: "Jl. Raya Bekasi No. 123, Jakarta Timur", courierType: "JNE", items: "SCW Snow Foam x20, SCW Ceramic Coating x10", weight: "15 kg", status: "Ready to Ship", createdAt: "2026-06-01" },
  { id: "SHP-002", soRef: "SO-2026-044", customer: "CV Ceramic Pro JKT", address: "Jl. Kemang Raya No. 45, Jakarta Selatan", courierType: "SiCepat", items: "SCW Interior Detailer x15, SCW Tire Gel x25", weight: "12 kg", status: "Packing", createdAt: "2026-05-30" },
  { id: "SHP-003", soRef: "SO-2026-043", customer: "UD Shinemax", address: "Jl. Raya Bandung No. 456, Bandung", courierType: "J&T", items: "SCW Spray Wax x30, SCW Glass Cleaner x20", weight: "18 kg", status: "Shipped", createdAt: "2026-05-28" },
  { id: "SHP-004", soRef: "SO-2026-040", customer: "CV ProShine SBY", address: "Jl. Pemuda No. 789, Surabaya", courierType: "SiCepat", items: "SCW Polish Compound x10", weight: "8 kg", status: "Shipped", createdAt: "2026-05-18" },
  { id: "SHP-005", soRef: "SO-2026-039", customer: "AutoCare Makassar", address: "Jl. A.P. Pettarani No. 12, Makassar", courierType: "Internal", items: "SCW Snow Foam x25", weight: "10 kg", status: "Pending", createdAt: "2026-05-15" },
  { id: "SHP-006", soRef: "SO-2026-046", customer: "GlossUp Bali", address: "Jl. Sunset Road No. 88, Seminyak", courierType: "JNE", items: "SCW Ceramic Coating x8, SCW Spray Wax x12", weight: "11 kg", status: "Ready to Ship", createdAt: "2026-06-02" },
]

const statusConfig: Record<string, { label: string; className: string }> = {
  Pending: { label: "Pending", className: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400" },
  Packing: { label: "Packing", className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" },
  "Ready to Ship": { label: "Ready to Ship", className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
  Shipped: { label: "Shipped", className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" },
}

const courierColors: Record<string, string> = {
  JNE: "bg-blue-100 text-blue-800",
  SiCepat: "bg-red-100 text-red-800",
  "J&T": "bg-red-100 text-red-800",
  GrabExpress: "bg-emerald-100 text-emerald-800",
  Internal: "bg-indigo-100 text-indigo-800",
}

export default function ShippingPage() {
  const [courierFilter, setCourierFilter] = useState("All")
  const [shipmentOpen, setShipmentOpen] = useState(false)
  const [dest, setDest] = useState("")
  const [courier, setCourier] = useState("")
  const [tracking, setTracking] = useState("")

  const filtered = useMemo(() => {
    return shipmentOrders.filter((o) =>
      courierFilter === "All" || o.courierType === courierFilter
    )
  }, [courierFilter])

  const pendingCount = shipmentOrders.filter((o) => o.status === "Pending").length
  const readyCount = shipmentOrders.filter((o) => o.status === "Ready to Ship").length
  const shippedCount = shipmentOrders.filter((o) => o.status === "Shipped").length

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Shipping Queue</h1>
          <p className="text-muted-foreground">
            Manage shipment queue and track delivery status
          </p>
        </div>
        <Dialog open={shipmentOpen} onOpenChange={setShipmentOpen}>
          <DialogTrigger render={<Button />}>
            <Plus className="mr-2 h-4 w-4" />
            Create Shipment
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create Shipment</DialogTitle>
              <DialogDescription>Fill in the shipment details below.</DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Destination</label>
                <Input placeholder="e.g. Jl. Sudirman No. 1, Jakarta" value={dest} onChange={(e) => setDest(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium">Courier</label>
                <Input placeholder="e.g. JNE, SiCepat, J&T" value={courier} onChange={(e) => setCourier(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium">Tracking Number</label>
                <Input placeholder="e.g. JNE1234567890" value={tracking} onChange={(e) => setTracking(e.target.value)} />
              </div>
            </div>
            <DialogFooter showCloseButton>
              <Button onClick={() => { alert("Shipment berhasil dibuat!"); setShipmentOpen(false); setDest(""); setCourier(""); setTracking(""); }}>
                Create Shipment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-900/30">
                <Clock className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ready to Ship</p>
                <p className="text-2xl font-bold text-blue-600">{readyCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <Truck className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Shipped</p>
                <p className="text-2xl font-bold text-emerald-600">{shippedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                <Truck className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Shipments</p>
                <p className="text-2xl font-bold">{shipmentOrders.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Shipment Queue</CardTitle>
              <CardDescription>{filtered.length} shipment{filtered.length !== 1 ? "s" : ""} in queue</CardDescription>
            </div>
            <Select value={courierFilter} onValueChange={(v) => setCourierFilter(v ?? "All")}>
              <SelectTrigger className="w-44">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Courier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Couriers</SelectItem>
                <SelectItem value="JNE">JNE</SelectItem>
                <SelectItem value="SiCepat">SiCepat</SelectItem>
                <SelectItem value="J&T">J&T</SelectItem>
                <SelectItem value="GrabExpress">GrabExpress</SelectItem>
                <SelectItem value="Internal">Internal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shipment ID</TableHead>
                <TableHead>SO Ref</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Courier</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-sans text-xs font-medium">{order.id}</TableCell>
                  <TableCell className="font-sans text-xs">{order.soRef}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{order.customer}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-48">{order.address}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={courierColors[order.courierType]}>
                      {order.courierType}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.weight}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusConfig[order.status].className}>
                      {statusConfig[order.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/shipping/${order.id}`}>
                      <Button variant="ghost" size="icon-sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
