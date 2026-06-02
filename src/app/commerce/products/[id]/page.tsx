"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  ChevronRight,
  Droplets,
  MessageCircle,
  ThumbsUp,
  Store,
  MapPin,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

const productData: Record<string, {
  id: string; name: string; price: number; originalPrice: number | null; description: string
  category: string; brand: string; rating: number; reviews: number; inStock: boolean
  stockCount: number; sold: number; features: string[]
  specifications: { label: string; value: string }[]; badge: string | null
  variations: { type: string; options: string[] }[]
}> = {
  "1": {
    id: "1", name: "SCW Snow Foam", price: 125000, originalPrice: 150000, category: "Exterior Care",
    brand: "SCW Distribution", rating: 4.8, reviews: 234, inStock: true, stockCount: 45, sold: 1250, badge: "Best Seller",
    description: "SCW Snow Foam adalah busa pre-wash premium yang aman mengangkat kotoran, debu, dan film kendaraan dari permukaan. Formula yang tebal dan lengket memastikan waktu kontak maksimal untuk pembersihan efektif tanpa goresan. Aman untuk semua permukaan eksterior termasuk cat, krom, kaca, dan trim plastik.",
    features: ["Busa tebal dan lengket untuk daya pembersihan maksimal", "Formula pH netral - aman untuk wax dan sealant", "Aroma segar yang menyenangkan", "Rasio encer: 1:500 untuk foam cannon, 1:20 untuk ember cuci"],
    specifications: [{ label: "Volume", value: "1 Liter" }, { label: "pH Level", value: "7.0 (Netral)" }, { label: "Dilution", value: "1:500 (foam cannon)" }, { label: "Aroma", value: "Fresh" }, { label: "Warna", value: "Biru" }],
    variations: [{ type: "Ukuran", options: ["500ml", "1 Liter", "5 Liter"] }],
  },
  "2": {
    id: "2", name: "SCW Ceramic Coating", price: 450000, originalPrice: null, category: "Coating & Protection",
    brand: "SCW Distribution", rating: 4.9, reviews: 189, inStock: true, stockCount: 28, sold: 890, badge: "Premium",
    description: "SCW Ceramic Coating memberikan lapisan pelindung yang tahan lama dan hidrofobik untuk cat kendaraan Anda. Formula SiO2 canggih kami menciptakan kilau mirror-like yang tahan terhadap kerusakan UV, etching kimia, dan kontaminan lingkungan.",
    features: ["Teknologi keramik SiO2 canggih", "Efek water beading hidrofobik", "Tahan UV dan kimia", "Daya tahan hingga 12 bulan", "Kilau mirror-like"],
    specifications: [{ label: "Volume", value: "30ml" }, { label: "Bahan Aktif", value: "SiO2" }, { label: "Daya Tahan", value: "Hingga 12 bulan" }, { label: "Cakupan", value: "1 kendaraan penuh" }, { label: "Waktu Pengeringan", value: "24 jam" }],
    variations: [{ type: "Ukuran", options: ["15ml", "30ml", "50ml"] }],
  },
}

const defaultProduct = {
  id: "0", name: "SCW Product", price: 100000, originalPrice: null, category: "Exterior Care",
  brand: "SCW Distribution", rating: 4.5, reviews: 100, inStock: true, stockCount: 20, sold: 500, badge: null,
  description: "Produk detailing premium dari SCW Distribution. Formula profesional yang dirancang untuk penggemar otomotif dan detailer profesional.",
  features: ["Formula profesional", "Aman untuk semua permukaan kendaraan", "Mudah diaplikasi dan dihapus"],
  specifications: [{ label: "Volume", value: "500ml" }, { label: "Brand", value: "SCW Distribution" }],
  variations: [{ type: "Ukuran", options: ["250ml", "500ml"] }],
}

const reviewsData = [
  { id: 1, user: "Budi Santoso", rating: 5, date: "2024-12-10", comment: "Produk sangat bagus! Mobil saya jadi bersih mengkilap. Busanya sangat tebal dan efektif membersihkan kotoran membandel.", helpful: 24 },
  { id: 2, user: "Rina Wati", rating: 4, date: "2024-12-08", comment: "Hasilnya memuaskan, wanginya enak. Cuman agak mahal sih, tapi sebanding dengan kualitasnya.", helpful: 18 },
  { id: 3, user: "Andi Prasetyo", rating: 5, date: "2024-12-05", comment: "Sudah pakai 3 bulan, hasilnya konsisten. Recommended banget untuk yang suka cuci mobil sendiri.", helpful: 31 },
]

