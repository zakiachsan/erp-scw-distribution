"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
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
  ArrowLeft,
  Plus,
  Trash2,
  Calculator,
  ShoppingCart,
  Save,
  Send,
} from "lucide-react"

const CURRENCIES = ["IDR", "USD", "SGD", "MYR", "JPY", "CNY", "KRW", "EUR"] as const
type Currency = (typeof CURRENCIES)[number]

const CURRENCY_LABELS: Record<Currency, string> = {
  IDR: "IDR (Rupiah)", USD: "USD (Dollar)", SGD: "SGD (Dollar Singapore)",
  MYR: "MYR (Ringgit)", JPY: "JPY (Yen)", CNY: "CNY (Yuan)", KRW: "KRW (Won)", EUR: "EUR (Euro)",
}

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  IDR: "Rp", USD: "$", SGD: "S$", MYR: "RM", JPY: "¥", CNY: "¥", KRW: "₩", EUR: "€",
}

function formatCurrency(amount: number, currency: Currency): string {
  const sym = CURRENCY_SYMBOLS[currency]
  const locale = currency === "IDR" ? "id-ID" : "en-US"
  return `${sym} ${amount.toLocaleString(locale)}`
}

interface POItem {
  productId: string
  productName: string
  sku: string
  qty: number
  unitPrice: number
  currency: Currency
  total: number
}

const suppliers = [
  { id: "1", name: "PT Autocare Indonesia", currency: "IDR" },
  { id: "2", name: "ChemPro Asia", currency: "MYR" },
  { id: "3", name: "NanoTech Coatings", currency: "USD" },
  { id: "4", name: "DetailPro Supply", currency: "IDR" },
  { id: "5", name: "CleanTech Global", currency: "USD" },
  { id: "6", name: "Samsung C&T", currency: "KRW" },
  { id: "7", name: "Toyota Tsusho", currency: "JPY" },
  { id: "8", name: "Alibaba Logistic", currency: "CNY" },
  { id: "9", name: "DHL Supply Chain", currency: "EUR" },
  { id: "10", name: "YCH Group", currency: "SGD" },
]

const products = [
  { id: "1", name: "SCW Snow Foam", sku: "SCW-SF-001", cogs: 45000 },
  { id: "2", name: "SCW Ceramic Coating", sku: "SCW-CC-002", cogs: 120000 },
  { id: "3", name: "SCW Interior Detailer", sku: "SCW-ID-003", cogs: 48000 },
  { id: "4", name: "SCW Tire Gel", sku: "SCW-TG-004", cogs: 35000 },
  { id: "5", name: "SCW Clay Bar", sku: "SCW-CB-005", cogs: 28000 },
  { id: "6", name: "SCW Microfiber Wash", sku: "SCW-MW-006", cogs: 38000 },
  { id: "7", name: "SCW Polish Compound", sku: "SCW-PC-007", cogs: 55000 },
  { id: "8", name: "SCW Spray Wax", sku: "SCW-SW-008", cogs: 42000 },
  { id: "9", name: "SCW Glass Cleaner", sku: "SCW-GC-009", cogs: 32000 },
  { id: "10", name: "SCW Leather Conditioner", sku: "SCW-LC-010", cogs: 65000 },
]

