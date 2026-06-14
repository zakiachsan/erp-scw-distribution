"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Package,
  ShoppingCart,
  Globe,
  RefreshCw,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { inboundPOSources } from "@/lib/warehouse-store"

type Tujuan = "Sales" | "Webcommerce" | "Return Supplier"

interface LineItem {
  id: string
  productName: string
  sku: string
  qty: number
}

const TUJUAN_OPTIONS: { value: Tujuan; label: string; icon: typeof Package }[] = [
  { value: "Sales", label: "Sales", icon: ShoppingCart },
  { value: "Webcommerce", label: "Webcommerce", icon: Globe },
  { value: "Return Supplier", label: "Return Supplier", icon: RefreshCw },
]

// All unique products from inbound POS
const ALL_PRODUCTS = (() => {
  const seen = new Map<string, { name: string; sku: string; barcode: string }>()
  inboundPOSources.forEach((po) =>
    po.items.forEach((item) => {
      if (!seen.has(item.name)) {
        seen.set(item.name, { name: item.name, sku: item.sku, barcode: item.barcode })
      }
    })
  )
  return Array.from(seen.values())
})()

let lineIdCounter = 0
function nextLineId(): string {
  lineIdCounter++
  return `line-${Date.now()}-${lineIdCounter}`
}

