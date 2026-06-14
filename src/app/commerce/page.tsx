"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import {
  Droplets,
  Sparkles,
  Shield,
  ArrowRight,
  Star,
  Truck,
  BadgeCheck,
  HeadphonesIcon,
  ChevronLeft,
  ChevronRight,
  Zap,
  Clock,
  Car,
  Paintbrush,
  Wrench,
  CircleDot,
  Store,
  MapPin,
  Phone,
  MessageCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const banners = [
  {
    id: 1,
    title: "Flash Sale Spesial!",
    subtitle: "Diskon hingga 50% untuk produk coating pilihan",
    cta: "Beli Sekarang",
    gradient: "from-orange-500 via-red-500 to-pink-500",
    tag: "LIMITED TIME",
  },
  {
    id: 2,
    title: "Koleksi Baru 2024",
    subtitle: "Produk detailing terbaru untuk perawatan mobil Anda",
    cta: "Jelajahi",
    gradient: "from-indigo-600 via-purple-600 to-blue-600",
    tag: "NEW ARRIVAL",
  },
  {
    id: 3,
    title: "Gratis Ongkir!",
    subtitle: "Untuk semua pembelian di atas Rp 500.000",
    cta: "Belanja Sekarang",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    tag: "FREE SHIPPING",
  },
]

const categories = [
  { name: "Exterior", slug: "exterior", icon: Droplets, color: "bg-blue-50 text-blue-600", border: "border-blue-200", count: 24 },
  { name: "Interior", slug: "interior", icon: Sparkles, color: "bg-emerald-50 text-emerald-600", border: "border-emerald-200", count: 18 },
  { name: "Wheel", slug: "wheel-tire", icon: CircleDot, color: "bg-orange-50 text-orange-600", border: "border-orange-200", count: 12 },
  { name: "Coating", slug: "coating", icon: Shield, color: "bg-purple-50 text-purple-600", border: "border-purple-200", count: 15 },
  { name: "Tools", slug: "tools", icon: Wrench, color: "bg-slate-50 text-slate-600", border: "border-slate-200", count: 30 },
  { name: "Wash", slug: "wash", icon: Paintbrush, color: "bg-pink-50 text-pink-600", border: "border-pink-200", count: 10 },
]

const flashSaleProducts = [
  { id: "fs1", name: "SCW Snow Foam", price: 75000, originalPrice: 125000, sold: 189, total: 250, stock: 61 },
  { id: "fs2", name: "SCW Spray Wax", price: 67500, originalPrice: 135000, sold: 220, total: 300, stock: 80 },
  { id: "fs3", name: "SCW Glass Cleaner", price: 37500, originalPrice: 75000, sold: 156, total: 200, stock: 44 },
  { id: "fs4", name: "SCW Tire Gel", price: 45000, originalPrice: 75000, sold: 134, total: 200, stock: 66 },
]

const featuredProducts = [
  { id: "1", name: "SCW Snow Foam", price: 125000, originalPrice: 150000, rating: 4.8, reviews: 234, sold: 1250, badge: "Best Seller", location: "Jakarta" },
  { id: "2", name: "SCW Ceramic Coating", price: 450000, originalPrice: null, rating: 4.9, reviews: 189, sold: 890, badge: "Premium", location: "Jakarta" },
  { id: "3", name: "SCW Interior Detailer", price: 85000, originalPrice: 95000, rating: 4.7, reviews: 156, sold: 670, badge: null, location: "Surabaya" },
  { id: "4", name: "SCW Tire Gel", price: 75000, originalPrice: null, rating: 4.6, reviews: 98, sold: 450, badge: null, location: "Bandung" },
  { id: "5", name: "SCW Clay Bar", price: 165000, originalPrice: 190000, rating: 4.8, reviews: 145, sold: 320, badge: "Popular", location: "Jakarta" },
  { id: "6", name: "SCW Polish Compound", price: 195000, originalPrice: null, rating: 4.5, reviews: 76, sold: 210, badge: "New", location: "Yogyakarta" },
]

