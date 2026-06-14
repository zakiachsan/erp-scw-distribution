"use client"

import { useState, useMemo } from "react"
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
  Separator,
} from "@/components/ui/separator"
import {
  Search,
  Plus,
  Trash2,
  Calculator,
  ShoppingCart,
  Users,
  Truck,
  BadgePercent,
  ClipboardCheck,
  Package,
  UserCircle,
} from "lucide-react"
import { customers } from "@/lib/sales-data"

// ── Tier Config ─────────────────────────────────────────────────────────────
const TIER_DISCOUNT: Record<string, number> = {
  Bronze: 5,
  Silver: 7,
  Gold: 10,
  Platinum: 12,
}

const tierColors: Record<string, string> = {
  Bronze: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  Silver: "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300",
  Gold: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  Platinum: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
}

// ── Products (from master product list, with assumed base prices) ──────────
interface Product {
  id: string
  sku: string
  name: string
  category: string
  unit: string
  basePrice: number  // harga dasar
  weight: string
  stockQty: number
}

const products: Product[] = [
  { id: "1", sku: "SCW-SF-001", name: "SCW Snow Foam", category: "Exterior", unit: "pcs", basePrice: 45000, weight: "0.5 kg", stockQty: 245 },
  { id: "2", sku: "SCW-CC-002", name: "SCW Ceramic Coating", category: "Coating", unit: "pcs", basePrice: 185000, weight: "0.5 kg", stockQty: 12 },
  { id: "3", sku: "SCW-ID-003", name: "SCW Interior Detailer", category: "Interior", unit: "pcs", basePrice: 55000, weight: "0.4 kg", stockQty: 180 },
  { id: "4", sku: "SCW-TG-004", name: "SCW Tire Gel", category: "Exterior", unit: "pcs", basePrice: 42000, weight: "0.3 kg", stockQty: 95 },
  { id: "5", sku: "SCW-CB-005", name: "SCW Clay Bar", category: "Prep", unit: "pcs", basePrice: 35000, weight: "0.1 kg", stockQty: 0 },
  { id: "6", sku: "SCW-MW-006", name: "SCW Microfiber Wash", category: "Wash", unit: "pcs", basePrice: 38000, weight: "0.3 kg", stockQty: 312 },
  { id: "7", sku: "SCW-PC-007", name: "SCW Polish Compound", category: "Correction", unit: "pcs", basePrice: 95000, weight: "0.8 kg", stockQty: 8 },
  { id: "8", sku: "SCW-SW-008", name: "SCW Spray Wax", category: "Protection", unit: "pcs", basePrice: 52000, weight: "0.3 kg", stockQty: 156 },
  { id: "9", sku: "SCW-GC-009", name: "SCW Glass Cleaner", category: "Interior", unit: "pcs", basePrice: 32000, weight: "0.4 kg", stockQty: 200 },
  { id: "10", sku: "SCW-LC-010", name: "SCW Leather Conditioner", category: "Interior", unit: "pcs", basePrice: 68000, weight: "0.3 kg", stockQty: 45 },
  { id: "11", sku: "SCW-AW-011", name: "SCW All Purpose Cleaner", category: "Wash", unit: "pcs", basePrice: 36000, weight: "0.5 kg", stockQty: 5 },
  { id: "12", sku: "SCW-TR-012", name: "SCW Trim Restorer", category: "Exterior", unit: "pcs", basePrice: 58000, weight: "0.3 kg", stockQty: 67 },
  { id: "13", sku: "SCW-BR-013", name: "SCW Brake Dust Remover", category: "Wheel", unit: "pcs", basePrice: 48000, weight: "0.6 kg", stockQty: 0 },
  { id: "14", sku: "SCW-FP-014", name: "SCW Foam Pad", category: "Tools", unit: "pcs", basePrice: 22000, weight: "0.05 kg", stockQty: 88 },
  { id: "15", sku: "SCW-MF-015", name: "SCW Microfiber Towel", category: "Tools", unit: "pcs", basePrice: 15000, weight: "0.05 kg", stockQty: 520 },
  { id: "16", sku: "SCW-DC-016", name: "SCW Dashboard Coating", category: "Interior", unit: "pcs", basePrice: 75000, weight: "0.3 kg", stockQty: 33 },
  { id: "17", sku: "SCW-IL-017", name: "SCW Iron Decontamination", category: "Decon", unit: "pcs", basePrice: 88000, weight: "0.5 kg", stockQty: 14 },
  { id: "18", sku: "SCW-SP-018", name: "SCW Shampoo Plus", category: "Wash", unit: "pcs", basePrice: 40000, weight: "0.5 kg", stockQty: 275 },
]

