"use client"

import { useState, Suspense } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
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
  RotateCcw,
  Trash2,
  Plus,
} from "lucide-react"

const formatIDR = (val: number) => `Rp ${val.toLocaleString("id-ID")}`

// ─── Sales Orders (source of returns) ──────────────────────────────────────
interface SOItem {
  name: string
  sku: string
  qty: number
  unitPrice: number
}

interface SalesOrder {
  id: string
  customer: string
  customerAddress: string
  date: string
  items: SOItem[]
}

const salesOrders: SalesOrder[] = [
  {
    id: "SO-2026-045", customer: "PT Autogloss Indonesia", customerAddress: "Jl. Alternatif Cibinong No. 88, Bogor", date: "2026-06-15",
    items: [
      { name: "SCW Snow Foam", sku: "SCW-SF-001", qty: 20, unitPrice: 150000 },
      { name: "SCW Ceramic Coating", sku: "SCW-CC-002", qty: 10, unitPrice: 250000 },
      { name: "SCW Interior Detailer", sku: "SCW-ID-003", qty: 50, unitPrice: 120000 },
      { name: "SCW Tire Gel", sku: "SCW-TG-004", qty: 15, unitPrice: 95000 },
      { name: "SCW Spray Wax", sku: "SCW-SW-008", qty: 25, unitPrice: 110000 },
    ],
  },
  {
    id: "SO-2026-044", customer: "CV Ceramic Pro JKT", customerAddress: "Jl. Panjang No. 12, Jakarta Barat", date: "2026-06-12",
    items: [
      { name: "SCW Ceramic Coating", sku: "SCW-CC-002", qty: 10, unitPrice: 250000 },
      { name: "SCW Glass Cleaner", sku: "SCW-GC-009", qty: 20, unitPrice: 85000 },
      { name: "SCW Polish Compound", sku: "SCW-PC-007", qty: 8, unitPrice: 180000 },
      { name: "SCW Shampoo Plus", sku: "SCW-SP-018", qty: 15, unitPrice: 90000 },
      { name: "SCW All Purpose Cleaner", sku: "SCW-AW-011", qty: 12, unitPrice: 105000 },
    ],
  },
  {
    id: "SO-2026-043", customer: "UD Shinemax", customerAddress: "Jl. Raya Bandung No. 456, Bandung", date: "2026-06-10",
    items: [
      { name: "SCW Snow Foam", sku: "SCW-SF-001", qty: 5, unitPrice: 150000 },
      { name: "SCW Interior Detailer", sku: "SCW-ID-003", qty: 8, unitPrice: 120000 },
      { name: "SCW Tire Gel", sku: "SCW-TG-004", qty: 10, unitPrice: 95000 },
      { name: "SCW Spray Wax", sku: "SCW-SW-008", qty: 12, unitPrice: 110000 },
      { name: "SCW Iron Decontamination", sku: "SCW-IL-017", qty: 6, unitPrice: 135000 },
    ],
  },
  {
    id: "SO-2026-041", customer: "PT Autogloss Indonesia", customerAddress: "Jl. Alternatif Cibinong No. 88, Bogor", date: "2026-06-05",
    items: [
      { name: "SCW Snow Foam", sku: "SCW-SF-001", qty: 10, unitPrice: 150000 },
      { name: "SCW Ceramic Coating", sku: "SCW-CC-002", qty: 5, unitPrice: 250000 },
      { name: "SCW Interior Detailer", sku: "SCW-ID-003", qty: 8, unitPrice: 120000 },
      { name: "SCW Glass Cleaner", sku: "SCW-GC-009", qty: 10, unitPrice: 85000 },
      { name: "SCW Polish Compound", sku: "SCW-PC-007", qty: 4, unitPrice: 180000 },
    ],
  },
  {
    id: "SO-2026-040", customer: "CV ProShine SBY", customerAddress: "Jl. Rungkut Mapan Utara No. 10, Surabaya", date: "2026-06-03",
    items: [
      { name: "SCW Polish Compound", sku: "SCW-PC-007", qty: 5, unitPrice: 180000 },
      { name: "SCW Glass Cleaner", sku: "SCW-GC-009", qty: 10, unitPrice: 85000 },
      { name: "SCW Snow Foam", sku: "SCW-SF-001", qty: 8, unitPrice: 150000 },
      { name: "SCW Spray Wax", sku: "SCW-SW-008", qty: 6, unitPrice: 110000 },
      { name: "SCW Tire Gel", sku: "SCW-TG-004", qty: 10, unitPrice: 95000 },
    ],
  },
  {
    id: "SO-2026-038", customer: "GlossUp Bali", customerAddress: "Jl. Sunset Road No. 88, Seminyak, Bali", date: "2026-05-28",
    items: [
      { name: "SCW Ceramic Coating", sku: "SCW-CC-002", qty: 3, unitPrice: 250000 },
      { name: "SCW Spray Wax", sku: "SCW-SW-008", qty: 5, unitPrice: 110000 },
      { name: "SCW Interior Detailer", sku: "SCW-ID-003", qty: 6, unitPrice: 120000 },
      { name: "SCW Snow Foam", sku: "SCW-SF-001", qty: 4, unitPrice: 150000 },
      { name: "SCW All Purpose Cleaner", sku: "SCW-AW-011", qty: 8, unitPrice: 105000 },
    ],
  },
]

