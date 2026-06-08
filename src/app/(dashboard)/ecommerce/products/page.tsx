"use client"

import { useState, useMemo } from "react"
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
  Pencil,
  Trash2,
  Package,
  Image as ImageIcon,
} from "lucide-react"

interface Product {
  id: string
  sku: string
  name: string
  price: number
  salePrice?: number
  stock: number
  status: "published" | "draft"
  category: string
  image?: string
}

const products: Product[] = [
  { id: "1", sku: "SCW-SF-001", name: "SCW Snow Foam", price: 85000, stock: 245, status: "published", category: "Exterior" },
  { id: "2", sku: "SCW-CC-002", name: "SCW Ceramic Coating 9H", price: 450000, salePrice: 399000, stock: 12, status: "published", category: "Coating" },
  { id: "3", sku: "SCW-ID-003", name: "SCW Interior Detailer", price: 75000, stock: 180, status: "published", category: "Interior" },
  { id: "4", sku: "SCW-TG-004", name: "SCW Tire Gel Pro", price: 65000, stock: 95, status: "published", category: "Exterior" },
  { id: "5", sku: "SCW-CB-005", name: "SCW Clay Bar Kit", price: 120000, stock: 0, status: "draft", category: "Preparation" },
  { id: "6", sku: "SCW-MW-006", name: "SCW Microfiber Wash Mitt", price: 45000, stock: 312, status: "published", category: "Tools" },
  { id: "7", sku: "SCW-PC-007", name: "SCW Polish Compound", price: 150000, stock: 8, status: "published", category: "Correction" },
  { id: "8", sku: "SCW-SW-008", name: "SCW Spray Wax Quick Detail", price: 95000, stock: 156, status: "published", category: "Protection" },
  { id: "9", sku: "SCW-GC-009", name: "SCW Glass Cleaner", price: 55000, stock: 200, status: "published", category: "Interior" },
  { id: "10", sku: "SCW-LC-010", name: "SCW Leather Conditioner", price: 110000, stock: 45, status: "published", category: "Interior" },
  { id: "11", sku: "SCW-APC-011", name: "SCW All Purpose Cleaner", price: 70000, stock: 5, status: "draft", category: "Wash" },
  { id: "12", sku: "SCW-TR-012", name: "SCW Trim Restorer", price: 85000, stock: 67, status: "published", category: "Exterior" },
  { id: "13", sku: "SCW-BDR-013", name: "SCW Brake Dust Remover", price: 60000, stock: 0, status: "draft", category: "Wheel" },
  { id: "14", sku: "SCW-FP-014", name: "SCW Foam Applicator Pad", price: 35000, stock: 88, status: "published", category: "Tools" },
  { id: "15", sku: "SCW-MFT-015", name: "SCW Microfiber Towel Set", price: 55000, stock: 520, status: "published", category: "Tools" },
  { id: "16", sku: "SCW-DC-016", name: "SCW Dashboard Coating", price: 90000, stock: 33, status: "published", category: "Interior" },
  { id: "17", sku: "SCW-IDC-017", name: "SCW Iron Decontamination", price: 130000, stock: 14, status: "draft", category: "Decontamination" },
  { id: "18", sku: "SCW-SP-018", name: "SCW Shampoo Plus", price: 65000, stock: 275, status: "published", category: "Wash" },
  { id: "19", sku: "SCW-CC2-019", name: "SCW Ceramic Coating Maintenance", price: 280000, stock: 42, status: "published", category: "Coating" },
  { id: "20", sku: "SCW-WS-020", name: "SCW Wheel Sealant", price: 115000, stock: 78, status: "published", category: "Wheel" },
]

const formatRupiah = (amount: number) =>
  `Rp ${amount.toLocaleString("id-ID")}`

const statusConfig = {
  published: { label: "Publik", className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" },
  draft: { label: "Draft", className: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400" },
}

const stockStatus = (stock: number) => {
  if (stock === 0) return { label: "Habis", className: "bg-red-100 text-red-800" }
  if (stock < 20) return { label: "Rendah", className: "bg-amber-100 text-amber-800" }
  return { label: "Tersedia", className: "bg-emerald-100 text-emerald-800" }
}

export default function ProductsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase())
      const matchesStatus =
        statusFilter === "all" || p.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [search, statusFilter])

  const totalProducts = products.length
  const publishedCount = products.filter((p) => p.status === "published").length
  const draftCount = products.filter((p) => p.status === "draft").length
  const outOfStockCount = products.filter((p) => p.stock === 0).length

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Product Catalog</h1>
          <p className="text-muted-foreground">
            Kelola katalog produk WebCommerce
          </p>
        </div>
        <Link href="/ecommerce/products/new">
          <Button className="bg-orange-600 hover:bg-orange-700">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Produk
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30">
                <Package className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Produk</p>
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
                <p className="text-sm text-muted-foreground">Published</p>
                <p className="text-2xl font-bold">{publishedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-900/30">
                <Package className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Draft</p>
                <p className="text-2xl font-bold">{draftCount}</p>
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
                <p className="text-sm text-muted-foreground">Stok Habis</p>
                <p className="text-2xl font-bold">{outOfStockCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cari produk..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? '')}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Daftar Produk ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produk</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead>Stok</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((product) => {
                const ss = stockStatus(product.stock)
                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50 dark:bg-orange-950/20 border">
                          <ImageIcon className="h-6 w-6 text-orange-400" />
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground font-mono">{product.sku}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{formatRupiah(product.price)}</p>
                        {product.salePrice && (
                          <p className="text-xs text-red-500 line-through">
                            {formatRupiah(product.salePrice)}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{product.stock}</p>
                        <Badge variant="outline" className={`text-xs ${ss.className}`}>
                          {ss.label}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusConfig[product.status].className}>
                        {statusConfig[product.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{product.category}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/ecommerce/products/${product.id}/edit`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-700"
                          onClick={() => setDeleteId(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Tidak ada produk ditemukan
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
