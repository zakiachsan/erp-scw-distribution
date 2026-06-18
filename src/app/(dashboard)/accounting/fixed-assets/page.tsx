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
  Package,
  Filter,
  Landmark,
  Building,
  Factory,
  Car,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react"

interface FixedAsset {
  id: number
  name: string
  purchaseDate: string
  quantity: number
  totalAsset: number
  category: string
  status: "active" | "fully-depreciated" | "disposed"
}

const mockAssets: FixedAsset[] = [
  { id: 1, name: "Gedung Gudang Surabaya", purchaseDate: "15/01/2020", quantity: 1, totalAsset: 850000000, category: "Gedung", status: "active" },
  { id: 2, name: "Mesin Filling SCW", purchaseDate: "01/06/2021", quantity: 2, totalAsset: 320000000, category: "Peralatan", status: "active" },
  { id: 3, name: "Mesin Mixing Bahan Coating", purchaseDate: "01/06/2021", quantity: 1, totalAsset: 185000000, category: "Peralatan", status: "active" },
  { id: 4, name: "Mitsubishi L300 Box", purchaseDate: "10/03/2022", quantity: 3, totalAsset: 285000000, category: "Kendaraan", status: "active" },
  { id: 5, name: "Toyota HiAce Distribusi", purchaseDate: "20/01/2023", quantity: 2, totalAsset: 520000000, category: "Kendaraan", status: "active" },
  { id: 6, name: "Komputer Server & Jaringan", purchaseDate: "05/08/2023", quantity: 1, totalAsset: 85000000, category: "Peralatan", status: "active" },
  { id: 7, name: "Printer Label & Barcode", purchaseDate: "15/02/2024", quantity: 4, totalAsset: 15000000, category: "Peralatan", status: "active" },
  { id: 8, name: "Rak Gudang Steel", purchaseDate: "20/05/2020", quantity: 10, totalAsset: 45000000, category: "Peralatan", status: "fully-depreciated" },
  { id: 9, name: "Tanah Gudang", purchaseDate: "01/01/2019", quantity: 1, totalAsset: 450000000, category: "Tanah", status: "active" },
  { id: 10, name: "Forklift Electric", purchaseDate: "12/07/2022", quantity: 2, totalAsset: 120000000, category: "Peralatan", status: "active" },
  { id: 11, name: "Laptop Office Lenovo", purchaseDate: "01/09/2022", quantity: 8, totalAsset: 24000000, category: "Peralatan", status: "fully-depreciated" },
  { id: 12, name: "Kendaraan Motor Operasional", purchaseDate: "10/04/2021", quantity: 3, totalAsset: 18000000, category: "Kendaraan", status: "disposed" },
]

