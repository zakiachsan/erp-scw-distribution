"use client"

import { useState, Suspense, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
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
import { Switch } from "@/components/ui/switch"
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
  FileText,
  Truck,
  Percent,
} from "lucide-react"
import Link from "next/link"

const formatIDR = (val: number) => `Rp ${val.toLocaleString("id-ID")}`

// ─── Customer Type & Tiering Discount ──────────────────────────────────────
type CustomerType = "Reseller" | "Dealer" | "Workshop"

const customerTypeDiscount: Record<CustomerType, Record<string, number>> = {
  Reseller: { "Exterior Care": 15, "Interior Care": 12, "Coating & Protection": 10, "Wheel & Tire": 12, "Tools & Accessories": 8, "default": 10 },
  Dealer:   { "Exterior Care": 20, "Interior Care": 18, "Coating & Protection": 15, "Wheel & Tire": 18, "Tools & Accessories": 12, "default": 15 },
  Workshop: { "Exterior Care": 10, "Interior Care": 8,  "Coating & Protection": 8,  "Wheel & Tire": 10, "Tools & Accessories": 5,  "default": 8 },
}

const productCategories: Record<string, string> = {
  P01: "Exterior Care", P02: "Coating & Protection", P03: "Interior Care",
  P04: "Wheel & Tire", P05: "Exterior Care", P06: "Interior Care",
  P07: "Exterior Care", P08: "Exterior Care", P09: "Exterior Care", P10: "Interior Care",
}

// ─── Customer Data ─────────────────────────────────────────────────────────
const customers = [
  { id: "C001", name: "PT Autogloss Indonesia", type: "Dealer" as CustomerType, tier: "Platinum", address: "Jl. Alternatif Cibinong No. 88, Bogor", phone: "021-87654321", email: "sales@autogloss.co.id", npwp: "01.234.567.8-012.000", creditLimit: 50000000, remaining: 32000000 },
  { id: "C002", name: "CV Ceramic Pro JKT", type: "Workshop" as CustomerType, tier: "Gold", address: "Jl. Panjang No. 12, Jakarta Barat", phone: "021-54321098", email: "order@ceramicpro.co.id", npwp: "02.345.678.9-013.000", creditLimit: 40000000, remaining: 18000000 },
  { id: "C003", name: "UD Shinemax", type: "Reseller" as CustomerType, tier: "Gold", address: "Jl. Raya Bandung No. 456, Bandung", phone: "022-76543210", email: "info@shinemax.co.id", npwp: "03.456.789.0-014.000", creditLimit: 30000000, remaining: 28000000 },
  { id: "C004", name: "PT DetailWorks BDG", type: "Workshop" as CustomerType, tier: "Silver", address: "Jl. Soekarno-Hatta No. 789, Bandung", phone: "022-65432109", email: "procurement@detailworks.co.id", npwp: "04.567.890.1-015.000", creditLimit: 25000000, remaining: 25000000 },
  { id: "C005", name: "CV ProShine SBY", type: "Reseller" as CustomerType, tier: "Silver", address: "Jl. Rungkut Mapan Utara No. 10, Surabaya", phone: "031-87654321", email: "info@proshine.co.id", npwp: "05.678.901.2-016.000", creditLimit: 20000000, remaining: 12000000 },
  { id: "C006", name: "AutoCare Makassar", type: "Dealer" as CustomerType, tier: "Bronze", address: "Jl. A.P. Pettarani No. 22, Makassar", phone: "0411-8765432", email: "cs@autocare-mks.co.id", npwp: "06.789.012.3-017.000", creditLimit: 15000000, remaining: 15000000 },
  { id: "C007", name: "GlossUp Bali", type: "Workshop" as CustomerType, tier: "Platinum", address: "Jl. Sunset Road No. 88, Seminyak, Bali", phone: "0361-8765432", email: "hello@glossupbali.com", npwp: "07.890.123.4-018.000", creditLimit: 20000000, remaining: 5000000 },
  { id: "C008", name: "DetailPro Semarang", type: "Reseller" as CustomerType, tier: "Bronze", address: "Jl. Pandanaran No. 55, Semarang", phone: "024-8765432", email: "order@detailpro.co.id", npwp: "08.901.234.5-019.000", creditLimit: 15000000, remaining: 10000000 },
]

