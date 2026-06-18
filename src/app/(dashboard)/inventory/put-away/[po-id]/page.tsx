"use client"

import { useEffect, useMemo, useState } from "react"
import type { FormEvent } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Package,
  CheckCircle,
  Plus,
  Minus,
  ArrowRight,
  AlertCircle,
  Warehouse,
} from "lucide-react"
import {
  useWarehouseStore,
} from "@/lib/warehouse-store"

function genId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export default function PutAwayDetailPage() {
  const params = useParams()
  const router = useRouter()
  const poId = params["po-id"] as string

  const {
    racks,
    inboundReceipts,
    assignItemToRack,
    assignCartonToRack,
    confirmPlacement,
  } = useWarehouseStore()

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmMessage, setConfirmMessage] = useState("")

  const [barcode, setBarcode] = useState("")
  const [scanMessage, setScanMessage] = useState<{ text: string; type: "success" | "error" } | null>(null)
  const [scanRackId, setScanRackId] = useState("")

  const poData = useMemo(
    () => inboundReceipts.find((r) => r.poId === poId) ?? null,
    [inboundReceipts, poId]
  )

  useEffect(() => {
    if (!poData) {
      router.push("/inventory/put-away")
    }
  }, [poData, router])

  // ── New state: each rack gets its own group ──
  type GroupEntry = { id: string; productName: string; sku: string; barcode: string; qty: number }
  type RackGroup = { rackId: string; rackName: string; entries: GroupEntry[] }

  const [rackGroups, setRackGroups] = useState<RackGroup[]>([])

  // Init groups from existing store data
  useEffect(() => {
    if (!poData) return
    const groups: RackGroup[] = []
    const groupMap = new Map<string, RackGroup>()

    // Items assigned to racks
    poData.items.forEach((item) => {
      if (item.storageType === "items" && item.rackId) {
        const rack = racks.find((r) => r.id === item.rackId)
        const key = item.rackId
        if (!groupMap.has(key)) {
          groupMap.set(key, {
            rackId: key,
            rackName: rack?.name ?? key,
            entries: [],
          })
        }
        if (item.receivedQty > 0) {
          groupMap.get(key)!.entries.push({
            id: `gent-${genId()}`,
            productName: item.productName,
            sku: item.sku,
            barcode: item.barcode,
            qty: item.receivedQty,
          })
        }
      }
    })

    // Cartons assigned to racks
    poData.cartons.forEach((carton) => {
      if (carton.rackId) {
        const item = poData.items.find((i) => i.productName === carton.productName)
        const rack = racks.find((r) => r.id === carton.rackId)
        const key = carton.rackId
        if (!groupMap.has(key)) {
          groupMap.set(key, {
            rackId: key,
            rackName: rack?.name ?? key,
            entries: [],
          })
        }
        groupMap.get(key)!.entries.push({
          id: `gent-${genId()}`,
          productName: carton.productName,
          sku: item?.sku ?? "-",
          barcode: item?.barcode ?? "",
          qty: carton.contents.reduce((sum, c) => sum + c.estimatedQty, 0),
        })
      }
    })

    groups.push(...groupMap.values())
    setRackGroups(groups)
  }, [poData, racks])

  const allAssigned = useMemo(
    () => rackGroups.length > 0 && rackGroups.every((g) => g.rackId && g.entries.length > 0),
    [rackGroups]
  )

  // ── Dialogs ──
  const [addRackOpen, setAddRackOpen] = useState(false)
  const [selectedRackId, setSelectedRackId] = useState("")

  const [addProductDialogOpen, setAddProductDialogOpen] = useState(false)
  const [addProductGroupIdx, setAddProductGroupIdx] = useState(-1)
  const [productToAdd, setProductToAdd] = useState("")

  // ── Actions ──

  const handleAddRack = () => {
    if (!selectedRackId) return
    const rack = racks.find((r) => r.id === selectedRackId)
    if (!rack) return
    // Prevent duplicate rack group
    if (rackGroups.some((g) => g.rackId === selectedRackId)) {
      setAddRackOpen(false)
      setSelectedRackId("")
      return
    }
    setRackGroups((prev) => [
      ...prev,
      { rackId: selectedRackId, rackName: rack.name, entries: [] },
    ])
    setSelectedRackId("")
    setAddRackOpen(false)
  }

  const openAddProduct = (groupIdx: number) => {
    setAddProductGroupIdx(groupIdx)
    setProductToAdd("")
    setAddProductDialogOpen(true)
  }

  const handleAddProduct = () => {
    if (!productToAdd || addProductGroupIdx < 0 || !poData) return
    const item = poData.items.find((i) => i.productName === productToAdd)
    if (!item) return
    setRackGroups((prev) => {
      const next = [...prev]
      const group = { ...next[addProductGroupIdx] }
      group.entries = [
        ...group.entries,
        { id: `gent-${genId()}`, productName: item.productName, sku: item.sku, barcode: item.barcode, qty: 0 },
      ]
      next[addProductGroupIdx] = group
      return next
    })
    setProductToAdd("")
    setAddProductDialogOpen(false)
  }

  const adjustGroupQty = (groupIdx: number, entryId: string, delta: number) => {
    setRackGroups((prev) => {
      const next = [...prev]
      const group = { ...next[groupIdx] }
      group.entries = group.entries.map((e) =>
        e.id === entryId ? { ...e, qty: Math.max(0, e.qty + delta) } : e
      )
      next[groupIdx] = group
      return next
    })
  }

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault()
    if (!barcode.trim() || !poData || !scanRackId) return
    const item = poData.items.find((i) => i.barcode === barcode.trim())
    if (!item) {
      setScanMessage({ text: `Barcode ${barcode.trim()} tidak ditemukan di PO ini`, type: "error" })
      setBarcode("")
      return
    }
    // Find or create rack group
    setRackGroups((prev) => {
      const next = [...prev]
      let gi = next.findIndex((g) => g.rackId === scanRackId)
      if (gi === -1) {
        const rack = racks.find((r) => r.id === scanRackId)
        if (!rack) return prev
        gi = next.length
        next.push({ rackId: scanRackId, rackName: rack.name, entries: [] })
      }
      const group = { ...next[gi] }
      const existing = group.entries.find((e) => e.productName === item.productName)
      if (existing) {
        group.entries = group.entries.map((e) =>
          e.id === existing.id ? { ...e, qty: e.qty + 1 } : e
        )
      } else {
        group.entries = [
          ...group.entries,
          { id: `gent-${genId()}`, productName: item.productName, sku: item.sku, barcode: item.barcode, qty: 1 },
        ]
      }
      next[gi] = group
      return next
    })
    setScanMessage({ text: `${item.productName} → ${racks.find((r) => r.id === scanRackId)?.name ?? scanRackId}`, type: "success" })
    setBarcode("")
  }

  const handleSave = () => {
    rackGroups.forEach((group) => {
      group.entries.forEach((entry) => {
        if (group.rackId) {
          assignItemToRack(poId, entry.productName, group.rackId)
        }
      })
    })
    const result = confirmPlacement(poId)
    setConfirmMessage(result.message)
    setConfirmOpen(true)
  }

  // Available products for "Tambah Produk" — from PO items with received > 0
  const availableProducts = useMemo(() => {
    if (!poData) return []
    return poData.items.filter((i) => i.receivedQty > 0)
  }, [poData])

  // Racks that are NOT already added as a group
  const availableRacks = useMemo(
    () => racks.filter((r) => !rackGroups.some((g) => g.rackId === r.id)),
    [racks, rackGroups]
  )

  if (!poData) {
    return (
      <div className="flex h-96 items-center justify-center text-muted-foreground">
        Memuat data PO...
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Warehouse className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Put Away — {poData.poNumber}</h1>
            <p className="text-muted-foreground">{poData.supplier}</p>
          </div>
        </div>
        <Badge variant="outline" className="w-fit text-sm">
          <Package className="mr-1 h-4 w-4" />
          {poData.status === "assigned" ? "Completed" : "Pending"}
        </Badge>
      </div>

      {/* Section 1: Informasi Stok */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Informasi Stok</CardTitle>
          <CardDescription>
            Total stok yang sudah di-receive dari PO ini.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produk</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead className="text-center">Received</TableHead>
                  <TableHead className="text-center">Assigned</TableHead>
                  <TableHead className="text-center">Sisa</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {poData.items.map((item) => {
                  const assignedTotal = rackGroups
                    .flatMap((g) => g.entries)
                    .filter((e) => e.productName === item.productName)
                    .reduce((sum, e) => sum + e.qty, 0)
                  const sisa = item.receivedQty - assignedTotal
                  return (
                    <TableRow key={item.productName}>
                      <TableCell className="font-medium">{item.productName}</TableCell>
                      <TableCell><Badge variant="secondary">{item.sku}</Badge></TableCell>
                      <TableCell className="text-center font-sans font-medium">{item.receivedQty}</TableCell>
                      <TableCell className="text-center font-sans font-medium">
                        {assignedTotal > 0 ? assignedTotal : <span className="text-muted-foreground">0</span>}
                      </TableCell>
                      <TableCell className="text-center">
                        {sisa > 0 ? (
                          <span className="text-amber-600 font-medium">{sisa}</span>
                        ) : sisa === 0 ? (
                          <span className="text-green-600 font-medium">0</span>
                        ) : (
                          <span className="text-red-600 font-medium">{Math.abs(sisa)}</span>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Scan Barcode */}
      {poData.status === "receiving" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Scan Barcode</CardTitle>
            <CardDescription>
              Scan barcode produk untuk langsung assign ke rak yang dipilih.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <form onSubmit={handleScan} className="flex gap-2">
              <Input
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                placeholder="Masukkan atau scan barcode"
                className="flex-1"
                autoFocus
              />
              <Button type="submit" disabled={!scanRackId}>Scan</Button>
            </form>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Assign ke Rak:</span>
              <Select value={scanRackId} onValueChange={(v) => setScanRackId(v ?? "")}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="— Pilih rak">
                    {scanRackId ? racks.find(r => r.id === scanRackId)?.name : "— Pilih rak"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {rackGroups.map((group) => (
                    <SelectItem key={group.rackId} value={group.rackId}>
                      {group.rackName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {scanMessage && (
              <p
                className={`text-sm ${
                  scanMessage.type === "success"
                    ? "text-green-600"
                    : "text-destructive"
                }`}
              >
                {scanMessage.text}
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Section 2: Rack Assignment — grouped by rack */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Rack Assignment</h2>
            <p className="text-sm text-muted-foreground">
              Setiap rak punya section sendiri. Tambah rak, lalu isi produk dan qty.
            </p>
          </div>
          <Dialog open={addRackOpen} onOpenChange={setAddRackOpen}>
            <Button
              variant="default"
              size="sm"
              onClick={() => { setSelectedRackId(""); setAddRackOpen(true) }}
              disabled={availableRacks.length === 0 || poData.status === "assigned"}
            >
              <Plus className="mr-1 h-4 w-4" />
              Tambah Rak
            </Button>
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>Tambah Rak</DialogTitle>
                <DialogDescription>Pilih rak yang mau diisi produk.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <Select value={selectedRackId} onValueChange={(v) => setSelectedRackId(v ?? "")}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih rak">
                      {selectedRackId ? racks.find(r => r.id === selectedRackId)?.name : null}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {availableRacks.map((r) => (
                      <SelectItem key={r.id} value={r.id}>
                        {r.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setAddRackOpen(false)}>Batal</Button>
                <Button onClick={handleAddRack} disabled={!selectedRackId}>Tambah</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {rackGroups.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center gap-3 py-12 text-center">
              <Warehouse className="h-12 w-12 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">
                Belum ada rak. Klik &quot;Tambah Rak&quot; untuk mulai.
              </p>
            </CardContent>
          </Card>
        ) : (
          rackGroups.map((group, gi) => (
            <Card key={group.rackId}>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div className="flex items-center gap-2">
                  <Warehouse className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">{group.rackName}</CardTitle>
                  <Badge variant="secondary" className="ml-1">
                    {group.entries.reduce((s, e) => s + e.qty, 0)} pcs
                  </Badge>
                </div>
                <Dialog
                  open={addProductDialogOpen && addProductGroupIdx === gi}
                  onOpenChange={(open) => {
                    if (!open) setAddProductDialogOpen(false)
                  }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openAddProduct(gi)}
                    disabled={poData.status === "assigned"}
                  >
                    <Plus className="mr-1 h-3 w-3" />
                    Tambah Produk
                  </Button>
                  <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                      <DialogTitle>Tambah Produk ke {group.rackName}</DialogTitle>
                      <DialogDescription>Pilih produk dari PO untuk dimasukkan ke rak ini.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                      <Select value={productToAdd} onValueChange={(v) => setProductToAdd(v ?? "")}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih produk" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableProducts.map((item) => (
                            <SelectItem key={item.productName} value={item.productName}>
                              {item.productName} — {item.sku}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setAddProductDialogOpen(false)}>Batal</Button>
                      <Button onClick={handleAddProduct} disabled={!productToAdd}>Tambah</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {group.entries.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Belum ada produk. Klik &quot;Tambah Produk&quot; untuk mengisi rak ini.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Produk</TableHead>
                          <TableHead>SKU</TableHead>
                          <TableHead>Barcode</TableHead>
                          <TableHead className="text-center">Qty</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {group.entries.map((entry) => (
                          <TableRow key={entry.id}>
                            <TableCell className="font-medium">{entry.productName}</TableCell>
                            <TableCell><Badge variant="secondary">{entry.sku}</Badge></TableCell>
                            <TableCell><code className="text-xs text-muted-foreground">{entry.barcode || "-"}</code></TableCell>
                            <TableCell className="text-center">
                              <div className="flex items-center justify-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-7 w-7"
                                  disabled={poData.status === "assigned" || entry.qty === 0}
                                  onClick={() => adjustGroupQty(gi, entry.id, -1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-10 text-center font-sans font-medium">{entry.qty}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-7 w-7"
                                  disabled={poData.status === "assigned"}
                                  onClick={() => adjustGroupQty(gi, entry.id, 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Save Button */}
      {poData.status === "receiving" && (
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => router.push("/inventory/put-away")}>
            Kembali
          </Button>
          <Button size="lg" onClick={handleSave} disabled={!allAssigned} className="gap-2">
            {allAssigned ? (
              <span className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Simpan & Konfirmasi
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Lengkapi Rack Assignment
              </span>
            )}
            {allAssigned && <ArrowRight className="h-5 w-5" />}
          </Button>
        </div>
      )}

      {/* Confirm Dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {confirmMessage.includes("berhasil") ? "Konfirmasi Berhasil" : "Konfirmasi Gagal"}
            </DialogTitle>
            <DialogDescription>{confirmMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => {
                setConfirmOpen(false)
                if (confirmMessage.includes("berhasil")) router.push("/inventory/put-away")
              }}
            >
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
