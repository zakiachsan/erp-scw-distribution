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
  Warehouse,
  CheckCircle,
  Clock,
  ArrowRight,
} from "lucide-react"
import {
  useWarehouseStore,
  inboundPOSources,
} from "@/lib/warehouse-store"

export default function PutAwayPage() {
  const router = useRouter()
  const { inboundReceipts } = useWarehouseStore()

  // Find receipts that have received items
  const receiptsWithItems = inboundReceipts.filter(
    (r) => r.items.some((i) => i.receivedQty > 0)
  )

  // Build PO list: each PO that has matching receipts
  const poDataList = receiptsWithItems.map((receipt) => {
    // Dual-format ID lookup
    const po =
      inboundPOSources.find((p) => p.id === receipt.poId) ||
      inboundPOSources.find((p) => p.id === `po-00${receipt.poId}`)

    const receivedItems = receipt.items.filter((i) => i.receivedQty > 0)
    const totalItems = receivedItems.length
    const totalAssigned = receivedItems.filter((i) => i.rackId).length

    let putawayStatus: "Pending Putaway" | "Partial Putaway" | "Putaway Complete"
    if (totalAssigned === 0) {
      putawayStatus = "Pending Putaway"
    } else if (totalAssigned < totalItems) {
      putawayStatus = "Partial Putaway"
    } else {
      putawayStatus = "Putaway Complete"
    }

    return {
      receipt,
      po,
      poId: po?.id || receipt.poId,
      poNumber: po?.poNumber || receipt.poNumber,
      supplier: po?.supplier || receipt.supplier,
      receivedItems,
      totalItems,
      totalAssigned,
      putawayStatus,
    }
  })

  // Stats
  const totalReceived = poDataList.length
  const pendingPutaway = poDataList.filter(
    (d) => d.putawayStatus === "Pending Putaway"
  ).length
  const putawayComplete = poDataList.filter(
    (d) => d.putawayStatus === "Putaway Complete"
  ).length

  const handlePutAway = (poId: string) => {
    router.push(`/inventory/put-away/${poId}`)
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Put Away</h1>
        <p className="text-muted-foreground">
          Assign stok yang sudah diterima ke rak penyimpanan.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                <Warehouse className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Total Received</p>
                <p className="text-lg font-semibold">{totalReceived}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                <Clock className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Pending Putaway</p>
                <p className="text-lg font-semibold">{pendingPutaway}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Putaway Complete</p>
                <p className="text-lg font-semibold">{putawayComplete}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>PO yang Siap di Put Away</CardTitle>
          <CardDescription>
            Purchase Orders yang sudah di-receive dan siap diassign ke rak.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {poDataList.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
              <Warehouse className="h-12 w-12 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">
                Belum ada PO yang di-receive. Silakan lakukan receiving terlebih dahulu di menu Inbound.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>PO Number</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Putaway Status</TableHead>
                    <TableHead className="text-center w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {poDataList.map((data) => {
                    const statusBadge =
                      data.putawayStatus === "Pending Putaway" ? (
                        <Badge variant="destructive">
                          <Clock className="mr-1 h-3 w-3" />
                          Pending Putaway
                        </Badge>
                      ) : data.putawayStatus === "Partial Putaway" ? (
                        <Badge variant="outline" className="text-amber-600 border-amber-300">
                          <Package className="mr-1 h-3 w-3" />
                          Partial Putaway
                        </Badge>
                      ) : (
                        <Badge className="bg-emerald-600">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Putaway Complete
                        </Badge>
                      )

                    return (
                      <TableRow
                        key={data.receipt.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handlePutAway(data.poId)}
                      >
                        <TableCell>
                          <span
                            className="text-blue-600 hover:underline font-sans font-medium text-sm cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation()
                              handlePutAway(data.poId)
                            }}
                          >
                            {data.poNumber}
                          </span>
                        </TableCell>
                        <TableCell>{data.supplier}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-0.5">
                            {data.receivedItems.map((item, i) => (
                              <span key={i} className="text-sm">
                                {item.productName}{" "}
                                <span className="text-muted-foreground">
                                  ×{item.receivedQty}
                                </span>
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{statusBadge}</TableCell>
                        <TableCell className="text-center">
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
