"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  Plus,
  Trash2,
  Upload,
  X,
  FileText,
} from "lucide-react"

/* ── Types ── */
interface VendorItem {
  id: string
  nama: string
  qty: number
  satuan: string
  hargaSatuan: number
}

interface Vendor {
  id: string
  supplier: string
  total: number
  fileName: string
  fileSize: string
  pilihan: "Dipilih" | "Alternatif"
  items: VendorItem[]
}

interface QuotationDetail {
  id: string
  prNo: string
  prId: string
  projectName: string
  vendors: Vendor[]
  status: "Menunggu Vendor" | "Menunggu Approval" | "Disetujui" | "Selesai"
}

const satuanList = ["pcs", "unit", "kg", "box", "liter", "meter", "set"]

const fmt = (n: number) => "Rp " + n.toLocaleString("id-ID")
const parseNum = (s: string) => parseInt(String(s).replace(/\D/g, "")) || 0

function recalcVendor(v: Vendor): Vendor {
  const total = v.items.reduce((sum, it) => sum + it.qty * it.hargaSatuan, 0)
  return { ...v, total }
}

const initialData: QuotationDetail = {
  id: "q1",
  prNo: "PR-2026-0003",
  prId: "3",
  projectName: "Spare part mesin produksi",
  status: "Disetujui",
  vendors: [
    {
      id: "v1",
      supplier: "PT Sparepart Jaya",
      total: 2100000,
      fileName: "penawaran_sparepart_jaya.pdf",
      fileSize: "245 KB",
      pilihan: "Alternatif",
      items: [
        { id: "vi1", nama: "Bearing SKF 6205", qty: 20, satuan: "pcs", hargaSatuan: 75000 },
        { id: "vi2", nama: "V-Belt B86", qty: 15, satuan: "pcs", hargaSatuan: 40000 },
      ],
    },
    {
      id: "v2",
      supplier: "CV Teknik Mandiri",
      total: 2375000,
      fileName: "penawaran_teknik_mandiri.pdf",
      fileSize: "312 KB",
      pilihan: "Dipilih",
      items: [
        { id: "vi3", nama: "Bearing SKF 6205", qty: 20, satuan: "pcs", hargaSatuan: 85000 },
        { id: "vi4", nama: "V-Belt B86", qty: 15, satuan: "pcs", hargaSatuan: 45000 },
      ],
    },
    {
      id: "v3",
      supplier: "UD Bearing Mas",
      total: 1950000,
      fileName: "",
      fileSize: "—",
      pilihan: "Alternatif",
      items: [
        { id: "vi5", nama: "Bearing SKF 6205", qty: 20, satuan: "pcs", hargaSatuan: 65000 },
        { id: "vi6", nama: "V-Belt B86", qty: 15, satuan: "pcs", hargaSatuan: 43333 },
      ],
    },
  ],
}

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  Disetujui: "default",
  "Menunggu Approval": "secondary",
  "Menunggu Vendor": "outline",
  Selesai: "secondary",
}

