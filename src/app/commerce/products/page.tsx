"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import {
  Search,
  SlidersHorizontal,
  Star,
  Grid3X3,
  LayoutList,
  ChevronDown,
  ChevronRight,
  Droplets,
  MapPin,
  ChevronLeft,
  X,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const allProducts = [
  { id: "1", name: "SCW Snow Foam", price: 125000, originalPrice: 150000, category: "exterior", brand: "SCW", rating: 4.8, reviews: 234, inStock: true, badge: "Best Seller", sold: 1250, location: "Jakarta" },
  { id: "2", name: "SCW Ceramic Coating", price: 450000, originalPrice: null, category: "coating", brand: "SCW", rating: 4.9, reviews: 189, inStock: true, badge: "Premium", sold: 890, location: "Jakarta" },
  { id: "3", name: "SCW Interior Detailer", price: 85000, originalPrice: 95000, category: "interior", brand: "SCW", rating: 4.7, reviews: 156, inStock: true, badge: null, sold: 670, location: "Surabaya" },
  { id: "4", name: "SCW Tire Gel", price: 75000, originalPrice: null, category: "wheel-tire", brand: "SCW", rating: 4.6, reviews: 98, inStock: true, badge: null, sold: 450, location: "Bandung" },
  { id: "5", name: "SCW Clay Bar", price: 165000, originalPrice: 190000, category: "tools", brand: "SCW", rating: 4.8, reviews: 145, inStock: false, badge: "Popular", sold: 320, location: "Jakarta" },
  { id: "6", name: "SCW Polish Compound", price: 195000, originalPrice: null, category: "exterior", brand: "SCW", rating: 4.5, reviews: 76, inStock: true, badge: "New", sold: 210, location: "Yogyakarta" },
  { id: "7", name: "SCW Spray Wax", price: 135000, originalPrice: null, category: "exterior", brand: "SCW", rating: 4.6, reviews: 112, inStock: true, badge: null, sold: 580, location: "Jakarta" },
  { id: "8", name: "SCW Glass Cleaner", price: 65000, originalPrice: 75000, category: "interior", brand: "SCW", rating: 4.4, reviews: 89, inStock: true, badge: null, sold: 430, location: "Surabaya" },
  { id: "9", name: "SCW Leather Conditioner", price: 110000, originalPrice: null, category: "interior", brand: "SCW", rating: 4.7, reviews: 67, inStock: true, badge: null, sold: 310, location: "Bandung" },
  { id: "10", name: "SCW Bug Remover", price: 95000, originalPrice: null, category: "exterior", brand: "SCW", rating: 4.3, reviews: 54, inStock: true, badge: null, sold: 270, location: "Jakarta" },
  { id: "11", name: "SCW Wheel Cleaner", price: 105000, originalPrice: null, category: "wheel-tire", brand: "SCW", rating: 4.5, reviews: 82, inStock: true, badge: null, sold: 390, location: "Medan" },
  { id: "12", name: "SCW Microfiber Wash", price: 55000, originalPrice: null, category: "exterior", brand: "SCW", rating: 4.6, reviews: 198, inStock: true, badge: "Best Seller", sold: 1100, location: "Jakarta" },
  { id: "13", name: "SCW Trim Restorer", price: 89000, originalPrice: 99000, category: "interior", brand: "SCW", rating: 4.5, reviews: 45, inStock: true, badge: null, sold: 180, location: "Semarang" },
  { id: "14", name: "SCW Clay Mitt", price: 145000, originalPrice: null, category: "tools", brand: "SCW", rating: 4.7, reviews: 78, inStock: true, badge: null, sold: 250, location: "Jakarta" },
  { id: "15", name: "SCW Tire Shine", price: 72000, originalPrice: 80000, category: "wheel-tire", brand: "SCW", rating: 4.4, reviews: 65, inStock: true, badge: null, sold: 200, location: "Jakarta" },
  { id: "16", name: "SCW Detail Brush Set", price: 185000, originalPrice: null, category: "tools", brand: "SCW", rating: 4.8, reviews: 92, inStock: true, badge: "Popular", sold: 410, location: "Surabaya" },
]

const categories = [
  { label: "Semua Kategori", value: "all" },
  { label: "Exterior Care", value: "exterior" },
  { label: "Interior Care", value: "interior" },
  { label: "Wheel & Tire", value: "wheel-tire" },
  { label: "Coating & Protection", value: "coating" },
  { label: "Tools & Accessories", value: "tools" },
]

const priceRanges = [
  { label: "Semua Harga", value: "all" },
  { label: "Di bawah Rp 100.000", value: "0-100000" },
  { label: "Rp 100.000 - Rp 200.000", value: "100000-200000" },
  { label: "Di atas Rp 200.000", value: "200000-999999" },
]