// ─── Return Item Interface ─────────────────────────────────────────────────
interface ReturnItem {
  productIndex: number
  qty: number
  condition: "Good" | "Damaged" | "Defective"
}

const reasons = [
  "Barang cacat",
  "Rusak saat pengiriman",
  "Salah kirim",
  "Tidak sesuai pesanan",
  "Kualitas tidak sesuai",
  "Lainnya",
]

function CreateReturnForm() {
  const router = useRouter()

  const [soId, setSoId] = useState("")
  const [items, setItems] = useState<ReturnItem[]>([])
  const [reason, setReason] = useState("")
  const [customReason, setCustomReason] = useState("")
  const [notes, setNotes] = useState("")
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null)

  const selectedSO = salesOrders.find((so) => so.id === soId)

  // When SO is selected, auto-populate items with qty=0 (user picks which to return)
  const handleSOChange = (id: string) => {
    setSoId(id)
    const so = salesOrders.find((s) => s.id === id)
    if (so) {
      setItems(so.items.map((_, idx) => ({ productIndex: idx, qty: 0, condition: "Damaged" as const })))
    }
  }

  const updateItem = (index: number, field: keyof ReturnItem, value: string | number) => {
    const updated = [...items]
    if (field === "qty") {
      const maxQty = selectedSO?.items[updated[index].productIndex]?.qty || 1
      updated[index] = { ...updated[index], qty: Math.min(Math.max(0, Number(value)), maxQty) }
    } else if (field === "condition") {
      updated[index] = { ...updated[index], condition: value as ReturnItem["condition"] }
    }
    setItems(updated)
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const activeItems = items.filter((i) => i.qty > 0)

  const totalValue = activeItems.reduce((sum, item) => {
    if (!selectedSO) return sum
    const product = selectedSO.items[item.productIndex]
    return sum + (product ? product.unitPrice * item.qty : 0)
  }, 0)

  const totalQty = activeItems.reduce((sum, i) => sum + i.qty, 0)

  const handleSubmit = () => {
    if (!soId || activeItems.length === 0) return
    const rtnNum = `RTN-2026-${String(Math.floor(Math.random() * 900) + 100).padStart(3, "0")}`
    const finalReason = reason === "Lainnya" ? customReason : reason
    alert(
      `Retur ${rtnNum} berhasil dibuat!\n\n` +
      `SO Ref: ${soId}\n` +
      `Customer: ${selectedSO?.customer}\n` +
      `Alasan: ${finalReason}\n` +
      `Item: ${activeItems.length} produk\n` +
      `Total Nilai: ${formatIDR(totalValue)}`
    )
    router.push("/customer-returns")
  }

  const isFormValid = soId && reason && (reason !== "Lainnya" || customReason) && activeItems.length > 0

  return (
    <div className="space-y-4 p-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/customer-returns" className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-lg font-bold text-gray-900">Buat Retur Customer</h1>
          <p className="text-xs text-gray-500">Daftarkan retur barang dari customer</p>
        </div>
      </div>

      {/* Row 1: SO Selection + Return Info */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* SO Reference */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Referensi Sales Order</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-xs">SO Reference *</Label>
              <Select value={soId} onValueChange={handleSOChange}>
                <SelectTrigger className="h-9 w-full">
                  <SelectValue placeholder="Pilih Sales Order" />
                </SelectTrigger>
                <SelectContent className="min-w-[400px]">
                  {salesOrders.map((so) => (
                    <SelectItem key={so.id} value={so.id}>
                      {so.id} — {so.customer} ({so.items.length} produk)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {selectedSO && (
              <div className="rounded-lg bg-slate-50 p-3 text-xs space-y-1.5">
                <div className="font-medium text-slate-700">{selectedSO.customer}</div>
                <div className="text-muted-foreground">{selectedSO.customerAddress}</div>
                <div className="flex justify-between pt-1 border-t">
                  <span>SO Date</span>
                  <span>{selectedSO.date}</span>
                </div>
                <div className="flex justify-between">
                  <span>Items in SO</span>
                  <span>{selectedSO.items.length} produk</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Return Info */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Info Retur</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-xs">Alasan Retur *</Label>
              <Select value={reason} onValueChange={setReason}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Pilih alasan retur" />
                </SelectTrigger>
                <SelectContent>
                  {reasons.map((r) => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {reason === "Lainnya" && (
              <div>
                <Label className="text-xs">Alasan Lainnya *</Label>
                <Input
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  placeholder="Masukkan alasan retur..."
                  className="h-9"
                />
              </div>
            )}
            <div>
              <Label className="text-xs">Catatan</Label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Catatan tambahan mengenai retur..."
                className="h-16 text-sm"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Items to Return */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-semibold">Barang yang Akan Diretur</CardTitle>
              {selectedSO && (
                <p className="text-[10px] text-muted-foreground mt-1">
                  Atur Qty Retur {">"} 0 untuk produk yang ingin diretur dari SO {selectedSO.id}
                </p>
              )}
            </div>
            {activeItems.length > 0 && (
              <Badge variant="outline" className="text-[10px]">
                {activeItems.length} produk dipilih
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {!selectedSO ? (
            <div className="py-10 text-center text-sm text-muted-foreground">
              Pilih Sales Order terlebih dahulu untuk memilih barang yang akan diretur
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead className="min-w-[200px]">Produk</TableHead>
                    <TableHead className="w-28">SKU</TableHead>
                    <TableHead className="text-center w-20">Qty di SO</TableHead>
                    <TableHead className="w-24">Qty Retur</TableHead>
                    <TableHead className="w-32">Kondisi</TableHead>
                    <TableHead className="text-right w-28">Harga</TableHead>
                    <TableHead className="text-right w-28">Subtotal</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item, idx) => {
                    const product = selectedSO.items[item.productIndex]
                    const subtotal = product ? product.unitPrice * item.qty : 0
                    const isReturning = item.qty > 0
                    return (
                      <TableRow key={idx} className={isReturning ? "bg-blue-50/50" : ""}>
                        <TableCell className="text-xs text-muted-foreground">{idx + 1}</TableCell>
                        <TableCell>
                          <span className="text-sm font-medium">{product?.name}</span>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">{product?.sku}</TableCell>
                        <TableCell className="text-sm text-center">{product?.qty}</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={item.qty}
                            onChange={(e) => updateItem(idx, "qty", e.target.value)}
                            className={`h-8 text-xs w-16 ${isReturning ? "border-blue-300 font-medium" : ""}`}
                            min={0}
                            max={product?.qty || 1}
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            value={item.condition}
                            onValueChange={(val) => updateItem(idx, "condition", val)}
                            disabled={!isReturning}
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Good">Good</SelectItem>
                              <SelectItem value="Damaged">Damaged</SelectItem>
                              <SelectItem value="Defective">Defective</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-sm text-right">{formatIDR(product?.unitPrice || 0)}</TableCell>
                        <TableCell className="text-sm text-right font-medium">
                          {isReturning ? formatIDR(subtotal) : "-"}
                        </TableCell>
                        <TableCell>
                          <button
                            onClick={() => setDeleteIdx(idx)}
                            className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-600"
                            title="Hapus dari daftar retur"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary & Submit */}
      <div className="flex gap-4 justify-between items-start">
        <div className="flex gap-2">
          <Link href="/customer-returns">
            <Button variant="outline" size="sm">Batal</Button>
          </Link>
        </div>

        <Card className="w-80">
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Jumlah Item Diretur</span>
              <span>{activeItems.length} produk</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Qty Retur</span>
              <span>{totalQty} pcs</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-semibold text-base">
              <span>Total Nilai Retur</span>
              <span className="text-blue-600">{formatIDR(totalValue)}</span>
            </div>
            <Button className="w-full mt-2" size="sm" onClick={handleSubmit} disabled={!isFormValid}>
              <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
              Buat Retur
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteIdx !== null} onOpenChange={(open) => { if (!open) setDeleteIdx(null) }}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Hapus Produk?</DialogTitle>
            <DialogDescription>
              {deleteIdx !== null && selectedSO && (
                <>
                  <span className="font-medium text-foreground">{selectedSO.items[items[deleteIdx]?.productIndex]?.name}</span>{" "}
                  akan dihapus dari daftar retur.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setDeleteIdx(null)}>Batal</Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => {
                if (deleteIdx !== null) {
                  removeItem(deleteIdx)
                  setDeleteIdx(null)
                }
              }}
            >
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function CreateReturnPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-muted-foreground">Loading...</div>}>
      <CreateReturnForm />
    </Suspense>
  )
}
