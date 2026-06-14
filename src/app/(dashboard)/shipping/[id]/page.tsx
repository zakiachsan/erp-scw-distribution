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
  Printer,
  Barcode,
  Copy,
} from "lucide-react"

type ShipmentStatus = "Ready to Ship" | "Out for Delivery" | "Delivered"

interface ShipmentItem {
  name: string
  qty: number
  weightPerItem: string
}

interface ShipmentOrder {
  id: string
  soRef: string
  customer: string
  address: string
  courierType: string
  itemsList: ShipmentItem[]
  totalWeight: string
  status: ShipmentStatus
  createdAt: string
  resiNumber: string
}

const statusConfig: Record<string, { label: string; className: string }> = {
  "Ready to Ship": { label: "Ready to Ship", className: "bg-blue-100 text-blue-800" },
  "Out for Delivery": { label: "Out for Delivery", className: "bg-amber-100 text-amber-800" },
  Delivered: { label: "Delivered", className: "bg-emerald-100 text-emerald-800" },
}

const ALL_SHIPMENTS: Record<string, ShipmentOrder> = {
  "SHP-001": {
    id: "SHP-001", soRef: "SO-2026-045",
    customer: "PT Autogloss Indonesia", address: "Jl. Raya Bekasi No. 123, Jakarta Timur",
    courierType: "JNE",
    itemsList: [
      { name: "SCW Snow Foam", qty: 20, weightPerItem: "0.5 kg" },
      { name: "SCW Ceramic Coating", qty: 10, weightPerItem: "0.5 kg" },
    ],
    totalWeight: "15 kg", status: "Ready to Ship", createdAt: "2026-06-01",
    resiNumber: "JNE1234567890",
  },
  "SHP-002": {
    id: "SHP-002", soRef: "SO-2026-044",
    customer: "CV Ceramic Pro JKT", address: "Jl. Kemang Raya No. 45, Jakarta Selatan",
    courierType: "SiCepat",
    itemsList: [
      { name: "SCW Interior Detailer", qty: 15, weightPerItem: "0.4 kg" },
      { name: "SCW Tire Gel", qty: 25, weightPerItem: "0.3 kg" },
    ],
    totalWeight: "12 kg", status: "Ready to Ship", createdAt: "2026-05-30",
    resiNumber: "SCP0098765432",
  },
  "SHP-003": {
    id: "SHP-003", soRef: "SO-2026-043",
    customer: "UD Shinemax", address: "Jl. Raya Bandung No. 456, Bandung",
    courierType: "J&T",
    itemsList: [
      { name: "SCW Spray Wax", qty: 30, weightPerItem: "0.3 kg" },
      { name: "SCW Glass Cleaner", qty: 20, weightPerItem: "0.4 kg" },
    ],
    totalWeight: "18 kg", status: "Out for Delivery", createdAt: "2026-05-28",
    resiNumber: "JT0005544332",
  },
  "SHP-004": {
    id: "SHP-004", soRef: "SO-2026-040",
    customer: "CV ProShine SBY", address: "Jl. Pemuda No. 789, Surabaya",
    courierType: "SiCepat",
    itemsList: [
      { name: "SCW Polish Compound", qty: 10, weightPerItem: "0.8 kg" },
    ],
    totalWeight: "8 kg", status: "Delivered", createdAt: "2026-05-18",
    resiNumber: "SCP0055667788",
  },
  "SHP-005": {
    id: "SHP-005", soRef: "SO-2026-039",
    customer: "AutoCare Makassar", address: "Jl. A.P. Pettarani No. 12, Makassar",
    courierType: "Internal",
    itemsList: [
      { name: "SCW Snow Foam", qty: 25, weightPerItem: "0.4 kg" },
    ],
    totalWeight: "10 kg", status: "Out for Delivery", createdAt: "2026-05-15",
    resiNumber: "",
  },
  "SHP-006": {
    id: "SHP-006", soRef: "SO-2026-046",
    customer: "GlossUp Bali", address: "Jl. Sunset Road No. 88, Seminyak",
    courierType: "JNE",
    itemsList: [
      { name: "SCW Ceramic Coating", qty: 8, weightPerItem: "0.5 kg" },
      { name: "SCW Spray Wax", qty: 12, weightPerItem: "0.3 kg" },
    ],
    totalWeight: "11 kg", status: "Ready to Ship", createdAt: "2026-06-02",
    resiNumber: "JNE9988776655",
  },
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
  const [copied, setCopied] = useState(false)

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

  const ekspedisiCouriers = ["JNE", "SiCepat", "J&T", "GrabExpress"]
  const isEkspedisi = ekspedisiCouriers.includes(shipment.courierType)

  const st = statusConfig[shipment.status]
  const isReady = shipment.status === "Ready to Ship"
  const isOut = shipment.status === "Out for Delivery"

  const totalItems = shipment.itemsList.reduce((sum, i) => sum + i.qty, 0)

  const handlePickup = () => {
    setShipment((prev) => ({ ...prev, status: "Out for Delivery" as ShipmentStatus }))
  }

  const handleConfirmDelivered = () => {
    setShipment((prev) => ({ ...prev, status: "Delivered" as ShipmentStatus }))
  }

  const handlePrint = () => {
    const printWindow = window.open("", "_blank")
    if (!printWindow) return
    printWindow.document.write(`
      <html>
        <head>
          <title>Resi ${shipment.courierType} - ${shipment.resiNumber}</title>
          <style>
            body { font-family: 'Courier New', monospace; margin: 0; padding: 20px; }
            .label { width: 280px; border: 2px solid #000; padding: 16px; margin: 0 auto; }
            .header { text-align: center; font-weight: bold; font-size: 18px; border-bottom: 2px dashed #000; padding-bottom: 12px; margin-bottom: 12px; }
            .row { display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 6px; }
            .label-bold { font-weight: bold; }
            .barcode { text-align: center; font-size: 32px; letter-spacing: 4px; margin: 16px 0; }
            .resi-number { text-align: center; font-size: 16px; font-weight: bold; letter-spacing: 2px; margin: 8px 0; }
            .footer { text-align: center; font-size: 10px; border-top: 1px solid #ccc; padding-top: 8px; margin-top: 12px; color: #666; }
            hr.dashed { border: none; border-top: 1px dashed #999; margin: 8px 0; }
            @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } .label { border: 2px solid #000; } }
          </style>
        </head>
        <body>
          <div class="label">
            <div class="header">${shipment.courierType.toUpperCase()}</div>
            <div class="resi-number">${shipment.resiNumber}</div>
            <div class="barcode">||||||||||</div>
            <hr class="dashed" />
            <div class="row"><span>Pengirim</span><span class="label-bold">SCW Distribution</span></div>
            <div class="row"><span></span><span>Jl. Industri Raya No. 1, Jakarta</span></div>
            <hr class="dashed" />
            <div class="row"><span>Penerima</span><span class="label-bold">${shipment.customer}</span></div>
            <div class="row"><span></span><span>${shipment.address}</span></div>
            <hr class="dashed" />
            <div class="row"><span>Berat</span><span class="label-bold">${shipment.totalWeight}</span></div>
            <div class="row"><span>Total Item</span><span>${totalItems} pcs</span></div>
            <div class="row"><span>Referensi</span><span>${shipment.soRef}</span></div>
            <div class="footer">SCW Distribution — ${new Date().toLocaleDateString("id-ID")}</div>
          </div>
          <div style="text-align:center;margin-top:20px">
            <button onclick="window.print()" style="padding:10px 30px;font-size:14px;cursor:pointer">Cetak Resi</button>
          </div>
        </body>
      </html>
    `)
    printWindow.document.close()
  }

  const handleCopyResi = () => {
    navigator.clipboard.writeText(shipment.resiNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
        {/* Left — Item List */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Item Shipment
              </CardTitle>
              <CardDescription>{totalItems} item dari {shipment.itemsList.length} produk</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Item</TableHead>
                    <TableHead className="text-center">Qty</TableHead>
                    <TableHead className="text-right">Weight/Item</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shipment.itemsList.map((item, idx) => {
                    const weightNum = parseFloat(item.weightPerItem)
                    const subtotal = isNaN(weightNum) ? 0 : weightNum * item.qty
                    return (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell className="text-center">{item.qty}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{item.weightPerItem}</TableCell>
                        <TableCell className="text-right font-mono text-sm">{subtotal.toFixed(1)} kg</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>

              {/* Summary */}
              <div className="mt-4 rounded-lg border bg-muted/30 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Item</span>
                  <span className="font-bold">{totalItems} pcs</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1">
                  <span className="text-muted-foreground">Total Berat</span>
                  <span className="font-bold">{shipment.totalWeight}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right — Combined Info + Resi + Aksi */}
        <div className="space-y-6">
          {/* Informasi Pengiriman + Resi */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Informasi Pengiriman
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Courier + Status */}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Kurir</span>
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

              {/* Customer */}
              <hr />
              <div>
                <p className="text-xs text-muted-foreground mb-1">Penerima</p>
                <p className="text-sm font-medium">{shipment.customer}</p>
                <div className="flex items-start gap-1.5 mt-1">
                  <MapPin className="h-3.5 w-3.5 mt-0.5 text-muted-foreground shrink-0" />
                  <p className="text-xs text-muted-foreground">{shipment.address}</p>
                </div>
              </div>

              {/* Resi */}
              {shipment.resiNumber && (
                <>
                  <hr />
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">No. Resi</p>
                    <p className="text-lg font-bold font-mono tracking-wider">{shipment.resiNumber}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-1.5" onClick={handleCopyResi}>
                      <Copy className="h-3.5 w-3.5" />
                      {copied ? "Tersalin!" : "Salin"}
                    </Button>
                    {isEkspedisi && (
                      <Button variant="default" size="sm" className="flex-1 gap-1.5" onClick={handlePrint}>
                        <Printer className="h-3.5 w-3.5" />
                        Cetak Resi
                      </Button>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Aksi */}
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
