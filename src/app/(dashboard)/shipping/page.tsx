"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
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
  Filter,
  Truck,
  Package,
  CheckCircle2,
  FileCheck,
} from "lucide-react"
import { customers } from "@/lib/sales-data"
import { couriers } from "@/lib/shipping-data"

interface DeliveryOrder {
  id: string
  soRef: string
  customer: string
  address: string
  courierType: string
  items: string
  weight: string
  status: "Ready to Ship" | "Out for Delivery" | "Delivered" | "POD Received"
  podDate: string | null
  createdAt: string
}

const deliveryOrders: DeliveryOrder[] = [
  { id: "DO-001", soRef: "SO-2026-045", customer: "PT Autogloss Indonesia", address: "Jl. Raya Bekasi No. 123, Jakarta Timur", courierType: "JNE", items: "SCW Snow Foam x20, SCW Ceramic Coating x10", weight: "15 kg", status: "POD Received", podDate: "2026-06-05", createdAt: "2026-06-01" },
  { id: "DO-002", soRef: "SO-2026-044", customer: "CV Ceramic Pro JKT", address: "Jl. Kemang Raya No. 45, Jakarta Selatan", courierType: "SiCepat", items: "SCW Interior Detailer x15, SCW Tire Gel x25", weight: "12 kg", status: "Delivered", podDate: null, createdAt: "2026-05-30" },
  { id: "DO-003", soRef: "SO-2026-043", customer: "UD Shinemax", address: "Jl. Raya Bandung No. 456, Bandung", courierType: "J&T", items: "SCW Spray Wax x30, SCW Glass Cleaner x20", weight: "18 kg", status: "Out for Delivery", podDate: null, createdAt: "2026-05-28" },
  { id: "DO-004", soRef: "SO-2026-040", customer: "CV ProShine SBY", address: "Jl. Pemuda No. 789, Surabaya", courierType: "SiCepat", items: "SCW Polish Compound x10", weight: "8 kg", status: "POD Received", podDate: "2026-05-22", createdAt: "2026-05-18" },
  { id: "DO-005", soRef: "SO-2026-039", customer: "AutoCare Makassar", address: "Jl. A.P. Pettarani No. 12, Makassar", courierType: "Internal", items: "SCW Snow Foam x25", weight: "10 kg", status: "Out for Delivery", podDate: null, createdAt: "2026-05-15" },
  { id: "DO-006", soRef: "SO-2026-046", customer: "GlossUp Bali", address: "Jl. Sunset Road No. 88, Seminyak", courierType: "JNE", items: "SCW Ceramic Coating x8, SCW Spray Wax x12", weight: "11 kg", status: "Ready to Ship", podDate: null, createdAt: "2026-06-02" },
]

const statusConfig: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
  "Ready to Ship": { label: "Ready to Ship", className: "bg-blue-100 text-blue-800", icon: <Package className="h-3 w-3" /> },
  "Out for Delivery": { label: "Out for Delivery", className: "bg-amber-100 text-amber-800", icon: <Truck className="h-3 w-3" /> },
  "Delivered": { label: "Delivered", className: "bg-violet-100 text-violet-800", icon: <CheckCircle2 className="h-3 w-3" /> },
  "POD Received": { label: "POD Received", className: "bg-emerald-100 text-emerald-800", icon: <FileCheck className="h-3 w-3" /> },
}

const courierColors: Record<string, string> = {
  JNE: "bg-blue-100 text-blue-800",
  SiCepat: "bg-red-100 text-red-800",
  "J&T": "bg-red-100 text-red-800",
  GrabExpress: "bg-emerald-100 text-emerald-800",
  Internal: "bg-indigo-100 text-indigo-800",
}

const getCourierColor = (name: string) => courierColors[name] ?? "bg-gray-100 text-gray-800"

