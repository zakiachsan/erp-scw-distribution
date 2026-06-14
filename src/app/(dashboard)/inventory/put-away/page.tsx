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
  Package,
  ArrowRight,
  Warehouse,
} from "lucide-react"
import {
  useWarehouseStore,
  inboundPOSources,
} from "@/lib/warehouse-store"

export default function PutAwayPage() {
  const router = useRouter()
  const { inboundReceipts } = useWarehouseStore()

  // Only show POs that have at least started receiving
  const receiptsWithItems = inboundReceipts.filter(
    (r) => r.items.some((i) => i.receivedQty > 0)
  )

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

      <Card>
        <CardHeader>
          <CardTitle>PO yang Siap di Put Away</CardTitle>
          <CardDescription>
            Purchase Orders yang sudah di-receive dan siap diassign ke rak.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {receiptsWithItems.length === 0 ? (
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
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {receiptsWithItems.map((receipt) => {
                    const po = inboundPOSources.find((p) => p.id === receipt.poId)
                    const receivedItems = receipt.items.filter((i) => i.receivedQty > 0)
                    const totalItems = receivedItems.length
                    const totalAssigned = receivedItems.filter(
                      (i) => i.rackId
                    ).length
                    const statusBadge =
                      totalAssigned === 0 ? (
                        <Badge variant="outline" className="text-blue-600 border-blue-300">
                          <Package className="mr-1 h-3 w-3" />
                          Belum Diproses
                        </Badge>
                      ) : totalAssigned < totalItems ? (
                        <Badge variant="outline" className="text-amber-600 border-amber-300">
                          <Package className="mr-1 h-3 w-3" />
                          Sebagian
                        </Badge>
                      ) : (
                        <Badge variant="default" className="bg-green-600">
                          <Package className="mr-1 h-3 w-3" />
                          Completed
                        </Badge>
                      )
                    return (
                      <TableRow
                        key={receipt.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handlePutAway(receipt.poId)}
                      >
                        <TableCell className="font-sans font-medium">
                          {receipt.poNumber}
                        </TableCell>
                        <TableCell>{receipt.supplier}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-0.5">
                            {receipt.items
                              .filter((i) => i.receivedQty > 0)
                              .map((item, i) => (
                                <span key={i} className="text-sm">
                                  {item.productName}{" "}
                                  <span className="text-muted-foreground">
                                    ×{item.receivedQty}
                                  </span>
                                </span>
                              ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          {statusBadge}
                        </TableCell>
                        <TableCell className="text-center">
                          {totalAssigned < totalItems ? (
                            <Button
                              size="sm"
                              onClick={() => handlePutAway(receipt.poId)}
                            >
                              <ArrowRight className="mr-1 h-4 w-4" />
                              Put Away
                            </Button>
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
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
