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
  CheckCircle2,
  Package,
  ShoppingCart,
  Globe,
  RefreshCw,
  ClipboardList,
} from "lucide-react"

type OutbondStatus = "New" | "Picking" | "Picked"

const statusConfig: Record<string, { label: string; className: string }> = {
  New: { label: "New", className: "bg-blue-100 text-blue-800" },
  Picking: { label: "Picking", className: "bg-amber-100 text-amber-800" },
  Picked: { label: "Picked", className: "bg-emerald-100 text-emerald-800" },
}

// Mock data — in real app this comes from store/API
const ALL_DATA: Record<string, {
  id: string; tanggal: string; produk: string; sku: string; qty: number;
  tujuan: string; referensi: string; keterangan: string; status: OutbondStatus
}> = {
  "out-001": { id: "out-001", tanggal: "2026-06-14", produk: "SCW Snow Foam", sku: "SCW-SF-001", qty: 5, tujuan: "Sales", referensi: "SO-2026-0102", keterangan: "Pesanan customer atas nama Budi", status: "New" },
  "out-002": { id: "out-002", tanggal: "2026-06-13", produk: "SCW Ceramic Coating", sku: "SCW-CC-002", qty: 3, tujuan: "Webcommerce", referensi: "TRX-2026-0451", keterangan: "Pembelian via website SCW Store", status: "Picking" },
  "out-003": { id: "out-003", tanggal: "2026-06-13", produk: "SCW Microfiber Towel", sku: "SCW-MF-015", qty: 10, tujuan: "Sales", referensi: "SO-2026-0099", keterangan: "Pesanan customer atas nama Sari", status: "Picked" },
  "out-004": { id: "out-004", tanggal: "2026-06-12", produk: "SCW Spray Wax", sku: "SCW-SW-008", qty: 2, tujuan: "Return Supplier", referensi: "RET-2026-0003", keterangan: "Kemasan bocor, dikembalikan ke ChemPro Asia", status: "New" },
  "out-005": { id: "out-005", tanggal: "2026-06-12", produk: "SCW Tire Gel", sku: "SCW-TG-004", qty: 8, tujuan: "Webcommerce", referensi: "TRX-2026-0448", keterangan: "Pembelian via website SCW Store", status: "Picking" },
  "out-006": { id: "out-006", tanggal: "2026-06-11", produk: "SCW Glass Cleaner", sku: "SCW-GC-009", qty: 15, tujuan: "Sales", referensi: "SO-2026-0095", keterangan: "Pesanan customer atas nama Dewi", status: "Picked" },
  "out-007": { id: "out-007", tanggal: "2026-06-10", produk: "SCW Polish Compound", sku: "SCW-PC-007", qty: 1, tujuan: "Return Supplier", referensi: "RET-2026-0002", keterangan: "Produk cacat, dikembalikan ke PT Autocare Indonesia", status: "New" },
  "out-008": { id: "out-008", tanggal: "2026-06-09", produk: "SCW Snow Foam", sku: "SCW-SF-001", qty: 12, tujuan: "Webcommerce", referensi: "TRX-2026-0435", keterangan: "Pembelian via website SCW Store", status: "New" },
}

