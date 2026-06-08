"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  ChevronRight,
  MapPin,
  Truck,
  CreditCard,
  Shield,
  CheckCircle2,
  Droplets,
  Tag,
  Clock,
  Zap,
  Package,
  Store,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

const checkoutItems = [
  { id: "1", name: "SCW Snow Foam", price: 125000, quantity: 2, variation: "1 Liter", shop: "SCW Distribution" },
  { id: "2", name: "SCW Ceramic Coating", price: 450000, quantity: 1, variation: "30ml", shop: "SCW Distribution" },
  { id: "4", name: "SCW Tire Gel", price: 75000, quantity: 3, variation: "500ml", shop: "SCW Distribution" },
]

const savedAddresses = [
  { id: "addr1", name: "Rumah", fullName: "Budi Santoso", phone: "+62 812 3456 7890", address: "Jl. Sudirman No. 123, RT 01/RW 05", city: "Jakarta Selatan", province: "DKI Jakarta", zip: "12190", isDefault: true },
  { id: "addr2", name: "Kantor", fullName: "Budi Santoso", phone: "+62 812 3456 7890", address: "Jl. Thamrin No. 45, Gedung Plaza, Lantai 5", city: "Jakarta Pusat", province: "DKI Jakarta", zip: "10230", isDefault: false },
]

const shippingMethods = [
  { id: "reg", name: "Reguler", icon: Truck, couriers: [
    { id: "jne-reg", name: "JNE Regular", price: 25000, eta: "3-5 hari" },
    { id: "jnt-reg", name: "J&T Reguler", price: 22000, eta: "3-5 hari" },
    { id: "pos-reg", name: "POS Kilat", price: 28000, eta: "2-4 hari" },
  ]},
  { id: "inst", name: "Instan", icon: Zap, couriers: [
    { id: "jne-yes", name: "JNE YES (1 Hari)", price: 45000, eta: "1 hari" },
    { id: "grab-express", name: "Grab Express", price: 35000, eta: "1 hari" },
  ]},
  { id: "sameday", name: "Same Day", icon: Clock, couriers: [
    { id: "gosend", name: "GoSend", price: 30000, eta: "Hari ini" },
    { id: "moota", name: "Moota", price: 32000, eta: "Hari ini" },
  ]},
]

const paymentMethods = [
  { id: "bank-transfer", name: "Transfer Bank (BCA/Mandiri/BNI/BRI)", icon: CreditCard },
  { id: "ewallet", name: "E-Wallet (GoPay, OVO, Dana, ShopeePay)", icon: CreditCard },
  { id: "credit-card", name: "Kartu Kredit / Debit (Visa, Mastercard)", icon: CreditCard },
  { id: "cod", name: "Bayar di Tempat (COD)", icon: CreditCard },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency", currency: "IDR", minimumFractionDigits: 0,
  }).format(price)
}