// ── Line Item ───────────────────────────────────────────────────────────────
interface LineItem {
  id: string
  productId: string
  productName: string
  basePrice: number
  qty: number
}

let lineItemCounter = 0
function nextLineId() {
  lineItemCounter += 1
  return `line-${lineItemCounter}`
}

// ── Helpers ─────────────────────────────────────────────────────────────────
function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", { minimumFractionDigits: 0 }).format(n)
}

function calculateShipping(subtotal: number): number {
  if (subtotal >= 500000) return 0
  if (subtotal >= 200000) return 15000
  return 25000
}

// ═════════════════════════════════════════════════════════════════════════════
export default function EstimasiHargaPage() {
  const [selectedCustomerId, setSelectedCustomerId] = useState("")
  const [lineItems, setLineItems] = useState<LineItem[]>([])
  const [productSearch, setProductSearch] = useState("")
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [savedEstimations, setSavedEstimations] = useState<
    { customer: string; total: number; date: string }[]
  >([])

  // ── Selected customer ───────────────────────────────────────────────
  const selectedCustomer = useMemo(
    () => customers.find((c) => c.id === selectedCustomerId) ?? null,
    [selectedCustomerId]
  )

  const discountPercent = selectedCustomer
    ? TIER_DISCOUNT[selectedCustomer.tier] ?? 0
    : 0

  // ── Filtered products for add-product dropdown ──────────────────────
  const filteredAddProducts = useMemo(
    () =>
      products.filter(
        (p) =>
          !lineItems.some((li) => li.productId === p.id) &&
          (p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
            p.sku.toLowerCase().includes(productSearch.toLowerCase()))
      ),
    [lineItems, productSearch]
  )

  // ── Add line item ───────────────────────────────────────────────────
  const addLineItem = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    if (!product) return
    setLineItems((prev) => [
      ...prev,
      {
        id: nextLineId(),
        productId: product.id,
        productName: product.name,
        basePrice: product.basePrice,
        qty: 1,
      },
    ])
    setShowAddProduct(false)
    setProductSearch("")
  }

  const removeLineItem = (lineId: string) => {
    setLineItems((prev) => prev.filter((li) => li.id !== lineId))
  }

  const updateLineQty = (lineId: string, qty: number) => {
    if (qty < 0) qty = 0
    setLineItems((prev) =>
      prev.map((li) => (li.id === lineId ? { ...li, qty } : li))
    )
  }

  // ── Calculations ────────────────────────────────────────────────────
  const calculations = useMemo(() => {
    const subtotal = lineItems.reduce(
      (sum, li) => sum + li.basePrice * li.qty,
      0
    )
    const discountAmount = Math.round((subtotal * discountPercent) / 100)
    const afterDiscount = subtotal - discountAmount
    const shippingCost = calculateShipping(afterDiscount)
    const grandTotal = afterDiscount + shippingCost
    return { subtotal, discountAmount, afterDiscount, shippingCost, grandTotal }
  }, [lineItems, discountPercent])

  // ── Save estimation ─────────────────────────────────────────────────
  const saveEstimation = () => {
    if (!selectedCustomer) {
      alert("Silakan pilih customer terlebih dahulu.")
      return
    }
    if (lineItems.length === 0) {
      alert("Silakan tambahkan minimal satu produk.")
      return
    }
    const entry = {
      customer: selectedCustomer.name,
      total: calculations.grandTotal,
      date: new Date().toLocaleString("id-ID"),
    }
    setSavedEstimations((prev) => [entry, ...prev])
    alert(
      `Estimasi berhasil dibuat untuk ${selectedCustomer.name}!
Total: Rp ${formatRupiah(calculations.grandTotal)}`
    )
  }

  // ── Reset ───────────────────────────────────────────────────────────
  const resetForm = () => {
    setSelectedCustomerId("")
    setLineItems([])
  }

  // ═════════════════════════════════════════════════════════════════════
  // RENDER
  // ═════════════════════════════════════════════════════════════════════
  return (
    <div className="space-y-6 p-6">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl  tracking-tight">
            Estimasi Harga Real-Time
          </h1>
          <p className="text-muted-foreground">
            Kalkulasi harga jual dengan diskon tier customer dan estimasi ongkos kirim
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetForm}>
            Reset
          </Button>
          <Button onClick={saveEstimation} disabled={!selectedCustomer || lineItems.length === 0}>
            <ClipboardCheck className="mr-2 h-4 w-4" />
            Buat Estimasi
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ══════════════════════════════════════════════════════════════ */}
        {/* LEFT COLUMN — Customer & Product Selection                    */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <div className="space-y-6 lg:col-span-2">
          {/* ── Customer Selector ──────────────────────────────────────── */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="h-4 w-4 text-indigo-500" />
                Pilih Customer
              </CardTitle>
              <CardDescription>
                Pilih customer untuk menerapkan diskon berdasarkan tier
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label>Customer</Label>
                <Select
                  value={selectedCustomerId}
                  onValueChange={(v) => setSelectedCustomerId(v ?? "")}
                >
                  <SelectTrigger className="w-full">
                    <UserCircle className="mr-2 h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="Pilih customer..." />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name} — {c.company} ({c.tier})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedCustomer && (
                <div className="mt-4 flex flex-wrap gap-3">
                  <Badge variant="outline" className={tierColors[selectedCustomer.tier]}>
                    <BadgePercent className="mr-1 h-3 w-3" />
                    {selectedCustomer.tier} — Diskon {discountPercent}%
                  </Badge>
                  <Badge variant="outline">
                    Limit: Rp {formatRupiah(selectedCustomer.creditLimit)}
                  </Badge>
                  <Badge variant="outline">
                    Sisa: Rp {formatRupiah(selectedCustomer.remainingCredit)}
                  </Badge>
                  <Badge variant="outline">
                    Pembelian: Rp {formatRupiah(selectedCustomer.totalPurchase)}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* ── Product Selector ────────────────────────────────────────── */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Package className="h-4 w-4 text-indigo-500" />
                    Produk
                  </CardTitle>
                  <CardDescription>
                    Tambahkan produk yang akan diestimasi harganya
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddProduct(!showAddProduct)}
                  disabled={filteredAddProducts.length === 0 && !showAddProduct}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Produk
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {showAddProduct && (
                <div className="rounded-lg border p-3 space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Cari produk (nama/SKU)..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="pl-9"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-48 overflow-y-auto space-y-1">
                    {filteredAddProducts.length === 0 ? (
                      <p className="py-4 text-center text-sm text-muted-foreground">
                        Semua produk sudah ditambahkan
                      </p>
                    ) : (
                      filteredAddProducts.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm hover:bg-accent transition-colors"
                          onClick={() => addLineItem(p.id)}
                        >
                          <div>
                            <span className="">{p.name}</span>
                            <span className="ml-2 text-xs text-muted-foreground">
                              {p.sku}
                            </span>
                          </div>
                          <span className="text-xs font-mono">
                            Rp {formatRupiah(p.basePrice)}/{p.unit}
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Line Items Table */}
              {lineItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                  <ShoppingCart className="mb-2 h-8 w-8" />
                  <p className="text-sm">Belum ada produk.</p>
                  <p className="text-xs">
                    Klik &ldquo;Tambah Produk&rdquo; untuk memulai.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-8">#</TableHead>
                        <TableHead>Produk</TableHead>
                        <TableHead className="text-right">Harga Satuan</TableHead>
                        <TableHead className="text-right w-24">Qty</TableHead>
                        <TableHead className="text-right">Subtotal</TableHead>
                        <TableHead className="w-10"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lineItems.map((li, idx) => (
                        <TableRow key={li.id}>
                          <TableCell className="text-xs text-muted-foreground">
                            {idx + 1}
                          </TableCell>
                          <TableCell className="">
                            {li.productName}
                          </TableCell>
                          <TableCell className="text-right font-mono text-sm">
                            Rp {formatRupiah(li.basePrice)}
                          </TableCell>
                          <TableCell className="text-right">
                            <Input
                              type="number"
                              min={0}
                              value={li.qty}
                              onChange={(e) =>
                                updateLineQty(li.id, parseInt(e.target.value) || 0)
                              }
                              className="h-8 w-20 text-right ml-auto"
                            />
                          </TableCell>
                          <TableCell className="text-right font-mono text-sm ">
                            Rp {formatRupiah(li.basePrice * li.qty)}
                          </TableCell>
                          <TableCell>
                            <button
                              type="button"
                              className="text-red-500 hover:text-red-700 transition-colors"
                              onClick={() => removeLineItem(li.id)}
                              title="Hapus"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
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

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* RIGHT COLUMN — Price Summary                                  */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <div className="space-y-6">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Calculator className="h-4 w-4 text-indigo-500" />
                Ringkasan Harga
              </CardTitle>
              <CardDescription>
                Perhitungan harga real-time
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Subtotal */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-mono ">
                  Rp {formatRupiah(calculations.subtotal)}
                </span>
              </div>

              {/* Tier Discount */}
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <BadgePercent className="h-3.5 w-3.5" />
                  Diskon Tier
                  {selectedCustomer && (
                    <Badge variant="outline" className="text-[10px] px-1 py-0 h-5">
                      {selectedCustomer.tier} — {discountPercent}%
                    </Badge>
                  )}
                </span>
                <span className="font-mono text-emerald-600 ">
                  - Rp {formatRupiah(calculations.discountAmount)}
                </span>
              </div>

              {/* After Discount */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Setelah Diskon</span>
                <span className="font-mono ">
                  Rp {formatRupiah(calculations.afterDiscount)}
                </span>
              </div>

              <Separator />

              {/* Shipping */}
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Truck className="h-3.5 w-3.5" />
                  Ongkos Kirim
                </span>
                <span className="font-mono">
                  {calculations.shippingCost === 0 ? (
                    <span className="text-emerald-600 ">GRATIS</span>
                  ) : (
                    <span>Rp {formatRupiah(calculations.shippingCost)}</span>
                  )}
                </span>
              </div>

              <Separator className="border-2" />

              {/* Grand Total */}
              <div className="flex items-center justify-between">
                <span className="text-base ">Grand Total</span>
                <span className="text-xl  font-mono text-indigo-600 dark:text-indigo-400">
                  Rp {formatRupiah(calculations.grandTotal)}
                </span>
              </div>

              {/* Shipping info */}
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                * Ongkos kirim gratis untuk pembelian Rp 500.000+
                <br />
                * Ongkos kirim Rp 15.000 untuk pembelian Rp 200.000+
              </p>
            </CardContent>
          </Card>

          {/* ── Saved Estimations ──────────────────────────────────────── */}
          {savedEstimations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <ClipboardCheck className="h-4 w-4 text-green-500" />
                  Estimasi Tersimpan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-60 overflow-y-auto">
                {savedEstimations.map((e, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-md border bg-muted/30 px-3 py-2 text-sm"
                  >
                    <div>
                      <p className=" text-xs">{e.customer}</p>
                      <p className="text-[10px] text-muted-foreground">{e.date}</p>
                    </div>
                    <span className="font-mono text-sm ">
                      Rp {formatRupiah(e.total)}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
