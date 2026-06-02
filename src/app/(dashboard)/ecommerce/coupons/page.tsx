"use client"

import React, { useState, useMemo } from "react"
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Ticket,
  Percent,
  Copy,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Coupon {
  id: string
  code: string
  type: "Keranjang" | "Produk"
  discountMode: "Fixed" | "Percent"
  value: number
  minPurchase: number
  maxDiscount: number
  usageCount: number
  usageLimit: number
  expiry: string
}

const initialCoupons: Coupon[] = [
  { id: "1", code: "SCW10", type: "Keranjang", discountMode: "Percent", value: 10, minPurchase: 100000, maxDiscount: 50000, usageCount: 45, usageLimit: 100, expiry: "2026-06-30" },
  { id: "2", code: "FREESHIP", type: "Keranjang", discountMode: "Fixed", value: 25000, minPurchase: 200000, maxDiscount: 25000, usageCount: 120, usageLimit: 200, expiry: "2026-07-15" },
  { id: "3", code: "NEWUSER", type: "Keranjang", discountMode: "Percent", value: 15, minPurchase: 150000, maxDiscount: 75000, usageCount: 32, usageLimit: 500, expiry: "2026-12-31" },
  { id: "4", code: "SCWCOAT", type: "Produk", discountMode: "Fixed", value: 50000, minPurchase: 0, maxDiscount: 50000, usageCount: 18, usageLimit: 50, expiry: "2026-06-15" },
  { id: "5", code: "RAMADHAN", type: "Keranjang", discountMode: "Percent", value: 20, minPurchase: 300000, maxDiscount: 100000, usageCount: 67, usageLimit: 150, expiry: "2026-04-10" },
  { id: "6", code: "WHEEL25", type: "Produk", discountMode: "Percent", value: 25, minPurchase: 0, maxDiscount: 75000, usageCount: 22, usageLimit: 80, expiry: "2026-08-31" },
  { id: "7", code: "BUNGOBENG", type: "Keranjang", discountMode: "Fixed", value: 100000, minPurchase: 500000, maxDiscount: 100000, usageCount: 8, usageLimit: 25, expiry: "2026-06-01" },
  { id: "8", code: "DETAILING", type: "Produk", discountMode: "Fixed", value: 30000, minPurchase: 0, maxDiscount: 30000, usageCount: 41, usageLimit: 100, expiry: "2026-09-30" },
  { id: "9", code: "MEGADEAL", type: "Keranjang", discountMode: "Percent", value: 30, minPurchase: 750000, maxDiscount: 200000, usageCount: 5, usageLimit: 10, expiry: "2026-06-05" },
]

