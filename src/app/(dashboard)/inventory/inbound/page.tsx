"use client"

import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
  Clock,
  CheckCircle,
  Truck,
} from "lucide-react"
import {
  useWarehouseStore,
  inboundPOSources,
  type InboundReceipt,
} from "@/lib/warehouse-store"

type PutawayStatus = "pending" | "partial" | "complete"

function getPutawayStatus(
  receipt?: InboundReceipt
): PutawayStatus {
  if (!receipt) return "pending"

  const receivedItems = receipt.items.filter(
    (i) => i.receivedQty > 0 || i.storageType === "carton"
  )
  if (receivedItems.length === 0) return "pending"

  const allocatedItems = receivedItems.filter((i) => i.rackId)

  if (allocatedItems.length === 0) return "pending"
  if (allocatedItems.length < receivedItems.length) return "partial"
  return "complete"
}

const putawayConfig: Record<
  PutawayStatus,
  { label: string; className: string; icon: typeof Truck }
> = {
  pending: {
    label: "Pending Putaway",
    className:
      "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    icon: Clock,
  },
  partial: {
    label: "Partial Putaway",
    className:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    icon: Package,
  },
  complete: {
    label: "Putaway Complete",
    className:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
    icon: CheckCircle,
  },
}

export default function InboundPage() {
  const router = useRouter()
  const { inboundReceipts } = useWarehouseStore()

  const inboundData = inboundPOSources.map((po) => {
    const receipt = inboundReceipts.find((r) => r.poId === po.id)
    const putawayStatus = getPutawayStatus(receipt)
    return { ...po, receipt, putawayStatus }
  })

  const totalInbound = inboundData.length
  const pendingCount = inboundData.filter(
    (d) => d.putawayStatus === "pending"
  ).length
  const completeCount = inboundData.filter(
    (d) => d.putawayStatus === "complete"
  ).length

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Inbound Shipments
        </h1>
        <p className="text-muted-foreground">
          Track and receive Purchase Orders that are on the way to the warehouse
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <Truck className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Inbound
                </p>
                <p className="text-2xl font-bold">{totalInbound}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                <Clock className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Pending Putaway
                </p>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Putaway Complete
                </p>
                <p className="text-2xl font-bold">{completeCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inbound Shipments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inbound Shipments</CardTitle>
          <CardDescription>
            Purchase Orders shipped and awaiting warehouse receipt
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>PO Number</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Ship Date</TableHead>
                <TableHead>Expected Arrival</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inboundData.map((po) => {
                const cfg = putawayConfig[po.putawayStatus]
                const Icon = cfg.icon
                return (
                  <TableRow
                    key={po.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() =>
                      router.push(`/inventory/inbound/${po.id}`)
                    }
                  >
                    <TableCell>
                      <span className="text-blue-600 hover:underline font-sans font-medium text-sm">
                        {po.poNumber}
                      </span>
                    </TableCell>
                    <TableCell>{po.supplier}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-0.5">
                        {po.items.map((item, i) => (
                          <span key={i} className="text-sm">
                            {item.name}{" "}
                            <span className="text-muted-foreground">
                              ×{item.orderedQty}
                            </span>
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {po.shipDate}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {po.expectedArrival}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cfg.className}
                      >
                        <Icon className="mr-1 h-3 w-3" />
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
