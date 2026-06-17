"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { use } from "react"
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
  AlertTriangle,
  CheckCircle2,
  ShoppingCart,
} from "lucide-react"
import Link from "next/link"

const customers = [
  { id: "C001", name: "PT Autogloss Indonesia", creditLimit: 50000000, remaining: 32000000, tier: "Platinum" },
  { id: "C002", name: "CV Ceramic Pro JKT", creditLimit: 40000000, remaining: 18000000, tier: "Gold" },
  { id: "C003", name: "UD Shinemax", creditLimit: 30000000, remaining: 28000000, tier: "Gold" },
  { id: "C004", name: "PT DetailWorks BDG", creditLimit: 25000000, remaining: 25000000, tier: "Silver" },
  { id: "C005", name: "CV ProShine SBY", creditLimit: 20000000, remaining: 12000000, tier: "Silver" },
]

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

interface OrderItem {
  productId: string
  qty: number
  price: number
  discount: number
}

// Pipeline deals data (mirrors pipeline detail page)
const PIPELINE_DEALS: Record<string, { id: string; customer: string; company: string; customerId: string }> = {
  "PL-001": { id: "PL-001", customer: "Budi Santoso", company: "PT Autogloss Indonesia", customerId: "C001" },
  "PL-002": { id: "PL-002", customer: "Andi Pratama", company: "CV Ceramic Pro JKT", customerId: "C002" },
  "PL-003": { id: "PL-003", customer: "Rina Wijaya", company: "UD Shinemax", customerId: "C003" },
  "PL-004": { id: "PL-004", customer: "Dedi Kurniawan", company: "PT DetailWorks BDG", customerId: "C004" },
  "PL-005": { id: "PL-005", customer: "Sari Dewi", company: "CV ProShine SBY", customerId: "C005" },
}

// Pre-fill items from pipeline quotation
const PIPELINE_QUOTATION_ITEMS: Record<string, { productId: string; qty: number }[]> = {
  "PL-001": [
    { productId: "P01", qty: 20 },
    { productId: "P03", qty: 50 },
  ],
  "PL-002": [
    { productId: "P02", qty: 10 },
  ],
  "PL-003": [
    { productId: "P01", qty: 5 },
    { productId: "P03", qty: 8 },
    { productId: "P04", qty: 10 },
  ],
  "PL-004": [
    { productId: "P02", qty: 15 },
  ],
  "PL-005": [
    { productId: "P06", qty: 15 },
    { productId: "P07", qty: 8 },
  ],
}

const tierDiscountMap: Record<string, number> = {
  Bronze: 0.02,
  Silver: 0.05,
  Gold: 0.08,
  Platinum: 0.12,
}