export default function OutbondDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [data, setData] = useState(() => ALL_DATA[params.id])
  const [scanInput, setScanInput] = useState("")
  const [pickedQty, setPickedQty] = useState(
    data?.status === "Picked" ? data.qty : 0
  )

  const item = data

  if (!item) {
    return (
      <div className="p-6">
        <Button variant="ghost" size="icon-sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <p className="mt-4 text-muted-foreground">Outbond tidak ditemukan.</p>
      </div>
    )
  }

  const tujuanIcons: Record<string, typeof Package> = {
    Sales: ShoppingCart,
    Webcommerce: Globe,
    "Return Supplier": RefreshCw,
  }
  const TujuanIcon = tujuanIcons[item.tujuan] ?? Package

  const isPicking = item.status === "New" || item.status === "Picking"
  const isComplete = pickedQty >= item.qty

  const handleStartPicking = () => {
    setData((prev) => ({ ...prev, status: "Picking" as OutbondStatus }))
  }

  const handleScanPick = () => {
    if (!scanInput.trim() || !isPicking) return
    // Simulate scan — increment picked
    setPickedQty((prev) => Math.min(item.qty, prev + 1))
    setScanInput("")
  }

  const handleCompletePicking = () => {
    setData((prev) => ({ ...prev, status: "Picked" as OutbondStatus }))
  }

  const st = statusConfig[item.status]

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon-sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{item.id}</h1>
          <p className="text-muted-foreground">{item.referensi}</p>
        </div>
        <Badge variant="outline" className={st.className}>{st.label}</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left — Detail Info */}
        <div className="space-y-6 lg:col-span-2">
          {/* Item Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                Item Outbond
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produk</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead className="text-center">Qty</TableHead>
                    <TableHead className="text-center">Picked</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">{item.produk}</TableCell>
                    <TableCell><Badge variant="secondary">{item.sku}</Badge></TableCell>
                    <TableCell className="text-center font-bold">{item.qty}</TableCell>
                    <TableCell className="text-center">
                      <span className={`font-bold ${pickedQty >= item.qty ? "text-emerald-600" : "text-amber-600"}`}>
                        {pickedQty}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      {pickedQty >= item.qty ? (
                        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Complete
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-amber-100 text-amber-800">
                          {item.qty - pickedQty} left
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Scan Section (only when picking in progress) */}
          {item.status !== "Picked" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Scan Barcode</CardTitle>
                <CardDescription>
                  Scan barcode produk untuk menandai item yang sudah diambil.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Scan atau ketik barcode..."
                    value={scanInput}
                    onChange={(e) => setScanInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleScanPick() }}
                  />
                  <Button onClick={handleScanPick} disabled={!scanInput.trim() || pickedQty >= item.qty}>
                    Pick
                  </Button>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full transition-all"
                    style={{ width: `${(pickedQty / item.qty) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  {pickedQty} / {item.qty} item dipick
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right — Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informasi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tujuan</span>
                <Badge variant="outline" className={item.tujuan === "Sales" ? "bg-blue-100 text-blue-800" : item.tujuan === "Webcommerce" ? "bg-purple-100 text-purple-800" : "bg-red-100 text-red-800"}>
                  <TujuanIcon className="mr-1 h-3 w-3" />
                  {item.tujuan}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Referensi</span>
                <span className="font-medium">{item.referensi}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tanggal</span>
                <span>{item.tanggal}</span>
              </div>
              {item.keterangan && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Keterangan</span>
                  <span className="text-right max-w-[180px]">{item.keterangan}</span>
                </div>
              )}
              <hr />
              <div className="flex justify-between text-sm">
                <span className="font-medium">Status</span>
                <Badge variant="outline" className={st.className}>{st.label}</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress Picking</span>
                <span className="font-bold">{pickedQty} / {item.qty}</span>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Aksi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {item.status === "New" && (
                <Button className="w-full gap-2" onClick={handleStartPicking}>
                  <ClipboardList className="h-4 w-4" />
                  Mulai Picking
                </Button>
              )}
              {item.status === "Picking" && (
                <>
                  <Button
                    className="w-full gap-2"
                    disabled={!isComplete}
                    onClick={handleCompletePicking}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    {isComplete ? "Selesaikan Picking" : `Pick ${item.qty - pickedQty} lagi`}
                  </Button>
                  {isComplete && (
                    <p className="text-xs text-center text-emerald-600">
                      Semua item sudah dipick. Klik &quot;Selesaikan Picking&quot; untuk lanjut.
                    </p>
                  )}
                </>
              )}
              {item.status === "Picked" && (
                <div className="text-center text-sm text-muted-foreground py-2">
                  ✅ Picking selesai. Barang siap masuk ke proses packing.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