function CreatePOPageContent() {
  const searchParams = useSearchParams()
  const vendorParam = searchParams.get("vendor") || ""
  const prParam = searchParams.get("pr") || ""

  const [selectedSupplier, setSelectedSupplier] = useState(() => {
    if (vendorParam) {
      const match = suppliers.find((s) => s.name.toLowerCase() === vendorParam.toLowerCase())
      return match ? match.id : ""
    }
    return ""
  })
  const [items, setItems] = useState<POItem[]>([])
  const [selectedProduct, setSelectedProduct] = useState("")
  const [itemQty, setItemQty] = useState("")
  const [itemPrice, setItemPrice] = useState("")
  const [itemCurrency, setItemCurrency] = useState<Currency>("IDR")
  const [notes, setNotes] = useState("")

  const selectedSupplierData = suppliers.find((s) => s.id === selectedSupplier)

  const addItem = () => {
    if (!selectedProduct || !itemQty || !itemPrice) return
    const product = products.find((p) => p.id === selectedProduct)
    if (!product) return

    const qty = parseInt(itemQty)
    const price = parseFloat(itemPrice)
    const total = qty * price

    const existing = items.find((i) => i.productId === selectedProduct)
    if (existing) {
      setItems(
        items.map((i) =>
          i.productId === selectedProduct
            ? { ...i, qty: i.qty + qty, total: i.total + total }
            : i
        )
      )
    } else {
      setItems([
        ...items,
        {
          productId: selectedProduct,
          productName: product.name,
          sku: product.sku,
          qty,
          unitPrice: price,
          currency: itemCurrency,
          total,
        },
      ])
    }

    setSelectedProduct("")
    setItemQty("")
    setItemPrice("")
  }

  const removeItem = (productId: string) => {
    setItems(items.filter((i) => i.productId !== productId))
  }

  const [shipping, setShipping] = useState("500000")
  const shippingValue = parseInt(shipping) || 0

  const subtotal = items.reduce((sum, item) => sum + item.total, 0)
  const tax = Math.round(subtotal * 0.1)
  const grandTotal = subtotal + tax + shippingValue

  const totalCogs = items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId)
    if (!product) return sum
    return sum + product.cogs * item.qty
  }, 0)

  const estimatedMargin = subtotal > 0 ? ((subtotal - totalCogs) / subtotal) * 100 : 0

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/purchasing">
            <Button variant="ghost" size="icon-sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Create Purchase Order</h1>
            <p className="text-muted-foreground">
              {prParam ? `From Purchase Requisition ${prParam}` : "Create a new purchase order for supplier"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button disabled={items.length === 0}>
            <Send className="mr-2 h-4 w-4" />
            Submit PO
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Select Supplier</Label>
                  <Select value={selectedSupplier} onValueChange={(v) => setSelectedSupplier(v ?? "")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a supplier...">
                        {selectedSupplier ? (() => {
                          const s = suppliers.find((sup) => sup.id === selectedSupplier);
                          return s ? s.name : selectedSupplier;
                        })() : "Choose a supplier..."}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select
                    value={itemCurrency}
                    onValueChange={(v) => setItemCurrency((v as Currency) ?? "IDR")}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CURRENCIES.map((c) => (
                        <SelectItem key={c} value={c}>{CURRENCY_LABELS[c]}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4 text-indigo-600" />
                Order Items
              </CardTitle>
              <CardDescription>Add products to this purchase order</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 md:grid-cols-[2fr_1fr_1fr_auto]">
                <div className="space-y-2 min-w-0">
                  <Label>Product</Label>
                  <Select value={selectedProduct} onValueChange={(v) => setSelectedProduct(v ?? "")}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select product">
                        {selectedProduct ? (() => {
                          const p = products.find((pr) => pr.id === selectedProduct);
                          return p ? <span className="truncate">{p.sku} - {p.name}</span> : selectedProduct;
                        })() : "Select product"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.sku} - {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    placeholder="Qty"
                    value={itemQty}
                    onChange={(e) => setItemQty(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Unit Price ({itemCurrency})</Label>
                  <Input
                    type="number"
                    placeholder="Price"
                    value={itemPrice}
                    onChange={(e) => setItemPrice(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>&nbsp;</Label>
                  <Button onClick={addItem} className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add
                  </Button>
                </div>
              </div>

              {items.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead className="text-right">Qty</TableHead>
                      <TableHead className="text-right">Unit Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.productId}>
                        <TableCell className="font-medium">{item.productName}</TableCell>
                        <TableCell className="font-sans text-xs">{item.sku}</TableCell>
                        <TableCell className="text-right">{item.qty}</TableCell>
                        <TableCell className="text-right font-sans">
                          {formatCurrency(item.unitPrice, item.currency)}
                        </TableCell>
                        <TableCell className="text-right font-sans font-bold">
                          {formatCurrency(item.total, item.currency)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => removeItem(item.productId)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="rounded-lg border border-dashed p-8 text-center">
                  <ShoppingCart className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    No items added yet. Select a product above to add items.
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea
                  placeholder="Additional notes for this purchase order..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-4 w-4 text-indigo-600" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-sans">{formatCurrency(subtotal, itemCurrency)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Tax (PPN 10%)</span>
                <span className="font-sans">{formatCurrency(tax, itemCurrency)}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <Label className="text-xs text-muted-foreground">Shipping</Label>
                  <Input
                    type="number"
                    placeholder="Shipping cost"
                    value={shipping}
                    onChange={(e) => setShipping(e.target.value)}
                    className="mt-1 h-8 text-sm"
                  />
                </div>
                <span className="font-sans text-sm pt-5">{formatCurrency(shippingValue, itemCurrency)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Grand Total</span>
                  <span className="text-lg font-semibold font-sans">
                    {formatCurrency(grandTotal, itemCurrency)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>COGS Analysis</CardTitle>
              <CardDescription>Estimated cost of goods sold</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total COGS</span>
                <span className="font-sans">Rp {totalCogs.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Selling Price (Est.)</span>
                <span className="font-sans">Rp {subtotal.toLocaleString()}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Estimated Margin</span>
                  <Badge
                    variant="outline"
                    className={
                      estimatedMargin >= 20
                        ? "bg-emerald-100 text-emerald-800"
                        : estimatedMargin >= 10
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-800"
                    }
                  >
                    {estimatedMargin.toFixed(1)}%
                  </Badge>
                </div>
              </div>
              <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
                <p>
                  COGS is calculated based on average cost per unit. Actual margins may
                  vary based on supplier pricing and shipping costs.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function CreatePOPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <CreatePOPageContent />
    </Suspense>
  )
}