export default function CreateSalesOrderPage() {
  const searchParams = useSearchParams()
  const pipelineId = searchParams.get("pipelineId")
  const pipelineDeal = pipelineId ? PIPELINE_DEALS[pipelineId] : null

  const [selectedCustomer, setSelectedCustomer] = useState(pipelineDeal?.customerId || "")
  const [items, setItems] = useState<OrderItem[]>(() => {
    if (pipelineId && PIPELINE_QUOTATION_ITEMS[pipelineId]) {
      return PIPELINE_QUOTATION_ITEMS[pipelineId].map((qi) => {
        const product = products.find((p) => p.id === qi.productId)
        return {
          productId: qi.productId,
          qty: qi.qty,
          price: product?.price || 0,
          discount: 0,
        }
      })
    }
    return []
  })
  const [notes, setNotes] = useState("")
  const [created, setCreated] = useState(false)

  // Apply tier discount when customer changes
  useEffect(() => {
    if (pipelineId && pipelineDeal && items.length > 0) {
      const customer = customers.find((c) => c.id === pipelineDeal.customerId)
      if (customer) {
        const tierDiscount = tierDiscountMap[customer.tier] || 0
        setItems(prev => prev.map(item => ({
          ...item,
          discount: Math.round(item.price * tierDiscount),
        })))
      }
    }
  }, []) // Only run once on mount

  const customer = customers.find((c) => c.id === selectedCustomer)
  const tierDiscount = customer ? tierDiscountMap[customer.tier] || 0 : 0

  const addItem = () => {
    setItems([...items, { productId: "", qty: 1, price: 0, discount: 0 }])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const updateItem = (index: number, field: keyof OrderItem, value: string | number | null) => {
    const newItems = [...items]
    if (field === "productId") {
      const product = products.find((p) => p.id === value)
      if (product) {
        newItems[index] = {
          ...newItems[index],
          productId: value as string,
          price: product.price,
          discount: Math.round(product.price * tierDiscount),
        }
      }
    } else {
      newItems[index] = { ...newItems[index], [field]: value }
    }
    setItems(newItems)
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const totalDiscount = items.reduce((sum, item) => sum + item.discount * item.qty, 0)
  const total = subtotal - totalDiscount
  const isOverCredit = customer ? total > customer.remaining : false

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Link href="/sales/orders">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl  tracking-tight">Create Purchase Order</h1>
          <p className="text-muted-foreground">Fill in the details to create a new sales order</p>
          {pipelineDeal && (
            <Badge variant="outline" className="mt-1 text-xs bg-indigo-50 text-indigo-700 border-indigo-200">
              <ShoppingCart className="h-3 w-3 mr-1" />
              Dari Pipeline: {pipelineDeal.company}
            </Badge>
          )}
        </div>
      </div>

      {/* Customer Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Customer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-[3fr_2fr]">
            <div className="space-y-2">
              <Label>Select Customer</Label>
              <Select value={selectedCustomer} onValueChange={(v) => setSelectedCustomer(v ?? "")}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a customer">
                    {selectedCustomer ? (() => {
                      const c = customers.find((cust) => cust.id === selectedCustomer);
                      return c ? `${c.name} (${c.tier})` : selectedCustomer;
                    })() : "Choose a customer"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {customers.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name} ({c.tier})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {customer && (
              <div className="rounded-lg border p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-indigo-100 text-indigo-700">{customer.tier}</Badge>
                  <span className="text-sm ">{tierDiscount * 100}% Tier Discount</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Credit: Rp {(customer.remaining / 1000000).toFixed(0)}M / Rp {(customer.creditLimit / 1000000).toFixed(0)}M
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Order Items</CardTitle>
              <CardDescription>Add products with real-time tiering discount</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={addItem}>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <ShoppingCart className="mx-auto h-8 w-8 mb-2 opacity-50" />
              <p>No items added yet. Click &quot;Add Item&quot; to start.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Base Price</TableHead>
                  <TableHead className="w-24">Qty</TableHead>
                  <TableHead className="text-right">Discount/Unit</TableHead>
                  <TableHead className="text-right">Subtotal</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Select value={item.productId} onValueChange={(v) => updateItem(index, "productId", v)}>
                        <SelectTrigger className="w-64">
                          <SelectValue placeholder="Select product">
                            {item.productId ? (() => {
                              const p = products.find((pr) => pr.id === item.productId);
                              return p ? `${p.name} (${p.sku})` : item.productId;
                            })() : "Select product"}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((p) => (
                            <SelectItem key={p.id} value={p.id}>
                              {p.name} ({p.sku})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">Rp {item.price.toLocaleString()}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min={1}
                        value={item.qty}
                        onChange={(e) => updateItem(index, "qty", parseInt(e.target.value) || 1)}
                        className="w-20"
                      />
                    </TableCell>
                    <TableCell className="text-right text-emerald-600">
                      -Rp {item.discount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right ">
                      Rp {((item.price - item.discount) * item.qty).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon-sm" onClick={() => removeItem(index)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {/* Credit Warning */}
          {customer && isOverCredit && items.length > 0 && (
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 dark:bg-amber-900/20">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <div className="text-sm">
                <p className=" text-amber-800 dark:text-amber-400">Credit Limit Warning</p>
                <p className="text-amber-700 dark:text-amber-500">
                  Order total (Rp {(total / 1000000).toFixed(1)}M) exceeds remaining credit (Rp {(customer.remaining / 1000000).toFixed(1)}M).
                  Customer needs to make a payment first.
                </p>
              </div>
            </div>
          )}

          {customer && !isOverCredit && items.length > 0 && (
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-300 bg-emerald-50 p-3 dark:bg-emerald-900/20">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <div className="text-sm">
                <p className=" text-emerald-800 dark:text-emerald-400">Credit OK</p>
                <p className="text-emerald-700 dark:text-emerald-500">
                  Order total (Rp {(total / 1000000).toFixed(1)}M) is within remaining credit (Rp {(customer.remaining / 1000000).toFixed(1)}M).
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Summary & Notes */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Add notes for this order..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>Rp {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tier Discount ({(tierDiscount * 100).toFixed(0)}%)</span>
              <span className="text-emerald-600">-Rp {totalDiscount.toLocaleString()}</span>
            </div>
            <div className="border-t pt-3 flex justify-between ">
              <span>Total</span>
              <span className="text-lg">Rp {total.toLocaleString()}</span>
            </div>
            {created ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                  Purchase Order berhasil dibuat!
                </div>
                <Link href={pipelineDeal ? `/sales/pipeline/${pipelineId}` : "/sales/orders"} className="block">
                  <Button variant="outline" className="w-full" size="sm">
                    {pipelineDeal ? "Kembali ke Pipeline" : "Lihat Semua Orders"}
                  </Button>
                </Link>
              </div>
            ) : (
              <Button
                className="w-full"
                disabled={items.length === 0 || !selectedCustomer}
                onClick={() => setCreated(true)}
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                {pipelineDeal ? "Submit & Kembali ke Pipeline" : "Submit Purchase Order"}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
