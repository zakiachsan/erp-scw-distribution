"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
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
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  Edit,
  Barcode,
  Package,
  MapPin,
  Tag,
  History,
  ArrowDownLeft,
  ArrowUpRight,
  Minus,
  Boxes,
} from "lucide-react"
import { useWarehouseStore } from "@/lib/warehouse-store"

const productMap: Record<
  string,
  {
    id: string
    sku: string
    name: string
    category: string
    description: string
    barcode: string
    status: "in-stock" | "low-stock" | "out-of-stock"
    warehouses: { name: string; rak: string; qty: number }[]
    priceTiers: { tier: string; minQty: number; priceIDR: number; priceUSD: number }[]
    stockMovements?: {
      id: string
      type: "in" | "out" | "transfer" | "adjustment"
      date: string
      source?: string
      destination?: string
      qty: number
      reference?: string
      note?: string
    }[]
  }
> = {
  "1": {
    id: "1",
    sku: "SCW-SF-001",
    name: "SCW Snow Foam",
    category: "Exterior",
    description:
      "High-foaming pre-wash snow foam for safe and effective removal of dirt and grime. pH-neutral formula safe for all surfaces.",
    barcode: "8991234567890",
    status: "in-stock",
    warehouses: [
      { name: "Gudang Utama", rak: "Rak A-01", qty: 150 },
      { name: "Gudang Cabang", rak: "Rak B-03", qty: 60 },
      { name: "Gudang Display", rak: "Rak D-01", qty: 35 },
    ],
    priceTiers: [
      { tier: "Retail", minQty: 1, priceIDR: 85000, priceUSD: 5.5 },
      { tier: "Wholesale", minQty: 10, priceIDR: 72000, priceUSD: 4.65 },
      { tier: "Distributor", minQty: 50, priceIDR: 58000, priceUSD: 3.75 },
      { tier: "Bulk", minQty: 100, priceIDR: 48000, priceUSD: 3.1 },
    ],
    stockMovements: [
      { id: "mv-1", type: "in", date: "2026-06-10", source: "Supplier", destination: "Rak A-01", qty: 200, reference: "PO-2025-0042", note: "Penerimaan awal" },
      { id: "mv-2", type: "transfer", date: "2026-06-11", source: "Rak A-01", destination: "Rak B-03", qty: 60, reference: "TF-2026-00112", note: "Transfer ke cabang" },
      { id: "mv-3", type: "out", date: "2026-06-12", source: "Rak A-01", destination: "Sales Order", qty: 25, reference: "SO-2026-00891", note: "Penjualan" },
      { id: "mv-4", type: "transfer", date: "2026-06-12", source: "Rak A-01", destination: "Rak D-01", qty: 35, reference: "TF-2026-00115", note: "Ke display" },
      { id: "mv-5", type: "out", date: "2026-06-13", source: "Rak B-03", destination: "Sales Order", qty: 15, reference: "SO-2026-00902", note: "Penjualan cabang" },
    ],
  },
  "2": {
    id: "2",
    sku: "SCW-CC-002",
    name: "SCW Ceramic Coating",
    category: "Coating",
    description:
      "Professional-grade ceramic coating providing up to 2 years of protection with hydrophobic and UV-resistant properties.",
    barcode: "8991234567891",
    status: "low-stock",
    warehouses: [
      { name: "Gudang Utama", rak: "Rak A-02", qty: 8 },
      { name: "Gudang Cabang", rak: "Rak C-01", qty: 4 },
    ],
    priceTiers: [
      { tier: "Retail", minQty: 1, priceIDR: 350000, priceUSD: 22.5 },
      { tier: "Wholesale", minQty: 5, priceIDR: 310000, priceUSD: 19.9 },
      { tier: "Distributor", minQty: 20, priceIDR: 260000, priceUSD: 16.7 },
      { tier: "Bulk", minQty: 50, priceIDR: 220000, priceUSD: 14.1 },
    ],
    stockMovements: [
      { id: "mv-1", type: "in", date: "2026-06-08", source: "Supplier", destination: "Rak A-02", qty: 20, reference: "PO-2025-0044", note: "Penerimaan awal" },
      { id: "mv-2", type: "transfer", date: "2026-06-09", source: "Rak A-02", destination: "Rak C-01", qty: 4, reference: "TF-2026-00105", note: "Transfer ke cabang" },
      { id: "mv-3", type: "out", date: "2026-06-10", source: "Rak A-02", destination: "Sales Order", qty: 5, reference: "SO-2026-00875", note: "Penjualan" },
      { id: "mv-4", type: "adjustment", date: "2026-06-11", source: "Rak A-02", destination: "Rak A-02", qty: -1, reference: "ADJ-2026-00042", note: "Stok rusak" },
    ],
  },
}