function formatIDR(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`
}

const kategoriFilterOptions = ["Semua", "Tanah", "Gedung", "Peralatan", "Kendaraan"]

const categoryIcons: Record<string, typeof Building> = {
  Tanah: Landmark,
  Gedung: Building,
  Peralatan: Factory,
  Kendaraan: Car,
}

const statusConfig: Record<
  FixedAsset["status"],
  { label: string; className: string; cardColor: string; ringColor: string; textColor: string }
> = {
  active: {
    label: "Aktif",
    className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
    cardColor: "bg-emerald-100 dark:bg-emerald-900/30",
    ringColor: "ring-emerald-500",
    textColor: "text-emerald-600",
  },
  "fully-depreciated": {
    label: "Fully Depreciated",
    className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    cardColor: "bg-amber-100 dark:bg-amber-900/30",
    ringColor: "ring-amber-500",
    textColor: "text-amber-600",
  },
  disposed: {
    label: "Disposed",
    className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    cardColor: "bg-red-100 dark:bg-red-900/30",
    ringColor: "ring-red-500",
    textColor: "text-red-600",
  },
}

export default function FixedAssetsPage() {
  const [search, setSearch] = useState("")
  const [kategoriFilter, setKategoriFilter] = useState("Semua")
  const [statusFilter, setStatusFilter] = useState<"all" | FixedAsset["status"]>("all")

  const filteredAssets = useMemo(() => {
    return mockAssets.filter((a) => {
      const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase())
      const matchesKategori =
        kategoriFilter === "Semua" || a.category === kategoriFilter
      const matchesStatus =
        statusFilter === "all" || a.status === statusFilter
      return matchesSearch && matchesKategori && matchesStatus
    })
  }, [search, kategoriFilter, statusFilter])

  const totalAssets = mockAssets.length
  const activeCount = mockAssets.filter((a) => a.status === "active").length
  const depreciatedCount = mockAssets.filter((a) => a.status === "fully-depreciated").length
  const disposedCount = mockAssets.filter((a) => a.status === "disposed").length

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Aset Tetap</h1>
          <p className="text-muted-foreground">
            Daftar aset tetap SCW Distribution
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card
          className={`cursor-pointer transition-shadow hover:shadow-md ${statusFilter === "all" ? "ring-2 ring-indigo-500" : ""}`}
          onClick={() => setStatusFilter("all")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                <Package className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Aset</p>
                <p className="text-2xl font-bold">{totalAssets}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-shadow hover:shadow-md ${statusFilter === "active" ? "ring-2 ring-emerald-500" : ""}`}
          onClick={() => setStatusFilter("active")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Aktif</p>
                <p className="text-2xl font-bold text-emerald-600">{activeCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-shadow hover:shadow-md ${statusFilter === "fully-depreciated" ? "ring-2 ring-amber-500" : ""}`}
          onClick={() => setStatusFilter("fully-depreciated")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fully Depreciated</p>
                <p className="text-2xl font-bold text-amber-600">{depreciatedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-shadow hover:shadow-md ${statusFilter === "disposed" ? "ring-2 ring-red-500" : ""}`}
          onClick={() => setStatusFilter("disposed")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Disposed</p>
                <p className="text-2xl font-bold text-red-600">{disposedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Aset Tetap</CardTitle>
              <CardDescription>
                {filteredAssets.length} aset ditemukan
                {statusFilter !== "all" && (
                  <span className="ml-1">({statusConfig[statusFilter].label})</span>
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
                  placeholder="Search nama aset..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-64 pl-9"
                />
              </div>
              <Select value={kategoriFilter} onValueChange={(v) => setKategoriFilter(v ?? "Semua")}>
                <SelectTrigger className="w-40">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Kategori Aset" />
                </SelectTrigger>
                <SelectContent>
                  {kategoriFilterOptions.map((k) => (
                    <SelectItem key={k} value={k}>
                      {k}
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
                <TableHead className="w-[60px]">Nomor #</TableHead>
                <TableHead>Nama Aset</TableHead>
                <TableHead>Tanggal Beli</TableHead>
                <TableHead className="text-center">Kuantitas</TableHead>
                <TableHead className="text-right">Total Aset</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center text-sm text-muted-foreground">
                    Tidak ada aset ditemukan
                  </TableCell>
                </TableRow>
              ) : (
                filteredAssets.map((asset) => {
                  const Icon = categoryIcons[asset.category] || Building
                  return (
                    <TableRow key={asset.id}>
                      <TableCell className="font-sans text-xs">
                        <Link
                          href={`/accounting/fixed-assets/${asset.id}`}
                          className="text-primary hover:underline"
                        >
                          {asset.id}
                        </Link>
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-slate-400" />
                          <Link
                            href={`/accounting/fixed-assets/${asset.id}`}
                            className="text-primary hover:underline font-medium"
                          >
                            {asset.name}
                          </Link>
                          <Badge
                            variant="outline"
                            className={statusConfig[asset.status].className}
                          >
                            {statusConfig[asset.status].label}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{asset.purchaseDate}</TableCell>
                      <TableCell className="text-center">{asset.quantity}</TableCell>
                      <TableCell className="text-right font-sans">
                        {formatIDR(asset.totalAsset)}
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
