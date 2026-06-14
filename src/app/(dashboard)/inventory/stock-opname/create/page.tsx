"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  ClipboardCheck,
  Plus,
  Minus,
  ArrowLeft,
  CheckCircle,
  X,
} from "lucide-react"
import { useWarehouseStore, inboundPOSources } from "@/lib/warehouse-store"

interface ProductEntry {
  name: string
  sku: string
  systemQty: number
  physicalQty: number
}

interface SelectedRack {
  rackId: string
  rackName: string
  products: ProductEntry[]
}

// Build product catalog (name → sku)
const productCatalog = new Map<string, string>()
inboundPOSources.forEach((po) =>
  po.items.forEach((item) => {
    if (!productCatalog.has(item.name)) {
      productCatalog.set(item.name, item.sku)
    }
  })
)

export default function CreateStockOpnamePage() {
  const router = useRouter()
  const { racks } = useWarehouseStore()

  const [selectedRacks, setSelectedRacks] = useState<SelectedRack[]>([])
  const [notes, setNotes] = useState("")

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmMessage, setConfirmMessage] = useState("")

  // Racks not yet selected
  const availableRacks = useMemo(
    () => racks.filter((r) => !selectedRacks.some((sr) => sr.rackId === r.id)),
    [racks, selectedRacks]
  )

  const addRack = (rackId: string) => {
    const rack = racks.find((r) => r.id === rackId)
    if (!rack) return
    setSelectedRacks((prev) => [
      ...prev,
      {
        rackId: rack.id,
        rackName: rack.name,
        products: rack.products.map((p) => ({
          name: p.name,
          sku: productCatalog.get(p.name) ?? "-",
          systemQty: p.qty,
          physicalQty: 0,
        })),
      },
    ])
  }

  const removeRack = (rackId: string) => {
    setSelectedRacks((prev) => prev.filter((r) => r.rackId !== rackId))
  }

  const adjustQty = (rackId: string, productName: string, delta: number) => {
    setSelectedRacks((prev) =>
      prev.map((r) =>
        r.rackId === rackId
          ? {
              ...r,
              products: r.products.map((p) =>
                p.name === productName
                  ? { ...p, physicalQty: Math.max(0, p.physicalQty + delta) }
                  : p
              ),
            }
          : r
      )
    )
  }

  const totalSystem = selectedRacks.reduce(
    (s, r) => s + r.products.reduce((ps, p) => ps + p.systemQty, 0), 0
  )
  const totalPhysical = selectedRacks.reduce(
    (s, r) => s + r.products.reduce((ps, p) => ps + p.physicalQty, 0), 0
  )
  const totalProducts = selectedRacks.reduce((s, r) => s + r.products.length, 0)
  const totalRacks = selectedRacks.length

  const handleSubmit = () => {
    if (selectedRacks.length === 0) {
      setConfirmMessage("Pilih minimal 1 rak untuk di-opname.")
      setConfirmOpen(true)
      return
    }
    // In real app, save to store/API here
    setConfirmMessage(
      `Stock Opname berhasil dibuat! ${totalRacks} rak, ${totalProducts} produk diperiksa.`
    )
    setConfirmOpen(true)
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon-sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Stock Opname Baru</h1>
          <p className="text-muted-foreground">
            Pilih rak yang mau di-opname, lalu masukkan jumlah fisik.
          </p>
        </div>
      </div>

      {/* Select Racks */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Pilih Rak</CardTitle>
            <CardDescription>
              {selectedRacks.length === 0
                ? "Belum ada rak dipilih."
                : `${totalRacks} rak dipilih (${totalProducts} produk)`}
            </CardDescription>
          </div>
          {availableRacks.length > 0 && (
            <select
              className="h-9 rounded-lg border border-input bg-background px-3 text-sm"
              value=""
              onChange={(e) => {
                if (e.target.value) addRack(e.target.value)
              }}
            >
              <option value="">Tambah Rak...</option>
              {availableRacks.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          )}
        </CardHeader>
        <CardContent>
          {selectedRacks.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              Pilih rak dari dropdown di atas untuk memulai opname.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {selectedRacks.map((sr) => (
                <Badge
                  key={sr.rackId}
                  variant="secondary"
                  className="flex items-center gap-1 px-3 py-1.5 text-sm"
                >
                  {sr.rackName}
                  <button onClick={() => removeRack(sr.rackId)} className="ml-1 hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Rack Sections */}
      {selectedRacks.map((sr) => {
        const rackVariance = sr.products.reduce((s, p) => s + (p.physicalQty - p.systemQty), 0)
        const rackPhysical = sr.products.reduce((s, p) => s + p.physicalQty, 0)
        return (
          <Card key={sr.rackId}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4 text-primary" />
                <CardTitle className="text-base">{sr.rackName}</CardTitle>
                <Badge variant="secondary" className="ml-1">
                  Sistem: {sr.products.reduce((s, p) => s + p.systemQty, 0)} &middot; Fisik: {rackPhysical}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produk</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead className="text-center">Sistem</TableHead>
                    <TableHead className="text-center">Fisik</TableHead>
                    <TableHead className="text-center">Selisih</TableHead>
                    <TableHead className="text-center w-[120px]">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sr.products.map((p) => {
                    const selisih = p.physicalQty - p.systemQty
                    return (
                      <TableRow key={p.name}>
                        <TableCell className="font-medium">{p.name}</TableCell>
                        <TableCell><Badge variant="secondary">{p.sku}</Badge></TableCell>
                        <TableCell className="text-center font-sans">{p.systemQty}</TableCell>
                        <TableCell className="text-center">
                          <Input
                            type="number"
                            className="w-20 h-8 text-center mx-auto"
                            value={p.physicalQty}
                            min={0}
                            onChange={(e) => {
                              const val = parseInt(e.target.value) || 0
                              adjustQty(sr.rackId, p.name, val - p.physicalQty)
                            }}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={`font-sans font-bold ${selisih > 0 ? "text-emerald-600" : selisih < 0 ? "text-red-600" : "text-muted-foreground"}`}>
                            {selisih > 0 ? "+" : ""}{selisih}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => adjustQty(sr.rackId, p.name, -1)}>
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => adjustQty(sr.rackId, p.name, 1)}>
                              <Plus className="h-3 w-3" />
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
        )
      })}

      {/* Notes & Submit */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-2">
          <Label>Catatan (opsional)</Label>
          <Textarea
            placeholder="Catatan tambahan tentang opname ini..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Rak</span>
              <span className="font-bold">{totalRacks}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Produk</span>
              <span className="font-bold">{totalProducts}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Sistem</span>
              <span className="font-bold">{totalSystem}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Fisik</span>
              <span className="font-bold">{totalPhysical}</span>
            </div>
            <hr />
            <Button size="lg" className="w-full gap-2" onClick={handleSubmit} disabled={selectedRacks.length === 0}>
              <CheckCircle className="h-5 w-5" />
              Simpan Opname
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Confirm Dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{confirmMessage.startsWith("Stock Opname berhasil") ? "Berhasil" : "Perhatian"}</DialogTitle>
            <DialogDescription>{confirmMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => {
                setConfirmOpen(false)
                if (confirmMessage.startsWith("Stock Opname berhasil")) {
                  router.push("/inventory/stock-opname")
                }
              }}
            >
              {confirmMessage.startsWith("Stock Opname berhasil") ? "Kembali" : "Tutup"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