export default function ShippingPage() {
  const router = useRouter()
  const [courierFilter, setCourierFilter] = useState("All")
  const [shipmentOpen, setShipmentOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState("")
  const [dest, setDest] = useState("")
  const [courier, setCourier] = useState("")
  const [tracking, setTracking] = useState("")

  const activeCouriers = useMemo(() => couriers.filter((c) => c.status === "Active"), [])

  const selectedCustomerLabel = useMemo(() => {
    const c = customers.find((c) => c.id === selectedCustomer)
    return c ? `${c.company} - ${c.name}` : ""
  }, [selectedCustomer])

  const internalCouriers = useMemo(() => activeCouriers.filter((c) => c.type === "Internal"), [activeCouriers])
  const expedisiCouriers = useMemo(() => activeCouriers.filter((c) => c.type === "Expedisi Partner"), [activeCouriers])

  const filtered = useMemo(() => {
    return deliveryOrders.filter((o) =>
      courierFilter === "All" || o.courierType === courierFilter
    )
  }, [courierFilter])

  const readyCount = deliveryOrders.filter((o) => o.status === "Ready to Ship").length
  const outForDeliveryCount = deliveryOrders.filter((o) => o.status === "Out for Delivery").length
  const deliveredCount = deliveryOrders.filter((o) => o.status === "Delivered").length
  const podCount = deliveryOrders.filter((o) => o.status === "POD Received").length

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Delivery Orders</h1>
          <p className="text-muted-foreground">
            Kelola pengiriman dan tracking Proof of Delivery (POD)
          </p>
        </div>
        <Dialog open={shipmentOpen} onOpenChange={setShipmentOpen}>
          <DialogTrigger render={<Button />}>
            <Plus className="mr-2 h-4 w-4" />
            Buat Delivery Order
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Buat Delivery Order</DialogTitle>
              <DialogDescription>Isi detail pengiriman di bawah ini.</DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Customer</label>
                <Select value={selectedCustomer} onValueChange={(v) => setSelectedCustomer(v ?? "")}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih customer...">{selectedCustomerLabel || null}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.company} - {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Alamat Tujuan</label>
                <Input placeholder="e.g. Jl. Sudirman No. 1, Jakarta" value={dest} onChange={(e) => setDest(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium">Kurir</label>
                <Select value={courier} onValueChange={(v) => setCourier(v ?? "")}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih kurir..." />
                  </SelectTrigger>
                  <SelectContent>
                    {expedisiCouriers.length > 0 && (
                      <>
                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Expedisi Partners</div>
                        {expedisiCouriers.map((c) => (
                          <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                        ))}
                      </>
                    )}
                    {internalCouriers.length > 0 && (
                      <>
                        <div role="separator" className="-mx-1 my-1 h-px bg-border" />
                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Internal</div>
                        {internalCouriers.map((c) => (
                          <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                        ))}
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Tracking Number</label>
                <Input placeholder="e.g. JNE1234567890" value={tracking} onChange={(e) => setTracking(e.target.value)} />
              </div>
            </div>
            <DialogFooter showCloseButton>
              <Button onClick={() => { alert("Delivery Order berhasil dibuat!"); setShipmentOpen(false); setDest(""); setCourier(""); setTracking(""); }}>
                Buat Delivery Order
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
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
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
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                <Truck className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Out for Delivery</p>
                <p className="text-2xl font-bold text-amber-600">{outForDeliveryCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100">
                <CheckCircle2 className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Delivered</p>
                <p className="text-2xl font-bold text-violet-600">{deliveredCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <FileCheck className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">POD Received</p>
                <p className="text-2xl font-bold text-emerald-600">{podCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Delivery Orders</CardTitle>
              <CardDescription>{filtered.length} delivery order{filtered.length !== 1 ? "s" : ""}</CardDescription>
            </div>
            <Select value={courierFilter} onValueChange={(v) => setCourierFilter(v ?? "All")}>
              <SelectTrigger className="w-44">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Courier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">Semua Kurir</SelectItem>
                {activeCouriers.map((c) => (
                  <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>DO Number</TableHead>
                <TableHead>SO Ref</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Courier</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>POD Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((order) => (
                <TableRow
                  key={order.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => router.push(`/shipping/${order.id}`)}
                >
                  <TableCell className="font-sans text-xs font-medium text-blue-600 hover:underline">{order.id}</TableCell>
                  <TableCell className="font-sans text-xs">{order.soRef}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{order.customer}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-48">{order.address}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getCourierColor(order.courierType)}>
                      {order.courierType}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.weight}</TableCell>
                  <TableCell>
                    <Badge className={`${statusConfig[order.status].className} flex items-center gap-1 w-fit`}>
                      {statusConfig[order.status].icon}
                      {statusConfig[order.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {order.podDate || "-"}
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
