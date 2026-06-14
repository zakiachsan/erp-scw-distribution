"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
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
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  Package,
  Truck,
  Plus,
  Minus,
  ArrowRight,
} from "lucide-react"
import {
  useWarehouseStore,
  inboundPOSources,
} from "@/lib/warehouse-store"

function formatScanTime(ts: number): string {
  const d = new Date(ts)
  return d.toLocaleString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

export default function ReceivePOPage() {
  const params = useParams()
  const router = useRouter()
  const poId = params["po-id"] as string

  const {
    inboundReceipts,
    startReceipt,
    scanProductBarcode,
    adjustReceivedQty,
  } = useWarehouseStore()

  const [barcode, setBarcode] = useState("")
  const [scanMessage, setScanMessage] = useState<{ text: string; type: "success" | "error" } | null>(null)

  const [scanLogProduct, setScanLogProduct] = useState<string>("all")

  const source = useMemo(
    () => inboundPOSources.find((p) => p.id === poId),
    [poId]
  )

  const poData = useMemo(
    () => inboundReceipts.find((r) => r.poId === poId) ?? null,
    [inboundReceipts, poId]
  )

  useEffect(() => {
    if (!source) {
      router.push("/inventory/inbound")
    }
  }, [source, router])

  const handleStartReceipt = () => {
    if (!source) return
    startReceipt(source)
  }

  // Data for scan log filters
  const allScanLogs = useMemo(() => {
    if (!poData) return []
    return poData.items.flatMap((item) =>
      (item.scanLogs ?? []).map((log) => ({
        ...log,
        productName: item.productName,
        orderedQty: item.orderedQty,
      }))
    )
  }, [poData])

  const filteredScanLogs = useMemo(() => {
    if (scanLogProduct === "all") return allScanLogs
    return allScanLogs.filter((log) => log.productName === scanLogProduct)
  }, [allScanLogs, scanLogProduct])

  const productsWithLogs = useMemo(() => {
    if (!poData) return []
    return poData.items.filter((item) => (item.scanLogs ?? []).length > 0)
  }, [poData])

  const allCompleted = useMemo(() => {
    if (!poData) return false
    return poData.items.every((i) => i.receivedQty >= i.orderedQty)
  }, [poData])

  if (!source) {
    return (
      <div className="flex h-96 items-center justify-center text-muted-foreground">
        Memuat data PO...
      </div>
    )
  }

  if (!poData) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-4 text-muted-foreground">
        <p>Belum ada sesi receiving untuk PO ini.</p>
        <Button onClick={handleStartReceipt}>Mulai Receive</Button>
      </div>
    )
  }

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault()
    if (!barcode.trim()) return
    const result = scanProductBarcode(poId, barcode.trim())
    setScanMessage({
      text: result.message,
      type: result.ok ? "success" : "error",
    })
    setBarcode("")
  }

  const handleAdjust = (productName: string, delta: number) => {
    const result = adjustReceivedQty(poId, productName, delta)
    setScanMessage({
      text: result.message,
      type: result.ok ? "success" : "error",
    })
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Truck className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              Receive{" "}
              <Link
                href={`/purchasing/${source.id}`}
                className="text-primary hover:underline"
              >
                {poData.poNumber}
              </Link>
            </h1>
            <p className="text-muted-foreground">{poData.supplier}</p>
          </div>
        </div>
        <Badge variant="outline" className="w-fit text-sm">
          <Package className="mr-1 h-4 w-4" />
          {poData.status === "assigned" ? "Assigned" : "Receiving"}
        </Badge>
      </div>

      {/* PO Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Informasi PO</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Supplier</p>
              <p className="font-medium">{poData.supplier}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Ship Date</p>
              <p className="font-medium">{source?.shipDate ?? "-"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Expected Arrival</p>
              <p className="font-medium">{source?.expectedArrival ?? "-"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scan Input */}
      {poData.status === "receiving" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Scan Barcode</CardTitle>
            <CardDescription>
              Scan barcode produk untuk menambah received qty.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleScan} className="flex gap-2">
              <Input
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                placeholder="Masukkan atau scan barcode"
                className="flex-1"
                autoFocus
              />
              <Button type="submit">Scan</Button>
            </form>
            {scanMessage && (
              <p
                className={`mt-2 text-sm ${
                  scanMessage.type === "success"
                    ? "text-green-600"
                    : "text-destructive"
                }`}
              >
                {scanMessage.text}
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Item PO */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Item PO</CardTitle>
          <CardDescription>
            Daftar barang yang dipesan dalam PO ini. Tambah atau kurangi received qty secara manual atau via scan barcode.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produk</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead className="text-center">Ordered</TableHead>
                  <TableHead className="text-center">Received</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {poData.items.map((item) => {
                  const productCartons = poData.cartons.filter(
                    (c) => c.productName === item.productName
                  )
                  const isBoxed = productCartons.length > 0
                  return (
                    <TableRow key={item.productName}>
                      <TableCell className="font-medium">
                        {item.productName}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{item.sku}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {item.orderedQty}
                      </TableCell>
                      <TableCell className="text-center">
                        {isBoxed ? (
                          <div className="flex flex-col items-center gap-1">
                            <Badge variant="outline" className="text-xs">
                              <Package className="mr-1 h-3 w-3" />
                              Masih di Box
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {productCartons[0]?.barcode ?? "-"}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              disabled={poData.status === "assigned"}
                              onClick={() =>
                                handleAdjust(item.productName, -1)
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-10 text-center font-sans font-medium">
                              {item.receivedQty}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              disabled={poData.status === "assigned"}
                              onClick={() => handleAdjust(item.productName, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {isBoxed ? (
                          <Badge variant="outline" className="text-xs text-muted-foreground">
                            Di Box
                          </Badge>
                        ) : item.receivedQty === 0 ? (
                          <Badge variant="outline" className="text-xs text-muted-foreground">
                            Belum
                          </Badge>
                        ) : item.receivedQty < item.orderedQty ? (
                          <Badge variant="outline" className="text-xs text-amber-600 border-amber-300">
                            Kurang
                          </Badge>
                        ) : item.receivedQty === item.orderedQty ? (
                          <Badge variant="default" className="text-xs bg-green-600 text-white">
                            Lengkap
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs text-red-600 border-red-300">
                            Lebih
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {allCompleted && poData.status === "receiving" && (
        <div className="flex justify-end">
          <Link href={`/inventory/put-away/${poId}`}>
            <Button size="lg" className="gap-2">
              Proses Put Away
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      )}

      {/* Scan Log */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Scan Log</CardTitle>
          <CardDescription>
            Riwayat scan dan perubahan received qty untuk PO ini.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {productsWithLogs.length === 0 ? (
            <p className="text-sm text-muted-foreground">Belum ada scan log.</p>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={scanLogProduct === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setScanLogProduct("all")}
                >
                  Semua
                </Button>
                {productsWithLogs.map((item) => (
                  <Button
                    key={item.productName}
                    variant={
                      scanLogProduct === item.productName ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setScanLogProduct(item.productName)}
                  >
                    {item.productName}
                  </Button>
                ))}
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Waktu</TableHead>
                      {scanLogProduct === "all" && <TableHead>Produk</TableHead>}
                      <TableHead className="text-center">Qty</TableHead>
                      <TableHead className="text-center">Total / Ordered</TableHead>
                      <TableHead>Catatan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...filteredScanLogs]
                      .sort((a, b) => b.timestamp - a.timestamp)
                      .slice(0, 20)
                      .map((log) => {
                        return (
                          <TableRow key={log.id}>
                            <TableCell className="text-muted-foreground whitespace-nowrap">
                              {formatScanTime(log.timestamp)}
                            </TableCell>
                            {scanLogProduct === "all" && (
                              <TableCell>{log.productName}</TableCell>
                            )}
                            <TableCell className="text-center font-sans font-medium">
                              {log.qty > 0 ? `+${log.qty}` : log.qty} pcs
                            </TableCell>
                            <TableCell className="text-center text-xs text-muted-foreground">
                              {log.orderedQty}
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground">
                              {log.note ?? "-"}
                            </TableCell>
                          </TableRow>
                        )
                      })}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
