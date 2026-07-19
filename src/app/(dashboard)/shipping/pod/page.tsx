"use client"

import { useState } from "react"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  FileCheck,
  Upload,
  Camera,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
} from "lucide-react"

interface DeliveryOrder {
  id: string
  soRef: string
  customer: string
  address: string
  courier: string
  status: "Delivered" | "POD Received"
  deliveredDate: string
  podDate: string | null
  podType: string | null
  podNotes: string | null
}

const deliveryOrders: DeliveryOrder[] = [
  { id: "DO-001", soRef: "SO-2026-045", customer: "PT Autogloss Indonesia", address: "Jl. Raya Bekasi No. 123, Jakarta Timur", courier: "JNE", status: "POD Received", deliveredDate: "2026-06-03", podDate: "2026-06-05", podType: "Tanda Tangan Digital", podNotes: "Diterima oleh Budi (warehouse)" },
  { id: "DO-002", soRef: "SO-2026-044", customer: "CV Ceramic Pro JKT", address: "Jl. Kemang Raya No. 45, Jakarta Selatan", courier: "SiCepat", status: "Delivered", deliveredDate: "2026-06-01", podDate: null, podType: null, podNotes: null },
  { id: "DO-003", soRef: "SO-2026-043", customer: "UD Shinemax", address: "Jl. Raya Bandung No. 456, Bandung", courier: "J&T", status: "Delivered", deliveredDate: "2026-05-30", podDate: null, podType: null, podNotes: null },
  { id: "DO-004", soRef: "SO-2026-040", customer: "CV ProShine SBY", address: "Jl. Pemuda No. 789, Surabaya", courier: "SiCepat", status: "POD Received", deliveredDate: "2026-05-20", podDate: "2026-05-22", podType: "Foto Barang", podNotes: "Foto paket di depan gudang customer" },
  { id: "DO-005", soRef: "SO-2026-039", customer: "AutoCare Makassar", address: "Jl. A.P. Pettarani No. 12, Makassar", courier: "Internal", status: "Delivered", deliveredDate: "2026-05-18", podDate: null, podType: null, podNotes: null },
  { id: "DO-006", soRef: "SO-2026-046", customer: "GlossUp Bali", address: "Jl. Sunset Road No. 88, Seminyak", courier: "JNE", status: "Delivered", deliveredDate: "2026-06-04", podDate: null, podType: null, podNotes: null },
]

const podTypes = [
  "Tanda Tangan Digital",
  "Foto Barang",
  "Foto Resi",
  "Screenshot Tracking",
  "Email Konfirmasi",
  "Lainnya",
]

