"use client"

import { useState, use } from "react"
import { useRouter } from "next/navigation"
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
  FileCheck,
  Download,
  Upload,
} from "lucide-react"

type DeliveryStatus = "Ready to Ship" | "Out for Delivery" | "Delivered" | "POD Received"

interface DeliveryItem {
  name: string
  qty: number
  weightPerItem: string
}

interface DeliveryOrderDetail {
  id: string
  soRef: string
  customer: string
  address: string
  courierType: string
  itemsList: DeliveryItem[]
  totalWeight: string
  status: DeliveryStatus
  createdAt: string
  resiNumber: string
  podDate: string | null
  podType: string | null
  podNotes: string | null
}

const statusConfig: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
  "Ready to Ship": { label: "Ready to Ship", className: "bg-blue-100 text-blue-800", icon: <Package className="h-3 w-3" /> },
  "Out for Delivery": { label: "Out for Delivery", className: "bg-amber-100 text-amber-800", icon: <Truck className="h-3 w-3" /> },
  "Delivered": { label: "Delivered", className: "bg-violet-100 text-violet-800", icon: <CheckCircle2 className="h-3 w-3" /> },
  "POD Received": { label: "POD Received", className: "bg-emerald-100 text-emerald-800", icon: <FileCheck className="h-3 w-3" /> },
}

const ALL_DELIVERIES: Record<string, DeliveryOrderDetail> = {
  "DO-001": {
    id: "DO-001", soRef: "SO-2026-045", customer: "PT Autogloss Indonesia",
    address: "Jl. Raya Bekasi No. 123, Jakarta Timur", courierType: "JNE",
    itemsList: [
      { name: "SCW Snow Foam", qty: 20, weightPerItem: "0.5 kg" },
      { name: "SCW Ceramic Coating", qty: 10, weightPerItem: "0.5 kg" },
    ],
    totalWeight: "15 kg", status: "POD Received", createdAt: "2026-06-01",
    resiNumber: "JNE1234567890", podDate: "2026-06-05", podType: "Tanda Tangan Digital", podNotes: "Diterima oleh Budi (warehouse)",
  },
  "DO-002": {
    id: "DO-002", soRef: "SO-2026-044", customer: "CV Ceramic Pro JKT",
    address: "Jl. Kemang Raya No. 45, Jakarta Selatan", courierType: "SiCepat",
    itemsList: [
      { name: "SCW Interior Detailer", qty: 15, weightPerItem: "0.4 kg" },
      { name: "SCW Tire Gel", qty: 25, weightPerItem: "0.3 kg" },
    ],
    totalWeight: "12 kg", status: "Delivered", createdAt: "2026-05-30",
    resiNumber: "SCP0098765432", podDate: null, podType: null, podNotes: null,
  },
  "DO-003": {
    id: "DO-003", soRef: "SO-2026-043", customer: "UD Shinemax",
    address: "Jl. Raya Bandung No. 456, Bandung", courierType: "J&T",
    itemsList: [
      { name: "SCW Spray Wax", qty: 30, weightPerItem: "0.3 kg" },
      { name: "SCW Glass Cleaner", qty: 20, weightPerItem: "0.4 kg" },
    ],
    totalWeight: "18 kg", status: "Out for Delivery", createdAt: "2026-05-28",
    resiNumber: "JTX1122334455", podDate: null, podType: null, podNotes: null,
  },
  "DO-004": {
    id: "DO-004", soRef: "SO-2026-040", customer: "CV ProShine SBY",
    address: "Jl. Pemuda No. 789, Surabaya", courierType: "SiCepat",
    itemsList: [
      { name: "SCW Polish Compound", qty: 10, weightPerItem: "0.8 kg" },
    ],
    totalWeight: "8 kg", status: "POD Received", createdAt: "2026-05-18",
    resiNumber: "SCP5566778899", podDate: "2026-05-22", podType: "Foto Barang", podNotes: "Foto paket di depan gudang customer",
  },
  "DO-005": {
    id: "DO-005", soRef: "SO-2026-039", customer: "AutoCare Makassar",
    address: "Jl. A.P. Pettarani No. 12, Makassar", courierType: "Internal",
    itemsList: [
      { name: "SCW Snow Foam", qty: 25, weightPerItem: "0.5 kg" },
    ],
    totalWeight: "10 kg", status: "Delivered", createdAt: "2026-05-15",
    resiNumber: "INT-2026-0088", podDate: null, podType: null, podNotes: null,
  },
  "DO-006": {
    id: "DO-006", soRef: "SO-2026-046", customer: "GlossUp Bali",
    address: "Jl. Sunset Road No. 88, Seminyak", courierType: "JNE",
    itemsList: [
      { name: "SCW Ceramic Coating", qty: 8, weightPerItem: "0.5 kg" },
      { name: "SCW Spray Wax", qty: 12, weightPerItem: "0.3 kg" },
    ],
    totalWeight: "11 kg", status: "Delivered", createdAt: "2026-06-02",
    resiNumber: "JNE9988776655", podDate: null, podType: null, podNotes: null,
  },
}

const flowSteps = [
  { key: "Ready to Ship", label: "Ready", desc: "Paket siap dikirim" },
  { key: "Out for Delivery", label: "In Transit", desc: "Paket dalam perjalanan" },
  { key: "Delivered", label: "Delivered", desc: "Paket sampai tujuan" },
  { key: "POD Received", label: "POD Received", desc: "Bukti diterima & terekam" },
]