const formatRupiah = (amount: number) => `Rp ${amount.toLocaleString("id-ID")}`

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons)
  const [searchQuery, setSearchQuery] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null)
  const [deletingCoupon, setDeletingCoupon] = useState<Coupon | null>(null)
  const [formData, setFormData] = useState({
    code: "",
    type: "Keranjang" as "Keranjang" | "Produk",
    discountMode: "Percent" as "Fixed" | "Percent",
    value: "",
    minPurchase: "",
    maxDiscount: "",
    expiry: "",
    usageLimit: "",
  })

  const filteredCoupons = useMemo(() => {
    if (!searchQuery) return coupons
    return coupons.filter(
      (c) =>
        c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.type.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [coupons, searchQuery])

  const handleOpenAdd = () => {
    setEditingCoupon(null)
    setFormData({ code: "", type: "Keranjang", discountMode: "Percent", value: "", minPurchase: "", maxDiscount: "", expiry: "", usageLimit: "" })
    setDialogOpen(true)
  }

  const handleOpenEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon)
    setFormData({
      code: coupon.code,
      type: coupon.type,
      discountMode: coupon.discountMode,
      value: String(coupon.value),
      minPurchase: String(coupon.minPurchase),
      maxDiscount: String(coupon.maxDiscount),
      expiry: coupon.expiry,
      usageLimit: String(coupon.usageLimit),
    })
    setDialogOpen(true)
  }

  const handleSave = () => {
    if (!formData.code.trim() || !formData.value) return
    if (editingCoupon) {
      setCoupons((prev) =>
        prev.map((c) =>
          c.id === editingCoupon.id
            ? {
                ...c,
                code: formData.code.toUpperCase(),
                type: formData.type,
                discountMode: formData.discountMode,
                value: Number(formData.value),
                minPurchase: Number(formData.minPurchase) || 0,
                maxDiscount: Number(formData.maxDiscount) || 0,
                expiry: formData.expiry,
                usageLimit: Number(formData.usageLimit) || 0,
              }
            : c
        )
      )
    } else {
      const newCoupon: Coupon = {
        id: String(Date.now()),
        code: formData.code.toUpperCase(),
        type: formData.type,
        discountMode: formData.discountMode,
        value: Number(formData.value),
        minPurchase: Number(formData.minPurchase) || 0,
        maxDiscount: Number(formData.maxDiscount) || 0,
        usageCount: 0,
        usageLimit: Number(formData.usageLimit) || 0,
        expiry: formData.expiry,
      }
      setCoupons((prev) => [...prev, newCoupon])
    }
    setDialogOpen(false)
  }

  const handleDelete = () => {
    if (!deletingCoupon) return
    setCoupons((prev) => prev.filter((c) => c.id !== deletingCoupon.id))
    setDeleteDialogOpen(false)
    setDeletingCoupon(null)
  }

  const isExpired = (date: string) => new Date(date) < new Date()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Kupon Diskon</h1>
          <p className="text-muted-foreground">Kelola kupon dan promo diskon untuk toko</p>
        </div>
        <Button onClick={handleOpenAdd} className="bg-orange-600 hover:bg-orange-700">
          <Plus className="mr-2 h-4 w-4" />
          Buat Kupon
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cari kode kupon..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredCoupons.length} kupon ditemukan
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kode</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Mode Diskon</TableHead>
                <TableHead className="text-right">Nilai</TableHead>
                <TableHead className="text-right">Min. Pembelian</TableHead>
                <TableHead className="text-right">Max. Diskon</TableHead>
                <TableHead className="text-center">Penggunaan</TableHead>
                <TableHead>Kadaluarsa</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCoupons.map((coupon) => {
                const expired = isExpired(coupon.expiry)
                return (
                  <TableRow key={coupon.id} className={expired ? "opacity-50" : ""}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50">
                          <Ticket className="h-4 w-4 text-orange-600" />
                        </div>
                        <div>
                          <span className="font-mono font-semibold text-sm">{coupon.code}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 ml-1"
                            onClick={() => navigator.clipboard.writeText(coupon.code)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={coupon.type === "Keranjang" ? "border-blue-200 text-blue-700" : "border-purple-200 text-purple-700"}>
                        {coupon.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Percent className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{coupon.discountMode === "Fixed" ? "Tetap" : "Persen"}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {coupon.discountMode === "Fixed" ? formatRupiah(coupon.value) : `${coupon.value}%`}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {coupon.minPurchase > 0 ? formatRupiah(coupon.minPurchase) : "-"}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {coupon.maxDiscount > 0 ? formatRupiah(coupon.maxDiscount) : "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-medium">{coupon.usageCount}/{coupon.usageLimit}</span>
                        <div className="w-16 h-1.5 rounded-full bg-muted mt-1">
                          <div
                            className="h-full rounded-full bg-orange-500"
                            style={{ width: `${Math.min((coupon.usageCount / coupon.usageLimit) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={expired ? "destructive" : "outline"}>
                        {expired ? "Kadaluarsa" : coupon.expiry}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpenEdit(coupon)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:text-red-700"
                          onClick={() => {
                            setDeletingCoupon(coupon)
                            setDeleteDialogOpen(true)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingCoupon ? "Edit Kupon" : "Buat Kupon Baru"}</DialogTitle>
            <DialogDescription>
              {editingCoupon ? "Ubah detail kupon diskon" : "Buat kupon diskon baru untuk pelanggan"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="coupon-code">Kode Kupon</Label>
              <Input
                id="coupon-code"
                placeholder="Contoh: SCW10"
                className="font-mono"
                value={formData.code}
                onChange={(e) => setFormData((prev) => ({ ...prev, code: e.target.value.toUpperCase() }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Tipe Kupon</Label>
              <Select value={formData.type} onValueChange={(v) => setFormData((prev) => ({ ...prev, type: v as "Keranjang" | "Produk" }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Keranjang">Keranjang (Semua Produk)</SelectItem>
                  <SelectItem value="Produk">Produk (Tertentu)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Mode Diskon</Label>
              <Select value={formData.discountMode} onValueChange={(v) => setFormData((prev) => ({ ...prev, discountMode: v as "Fixed" | "Percent" }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fixed">Tetap (Rp)</SelectItem>
                  <SelectItem value="Percent">Persen (%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="coupon-value">Nilai Diskon</Label>
              <Input
                id="coupon-value"
                type="number"
                placeholder={formData.discountMode === "Fixed" ? "50000" : "10"}
                value={formData.value}
                onChange={(e) => setFormData((prev) => ({ ...prev, value: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coupon-min">Min. Pembelian</Label>
              <Input
                id="coupon-min"
                type="number"
                placeholder="100000"
                value={formData.minPurchase}
                onChange={(e) => setFormData((prev) => ({ ...prev, minPurchase: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coupon-max">Max. Diskon</Label>
              <Input
                id="coupon-max"
                type="number"
                placeholder="50000"
                value={formData.maxDiscount}
                onChange={(e) => setFormData((prev) => ({ ...prev, maxDiscount: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coupon-expiry">Tanggal Kadaluarsa</Label>
              <Input
                id="coupon-expiry"
                type="date"
                value={formData.expiry}
                onChange={(e) => setFormData((prev) => ({ ...prev, expiry: e.target.value }))}
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="coupon-usage">Batas Penggunaan</Label>
              <Input
                id="coupon-usage"
                type="number"
                placeholder="100"
                value={formData.usageLimit}
                onChange={(e) => setFormData((prev) => ({ ...prev, usageLimit: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSave} className="bg-orange-600 hover:bg-orange-700">
              {editingCoupon ? "Simpan Perubahan" : "Buat Kupon"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Kupon</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus kupon &quot;{deletingCoupon?.code}&quot;? Pelanggan tidak akan lagi bisa menggunakan kupon ini.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
