"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
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
  Search,
  Plus,
  X,
} from "lucide-react"
import { useRouter } from "next/navigation"

/* ── Types ── */
interface PRItem {
  id: string
  productName: string
  qty: number
  unit: string
  specs: string
  estPrice: number
}

interface PurchaseRequest {
  id: string
  no: string
  date: string
  requester: string
  department: string
  notes: string
  items: PRItem[]
  totalEst: number
  status: "Open" | "Disetujui"
}

/* ── Helper ── */
const fmt = (n: number) => "Rp " + n.toLocaleString("id-ID")
const today = () => new Date().toISOString().split("T")[0]

/* ── Initial Data ── */
const initialPRs: PurchaseRequest[] = [
  {
    id: "1",
    no: "PR-2026-0001",
    date: "2026-07-14",
    requester: "Andi Wijaya",
    department: "Purchasing",
    notes: "Pengadaan bahan baku produksi Q3",
    items: [
      { id: "i1", productName: "Ceramic Coating A1", qty: 50, unit: "pcs", specs: "Kemasan 1kg", estPrice: 250000 },
      { id: "i2", productName: "Nano Sealant", qty: 30, unit: "pcs", specs: "Kemasan 500ml", estPrice: 180000 },
    ],
    totalEst: 17900000,
    status: "Disetujui",
  },
  {
    id: "2",
    no: "PR-2026-0002",
    date: "2026-07-15",
    requester: "Siti Aminah",
    department: "Gudang",
    notes: "Rak penyimpanan baru",
    items: [
      { id: "i3", productName: "Rak Besi Heavy Duty", qty: 10, unit: "unit", specs: "200x50x200 cm", estPrice: 1500000 },
    ],
    totalEst: 15000000,
    status: "Open",
  },
  {
    id: "3",
    no: "PR-2026-0003",
    date: "2026-07-10",
    requester: "Dedi Kurniawan",
    department: "Produksi",
    notes: "Spare part mesin produksi",
    items: [
      { id: "i4", productName: "Bearing SKF 6205", qty: 20, unit: "pcs", specs: "SKF original", estPrice: 85000 },
      { id: "i5", productName: "V-Belt B86", qty: 15, unit: "pcs", specs: "Gates", estPrice: 45000 },
    ],
    totalEst: 2375000,
    status: "Disetujui",
  },
]

