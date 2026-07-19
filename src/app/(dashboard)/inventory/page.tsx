"use client"

import { useState, useMemo } from "react"
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
  Search,
  Plus,
  Package,
  Filter,
} from "lucide-react"

interface Product {
  id: string
  sku: string
  name: string
  category: string
  stockQty: number
  jenis: "Barang Jadi" | "Barang Setengah Jadi" | "Bahan Baku"
  status: "in-stock" | "low-stock" | "out-of-stock"
  unit: string
  barcode?: string
  weight: string
}

const products: Product[] = [
  { id: "1", sku: "SCW-SF-001", name: "SCW Snow Foam", category: "Liquid", stockQty: 245, jenis: "Barang Jadi", status: "in-stock", unit: "pcs", weight: "0.5 kg" },
  { id: "2", sku: "SCW-CC-002", name: "SCW Ceramic Coating", category: "Coatings", stockQty: 12, jenis: "Barang Jadi", status: "low-stock", unit: "pcs", weight: "0.5 kg" },
  { id: "3", sku: "SCW-ID-003", name: "SCW Interior Detailer", category: "Liquid", stockQty: 180, jenis: "Barang Jadi", status: "in-stock", unit: "pcs", weight: "0.4 kg" },
  { id: "4", sku: "SCW-TG-004", name: "SCW Tire Gel", category: "Liquid", stockQty: 95, jenis: "Barang Jadi", status: "in-stock", unit: "pcs", weight: "0.3 kg" },
  { id: "5", sku: "SCW-CB-005", name: "SCW Clay Bar", category: "Accesories", stockQty: 0, jenis: "Barang Jadi", status: "out-of-stock", unit: "pcs", weight: "0.1 kg" },
  { id: "6", sku: "SCW-MW-006", name: "SCW Microfiber Wash", category: "Liquid", stockQty: 312, jenis: "Barang Jadi", status: "in-stock", unit: "pcs", weight: "0.3 kg" },
  { id: "7", sku: "SCW-PC-007", name: "SCW Polish Compound", category: "Liquid", stockQty: 8, jenis: "Barang Jadi", status: "low-stock", unit: "pcs", weight: "0.8 kg" },
  { id: "8", sku: "SCW-SW-008", name: "SCW Spray Wax", category: "Wax", stockQty: 156, jenis: "Barang Jadi", status: "in-stock", unit: "pcs", weight: "0.3 kg" },
  { id: "9", sku: "SCW-GC-009", name: "SCW Glass Cleaner", category: "Liquid", stockQty: 200, jenis: "Barang Jadi", status: "in-stock", unit: "pcs", weight: "0.4 kg" },
  { id: "10", sku: "SCW-LC-010", name: "SCW Leather Conditioner", category: "Liquid", stockQty: 45, jenis: "Barang Jadi", status: "in-stock", unit: "pcs", weight: "0.3 kg" },
  { id: "11", sku: "SCW-AW-011", name: "SCW All Purpose Cleaner", category: "Liquid", stockQty: 5, jenis: "Barang Setengah Jadi", status: "low-stock", unit: "pcs", weight: "0.5 kg" },
  { id: "12", sku: "SCW-TR-012", name: "SCW Trim Restorer", category: "Liquid", stockQty: 67, jenis: "Barang Jadi", status: "in-stock", unit: "pcs", weight: "0.3 kg" },
  { id: "13", sku: "SCW-BR-013", name: "SCW Brake Dust Remover", category: "Liquid", stockQty: 0, jenis: "Barang Jadi", status: "out-of-stock", unit: "pcs", weight: "0.6 kg" },
  { id: "14", sku: "SCW-FP-014", name: "SCW Foam Pad", category: "Accesories", stockQty: 88, jenis: "Barang Jadi", status: "in-stock", unit: "pcs", weight: "0.05 kg" },
  { id: "15", sku: "SCW-MF-015", name: "SCW Microfiber Towel", category: "Accesories", stockQty: 520, jenis: "Barang Jadi", status: "in-stock", unit: "pcs", weight: "0.05 kg" },
  { id: "16", sku: "SCW-DC-016", name: "SCW Dashboard Coating", category: "Coatings", stockQty: 33, jenis: "Barang Setengah Jadi", status: "in-stock", unit: "pcs", weight: "0.3 kg" },
  { id: "17", sku: "SCW-IL-017", name: "SCW Iron Decontamination", category: "Liquid", stockQty: 14, jenis: "Barang Jadi", status: "low-stock", unit: "pcs", weight: "0.5 kg" },
  { id: "18", sku: "SCW-SP-018", name: "SCW Shampoo Plus", category: "Liquid", stockQty: 275, jenis: "Barang Setengah Jadi", status: "in-stock", unit: "pcs", weight: "0.5 kg" },
]

const categories = ["Liquid", "Coatings", "Accesories", "PPF", "SPPF", "Machine", "Wax", "Training"]
const categoryFilterOptions = ["All", ...categories]

