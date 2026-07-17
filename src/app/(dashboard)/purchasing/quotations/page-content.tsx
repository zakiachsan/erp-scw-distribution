"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
  CheckCircle2,
} from "lucide-react"

/* ── Types ── */
interface VendorEntry {
  id: string
  supplier: string
  total: number
  pilihan: "Dipilih" | "Alternatif"
  fileName?: string
}

interface Quotation {
  id: string
  prNo: string
  prId: string
  projectName: string
  itemCount: number
  vendors: VendorEntry[]
  status: "Menunggu Vendor" | "Menunggu Approval" | "Disetujui" | "Selesai"
  selectedVendor?: string
}

/* ── Initial Data ── */
const initialQuotations: Quotation[] = [
  {
    id: "q1",
    prNo: "PR-2026-0003",
    prId: "3",
    projectName: "Spare part mesin produksi",
    itemCount: 2,
    vendors: [
      { id: "v1", supplier: "PT Sparepart Jaya", total: 2100000, pilihan: "Alternatif", fileName: "penawaran_sparepart_jaya.pdf" },
      { id: "v2", supplier: "CV Teknik Mandiri", total: 2375000, pilihan: "Dipilih", fileName: "penawaran_teknik_mandiri.pdf" },
      { id: "v3", supplier: "UD Bearing Mas", total: 1950000, pilihan: "Alternatif", fileName: "" },
    ],
    status: "Disetujui",
    selectedVendor: "CV Teknik Mandiri",
  },
]

/* ── Content Component ── */
export default function QuotationsListContent() {
  const searchParams = useSearchParams()
  const preselectedPR = searchParams.get("pr")

  const [data, setData] = useState<Quotation[]>(initialQuotations)
  const [search, setSearch] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [qForm, setQForm] = useState({ prNo: "", projectName: "" })

  const filtered = useMemo(() => {
    if (!search) return data
    const q = search.toLowerCase()
    return data.filter(
      (qt) =>
        qt.prNo.toLowerCase().includes(q) ||
        qt.projectName.toLowerCase().includes(q) ||
        qt.vendors.some((v) => v.supplier.toLowerCase().includes(q))
    )
  }, [data, search])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Disetujui":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "Menunggu Approval":
        return "bg-amber-50 text-amber-700 border-amber-200"
      case "Menunggu Vendor":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "Selesai":
        return "bg-slate-50 text-slate-600 border-slate-200"
      default:
        return "bg-slate-50 text-slate-600 border-slate-200"
    }
  }

  const handleCreateQuotation = () => {
    if (!qForm.prNo) return
    const nextId = `q${Date.now()}`
    const newQT: Quotation = {
      id: nextId,
      prNo: qForm.prNo,
      prId: nextId,
      projectName: qForm.projectName || qForm.prNo,
      itemCount: 0,
      vendors: [],
      status: "Menunggu Vendor",
    }
    setData((prev) => [newQT, ...prev])
    setQForm({ prNo: "", projectName: "" })
    setModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Price Quotations</h1>
        <p className="text-muted-foreground">
          Penawaran harga dari vendor — perbandingan & approval
        </p>
      </div>

      {/* Main Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">Daftar Penawaran</CardTitle>
            <CardDescription>Kelola penawaran harga dari vendor</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari penawaran..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button onClick={() => setModalOpen(true)}>
              <Plus className="mr-1 h-4 w-4" />
              Buat Penawaran
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>PR</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Vendor Terpilih</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    Tidak ada data penawaran.
                  </TableCell>
                </TableRow>
              )}
              {filtered.map((qt) => {
                const selected = qt.vendors.find((v) => v.pilihan === "Dipilih")
                return (
                  <TableRow key={qt.id} className="hover:bg-muted/30">
                    <TableCell>
                      <Link
                        href={`/purchasing/requests/${qt.prId}`}
                        className="text-blue-600 hover:underline font-sans font-medium text-sm"
                      >
                        {qt.prNo}
                      </Link>
                    </TableCell>
                    <TableCell className="text-sm font-medium">{qt.projectName}</TableCell>
                    <TableCell className="text-sm">{qt.itemCount || "—"}</TableCell>
                    <TableCell className="text-sm">{qt.vendors.length}</TableCell>
                    <TableCell className="text-sm">
                      {selected ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                          <CheckCircle2 className="w-3 h-3" />
                          {selected.supplier}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getStatusBadge(qt.status)}`}
                      >
                        {qt.status}
                      </span>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Quotation Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-lg w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <h3 className="text-base font-semibold text-slate-800">Buat Penawaran Baru</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">No PR</label>
                <Input
                  value={qForm.prNo}
                  onChange={(e) => setQForm((prev) => ({ ...prev, prNo: e.target.value }))}
                  placeholder="Contoh: PR-2026-0001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Project</label>
                <Input
                  value={qForm.projectName}
                  onChange={(e) => setQForm((prev) => ({ ...prev, projectName: e.target.value }))}
                  placeholder="Deskripsi pengadaan"
                />
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-700">
                Vendor dan item akan ditambahkan di halaman detail penawaran.
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-slate-200">
              <Button variant="outline" onClick={() => setModalOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleCreateQuotation}>Buat</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
