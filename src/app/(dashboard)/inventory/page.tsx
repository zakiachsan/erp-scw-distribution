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
  ArrowUpDown,
  Eye,
  Filter,
} from "lucide-react"

interface Product {
  id: string
  sku: string
  name: string
  category: string
  stockQty: number
  location: string
  status: "in-stock" | "low-stock" | "out-of-stock"
  unit: string
}

const products: Product[] = [
  { id: "1", sku: "SCW-SF-001", name: "SCW Snow Foam", category: "Exterior", stockQty: 245, location: "Rak A-01", status: "in-stock", unit: "pcs" },
  { id: "2", sku: "SCW-CC-002", name: "SCW Ceramic Coating", category: "Coating", stockQty: 12, location: "Rak A-02", status: "low-stock", unit: "pcs" },
  { id: "3", sku: "SCW-ID-003", name: "SCW Interior Detailer", category: "Interior", stockQty: 180, location: "Rak B-01", status: "in-stock", unit: "pcs" },
  { id: "4", sku: "SCW-TG-004", name: "SCW Tire Gel", category: "Exterior", stockQty: 95, location: "Rak B-02", status: "in-stock", unit: "pcs" },
  { id: "5", sku: "SCW-CB-005", name: "SCW Clay Bar", category: "Prep", stockQty: 0, location: "Rak C-01", status: "out-of-stock", unit: "pcs" },
  { id: "6", sku: "SCW-MW-006", name: "SCW Microfiber Wash", category: "Wash", stockQty: 312, location: "Rak A-03", status: "in-stock", unit: "pcs" },
  { id: "7", sku: "SCW-PC-007", name: "SCW Polish Compound", category: "Correction", stockQty: 8, location: "Rak C-02", status: "low-stock", unit: "pcs" },
  { id: "8", sku: "SCW-SW-008", name: "SCW Spray Wax", category: "Protection", stockQty: 156, location: "Rak B-03", status: "in-stock", unit: "pcs" },
  { id: "9", sku: "SCW-GC-009", name: "SCW Glass Cleaner", category: "Interior", stockQty: 200, location: "Rak D-01", status: "in-stock", unit: "pcs" },
  { id: "10", sku: "SCW-LC-010", name: "SCW Leather Conditioner", category: "Interior", stockQty: 45, location: "Rak D-02", status: "in-stock", unit: "pcs" },
  { id: "11", sku: "SCW-AW-011", name: "SCW All Purpose Cleaner", category: "Wash", stockQty: 5, location: "Rak A-04", status: "low-stock", unit: "pcs" },
  { id: "12", sku: "SCW-TR-012", name: "SCW Trim Restorer", category: "Exterior", stockQty: 67, location: "Rak E-01", status: "in-stock", unit: "pcs" },
  { id: "13", sku: "SCW-BR-013", name: "SCW Brake Dust Remover", category: "Wheel", stockQty: 0, location: "Rak E-02", status: "out-of-stock", unit: "pcs" },
  { id: "14", sku: "SCW-FP-014", name: "SCW Foam Pad", category: "Tools", stockQty: 88, location: "Rak F-01", status: "in-stock", unit: "pcs" },
  { id: "15", sku: "SCW-MF-015", name: "SCW Microfiber Towel", category: "Tools", stockQty: 520, location: "Rak F-02", status: "in-stock", unit: "pcs" },
  { id: "16", sku: "SCW-DC-016", name: "SCW Dashboard Coating", category: "Interior", stockQty: 33, location: "Rak D-03", status: "in-stock", unit: "pcs" },
  { id: "17", sku: "SCW-IL-017", name: "SCW Iron Decontamination", category: "Decon", stockQty: 14, location: "Rak C-03", status: "low-stock", unit: "pcs" },
  { id: "18", sku: "SCW-SP-018", name: "SCW Shampoo Plus", category: "Wash", stockQty: 275, location: "Rak A-05", status: "in-stock", unit: "pcs" },
]

const categories = ["All", "Exterior", "Interior", "Wash", "Coating", "Prep", "Correction", "Protection", "Wheel", "Tools", "Decon"]

const statusConfig = {
  "in-stock": { label: "In Stock", className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" },
  "low-stock": { label: "Low Stock", className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" },
  "out-of-stock": { label: "Out of Stock", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
}

export default function InventoryPage() {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [addOpen, setAddOpen] = useState(false)
  const [prodName, setProdName] = useState("")
  const [prodSku, setProdSku] = useState("")
  const [prodCategory, setProdCategory] = useState("")
  const [prodStock, setProdStock] = useState("")
  const [prodLocation, setProdLocation] = useState("")
  const [productList, setProductList] = useState(products)

  const addProduct = () => {
    if (!prodName || !prodSku) return
    const newProduct: Product = {
      id: String(productList.length + 1),
      sku: prodSku,
      name: prodName,
      category: prodCategory || "General",
      stockQty: parseInt(prodStock) || 0,
      location: prodLocation || "Gudang Utama",
      status: parseInt(prodStock) > 10 ? "in-stock" : parseInt(prodStock) > 0 ? "low-stock" : "out-of-stock",
      unit: "pcs",
    }
    setProductList([newProduct, ...productList])
    setProdName("")
    setProdSku("")
    setProdCategory("")
    setProdStock("")
    setProdLocation("")
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
      return matchesSearch && matchesCategory
    })
  }, [search, categoryFilter])

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
              <Input placeholder="Product Name" value={prodName} onChange={(e) => setProdName(e.target.value)} />
              <Input placeholder="SKU" value={prodSku} onChange={(e) => setProdSku(e.target.value)} />
              <Input placeholder="Category" value={prodCategory} onChange={(e) => setProdCategory(e.target.value)} />
              <Input type="number" placeholder="Stock Qty" value={prodStock} onChange={(e) => setProdStock(e.target.value)} />
              <Input placeholder="Location (e.g. Rak A-01)" value={prodLocation} onChange={(e) => setProdLocation(e.target.value)} />
              <Button onClick={addProduct} className="w-full">Add Product</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
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
        <Card>
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
        <Card>
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
        <Card>
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
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
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
                  {categories.map((cat) => (
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
                <TableHead className="text-right">Stock Qty</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-mono text-xs">{product.sku}</TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {product.stockQty} {product.unit}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{product.location}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={statusConfig[product.status].className}
                    >
                      {statusConfig[product.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/inventory/${product.id}`}>
                      <Button variant="ghost" size="icon-sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
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
