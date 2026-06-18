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
  CheckCircle2,
  Filter,
} from "lucide-react"

interface Completion {
  id: string
  number: string
  date: string
  workOrder: string
  tipePenyelesaian: string
  keterangan: string
}

const completions: Completion[] = [
  {
    id: "CMP-001",
    number: "CMP.2026.06.00001",
    date: "2026-06-18",
    workOrder: "JC.2026.06.00003",
    tipePenyelesaian: "Barang",
    keterangan: "SCW Tire Shine 100 botol selesai diproduksi",
  },
  {
    id: "CMP-002",
    number: "CMP.2026.06.00002",
    date: "2026-06-17",
    workOrder: "JC.2026.06.00004",
    tipePenyelesaian: "Jasa",
    keterangan: "Coating interior leather treatment selesai",
  },
  {
    id: "CMP-003",
    number: "CMP.2026.06.00003",
    date: "2026-06-16",
    workOrder: "JC.2026.06.00006",
    tipePenyelesaian: "Barang",
    keterangan: "Batch SCW Glass Coating selesai diproduksi",
  },
  {
    id: "CMP-004",
    number: "CMP.2026.06.00004",
    date: "2026-06-15",
    workOrder: "JC.2026.06.00008",
    tipePenyelesaian: "Jasa",
    keterangan: "Detailing harian 5 unit selesai",
  },
  {
    id: "CMP-005",
    number: "CMP.2026.06.00005",
    date: "2026-06-14",
    workOrder: "JC.2026.06.00002",
    tipePenyelesaian: "Barang",
    keterangan: "SCW Body Wash 50L batch selesai",
  },
  {
    id: "CMP-006",
    number: "CMP.2026.06.00006",
    date: "2026-06-12",
    workOrder: "JC.2026.06.00001",
    tipePenyelesaian: "Barang",
    keterangan: "Coating SCW Nano Coating 9H selesai diproses",
  },
]

const tipeBadgeConfig: Record<string, { className: string }> = {
  Barang: { className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
  Jasa: { className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" },
}

const categoryFilterOptions = ["Semua", "Barang", "Jasa"]

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export default function CompletionsPage() {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("Semua")
  const [statusFilter, setStatusFilter] = useState<"all" | "Selesai" | "Draft" | "Dibatalkan">("all")

  const filtered = useMemo(() => {
    return completions.filter((comp) => {
      const matchesSearch =
        comp.workOrder.toLowerCase().includes(search.toLowerCase()) ||
        comp.number.toLowerCase().includes(search.toLowerCase()) ||
        comp.keterangan.toLowerCase().includes(search.toLowerCase())
      const matchesCategory =
        categoryFilter === "Semua" || comp.tipePenyelesaian === categoryFilter
      // All completions are "Selesai" in mock data; statusFilter filters are conceptual
      const matchesStatus =
        statusFilter === "all"
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [search, categoryFilter, statusFilter])

  const totalCount = completions.length
  const selesaiCount = completions.length // All completions are done
  const draftCount = 0
  const dibatalkanCount = 0

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Penyelesaian Pesanan</h1>
          <p className="text-muted-foreground">
            Daftar penyelesaian pekerjaan pesanan SCW Distribution
          </p>
        </div>
        <Link href="/accounting/inventory/completions/create">
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="mr-2 h-4 w-4" />
            Buat Penyelesaian
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
                <CheckCircle2 className="h-5 w-5 text-indigo-600" />
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
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
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
                <CheckCircle2 className="h-5 w-5 text-amber-600" />
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
                <CheckCircle2 className="h-5 w-5 text-red-600" />
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
              <CardTitle>Penyelesaian Pesanan</CardTitle>
              <CardDescription>
                {filtered.length} penyelesaian pesanan ditemukan
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
                  placeholder="Cari nomor, pekerjaan, atau keterangan..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-64 pl-9"
                />
              </div>
              <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v ?? "Semua")}>
                <SelectTrigger className="w-40">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Tipe" />
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
                <TableHead>Pekerjaan Pesanan</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Keterangan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((comp) => (
                <TableRow key={comp.id}>
                  <TableCell className="font-sans text-xs">
                    <Link
                      href={`/accounting/inventory/completions/${comp.id}`}
                      className="text-primary hover:underline"
                    >
                      {comp.number}
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(comp.date)}
                  </TableCell>
                  <TableCell className="font-sans text-xs">
                    <Link
                      href={`/accounting/inventory/work-orders/${comp.workOrder}`}
                      className="text-primary hover:underline"
                    >
                      {comp.workOrder}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={tipeBadgeConfig[comp.tipePenyelesaian]?.className || ""}
                    >
                      {comp.tipePenyelesaian}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground line-clamp-1">
                      {comp.keterangan}
                    </span>
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
