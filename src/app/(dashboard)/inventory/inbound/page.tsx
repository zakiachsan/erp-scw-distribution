"use client"

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
  ArrowRight,
} from "lucide-react"

interface InboundItem {
  name: string
  qty: number
  unit: string
}

interface InboundPO {
  id: string
  poNumber: string
  supplier: string
  items: InboundItem[]
  shipDate: string
  expectedArrival: string
  status: "shipped" | "partially_received" | "received"
}

const inboundShipments: InboundPO[] = [
  {
    id: "po-001",
    poNumber: "PO-2026-0051",
    supplier: "PT Autocare Indonesia",
    items: [
      { name: "SCW Snow Foam", qty: 50, unit: "pcs" },
      { name: "SCW Shampoo Plus", qty: 30, unit: "pcs" },
      { name: "SCW Microfiber Towel", qty: 100, unit: "pcs" },
    ],
    shipDate: "2026-06-07",
    expectedArrival: "2026-06-12",
    status: "shipped",
  },
  {
    id: "po-002",
    poNumber: "PO-2026-0052",
    supplier: "ChemPro Asia",
    items: [
      { name: "SCW Ceramic Coating", qty: 20, unit: "pcs" },
      { name: "SCW Spray Wax", qty: 40, unit: "pcs" },
    ],
    shipDate: "2026-06-08",
    expectedArrival: "2026-06-13",
    status: "partially_received",
  },
  {
    id: "po-003",
    poNumber: "PO-2026-0053",
    supplier: "NanoTech Coatings",
    items: [
      { name: "SCW Interior Detailer", qty: 60, unit: "pcs" },
      { name: "SCW Tire Gel", qty: 45, unit: "pcs" },
    ],
    shipDate: "2026-06-09",
    expectedArrival: "2026-06-14",
    status: "shipped",
  },
  {
    id: "po-004",
    poNumber: "PO-2026-0054",
    supplier: "DetailPro Supply",
    items: [
      { name: "SCW Glass Cleaner", qty: 80, unit: "pcs" },
      { name: "SCW Leather Conditioner", qty: 25, unit: "pcs" },
    ],
    shipDate: "2026-06-09",
    expectedArrival: "2026-06-15",
    status: "shipped",
  },
  {
    id: "po-005",
    poNumber: "PO-2026-0055",
    supplier: "PT Autocare Indonesia",
    items: [
      { name: "SCW Polish Compound", qty: 35, unit: "pcs" },
      { name: "SCW Clay Bar", qty: 50, unit: "pcs" },
    ],
    shipDate: "2026-06-06",
    expectedArrival: "2026-06-10",
    status: "partially_received",
  },
]

const statusConfig: Record<
  InboundPO["status"],
  { label: string; className: string; icon: typeof Truck }
> = {
  shipped: {
    label: "Shipped",
    className:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    icon: Truck,
  },
  partially_received: {
    label: "Partially Received",
    className:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    icon: Package,
  },
  received: {
    label: "Received",
    className:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    icon: CheckCircle,
  },
}

export default function InboundPage() {
  const totalPending = inboundShipments.filter(
    (po) => po.status === "shipped" || po.status === "partially_received"
  ).length
  const shippedToday = inboundShipments.filter(
    (po) => po.shipDate === "2026-06-09"
  ).length
  const receivedThisWeek = inboundShipments.filter(
    (po) => po.status === "partially_received"
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
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inboundShipments.map((po) => {
                const cfg = statusConfig[po.status]
                const Icon = cfg.icon
                return (
                  <TableRow key={po.id}>
                    <TableCell className="font-mono font-medium">
                      {po.poNumber}
                    </TableCell>
                    <TableCell>{po.supplier}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-0.5">
                        {po.items.map((item, i) => (
                          <span key={i} className="text-sm">
                            {item.name}{" "}
                            <span className="text-muted-foreground">
                              ×{item.qty}
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
                      <Badge variant="outline" className={cfg.className}>
                        <Icon className="mr-1 h-3 w-3" />
                        {cfg.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {po.status !== "received" && (
                        <Link href={`/inventory/inbound/${po.id}`}>
                          <Button variant="ghost" size="sm">
                            Receive
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Button>
                        </Link>
                      )}
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
