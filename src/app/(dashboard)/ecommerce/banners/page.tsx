"use client"

import React, { useState } from "react"
import {
  Image,
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
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

interface Banner {
  id: string
  title: string
  imageUrl: string
  linkUrl: string
  active: boolean
}

const initialBanners: Banner[] = [
  { id: "1", title: "Promo Musim Hujan - Diskon 30% Coating", imageUrl: "", linkUrl: "/promo/hujan-2026", active: true },
  { id: "2", title: "New Arrival: SCW Nano Ceramic Pro", imageUrl: "", linkUrl: "/products/nano-ceramic-pro", active: true },
  { id: "3", title: "Flash Sale Weekend - Wheels & Tire Care", imageUrl: "", linkUrl: "/promo/flash-sale-wheels", active: true },
  { id: "4", title: "Bundle Hemat: Interior + Exterior Care", imageUrl: "", linkUrl: "/promo/bundle-care", active: false },
  { id: "5", title: "SCW Pro Detailing Kit - Edisi Terbatas", imageUrl: "", linkUrl: "/products/pro-detailing-kit", active: true },
  { id: "6", title: "Referensi Reseller - Daftar Sekarang", imageUrl: "", linkUrl: "/reseller/register", active: false },
]

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>(initialBanners)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)
  const [deletingBanner, setDeletingBanner] = useState<Banner | null>(null)
  const [formData, setFormData] = useState({ title: "", imageUrl: "", linkUrl: "", active: true })

  const handleOpenAdd = () => {
    setEditingBanner(null)
    setFormData({ title: "", imageUrl: "", linkUrl: "", active: true })
    setDialogOpen(true)
  }

  const handleOpenEdit = (banner: Banner) => {
    setEditingBanner(banner)
    setFormData({ title: banner.title, imageUrl: banner.imageUrl, linkUrl: banner.linkUrl, active: banner.active })
    setDialogOpen(true)
  }

  const handleSave = () => {
    if (!formData.title.trim()) return
    if (editingBanner) {
      setBanners((prev) =>
        prev.map((b) =>
          b.id === editingBanner.id ? { ...b, title: formData.title, imageUrl: formData.imageUrl, linkUrl: formData.linkUrl, active: formData.active } : b
        )
      )
    } else {
      const newBanner: Banner = {
        id: String(Date.now()),
        title: formData.title,
        imageUrl: formData.imageUrl,
        linkUrl: formData.linkUrl,
        active: formData.active,
      }
      setBanners((prev) => [...prev, newBanner])
    }
    setDialogOpen(false)
  }

  const handleDelete = () => {
    if (!deletingBanner) return
    setBanners((prev) => prev.filter((b) => b.id !== deletingBanner.id))
    setDeleteDialogOpen(false)
    setDeletingBanner(null)
  }

  const toggleActive = (id: string) => {
    setBanners((prev) => prev.map((b) => (b.id === id ? { ...b, active: !b.active } : b)))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Banner Toko</h1>
          <p className="text-muted-foreground">Kelola banner promosi untuk halaman utama toko</p>
        </div>
        <Button onClick={handleOpenAdd} className="bg-orange-600 hover:bg-orange-700">
          <Plus className="mr-2 h-4 w-4" />
          Tambah Banner
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Gambar</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead>URL Link</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {banners.map((banner) => (
                <TableRow key={banner.id}>
                  <TableCell>
                    <div className="flex h-14 w-24 items-center justify-center rounded-lg border bg-muted/50">
                      {banner.imageUrl ? (
                        <img src={banner.imageUrl} alt={banner.title} className="h-full w-full object-cover rounded-lg" />
                      ) : (
                        <Image className="h-6 w-6 text-muted-foreground/50" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{banner.title}</span>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <ExternalLink className="h-3 w-3" />
                      {banner.linkUrl}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Switch
                        checked={banner.active}
                        onCheckedChange={() => toggleActive(banner.id)}
                        className="data-[state=checked]:bg-orange-600"
                      />
                      <Badge variant={banner.active ? "default" : "secondary"} className={banner.active ? "bg-emerald-100 text-emerald-700" : ""}>
                        {banner.active ? "Aktif" : "Nonaktif"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpenEdit(banner)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-600 hover:text-red-700"
                        onClick={() => {
                          setDeletingBanner(banner)
                          setDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{editingBanner ? "Edit Banner" : "Tambah Banner Baru"}</DialogTitle>
            <DialogDescription>
              {editingBanner ? "Ubah informasi banner promosi" : "Tambahkan banner promosi baru ke halaman utama toko"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="banner-title">Judul Banner</Label>
              <Input
                id="banner-title"
                placeholder="Contoh: Promo Musim Hujan - Diskon 30%"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Gambar Banner</Label>
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/30 p-8 hover:bg-muted/50 transition-colors cursor-pointer">
                <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Klik atau seret gambar ke sini</p>
                <p className="text-xs text-muted-foreground/70 mt-1">PNG, JPG atau WebP (maks. 2MB)</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="banner-link">URL Link</Label>
              <Input
                id="banner-link"
                placeholder="/promo/nama-promo"
                value={formData.linkUrl}
                onChange={(e) => setFormData((prev) => ({ ...prev, linkUrl: e.target.value }))}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <Label>Aktifkan Banner</Label>
                <p className="text-sm text-muted-foreground">Banner akan ditampilkan di halaman utama toko</p>
              </div>
              <Switch
                checked={formData.active}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, active: checked }))}
                className="data-[state=checked]:bg-orange-600"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSave} className="bg-orange-600 hover:bg-orange-700">
              {editingBanner ? "Simpan Perubahan" : "Tambah Banner"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Banner</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus banner &quot;{deletingBanner?.title}&quot;? Tindakan ini tidak dapat dibatalkan.
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