export default function CheckoutPage() {
  const [selectedAddress, setSelectedAddress] = useState("addr1")
  const [shippingType, setShippingType] = useState("reg")
  const [selectedCourier, setSelectedCourier] = useState("jne-reg")
  const [selectedPayment, setSelectedPayment] = useState("bank-transfer")
  const [voucherCode, setVoucherCode] = useState("")
  const [useNewAddress, setUseNewAddress] = useState(false)

  const subtotal = checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const activeShippingType = shippingMethods.find((m) => m.id === shippingType)
  const activeCourier = activeShippingType?.couriers.find((c) => c.id === selectedCourier)
  const shippingCost = activeCourier?.price || 0
  const total = subtotal + shippingCost

  // Group items by shop
  const shopGroups = checkoutItems.reduce<Record<string, typeof checkoutItems>>((acc, item) => {
    if (!acc[item.shop]) acc[item.shop] = []
    acc[item.shop].push(item)
    return acc
  }, {})

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/commerce" className="hover:text-orange-500">Beranda</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/commerce/cart" className="hover:text-orange-500">Keranjang</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-900 font-medium">Checkout</span>
      </nav>

      <h1 className="text-2xl font-bold text-slate-900 mb-6">Checkout</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column - forms */}
        <div className="lg:col-span-2 space-y-4">
          {/* Shipping Address */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <MapPin className="h-5 w-5 text-orange-500" />
                Alamat Pengiriman
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {!useNewAddress ? (
                <>
                  <RadioGroup value={selectedAddress} onValueChange={(v: string) => setSelectedAddress(v ?? '')} className="space-y-2">
                    {savedAddresses.map((addr) => (
                      <label
                        key={addr.id}
                        className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${
                          selectedAddress === addr.id ? "border-orange-300 bg-orange-50" : "hover:bg-slate-50"
                        }`}
                      >
                        <RadioGroupItem value={addr.id} className="mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-slate-900">{addr.name}</span>
                            {addr.isDefault && <Badge className="bg-orange-100 text-orange-700 text-[10px]">Utama</Badge>}
                          </div>
                          <p className="text-sm text-slate-700">{addr.fullName} | {addr.phone}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{addr.address}, {addr.city}, {addr.province} {addr.zip}</p>
                        </div>
                      </label>
                    ))}
                  </RadioGroup>
                  <Button variant="outline" size="sm" className="text-orange-600 border-orange-200" onClick={() => setUseNewAddress(true)}>
                    + Tambah Alamat Baru
                  </Button>
                </>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-sm">Nama Lengkap</Label>
                      <Input id="name" placeholder="Budi Santoso" className="h-9" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-sm">Nomor Telepon</Label>
                      <Input id="phone" placeholder="+62 812 xxxx xxxx" className="h-9" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="address" className="text-sm">Alamat Lengkap</Label>
                    <Textarea id="address" placeholder="Jl. Contoh No. 123, RT 01/RW 02, Kel. ..." rows={2} />
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="city" className="text-sm">Kota</Label>
                      <Input id="city" placeholder="Jakarta Utara" className="h-9" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="province" className="text-sm">Provinsi</Label>
                      <Input id="province" placeholder="DKI Jakarta" className="h-9" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="zip" className="text-sm">Kode Pos</Label>
                      <Input id="zip" placeholder="14310" className="h-9" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setUseNewAddress(false)}>Batal</Button>
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600">Simpan Alamat</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Shipping Method */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Truck className="h-5 w-5 text-orange-500" />
                Pengiriman
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Shipping type tabs */}
              <div className="flex gap-2">
                {shippingMethods.map((method) => {
                  const Icon = method.icon
                  return (
                    <button
                      key={method.id}
                      onClick={() => {
                        setShippingType(method.id)
                        setSelectedCourier(method.couriers[0].id)
                      }}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                        shippingType === method.id
                          ? "border-orange-500 bg-orange-50 text-orange-600"
                          : "border-slate-200 text-slate-600 hover:border-orange-300"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {method.name}
                    </button>
                  )
                })}
              </div>

              {/* Courier options */}
              <RadioGroup
                value={selectedCourier}
                onValueChange={(v: string) => setSelectedCourier(v ?? '')}
                className="space-y-2"
              >
                {activeShippingType?.couriers.map((courier) => (
                  <label
                    key={courier.id}
                    className={`flex items-center justify-between rounded-lg border p-3 cursor-pointer transition-colors ${
                      selectedCourier === courier.id ? "border-orange-300 bg-orange-50" : "hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value={courier.id} />
                      <div>
                        <p className="text-sm font-medium text-slate-900">{courier.name}</p>
                        <p className="text-xs text-slate-400">Est. {courier.eta}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-slate-900">{formatPrice(courier.price)}</span>
                  </label>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Voucher */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Tag className="h-5 w-5 text-orange-500" />
                Voucher / Kupon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Masukkan kode voucher atau kupon"
                  className="h-9"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                />
                <Button variant="outline" size="sm" className="shrink-0 border-orange-200 text-orange-600">
                  Pakai
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <CreditCard className="h-5 w-5 text-orange-500" />
                Metode Pembayaran
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedPayment}
                onValueChange={(v: string) => setSelectedPayment(v ?? '')}
                className="space-y-2"
              >
                {paymentMethods.map((method) => {
                  const Icon = method.icon
                  return (
                    <label
                      key={method.id}
                      className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${
                        selectedPayment === method.id ? "border-orange-300 bg-orange-50" : "hover:bg-slate-50"
                      }`}
                    >
                      <RadioGroupItem value={method.id} />
                      <Icon className="h-4 w-4 text-slate-400" />
                      <span className="text-sm font-medium text-slate-900">{method.name}</span>
                    </label>
                  )
                })}
              </RadioGroup>
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                <Shield className="h-4 w-4" />
                Pembayaran diproses secara aman. Data Anda terenkripsi.
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - order summary */}
        <div className="space-y-4">
          <Card className="sticky top-24">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Ringkasan Pesanan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Shop groups */}
              {Object.entries(shopGroups).map(([shop, items]) => (
                <div key={shop}>
                  <div className="flex items-center gap-2 mb-2">
                    <Store className="h-3.5 w-3.5 text-orange-500" />
                    <span className="text-xs font-semibold text-slate-700">{shop}</span>
                  </div>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-2.5">
                        <div className="h-10 w-10 shrink-0 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                          <Droplets className="h-5 w-5 text-slate-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-slate-700 truncate">{item.name}</p>
                          <p className="text-[10px] text-slate-400">{item.variation} × {item.quantity}</p>
                        </div>
                        <p className="text-xs font-medium text-slate-700">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Summary */}
              <div className="border-t pt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Subtotal ({checkoutItems.reduce((s, i) => s + i.quantity, 0)} barang)</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Pengiriman ({activeCourier?.name})</span>
                  <span className="font-medium">{formatPrice(shippingCost)}</span>
                </div>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span className="text-orange-600">{formatPrice(total)}</span>
                </div>
              </div>

              <Button className="w-full bg-orange-500 hover:bg-orange-600" size="lg">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Bayar {formatPrice(total)}
              </Button>

              <p className="text-[11px] text-center text-slate-400">
                Dengan melanjutkan, Anda menyetujui Syarat & Ketentuan dan Kebijakan Privasi kami.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