const statusConfig = {
  "in-stock": { label: "In Stock", className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" },
  "low-stock": { label: "Low Stock", className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" },
  "out-of-stock": { label: "Out of Stock", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
}

export default function InventoryPage() {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState<"all" | "in-stock" | "low-stock" | "out-of-stock">("all")
  const [addOpen, setAddOpen] = useState(false)
  const [prodName, setProdName] = useState("")
  const [prodSku, setProdSku] = useState("")
  const [prodCategory, setProdCategory] = useState("")
  const [prodStock, setProdStock] = useState("")
  const [prodJenis, setProdJenis] = useState<"Barang Jadi" | "Barang Setengah Jadi" | "Bahan Baku" | "">("")
  const [prodWeight, setProdWeight] = useState("")
  const [prodBarcode, setProdBarcode] = useState("")
  const [productList, setProductList] = useState(products)
  const [categoryOptions, setCategoryOptions] = useState(categories)
  const [newCategory, setNewCategory] = useState("")

  const handleAddCategory = () => {
    const trimmed = newCategory.trim()
    if (!trimmed) return
    if (!categoryOptions.includes(trimmed)) {
      setCategoryOptions([trimmed, ...categoryOptions])
    }
    setProdCategory(trimmed)
    setNewCategory("")
  }

  const addProduct = () => {
    if (!prodName || !prodSku) return
    const newProduct: Product = {
      id: String(productList.length + 1),
      sku: prodSku,
      name: prodName,
      category: prodCategory || "General",
      stockQty: parseInt(prodStock) || 0,
      jenis: (prodJenis || "Barang Jadi") as "Barang Jadi",
      status: parseInt(prodStock) > 10 ? "in-stock" : parseInt(prodStock) > 0 ? "low-stock" : "out-of-stock",
      unit: "pcs",
      weight: prodWeight || "0 kg",
      barcode: prodBarcode.trim() || `SCW-${prodSku}`,
    }
    setProductList([newProduct, ...productList])
    setProdName("")
    setProdSku("")
    setProdCategory("")
    setProdStock("")
    setProdJenis("")
    setProdWeight("")
    setProdBarcode("")
    setAddOpen(false)
    alert("Produk berhasil ditambahkan!")
  }

  const filtered = useMemo(() => {
    return productList.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase())
      const matchesCategory =
        categoryFilter === "All" || p.category === categoryFilter
      const matchesStatus =
        statusFilter === "all" || p.status === statusFilter
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [search, categoryFilter, productList, statusFilter])

  const totalProducts = products.length
  const inStockCount = products.filter((p) => p.status === "in-stock").length
  const lowStockCount = products.filter((p) => p.status === "low-stock").length
  const outOfStockCount = products.filter((p) => p.status === "out-of-stock").length

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inventory</h1>
          <p className="text-muted-foreground">
            Manage your product catalog and stock levels
          </p>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger render={<Button />}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-1">
                <Label>Product Name</Label>
                <Input placeholder="Product Name" value={prodName} onChange={(e) => setProdName(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label>SKU</Label>
                <Input placeholder="SKU" value={prodSku} onChange={(e) => setProdSku(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label>Category</Label>
                <Select value={prodCategory} onValueChange={(v) => setProdCategory(v ?? "")}>
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
              <div className="space-y-1">
                <Label>Stock Qty</Label>
                <Input type="number" placeholder="Stock Qty" value={prodStock} onChange={(e) => setProdStock(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label>Jenis Produk *</Label>
                <Select value={prodJenis} onValueChange={(v) => setProdJenis(v as any)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih jenis produk" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Barang Jadi">Barang Jadi</SelectItem>
                    <SelectItem value="Barang Setengah Jadi">Barang Setengah Jadi</SelectItem>
                    <SelectItem value="Bahan Baku">Bahan Baku</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Barcode</Label>
                <Input placeholder="Barcode number" value={prodBarcode} onChange={(e) => setProdBarcode(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label>Weight</Label>
                <Input placeholder="e.g. 0.5 kg" value={prodWeight} onChange={(e) => setProdWeight(e.target.value)} />
              </div>
              <Button onClick={addProduct} className="w-full">Add Product</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card
          className={`cursor-pointer transition-shadow hover:shadow-md ${statusFilter === "all" ? "ring-2 ring-indigo-500" : ""}`}
          onClick={() => setStatusFilter("all")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                <Package className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold">{totalProducts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-shadow hover:shadow-md ${statusFilter === "in-stock" ? "ring-2 ring-emerald-500" : ""}`}
          onClick={() => setStatusFilter("in-stock")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <Package className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In Stock</p>
                <p className="text-2xl font-bold text-emerald-600">{inStockCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-shadow hover:shadow-md ${statusFilter === "low-stock" ? "ring-2 ring-amber-500" : ""}`}
          onClick={() => setStatusFilter("low-stock")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                <Package className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Low Stock</p>
                <p className="text-2xl font-bold text-amber-600">{lowStockCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-shadow hover:shadow-md ${statusFilter === "out-of-stock" ? "ring-2 ring-red-500" : ""}`}
          onClick={() => setStatusFilter("out-of-stock")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                <Package className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">{outOfStockCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Product List</CardTitle>
              <CardDescription>
                {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
                {statusFilter !== "all" && (
                  <span className="ml-1 capitalize">({statusFilter.replace("-", " ")})</span>
                )}
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              {statusFilter !== "all" && (
                <Button variant="outline" size="sm" onClick={() => setStatusFilter("all")}>
                  Clear filter
                </Button>
              )}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search SKU or name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-64 pl-9"
                />
              </div>
              <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v ?? "All")}>
                <SelectTrigger className="w-40">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryFilterOptions.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead className="text-right">Stock Qty</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((product) => (
                <TableRow
                  key={product.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => window.location.href = `/inventory/${product.id}`}
                >
                  <TableCell className="font-sans text-xs">
                    <Link
                      href={`/inventory/${product.id}`}
                      className="text-blue-600 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {product.sku}
                    </Link>
                  </TableCell>
                  <TableCell className="font-medium">
                    {product.name}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.jenis}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {product.stockQty} {product.unit}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={statusConfig[product.status].className}
                    >
                      {statusConfig[product.status].label}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