const defaultProduct = {
  id: "0",
  sku: "SCW-ID-003",
  name: "SCW Interior Detailer",
  category: "Interior",
  description:
    "Premium interior detailer with UV protection and anti-static properties. Leaves a matte finish on dashboards and trim.",
  barcode: "8991234567892",
  status: "in-stock" as const,
  warehouses: [
    { name: "Gudang Utama", rak: "Rak B-01", qty: 120 },
    { name: "Gudang Cabang", rak: "Rak D-02", qty: 60 },
  ],
    priceTiers: [
      { tier: "Retail", minQty: 1, priceIDR: 75000, priceUSD: 4.85 },
      { tier: "Wholesale", minQty: 10, priceIDR: 65000, priceUSD: 4.2 },
      { tier: "Distributor", minQty: 50, priceIDR: 52000, priceUSD: 3.35 },
      { tier: "Bulk", minQty: 100, priceIDR: 42000, priceUSD: 2.7 },
    ],
    stockMovements: [
      { id: "mv-1", type: "in", date: "2026-06-07", source: "Supplier", destination: "Rak B-01", qty: 150, reference: "PO-2025-0043", note: "Penerimaan awal" },
      { id: "mv-2", type: "transfer", date: "2026-06-08", source: "Rak B-01", destination: "Rak D-02", qty: 60, reference: "TF-2026-00102", note: "Transfer ke cabang" },
      { id: "mv-3", type: "out", date: "2026-06-13", source: "Rak B-01", destination: "Sales Order", qty: 20, reference: "SO-2026-00901", note: "Penjualan" },
    ],
}

const defaultCategories = ["Exterior", "Interior", "Wash", "Coating", "Prep", "Correction", "Protection", "Wheel", "Tools", "Decon"]

const statusConfig = {
  "in-stock": { label: "In Stock", className: "bg-emerald-100 text-emerald-800" },
  "low-stock": { label: "Low Stock", className: "bg-amber-100 text-amber-800" },
  "out-of-stock": { label: "Out of Stock", className: "bg-red-100 text-red-800" },
}

function formatIDR(val: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(val)
}

function formatUSD(val: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val)
}

function movementTypeConfig(type: Product["stockMovements"][number]["type"]) {
  switch (type) {
    case "in":
      return {
        label: "Barang Masuk",
        className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
        icon: ArrowDownLeft,
      }
    case "out":
      return {
        label: "Barang Keluar",
        className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        icon: ArrowUpRight,
      }
    case "transfer":
      return {
        label: "Transfer",
        className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
        icon: Package,
      }
    case "adjustment":
      return {
        label: "Adjustment",
        className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
        icon: Minus,
      }
  }
}

