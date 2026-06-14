"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { format } from "date-fns"
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  ArrowLeft,
  Box,
  History,
  MapPin,
  Package,
  Trash2,
  Warehouse,
} from "lucide-react"
import { useWarehouseStore, inboundPOSources } from "@/lib/warehouse-store"

const statusConfig = {
  empty: {
    label: "Empty",
    className: "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400",
    icon: Box,
  },
  occupied: {
    label: "Occupied",
    className: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
    icon: Package,
  },
  full: {
    label: "Full",
    className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    icon: Warehouse,
  },
}

export default function RackDetailPage() {
  const params = useParams()
  const router = useRouter()
  const rackId = params.rackId as string

  const { racks, locations, logs, deleteRack } = useWarehouseStore()

  const rack = useMemo(() => racks.find((r) => r.id === rackId), [racks, rackId])
  const locationName = useMemo(
    () => locations.find((loc) => loc.id === rack?.locationId)?.name ?? "Unknown",
    [locations, rack?.locationId]
  )

  const [deleteOpen, setDeleteOpen] = useState(false)

  const rackLogs = useMemo(
    () =>
      logs
        .filter((log) => log.rackId === rackId)
        .sort((a, b) => b.timestamp - a.timestamp),
    [logs, rackId]
  )

  const handleDelete = () => {
    if (!rack || rack.products.length > 0) {
      setDeleteOpen(false)
      return
    }
    deleteRack(rack.id)
    setDeleteOpen(false)
    router.push("/inventory/warehouse")
  }

  if (!rack) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center gap-4">
          <Link href="/inventory/warehouse">
            <Button variant="ghost" size="icon-sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Rak tidak ditemukan</h1>
        </div>
        <p className="text-muted-foreground">
          Rack yang Anda cari tidak tersedia. Kembali ke halaman Warehouse.
        </p>
        <Link href="/inventory/warehouse">
          <Button variant="outline">Kembali ke Warehouse</Button>
        </Link>
      </div>
    )
  }

  const cfg = statusConfig[rack.status]
  const StatusIcon = cfg.icon
  const pct = Math.round((rack.used / rack.capacity) * 100)
  const canDelete =
    rack.products.length === 0 && (rack.cartons?.length ?? 0) === 0

  // Product catalog lookup for SKU & barcode
  const productCatalog = useMemo(() => {
    const map = new Map<string, { sku: string; barcode: string }>()
    inboundPOSources.forEach((po) =>
      po.items.forEach((item) => {
        if (!map.has(item.name)) {
          map.set(item.name, { sku: item.sku, barcode: item.barcode })
        }
      })
    )
    return map
  }, [])

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Link href="/inventory/warehouse">
            <Button variant="ghost" size="icon-sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{rack.name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span className="text-sm">{locationName}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className={cfg.className}>
            <StatusIcon className="mr-1 h-3.5 w-3.5" />
            {cfg.label}
          </Badge>

          <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setDeleteOpen(true)}
            >
              <Trash2 className="mr-1.5 h-4 w-4" />
              Hapus Rak
            </Button>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {canDelete ? `Hapus ${rack.name}?` : "Tidak Dapat Menghapus Rak"}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {canDelete
                    ? "Rak ini sudah kosong. Tindakan ini tidak bisa dibatalkan."
                    : "Rak masih memiliki produk. Pindahkan semua produk terlebih dahulu sebelum menghapus."}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  {canDelete ? "Batal" : "Tutup"}
                </AlertDialogCancel>
                {canDelete && (
                  <AlertDialogAction onClick={handleDelete}>
                    Hapus
                  </AlertDialogAction>
                )}
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {!canDelete && (
        <p className="text-sm text-muted-foreground">
          Rak hanya bisa dihapus setelah semua produk dan kardus dipindahkan.
        </p>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Warehouse className="h-4 w-4" />
            Informasi Rak
          </CardTitle>
          <CardDescription>Kapasitas dan penggunaan rak saat ini.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Capacity</span>
            <span className="font-medium">
              {rack.used}/{rack.capacity}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${pct}%`,
                backgroundColor:
                  pct >= 90
                    ? "rgb(245, 158, 11)"
                    : pct >= 50
                      ? "rgb(99, 102, 241)"
                      : "rgb(34, 197, 94)",
              }}
            />
          </div>
          <p className="text-right text-xs text-muted-foreground">{pct}% used</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Package className="h-4 w-4" />
            Produk di Dalam Rak
          </CardTitle>
          <CardDescription>
            Daftar produk beserta quantity yang tersimpan di rak ini.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {rack.products.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              Rak ini kosong. Tidak ada produk untuk ditampilkan.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produk</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Barcode</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rack.products.map((product) => {
                  const info = productCatalog.get(product.name)
                  return (
                    <TableRow key={product.name}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{info?.sku ? <Badge variant="secondary">{info.sku}</Badge> : "-"}</TableCell>
                      <TableCell><code className="text-xs text-muted-foreground">{info?.barcode ?? "-"}</code></TableCell>
                      <TableCell className="text-right font-bold">{product.qty}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <History className="h-4 w-4" />
            Riwayat Pergerakan Barang
          </CardTitle>
          <CardDescription>
            Log barang masuk dan keluar dari rak ini.
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {rackLogs.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              Belum ada pergerakan barang di rak ini.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Waktu</TableHead>
                  <TableHead>Produk</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead>Jenis</TableHead>
                  <TableHead>Sumber / Tujuan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rackLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      {format(log.timestamp, "dd MMM yyyy HH:mm")}
                    </TableCell>
                    <TableCell className="font-medium">{log.productName}</TableCell>
                    <TableCell className="text-right">{log.qty}</TableCell>
                    <TableCell>
                      {log.type === "in" ? (
                        <Badge
                          variant="outline"
                          className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                        >
                          Masuk
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                        >
                          Keluar
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {log.relatedRackName}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