export default function CreateOutbondPage() {
  const router = useRouter()

  const [tujuan, setTujuan] = useState<Tujuan | "">("")
  const [referensi, setReferensi] = useState("")
  const [keterangan, setKeterangan] = useState("")
  const [tanggal, setTanggal] = useState(new Date().toISOString().slice(0, 10))

  const [lineItems, setLineItems] = useState<LineItem[]>([])
  const [addProductOpen, setAddProductOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState("")

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmMessage, setConfirmMessage] = useState("")

  const filteredProducts = ALL_PRODUCTS.filter(
    (p) => !lineItems.some((li) => li.productName === p.name)
  )

  const addLineItem = () => {
    if (!selectedProduct) return
    const prod = ALL_PRODUCTS.find((p) => p.name === selectedProduct)
    if (!prod) return
    setLineItems((prev) => [
      ...prev,
      { id: nextLineId(), productName: prod.name, sku: prod.sku, qty: 1 },
    ])
    setSelectedProduct("")
    setAddProductOpen(false)
  }

  const updateLineQty = (id: string, delta: number) => {
    setLineItems((prev) =>
      prev.map((li) =>
        li.id === id ? { ...li, qty: Math.max(1, li.qty + delta) } : li
      )
    )
  }

  const removeLineItem = (id: string) => {
    setLineItems((prev) => prev.filter((li) => li.id !== id))
  }

  const totalQty = lineItems.reduce((sum, li) => sum + li.qty, 0)

  const handleSubmit = () => {
    if (!tujuan || !referensi.trim() || lineItems.length === 0) {
      setConfirmMessage("Lengkapi semua data: tujuan, referensi, dan minimal 1 produk.")
      setConfirmOpen(true)
      return
    }
    // In real app, save to store/API here
    setConfirmMessage(
      `Berhasil! Outbond ${tujuan} — ${referensi} dicatat. ${lineItems.length} produk (${totalQty} pcs) keluar dari gudang.`
    )
    setConfirmOpen(true)
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon-sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Buat Outbond</h1>
          <p className="text-muted-foreground">
            Catat barang keluar dari gudang — Sales, Webcommerce, atau Return Supplier.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left — Form */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informasi Outbond</CardTitle>
              <CardDescription>
                Tujuan, referensi, dan keterangan pengeluaran barang.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Tujuan</Label>
                  <Select value={tujuan} onValueChange={(v) => setTujuan(v as Tujuan)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tujuan" />
                    </SelectTrigger>
                    <SelectContent>
                      {TUJUAN_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tanggal</Label>
                  <Input
                    type="date"
                    value={tanggal}
                    onChange={(e) => setTanggal(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Referensi</Label>
                <Input
                  value={referensi}
                  onChange={(e) => setReferensi(e.target.value)}
                  placeholder={
                    tujuan === "Sales"
                      ? "Contoh: SO-2026-0102"
                      : tujuan === "Webcommerce"
                      ? "Contoh: TRX-2026-0451"
                      : tujuan === "Return Supplier"
                      ? "Contoh: RET-2026-0003"
                      : "Nomor referensi transaksi"
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Keterangan (opsional)</Label>
                <Input
                  value={keterangan}
                  onChange={(e) => setKeterangan(e.target.value)}
                  placeholder={
                    tujuan === "Return Supplier"
                      ? "Alasan return, misal: barang cacat / kemasan bocor"
                      : "Catatan tambahan"
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Produk</CardTitle>
                <CardDescription>
                  {lineItems.length === 0
                    ? "Belum ada produk. Klik Tambah Produk."
                    : `${lineItems.length} produk, total ${totalQty} pcs`}
                </CardDescription>
              </div>
              <Dialog open={addProductOpen} onOpenChange={setAddProductOpen}>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => { setSelectedProduct(""); setAddProductOpen(true) }}
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Tambah Produk
                </Button>
                <DialogContent className="sm:max-w-sm">
                  <DialogHeader>
                    <DialogTitle>Tambah Produk</DialogTitle>
                    <DialogDescription>Pilih produk yang akan dicatat sebagai barang keluar.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-2">
                    <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih produk" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredProducts.map((p) => (
                          <SelectItem key={p.name} value={p.name}>
                            {p.name} — {p.sku}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setAddProductOpen(false)}>Batal</Button>
                    <Button onClick={addLineItem} disabled={!selectedProduct}>Tambah</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {lineItems.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  Klik &quot;Tambah Produk&quot; untuk memulai.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produk</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead className="text-center">Qty</TableHead>
                        <TableHead className="w-[60px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lineItems.map((li) => (
                        <TableRow key={li.id}>
                          <TableCell className="font-medium">{li.productName}</TableCell>
                          <TableCell><Badge variant="secondary">{li.sku}</Badge></TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                disabled={li.qty <= 1}
                                onClick={() => updateLineQty(li.id, -1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-10 text-center font-sans font-medium">{li.qty}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => updateLineQty(li.id, 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-destructive"
                              onClick={() => removeLineItem(li.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right — Summary & Submit */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ringkasan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Tujuan</span>
                <span className="font-medium">
                  {tujuan ? (
                    <Badge variant="outline" className={
                      tujuan === "Sales" ? "bg-blue-100 text-blue-800" :
                      tujuan === "Webcommerce" ? "bg-purple-100 text-purple-800" :
                      "bg-red-100 text-red-800"
                    }>
                      {tujuan}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Referensi</span>
                <span className="font-medium">{referensi || "—"}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Tanggal</span>
                <span className="font-medium">{tanggal}</span>
              </div>
              <hr />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Jumlah Produk</span>
                <span className="font-bold">{lineItems.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Qty</span>
                <span className="font-bold">{totalQty} pcs</span>
              </div>

              <Button
                size="lg"
                className="w-full gap-2 mt-2"
                onClick={handleSubmit}
                disabled={!tujuan || !referensi.trim() || lineItems.length === 0}
              >
                <CheckCircle className="h-5 w-5" />
                Simpan Outbond
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Confirm Dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {confirmMessage.startsWith("Berhasil") ? "Berhasil" : "Perhatian"}
            </DialogTitle>
            <DialogDescription>{confirmMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => {
                setConfirmOpen(false)
                if (confirmMessage.startsWith("Berhasil")) {
                  router.push("/inventory/outbond")
                }
              }}
            >
              {confirmMessage.startsWith("Berhasil") ? "Kembali" : "Tutup"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
