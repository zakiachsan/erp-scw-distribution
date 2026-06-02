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
  Play,
  Filter,
  Box,
  Package,
  Clock,
  Globe,
  Monitor,
} from "lucide-react"

interface PackingOrder {
  id: string
  soRef: string
  customer: string
  channel: "Web" | "ERP"
  items: string
  itemQty: number
  status: "Queued" | "In Progress" | "Completed"
  createdAt: string
}

const packingOrders: PackingOrder[] = [
  { id: "PK-001", soRef: "SO-2026-045", customer: "PT Autogloss Indonesia", channel: "ERP", items: "SCW Snow Foam x20, SCW Ceramic Coating x10", itemQty: 30, status: "Queued", createdAt: "2026-06-01 14:30" },
  { id: "PK-002", soRef: "SO-2026-044", customer: "CV Ceramic Pro JKT", channel: "Web", items: "SCW Interior Detailer x15, SCW Tire Gel x25", itemQty: 40, status: "In Progress", createdAt: "2026-05-30 09:15" },
  { id: "PK-003", soRef: "SO-2026-043", customer: "UD Shinemax", channel: "ERP", items: "SCW Spray Wax x30, SCW Glass Cleaner x20", itemQty: 50, status: "Completed", createdAt: "2026-05-28 11:00" },
  { id: "PK-004", soRef: "SO-2026-040", customer: "CV ProShine SBY", channel: "Web", items: "SCW Polish Compound x10", itemQty: 10, status: "Queued", createdAt: "2026-05-18 13:45" },
  { id: "PK-005", soRef: "SO-2026-039", customer: "AutoCare Makassar", channel: "ERP", items: "SCW Snow Foam x25", itemQty: 25, status: "Queued", createdAt: "2026-05-15 08:30" },
  { id: "PK-006", soRef: "SO-2026-046", customer: "GlossUp Bali", channel: "Web", items: "SCW Ceramic Coating x8, SCW Spray Wax x12", itemQty: 20, status: "In Progress", createdAt: "2026-06-02 10:00" },
]

const statusConfig: Record<string, { label: string; className: string }> = {
  Queued: { label: "Queued", className: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400" },
  "In Progress": { label: "In Progress", className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" },
  Completed: { label: "Completed", className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" },
}

const channelConfig: Record<string, { label: string; icon: React.ElementType; className: string }> = {
  Web: { label: "Web", icon: Globe, className: "bg-blue-100 text-blue-800" },
  ERP: { label: "ERP", icon: Monitor, className: "bg-indigo-100 text-indigo-800" },
}

export default function PackingPage() {
  const [channelFilter, setChannelFilter] = useState("All")

  const filtered = useMemo(() => {
    return packingOrders.filter((o) =>
      channelFilter === "All" || o.channel === channelFilter
    )
  }, [channelFilter])

  const queuedCount = packingOrders.filter((o) => o.status === "Queued").length
  const inProgressCount = packingOrders.filter((o) => o.status === "In Progress").length
  const completedCount = packingOrders.filter((o) => o.status === "Completed").length

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Packing Queue</h1>
          <p className="text-muted-foreground">
            Manage packing operations for outgoing orders
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-900/30">
                <Clock className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Queued</p>
                <p className="text-2xl font-bold">{queuedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                <Package className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-amber-600">{inProgressCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <Box className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-emerald-600">{completedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                <Box className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold">
                  {packingOrders.reduce((sum, o) => sum + o.itemQty, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Packing Queue</CardTitle>
              <CardDescription>{filtered.length} order{filtered.length !== 1 ? "s" : ""} in queue</CardDescription>
            </div>
            <Select value={channelFilter} onValueChange={(v) => setChannelFilter(v ?? "All")}>
              <SelectTrigger className="w-44">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Channel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Channels</SelectItem>
                <SelectItem value="Web">Web</SelectItem>
                <SelectItem value="ERP">ERP</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Packing ID</TableHead>
                <TableHead>SO Ref</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Items</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((order) => {
                const ChannelIcon = channelConfig[order.channel].icon
                return (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-xs font-medium">{order.id}</TableCell>
                    <TableCell className="font-mono text-xs">{order.soRef}</TableCell>
                    <TableCell className="font-medium">{order.customer}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={channelConfig[order.channel].className}>
                        <ChannelIcon className="mr-1 h-3 w-3" />
                        {channelConfig[order.channel].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs max-w-48 truncate">{order.items}</TableCell>
                    <TableCell className="text-right">{order.itemQty}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusConfig[order.status].className}>
                        {statusConfig[order.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {order.status === "Queued" ? (
                        <Link href={`/packing/${order.id}`}>
                          <Button size="sm">
                            <Play className="mr-2 h-4 w-4" />
                            Start Packing
                          </Button>
                        </Link>
                      ) : (
                        <Link href={`/packing/${order.id}`}>
                          <Button variant="ghost" size="sm">View</Button>
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
