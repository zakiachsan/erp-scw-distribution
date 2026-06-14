"use client"

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
  ClipboardCheck,
  Plus,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import Link from "next/link"

interface OpnameRecord {
  id: string
  tanggal: string
  waktu: string
  petugas: string
  totalRacks: number
  totalProducts: number
  firstProduct: string
  totalSystem: number
  totalPhysical: number
  status: "draft" | "kurang" | "lebih" | "selesai"
}

const OPNAME_HISTORY: OpnameRecord[] = [
  {
    id: "op-001",
    tanggal: "2026-06-14",
    waktu: "10:30",
    petugas: "Admin User",
    totalRacks: 5,
    totalProducts: 5,
    firstProduct: "SCW Snow Foam",
    totalSystem: 688,
    totalPhysical: 682,
    status: "kurang",
  },
  {
    id: "op-002",
    tanggal: "2026-06-10",
    waktu: "14:15",
    petugas: "Admin User",
    totalRacks: 5,
    totalProducts: 8,
    firstProduct: "SCW Snow Foam",
    totalSystem: 1143,
    totalPhysical: 1172,
    status: "lebih",
  },
  {
    id: "op-003",
    tanggal: "2026-06-01",
    waktu: "09:00",
    petugas: "Admin User",
    totalRacks: 1,
    totalProducts: 3,
    firstProduct: "SCW Snow Foam",
    totalSystem: 320,
    totalPhysical: 320,
    status: "selesai",
  },
  {
    id: "op-004",
    tanggal: "2026-05-25",
    waktu: "11:45",
    petugas: "Admin User",
    totalRacks: 5,
    totalProducts: 6,
    firstProduct: "SCW Snow Foam",
    totalSystem: 1005,
    totalPhysical: 985,
    status: "kurang",
  },
  {
    id: "op-005",
    tanggal: "2026-06-15",
    waktu: "08:00",
    petugas: "Admin User",
    totalRacks: 1,
    totalProducts: 2,
    firstProduct: "SCW Snow Foam",
    totalSystem: 305,
    totalPhysical: 0,
    status: "draft",
  },
]

const statusConfig: Record<string, { label: string; className: string }> = {
  draft: { label: "Draft", className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300" },
  kurang: { label: "Stok Kurang", className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
  lebih: { label: "Stok Lebih", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  selesai: { label: "Selesai", className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
}

export default function StockOpnamePage() {
  const router = useRouter()

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Stock Opname</h1>
          <p className="text-muted-foreground">
            Riwayat stock opname yang telah dilakukan.
          </p>
        </div>
        <Link href="/inventory/stock-opname/create">
          <Button>
            <Plus className="mr-1.5 h-4 w-4" />
            Stock Opname Baru
          </Button>
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                <ClipboardCheck className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Opname</p>
                <p className="text-2xl font-bold">{OPNAME_HISTORY.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <ArrowUp className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Produk Diperiksa</p>
                <p className="text-2xl font-bold">
                  {OPNAME_HISTORY.reduce((s, r) => s + r.totalProducts, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                <ArrowDown className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Variance</p>
                <p className="text-2xl font-bold">
                  {OPNAME_HISTORY.reduce((s, r) => s + (r.totalPhysical - r.totalSystem), 0) > 0 ? "+" : ""}
                  {OPNAME_HISTORY.reduce((s, r) => s + (r.totalPhysical - r.totalSystem), 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                <ClipboardCheck className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Selesai</p>
                <p className="text-2xl font-bold">
                  {OPNAME_HISTORY.filter((r) => r.status === "selesai").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Stock Opname</CardTitle>
          <CardDescription>
            Daftar stock opname yang sudah dilakukan beserta hasilnya.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Petugas</TableHead>
                <TableHead>Produk</TableHead>
                <TableHead className="text-center">Total Sistem</TableHead>
                <TableHead className="text-center">Total Fisik</TableHead>
                <TableHead className="text-center">Selisih</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {OPNAME_HISTORY.map((op) => {
                const variance = op.totalPhysical - op.totalSystem
                const cfg = statusConfig[op.status] ?? statusConfig.draft
                return (
                  <TableRow
                    key={op.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => router.push(`/inventory/stock-opname/${op.id}`)}
                  >
                    <TableCell className="whitespace-nowrap">
                      <div className="text-sm">{op.tanggal}</div>
                      <div className="text-xs text-muted-foreground">{op.waktu}</div>
                    </TableCell>
                    <TableCell>{op.petugas}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm">
                          {op.firstProduct}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {op.totalRacks} rak &middot; {op.totalProducts} produk
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-sans font-medium">{op.totalSystem}</TableCell>
                    <TableCell className="text-center font-sans font-medium">{op.totalPhysical}</TableCell>
                    <TableCell className="text-center">
                      <span className={`font-sans font-bold ${variance > 0 ? "text-emerald-600" : variance < 0 ? "text-red-600" : "text-muted-foreground"}`}>
                        {variance > 0 ? "+" : ""}{variance}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cfg.className}>
                        {cfg.label}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