/* ── Page ── */
export default function PurchaseRequestsPage() {
  const [data, setData] = useState<PurchaseRequest[]>(initialPRs)
  const [search, setSearch] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [confirmQuotation, setConfirmQuotation] = useState<string | null>(null)
  const router = useRouter()

  const [form, setForm] = useState({
    requester: "",
    department: "",
    notes: "",
  })
  const [formItems, setFormItems] = useState<{ productName: string; qty: string; unit: string; specs: string; estPrice: string }[]>([
    { productName: "", qty: "1", unit: "pcs", specs: "", estPrice: "" },
  ])

  const filtered = useMemo(() => {
    if (!search) return data
    const q = search.toLowerCase()
    return data.filter(
      (pr) =>
        pr.no.toLowerCase().includes(q) ||
        pr.requester.toLowerCase().includes(q) ||
        pr.department.toLowerCase().includes(q) ||
        pr.items.some((i) => i.productName.toLowerCase().includes(q))
    )
  }, [data, search])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Disetujui":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "Open":
        return "bg-blue-50 text-blue-700 border-blue-200"
      default:
        return "bg-slate-50 text-slate-600 border-slate-200"
    }
  }

  const handleSavePR = () => {
    if (!form.requester || !form.department) return
    const nextNo = `PR-2026-${String(data.length + 1).padStart(4, "0")}`
    const items: PRItem[] = formItems
      .filter((f) => f.productName)
      .map((f, i) => ({
        id: `fi-${i}`,
        productName: f.productName,
        qty: parseInt(f.qty) || 1,
        unit: f.unit || "pcs",
        specs: f.specs,
        estPrice: parseInt(f.estPrice.replace(/\D/g, "")) || 0,
      }))
    const totalEst = items.reduce((sum, i) => sum + i.estPrice * i.qty, 0)
    const newPR: PurchaseRequest = {
      id: `pr-${Date.now()}`,
      no: nextNo,
      date: today(),
      requester: form.requester,
      department: form.department,
      notes: form.notes,
      items,
      totalEst,
      status: "Open",
    }
    setData((prev) => [newPR, ...prev])
    setForm({ requester: "", department: "", notes: "" })
    setFormItems([{ productName: "", qty: "1", unit: "pcs", specs: "", estPrice: "" }])
    setModalOpen(false)
  }

  const addFormItem = () => {
    setFormItems((prev) => [...prev, { productName: "", qty: "1", unit: "pcs", specs: "", estPrice: "" }])
  }

  const updateFormItem = (index: number, field: string, value: string) => {
    setFormItems((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)))
  }

  const removeFormItem = (index: number) => {
    setFormItems((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Purchase Requests</h1>
        <p className="text-muted-foreground">
          Pengajuan pembelian barang & jasa
        </p>
      </div>

      {/* Main Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">Daftar Pengajuan</CardTitle>
            <CardDescription>Semua permintaan pembelian barang & jasa</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari PR..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button onClick={() => setModalOpen(true)}>
              <Plus className="mr-1 h-4 w-4" />
              Ajukan PR
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No PR</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Pengaju</TableHead>
                <TableHead>Departemen</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Estimasi Total</TableHead>
                <TableHead>Status</TableHead>

              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                    Tidak ada data pengajuan.
                  </TableCell>
                </TableRow>
              )}
              {filtered.map((pr) => (
                <TableRow key={pr.id} className="hover:bg-muted/30">
                  <TableCell>
                    <Link
                      href={`/purchasing/requests/${pr.id}`}
                      className="text-blue-600 hover:underline font-sans font-medium text-sm"
                    >
                      {pr.no}
                    </Link>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {new Date(pr.date).toLocaleDateString("id-ID")}
                  </TableCell>
                  <TableCell className="text-sm font-medium">{pr.requester}</TableCell>
                  <TableCell className="text-sm">{pr.department}</TableCell>
                  <TableCell className="text-sm">{pr.items.length} item</TableCell>
                  <TableCell className="text-sm font-medium">{fmt(pr.totalEst)}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getStatusBadge(pr.status)}`}
                    >
                      {pr.status}
                    </span>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Confirm Create Quotation Modal */}
      {confirmQuotation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-lg w-full max-w-sm">
            <div className="px-6 py-4 border-b border-slate-200">
              <h3 className="text-base font-semibold text-slate-800">Konfirmasi</h3>
            </div>
            <div className="px-6 py-4">
              <p className="text-sm text-slate-600">
                Buat penawaran harga untuk PR ini?
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-slate-200">
              <button
                onClick={() => setConfirmQuotation(null)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  router.push(`/purchasing/quotations?pr=${confirmQuotation}`)
                  setConfirmQuotation(null)
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
              >
                Ya, Buat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create PR Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white">
              <h3 className="text-base font-semibold text-slate-800">Ajukan PR Baru</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-slate-700">Pengaju *</Label>
                  <Input
                    value={form.requester}
                    onChange={(e) => setForm((prev) => ({ ...prev, requester: e.target.value }))}
                    placeholder="Nama pengaju"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-700">Departemen *</Label>
                  <Input
                    value={form.department}
                    onChange={(e) => setForm((prev) => ({ ...prev, department: e.target.value }))}
                    placeholder="Contoh: Purchasing"
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">Catatan</Label>
                <Textarea
                  value={form.notes}
                  onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="Deskripsi kebutuhan"
                  className="mt-1"
                  rows={2}
                />
              </div>

              {/* Items */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-medium text-slate-700">Daftar Barang</Label>
                  <Button variant="outline" size="sm" onClick={addFormItem}>
                    <Plus className="mr-1 h-3 w-3" />
                    Tambah Item
                  </Button>
                </div>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-3 py-2 text-left font-medium text-xs text-slate-600">Nama Barang</th>
                        <th className="px-3 py-2 text-center font-medium text-xs text-slate-600 w-16">Qty</th>
                        <th className="px-3 py-2 text-center font-medium text-xs text-slate-600 w-16">Satuan</th>
                        <th className="px-3 py-2 text-left font-medium text-xs text-slate-600">Spesifikasi</th>
                        <th className="px-3 py-2 text-right font-medium text-xs text-slate-600 w-28">Estimasi Harga</th>
                        <th className="w-10"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {formItems.map((item, idx) => (
                        <tr key={idx}>
                          <td className="px-3 py-1.5">
                            <Input
                              value={item.productName}
                              onChange={(e) => updateFormItem(idx, "productName", e.target.value)}
                              placeholder="Nama barang"
                              className="h-8 text-xs"
                            />
                          </td>
                          <td className="px-3 py-1.5">
                            <Input
                              type="text"
                              inputMode="numeric"
                              value={item.qty}
                              onChange={(e) => updateFormItem(idx, "qty", e.target.value)}
                              className="h-8 text-xs text-center"
                            />
                          </td>
                          <td className="px-3 py-1.5">
                            <select
                              value={item.unit}
                              onChange={(e) => updateFormItem(idx, "unit", e.target.value)}
                              className="h-8 text-xs w-full border border-input rounded-md px-2 bg-transparent"
                            >
                              <option value="pcs">pcs</option>
                              <option value="unit">unit</option>
                              <option value="kg">kg</option>
                              <option value="box">box</option>
                              <option value="liter">liter</option>
                            </select>
                          </td>
                          <td className="px-3 py-1.5">
                            <Input
                              value={item.specs}
                              onChange={(e) => updateFormItem(idx, "specs", e.target.value)}
                              placeholder="Spesifikasi"
                              className="h-8 text-xs"
                            />
                          </td>
                          <td className="px-3 py-1.5">
                            <Input
                              type="text"
                              inputMode="numeric"
                              value={item.estPrice}
                              onChange={(e) => updateFormItem(idx, "estPrice", e.target.value)}
                              placeholder="0"
                              className="h-8 text-xs text-right"
                            />
                          </td>
                          <td className="px-3 py-1.5 text-center">
                            <button
                              onClick={() => removeFormItem(idx)}
                              className="text-slate-300 hover:text-red-500 transition"
                              disabled={formItems.length <= 1}
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-slate-200">
              <Button variant="outline" onClick={() => setModalOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleSavePR}>Simpan</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