const discussionsData = [
  { id: 1, user: "Hendra", date: "2024-12-12", question: "Ini aman untuk cat warna gelap nggak?", answer: "Ya, aman untuk semua warna cat. Formula pH netral kami tidak merusak lapisan cat.", answeredBy: "SCW Official" },
  { id: 2, user: "Dewi", date: "2024-12-11", question: "Bisa dipakai untuk motor juga nggak?", answer: "Bisa, produk kami aman untuk kendaraan roda dua maupun roda empat.", answeredBy: "SCW Official" },
]

const relatedProducts = [
  { id: "7", name: "SCW Spray Wax", price: 135000, originalPrice: null, rating: 4.6, reviews: 112, sold: 580 },
  { id: "12", name: "SCW Microfiber Wash", price: 55000, originalPrice: null, rating: 4.6, reviews: 198, sold: 1100 },
  { id: "6", name: "SCW Polish Compound", price: 195000, originalPrice: null, rating: 4.5, reviews: 76, sold: 210 },
  { id: "10", name: "SCW Bug Remover", price: 95000, originalPrice: null, rating: 4.3, reviews: 54, sold: 270 },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency", currency: "IDR", minimumFractionDigits: 0,
  }).format(price)
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = React.use(params)
  const product = productData[id] || { ...defaultProduct, id }
  const [quantity, setQuantity] = useState(1)
  const [selectedVariation, setSelectedVariation] = useState<string>(product.variations[0]?.options[0] || "")
  const [activeImage, setActiveImage] = useState(0)
  const [newReview, setNewReview] = useState("")
  const [newQuestion, setNewQuestion] = useState("")

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const images = [0, 1, 2, 3, 4]

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/commerce" className="hover:text-orange-500">Beranda</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/commerce/products" className="hover:text-orange-500">Produk</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-900 font-medium">{product.name}</span>
      </nav>

      {/* Product detail */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Image Gallery */}
        <div className="space-y-3">
          {/* Main image */}
          <div className="relative aspect-square rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center border">
            <Droplets className="h-32 w-32 text-slate-300" />
            {product.badge && (
              <Badge className="absolute left-4 top-4 bg-orange-500">{product.badge}</Badge>
            )}
            {discount > 0 && (
              <Badge className="absolute right-4 top-4 bg-red-500">-{discount}%</Badge>
            )}
          </div>
          {/* Thumbnails */}
          <div className="flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-16 h-16 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center border-2 transition-colors ${
                  activeImage === i ? "border-orange-500" : "border-transparent hover:border-slate-300"
                }`}
              >
                <Droplets className="h-6 w-6 text-slate-300" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-5">
          {/* Name & rating */}
          <div>
            <p className="text-sm text-muted-foreground mb-1">{product.brand} · {product.category}</p>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">{product.name}</h1>
            <div className="mt-2 flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating}</span>
              <span className="text-sm text-slate-400">|</span>
              <span className="text-sm text-muted-foreground">{product.reviews} ulasan</span>
              <span className="text-sm text-slate-400">|</span>
              <span className="text-sm text-muted-foreground">{product.sold} terjual</span>
            </div>
          </div>

          {/* Price box */}
          <div className="rounded-xl bg-orange-50 p-4 border border-orange-100">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-orange-600">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-slate-400 line-through">{formatPrice(product.originalPrice)}</span>
                  <Badge className="bg-red-500 text-white">-{discount}%</Badge>
                </>
              )}
            </div>
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2">
            {product.inStock ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-700 font-medium">Stok: {product.stockCount} tersedia</span>
              </>
            ) : (
              <>
                <span className="text-sm text-red-600 font-medium">Stok habis</span>
              </>
            )}
          </div>

          {/* Variations */}
          {product.variations.map((variation) => (
            <div key={variation.type}>
              <p className="text-sm font-medium text-slate-900 mb-2">{variation.type}</p>
              <div className="flex flex-wrap gap-2">
                {variation.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedVariation(option)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                      selectedVariation === option
                        ? "border-orange-500 bg-orange-50 text-orange-600"
                        : "border-slate-200 text-slate-600 hover:border-orange-300"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Quantity */}
          <div>
            <p className="text-sm font-medium text-slate-900 mb-2">Jumlah</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-lg border">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-10 w-10 items-center justify-center hover:bg-slate-50 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="flex h-10 w-14 items-center justify-center text-sm font-medium border-x">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  className="flex h-10 w-10 items-center justify-center hover:bg-slate-50 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <span className="text-sm text-slate-400">Stok: {product.stockCount}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <Button
              size="lg"
              variant="outline"
              className="flex-1 border-orange-500 text-orange-600 hover:bg-orange-50"
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Keranjang
            </Button>
            <Button
              size="lg"
              className="flex-1 bg-orange-500 hover:bg-orange-600"
              disabled={!product.inStock}
            >
              Beli Langsung
            </Button>
          </div>

          {/* Share & favorite */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4 mr-1" />
              Wishlist
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>

          {/* Store info */}
          <div className="rounded-xl border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500 text-sm font-bold text-white">
                SCW
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900">SCW Distribution</p>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs text-slate-500">4.9</span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs text-slate-500 flex items-center gap-0.5">
                    <MapPin className="h-3 w-3" /> Jakarta
                  </span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="text-xs">
                <Store className="h-3 w-3 mr-1" />
                Kunjungi Toko
              </Button>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 pt-3 border-t">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Truck className="h-4 w-4 text-orange-500" />
              Gratis ongkir Rp 500rb+
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Shield className="h-4 w-4 text-orange-500" />
              Jaminan produk original
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <RotateCcw className="h-4 w-4 text-orange-500" />
              Retur 7 hari
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Deskripsi, Ulasan, Diskusi */}
      <div className="mt-10">
        <Tabs defaultValue="description">
          <TabsList className="border-b w-full justify-start rounded-none h-auto p-0 gap-0">
            <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent data-[active]:border-orange-500 data-[active]:text-orange-600 px-6 py-3">
              Deskripsi
            </TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[active]:border-orange-500 data-[active]:text-orange-600 px-6 py-3">
              Ulasan ({product.reviews})
            </TabsTrigger>
            <TabsTrigger value="discussions" className="rounded-none border-b-2 border-transparent data-[active]:border-orange-500 data-[active]:text-orange-600 px-6 py-3">
              Diskusi ({discussionsData.length})
            </TabsTrigger>
          </TabsList>

          {/* Description Tab */}
          <TabsContent value="description" className="mt-6">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Deskripsi Produk</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{product.description}</p>
                <h4 className="text-sm font-semibold text-slate-900 mt-4 mb-2">Fitur Utama</h4>
                <ul className="space-y-2">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="h-4 w-4 text-orange-500 mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Spesifikasi</h3>
                <div className="rounded-lg border divide-y">
                  {product.specifications.map((spec, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-3 text-sm">
                      <span className="text-slate-500">{spec.label}</span>
                      <span className="font-medium text-slate-900">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-4">
              {/* Write review */}
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-slate-900 mb-2">Tulis Ulasan</p>
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-5 w-5 text-slate-200 hover:text-amber-400 cursor-pointer" />
                    ))}
                  </div>
                  <Textarea
                    placeholder="Bagaimana pengalaman Anda dengan produk ini?"
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    rows={3}
                  />
                  <Button size="sm" className="mt-2 bg-orange-500 hover:bg-orange-600">Kirim Ulasan</Button>
                </CardContent>
              </Card>

              {/* Review list */}
              {reviewsData.map((review) => (
                <div key={review.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{review.user}</p>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
                        ))}
                        <span className="text-xs text-slate-400 ml-1">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{review.comment}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-orange-500">
                      <ThumbsUp className="h-3 w-3" />
                      Membantu ({review.helpful})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Discussions Tab */}
          <TabsContent value="discussions" className="mt-6">
            <div className="space-y-4">
              {/* Ask question */}
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-slate-900 mb-2">Ajukan Pertanyaan</p>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Tulis pertanyaan Anda tentang produk ini..."
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      className="flex-1"
                    />
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Discussion list */}
              {discussionsData.map((disc) => (
                <div key={disc.id} className="border rounded-lg p-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                        <span className="text-xs font-medium text-slate-600">{disc.user[0]}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{disc.user}</p>
                        <p className="text-xs text-slate-400">{disc.date}</p>
                        <p className="text-sm text-slate-600 mt-1">{disc.question}</p>
                      </div>
                    </div>
                    {disc.answer && (
                      <div className="flex items-start gap-2 ml-10 pl-3 border-l-2 border-orange-200">
                        <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                          <Store className="h-4 w-4 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-orange-600">{disc.answeredBy}</p>
                          <p className="text-sm text-slate-600 mt-1">{disc.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Produk Terkait</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {relatedProducts.map((rp) => (
            <Link key={rp.id} href={`/commerce/products/${rp.id}`}>
              <Card className="group overflow-hidden transition-shadow hover:shadow-lg border-orange-100">
                <div className="relative aspect-square bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                  <Droplets className="h-12 w-12 text-slate-300" />
                </div>
                <CardContent className="p-3">
                  <h3 className="text-sm font-medium text-slate-900 line-clamp-2 group-hover:text-orange-500 transition-colors">
                    {rp.name}
                  </h3>
                  <div className="mt-1.5 flex items-baseline gap-2">
                    <span className="text-base font-bold text-orange-600">{formatPrice(rp.price)}</span>
                    {rp.originalPrice && (
                      <span className="text-xs text-slate-400 line-through">{formatPrice(rp.originalPrice)}</span>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-1">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs text-slate-500">{rp.rating}</span>
                    <span className="text-xs text-slate-400">|</span>
                    <span className="text-xs text-slate-400">{rp.sold} terjual</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
