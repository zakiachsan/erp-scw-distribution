"use client"

import React, { useState } from "react"
import {
  FolderTree,
  Plus,
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown,
  Car,
  Droplets,
  CircleDot,
  Shield,
  Wrench,
  Sparkles,
  Eraser,
  SprayCan,
  GripVertical,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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

interface Category {
  id: string
  name: string
  slug: string
  description: string
  productCount: number
  position: number
  icon: React.ComponentType<{ className?: string }>
}

const initialCategories: Category[] = [
  { id: "1", name: "Exterior Care", slug: "exterior-care", description: "Produk perawatan eksterior mobil seperti wax, sealant, dan polish", productCount: 12, position: 1, icon: Car },
  { id: "2", name: "Interior Care", slug: "interior-care", description: "Produk perawatan interior mobil seperti dashboard cleaner dan leather care", productCount: 8, position: 2, icon: Sparkles },
  { id: "3", name: "Wheel & Tire", slug: "wheel-tire", description: "Produk perawatan velg, ban, dan wheel arch", productCount: 6, position: 3, icon: CircleDot },
  { id: "4", name: "Coating & Protection", slug: "coating-protection", description: "Ceramic coating, sealant, dan paint protection film", productCount: 15, position: 4, icon: Shield },
  { id: "5", name: "Tools & Accessories", slug: "tools-accessories", description: "Alat dan aksesoris detailing mobil", productCount: 10, position: 5, icon: Wrench },
  { id: "6", name: "Wash & Shine", slug: "wash-shine", description: "Shampoo mobil, quick detailer, dan wash mitt", productCount: 9, position: 6, icon: Droplets },
  { id: "7", name: "Correction", slug: "correction", description: "Compound, polish, dan pad untuk paint correction", productCount: 5, position: 7, icon: Eraser },
  { id: "8", name: "Prep & Decon", slug: "prep-decon", description: "Iron remover, tar remover, clay bar, dan decontamination", productCount: 7, position: 8, icon: SprayCan },
]

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null)
  const [formData, setFormData] = useState({ name: "", slug: "", description: "" })

  const handleOpenAdd = () => {
    setEditingCategory(null)
    setFormData({ name: "", slug: "", description: "" })
    setDialogOpen(true)
  }

  const handleOpenEdit = (cat: Category) => {
    setEditingCategory(cat)
    setFormData({ name: cat.name, slug: cat.slug, description: cat.description })
    setDialogOpen(true)
  }

  const handleNameChange = (value: string) => {
    const slug = value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
    setFormData((prev) => ({ ...prev, name: value, slug: editingCategory ? prev.slug : slug }))
  }

  const handleSave = () => {
    if (!formData.name.trim()) return
    if (editingCategory) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingCategory.id ? { ...c, name: formData.name, slug: formData.slug, description: formData.description } : c
        )
      )
    } else {
      const newCategory: Category = {
        id: String(Date.now()),
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        productCount: 0,
        position: categories.length + 1,
        icon: FolderTree,
      }
      setCategories((prev) => [...prev, newCategory])
    }
    setDialogOpen(false)
  }

  const handleDelete = () => {
    if (!deletingCategory) return
    setCategories((prev) =>
      prev.filter((c) => c.id !== deletingCategory.id).map((c, i) => ({ ...c, position: i + 1 }))
    )
    setDeleteDialogOpen(false)
    setDeletingCategory(null)
  }

  const moveUp = (index: number) => {
    if (index === 0) return
    setCategories((prev) => {
      const newCats = [...prev]
      ;[newCats[index - 1], newCats[index]] = [newCats[index], newCats[index - 1]]
      return newCats.map((c, i) => ({ ...c, position: i + 1 }))
    })
  }

  const moveDown = (index: number) => {
    if (index === categories.length - 1) return
    setCategories((prev) => {
      const newCats = [...prev]
      ;[newCats[index], newCats[index + 1]] = [newCats[index + 1], newCats[index]]
      return newCats.map((c, i) => ({ ...c, position: i + 1 }))
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Kategori Produk</h1>
          <p className="text-muted-foreground">Kelola kategori produk WebCommerce</p>
        </div>
        <Button onClick={handleOpenAdd} className="bg-orange-600 hover:bg-orange-700">
          <Plus className="mr-2 h-4 w-4" />
          Tambah Kategori
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12 text-center">No</TableHead>
                <TableHead className="w-10"></TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="text-center">Jumlah Produk</TableHead>
                <TableHead className="text-center">Posisi</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((cat, index) => {
                const Icon = cat.icon
                return (
                  <TableRow key={cat.id}>
                    <TableCell className="text-center text-muted-foreground">{index + 1}</TableCell>
                    <TableCell>
                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="font-medium">{cat.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{cat.slug}</TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-medium text-orange-700">
                        {cat.productCount} produk
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          disabled={index === 0}
                          onClick={() => moveUp(index)}
                        >
                          <ChevronUp className="h-4 w-4" />
                        </Button>
                        <span className="text-sm font-medium w-6 text-center">{cat.position}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          disabled={index === categories.length - 1}
                          onClick={() => moveDown(index)}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpenEdit(cat)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:text-red-700"
                          onClick={() => {
                            setDeletingCategory(cat)
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

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingCategory ? "Edit Kategori" : "Tambah Kategori Baru"}</DialogTitle>
            <DialogDescription>
              {editingCategory ? "Ubah informasi kategori produk" : "Tambahkan kategori produk baru ke toko"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="cat-name">Nama Kategori</Label>
              <Input
                id="cat-name"
                placeholder="Masukkan nama kategori"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cat-slug">Slug</Label>
              <Input
                id="cat-slug"
                placeholder="kategori-slug"
                value={formData.slug}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cat-desc">Deskripsi</Label>
              <Textarea
                id="cat-desc"
                placeholder="Deskripsi singkat kategori"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSave} className="bg-orange-600 hover:bg-orange-700">
              {editingCategory ? "Simpan Perubahan" : "Tambah Kategori"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Kategori</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus kategori &quot;{deletingCategory?.name}&quot;? Semua produk dalam kategori ini akan kehilangan kategori.
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
