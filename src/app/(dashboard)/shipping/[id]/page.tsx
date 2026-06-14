"use client"

import { useState, use } from "react"
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
  Truck,
  Package,
  CheckCircle2,
  MapPin,
} from "lucide-react"

type ShipmentStatus = "Ready to Ship" | "Out for Delivery" | "Delivered"

interface ShipmentOrder {
  id: string
  soRef: string
  customer: string
  address: string
  courierType: string
  items: string
  weight: string
  status: ShipmentStatus
  createdAt: string
}

const statusConfig: Record<string, { label: string; className: string }> = {
  "Ready to Ship": { label: "Ready to Ship", className: "bg-blue-100 text-blue-800" },
  "Out for Delivery": { label: "Out for Delivery", className: "bg-amber-100 text-amber-800" },
  Delivered: { label: "Delivered", className: "bg-emerald-100 text-emerald-800" },
}

const ALL_SHIPMENTS: Record<string, ShipmentOrder> = {
  "SHP-001": { id: "SHP-001", soRef: "SO-2026-045", customer: "PT Autogloss Indonesia", address: "Jl. Raya Bekasi No. 123, Jakarta Timur", courierType: "JNE", items: "SCW Snow Foam x20, SCW Ceramic Coating x10", weight: "15 kg", status: "Ready to Ship", createdAt: "2026-06-01" },
  "SHP-002": { id: "SHP-002", soRef: "SO-2026-044", customer: "CV Ceramic Pro JKT", address: "Jl. Kemang Raya No. 45, Jakarta Selatan", courierType: "SiCepat", items: "SCW Interior Detailer x15, SCW Tire Gel x25", weight: "12 kg", status: "Ready to Ship", createdAt: "2026-05-30" },
  "SHP-003": { id: "SHP-003", soRef: "SO-2026-043", customer: "UD Shinemax", address: "Jl. Raya Bandung No. 456, Bandung", courierType: "J&T", items: "SCW Spray Wax x30, SCW Glass Cleaner x20", weight: "18 kg", status: "Out for Delivery", createdAt: "2026-05-28" },
  "SHP-004": { id: "SHP-004", soRef: "SO-2026-040", customer: "CV ProShine SBY", address: "Jl. Pemuda No. 789, Surabaya", courierType: "SiCepat", items: "SCW Polish Compound x10", weight: "8 kg", status: "Delivered", createdAt: "2026-05-18" },
  "SHP-005": { id: "SHP-005", soRef: "SO-2026-039", customer: "AutoCare Makassar", address: "Jl. A.P. Pettarani No. 12, Makassar", courierType: "Internal", items: "SCW Snow Foam x25", weight: "10 kg", status: "Out for Delivery", createdAt: "2026-05-15" },
  "SHP-006": { id: "SHP-006", soRef: "SO-2026-046", customer: "GlossUp Bali", address: "Jl. Sunset Road No. 88, Seminyak", courierType: "JNE", items: "SCW Ceramic Coating x8, SCW Spray Wax x12", weight: "11 kg", status: "Ready to Ship", createdAt: "2026-06-02" },
}

const courierColors: Record<string, string> = {
  JNE: "bg-blue-100 text-blue-800",
  SiCepat: "bg-red-100 text-red-800",
  "J&T": "bg-red-100 text-red-800",
  GrabExpress: "bg-emerald-100 text-emerald-800",
  Internal: "bg-indigo-100 text-indigo-800",
}

const getCourierColor = (name: string) => courierColors[name] ?? "bg-gray-100 text-gray-800"

export default function ShippingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const [shipment, setShipment] = useState(() => ALL_SHIPMENTS[id])

  if (!shipment) {
    return (
      <div className="p-6">
        <Button variant="ghost" size="icon-sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <p className="mt-4 text-muted-foreground">Shipment tidak ditemukan.</p>
      </div>
    )
  }

  const st = statusConfig[shipment.status]
  const isReady = shipment.status === "Ready to Ship"
  const isOut = shipment.status === "Out for Delivery"

  const handlePickup = () => {
    setShipment((prev) => ({ ...prev, status: "Out for Delivery" as ShipmentStatus }))
  }

  const handleConfirmDelivered = () => {
    setShipment((prev) => ({ ...prev, status: "Delivered" as ShipmentStatus }))
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon-sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{shipment.id}</h1>
          <p className="text-muted-foreground">{shipment.soRef}</p>
        </div>
        <Badge variant="outline" className={st.className}>{st.label}</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Item Shipment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Items</span>
                  <span className="font-medium">{shipment.items}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Weight</span>
                  <span className="font-medium">{shipment.weight}</span>
                </div>
                <hr />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Customer</span>
                  <span className="font-medium text-right">{shipment.customer}</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">{shipment.address}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informasi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Courier</span>
                <Badge variant="outline" className={getCourierColor(shipment.courierType)}>
                  <Truck className="mr-1 h-3 w-3" />
                  {shipment.courierType}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <Badge variant="outline" className={st.className}>{st.label}</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tanggal</span>
                <span>{shipment.createdAt}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Aksi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {isReady && (
                <Button className="w-full gap-2" onClick={handlePickup}>
                  <Truck className="h-4 w-4" />
                  Sudah Diambil Kurir
                </Button>
              )}
              {isOut && (
                <Button className="w-full gap-2" onClick={handleConfirmDelivered}>
                  <CheckCircle2 className="h-4 w-4" />
                  Konfirmasi Sampai
                </Button>
              )}
              {shipment.status === "Delivered" && (
                <div className="text-center text-sm text-emerald-600 py-2">
                  ✅ Paket sudah sampai tujuan.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
