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
  Search,
  Plus,
  ClipboardList,
  Filter,
} from "lucide-react"

interface WorkOrder {
  id: string
  number: string
  date: string
  customer: string
  keterangan: string
  status: "Dalam Proses" | "Selesai" | "Dibatalkan" | "Draft"
}

const workOrders: WorkOrder[] = [
  {
    id: "JC-001",
    number: "JC.2026.06.00001",
    date: "2026-06-18",
    customer: "PT Autogloss Indonesia",
    keterangan: "Coating SCW Nano Coating 9H untuk 10 unit Toyota",
    status: "Dalam Proses",
  },
  {
    id: "JC-002",
    number: "JC.2026.06.00002",
    date: "2026-06-17",
    customer: "CV Ceramic Pro JKT",
    keterangan: "Pembuatan batch SCW Body Wash 50L",
    status: "Dalam Proses",
  },
  {
    id: "JC-003",
    number: "JC.2026.06.00003",
    date: "2026-06-16",
    customer: "PT DetailWorks BDG",
    keterangan: "Produksi SCW Tire Shine 100 botol",
    status: "Selesai",
  },
  {
    id: "JC-004",
    number: "JC.2026.06.00004",
    date: "2026-06-15",
    customer: "GlossUp Bali",
    keterangan: "Coating interior leather treatment",
    status: "Selesai",
  },
  {
    id: "JC-005",
    number: "JC.2026.06.00005",
    date: "2026-06-14",
    customer: "CV ProShine SBY",
    keterangan: "Proses detailing paket showroom",
    status: "Draft",
  },
  {
    id: "JC-006",
    number: "JC.2026.06.00006",
    date: "2026-06-12",
    customer: "DetailPro Semarang",
    keterangan: "Produksi batch kecil SCW Glass Coating",
    status: "Selesai",
  },
  {
    id: "JC-007",
    number: "JC.2026.06.00007",
    date: "2026-06-10",
    customer: "UD Shinemax",
    keterangan: "Coating full body 20 unit",
    status: "Dibatalkan",
  },
  {
    id: "JC-008",
    number: "JC.2026.06.00008",
    date: "2026-06-08",
    customer: "AutoCare Makassar",
    keterangan: "Detailing harian 5 unit",
    status: "Selesai",
  },
]

const statusConfig: Record<string, { label: string; className: string }> = {
  "Dalam Proses": { label: "Dalam Proses", className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" },
  Selesai: { label: "Selesai", className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" },
  Dibatalkan: { label: "Dibatalkan", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
  Draft: { label: "Draft", className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" },
}

const categoryFilterOptions = ["Semua", "Dalam Proses", "Selesai", "Draft", "Dibatalkan"]

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export default function WorkOrdersPage() {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("Semua")
  const [statusFilter, setStatusFilter] = useState<"all" | "Dalam Proses" | "Selesai" | "Dibatalkan" | "Draft">("all")

  const filtered = useMemo(() => {
    return workOrders.filter((order) => {
      const matchesSearch =
        order.customer.toLowerCase().includes(search.toLowerCase()) ||
        order.number.toLowerCase().includes(search.toLowerCase()) ||
        order.keterangan.toLowerCase().includes(search.toLowerCase())
      const matchesCategory =
        categoryFilter === "Semua" || order.status === categoryFilter
      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [search, categoryFilter, statusFilter])

  const totalCount = workOrders.length
  const dalamProsesCount = workOrders.filter((o) => o.status === "Dalam Proses").length
  const selesaiCount = workOrders.filter((o) => o.status === "Selesai").length
  const dibatalkanCount = workOrders.filter((o) => o.status === "Dibatalkan").length

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pekerjaan Pesanan</h1>
          <p className="text-muted-foreground">
            Daftar pekerjaan pesanan produksi SCW Distribution
          </p>
        </div>
        <Link href="/accounting/inventory/work-orders/create">
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="mr-2 h-4 w-4" />
            Buat Pekerjaan
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card
          className={`cursor-pointer transition-shadow hover:shadow-md ${statusFilter === "all" ? "ring-2 ring-indigo-500" : ""}`}
          onClick={() => setStatusFilter("all")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                <ClipboardList className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{totalCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-shadow hover:shadow-md ${statusFilter === "Dalam Proses" ? "ring-2 ring-amber-500" : ""}`}
          onClick={() => setStatusFilter("Dalam Proses")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                <ClipboardList className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Dalam Proses</p>
                <p className="text-2xl font-bold text-amber-600">{dalamProsesCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-shadow hover:shadow-md ${statusFilter === "Selesai" ? "ring-2 ring-emerald-500" : ""}`}
          onClick={() => setStatusFilter("Selesai")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <ClipboardList className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Selesai</p>
                <p className="text-2xl font-bold text-emerald-600">{selesaiCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-shadow hover:shadow-md ${statusFilter === "Dibatalkan" ? "ring-2 ring-red-500" : ""}`}
          onClick={() => setStatusFilter("Dibatalkan")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                <ClipboardList className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Dibatalkan</p>
                <p className="text-2xl font-bold text-red-600">{dibatalkanCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Pekerjaan Pesanan</CardTitle>
              <CardDescription>
                {filtered.length} pekerjaan pesanan ditemukan
                {statusFilter !== "all" && (
                  <span className="ml-1">({statusFilter})</span>
                )}
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              {statusFilter !== "all" && (
                <Button variant="outline" size="sm" onClick={() => setStatusFilter("all")}>
                  Clear filter
                </Button>
              )}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Cari nomor, pelanggan, atau keterangan..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-64 pl-9"
                />
              </div>
              <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v ?? "Semua")}>
                <SelectTrigger className="w-40">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {categoryFilterOptions.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nomor #</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Pelanggan</TableHead>
                <TableHead>Keterangan</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-sans text-xs">
                    <Link
                      href={`/accounting/inventory/work-orders/${order.id}`}
                      className="text-primary hover:underline"
                    >
                      {order.number}
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(order.date)}
                  </TableCell>
                  <TableCell className="font-medium">
                    {order.customer}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground line-clamp-1">
                      {order.keterangan}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={statusConfig[order.status]?.className || ""}
                    >
                      {statusConfig[order.status]?.label || order.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
