"use client"

import { useState, useMemo, useEffect } from "react"
import type { FormEvent } from "react"
import { useParams, useRouter } from "next/navigation"
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  ClipboardCheck,
  ArrowLeft,
  Plus,
  Minus,
  CheckCircle,
  Trash2,
} from "lucide-react"
import { useWarehouseStore, inboundPOSources } from "@/lib/warehouse-store"

interface ProductEntry {
  name: string
  sku: string
  systemQty: number
  physicalQty: number
}

interface RackOpname {
  rackId: string
  rackName: string
  products: ProductEntry[]
}

// Build product catalog
const productCatalog = new Map<string, string>()
inboundPOSources.forEach((po) =>
  po.items.forEach((item) => {
    if (!productCatalog.has(item.name)) {
      productCatalog.set(item.name, item.sku)
    }
  })
)

const statusConfig: Record<string, { label: string; className: string }> = {
  draft: { label: "Draft", className: "bg-gray-100 text-gray-700" },
  kurang: { label: "Stok Kurang", className: "bg-red-100 text-red-700" },
  lebih: { label: "Stok Lebih", className: "bg-amber-100 text-amber-700" },
  selesai: { label: "Selesai", className: "bg-green-100 text-green-700" },
}

const OPNAME_STORE: Record<string, {
  id: string
  tanggal: string
  waktu: string
  petugas: string
  racks: RackOpname[]
  totalSystem: number
  totalPhysical: number
  status: "draft" | "kurang" | "lebih" | "selesai"
}> = {
  "op-001": {
    id: "op-001", tanggal: "2026-06-14", waktu: "10:30", petugas: "Admin User",
    racks: [
      { rackId: "1", rackName: "Rak A-01", products: [{ name: "SCW Snow Foam", sku: "SCW-SF-001", systemQty: 245, physicalQty: 242 }] },
      { rackId: "2", rackName: "Rak A-02", products: [{ name: "SCW Ceramic Coating", sku: "SCW-CC-002", systemQty: 12, physicalQty: 12 }] },
      { rackId: "4", rackName: "Rak B-01", products: [{ name: "SCW Interior Detailer", sku: "SCW-ID-003", systemQty: 180, physicalQty: 180 }] },
      { rackId: "5", rackName: "Rak B-02", products: [{ name: "SCW Tire Gel", sku: "SCW-TG-004", systemQty: 95, physicalQty: 93 }] },
      { rackId: "3", rackName: "Rak B-03", products: [{ name: "SCW Spray Wax", sku: "SCW-SW-008", systemQty: 156, physicalQty: 155 }] },
    ],
    totalSystem: 688, totalPhysical: 682, status: "kurang",
  },
  "op-002": {
    id: "op-002", tanggal: "2026-06-10", waktu: "14:15", petugas: "Admin User",
    racks: [
      { rackId: "1", rackName: "Rak A-01", products: [{ name: "SCW Snow Foam", sku: "SCW-SF-001", systemQty: 250, physicalQty: 262 }, { name: "SCW Microfiber Wash", sku: "SCW-MW-006", systemQty: 312, physicalQty: 310 }] },
      { rackId: "6", rackName: "Rak D-01", products: [{ name: "SCW Glass Cleaner", sku: "SCW-GC-009", systemQty: 200, physicalQty: 210 }] },
      { rackId: "7", rackName: "Rak D-02", products: [{ name: "SCW Leather Conditioner", sku: "SCW-LC-010", systemQty: 45, physicalQty: 47 }] },
      { rackId: "3", rackName: "Rak B-03", products: [{ name: "SCW Spray Wax", sku: "SCW-SW-008", systemQty: 156, physicalQty: 160 }] },
      { rackId: "8", rackName: "Rak C-01", products: [{ name: "SCW Polish Compound", sku: "SCW-PC-007", systemQty: 35, physicalQty: 35 }, { name: "SCW Clay Bar", sku: "SCW-CB-005", systemQty: 50, physicalQty: 50 }, { name: "SCW Tire Gel", sku: "SCW-TG-004", systemQty: 95, physicalQty: 98 }] },
    ],
    totalSystem: 1143, totalPhysical: 1172, status: "lebih",
  },
  "op-003": {
    id: "op-003", tanggal: "2026-06-01", waktu: "09:00", petugas: "Admin User",
    racks: [
      { rackId: "1", rackName: "Rak A-01", products: [{ name: "SCW Snow Foam", sku: "SCW-SF-001", systemQty: 240, physicalQty: 240 }, { name: "SCW Ceramic Coating", sku: "SCW-CC-002", systemQty: 15, physicalQty: 15 }, { name: "SCW Shampoo Plus", sku: "SCW-SP-018", systemQty: 65, physicalQty: 65 }] },
    ],
    totalSystem: 320, totalPhysical: 320, status: "selesai",
  },
  "op-004": {
    id: "op-004", tanggal: "2026-05-25", waktu: "11:45", petugas: "Admin User",
    racks: [
      { rackId: "1", rackName: "Rak A-01", products: [{ name: "SCW Snow Foam", sku: "SCW-SF-001", systemQty: 230, physicalQty: 222 }, { name: "SCW Microfiber Wash", sku: "SCW-MW-006", systemQty: 300, physicalQty: 297 }] },
      { rackId: "5", rackName: "Rak B-02", products: [{ name: "SCW Tire Gel", sku: "SCW-TG-004", systemQty: 90, physicalQty: 88 }] },
      { rackId: "6", rackName: "Rak D-01", products: [{ name: "SCW Glass Cleaner", sku: "SCW-GC-009", systemQty: 195, physicalQty: 190 }] },
      { rackId: "3", rackName: "Rak B-03", products: [{ name: "SCW Spray Wax", sku: "SCW-SW-008", systemQty: 150, physicalQty: 150 }] },
      { rackId: "7", rackName: "Rak D-02", products: [{ name: "SCW Leather Conditioner", sku: "SCW-LC-010", systemQty: 40, physicalQty: 38 }] },
    ],
    totalSystem: 1005, totalPhysical: 985, status: "kurang",
  },
  "op-005": {
    id: "op-005", tanggal: "2026-06-15", waktu: "08:00", petugas: "Admin User",
    racks: [
      { rackId: "1", rackName: "Rak A-01", products: [{ name: "SCW Snow Foam", sku: "SCW-SF-001", systemQty: 240, physicalQty: 0 }, { name: "SCW Shampoo Plus", sku: "SCW-SP-018", systemQty: 65, physicalQty: 0 }] },
    ],
    totalSystem: 305, totalPhysical: 0, status: "draft",
  },
}