export default function ProofOfDeliveryPage() {
  const router = useRouter()
  const [selectedOrder, setSelectedOrder] = useState<DeliveryOrder | null>(null)
  const [podDialogOpen, setPodDialogOpen] = useState(false)
  const [podType, setPodType] = useState("")
  const [podNotes, setPodNotes] = useState("")
  const [podDate, setPodDate] = useState(() => new Date().toISOString().split("T")[0])

  const pendingPOD = deliveryOrders.filter((o) => o.status === "Delivered" && !o.podDate)
  const completedPOD = deliveryOrders.filter((o) => o.podDate)

  const handleOpenPOD = (order: DeliveryOrder) => {
    setSelectedOrder(order)
    setPodType("")
    setPodNotes("")
    setPodDate(new Date().toISOString().split("T")[0])
    setPodDialogOpen(true)
  }

  const handleSubmitPOD = () => {
    if (!selectedOrder || !podType) return
    alert(`POD untuk ${selectedOrder.id} berhasil diinput!\n\nTanggal: ${podDate}\nJenis: ${podType}\nCatatan: ${podNotes || "-"}`)
    setPodDialogOpen(false)
    setSelectedOrder(null)
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Proof of Delivery (POD)</h1>
        <p className="text-muted-foreground">
          Input dan tracking bukti pengiriman yang diterima dari kurir/customer
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                <AlertCircle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Menunggu POD</p>
                <p className="text-2xl font-bold text-amber-600">{pendingPOD.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">POD Diterima</p>
                <p className="text-2xl font-bold text-emerald-600">{completedPOD.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                <FileCheck className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Delivery</p>
                <p className="text-2xl font-bold">{deliveryOrders.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending POD Table */}
      <Card className="border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-700">
            <Clock className="h-5 w-5" />
            Menunggu Input POD
          </CardTitle>
          <CardDescription>Delivery yang sudah sampai tapi belum ada bukti POD</CardDescription>
        </CardHeader>
        <CardContent>
          {pendingPOD.length === 0 ? (
            <div className="text-center py-8 text-sm text-muted-foreground">
              ✅ Semua delivery sudah ada POD
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>DO Number</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Courier</TableHead>
                  <TableHead>Tanggal Sampai</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingPOD.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="text-xs font-medium text-blue-600">{order.id}</TableCell>
                    <TableCell className="text-sm">{order.customer}</TableCell>
                    <TableCell className="text-sm">{order.courier}</TableCell>
                    <TableCell className="text-sm">{order.deliveredDate}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" onClick={() => handleOpenPOD(order)}>
                        <Upload className="mr-1.5 h-3.5 w-3.5" />
                        Input POD
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Completed POD Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5" />
            POD Diterima
          </CardTitle>
          <CardDescription>Riwayat bukti pengiriman yang sudah diinput</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>DO Number</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Courier</TableHead>
                <TableHead>Tanggal Sampai</TableHead>
                <TableHead>POD Date</TableHead>
                <TableHead>Jenis POD</TableHead>
                <TableHead>Catatan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {completedPOD.map((order) => (
                <TableRow key={order.id} className="cursor-pointer hover:bg-muted/50" onClick={() => router.push(`/shipping/${order.id}`)}>
                  <TableCell className="text-xs font-medium text-blue-600 hover:underline">{order.id}</TableCell>
                  <TableCell className="text-sm">{order.customer}</TableCell>
                  <TableCell className="text-sm">{order.courier}</TableCell>
                  <TableCell className="text-sm">{order.deliveredDate}</TableCell>
                  <TableCell className="text-sm font-medium">{order.podDate}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{order.podType}</Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground max-w-48 truncate">{order.podNotes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Input POD Dialog */}
      <Dialog open={podDialogOpen} onOpenChange={setPodDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Input Proof of Delivery</DialogTitle>
            <DialogDescription>
              {selectedOrder && `${selectedOrder.id} — ${selectedOrder.customer}`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-xs">Tanggal PO Diterima *</Label>
              <Input type="date" value={podDate} onChange={(e) => setPodDate(e.target.value)} className="h-9" />
            </div>
            <div>
              <Label className="text-xs">Jenis Bukti POD *</Label>
              <div className="grid grid-cols-2 gap-2 mt-1.5">
                {podTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setPodType(type)}
                    className={`rounded-lg border p-2 text-xs font-medium text-left transition-all ${
                      podType === type
                        ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-xs">Upload Bukti (Opsional)</Label>
              <div className="mt-1.5 rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-xs text-muted-foreground">Klik atau seret file ke sini</p>
                <p className="text-[10px] text-muted-foreground mt-1">JPG, PNG, PDF (maks 5MB)</p>
              </div>
            </div>
            <div>
              <Label className="text-xs">Catatan</Label>
              <Textarea
                value={podNotes}
                onChange={(e) => setPodNotes(e.target.value)}
                placeholder="Contoh: Diterima oleh Budi di warehouse, barang dalam kondisi baik"
                className="h-16 text-sm"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPodDialogOpen(false)}>Batal</Button>
            <Button onClick={handleSubmitPOD} disabled={!podType}>
              <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
              Simpan POD
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
