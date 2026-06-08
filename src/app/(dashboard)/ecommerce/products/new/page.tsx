"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Upload, Save } from "lucide-react"

const categories = [
  "Exterior",
  "Interior",
  "Wash",
  "Coating",
  "Preparation",
  "Correction",
  "Protection",
  "Wheel",
  "Tools",
  "Decontamination",
]

export default function NewProductPage() {
  const [name, setName] = useState("")
  const [type, setType] = useState("simple")
  const [status, setStatus] = useState("draft")
  const [sku, setSku] = useState("")
  const [stock, setStock] = useState("")
  const [manageStock, setManageStock] = useState(true)
  const [regularPrice, setRegularPrice] = useState("")
  const [salePrice, setSalePrice] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")

  const handleTypeChange = useCallback((value: string | null) => { if (value) setType(value) }, [])
  const handleStatusChange = useCallback((value: string | null) => { if (value) setStatus(value) }, [])
  const handleCategoryChange = useCallback((value: string | null) => { if (value) setCategory(value) }, [])

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Link href="/ecommerce/products">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tambah Produk Baru</h1>
          <p className="text-muted-foreground">
            Buat produk baru untuk katalog WebCommerce
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Informasi Produk</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Produk</Label>
                <Input
                  id="name"
                  placeholder="Contoh: SCW Snow Foam"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  placeholder="Deskripsi produk..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Harga</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="regularPrice">Harga Normal (Rp)</Label>
                  <Input
                    id="regularPrice"
                    type="number"
                    placeholder="0"
                    value={regularPrice}
                    onChange={(e) => setRegularPrice(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salePrice">Harga Sale (Rp)</Label>
                  <Input
                    id="salePrice"
                    type="number"
                    placeholder="0 (opsional)"
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Kosongkan jika tidak ada harga diskon
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inventory */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Inventaris</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  placeholder="Contoh: SCW-SF-001"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Kelola Stok</Label>
                  <p className="text-xs text-muted-foreground">
                    Aktifkan untuk mengelola stok produk
                  </p>
                </div>
                <Switch
                  checked={manageStock}
                  onCheckedChange={setManageStock}
                />
              </div>
              {manageStock && (
                <div className="space-y-2">
                  <Label htmlFor="stock">Jumlah Stok</Label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="0"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tipe Produk</Label>
                <Select value={type} onValueChange={handleTypeChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="simple">Simple</SelectItem>
                    <SelectItem value="variable">Variable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status Publikasi</Label>
                <Select value={status} onValueChange={handleStatusChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Kategori</Label>
                <Select value={category} onValueChange={handleCategoryChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
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
            </CardContent>
          </Card>

          {/* Image */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Gambar Produk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center hover:bg-orange-50 dark:hover:bg-orange-950/10 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 text-orange-400 mb-2" />
                <p className="text-sm font-medium">Klik untuk upload gambar</p>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG atau WebP (maks. 2MB)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-2">
                <Link href="/ecommerce/products" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Batal
                  </Button>
                </Link>
                <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
                  <Save className="mr-2 h-4 w-4" />
                  Simpan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