export default function DeliveryOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const [status, setStatus] = useState<DeliveryStatus>(() => {
    const data = ALL_DELIVERIES[id]
    return data?.status || "Ready to Ship"
  })

  const data = ALL_DELIVERIES[id] || {
    id, soRef: "SO-2026-045", customer: "PT Autogloss Indonesia",
    address: "Jl. Raya Bekasi No. 123, Jakarta Timur", courierType: "JNE",
    itemsList: [
      { name: "SCW Snow Foam", qty: 20, weightPerItem: "0.5 kg" },
      { name: "SCW Ceramic Coating", qty: 10, weightPerItem: "0.5 kg" },
    ],
    totalWeight: "15 kg", status: "Ready to Ship" as DeliveryStatus, createdAt: "2026-06-01",
    resiNumber: "JNE1234567890", podDate: null, podType: null, podNotes: null,
  }

  const currentStepIndex = flowSteps.findIndex((s) => s.key === status)

  return (
    <div className="space-y-4 p-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/shipping" className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-gray-900">{data.id}</h1>
              <Badge className={`${statusConfig[status].className} flex items-center gap-1`}>
                {statusConfig[status].icon}
                {statusConfig[status].label}
              </Badge>
            </div>
            <p className="text-xs text-gray-500">
              dari <Link href={`/sales/orders/${data.soRef}`} className="text-blue-600 hover:underline">{data.soRef}</Link>
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="mr-1.5 h-3.5 w-3.5" />
            Print
          </Button>
          <Button variant="outline" size="sm" onClick={() => alert("PDF berhasil didownload!")}>
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Flow Steps */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-1">
            {flowSteps.map((step, idx) => {
              const isCompleted = idx < currentStepIndex
              const isCurrent = idx === currentStepIndex
              return (
                <div key={step.key} className="flex items-center flex-1">
                  <div className={`flex flex-col items-center gap-1 flex-1 ${isCompleted ? "text-emerald-600" : isCurrent ? "text-blue-600" : "text-gray-400"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${isCompleted ? "bg-emerald-100 text-emerald-600" : isCurrent ? "bg-blue-100 text-blue-600 ring-2 ring-blue-300" : "bg-gray-100 text-gray-400"}`}>
                      {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
                    </div>
                    <span className="text-[10px] font-medium text-center leading-tight">{step.label}</span>
                  </div>
                  {idx < flowSteps.length - 1 && (
                    <div className={`h-0.5 w-8 ${idx < currentStepIndex ? "bg-emerald-300" : "bg-gray-200"}`} />
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Info Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Delivery Info */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Info Pengiriman
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Kurir</span>
              <Badge variant="outline">{data.courierType}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">No. Resi</span>
              <span className="font-mono text-xs">{data.resiNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tanggal Kirim</span>
              <span>{data.createdAt}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Berat</span>
              <span>{data.totalWeight}</span>
            </div>
          </CardContent>
        </Card>

        {/* Customer / Address */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Alamat Tujuan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="font-medium">{data.customer}</div>
            <div className="text-muted-foreground text-xs leading-relaxed">{data.address}</div>
          </CardContent>
        </Card>
      </div>

      {/* POD Section */}
      <Card className={data.podDate ? "border-emerald-200" : "border-amber-200"}>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            Proof of Delivery (POD)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data.podDate ? (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge className="bg-emerald-100 text-emerald-800">POD Diterima</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tanggal PO Diterima</span>
                <span className="font-medium">{data.podDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Jenis Bukti</span>
                <Badge variant="outline">{data.podType}</Badge>
              </div>
              {data.podNotes && (
                <div className="mt-2 rounded-lg bg-slate-50 p-3 text-xs">
                  <span className="text-muted-foreground">Catatan: </span>{data.podNotes}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-4">
              <FileCheck className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Belum ada POD</p>
              <p className="text-xs text-muted-foreground mt-1">Input POD di halaman <Link href="/shipping/pod" className="text-blue-600 hover:underline">Proof of Delivery</Link></p>
              {status === "Delivered" && (
                <Button size="sm" className="mt-3" onClick={() => router.push("/shipping/pod")}>
                  <Upload className="mr-1.5 h-3.5 w-3.5" />
                  Input POD Sekarang
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Items Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Rincian Barang</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Nama Barang</TableHead>
                  <TableHead className="text-center">Qty</TableHead>
                  <TableHead className="text-right">Berat/Item</TableHead>
                  <TableHead className="text-right">Total Berat</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.itemsList.map((item, idx) => {
                  const totalWeightPerItem = parseFloat(item.weightPerItem) * item.qty
                  return (
                    <TableRow key={idx}>
                      <TableCell className="text-xs text-muted-foreground">{idx + 1}</TableCell>
                      <TableCell className="text-sm font-medium">{item.name}</TableCell>
                      <TableCell className="text-sm text-center">{item.qty}</TableCell>
                      <TableCell className="text-sm text-right text-muted-foreground">{item.weightPerItem}</TableCell>
                      <TableCell className="text-sm text-right">{totalWeightPerItem.toFixed(1)} kg</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