export default function QuotationDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = String(params?.id ?? "")

  const [data, setData] = useState<QuotationDetail>(initialData)
  const [addVendorOpen, setAddVendorOpen] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState<{ idx: number; name: string } | null>(null)
  const [form, setForm] = useState({ supplier: "" })
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>(null)
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [uploadVendorId, setUploadVendorId] = useState("")
  const [uploadFileName, setUploadFileName] = useState("")

  const selected = data.vendors.find((v) => v.pilihan === "Dipilih")
  const vendorsWithFile = data.vendors.filter((v) => v.fileName)

  const handlePilih = (vendorIndex: number) => {
    setData((prev) => ({
      ...prev,
      status: "Disetujui" as const,
      vendors: prev.vendors.map((v, i) =>
        i === vendorIndex ? { ...v, pilihan: "Dipilih" as const } : { ...v, pilihan: "Alternatif" as const }
      ),
    }))
  }

  const updateNama = (itemIdx: number, nama: string) => {
    setData((prev) => ({
      ...prev,
      vendors: prev.vendors.map((v) => ({
        ...v,
        items: v.items.map((it, i) => (i === itemIdx ? { ...it, nama } : it)),
      })),
    }))
  }

  const updateQty = (itemIdx: number, qty: number) => {
    setData((prev) => ({
      ...prev,
      vendors: prev.vendors.map((v) =>
        recalcVendor({ ...v, items: v.items.map((it, i) => (i === itemIdx ? { ...it, qty: Math.max(0, qty) } : it)) })
      ),
    }))
  }

  const updateSatuan = (itemIdx: number, satuan: string) => {
    setData((prev) => ({
      ...prev,
      vendors: prev.vendors.map((v) => ({
        ...v,
        items: v.items.map((it, i) => (i === itemIdx ? { ...it, satuan } : it)),
      })),
    }))
  }

  const updateHarga = (vendorIdx: number, itemIdx: number, harga: number) => {
    setData((prev) => ({
      ...prev,
      vendors: prev.vendors.map((v, vi) => {
        if (vi !== vendorIdx) return v
        return recalcVendor({
          ...v,
          items: v.items.map((it, i) => (i === itemIdx ? { ...it, hargaSatuan: Math.max(0, harga) } : it)),
        })
      }),
    }))
  }

  const addItemRow = () => {
    setData((prev) => ({
      ...prev,
      vendors: prev.vendors.map((v) =>
        recalcVendor({
          ...v,
          items: [...v.items, { id: `ni-${Date.now()}`, nama: "Item Baru", qty: 1, satuan: "unit", hargaSatuan: 0 }],
        })
      ),
    }))
  }

  const removeItemRow = (itemIdx: number) => {
    setData((prev) => ({
      ...prev,
      vendors: prev.vendors.map((v) => recalcVendor({ ...v, items: v.items.filter((_, i) => i !== itemIdx) })),
    }))
  }

  const openAddVendor = () => {
    setForm({ supplier: "" })
    setUploadedFile(null)
    setAddVendorOpen(true)
  }

  const handleSaveVendor = () => {
    if (!form.supplier) return
    const templateItems = data.vendors.length > 0
      ? data.vendors[0].items.map((it) => ({
          ...it,
          id: `nvi-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          hargaSatuan: 0,
        }))
      : [{ id: `nvi-${Date.now()}`, nama: "Item Baru", qty: 1, satuan: "unit", hargaSatuan: 0 }]

    const newVendor: Vendor = {
      id: `vnd-${Date.now()}`,
      supplier: form.supplier,
      total: 0,
      fileName: uploadedFile?.name || "",
      fileSize: uploadedFile?.size || "—",
      pilihan: "Alternatif",
      items: templateItems,
    }
    setData((prev) => ({
      ...prev,
      status: prev.status === "Menunggu Vendor" ? "Disetujui" : prev.status,
      vendors: [...prev.vendors, newVendor],
    }))
    setForm({ supplier: "" })
    setUploadedFile(null)
    setAddVendorOpen(false)
  }

  const executeDeleteVendor = () => {
    if (!confirmDelete) return
    setData((prev) => ({
      ...prev,
      vendors: prev.vendors.filter((_, i) => i !== confirmDelete.idx),
    }))
    setConfirmDelete(null)
  }

  const handleUploadFile = () => {
    if (!uploadVendorId || !uploadFileName) return
    const vendorIndex = data.vendors.findIndex((v) => v.id === uploadVendorId)
    if (vendorIndex === -1) return
    setData((prev) => ({
      ...prev,
      vendors: prev.vendors.map((v, i) =>
        i === vendorIndex
          ? { ...v, fileName: uploadFileName, fileSize: "—" }
          : v
      ),
    }))
    setUploadDialogOpen(false)
    setUploadVendorId("")
    setUploadFileName("")
  }

  const getRowLowest = (itemIdx: number) => {
    const prices = data.vendors.map((v) => v.items[itemIdx]?.hargaSatuan || Infinity)
    return Math.min(...prices)
  }

  if (!data) {
    return (
      <div className="space-y-6">
        <Link href="/purchasing/quotations" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>
        <Card>
          <CardContent className="p-8 text-center text-sm text-muted-foreground">Data tidak ditemukan.</CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Link href="/purchasing/quotations" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="w-4 h-4" /> Kembali
      </Link>

      {/* Info Card */}
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-muted-foreground font-sans font-medium">{data.prNo}</span>
              <Badge variant={statusVariant[data.status] || "outline"}>{data.status}</Badge>
            </div>
            <CardTitle>{data.projectName}</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              {data.vendors.length} vendor · {data.vendors[0]?.items.length || 0} item
            </p>
          </div>
          {selected && data.status === "Disetujui" && (
            <Link href={`/purchasing/create?vendor=${selected.supplier}&pr=${data.prNo}`}>
              <Button>
                <Plus className="mr-1 h-4 w-4" />
                Buat PO
              </Button>
            </Link>
          )}
        </CardHeader>
      </Card>

      {/* Dokumen Penawaran Section */}
      <Card>
        <CardHeader className="py-3 flex flex-row items-center justify-between">
          <CardTitle className="text-sm">Dokumen Penawaran</CardTitle>
          <Button variant="outline" size="sm" onClick={() => setUploadDialogOpen(true)}>
            <Upload className="mr-1 h-3.5 w-3.5" /> Upload
          </Button>
        </CardHeader>
        <CardContent className="pb-4">
          {vendorsWithFile.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {vendorsWithFile.map((v) => (
                <div key={v.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{v.fileName}</p>
                    <p className="text-xs text-muted-foreground">
                      {v.supplier} · {v.fileSize}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-sm text-muted-foreground">
              Belum ada dokumen penawaran. Klik "Upload" untuk menambahkan.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Comparison Section */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Perbandingan Harga Vendor</h3>
        <Button variant="outline" size="sm" onClick={openAddVendor}>
          <Plus className="mr-1 h-3.5 w-3.5" /> Tambah Vendor
        </Button>
      </div>

      {/* Comparison Table */}
      {data.vendors.length > 0 && data.vendors[0].items.length > 0 && (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-48">Item</TableHead>
                    <TableHead className="w-20 text-center">Qty</TableHead>
                    <TableHead className="w-20 text-center">Satuan</TableHead>
                    {data.vendors.map((v, vi) => (
                      <TableHead key={v.id} className={`text-center min-w-[140px] ${v.pilihan === "Dipilih" ? "bg-emerald-50" : ""}`}>
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-semibold">{v.supplier}</span>
                          <div className="flex items-center gap-1">
                            {v.pilihan === "Dipilih" ? (
                              <Badge variant="default" className="text-[10px] px-1.5 py-0 h-5 bg-emerald-600">
                                ✓ Dipilih
                              </Badge>
                            ) : (
                              <Button
                                variant="default"
                                size="sm"
                                className="text-[10px] h-6 px-2 bg-emerald-600 hover:bg-emerald-700"
                                onClick={() => handlePilih(vi)}
                              >
                                Pilih
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                              onClick={() => setConfirmDelete({ idx: vi, name: v.supplier })}
                              title="Hapus vendor"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </TableHead>
                    ))}
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.vendors[0].items.map((it, idx) => {
                    const rowLowest = getRowLowest(idx)
                    return (
                      <TableRow key={idx}>
                        <TableCell>
                          <Input
                            type="text"
                            value={it.nama}
                            onChange={(e) => updateNama(idx, e.target.value)}
                            className="h-8 text-xs bg-transparent border-transparent hover:border-input focus:bg-white"
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Input
                            type="text"
                            inputMode="numeric"
                            value={it.qty}
                            onChange={(e) => updateQty(idx, parseNum(e.target.value))}
                            className="h-8 text-xs text-center bg-transparent border-transparent hover:border-input focus:bg-white"
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <select
                            value={it.satuan}
                            onChange={(e) => updateSatuan(idx, e.target.value)}
                            className="h-8 text-xs text-center bg-transparent border border-transparent hover:border-input focus:border-blue-500 focus:bg-white rounded-md px-1 cursor-pointer"
                          >
                            {satuanList.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </TableCell>
                        {data.vendors.map((v, vi) => {
                          const viItem = v.items[idx]
                          const isLowest = viItem && viItem.hargaSatuan === rowLowest && viItem.hargaSatuan > 0
                          return (
                            <TableCell key={v.id} className={`${isLowest ? "bg-emerald-50/40" : ""}`}>
                              <Input
                                type="text"
                                inputMode="numeric"
                                value={viItem?.hargaSatuan || 0}
                                onChange={(e) => updateHarga(vi, idx, parseNum(e.target.value))}
                                className={`h-8 text-xs text-center bg-transparent border-transparent hover:border-input focus:bg-white ${isLowest ? "text-emerald-700 font-bold" : "text-foreground"}`}
                              />
                            </TableCell>
                          )
                        })}
                        <TableCell className="text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                            onClick={() => removeItemRow(idx)}
                            title="Hapus baris"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                  {/* Total Row */}
                  <TableRow className="bg-muted/30 font-semibold">
                    <TableCell className="text-sm">Total</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    {data.vendors.map((v) => (
                      <TableCell key={v.id} className={`text-center text-sm ${v.pilihan === "Dipilih" ? "text-emerald-700" : "text-foreground"}`}>
                        {fmt(v.total)}
                      </TableCell>
                    ))}
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tambah Item button */}
      <Button variant="outline" size="sm" className="border-dashed" onClick={addItemRow}>
        <Plus className="mr-1 h-3.5 w-3.5" /> Tambah Item
      </Button>

      {/* Upload Dokumen Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Upload Dokumen Penawaran</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Pilih Vendor</Label>
              <select
                value={uploadVendorId}
                onChange={(e) => setUploadVendorId(e.target.value)}
                className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">-- Pilih vendor --</option>
                {data.vendors.map((v) => (
                  <option key={v.id} value={v.id}>{v.supplier}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>Nama File</Label>
              <Input
                value={uploadFileName}
                onChange={(e) => setUploadFileName(e.target.value)}
                placeholder="penawaran_supplier.pdf"
                className="mt-1"
              />
            </div>
            <div
              className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition cursor-pointer"
              onClick={() => {
                if (uploadVendorId && !uploadFileName) {
                  const vendor = data.vendors.find((v) => v.id === uploadVendorId)
                  if (vendor) {
                    setUploadFileName(`penawaran_${vendor.supplier.toLowerCase().replace(/\s+/g, "_")}.pdf`)
                  }
                }
              }}
            >
              <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Klik untuk generate nama file otomatis</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setUploadDialogOpen(false); setUploadVendorId(""); setUploadFileName(""); }}>Batal</Button>
            <Button onClick={handleUploadFile} disabled={!uploadVendorId || !uploadFileName}>Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Vendor Dialog */}
      <Dialog open={addVendorOpen} onOpenChange={setAddVendorOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Tambah Vendor</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Project</Label>
              <Input value={data.projectName} readOnly className="bg-muted mt-1" />
            </div>
            <div>
              <Label>Nama Supplier</Label>
              <Input
                value={form.supplier}
                onChange={(e) => setForm((prev) => ({ ...prev, supplier: e.target.value }))}
                placeholder="Contoh: PT Sejahtera Abadi"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="mb-1.5 block">Upload Dokumen Penawaran</Label>
              {uploadedFile ? (
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg border">
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="font-medium">{uploadedFile.name}</span>
                    <span className="text-muted-foreground">({uploadedFile.size})</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setUploadedFile(null)}>
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ) : (
                <div
                  className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition cursor-pointer"
                  onClick={() => {
                    if (form.supplier) {
                      setUploadedFile({
                        name: `penawaran_${form.supplier.toLowerCase().replace(/\s+/g, "_")}.pdf`,
                        size: "—",
                      })
                    }
                  }}
                >
                  <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Klik untuk upload file PDF/Excel</p>
                  {!form.supplier && <p className="text-[10px] text-muted-foreground mt-1">Isi nama supplier terlebih dahulu</p>}
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddVendorOpen(false)}>Batal</Button>
            <Button onClick={handleSaveVendor}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog open={!!confirmDelete} onOpenChange={(open) => !open && setConfirmDelete(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Yakin mau menghapus vendor <span className="font-semibold text-foreground">{confirmDelete?.name}</span>?
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDelete(null)}>Batal</Button>
            <Button variant="destructive" onClick={executeDeleteVendor}>Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
