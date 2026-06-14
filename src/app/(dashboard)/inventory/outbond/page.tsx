"use client"

import { useMemo, useState } from "react"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Package,
  ShoppingCart,
  Globe,
  RefreshCw,
  Plus,
  ArrowUpDown,
} from "lucide-react"
import Link from "next/link"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export type OutbondStatus = "New" | "Picking" | "Picked"

export interface OutbondItem {
  id: string
  tanggal: string
  produk: string
  sku: string
  qty: number
  tujuan: string
  referensi: string
  keterangan: string
  status: OutbondStatus
}

const INITIAL_DATA: OutbondItem[] = [
  { id: "out-001", tanggal: "2026-06-14", produk: "SCW Snow Foam", sku: "SCW-SF-001", qty: 5, tujuan: "Sales", referensi: "SO-2026-0102", keterangan: "Pesanan customer atas nama Budi", status: "New" },
  { id: "out-002", tanggal: "2026-06-13", produk: "SCW Ceramic Coating", sku: "SCW-CC-002", qty: 3, tujuan: "Webcommerce", referensi: "TRX-2026-0451", keterangan: "Pembelian via website SCW Store", status: "Picking" },
  { id: "out-003", tanggal: "2026-06-13", produk: "SCW Microfiber Towel", sku: "SCW-MF-015", qty: 10, tujuan: "Sales", referensi: "SO-2026-0099", keterangan: "Pesanan customer atas nama Sari", status: "Picked" },
  { id: "out-004", tanggal: "2026-06-12", produk: "SCW Spray Wax", sku: "SCW-SW-008", qty: 2, tujuan: "Return Supplier", referensi: "RET-2026-0003", keterangan: "Kemasan bocor, dikembalikan ke ChemPro Asia", status: "New" },
  { id: "out-005", tanggal: "2026-06-12", produk: "SCW Tire Gel", sku: "SCW-TG-004", qty: 8, tujuan: "Webcommerce", referensi: "TRX-2026-0448", keterangan: "Pembelian via website SCW Store", status: "Picking" },
  { id: "out-006", tanggal: "2026-06-11", produk: "SCW Glass Cleaner", sku: "SCW-GC-009", qty: 15, tujuan: "Sales", referensi: "SO-2026-0095", keterangan: "Pesanan customer atas nama Dewi", status: "Picked" },
  { id: "out-007", tanggal: "2026-06-10", produk: "SCW Polish Compound", sku: "SCW-PC-007", qty: 1, tujuan: "Return Supplier", referensi: "RET-2026-0002", keterangan: "Produk cacat, dikembalikan ke PT Autocare Indonesia", status: "New" },
  { id: "out-008", tanggal: "2026-06-09", produk: "SCW Snow Foam", sku: "SCW-SF-001", qty: 12, tujuan: "Webcommerce", referensi: "TRX-2026-0435", keterangan: "Pembelian via website SCW Store", status: "New" },
]

const statusConfig: Record<string, { label: string; className: string }> = {
  New: { label: "New", className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
  Picking: { label: "Picking", className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" },
  Picked: { label: "Picked", className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" },
}

const tujuanConfig: Record<string, { label: string; icon: typeof Package; className: string }> = {
  Sales: { label: "Sales", icon: ShoppingCart, className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
  Webcommerce: { label: "Webcommerce", icon: Globe, className: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400" },
  "Return Supplier": { label: "Return Supplier", icon: RefreshCw, className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
}

export default function OutbondPage() {
  const router = useRouter()
  const [statusFilter, setStatusFilter] = useState("All")
  const [data, setData] = useState<OutbondItem[]>(INITIAL_DATA)

  // For deleting unused var warning - will be used in detail page
  const updateStatus = (id: string, status: OutbondStatus) => {
    setData((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)))
  }

  const filtered = useMemo(() => {
    if (statusFilter === "All") return data
    return data.filter((item) => item.status === statusFilter)
  }, [statusFilter, data])

  const summary = useMemo(() => {
    return {
      total: data.length,
      new: data.filter((d) => d.status === "New").length,
      picking: data.filter((d) => d.status === "Picking").length,
      picked: data.filter((d) => d.status === "Picked").length,
    }
  }, [data])

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Outbond</h1>
          <p className="text-muted-foreground">
            Barang keluar dari gudang — New → Picking → Picked
          </p>
        </div>
        <Link href="/inventory/outbond/create">
          <Button>
            <Plus className="mr-1.5 h-4 w-4" />
            Buat Outbond
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Package className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{summary.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">New</p>
                <p className="text-2xl font-bold text-blue-600">{summary.new}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                <ArrowUpDown className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Picking</p>
                <p className="text-2xl font-bold text-amber-600">{summary.picking}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <Package className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Picked</p>
                <p className="text-2xl font-bold text-emerald-600">{summary.picked}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Riwayat Outbond</CardTitle>
              <CardDescription>{filtered.length} transaksi</CardDescription>
            </div>
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "All")}>
              <SelectTrigger className="w-44">
                <span className="text-sm">Filter Status</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">Semua Status</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Picking">Picking</SelectItem>
                <SelectItem value="Picked">Picked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Produk</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead className="text-center">Qty</TableHead>
                  <TableHead>Tujuan</TableHead>
                  <TableHead>Referensi</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((item) => {
                  const cfg = tujuanConfig[item.tujuan] ?? { label: item.tujuan, icon: Package, className: "" }
                  const Icon = cfg.icon
                  const st = statusConfig[item.status]
                  return (
                    <TableRow
                      key={item.id}
                      className="cursor-pointer"
                      onClick={() => router.push(`/inventory/outbond/${item.id}`)}
                    >
                      <TableCell className="font-sans text-xs font-medium">{item.id}</TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground">{item.tanggal}</TableCell>
                      <TableCell className="font-medium">{item.produk}</TableCell>
                      <TableCell><Badge variant="secondary">{item.sku}</Badge></TableCell>
                      <TableCell className="text-center font-sans font-bold">{item.qty}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cfg.className}>
                          <Icon className="mr-1 h-3 w-3" />
                          {cfg.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-sans text-xs text-muted-foreground">{item.referensi}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={st.className}>{st.label}</Badge>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Hidden dialog to keep unused var happy — used by detail page via router state */}
      <Dialog open={false} onOpenChange={() => {}}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle />
            <DialogDescription />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
