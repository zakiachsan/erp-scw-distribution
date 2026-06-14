"use client"

import { useMemo } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
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
} from "lucide-react"

const OUTBOUND_DATA = [
  {
    id: "out-001",
    tanggal: "2026-06-14",
    produk: "SCW Snow Foam",
    sku: "SCW-SF-001",
    qty: 5,
    tujuan: "Sales",
    referensi: "SO-2026-0102",
    keterangan: "Pesanan customer atas nama Budi",
  },
  {
    id: "out-002",
    tanggal: "2026-06-13",
    produk: "SCW Ceramic Coating",
    sku: "SCW-CC-002",
    qty: 3,
    tujuan: "Webcommerce",
    referensi: "TRX-2026-0451",
    keterangan: "Pembelian via website SCW Store",
  },
  {
    id: "out-003",
    tanggal: "2026-06-13",
    produk: "SCW Microfiber Towel",
    sku: "SCW-MF-015",
    qty: 10,
    tujuan: "Sales",
    referensi: "SO-2026-0099",
    keterangan: "Pesanan customer atas nama Sari",
  },
  {
    id: "out-004",
    tanggal: "2026-06-12",
    produk: "SCW Spray Wax",
    sku: "SCW-SW-008",
    qty: 2,
    tujuan: "Return Supplier",
    referensi: "RET-2026-0003",
    keterangan: "Kemasan bocor, dikembalikan ke ChemPro Asia",
  },
  {
    id: "out-005",
    tanggal: "2026-06-12",
    produk: "SCW Tire Gel",
    sku: "SCW-TG-004",
    qty: 8,
    tujuan: "Webcommerce",
    referensi: "TRX-2026-0448",
    keterangan: "Pembelian via website SCW Store",
  },
  {
    id: "out-006",
    tanggal: "2026-06-11",
    produk: "SCW Glass Cleaner",
    sku: "SCW-GC-009",
    qty: 15,
    tujuan: "Sales",
    referensi: "SO-2026-0095",
    keterangan: "Pesanan customer atas nama Dewi",
  },
  {
    id: "out-007",
    tanggal: "2026-06-10",
    produk: "SCW Polish Compound",
    sku: "SCW-PC-007",
    qty: 1,
    tujuan: "Return Supplier",
    referensi: "RET-2026-0002",
    keterangan: "Produk cacat, dikembalikan ke PT Autocare Indonesia",
  },
  {
    id: "out-008",
    tanggal: "2026-06-09",
    produk: "SCW Snow Foam",
    sku: "SCW-SF-001",
    qty: 12,
    tujuan: "Webcommerce",
    referensi: "TRX-2026-0435",
    keterangan: "Pembelian via website SCW Store",
  },
]

const tujuanConfig: Record<string, { label: string; icon: typeof Package; className: string }> = {
  Sales: {
    label: "Sales",
    icon: ShoppingCart,
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  },
  Webcommerce: {
    label: "Webcommerce",
    icon: Globe,
    className: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  },
  "Return Supplier": {
    label: "Return Supplier",
    icon: RefreshCw,
    className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  },
}

export default function OutbondPage() {
  const summaryPerTujuan = useMemo(() => {
    const map = new Map<string, number>()
    OUTBOUND_DATA.forEach((item) => {
      map.set(item.tujuan, (map.get(item.tujuan) ?? 0) + item.qty)
    })
    return Array.from(map.entries())
  }, [])

  const totalQty = useMemo(
    () => OUTBOUND_DATA.reduce((sum, item) => sum + item.qty, 0),
    []
  )

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Outbond</h1>
          <p className="text-muted-foreground">
            Barang yang keluar dari gudang — baik dari penjualan, webcommerce, maupun return ke supplier.
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
                <p className="text-sm text-muted-foreground">Total Transaksi</p>
                <p className="text-2xl font-bold">{OUTBOUND_DATA.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sales</p>
                <p className="text-2xl font-bold">
                  {summaryPerTujuan.find(([t]) => t === "Sales")?.[1] ?? 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <Globe className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Webcommerce</p>
                <p className="text-2xl font-bold">
                  {summaryPerTujuan.find(([t]) => t === "Webcommerce")?.[1] ?? 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                <RefreshCw className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Return Supplier</p>
                <p className="text-2xl font-bold">
                  {summaryPerTujuan.find(([t]) => t === "Return Supplier")?.[1] ?? 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Outbound Table */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Barang Keluar</CardTitle>
          <CardDescription>
            Daftar barang yang keluar dari gudang lengkap dengan tujuan dan referensi transaksi.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Produk</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead className="text-center">Qty</TableHead>
                  <TableHead>Tujuan</TableHead>
                  <TableHead>Referensi</TableHead>
                  <TableHead>Keterangan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {OUTBOUND_DATA.map((item) => {
                  const cfg = tujuanConfig[item.tujuan] ?? {
                    label: item.tujuan,
                    icon: Package,
                    className: "",
                  }
                  const Icon = cfg.icon
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="whitespace-nowrap text-muted-foreground">
                        {item.tanggal}
                      </TableCell>
                      <TableCell className="font-medium">{item.produk}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{item.sku}</Badge>
                      </TableCell>
                      <TableCell className="text-center font-sans font-bold">
                        {item.qty}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cfg.className}>
                          <Icon className="mr-1 h-3 w-3" />
                          {cfg.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-sans text-xs text-muted-foreground">
                        {item.referensi}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {item.keterangan}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
