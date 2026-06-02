"use client"

import React, { useState } from "react"
import {
  Store,
  CreditCard,
  Truck,
  Save,
  Upload,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  const [saved, setSaved] = useState(false)

  // Toko settings
  const [storeName, setStoreName] = useState("SCW Car Detailing Shop")
  const [storeDesc, setStoreDesc] = useState("Toko resmi produk perawatan dan coating mobil SCW. Melayani pengiriman ke seluruh Indonesia.")
  const [storePhone, setStorePhone] = useState("0812-3456-7890")
  const [storeEmail, setStoreEmail] = useState("info@scwshop.co.id")
  const [storeWhatsApp, setStoreWhatsApp] = useState("6281234567890")
  const [storeAddress, setStoreAddress] = useState("Jl. Raya Bogor Km 30, Jakarta Timur, DKI Jakarta 13760")

  // Pembayaran settings
  const [midtransEnabled, setMidtransEnabled] = useState(true)
  const [midtransSandbox, setMidtransSandbox] = useState(true)
  const [codEnabled, setCodEnabled] = useState(true)
  const [bankTransferEnabled, setBankTransferEnabled] = useState(true)
  const [bankName, setBankName] = useState("BCA")
  const [bankAccount, setBankAccount] = useState("1234567890")
  const [bankHolder, setBankHolder] = useState("PT SCW Detailing Indonesia")

  // Pengiriman settings
  const [freeShippingEnabled, setFreeShippingEnabled] = useState(true)
  const [freeShippingMin, setFreeShippingMin] = useState("300000")
  const [defaultCity, setDefaultCity] = useState("Jakarta")
  const [couriers, setCouriers] = useState<string[]>(["jne", "jnt", "sicepat"])

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const toggleCourier = (courier: string) => {
    setCouriers((prev) =>
      prev.includes(courier) ? prev.filter((c) => c !== courier) : [...prev, courier]
    )
  }

  const courierOptions = [
    { id: "jne", name: "JNE" },
    { id: "jnt", name: "J&T Express" },
    { id: "sicepat", name: "SiCepat" },
    { id: "tiki", name: "TIKI" },
    { id: "pos", name: "POS Indonesia" },
    { id: "ninja", name: "Ninja Xpress" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pengaturan Toko</h1>
          <p className="text-muted-foreground">Konfigurasi pengaturan WebCommerce toko Anda</p>
        </div>
        <Button onClick={handleSave} className="bg-orange-600 hover:bg-orange-700">
          {saved ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Tersimpan!
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Simpan Pengaturan
            </>
          )}
        </Button>
      </div>

      {saved && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 flex items-center gap-2 text-emerald-700">
          <CheckCircle className="h-5 w-5" />
          <span className="text-sm font-medium">Pengaturan berhasil disimpan!</span>
        </div>
      )}

      <Tabs defaultValue="toko" className="space-y-6">
        <TabsList className="bg-orange-50 border border-orange-200">
          <TabsTrigger value="toko" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
            <Store className="mr-2 h-4 w-4" />
            Toko
          </TabsTrigger>
          <TabsTrigger value="pembayaran" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
            <CreditCard className="mr-2 h-4 w-4" />
            Pembayaran
          </TabsTrigger>
          <TabsTrigger value="pengiriman" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
            <Truck className="mr-2 h-4 w-4" />
            Pengiriman
          </TabsTrigger>
        </TabsList>

        {/* Tab Toko */}
        <TabsContent value="toko">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Toko</CardTitle>
              <CardDescription>Detail toko yang ditampilkan kepada pelanggan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="store-name">Nama Toko</Label>
                  <Input id="store-name" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="store-desc">Deskripsi Toko</Label>
                  <Textarea id="store-desc" rows={3} value={storeDesc} onChange={(e) => setStoreDesc(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-phone">
                    <Phone className="inline mr-1 h-4 w-4" />
                    Nomor Telepon
                  </Label>
                  <Input id="store-phone" value={storePhone} onChange={(e) => setStorePhone(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-email">
                    <Mail className="inline mr-1 h-4 w-4" />
                    Email
                  </Label>
                  <Input id="store-email" type="email" value={storeEmail} onChange={(e) => setStoreEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-wa">
                    <MessageCircle className="inline mr-1 h-4 w-4" />
                    WhatsApp
                  </Label>
                  <Input id="store-wa" value={storeWhatsApp} onChange={(e) => setStoreWhatsApp(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-address">
                    <MapPin className="inline mr-1 h-4 w-4" />
                    Alamat
                  </Label>
                  <Input id="store-address" value={storeAddress} onChange={(e) => setStoreAddress(e.target.value)} />
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Logo Toko</Label>
                <div className="flex items-center gap-4">
                  <div className="flex h-24 w-24 items-center justify-center rounded-xl border-2 border-dashed bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="text-center">
                      <Store className="mx-auto h-8 w-8 text-muted-foreground/50" />
                      <p className="text-[10px] text-muted-foreground mt-1">Logo</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Logo
                    </Button>
                    <p className="text-xs text-muted-foreground">PNG atau SVG, maks. 1MB</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Pembayaran */}
        <TabsContent value="pembayaran">
          <div className="space-y-6">
            {/* Midtrans */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">Midtrans</h3>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Payment Gateway</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Pembayaran online via kartu kredit, debit, e-wallet, dan bank transfer</p>
                  </div>
                  <Switch
                    checked={midtransEnabled}
                    onCheckedChange={setMidtransEnabled}
                    className="data-[state=checked]:bg-orange-600"
                  />
                </div>
                {midtransEnabled && (
                  <div className="mt-4 pt-4 border-t space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Mode Sandbox (Testing)</span>
                      <Switch
                        checked={midtransSandbox}
                        onCheckedChange={setMidtransSandbox}
                        className="data-[state=checked]:bg-orange-600"
                      />
                    </div>
                    <Badge variant={midtransSandbox ? "outline" : "default"} className={midtransSandbox ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-emerald-100 text-emerald-700"}>
                      {midtransSandbox ? "Sandbox Mode" : "Live Mode"}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* COD */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">Cash on Delivery (COD)</h3>
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">COD</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Pembayaran tunai saat barang diterima oleh pelanggan</p>
                  </div>
                  <Switch
                    checked={codEnabled}
                    onCheckedChange={setCodEnabled}
                    className="data-[state=checked]:bg-orange-600"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Bank Transfer */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">Transfer Bank</h3>
                      <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">Manual</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Pembayaran manual via transfer bank</p>
                  </div>
                  <Switch
                    checked={bankTransferEnabled}
                    onCheckedChange={setBankTransferEnabled}
                    className="data-[state=checked]:bg-orange-600"
                  />
                </div>
                {bankTransferEnabled && (
                  <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bank-name">Nama Bank</Label>
                      <Select value={bankName} onValueChange={(v) => v && setBankName(v)}>
                        <SelectTrigger id="bank-name">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BCA">BCA</SelectItem>
                          <SelectItem value="Mandiri">Mandiri</SelectItem>
                          <SelectItem value="BRI">BRI</SelectItem>
                          <SelectItem value="BNI">BNI</SelectItem>
                          <SelectItem value="CIMB">CIMB Niaga</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bank-account">No. Rekening</Label>
                      <Input id="bank-account" value={bankAccount} onChange={(e) => setBankAccount(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bank-holder">Atas Nama</Label>
                      <Input id="bank-holder" value={bankHolder} onChange={(e) => setBankHolder(e.target.value)} />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab Pengiriman */}
        <TabsContent value="pengiriman">
          <div className="space-y-6">
            {/* Free Shipping */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold">Gratis Ongkir</h3>
                    <p className="text-sm text-muted-foreground">Berikan layanan pengiriman gratis untuk pembelian minimum tertentu</p>
                  </div>
                  <Switch
                    checked={freeShippingEnabled}
                    onCheckedChange={setFreeShippingEnabled}
                    className="data-[state=checked]:bg-orange-600"
                  />
                </div>
                {freeShippingEnabled && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="space-y-2 max-w-sm">
                      <Label htmlFor="min-order">Minimum Pembelian untuk Gratis Ongkir</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">Rp</span>
                        <Input
                          id="min-order"
                          type="number"
                          className="pl-10"
                          value={freeShippingMin}
                          onChange={(e) => setFreeShippingMin(e.target.value)}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">Pelanggan mendapatkan gratis ongkir jika total belanja mencapai nominal ini</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Default City */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-2 max-w-sm">
                  <Label htmlFor="default-city">Kota Default Pengiriman</Label>
                  <Select value={defaultCity} onValueChange={(v) => v && setDefaultCity(v)}>
                    <SelectTrigger id="default-city">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Jakarta">Jakarta</SelectItem>
                      <SelectItem value="Bandung">Bandung</SelectItem>
                      <SelectItem value="Surabaya">Surabaya</SelectItem>
                      <SelectItem value="Semarang">Semarang</SelectItem>
                      <SelectItem value="Yogyakarta">Yogyakarta</SelectItem>
                      <SelectItem value="Medan">Medan</SelectItem>
                      <SelectItem value="Makassar">Makassar</SelectItem>
                      <SelectItem value="Bali">Bali (Denpasar)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Kota asal default untuk perhitungan ongkos kirim</p>
                </div>
              </CardContent>
            </Card>

            {/* Courier Selection */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Kurir Pengiriman</h3>
                    <p className="text-sm text-muted-foreground">Pilih kurir yang tersedia untuk toko Anda</p>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {courierOptions.map((courier) => (
                      <div
                        key={courier.id}
                        className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer transition-all ${
                          couriers.includes(courier.id)
                            ? "border-orange-300 bg-orange-50"
                            : "border-border hover:bg-muted/50"
                        }`}
                        onClick={() => toggleCourier(courier.id)}
                      >
                        <span className="font-medium text-sm">{courier.name}</span>
                        <Switch
                          checked={couriers.includes(courier.id)}
                          onCheckedChange={() => toggleCourier(courier.id)}
                          className="data-[state=checked]:bg-orange-600"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {couriers.length} kurir aktif dipilih
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