// ─── Products ──────────────────────────────────────────────────────────────
const products = [
  { id: "P01", sku: "SCW-SF-001", name: "SCW Snow Foam", price: 150000, unit: "pcs" },
  { id: "P02", sku: "SCW-CC-002", name: "SCW Ceramic Coating", price: 250000, unit: "pcs" },
  { id: "P03", sku: "SCW-ID-003", name: "SCW Interior Detailer", price: 120000, unit: "pcs" },
  { id: "P04", sku: "SCW-TG-004", name: "SCW Tire Gel", price: 95000, unit: "pcs" },
  { id: "P05", sku: "SCW-SW-008", name: "SCW Spray Wax", price: 110000, unit: "pcs" },
  { id: "P06", sku: "SCW-GC-009", name: "SCW Glass Cleaner", price: 85000, unit: "pcs" },
  { id: "P07", sku: "SCW-PC-007", name: "SCW Polish Compound", price: 180000, unit: "pcs" },
  { id: "P08", sku: "SCW-SP-018", name: "SCW Shampoo Plus", price: 90000, unit: "pcs" },
  { id: "P09", sku: "SCW-IL-017", name: "SCW Iron Decontamination", price: 135000, unit: "pcs" },
  { id: "P10", sku: "SCW-AW-011", name: "SCW All Purpose Cleaner", price: 105000, unit: "pcs" },
]

// ─── Delivery Options ──────────────────────────────────────────────────────
const deliveryOptions = [
  { id: "instant", name: "Kurir Instant (GoSend/Grab)", est: "Hari ini", baseCost: 25000 },
  { id: "same-day", name: "Kurir Same Day", est: "Hari ini", baseCost: 15000 },
  { id: "jne", name: "JNE", est: "2-3 hari", baseCost: 12000 },
  { id: "jnt", name: "J&T Express", est: "2-3 hari", baseCost: 10000 },
  { id: "tiki", name: "TIKI", est: "2-4 hari", baseCost: 12000 },
  { id: "cargo", name: "Cargo (Truk/Container)", est: "3-7 hari", baseCost: 5000 },
  { id: "ambil-sendiri", name: "Ambil Sendiri", est: "-", baseCost: 0 },
]

// ─── Interface ─────────────────────────────────────────────────────────────
interface QuotationItem {
  productId: string
  qty: number
  price: number
  discount: number
  notes: string
}