const rekomendasiProducts = [
  { id: "7", name: "SCW Spray Wax", price: 135000, originalPrice: null, rating: 4.6, reviews: 112, sold: 580, location: "Jakarta", badge: null as string | null },
  { id: "8", name: "SCW Glass Cleaner", price: 65000, originalPrice: 75000, rating: 4.4, reviews: 89, sold: 430, location: "Surabaya", badge: null as string | null },
  { id: "9", name: "SCW Leather Conditioner", price: 110000, originalPrice: null, rating: 4.7, reviews: 67, sold: 310, location: "Bandung", badge: null as string | null },
  { id: "10", name: "SCW Bug Remover", price: 95000, originalPrice: null, rating: 4.3, reviews: 54, sold: 270, location: "Jakarta", badge: null as string | null },
  { id: "11", name: "SCW Wheel Cleaner", price: 105000, originalPrice: null, rating: 4.5, reviews: 82, sold: 390, location: "Medan", badge: null as string | null },
  { id: "12", name: "SCW Microfiber Wash", price: 55000, originalPrice: null, rating: 4.6, reviews: 198, sold: 1100, location: "Jakarta", badge: "Best Seller" },
  { id: "13", name: "SCW Trim Restorer", price: 89000, originalPrice: 99000, rating: 4.5, reviews: 45, sold: 180, location: "Semarang", badge: null as string | null },
  { id: "14", name: "SCW Clay Mitt", price: 145000, originalPrice: null, rating: 4.7, reviews: 78, sold: 250, location: "Jakarta", badge: null as string | null },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price)
}

function HeroCarousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const banner = banners[current]

  return (
    <section className="relative overflow-hidden">
      <div className={`relative bg-gradient-to-r ${banner.gradient} transition-all duration-700`}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRhMiAyIDAgMSAxLTQgMCAyIDIgMCAwIDEgNCAwIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:py-20">
          <div className="max-w-2xl space-y-5">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              {banner.tag}
            </Badge>
            <h1 className="text-3xl font-bold text-white sm:text-5xl leading-tight">
              {banner.title}
            </h1>
            <p className="text-lg text-white/90 max-w-lg">{banner.subtitle}</p>
            <Link href="/commerce/products">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90 font-semibold">
                {banner.cta}
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {/* Navigation arrows */}
      <button
        onClick={() => setCurrent((prev) => (prev - 1 + banners.length) % banners.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % banners.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${i === current ? "w-6 bg-white" : "w-2 bg-white/50"}`}
          />
        ))}
      </div>
    </section>
  )
}

function FlashSaleSection() {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 30 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev
        seconds--
        if (seconds < 0) { seconds = 59; minutes-- }
        if (minutes < 0) { minutes = 59; hours-- }
        if (hours < 0) { hours = 0; minutes = 0; seconds = 0 }
        return { hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const pad = (n: number) => n.toString().padStart(2, "0")

  return (
    <section className="mx-auto max-w-7xl px-4">
      <div className="rounded-xl bg-gradient-to-r from-orange-500 to-red-500 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <Zap className="h-6 w-6 text-white fill-white" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">Flash Sale</h2>
          </div>
          <div className="flex items-center gap-2 text-white text-sm font-medium">
            <Clock className="h-4 w-4" />
            <span>Berakhir dalam</span>
            <div className="flex items-center gap-1">
              <span className="bg-white/20 rounded px-2 py-0.5 font-sans">{pad(timeLeft.hours)}</span>
              <span>:</span>
              <span className="bg-white/20 rounded px-2 py-0.5 font-sans">{pad(timeLeft.minutes)}</span>
              <span>:</span>
              <span className="bg-white/20 rounded px-2 py-0.5 font-sans">{pad(timeLeft.seconds)}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {flashSaleProducts.map((product) => {
            const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
            const progress = (product.sold / product.total) * 100
            return (
              <Link key={product.id} href={`/commerce/products/${product.id}`}>
                <div className="bg-white rounded-lg p-3 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center mb-2">
                    <Droplets className="h-10 w-10 text-slate-300" />
                    <Badge className="absolute top-1 left-1 bg-red-500 text-white text-[10px] px-1.5 py-0">-{discount}%</Badge>
                  </div>
                  <p className="text-xs font-bold text-red-600">{formatPrice(product.price)}</p>
                  <p className="text-[10px] text-slate-400 line-through">{formatPrice(product.originalPrice)}</p>
                  <div className="mt-1.5 h-4 bg-orange-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full flex items-center justify-center" style={{ width: `${progress}%` }}>
                      <span className="text-[9px] text-white font-medium">{product.sold} terjual</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
        <div className="mt-4 text-center">
          <Link href="/commerce/products">
            <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              Lihat Semua Flash Sale
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Kategori</h2>
        <Link href="/commerce/products" className="text-sm text-orange-500 hover:text-orange-600 font-medium">
          Lihat Semua
        </Link>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <Link
              key={cat.slug}
              href={`/commerce/products?category=${cat.slug}`}
              className="flex flex-col items-center gap-2 rounded-xl border bg-white p-4 text-center hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${cat.color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium text-slate-700">{cat.name}</span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

function ProductCard({ product, showDiscount = true }: { product: typeof featuredProducts[0]; showDiscount?: boolean }) {
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0
  return (
    <Link href={`/commerce/products/${product.id}`}>
      <Card className="group overflow-hidden transition-shadow hover:shadow-lg border-orange-100">
        <div className="relative aspect-square bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
          <Droplets className="h-16 w-16 text-slate-300" />
          {showDiscount && discount > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs">-{discount}%</Badge>
          )}
          {product.badge && (
            <Badge variant="secondary" className="absolute top-2 right-2 bg-orange-100 text-orange-700 text-xs">
              {product.badge}
            </Badge>
          )}
        </div>
        <CardContent className="p-3">
          <h3 className="font-medium text-sm text-slate-900 line-clamp-2 group-hover:text-orange-500 transition-colors">
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

function StoreInfoSection() {
  return (
    <section className="mx-auto max-w-7xl px-4">
      <div className="rounded-xl border bg-white p-6">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-orange-500 text-xl font-bold text-white">
              SCW
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">SCW Distribution</h3>
              <p className="text-sm text-slate-500">Premium Car Detailing & Coating Specialists</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-slate-500">4.9 (2.5rb rating)</span>
                <span className="text-xs text-slate-400">|</span>
                <span className="text-xs text-slate-500">10rb+ pengikut</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 sm:ml-auto">
            <Link href="/commerce/products">
              <Button variant="outline" size="sm" className="border-orange-200 text-orange-600 hover:bg-orange-50">
                <Store className="h-4 w-4 mr-1" />
                Kunjungi Toko
              </Button>
            </Link>
            <Button variant="outline" size="sm" className="border-slate-200">
              <MessageCircle className="h-4 w-4 mr-1" />
              Chat Penjual
            </Button>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-orange-600">12rb+</p>
            <p className="text-xs text-slate-500">Produk Terjual</p>
          </div>
          <div>
            <p className="text-lg font-bold text-orange-600">4.9</p>
            <p className="text-xs text-slate-500">Rating Toko</p>
          </div>
          <div>
            <p className="text-lg font-bold text-orange-600">98%</p>
            <p className="text-xs text-slate-500">Tingkat Kepuasan</p>
          </div>
          <div>
            <p className="text-lg font-bold text-orange-600">9rb+</p>
            <p className="text-xs text-slate-500">Rating Bintang 5</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function CommerceHomePage() {
  return (
    <div className="space-y-8">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Trust badges */}
      <section className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: Truck, title: "Gratis Ongkir", desc: "Pembelian Rp 500rb+" },
            { icon: BadgeCheck, title: "100% Original", desc: "Garansi produk asli" },
            { icon: HeadphonesIcon, title: "Layanan Pelanggan", desc: "Chat dengan ahli detailing" },
            { icon: Shield, title: "Pengembalian Mudah", desc: "Retur dalam 7 hari" },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-3 rounded-lg border bg-white p-3 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50">
                <item.icon className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Flash Sale */}
      <FlashSaleSection />

      {/* Categories */}
      <CategoryGrid />

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Produk Unggulan</h2>
          <Link href="/commerce/products" className="text-sm text-orange-500 hover:text-orange-600 font-medium">
            Lihat Semua
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Rekomendasi */}
      <section className="mx-auto max-w-7xl px-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Rekomendasi Untukmu</h2>
          <Link href="/commerce/products" className="text-sm text-orange-500 hover:text-orange-600 font-medium">
            Lihat Semua
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {rekomendasiProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Store Info */}
      <StoreInfoSection />

      {/* Spacer */}
      <div className="h-4" />
    </div>
  )
}
