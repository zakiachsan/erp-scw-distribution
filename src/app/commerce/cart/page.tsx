"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Droplets,
  Store,
  Truck,
  Tag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"

interface CartItem {
  id: string
  name: string
  price: number
  originalPrice: number | null
  quantity: number
  variation: string
  category: string
  shop: string
  inStock: boolean
  selected: boolean
}

const initialCartItems: CartItem[] = [
  { id: "1", name: "SCW Snow Foam", price: 125000, originalPrice: 150000, quantity: 2, variation: "1 Liter", category: "Exterior Care", shop: "SCW Distribution", inStock: true, selected: true },
  { id: "2", name: "SCW Ceramic Coating", price: 450000, originalPrice: null, quantity: 1, variation: "30ml", category: "Coating & Protection", shop: "SCW Distribution", inStock: true, selected: true },
  { id: "4", name: "SCW Tire Gel", price: 75000, originalPrice: null, quantity: 3, variation: "500ml", category: "Wheel & Tire", shop: "SCW Distribution", inStock: true, selected: true },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency", currency: "IDR", minimumFractionDigits: 0,
  }).format(price)
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(initialCartItems)
  const [selectAll, setSelectAll] = useState(true)
  const [voucherCode, setVoucherCode] = useState("")

  const toggleItem = (id: string) => {
    setItems((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
      setSelectAll(updated.every((item) => item.selected))
      return updated
    })
  }

  const toggleSelectAll = () => {
    const newState = !selectAll
    setSelectAll(newState)
    setItems((prev) => prev.map((item) => ({ ...item, selected: newState })))
  }

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    )
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const removeSelected = () => {
    setItems((prev) => prev.filter((item) => !item.selected))
  }

  const selectedItems = items.filter((item) => item.selected)
  const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = selectedItems.reduce((sum, item) => sum + item.quantity, 0)
  const shippingEstimate = subtotal >= 500000 ? 0 : 25000
  const total = subtotal + shippingEstimate

  // Group items by shop
  const shopGroups = items.reduce<Record<string, CartItem[]>>((acc, item) => {
    if (!acc[item.shop]) acc[item.shop] = []
    acc[item.shop].push(item)
    return acc
  }, {})

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <ShoppingBag className="mx-auto h-20 w-20 text-slate-200 mb-4" />
        <h2 className="text-xl font-semibold text-slate-900 mb-2">Keranjang Kosong</h2>
        <p className="text-slate-500 mb-6">Yuk mulai belanja produk detailing favoritmu!</p>
        <Link href="/commerce/products">
          <Button className="bg-orange-500 hover:bg-orange-600">
            Mulai Belanja
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/commerce" className="hover:text-orange-500">Beranda</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-900 font-medium">Keranjang Belanja</span>
      </nav>

      <h1 className="text-2xl font-bold text-slate-900 mb-6">Keranjang Belanja</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cart Items */}
        <div className="flex-1 space-y-4">
          {/* Select All Bar */}
          <div className="flex items-center justify-between rounded-lg border bg-white p-3">
            <div className="flex items-center gap-3">
              <Checkbox checked={selectAll} onCheckedChange={toggleSelectAll} />
              <span className="text-sm font-medium text-slate-900">Pilih Semua ({items.length} produk)</span>
            </div>
            {selectedItems.length > 0 && (
              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600" onClick={removeSelected}>
                <Trash2 className="h-4 w-4 mr-1" />
                Hapus Terpilih
              </Button>
            )}
          </div>

          {/* Shop Groups */}
          {Object.entries(shopGroups).map(([shop, shopItems]) => (
            <div key={shop} className="rounded-lg border bg-white overflow-hidden">
              {/* Shop Header */}
              <div className="flex items-center gap-3 p-3 bg-slate-50 border-b">
                <Store className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-semibold text-slate-900">{shop}</span>
                <Link href="/commerce/products" className="text-xs text-orange-500 hover:text-orange-600 ml-auto">
                  Chat Penjual
                </Link>
              </div>

              {/* Items */}
              {shopItems.map((item) => (
                <div key={item.id} className="p-3 border-b last:border-b-0">
                  <div className="flex gap-3">
                    <Checkbox checked={item.selected} onCheckedChange={() => toggleItem(item.id)} className="mt-2" />

                    <div className="h-20 w-20 shrink-0 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                      <Droplets className="h-8 w-8 text-slate-300" />
                    </div>

                    <div className="flex flex-1 justify-between min-w-0">
                      <div className="space-y-0.5 min-w-0 flex-1">
                        <Link
                          href={`/commerce/products/${item.id}`}
                          className="font-medium text-sm text-slate-900 hover:text-orange-500 transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-slate-400">{item.variation}</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-bold text-orange-600">{formatPrice(item.price)}</span>
                          {item.originalPrice && (
                            <span className="text-xs text-slate-400 line-through">{formatPrice(item.originalPrice)}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-between ml-2">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>

                        <div className="flex items-center rounded-lg border">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="flex h-8 w-8 items-center justify-center hover:bg-slate-50 transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="flex h-8 w-10 items-center justify-center text-sm font-medium border-x">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="flex h-8 w-8 items-center justify-center hover:bg-slate-50 transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <p className="text-sm font-bold text-slate-900">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* Continue Shopping */}
          <Link href="/commerce/products">
            <Button variant="outline" size="sm" className="border-orange-200 text-orange-600 hover:bg-orange-50">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Lanjut Belanja
            </Button>
          </Link>
        </div>

        {/* Order Summary - Desktop */}
        <div className="hidden lg:block w-80 space-y-4">
          <Card className="sticky top-24">
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold text-slate-900">Ringkasan Belanja</h3>

              {/* Voucher */}
              <div>
                <p className="text-xs font-medium text-slate-700 mb-1.5 flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  Voucher
                </p>
                <div className="flex gap-2">
                  <Input
                    placeholder="Masukkan kode voucher"
                    className="h-9 text-sm"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                  />
                  <Button variant="outline" size="sm" className="shrink-0 border-orange-200 text-orange-600">
                    Pakai
                  </Button>
                </div>
              </div>

              <div className="border-t pt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Subtotal ({totalItems} barang)</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimasi Ongkir</span>
                  <span className="font-medium">
                    {shippingEstimate === 0 ? (
                      <Badge variant="secondary" className="bg-green-50 text-green-700 text-xs">Gratis</Badge>
                    ) : (
                      formatPrice(shippingEstimate)
                    )}
                  </span>
                </div>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span className="text-orange-600">{formatPrice(total)}</span>
                </div>
              </div>

              {subtotal < 500000 && (
                <div className="rounded-lg bg-orange-50 p-2.5 text-xs text-orange-700 flex items-center gap-2">
                  <Truck className="h-4 w-4 shrink-0" />
                  Tambah {formatPrice(500000 - subtotal)} lagi untuk gratis ongkir!
                </div>
              )}

              <Link href="/commerce/checkout">
                <Button className="w-full bg-orange-500 hover:bg-orange-600" size="lg" disabled={selectedItems.length === 0}>
                  Checkout ({totalItems})
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-3 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-slate-500">Total ({totalItems} barang)</p>
            <p className="text-lg font-bold text-orange-600">{formatPrice(total)}</p>
          </div>
          <Link href="/commerce/checkout">
            <Button className="bg-orange-500 hover:bg-orange-600" disabled={selectedItems.length === 0}>
              Checkout ({totalItems})
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