const ITEMS_PER_PAGE = 12

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price)
}

function ProductCardGrid({ product }: { product: typeof allProducts[0] }) {
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0
  return (
    <Link href={`/commerce/products/${product.id}`}>
      <Card className="group overflow-hidden transition-shadow hover:shadow-lg border-orange-100">
        <div className="relative aspect-square bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
          <Droplets className="h-16 w-16 text-slate-300" />
          {discount > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs">-{discount}%</Badge>
          )}
          {product.badge && (
            <Badge variant="secondary" className="absolute top-2 right-2 bg-orange-100 text-orange-700 text-[10px]">
              {product.badge}
            </Badge>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <Badge variant="destructive" className="text-xs">Habis</Badge>
            </div>
          )}
        </div>
        <CardContent className="p-3">
          <h3 className="text-sm font-medium text-slate-900 line-clamp-2 group-hover:text-orange-500 transition-colors">
            {product.name}
          </h3>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-base font-bold text-orange-600">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          <div className="mt-1.5 flex items-center gap-1">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-xs text-slate-500">{product.rating}</span>
            <span className="text-xs text-slate-400">|</span>
            <span className="text-xs text-slate-400">{product.sold} terjual</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400 flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {product.location}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}

function ProductCardList({ product }: { product: typeof allProducts[0] }) {
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0
  return (
    <Link href={`/commerce/products/${product.id}`}>
      <Card className="group overflow-hidden transition-shadow hover:shadow-lg border-orange-100">
        <div className="flex">
          <div className="relative w-40 h-40 shrink-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
            <Droplets className="h-12 w-12 text-slate-300" />
            {discount > 0 && (
              <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs">-{discount}%</Badge>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <Badge variant="destructive" className="text-xs">Habis</Badge>
              </div>
            )}
          </div>
          <CardContent className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-900 line-clamp-1 group-hover:text-orange-500 transition-colors">
                {product.name}
              </h3>
              <div className="mt-1.5 flex items-baseline gap-2">
                <span className="text-base font-bold text-orange-600">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-xs text-slate-400 line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
              <div className="mt-1 flex items-center gap-1">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span className="text-xs text-slate-500">{product.rating}</span>
                <span className="text-xs text-slate-400">|</span>
                <span className="text-xs text-slate-400">{product.sold} terjual</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-[11px] text-slate-400 flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {product.location}
              </p>
              {product.badge && (
                <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-[10px]">{product.badge}</Badge>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  )
}

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPrice, setSelectedPrice] = useState("all")
  const [selectedRating, setSelectedRating] = useState(0)
  const [sortBy, setSortBy] = useState("popular")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    let matchesPrice = true
    if (selectedPrice !== "all") {
      const [min, max] = selectedPrice.split("-").map(Number)
      matchesPrice = product.price >= min && product.price <= max
    }
    const matchesRating = selectedRating === 0 || product.rating >= selectedRating
    return matchesCategory && matchesSearch && matchesPrice && matchesRating
  })

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case "newest": return b.id.localeCompare(a.id)
        case "price-asc": return a.price - b.price
        case "price-desc": return b.price - a.price
        case "popular": return b.sold - a.sold
        default: return 0
      }
    })
  }, [filteredProducts, sortBy])

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const activeFilterCount = [
    selectedCategory !== "all",
    selectedPrice !== "all",
    selectedRating > 0,
  ].filter(Boolean).length

  const clearAllFilters = () => {
    setSelectedCategory("all")
    setSelectedPrice("all")
    setSelectedRating(0)
    setSearchQuery("")
    setCurrentPage(1)
  }

  const FilterSidebar = () => (
    <aside className="w-full lg:w-64 shrink-0 space-y-5">
      {/* Search */}
      <div>
        <h3 className="mb-2 text-sm font-semibold text-slate-900">Cari Produk</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Ketik nama produk..."
            className="pl-9 h-9"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1) }}
          />
        </div>
      </div>

      {/* Category filter */}
      <div>
        <h3 className="mb-2 text-sm font-semibold text-slate-900">Kategori</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <div key={cat.value} className="flex items-center gap-2">
              <Checkbox
                checked={selectedCategory === cat.value}
                onCheckedChange={() => {
                  setSelectedCategory(cat.value)
                  setCurrentPage(1)
                }}
              />
              <label
                className="text-sm text-slate-600 cursor-pointer hover:text-orange-500 transition-colors"
                onClick={() => { setSelectedCategory(cat.value); setCurrentPage(1) }}
              >
                {cat.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price filter */}
      <div>
        <h3 className="mb-2 text-sm font-semibold text-slate-900">Harga</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <div key={range.value} className="flex items-center gap-2">
              <Checkbox
                checked={selectedPrice === range.value}
                onCheckedChange={() => {
                  setSelectedPrice(range.value)
                  setCurrentPage(1)
                }}
              />
              <label
                className="text-sm text-slate-600 cursor-pointer hover:text-orange-500 transition-colors"
                onClick={() => { setSelectedPrice(range.value); setCurrentPage(1) }}
              >
                {range.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Rating filter */}
      <div>
        <h3 className="mb-2 text-sm font-semibold text-slate-900">Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => { setSelectedRating(selectedRating === rating ? 0 : rating); setCurrentPage(1) }}
              className={`w-full flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${
                selectedRating === rating ? "bg-orange-50 text-orange-600" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-3 w-3 ${i < rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
                ))}
              </div>
              <span>& ke atas</span>
            </button>
          ))}
        </div>
      </div>

      {/* Clear filters */}
      {activeFilterCount > 0 && (
        <Button variant="outline" size="sm" className="w-full" onClick={clearAllFilters}>
          Hapus Semua Filter
        </Button>
      )}
    </aside>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/commerce" className="hover:text-orange-500">Beranda</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-900 font-medium">Semua Produk</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <FilterSidebar />
        </div>

        {/* Product grid area */}
        <div className="flex-1 space-y-4">
          {/* Sort bar */}
          <div className="flex items-center justify-between rounded-lg border bg-white p-3">
            <div className="flex items-center gap-2">
              {/* Mobile filter toggle */}
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowMobileFilters(true)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-1" />
                Filter
                {activeFilterCount > 0 && (
                  <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full bg-orange-500 text-white text-[10px]">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
              <span className="text-sm text-muted-foreground hidden sm:inline">Urutkan:</span>
              <Select value={sortBy} onValueChange={(v) => setSortBy(v ?? '')}>
                <SelectTrigger className="w-40 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Populer</SelectItem>
                  <SelectItem value="newest">Terbaru</SelectItem>
                  <SelectItem value="price-asc">Harga Terendah</SelectItem>
                  <SelectItem value="price-desc">Harga Tertinggi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                className={`h-8 w-8 ${viewMode === "grid" ? "bg-orange-500 text-white hover:bg-orange-600" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                className={`h-8 w-8 ${viewMode === "list" ? "bg-orange-500 text-white hover:bg-orange-600" : ""}`}
                onClick={() => setViewMode("list")}
              >
                <LayoutList className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Active filters */}
          {activeFilterCount > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-500">Filter aktif:</span>
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="gap-1 bg-orange-50 text-orange-700">
                  {categories.find(c => c.value === selectedCategory)?.label}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory("all")} />
                </Badge>
              )}
              {selectedPrice !== "all" && (
                <Badge variant="secondary" className="gap-1 bg-orange-50 text-orange-700">
                  {priceRanges.find(p => p.value === selectedPrice)?.label}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedPrice("all")} />
                </Badge>
              )}
              {selectedRating > 0 && (
                <Badge variant="secondary" className="gap-1 bg-orange-50 text-orange-700">
                  Rating {selectedRating}+
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedRating(0)} />
                </Badge>
              )}
              <button onClick={clearAllFilters} className="text-xs text-orange-500 hover:text-orange-600">
                Hapus semua
              </button>
            </div>
          )}

          {/* Results count */}
          <p className="text-sm text-slate-500">
            Menampilkan {paginatedProducts.length} dari {sortedProducts.length} produk
          </p>

          {/* Products */}
          {paginatedProducts.length === 0 ? (
            <div className="py-16 text-center">
              <Droplets className="mx-auto h-16 w-16 text-slate-200 mb-4" />
              <p className="text-lg text-slate-500">Tidak ada produk yang cocok dengan filter.</p>
              <Button variant="outline" className="mt-4" onClick={clearAllFilters}>
                Hapus Semua Filter
              </Button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
              {paginatedProducts.map((product) => (
                <ProductCardGrid key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {paginatedProducts.map((product) => (
                <ProductCardList key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  size="icon"
                  className={`h-9 w-9 ${currentPage === i + 1 ? "bg-orange-500 text-white hover:bg-orange-600" : ""}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">Filter</h2>
              <button onClick={() => setShowMobileFilters(false)}>
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            <FilterSidebar />
            <Button
              className="w-full mt-6 bg-orange-500 hover:bg-orange-600"
              onClick={() => setShowMobileFilters(false)}
            >
              Terapkan Filter
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
