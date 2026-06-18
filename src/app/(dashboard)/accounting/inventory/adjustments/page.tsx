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
  SlidersHorizontal,
  Filter,
} from "lucide-react"

interface Adjustment {
  id: string
  number: string
  date: string
  keterangan: string
  totalItems: number
  status: "Selesai" | "Draft" | "Dibatalkan"
}

const adjustments: Adjustment[] = [
  {
    id: "ADJ-001",
    number: "IA.2026.06.00001",
    date: "2026-06-18",
    keterangan: "Penyesuaian stok SCW Nano Coating 9H - selisih fisik",
    totalItems: 12,
    status: "Selesai",
  },
  {
    id: "ADJ-002",
    number: "IA.2026.06.00002",
    date: "2026-06-17",
    keterangan: "Koreksi stok SCW Body Wash 5L - batch rusak",
    totalItems: 5,
    status: "Selesai",
  },
  {
    id: "ADJ-003",
    number: "IA.2026.06.00003",
    date: "2026-06-15",
    keterangan: "Penyesuaian stok SCW Tire Shine 500ml - exp date",
    totalItems: 8,
    status: "Draft",
  },
  {
    id: "ADJ-004",
    number: "IA.2026.06.00004",
    date: "2026-06-12",
    keterangan: "Adjustment SCW Glass Coating 250ml - sample product",
    totalItems: 3,
    status: "Selesai",
  },
  {
    id: "ADJ-005",
    number: "IA.2026.06.00005",
    date: "2026-06-10",
    keterangan: "Penyesuaian stok SCW Body Polish 500ml - warehouse audit",
    totalItems: 15,
    status: "Dibatalkan",
  },
  {
    id: "ADJ-006",
    number: "IA.2026.06.00006",
    date: "2026-06-08",
    keterangan: "Koreksi stok SCW Leather Treatment - kesalahan input",
    totalItems: 7,
    status: "Selesai",
  },
  {
    id: "ADJ-007",
    number: "IA.2026.06.00007",
    date: "2026-06-05",
    keterangan: "Penyesuaian stok SCW Wheel Shiner 1L - retur supplier",
    totalItems: 4,
    status: "Draft",
  },
  {
    id: "ADJ-008",
    number: "IA.2026.06.00008",
    date: "2026-06-03",
    keterangan: "Adjustment SCW APC 5L - bonus promosi",
    totalItems: 6,
    status: "Selesai",
  },
]

const statusConfig: Record<string, { label: string; className: string }> = {
  Selesai: { label: "Selesai", className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" },
  Draft: { label: "Draft", className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" },
  Dibatalkan: { label: "Dibatalkan", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
}

const categoryFilterOptions = ["Semua", "Selesai", "Draft", "Dibatalkan"]

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export default function AdjustmentsPage() {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("Semua")
  const [statusFilter, setStatusFilter] = useState<"all" | "Selesai" | "Draft" | "Dibatalkan">("all")

  const filtered = useMemo(() => {
    return adjustments.filter((adj) => {
      const matchesSearch =
        adj.number.toLowerCase().includes(search.toLowerCase()) ||
        adj.keterangan.toLowerCase().includes(search.toLowerCase())
      const matchesCategory =
        categoryFilter === "Semua" || adj.status === categoryFilter
      const matchesStatus =
        statusFilter === "all" || adj.status === statusFilter
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [search, categoryFilter, statusFilter])

  const totalCount = adjustments.length
  const selesaiCount = adjustments.filter((a) => a.status === "Selesai").length
  const draftCount = adjustments.filter((a) => a.status === "Draft").length
  const dibatalkanCount = adjustments.filter((a) => a.status === "Dibatalkan").length

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Penyesuaian Persediaan</h1>
          <p className="text-muted-foreground">
            Daftar penyesuaian stok persediaan SCW Distribution
          </p>
        </div>
        <Link href="/accounting/inventory/adjustments/create">
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="mr-2 h-4 w-4" />
            Buat Penyesuaian
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
                <SlidersHorizontal className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{totalCount}</p>
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
                <SlidersHorizontal className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Selesai</p>
                <p className="text-2xl font-bold text-emerald-600">{selesaiCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-shadow hover:shadow-md ${statusFilter === "Draft" ? "ring-2 ring-amber-500" : ""}`}
          onClick={() => setStatusFilter("Draft")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                <SlidersHorizontal className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Draft</p>
                <p className="text-2xl font-bold text-amber-600">{draftCount}</p>
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
                <SlidersHorizontal className="h-5 w-5 text-red-600" />
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
              <CardTitle>Penyesuaian Persediaan</CardTitle>
              <CardDescription>
                {filtered.length} penyesuaian persediaan ditemukan
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
                  placeholder="Cari nomor atau keterangan..."
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
                <TableHead>Keterangan</TableHead>
                <TableHead className="text-right">Total Items</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((adj) => (
                <TableRow key={adj.id}>
                  <TableCell className="font-sans text-xs">
                    <Link
                      href={`/accounting/inventory/adjustments/${adj.id}`}
                      className="text-primary hover:underline"
                    >
                      {adj.number}
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(adj.date)}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground line-clamp-1">
                      {adj.keterangan}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {adj.totalItems} item
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={statusConfig[adj.status]?.className || ""}
                    >
                      {statusConfig[adj.status]?.label || adj.status}
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
