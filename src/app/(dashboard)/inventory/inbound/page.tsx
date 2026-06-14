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
  Truck,
  Package,
  CheckCircle,
  Clock,
  Boxes,
} from "lucide-react"
import {
  useWarehouseStore,
  inboundPOSources,
  type InboundReceipt,
} from "@/lib/warehouse-store"
type DisplayStatus = "shipped" | "partially_received" | "completed" | "received"

function getDisplayStatus(receipt?: InboundReceipt): DisplayStatus {
  if (!receipt) return "shipped"
  if (receipt.status === "assigned") return "received"
  if (receipt.items.every((i) => i.receivedQty >= i.orderedQty)) return "completed"
  return "partially_received"
}

const statusConfig: Record<
  DisplayStatus,
  { label: string; className: string; icon: typeof Truck }
> = {
  shipped: {
    label: "Shipped",
    className:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    icon: Truck,
  },
  partially_received: {
    label: "Receiving",
    className:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    icon: Package,
  },
  completed: {
    label: "Completed",
    className:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    icon: CheckCircle,
  },
  received: {
    label: "Received",
    className:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
    icon: CheckCircle,
  },
}

export default function InboundPage() {
  const router = useRouter()
  const { inboundReceipts, startReceipt } = useWarehouseStore()

  const totalPending = inboundPOSources.filter((po) => {
    const receipt = inboundReceipts.find((r) => r.poId === po.id)
    const status = getDisplayStatus(receipt)
    return status === "shipped" || status === "partially_received"
  }).length

  const shippedToday = inboundPOSources.filter(
    (po) => po.shipDate === "2026-06-09"
  ).length

  const receivedThisWeek = inboundReceipts.filter(
    (r) => r.status === "assigned"
  ).length

  const handleReceive = (poId: string) => {
    const po = inboundPOSources.find((p) => p.id === poId)
    if (po) startReceipt(po)
    router.push(`/inventory/inbound/${poId}`)
  }

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
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Pending</p>
                <p className="text-2xl font-bold">{totalPending}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <Truck className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Shipped Today</p>
                <p className="text-2xl font-bold">{shippedToday}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Received This Week
                </p>
                <p className="text-2xl font-bold">{receivedThisWeek}</p>
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
              {inboundPOSources.map((po) => {
                const receipt = inboundReceipts.find((r) => r.poId === po.id)
                const status = getDisplayStatus(receipt)
                const cfg = statusConfig[status]
                const Icon = cfg.icon
                return (
                  <TableRow
                    key={po.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleReceive(po.id)}
                  >
                    <TableCell className="font-sans font-medium">
                      {po.poNumber}
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
                        {receipt && receipt.cartons.length > 0 && (
                          <span className="inline-flex items-center gap-1 text-xs text-blue-600">
                            <Boxes className="h-3 w-3" />
                            {receipt.cartons.length} box
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {po.shipDate}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {po.expectedArrival}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cfg.className}>
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