export default function StockOpnameDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const { racks: allRacks } = useWarehouseStore()

  const op = OPNAME_STORE[id] ?? null

  const [localRacks, setLocalRacks] = useState<RackOpname[]>([])
  const [saveOpen, setSaveOpen] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

  // Scan barcode
  const [barcode, setBarcode] = useState("")
  const [scanRackId, setScanRackId] = useState("")
  const [scanMessage, setScanMessage] = useState<{ text: string; type: "success" | "error" } | null>(null)

  // Add rack
  const [addRackValue, setAddRackValue] = useState("")

  // Delete rack confirmation
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [deleteTargetRackId, setDeleteTargetRackId] = useState<string | null>(null)

  // Add product to rack
  const [addProductRackId, setAddProductRackId] = useState<string | null>(null)
  const [addProductValue, setAddProductValue] = useState("")

  useEffect(() => {
    if (op) {
      setLocalRacks(JSON.parse(JSON.stringify(op.racks)))
    }
  }, [op])

  if (!op) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon-sm" onClick={() => router.push("/inventory/stock-opname")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Opname tidak ditemukan</h1>
        </div>
      </div>
    )
  }

  const isDraft = op.status === "draft"

  const availableRacks = useMemo(
    () => allRacks.filter((r) => !localRacks.some((lr) => lr.rackId === r.id)),
    [allRacks, localRacks]
  )

  const totalSystem = localRacks.reduce((s, r) => s + r.products.reduce((ps, p) => ps + p.systemQty, 0), 0)
  const totalPhysical = localRacks.reduce((s, r) => s + r.products.reduce((ps, p) => ps + p.physicalQty, 0), 0)
  const variance = totalPhysical - totalSystem

  const adjustQty = (rackId: string, productName: string, delta: number) => {
    setLocalRacks((prev) =>
      prev.map((r) =>
        r.rackId === rackId
          ? { ...r, products: r.products.map((p) => (p.name === productName ? { ...p, physicalQty: Math.max(0, p.physicalQty + delta) } : p)) }
          : r
      )
    )
  }

  const addRack = () => {
    if (!addRackValue) return
    const rack = allRacks.find((r) => r.id === addRackValue)
    if (!rack) return
    setLocalRacks((prev) => [
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
    setAddRackValue("")
  }

  const handleScan = (e: FormEvent) => {
    e.preventDefault()
    if (!barcode.trim() || !scanRackId) {
      setScanMessage({ text: "Pilih rak dan masukkan barcode", type: "error" })
      return
    }
    // Find product by barcode
    let foundProduct: { name: string; sku: string } | null = null
    for (const po of inboundPOSources) {
      for (const item of po.items) {
        if (item.barcode === barcode.trim()) {
          foundProduct = { name: item.name, sku: item.sku }
          break
        }
      }
      if (foundProduct) break
    }
    if (!foundProduct) {
      setScanMessage({ text: `Barcode ${barcode.trim()} tidak ditemukan`, type: "error" })
      setBarcode("")
      return
    }
    // Add or increment in the selected rack
    setLocalRacks((prev) => {
      const next = [...prev]
      let ri = next.findIndex((r) => r.rackId === scanRackId)
      if (ri === -1) {
        const rack = allRacks.find((r) => r.id === scanRackId)
        if (!rack) return prev
        ri = next.length
        next.push({ rackId: scanRackId, rackName: rack.name, products: [] })
      }
      const rack = { ...next[ri] }
      const existing = rack.products.find((p) => p.name === foundProduct!.name)
      if (existing) {
        rack.products = rack.products.map((p) =>
          p.name === foundProduct!.name ? { ...p, physicalQty: p.physicalQty + 1 } : p
        )
      } else {
        rack.products = [
          ...rack.products,
          { name: foundProduct!.name, sku: foundProduct!.sku, systemQty: 0, physicalQty: 1 },
        ]
      }
      next[ri] = rack
      return next
    })
    setScanMessage({ text: `${foundProduct.name} → ${allRacks.find((r) => r.id === scanRackId)?.name ?? scanRackId}`, type: "success" })
    setBarcode("")
  }

  const handleSaveDraft = () => {
    setSaveMessage("Perubahan draft berhasil disimpan!")
    setSaveOpen(true)
  }

  const confirmDeleteRack = () => {
    if (deleteTargetRackId) {
      setLocalRacks((prev) => prev.filter((r) => r.rackId !== deleteTargetRackId))
    }
    setDeleteConfirmOpen(false)
    setDeleteTargetRackId(null)
  }

  const handleAddProduct = () => {
    if (!addProductRackId || !addProductValue) return
    const item = inboundPOSources.flatMap((po) => po.items).find((i) => i.name === addProductValue)
    if (!item) return
    setLocalRacks((prev) =>
      prev.map((r) =>
        r.rackId === addProductRackId
          ? {
              ...r,
              products: r.products.some((p) => p.name === item.name)
                ? r.products.map((p) => (p.name === item.name ? { ...p, physicalQty: p.physicalQty + 1 } : p))
                : [...r.products, { name: item.name, sku: item.sku, systemQty: 0, physicalQty: 1 }],
            }
          : r
      )
    )
    setAddProductValue("")
    setAddProductRackId(null)
  }

  const handleComplete = () => {
    setSaveMessage("Stock Opname selesai! Status telah diperbarui.")
    setSaveOpen(true)
  }

  const cfg = statusConfig[op.status] ?? statusConfig.draft

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon-sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">Stock Opname — {op.tanggal}</h1>
            <Badge variant="outline" className={cfg.className}>{cfg.label}</Badge>
          </div>
          <p className="text-muted-foreground">{op.petugas} &middot; {op.tanggal} {op.waktu}</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100"><ClipboardCheck className="h-5 w-5 text-indigo-600" /></div>
              <div><p className="text-sm text-muted-foreground">Rak</p><p className="text-2xl font-bold">{localRacks.length}</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100"><ClipboardCheck className="h-5 w-5 text-blue-600" /></div>
              <div><p className="text-sm text-muted-foreground">Produk</p><p className="text-2xl font-bold">{localRacks.reduce((s, r) => s + r.products.length, 0)}</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100"><ClipboardCheck className="h-5 w-5 text-emerald-600" /></div>
              <div><p className="text-sm text-muted-foreground">Total Sistem</p><p className="text-2xl font-bold">{totalSystem}</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${variance > 0 ? "bg-emerald-100" : variance < 0 ? "bg-red-100" : "bg-gray-100"}`}>
                <ClipboardCheck className="h-5 w-5" />
              </div>
              <div><p className="text-sm text-muted-foreground">Total Fisik</p><p className="text-2xl font-bold">{totalPhysical}</p></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scan Barcode — only for draft */}
      {isDraft && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Scan Barcode</CardTitle>
            <CardDescription>Scan barcode produk untuk langsung menambah ke rak yang dipilih.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <form onSubmit={handleScan} className="flex gap-2">
              <Input value={barcode} onChange={(e) => setBarcode(e.target.value)} placeholder="Masukkan atau scan barcode" className="flex-1" autoFocus />
              <Button type="submit" disabled={!scanRackId}>Scan</Button>
            </form>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Scan ke Rak:</span>
              <Select value={scanRackId} onValueChange={setScanRackId}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="— Pilih rak">
                    {scanRackId ? allRacks.find((r) => r.id === scanRackId)?.name : "— Pilih rak"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {allRacks.map((r) => (
                    <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {scanMessage && (
              <p className={`text-sm ${scanMessage.type === "success" ? "text-green-600" : "text-destructive"}`}>{scanMessage.text}</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Rack Sections */}
      {localRacks.map((rack) => {
        const rackVariance = rack.products.reduce((s, p) => s + (p.physicalQty - p.systemQty), 0)
        return (
          <Card key={rack.rackId}>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4 text-primary" />
                <CardTitle className="text-base">{rack.rackName}</CardTitle>
                <Badge variant="secondary" className="ml-1">{rackVariance > 0 ? "+" : ""}{rackVariance}</Badge>
              </div>
              {isDraft && (
                <div className="flex items-center gap-2">
                  <Dialog open={addProductRackId === rack.rackId} onOpenChange={(open) => { if (!open) { setAddProductRackId(null); setAddProductValue("") } }}>
                    <Button variant="outline" size="sm" onClick={() => { setAddProductRackId(rack.rackId); setAddProductValue("") }}>
                      <Plus className="mr-1 h-3 w-3" /> Produk
                    </Button>
                    <DialogContent className="sm:max-w-sm">
                      <DialogHeader>
                        <DialogTitle>Tambah Produk ke {rack.rackName}</DialogTitle>
                        <DialogDescription>Pilih produk yang mau ditambahkan.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-2">
                        <select
                          className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm"
                          value={addProductValue}
                          onChange={(e) => setAddProductValue(e.target.value)}
                        >
                          <option value="">Pilih produk...</option>
                          {inboundPOSources.flatMap((po) => po.items).filter((item, idx, arr) => arr.findIndex((i) => i.name === item.name) === idx).map((item) => (
                            <option key={item.name} value={item.name}>{item.name} — {item.sku}</option>
                          ))}
                        </select>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => { setAddProductRackId(null); setAddProductValue("") }}>Batal</Button>
                        <Button onClick={handleAddProduct} disabled={!addProductValue}>Tambah</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { setDeleteTargetRackId(rack.rackId); setDeleteConfirmOpen(true) }}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
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
                    {isDraft && <TableHead className="text-center w-[120px]">Aksi</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rack.products.map((p) => {
                    const selisih = p.physicalQty - p.systemQty
                    return (
                      <TableRow key={p.name}>
                        <TableCell className="font-medium">{p.name}</TableCell>
                        <TableCell><Badge variant="secondary">{p.sku}</Badge></TableCell>
                        <TableCell className="text-center font-sans">{p.systemQty}</TableCell>
                        <TableCell className="text-center">
                          {isDraft ? (
                            <Input type="number" className="w-20 h-8 text-center mx-auto" value={p.physicalQty} min={0}
                              onChange={(e) => { const val = parseInt(e.target.value) || 0; adjustQty(rack.rackId, p.name, val - p.physicalQty) }} />
                          ) : (
                            <span className="font-sans font-bold">{p.physicalQty}</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={`font-sans font-bold ${selisih > 0 ? "text-emerald-600" : selisih < 0 ? "text-red-600" : "text-muted-foreground"}`}>
                            {selisih > 0 ? "+" : ""}{selisih}
                          </span>
                        </TableCell>
                        {isDraft && (
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => adjustQty(rack.rackId, p.name, -1)}><Minus className="h-3 w-3" /></Button>
                              <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => adjustQty(rack.rackId, p.name, 1)}><Plus className="h-3 w-3" /></Button>
                            </div>
                          </TableCell>
                        )}
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )
      })}

      {/* Add Rack — only for draft */}
      {isDraft && availableRacks.length > 0 && (
        <div className="flex items-center gap-2">
          <select
            className="h-9 rounded-lg border border-input bg-background px-3 text-sm flex-1"
            value={addRackValue}
            onChange={(e) => setAddRackValue(e.target.value)}
          >
            <option value="">Tambah Rak...</option>
            {availableRacks.map((r) => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
          <Button variant="outline" size="sm" onClick={addRack} disabled={!addRackValue}>
            <Plus className="mr-1 h-4 w-4" /> Tambah
          </Button>
        </div>
      )}

      {/* Save Buttons for Draft */}
      {isDraft && (
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => router.push("/inventory/stock-opname")}>Kembali</Button>
          <Button variant="default" onClick={handleSaveDraft} className="gap-2">
            <ClipboardCheck className="h-5 w-5" /> Simpan Draft
          </Button>
          <Button variant="default" onClick={handleComplete} className="gap-2 bg-green-600 hover:bg-green-700">
            <CheckCircle className="h-5 w-5" /> Selesai
          </Button>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Hapus Rak</DialogTitle>
            <DialogDescription>Yakin ingin menghapus rak ini beserta semua data opname di dalamnya?</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>Batal</Button>
            <Button variant="destructive" onClick={confirmDeleteRack}>Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Save Dialog */}
      <Dialog open={saveOpen} onOpenChange={setSaveOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{saveMessage.startsWith("Stock Opname selesai") ? "Selesai" : "Berhasil"}</DialogTitle>
            <DialogDescription>{saveMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => { setSaveOpen(false); if (saveMessage.startsWith("Stock Opname selesai") || saveMessage.startsWith("Perubahan")) router.push("/inventory/stock-opname") }}>
              {saveMessage.startsWith("Stock Opname selesai") || saveMessage.startsWith("Perubahan") ? "Kembali" : "Tutup"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