export default function ProductDetailPage() {
  const params = useParams()
  const id = params.id as string
  const product = productMap[id] || { ...defaultProduct, id }

  const { racks, inboundReceipts } = useWarehouseStore()

  const productBoxes = inboundReceipts
    .filter((r) => r.status !== "assigned")
    .flatMap((r) =>
      r.cartons
        .filter(
          (c) =>
            c.status === "received" &&
            c.contents.some((ct) => ct.productName === product.name)
        )
        .map((c) => ({
          ...c,
          rackName:
            racks.find((rack) => rack.id === c.rackId)?.name ?? "Belum dipilih",
        }))
    )

  const [editOpen, setEditOpen] = useState(false)
  const [editName, setEditName] = useState(product.name)
  const [editSku, setEditSku] = useState(product.sku)
  const [editCategory, setEditCategory] = useState(product.category)
  const [editDescription, setEditDescription] = useState(product.description)
  const [editBarcode, setEditBarcode] = useState(product.barcode)
  const [categoryOptions, setCategoryOptions] = useState(defaultCategories)
  const [newCategory, setNewCategory] = useState("")

  const handleAddCategory = () => {
    const trimmed = newCategory.trim()
    if (!trimmed) return
    if (!categoryOptions.includes(trimmed)) {
      setCategoryOptions([trimmed, ...categoryOptions])
    }
    setEditCategory(trimmed)
    setNewCategory("")
  }

  const totalStock = product.warehouses.reduce((sum, w) => sum + w.qty, 0)
  const movements = product.stockMovements ?? []

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/inventory">
            <Button variant="ghost" size="icon-sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{product.name}</h1>
            <p className="text-muted-foreground">{product.sku}</p>
          </div>
        </div>
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogTrigger render={<Button />}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Product
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogDescription>Update product information below.</DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium">SKU</label>
                <Input value={editSku} onChange={(e) => setEditSku(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <Select value={editCategory} onValueChange={(v) => setEditCategory(v ?? "")}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select or create category" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="flex items-center gap-2 p-2">
                      <Input
                        placeholder="New category"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="h-8 text-sm"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            handleAddCategory()
                          }
                        }}
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        onClick={handleAddCategory}
                        disabled={!newCategory.trim()}
                      >
                        Add
                      </Button>
                    </div>
                    {categoryOptions.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Barcode</label>
                <Input value={editBarcode} onChange={(e) => setEditBarcode(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Input value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
              </div>
            </div>
            <DialogFooter showCloseButton>
              <Button onClick={() => { alert("Product berhasil diupdate!"); setEditOpen(false); }}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">SKU</p>
                  <p className="font-sans font-medium">{product.sku}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Category</p>
                  <Badge variant="outline">{product.category}</Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant="outline" className={statusConfig[product.status].className}>
                    {statusConfig[product.status].label}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Stock</p>
                  <p className="text-2xl font-bold">{totalStock} pcs</p>
                </div>
                <div className="col-span-2 space-y-1">
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="text-sm">{product.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Stock per Warehouse / Rak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Warehouse</TableHead>
                    <TableHead>Rak</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {product.warehouses.map((wh, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{wh.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{wh.rak}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-bold">{wh.qty}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/50 font-bold">
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell className="text-right">{totalStock}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-4 w-4" />
                Stock Movement Log
              </CardTitle>
              <CardDescription>
                Riwayat pergerakan barang masuk, keluar, transfer, dan adjustment
              </CardDescription>
            </CardHeader>
            <CardContent>
              {movements.length === 0 ? (
                <p className="text-sm text-muted-foreground">Belum ada pergerakan stok.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Note</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {movements.map((mv) => {
                      const cfg = movementTypeConfig(mv.type)
                      const Icon = cfg.icon
                      return (
                        <TableRow key={mv.id}>
                          <TableCell className="text-muted-foreground">{mv.date}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={cfg.className}>
                              <Icon className="mr-1 h-3 w-3" />
                              {cfg.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-sans font-medium">
                            {mv.qty > 0 ? `+${mv.qty}` : mv.qty}
                          </TableCell>
                          <TableCell className="text-muted-foreground">{mv.source}</TableCell>
                          <TableCell className="text-muted-foreground">{mv.destination}</TableCell>
                          <TableCell className="font-sans text-xs">{mv.reference}</TableCell>
                          <TableCell className="text-sm">{mv.note}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Boxes className="h-4 w-4" />
                Box Belum Dibuka
              </CardTitle>
              <CardDescription>
                Box yang berisi produk ini dan belum dibuka.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {productBoxes.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Tidak ada box yang belum dibuka.
                </p>
              ) : (
                <div className="space-y-2">
                  {productBoxes.map((box) => (
                    <div
                      key={box.id}
                      className="flex items-center justify-between rounded border bg-white p-2"
                    >
                      <div>
                        <p className="font-sans text-xs font-medium">
                          {box.barcode}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {box.rackName}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {box.contents.reduce(
                          (sum, c) => sum + c.estimatedQty,
                          0
                        )}{" "}
                        pcs
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Barcode className="h-4 w-4" />
                Barcode
              </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="rounded-lg border bg-white p-4 text-center">
                  <p className="mb-2 font-sans text-xs text-gray-500">
                    {product.barcode}
                  </p>
                  <div className="flex justify-center gap-[1px]">
                    {product.barcode.split("").map((char, i) => (
                      <div
                        key={i}
                        className="bg-black"
                        style={{
                          width: i % 3 === 0 ? "2px" : "1px",
                          height: "40px",
                        }}
                      />
                    ))}
                  </div>
                  <div className="mt-3 border-t pt-2">
                    <p className="text-xs text-muted-foreground">Barcode Number</p>
                    <p className="font-sans text-sm font-medium">{product.barcode}</p>
                  </div>
                </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Package className="mr-2 h-4 w-4" />
                Print Barcode
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Tag className="mr-2 h-4 w-4" />
                Print Price Tag
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="mr-2 h-4 w-4" />
                Transfer Stock
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Price Tiers
              </CardTitle>
              <CardDescription>
                Multi-tier pricing for different customer segments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tier</TableHead>
                    <TableHead className="text-right">Min Qty</TableHead>
                    <TableHead className="text-right">Price (IDR)</TableHead>
                    <TableHead className="text-right">Price (USD)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {product.priceTiers.map((tier) => (
                    <TableRow key={tier.tier}>
                      <TableCell className="font-medium">{tier.tier}</TableCell>
                      <TableCell className="text-right">{tier.minQty}+</TableCell>
                      <TableCell className="text-right font-sans">
                        {formatIDR(tier.priceIDR)}
                      </TableCell>
                      <TableCell className="text-right font-sans">
                        {formatUSD(tier.priceUSD)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