function CreateQuotationForm() {
  const router = useRouter()

  const [customerId, setCustomerId] = useState("")
  const [customerType, setCustomerType] = useState<CustomerType>("Reseller")
  const [isTaxable, setIsTaxable] = useState(true)
  const [deliveryId, setDeliveryId] = useState("jne")
  const [items, setItems] = useState<QuotationItem[]>([
    { productId: "", qty: 1, price: 0, discount: 0, notes: "" },
  ])
  const [validUntil, setValidUntil] = useState(() => {
    const d = new Date(); d.setDate(d.getDate() + 30)
    return d.toISOString().split("T")[0]
  })
  const [paymentTerms, setPaymentTerms] = useState("Net 30")
  const [notes, setNotes] = useState("")

  const selectedCustomer = customers.find((c) => c.id === customerId)
  const selectedDelivery = deliveryOptions.find((d) => d.id === deliveryId)

  // Auto-set customer type when customer is selected
  const handleCustomerChange = (id: string) => {
    setCustomerId(id)
    const c = customers.find((x) => x.id === id)
    if (c) setCustomerType(c.type)
  }

  // Auto-apply tiering discount when customer type changes
  const getTieringDiscount = (productId: string): number => {
    const cat = productCategories[productId] || "default"
    return customerTypeDiscount[customerType][cat] || customerTypeDiscount[customerType]["default"]
  }

  const addItem = () => {
    setItems([...items, { productId: "", qty: 1, price: 0, discount: 0, notes: "" }])
  }

  const removeItem = (index: number) => {
    if (items.length === 1) return
    setItems(items.filter((_, i) => i !== index))
  }

  const updateItem = (index: number, field: keyof QuotationItem, value: string | number) => {
    const updated = [...items]
    if (field === "productId") {
      const product = products.find((p) => p.id === value)
      const tierDisc = getTieringDiscount(value as string)
      updated[index] = {
        ...updated[index],
        productId: value as string,
        price: product?.price || 0,
        discount: tierDisc,
      }
    } else if (field === "qty") {
      updated[index] = { ...updated[index], qty: Math.max(1, Number(value)) }
    } else if (field === "price") {
      updated[index] = { ...updated[index], price: Math.max(0, Number(value)) }
    } else if (field === "discount") {
      updated[index] = { ...updated[index], discount: Math.min(100, Math.max(0, Number(value))) }
    } else {
      updated[index] = { ...updated[index], notes: value as string }
    }
    setItems(updated)
  }

  // Apply tiering discount to all items when customer type changes
  const applyTieringDiscountToAll = () => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        discount: item.productId ? getTieringDiscount(item.productId) : item.discount,
      }))
    )
  }

  const subtotal = items.reduce((sum, item) => {
    const lineTotal = item.price * item.qty
    const discountAmount = lineTotal * (item.discount / 100)
    return sum + (lineTotal - discountAmount)
  }, 0)

  const taxAmount = isTaxable ? subtotal * 0.11 : 0
  const deliveryCost = selectedDelivery?.baseCost || 0
  const total = subtotal + taxAmount + deliveryCost

  const handleSubmit = () => {
    if (!customerId || items.every((i) => !i.productId)) return
    const quoNum = `QUO-2026-${String(Math.floor(Math.random() * 900) + 100).padStart(3, "0")}`
    alert(
      `Quotation ${quoNum} berhasil dibuat!\n\n` +
      `Customer: ${selectedCustomer?.name}\n` +
      `Type: ${customerType}\n` +
      `Pajak: ${isTaxable ? "Ya (PPN 11%)" : "Non-Pajak"}\n` +
      `Pengiriman: ${selectedDelivery?.name}\n` +
      `Total: ${formatIDR(total)}`
    )
    router.push("/sales/quotations")
  }

  return (
    <div className="space-y-4 p-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/sales/quotations" className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-lg font-bold text-gray-900">Buat Quotation</h1>
          <p className="text-xs text-gray-500">Buat penawaran harga kepada customer</p>
        </div>
      </div>

      {/* Row 1: Customer Detail + Quotation Info */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Customer Detail */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Detail Customer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-xs">Customer *</Label>
              <Select value={customerId} onValueChange={handleCustomerChange}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Pilih customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {selectedCustomer && (
              <div className="rounded-lg bg-slate-50 p-3 text-xs space-y-1.5">
                <div className="font-medium text-slate-700">{selectedCustomer.name}</div>
                <div className="text-muted-foreground">{selectedCustomer.address}</div>
                <div className="flex gap-4">
                  <span>Telp: {selectedCustomer.phone}</span>
                </div>
                <div>Email: {selectedCustomer.email}</div>
                <div>NPWP: {selectedCustomer.npwp}</div>
                <div className="flex justify-between pt-1 border-t">
                  <span>Credit Limit</span>
                  <span>{formatIDR(selectedCustomer.creditLimit)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Remaining</span>
                  <span>{formatIDR(selectedCustomer.remaining)}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quotation Info */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Info Quotation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-xs">Type of Customer *</Label>
              <Select
                value={customerType}
                onValueChange={(v) => { setCustomerType(v as CustomerType); setTimeout(applyTieringDiscountToAll, 0) }}
              >
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Reseller">Reseller</SelectItem>
                  <SelectItem value="Dealer">Dealer</SelectItem>
                  <SelectItem value="Workshop">Workshop</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-[10px] text-muted-foreground mt-1">Menentukan discount tiering otomatis</p>
            </div>
            <div>
              <Label className="text-xs">Valid Until *</Label>
              <Input type="date" value={validUntil} onChange={(e) => setValidUntil(e.target.value)} className="h-9" />
            </div>
            <div>
              <Label className="text-xs">Syarat Pembayaran *</Label>
              <Select value={paymentTerms} onValueChange={setPaymentTerms}>
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="COD">COD (Cash on Delivery)</SelectItem>
                  <SelectItem value="Net 7">Net 7 Hari</SelectItem>
                  <SelectItem value="Net 14">Net 14 Hari</SelectItem>
                  <SelectItem value="Net 30">Net 30 Hari</SelectItem>
                  <SelectItem value="Net 60">Net 60 Hari</SelectItem>
                  <SelectItem value="DP 50%">DP 50% + Pelunasan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Pengiriman *</Label>
              <Select value={deliveryId} onValueChange={setDeliveryId}>
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {deliveryOptions.map((d) => (
                    <SelectItem key={d.id} value={d.id}>
                      {d.name} ({d.est}) — {d.baseCost > 0 ? formatIDR(d.baseCost) : "Gratis"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <Label className="text-xs font-medium">Pajak / Non-Pajak</Label>
                <p className="text-[10px] text-muted-foreground">{isTaxable ? "PPN 11% akan dikenakan" : "Tanpa pajak (Non-Pajak)"}</p>
              </div>
              <Switch checked={isTaxable} onCheckedChange={setIsTaxable} />
            </div>
            <div>
              <Label className="text-xs">Catatan</Label>
              <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Catatan tambahan..." className="h-16 text-sm" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tiering Discount Info */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardContent className="p-3 flex items-center gap-3">
          <Percent className="h-4 w-4 text-blue-600 shrink-0" />
          <div className="text-xs">
            <span className="font-medium text-blue-800">Tiering Discount ({customerType}): </span>
            <span className="text-blue-700">
              Exterior Care {customerTypeDiscount[customerType]["Exterior Care"]}% · 
              Interior Care {customerTypeDiscount[customerType]["Interior Care"]}% · 
              Coating {customerTypeDiscount[customerType]["Coating & Protection"]}% · 
              Wheel & Tire {customerTypeDiscount[customerType]["Wheel & Tire"]}% · 
              Tools {customerTypeDiscount[customerType]["Tools & Accessories"]}%
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Items */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold">Rincian Produk / Jasa</CardTitle>
            <Button size="sm" variant="outline" onClick={addItem}>
              <Plus className="mr-1 h-3.5 w-3.5" />
              Tambah Item
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Produk / Jasa</TableHead>
                  <TableHead className="w-28">Kategori</TableHead>
                  <TableHead className="w-20">Qty</TableHead>
                  <TableHead className="w-28">Harga</TableHead>
                  <TableHead className="w-20">Disc %</TableHead>
                  <TableHead className="w-32 text-right">Subtotal</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, idx) => {
                  const lineTotal = item.price * item.qty
                  const discountAmount = lineTotal * (item.discount / 100)
                  const lineSubtotal = lineTotal - discountAmount
                  const cat = item.productId ? productCategories[item.productId] : "-"

                  return (
                    <TableRow key={idx}>
                      <TableCell className="text-xs text-muted-foreground">{idx + 1}</TableCell>
                      <TableCell>
                        <Select value={item.productId} onValueChange={(val) => updateItem(idx, "productId", val)}>
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue placeholder="Pilih produk" />
                          </SelectTrigger>
                          <SelectContent>
                            {products.map((p) => (
                              <SelectItem key={p.id} value={p.id}>
                                {p.sku} - {p.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[10px]">{cat}</Badge>
                      </TableCell>
                      <TableCell>
                        <Input type="number" value={item.qty} onChange={(e) => updateItem(idx, "qty", e.target.value)} className="h-8 text-xs w-16" min={1} />
                      </TableCell>
                      <TableCell>
                        <Input type="number" value={item.price} onChange={(e) => updateItem(idx, "price", e.target.value)} className="h-8 text-xs" min={0} />
                      </TableCell>
                      <TableCell>
                        <Input type="number" value={item.discount} onChange={(e) => updateItem(idx, "discount", e.target.value)} className="h-8 text-xs w-16" min={0} max={100} />
                      </TableCell>
                      <TableCell className="text-right text-sm font-medium">{formatIDR(lineSubtotal)}</TableCell>
                      <TableCell>
                        <button onClick={() => removeItem(idx)} className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-600" disabled={items.length === 1}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Summary & Submit */}
      <div className="flex gap-4 justify-between items-start">
        <div className="flex gap-2">
          <Link href="/sales/quotations">
            <Button variant="outline" size="sm">Batal</Button>
          </Link>
          <Button size="sm" variant="outline" onClick={() => alert("Quotation disimpan sebagai Draft")}>
            Simpan Draft
          </Button>
        </div>

        <Card className="w-80">
          <CardContent className="p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatIDR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Pengiriman ({selectedDelivery?.name})</span>
              <span>{deliveryCost > 0 ? formatIDR(deliveryCost) : "Gratis"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">PPN (11%)</span>
              <span>{isTaxable ? formatIDR(taxAmount) : "-"}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold text-base">
              <span>Total</span>
              <span className="text-blue-600">{formatIDR(total)}</span>
            </div>
            <Button className="w-full mt-2" size="sm" onClick={handleSubmit} disabled={!customerId || items.every((i) => !i.productId)}>
              <FileText className="mr-1.5 h-3.5 w-3.5" />
              Buat Quotation
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function CreateQuotationPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-muted-foreground">Loading...</div>}>
      <CreateQuotationForm />
    </Suspense>
  )
}
